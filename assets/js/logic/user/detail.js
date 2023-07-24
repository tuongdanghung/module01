const data = JSON.parse(localStorage.getItem('productDetail'));
const product = JSON.parse(localStorage.getItem('product'));
const auth = JSON.parse(localStorage.getItem('auth'));
let num = +data.quantity
const addCart = local()
let check = false
function render() {
    let newColor = ``
    let newInternal = ``
    let newRam = ``
    let newImg = ``

    data.img.forEach((item, index) => {
        newImg += `
        <div>
            <img onclick="handleClickImg(${item.id})" src="assets/img/products/${item.src}" alt="">
        </div>`;
    });

    data.color.forEach((colorItem, index) => {
        const colorId = `color_${index}`;
        newColor += `
        <div class="flex-item">
            <input class="checkbox-style" type="radio" id="${colorId}" name="color" value="${colorItem.color}">
            <label for="${colorId}">${colorItem.color}</label><br>
        </div>`;
    });

    data.internal.forEach((internalItem, index) => {
        const internalId = `internal_${index}`;
        newInternal += `
        <div class="flex-item">
            <input class="checkbox-style" type="radio" id="${internalId}" name="internal" value="${internalItem.internal}">
            <label for="${internalId}">${internalItem.internal}</label><br>
        </div>`;
    });

    data.ram.forEach((ramItem, index) => {
        const ramId = `ram_${index}`;
        newRam += `
        <div class="flex-item">
            <input class="checkbox-style" type="radio" id="${ramId}" name="ram" value="${ramItem.ram}">
            <label for="${ramId}">${ramItem.ram}</label><br>
        </div>`;
    });

    let newContent = '';
    newContent += `
    <div class="container">
        <div class="row mb-4">
            <div class="col-md-5">
                <div class="single-product-img">
                    <img id="setImg" src="assets/img/products/${data.img[0].src}" alt="">
                </div>
                <div class="flex-img">
                    ${newImg}
                </div>

            </div>
                <div class="col-md-7">
                    ${auth ? `<div class="single-product-content">
                    <h3 style="color:#555;" class="title-single">Name: ${data.title}</h3>
                    <h3 style="color:#555;" class="title-single">Price: ${data.price} $</h3>
                    <div id="showNoBlock">
                        <div class="single-product-pricing flex-detail mb-3">
                            <p class="m-0 mr-3 title-single">Color:</p> ${newColor}
                        </div>
                        <p id="errorDetailColor">
                            <i>You have not selected the Color</i>
                        </p>
                        <div class="single-product-pricing flex-detail mb-3">
                            <p class="m-0 mr-3 title-single">Internal:</p> ${newInternal}
                        </div>
                        <p id="errorDetailInternal">
                            <i>You have not selected the Internal</i>
                        </p>
                        <div class="single-product-pricing flex-detail mb-3">
                            <p class="m-0 mr-3 title-single">Ram:</p> ${newRam}
                        </div>
                        <p id="errorDetailRam">
                            <i>You have not selected the Ram</i>
                        </p>
                        <div class="single-product-pricing flex-detail mb-3">
                            <p class="m-0 mr-3 title-single">Quantity: </p>
                            <p class="text-black">${num !== 0 ? num : '<i class="text-danger">Out of stock</i>'}</p>
                        </div>
                        <div class="single-product-form">
                            <input type="number" id="valueQuantity" placeholder="0">
                            <button style="${num === 0 ? 'background-color:#969696' : ''}" ${num === 0 ? 'disabled' : ''} onclick="handleAdd()" class="cart-btn"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                        </div>
                        <p id="errorDetailQuantity">
                            <i>You have not selected the Quantity</i>
                        </p>
                    </div>
                    <div id="showIsBlock">
                        <h5>
                            <i>Your account is locked. Please contact admin</i>
                        </h5>
                    </div>
            </div>`: `<h5>Please login to view product details</h5> <a href="/login.html">login here</a>`}
            </div>
        </div>
        <h3>Description</h3>
        <p>${data.description}</p>
    </div>`;

    document.querySelector('#detail').innerHTML = newContent;
    if (auth.isBlock === true) {
        document.querySelector('#showNoBlock').style.display = 'none';
        document.querySelector('#showIsBlock').style.display = 'block';
    }

    let currentQuantity = num; // Lưu trữ giá trị số lượng hiện tại
    let quantityInput = document.getElementById("valueQuantity");
    quantityInput.addEventListener("input", function (event) {
        let inputValue = +event.target.value <= currentQuantity ? +event.target.value : currentQuantity;
        document.getElementById("valueQuantity").value = inputValue;
    });
}

