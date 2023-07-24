const cart = JSON.parse(localStorage.getItem('addCart')) ?? []
const auth = JSON.parse(localStorage.getItem('auth'))
const detail = JSON.parse(localStorage.getItem('productDetail'));
const product = JSON.parse(localStorage.getItem('product'));
const reCart = cart.filter(item => item.idUser === auth.id);
function render() {
    let newContent = '';
    let sum = 0;
    let totalNumber = sum
    const valueQuantity = document.getElementsByClassName('valueQuantity');
    reCart.forEach((item) => {
        newContent += `
        <tr class="table-body-row">
          <td class="product-remove"><button class='deleteCart' onclick={handleDelete(${item.id})}><i class="far fa-window-close"></i></button></td>
          <td class="product-image cart-img"><img src="assets/img/products/${item.img}" alt=""></td>
          <td class="product-name">${item.title}</td>
          <td class="product-name">${item.sumQty}</td>
          <td class="product-price">${item.price}$</td>
          <td class="product-quantity">
            <button onclick='handleDecrease(${item.id})' class="btn-qty">-</button>
            <input type="number" class="valueQuantity" id="valueQuantity${item.id}" placeholder="0" value="${item.qty}">
            <button onclick='handleIncrease(${item.id})' class="btn-qty">+</button>
          </td>
          <td class="product-total">${+item.price * item.qty}</td>
        </tr> `;
        sum += +item.price * +item.qty;
        if (sum < 1000) {
            totalNumber = sum
            document.querySelector('#discount').innerHTML = 0;
        } else if (sum >= 1000 && sum <= 1999) {
            totalNumber = sum - (sum * 10) / 100
            document.querySelector('#discount').innerHTML = 10;
        } else if (sum >= 2000 && sum <= 2999) {
            totalNumber = sum - (sum * 20) / 100
            document.querySelector('#discount').innerHTML = 20;
        } else if (sum >= 3000 && sum <= 3999) {
            totalNumber = sum - (sum * 30) / 100
            document.querySelector('#discount').innerHTML = 30;
        } else {
            totalNumber = sum - (sum * 50) / 100
            document.querySelector('#discount').innerHTML = 50;
        }
    });

    if (reCart.length === 0) {
        document.querySelector('.cart-table').style.display = 'none'
        document.querySelector('#show-none').innerText = "You don't have any products in your shopping cart";
        // 
    }
    document.querySelector('#show-cart').innerHTML = newContent;
    document.querySelector('#subtotal').innerHTML = sum.toLocaleString('it-IT');
    document.querySelector('#total').innerHTML = (totalNumber + 45).toLocaleString('it-IT');
    Array.from(valueQuantity).forEach((input, index) => {
        input.addEventListener('input', (event) => {
            const inputValue = +event.target.value;
            const item = cart[index];
            const newQty = inputValue > +item.sumQty ? +item.sumQty : inputValue;
            sum = newQty * +item.price;
            input.value = newQty;
            const productTotalElement = document.getElementsByClassName('product-total')[index];
            productTotalElement.innerHTML = newQty * +item.price;
            handleTotal();
            item.qty = newQty;
        })
    });

}

function handleTotal() {
    const total = document.querySelectorAll('.product-total')
    let sum = 0
    let totalNumber = sum
    total.forEach(element => {
        sum += Number(element.textContent)
    })
    if (sum < 1000) {
        totalNumber = sum
        document.querySelector('#discount').innerHTML = 0;
    } else if (sum >= 1000 && sum <= 1999) {
        totalNumber = sum - (sum * 10) / 100
        document.querySelector('#discount').innerHTML = 10;
    } else if (sum >= 2000 && sum <= 2999) {
        totalNumber = sum - (sum * 20) / 100
        document.querySelector('#discount').innerHTML = 20;
    } else if (sum >= 3000 && sum <= 3999) {
        totalNumber = sum - (sum * 30) / 100
        document.querySelector('#discount').innerHTML = 30;
    } else {
        totalNumber = sum - (sum * 50) / 100
        document.querySelector('#discount').innerHTML = 50;
    }

    document.querySelector('#subtotal').innerHTML = sum.toLocaleString('it-IT');
    document.querySelector('#total').innerHTML = (totalNumber + 45).toLocaleString('it-IT');
}
function handleDelete(id) {
    const deleteItemCart = cart.find(item => item.id === id);
    const deleteItem = reCart.find(item => item.id === id);
    if (deleteItemCart.id === id) {
        var result = confirm("Are you sure you want to delete?");
        if (result) {
            const index = cart.indexOf(deleteItemCart);
            const idx = reCart.indexOf(deleteItem);
            cart.splice(index, 1);
            reCart.splice(idx, 1);
            const deleteItemProduct = product.find(item => item.id === deleteItemCart.primaryId);
            deleteItemProduct.quantity = deleteItemProduct.quantity + +deleteItemCart.qty
            detail.quantity = deleteItemProduct.quantity
            const myArrayJson = JSON.stringify(cart);
            localStorage.setItem('addCart', myArrayJson);
        }
    }
    render(reCart)
}

function handleIncrease(id) {
    const valueClick = document.getElementById(`valueQuantity${id}`);
    const item = cart.find(el => el.id === id);
    if (item) {
        item.qty = +item.qty + 1;
        if (+valueClick.value === item.sumQty) {
            item.qty = item.sumQty;
        }
        const myArrayJson = JSON.stringify(cart);
        localStorage.setItem('addCart', myArrayJson);
        render(reCart)
    }
}

function handleDecrease(id) {
    const valueClick = document.getElementById(`valueQuantity${id}`);
    const item = cart.find(el => el.id === id);
    if (item) {
        item.qty = +item.qty - 1;
        if (+valueClick.value <= 1) {
            item.qty = 1;
        }
        const myArrayJson = JSON.stringify(cart);
        localStorage.setItem('addCart', myArrayJson);
        render(reCart)
    }
}

function handleCheckOut() {
    if (reCart.length > 0) {
        for (let i = 0; i < reCart.length; i++) {
            const element = reCart[i];
            element.sumQty = +element.sumQty - +element.qty
        }
        Toastify({
            text: 'Check Out successfully',
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
        const myArray = JSON.stringify(reCart);
        localStorage.setItem('checkOut', myArray);
        setTimeout(() => {
            window.location.href = "/checkOut.html"
        }, 1500);

    } else {
        Toastify({
            text: `You don't have any products yet`,
            color: 'white',
            duration: 1000,
            close: true,
            gravity: 'top',
            left: 0,
            backgroundColor: '#e74c3c',
            style: {
                padding: '20px 50px',
                'font-size': '16px',
            },
        }).showToast();
    }

}
render()