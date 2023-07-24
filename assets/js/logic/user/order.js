const data = JSON.parse(localStorage.getItem('checkOut'));
const productDetail = JSON.parse(localStorage.getItem('productDetail'));
const order = JSON.parse(localStorage.getItem('order'));
const auth = JSON.parse(localStorage.getItem('auth'));
const product = JSON.parse(localStorage.getItem('product'));
const reName = document.getElementById('reName')
const reEmail = document.getElementById('reEmail')
const reAddress = document.getElementById('reAddress')
const rePhone = document.getElementById('rePhone')
const reNote = document.getElementById('note')
const reCartNumber = document.getElementById('cartNumber')
const reCvv = document.getElementById('cvvNumber')
// 
const errName = document.getElementById('errName')
const errEmail = document.getElementById('errEmail')
const errAddress = document.getElementById('errAddress')
const errPhone = document.getElementById('errPhone')
const errCartNumber = document.getElementById('errCartNumber')
const errPassNumber = document.getElementById('errPassNumber')
const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const date = day + "/" + month + "/" + year + " " + hours + ":" + minutes;
const dataOrder = orderLocal()
const regex = /^\d{10,14}$/;
const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
const cvvPattern = /^[0-9]{3,4}$/;
const paymentMethodRadios = document.getElementsByName("paymentMethod");
paymentMethodRadios.forEach((radio) => {
    radio.addEventListener("click", function () {
        const selectedValue = this.value;
        if (selectedValue === "payment") {
            document.getElementById("form-payment").style.display = "flex"
        } else {
            document.getElementById("form-payment").style.display = "none"
        }
    });
});


function handleOrder() {
    let sum = 0
    let discount = 0
    let totalNumber = 0
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        sum = sum + (+element.qty * +element.price)
    }
    if (sum < 1000) {
        totalNumber = sum
    } else if (sum >= 1000 && sum <= 1999) {
        totalNumber = sum - (sum * 10) / 100
        discount = 10
    } else if (sum >= 2000 && sum <= 2999) {
        totalNumber = sum - (sum * 20) / 100
        discount = 20
    } else if (sum >= 3000 && sum <= 3999) {
        totalNumber = sum - (sum * 30) / 100
        discount = 30
    } else {
        totalNumber = sum - (sum * 50) / 100
        discount = 50
    }
    const reNameValue = reName.value;
    const reEmailValue = reEmail.value;
    const reAddressValue = reAddress.value;
    const rePhoneValue = rePhone.value;
    const reNoteValue = reNote.value;
    const reCartNumberValue = reCartNumber.value;
    const reCvvValue = reCvv.value;
    let paymentMethodValue = "";
    for (let i = 0; i < paymentMethodRadios.length; i++) {
        if (paymentMethodRadios[i].checked) {
            paymentMethodValue = paymentMethodRadios[i].value;
            break;
        }
    }
    let paymentStatus = 'unpaid'
    if (paymentMethodValue === 'payment') {
        paymentStatus = 'completely payment'
    }
    let list = {}
    if (dataOrder.length === 0) {
        list = {
            id: 0,
            payments: paymentMethodValue,
            date: date,
            cartNumber: reCartNumberValue,
            paymentStatus: paymentStatus,
            cvv: reCvvValue,
            codeOrders: (Math.random() * 100000),
            userId: auth.id,
            discount: discount,
            sumOrder: totalNumber,
            shipping: 45,
            orderStatus: 'pending',
            userName: reNameValue,
            email: reEmailValue,
            address: reAddressValue,
            phone: rePhoneValue,
            note: reNoteValue,
            order: data
        }
    } else {
        const maxId = Math.max(...dataOrder.map(item => item.id));
        list = {
            id: maxId + 1,
            payments: paymentMethodValue,
            paymentStatus: paymentStatus,
            date: date,
            cartNumber: reCartNumberValue,
            cvv: reCvvValue,
            codeOrders: (Math.random() * 100000),
            userId: auth.id,
            discount: discount,
            sumOrder: totalNumber,
            shipping: 45,
            orderStatus: 'pending', userName: reNameValue, email: reEmailValue,
            address: reAddressValue,
            phone: rePhoneValue,
            note: reNoteValue,
            order: data
        }
    }
    validate(list)
}

function validate(params) {
    let isValid = false
    if (params.payments === "payment") {
        if (params.cartNumber === '') {
            isValid = true
            errCartNumber.style.display = 'block'
        }
        if (params.cvv === '') {
            isValid = true
            errPassNumber.style.display = 'block'
        }
        if (!visaPattern.test(params.cartNumber) && params.cartNumber !== '') {
            isValid = true
            errCartNumber.innerHTML = 'Invalid cart number format. Series of 16 numbers'
            errCartNumber.style.display = 'block'
        }
        if (!cvvPattern.test(params.cvv) && params.cvv !== '') {
            isValid = true
            errPassNumber.innerHTML = 'Invalid pass number format. Series of 3 or 4 numbers'
            errPassNumber.style.display = 'block'
        }
    }
    if (params.userName === '') {
        isValid = true
        errName.style.display = 'block'
    }
    if (params.email === '') {
        isValid = true
        errEmail.style.display = 'block'
    }
    if (params.address === '') {
        isValid = true
        errAddress.style.display = 'block'
    }
    if (params.phone === '') {
        isValid = true
        errPhone.style.display = 'block'
    }
    if (!regex.test(params.phone) && params.phone !== '') {
        isValid = true
        errPhone.innerHTML = 'Enter the correct Vietnamese phone number format'
        errPhone.style.display = 'block'
    }
    if (isValid === false) {
        product.forEach((itemA) => {
            // tiến hành lặp
            const matchingItem = params.order.find((itemB) => itemA.id === itemB.primaryId);
            // tiến hành tìm kiếm
            if (matchingItem) {
                itemA.quantity = matchingItem.sumQty;
            }
        });
        dataOrder.push(params)
        const myArrayJson = JSON.stringify(dataOrder);
        localStorage.setItem('order', myArrayJson);
        const myArrayProduct = JSON.stringify(product);
        localStorage.setItem('product', myArrayProduct);
        reAddress.value = '';
        rePhone.value = '';
        reNote.value = '';
        localStorage.removeItem('addCart')
        localStorage.removeItem('checkOut')
        localStorage.removeItem('productDetail')
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
        setTimeout(() => {
            window.location.reload();
        }, 1500);
    } else {
        return
    }
}

function orderLocal() {
    const results = localStorage.getItem('order');
    const myArray = JSON.parse(results);
    return myArray ? myArray : []
}

function render() {
    let newContent = '';
    let sum = 0
    let totalNumber = 0
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        sum = sum + (+element.qty * +element.price)
    }
    if (sum < 1000) {
        totalNumber = sum
    } else if (sum >= 1000 && sum <= 1999) {
        totalNumber = sum - (sum * 10) / 100
    } else if (sum >= 2000 && sum <= 2999) {
        totalNumber = sum - (sum * 20) / 100
    } else if (sum >= 3000 && sum <= 3999) {
        totalNumber = sum - (sum * 30) / 100
    } else {
        totalNumber = sum - (sum * 50) / 100
    }
    data && data.forEach((item) => {
        sum = sum + (item.qty * item.price)
        newContent += `
        <tr>
			<td>${item.qty}</td>
			<td>${item.price}$</td>
			<td>${item.qty * item.price}$</td>
		</tr>
        `
    })
    document.getElementById('sum').innerHTML = (totalNumber + 45) + "$"
    document.getElementById('show').innerHTML = newContent
    reName.value = auth.userName
    reEmail.value = auth.email
}
render()