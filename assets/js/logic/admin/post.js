const title = document.getElementById('title');
const description = document.getElementById('description');
const itemId = document.getElementById('itemId');
const img = document.getElementById('img');
// value
const errTitle = document.getElementById('errTitle');
const errImg = document.getElementById('errImg');
const errDescription = document.getElementById('errDescription');
const dismissModal = document.getElementById('dismissModal');
let currentPage = 1; // Trang hiện tại
const itemsPerPage = 8; // Số phần tử trên mỗi trang
const data = productLocal();
const element = document.getElementById('exampleModalLongTitle');
const editBtn = document.getElementById('dismissModal');

function handleEdit(id) {
    const editItem = data.find(item => item.id === id);
    const title = editItem.title;
    const img = editItem.img;
    const description = editItem.description;
    const idValue = editItem.id;
    // Set values for other input elements
    document.getElementById('title').value = title;
    document.getElementById('img').value = img;
    document.getElementById('description').value = description;
    document.getElementById('itemId').value = idValue;
    element.innerText = 'Edit Product';
    editBtn.innerText = 'Edit';
}

function handleAdd() {
    if (itemId.value) {
        const index = data.findIndex(el => el.title === title.value)
        if (index === -1) {
            const idx = data.find(el => el.id === +itemId.value)
            idx.id = +itemId.value,
                idx.title = title.value,
                idx.img = img.value,
                idx.description = description.value
            validate(idx)
        } else {
            errTitle.innerHTML = 'Title are available'
            errTitle.style.display = 'block'
            return
        }
    } else {
        // add ram
        const index = data.findIndex(el => el.title === title.value)
        if (index === -1) {
            let newValue = {}
            if (data.length === 0) {
                newValue = { id: 0, title: title.value, img: img.value, description: description.value }
            } else {
                const maxId = Math.max(...data.map(item => item.id));
                newValue = { id: maxId + 1, title: title.value, img: img.value, description: description.value }

            }
            validate(newValue)
        } else {
            errTitle.innerHTML = 'Title are available'
            errTitle.style.display = 'block'
            return
        }

    }

}

function validate(params) {
    let isValid = false
    if (params.title === '') {
        isValid = true
        errTitle.style.display = 'block'
    }
    if (params.img === '') {
        isValid = true
        errImg.style.display = 'block'
    }
    if (params.description === '') {
        isValid = true
        errDescription.style.display = 'block'
    }
    if (isValid === false) {
        const idx = data.find(el => el.id === params.id)
        if (idx === undefined) {
            data.push(params)
            const myArrayJson = JSON.stringify(data);
            localStorage.setItem('post', myArrayJson);
            Toastify({
                text: 'Add new post successfully',
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
            dismissModal.setAttribute('data-dismiss', 'modal')
            errTitle.style.display = 'none'
            description.value = ''
            title.value = ''
            img.value = ''
        } else {
            const myArrayJson = JSON.stringify(data);
            localStorage.setItem('post', myArrayJson);
            errTitle.style.display = 'none'
            errDescription.style.display = 'none'

            title.value = ''
            img.value = ''
            description.value = ''
            dismissModal.setAttribute('data-dismiss', 'modal')
            Toastify({
                text: 'Edit post successfully',
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
        render(data)
    } else {
        return
    }
}

function productLocal() {
    const results = localStorage.getItem('post');
    const myArray = JSON.parse(results);
    return myArray ? myArray : []
}

function handleDelete(id) {
    var result = confirm("Are you sure you want to delete?");
    const deleteItem = data.find(item => item.id === id);
    if (result) {
        if (deleteItem.id === id) {
            const index = data.indexOf(deleteItem);
            data.splice(index, 1);
            const myArrayJson = JSON.stringify(data);
            localStorage.setItem('post', myArrayJson);
            Toastify({
                text: 'Delete successfully',
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
    }
    render(data);
}

function render() {
    let newContent = '';
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const searchInput = document.getElementById('searchInput');
    const keyword = searchInput.value.toLowerCase();
    const itemsToRender = data.filter(item => item.title.toLowerCase().includes(keyword))
        .slice(startIndex, endIndex);
    itemsToRender.forEach((item, index) => {
        newContent += `
    <tr>
        <td class="text-center">${index + 1}</td>
        <td class="text-center">${item.id}</td>
        <td class="text-center">${item.title}</td>
        <td class="text-center"><img src="${item.img}" alt=""></td>
        <td>
            <p class="prd-description">${item.description}</p>
        </td>
        <td class="text-center">
            <div>
            <button type="button" class="btn btn-warning" data-toggle="modal"
                                data-target="#exampleModalCenter" onclick="handleEdit(${item.id})">Edit</button>
            <button class="btn btn-danger" onclick="handleDelete(${item.id})">delete</button>
            </div>
        </td>
    </tr>`;
    });
    document.querySelector('#showProduct').innerHTML = newContent;

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

function handleClickData() {
    errTitle.style.display = 'none'
    errDescription.style.display = 'none'
    title.value = ''
    img.value = ''
    description.value = ''
    itemId.value = ''
    editBtn.innerText = 'Add new';
}
render()