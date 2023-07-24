const order = JSON.parse(localStorage.getItem('order'))
let currentPage = 1; // Trang hiện tại
const itemsPerPage = 12; // Số phần tử trên mỗi trang
function productLocal() {
    const results = localStorage.getItem('post');
    const myArray = JSON.parse(results);
    return myArray ? myArray : []
}

function render() {
    let newContent = '';
    const totalPages = Math.ceil(order.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const searchInput = document.getElementById('searchInput');
    const keyword = searchInput.value.toLowerCase();
    const itemsToRender = order.filter(item => item.userName.toLowerCase().includes(keyword))
        .slice(startIndex, endIndex);
    itemsToRender.forEach((item, index) => {
        let listOrder = '';
        let listQty = '';
        let listPrice = '';
        let listSumQty = '';
        item.order.forEach((item) => {
            listOrder += `<div class="setListOrder">
                <p class="listOrder">${item.title}</p>
            </div>`;
            listQty += `<div class="setListOrder">
                <p class="listOrder">${item.qty}</p>
            </div>`;
            listPrice += `<div class="setListOrder">
                <p class="listOrder">${item.price}$</p>
            </div>`;
            listSumQty += `${item.sumQty}`;
        });
        newContent += `
        <tr>
            <td class="text-center">${index + 1}</td>
            <td class="text-center">${item.userName}</td>
            <td class="text-center">${item.address}</td>
            <td class="text-center">MDH-${item.codeOrders}</td>
            <td class="text-center">${item.date}</td>
            <td class="text-center">${item.shipping}$</td>
            <td class="text-center">${item.sumOrder.toLocaleString('it-IT')}$</td>
            <td class="text-center">${(item.sumOrder + item.shipping).toLocaleString('it-IT')}$</td>
            <td class="text-center">${item.payments}</td>
            <td class="text-center">${item.paymentStatus}</td>
            <td class="text-center">
                <select id="select-${item.id}" class="history-select ${item.orderStatus}" onchange="handleSelectChange(${item.id}, this.value)">
                        <option ${item.orderStatus === 'pending' ? 'selected' : ''}  value="pending">Pending</option>
                        <option ${item.orderStatus === 'processing' ? 'selected' : ''}  value="processing">Processing</option>
                        <option ${item.orderStatus === 'delivering' ? 'selected' : ''}  value="delivering">Delivering</option>
                        <option ${item.orderStatus === 'done' ? 'selected' : ''}  value="done">Done</option>
                        <option ${item.orderStatus === 'cancel' ? 'selected' : ''}  value="cancel">Cancel</option>
                </select>
            </td>
            <td class="text-center">
                <button onclick="handleClick(${item.id})" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                    Detail
                </button>
            </td>
        </tr>`;
    });
    document.querySelector('#showProduct').innerHTML = newContent;

    // 
    const paginationContainer = document.querySelector('#pagination');
    paginationContainer.innerHTML = ''; // Xóa các nút phân trang hiện tại

    // Tạo nút cho mỗi trang
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.classList.add("page-link")
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i; // Chuyển đến trang được click
            render(); // Gọi lại hàm render()
        });
        paginationContainer.appendChild(pageButton);
    }
    // handle paginations
    searchInput.addEventListener('input', () => {
        currentPage = 1; // Reset trang về 1 khi thực hiện tìm kiếm
        render(); // Gọi lại hàm render()
    });
    let totalOrder = 0
    for (let i = 0; i < order.length; i++) {
        const element = order[i];
        if (element.orderStatus === "done") {
            totalOrder += element.sumOrder
        }
    }
    document.getElementById("total-order").innerHTML = totalOrder.toLocaleString('it-IT') + "$"
}

function handleClick(id) {
    const item = order.find(item => item.id === id)
    let newContent = `<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Detail Order</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <table id="cart-table" class="cart-table">
                        <thead class="cart-table-head">
                            <tr class="table-head-row">
                                <th class="product-remove">#</th>
                                <th class="product-name">Color</th>
                                <th class="product-name">Images</th>
                                <th class="product-image">Quantity</th>
                                <th class="product-image">Price</th>
                                <th class="product-image">Discount</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                            <tbody id="cart-table-body">
                                ${renderTB(item)}
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>`;
    document.getElementById("showModal").innerHTML = newContent;
}
function renderTB(params) {
    let content = ``
    params.order.forEach((item, index) => {
        content += `
            <tr class="table-body-row">
            <td class="product-orders">${index + 1}</td>
                <td class="product-orders">${item.color}</td>
                <td class="product-orders">
                    <img width="100px" src="../assets/img/products/${item.img}" alt="">
                </td>
                <td class="product-orders">${item.qty}</td>
                <td class="product-orders">${item.price}</td>
                <td class="product-orders">${params.discount}%</td>
                <td class="product-orders">${params.sumOrder}$</td>
            </tr>   
        `;
    })
    return content;
}

function handleSelectChange(id, value) {
    const item = order.find(item => item.id === id)
    item.orderStatus = value
    const selectElement = document.getElementById(`select-${id}`);
    selectElement.classList.add(value);
    if (item.orderStatus === 'done') {
        item.paymentStatus = 'completely payment';
    }
    const myArray = JSON.stringify(order);
    localStorage.setItem('order', myArray);
    render(order)
}
render()