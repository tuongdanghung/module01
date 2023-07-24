const data = JSON.parse(localStorage.getItem('order'));
const auth = JSON.parse(localStorage.getItem('auth'));
const newData = data.filter((el) => el.userId === auth.id)

function render() {
    let newContent = '';
    newData.forEach((item, index) => {
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
        <tr class="table-body-row">
            <td class="product-image">${index + 1}</td>
            <td class="product-name">SP.${item.codeOrders}</td>
            <td class="product-price">${item.date}</td>
            <td class="product-total">${item.payments}</td>
            <td class="product-total">${item.paymentStatus}</td>
            <td class="product-total">${item.shipping}$</td>
            <td class="product-total">${(+item.sumOrder + item.shipping).toLocaleString('it-IT')} $</td>
            <td class="product-total">
                ${item.orderStatus}
            </td>
            <td class="text-left p-4">
            <button onclick="handleClick(${item.id})" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                Detail
            </button>
            ${item.orderStatus === 'pending' ? `<button onclick="handleCancel(${item.id})" type="button" class="btn btn-danger">
                    Cancel Order
                </button>` : ''}
            </td>
        </tr> `;
    });

    document.querySelector('#show-cart').innerHTML = newContent;
}

function handleClick(id) {
    const item = newData.find(item => item.id === id)
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
                <div class="modal-body history-detail">
                    <table id="cart-table" class="cart-table">
                    <thead class="cart-table-head">
                        <tr class="table-head-row">
                            <th class="product-remove">#</th>
                            <th class="product-name">Color</th>
                            <th class="product-name">Images</th>
                            <th class="product-image">Quantity</th>
                            <th class="product-image">Discount</th>
                            <th class="product-image">Price</th>
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
                    <img width="100px" src="assets/img/products/${item.img}" alt="">
                </td>
                <td class="product-orders">${item.qty}</td>
                <td class="product-orders">${params.discount}%</td>
                <td class="product-orders">${item.price}$</td>
                <td class="product-orders">${params.sumOrder}$</td>
            </tr>
        `;
    })
    return content;
}

function handleCancel(id) {
    const item = data.find(item => item.id === id)
    item.orderStatus = 'cancel';
    const myArrayJson = JSON.stringify(data);
    localStorage.setItem('order', myArrayJson);
    render(newData)

}

render();
