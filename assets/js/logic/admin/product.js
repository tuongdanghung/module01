const title = document.getElementById('title');
const price = document.getElementById('price');
let img = document.getElementById('img');
const quantity = document.getElementById('quantity');
const description = document.getElementById('description');
const itemId = document.getElementById('itemId');
// value
const errTitle = document.getElementById('errTitle');
const errPrice = document.getElementById('errPrice');
const errImage = document.getElementById('errImage');
const errQuantity = document.getElementById('errQuantity');
const errColor = document.getElementById('errColor');
const errInternal = document.getElementById('errInternal');
const errRam = document.getElementById('errRam');

let currentPage = 1; // Trang hiện tại
const itemsPerPage = 8; // Số phần tử trên mỗi trang
const data = productLocal();
const element = document.getElementById('exampleModalLongTitle');
const editBtn = document.getElementById('dismissModal');

function handleEdit(id) {
    const editItem = data.find(item => item.id === id);
    const title = editItem.title;
    const idValue = editItem.id;
    const price = editItem.price;
    const quantity = editItem.quantity;
    const description = editItem.description;
    const imgs = editItem.img;
    const colors = editItem.color;
    const internals = editItem.internal;
    const rams = editItem.ram;
    const imgFiles = imgs.map(file => new File([], file.src));
    const dataTransfer = new DataTransfer();
    imgFiles.forEach(file => dataTransfer.items.add(file));
    img.files = dataTransfer.files;
    // Set values for other input elements
    document.getElementById('title').value = title;
    document.getElementById('itemId').value = idValue;
    document.getElementById('price').value = price;
    document.getElementById('quantity').value = quantity;
    document.getElementById('description').value = description;
    // Set checkboxes for colors
    const colorCheckboxes = document.querySelectorAll('#colorOptions input[type="checkbox"]');
    colorCheckboxes.forEach(checkbox => {
        const color = checkbox.dataset.color;
        const isChecked = colors.some(item => item.color === color);
        checkbox.checked = isChecked;
    });

    // Set checkboxes for internals
    const internalCheckboxes = document.querySelectorAll('#internalOptions input[type="checkbox"]');
    internalCheckboxes.forEach(checkbox => {
        const internal = checkbox.dataset.internal;
        const isChecked = internals.some(item => item.internal === internal);
        checkbox.checked = isChecked;
    });

    // Set checkboxes for rams
    const ramCheckboxes = document.querySelectorAll('#ramOptions input[type="checkbox"]');
    ramCheckboxes.forEach(checkbox => {
        const ram = checkbox.dataset.ram;
        const isChecked = rams.some(item => item.ram === ram);
        checkbox.checked = isChecked;
    });
    element.innerText = 'Edit Product';
    editBtn.innerText = 'Edit';
}