function handleAdd() {
    let quantity = document.getElementById("valueQuantity").value;
    let colorCheckboxList = document.getElementsByName("color");
    let selectedColor = "";
    for (let i = 0; i < colorCheckboxList.length; i++) {
        if (colorCheckboxList[i].checked) {
            selectedColor = colorCheckboxList[i].value;
            break;
        }
    }

    let internalCheckboxList = document.getElementsByName("internal");
    let selectedInternal = "";
    for (let i = 0; i < internalCheckboxList.length; i++) {
        if (internalCheckboxList[i].checked) {
            selectedInternal = internalCheckboxList[i].value;
            break;
        }
    }

    let ramCheckboxList = document.getElementsByName("ram");
    let selectedRam = "";
    for (let i = 0; i < ramCheckboxList.length; i++) {
        if (ramCheckboxList[i].checked) {
            selectedRam = ramCheckboxList[i].value;
            break;
        }
    }
    let newValue = {}
    if (addCart.length === 0) {
        newValue = {
            id: 0,
            primaryId: data.id,
            idUser: auth.id,
            title: data.title,
            qty: +quantity,
            color: selectedColor,
            internal: selectedInternal,
            ram: selectedRam,
            sumQty: num,
            price: data.price,
            img: data.img[0].src,
        }
    } else {
        const maxId = Math.max(...addCart.map(item => item.id));
        newValue = {
            id: maxId + 1,
            primaryId: data.id,
            idUser: auth.id,
            title: data.title,
            qty: +quantity,
            sumQty: num,
            color: selectedColor,
            internal: selectedInternal,
            ram: selectedRam,
            price: data.price,
            img: data.img[0].src,
        }
    }
    validate(newValue)
}
function validate(params) {
    let data = params
    // num = num - data.qty
    let isValid = false
    if (+data.qty === 0) {
        isValid = true
        document.getElementById('errorDetailQuantity').style.display = 'block'
    }
    if (data.color === '') {
        isValid = true
        document.getElementById('errorDetailColor').style.display = 'block'
    }
    if (data.internal === '') {
        isValid = true
        document.getElementById('errorDetailInternal').style.display = 'block'
    }
    if (data.ram === '') {
        isValid = true
        document.getElementById('errorDetailRam').style.display = 'block'
    }
    if (isValid === false) {
        Toastify({
            text: 'Add to cart successfully',
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
        const isCheckCart = addCart.find(el => el.primaryId === data.primaryId)
        if (isCheckCart) {
            isCheckCart.qty = isCheckCart.qty + data.qty
        } else {
            addCart.push(data)

        }
        const myAddCartJson = JSON.stringify(addCart);
        localStorage.setItem('addCart', myAddCartJson);
        render()
        local(addCart)
    } else {
        check = true
        return
    }
}

function local() {
    const results = localStorage.getItem('addCart');
    const myArray = JSON.parse(results);
    return myArray ? myArray : []
}

render()


function handleTotal() {
    const total = document.querySelectorAll('.product-total')
    let sum = 0
    total.forEach(element => {
        sum += Number(element.textContent)
    })
    document.querySelector('#subtotal').innerHTML = sum;
    document.querySelector('#total').innerHTML = sum + 45;

}

function handleClickImg(params) {
    document.getElementById('setImg').src = `assets/img/products/${data.img[params].src}`
}