const comment = JSON.parse(localStorage.getItem('comment'))
let currentPage = 1; // Trang hiện tại
const itemsPerPage = 12; // Số phần tử trên mỗi trang
function productLocal() {
    const results = localStorage.getItem('post');
    const myArray = JSON.parse(results);
    return myArray ? myArray : []
}

function handleDelete(id) {
    var result = confirm("Are you sure you want to delete?");

    const deleteItem = comment.find(item => item.id === id);
    if (deleteItem.id === id) {
        const index = comment.indexOf(deleteItem);
        comment.splice(index, 1);
        const myArrayJson = JSON.stringify(comment);
        localStorage.setItem('comment', myArrayJson);
    }
    if (result) {
        Toastify({
            text: 'Delete comment successfully',
            color: 'white',
            duration: 1000,
            close: true,
            gravity: 'top',
            left: 0,
            backgroundColor: '#07bc0c',
            style: {
                padding: '20px 50px',
                'font-size': '16px',
            },
        }).showToast();
    }

    render(comment);
}
function render() {
    let newContent = '';
    const totalPages = Math.ceil(comment.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const searchInput = document.getElementById('searchInput');
    const keyword = searchInput.value.toLowerCase();
    const itemsToRender = comment.filter(item => item.userName.toLowerCase().includes(keyword))
        .slice(startIndex, endIndex);
    itemsToRender.forEach((item, index) => {
        newContent += `
    <tr>
        <td class="text-center">${index + 1}</td>
        <td class="text-center">${item.id}</td>
        <td class="text-center">${item.userName}</td>
        <td class="text-center">${item.comment}</td>
        <td class="text-center">${item.idProductDetail}</td>
        <td class="text-center">${item.rating} <i style="color:#F28123" class='fas fa-star'></i></td>
        <td class="text-center">${item.date}</td>
        <td class="text-center">
        <div>
            <button class="btn btn-danger" onclick="handleDelete(${item.id})">delete</button>
        </div>
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
}
render()