function handleAdd() {
    if (itemId.value) {
        const index = data.findIndex(el => el.title === title.value)
        if (index === -1) {
            const idx = data.find(el => el.id === +itemId.value)
            let imageList = [];
            const selectedColors = [];
            const selectedInternal = [];
            const selectedRam = [];
            const selectedFiles = img.files
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                if (imageList.length === 0) {
                    imageList.push({ id: 0, src: file.name })
                } else {
                    const maxId = Math.max(...imageList.map(item => item.id));
                    imageList.push({ id: maxId + 1, src: file.name })
                }
            }
            const ColorCheckboxes = document.querySelectorAll('#colorOptions input[type="checkbox"]:checked');
            ColorCheckboxes.forEach(checkbox => {
                const color = checkbox.dataset.color;
                const maxId = Math.max(...selectedColors.map(item => item.id));
                if (selectedColors.length === 0) {
                    selectedColors.push({ id: maxId + 1, color: color })
                } else {
                    const maxId = Math.max(...imageList.map(item => item.id));
                    selectedColors.push({ id: maxId + 1, color: color })

                }
            });
            // edit color
            const internalCheckboxes = document.querySelectorAll('#internalOptions input[type="checkbox"]:checked');
            internalCheckboxes.forEach(checkbox => {
                const internal = checkbox.dataset.internal;
                const maxId = Math.max(...selectedInternal.map(item => item.id));
                if (selectedInternal.length === 0) {
                    selectedInternal.push({ id: maxId + 1, internal: internal })
                } else {
                    const maxId = Math.max(...imageList.map(item => item.id));
                    selectedInternal.push({ id: maxId + 1, internal: internal })

                }
            });
            // edit internal
            const ramCheckboxes = document.querySelectorAll('#ramOptions input[type="checkbox"]:checked');
            ramCheckboxes.forEach(checkbox => {
                const ram = checkbox.dataset.ram;
                const maxId = Math.max(...selectedRam.map(item => item.id));
                if (selectedRam.length === 0) {
                    selectedRam.push({ id: maxId + 1, ram: ram })
                } else {
                    const maxId = Math.max(...imageList.map(item => item.id));
                    selectedRam.push({ id: maxId + 1, ram: ram })

                }
            });
            // edit ram
            idx.id = +itemId.value,
                idx.title = title.value,
                idx.quantity = +quantity.value,
                idx.price = +price.value,
                idx.img = imageList,
                idx.color = selectedColors,
                idx.internal = selectedInternal,
                idx.ram = selectedRam,
                idx.description = description.value
            validate(idx)

        } else {
            errTitle.innerHTML = 'Products are available'
            errTitle.style.display = 'block'
            return
        }
    } else {
        const index = data.findIndex(el => el.title === title.value)
        if (index === -1) {
            let imageList = [];
            const selectedColors = [];
            const selectedInternal = [];
            const selectedRam = [];
            const selectedFiles = img.files
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                if (imageList.length === 0) {
                    imageList.push({ id: 0, src: file.name })
                } else {
                    const maxId = Math.max(...imageList.map(item => item.id));
                    imageList.push({ id: maxId + 1, src: file.name })
                }
            }
            // add image
            const ColorCheckboxes = document.querySelectorAll('#colorOptions input[type="checkbox"]:checked');
            ColorCheckboxes.forEach(checkbox => {
                const color = checkbox.dataset.color;
                if (selectedColors.length === 0) {
                    selectedColors.push({ id: 0, color: color })
                } else {
                    const maxId = Math.max(...selectedColors.map(item => item.id));
                    selectedColors.push({ id: maxId + 1, color: color })
                }
            });
            // add color
            const internalCheckboxes = document.querySelectorAll('#internalOptions input[type="checkbox"]:checked');
            internalCheckboxes.forEach(checkbox => {
                const internal = checkbox.dataset.internal;
                if (selectedInternal.length === 0) {
                    selectedInternal.push({ id: 0, internal: internal })
                } else {
                    const maxId = Math.max(...selectedInternal.map(item => item.id));
                    selectedInternal.push({ id: maxId + 1, internal: internal })
                }
            });
            // add internal
            const ramCheckboxes = document.querySelectorAll('#ramOptions input[type="checkbox"]:checked');
            ramCheckboxes.forEach(checkbox => {
                const ram = checkbox.dataset.ram;
                if (selectedRam.length === 0) {
                    selectedRam.push({ id: 0, ram: ram })
                } else {
                    const maxId = Math.max(...selectedRam.map(item => item.id));
                    selectedRam.push({ id: maxId + 1, ram: ram })
                }
            });
            // add ram
            let newValue = {}
            if (data.length === 0) {
                newValue = { id: 0, title: title.value, quantity: +quantity.value, price: +price.value, img: imageList, color: selectedColors, internal: selectedInternal, ram: selectedRam, description: description.value }
            } else {
                const maxId = Math.max(...data.map(item => item.id));
                newValue = { id: maxId + 1, title: title.value, quantity: +quantity.value, price: +price.value, img: imageList, color: selectedColors, internal: selectedInternal, ram: selectedRam, description: description.value }

            }
            validate(newValue)
        } else {
            errTitle.innerHTML = 'Products are available'
            // errTitle.style.display = 'block'
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
    if (params.price === 0) {
        isValid = true
        errPrice.style.display = 'block'
    }
    if (params.quantity === 0) {
        isValid = true
        errQuantity.style.display = 'block'
    }

    if (params.img.length === 0) {
        isValid = true
        errImage.style.display = 'block'
    }
    if (params.color.length === 0) {
        isValid = true
        errColor.style.display = 'block'
    }
    if (params.internal.length === 0) {
        isValid = true
        errInternal.style.display = 'block'
    }
    if (params.ram.length === 0) {
        isValid = true
        errRam.style.display = 'block'
    }
    if (isValid === false) {
        const idx = data.find(el => el.id === params.id)
        if (idx === undefined) {
            data.push(params)
            const myArrayJson = JSON.stringify(data);
            localStorage.setItem('product', myArrayJson);
            Toastify({
                text: 'Add new product successfully',
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
            errTitle.style.display = 'none'
            errPrice.style.display = 'none'
            errQuantity.style.display = 'none'
            errImage.style.display = 'none'
            errColor.style.display = 'none'
            errInternal.style.display = 'none'
            errRam.style.display = 'none'
            // 
            title.value = ''
            price.value = ''
            quantity.value = ''
            description.value = ''
            img.value = ''
            editBtn.setAttribute('data-dismiss', 'modal')
            removeCheckbox()
        } else {
            const myArrayJson = JSON.stringify(data);
            localStorage.setItem('product', myArrayJson);
            errTitle.style.display = 'none'
            errPrice.style.display = 'none'
            errQuantity.style.display = 'none'
            errImage.style.display = 'none'
            errColor.style.display = 'none'
            errInternal.style.display = 'none'
            errRam.style.display = 'none'
            // 

            title.value = ''
            itemId.value = ''
            price.value = ''
            quantity.value = ''
            description.value = ''
            img.value = ''
            removeCheckbox()
            editBtn.setAttribute('data-dismiss', 'modal')
            Toastify({
                text: 'Edit product successfully',
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
            editBtn.innerText = 'Add new';
        }

        render(data)
    } else {
        return
    }
}

function removeCheckbox() {
    const colorCheckboxes = document.querySelectorAll('#colorOptions input[type="checkbox"]:checked');
    colorCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
        checkbox.removeAttribute('value');
    });

    const internalCheckboxes = document.querySelectorAll('#internalOptions input[type="checkbox"]:checked');
    internalCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
        checkbox.removeAttribute('value');
    });

    const ramCheckboxes = document.querySelectorAll('#ramOptions input[type="checkbox"]:checked');
    ramCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
        checkbox.removeAttribute('value');
    });
}

function productLocal() {
    const results = localStorage.getItem('product');
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
            localStorage.setItem('product', myArrayJson);
            Toastify({
                text: 'Delete product successfully',
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
        render(data);
    }

}

function render() {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    let newContent = '';
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const searchInput = document.getElementById('searchInput');
    const keyword = searchInput.value.toLowerCase();
    const itemsToRender = data.filter(item => item.title.toLowerCase().includes(keyword))
        .slice(startIndex, endIndex);

    itemsToRender.forEach((item, index) => {
        let newImg = '';
        let newColor = '';
        let newInternal = '';
        let newRam = '';
        item.img.forEach((imgItem) => {
            newImg += `<div class="p-2"><img width="80px" src="../assets/img/products/${imgItem.src}" alt=""></div>`;
        });
        item.internal.forEach((internalItem) => {
            newInternal += `<li>${internalItem.internal}</li>
            `;
        });
        item.color.forEach((colorItem) => {
            newColor += `<li style="color:${colorItem.color}">${colorItem.color}</li>`;
        });
        item.ram.forEach((ramItem) => {
            newRam += `<li>${ramItem.ram}</li>`;
        });
        newContent += `
    <tr>
        <td class="text-center">${index + 1}</td>
        <td class="text-center">${item.title}</td>
        <td class="text-center">${item.quantity}</td>
        <td class="text-center">${item.price.toLocaleString('it-IT')} $</td>
        <td class="text-center"><div class="flex-item">${newImg}</div></td>
        <td class="text-center"><div class="flex-item"><ul class="listAddPrd">${newColor}</ul></div></td>
        <td class="text-center"><div class="flex-item"><ul class="listAddPrd">${newInternal}</ul></div></td>
        <td class="text-center"><div class="flex-item"><ul class="listAddPrd">${newRam}</ul></div></td>
        <td class="text-center">
            <p class="prd-description">${item.description}</p>
        </td>
        <td>
        <div class="flex-item">
        <button type="button" class="btn btn-warning" data-toggle="modal"
                            data-target="#exampleModalCenter" onclick="handleEdit(${item.id})">Edit</button>
        <button class="btn btn-danger ml-3" onclick="handleDelete(${item.id})">delete</button>
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
    searchInput.addEventListener('input', () => {
        currentPage = 1; // Reset trang về 1 khi thực hiện tìm kiếm
        render(); // Gọi lại hàm render()
    });
}

function handleClickData() {
    errTitle.style.display = 'none'
    errPrice.style.display = 'none'
    errQuantity.style.display = 'none'
    errImage.style.display = 'none'
    errColor.style.display = 'none'
    errInternal.style.display = 'none'
    errRam.style.display = 'none'
    // 
    title.value = ''
    price.value = ''
    quantity.value = ''
    description.value = ''
    img.value = ''
    itemId.value = ''
    removeCheckbox()
    editBtn.innerText = 'Add new';
}
render()