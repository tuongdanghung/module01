const authUsers = JSON.parse(localStorage.getItem('auth'))
const detailProduct = JSON.parse(localStorage.getItem('productDetail'))
const orderUser = JSON.parse(localStorage.getItem('order'))
const comment = document.getElementById('comment');
const itemId = document.getElementById('itemId');
const errRating = document.getElementById('errRating')
const errComment = document.getElementById('errComment')
const currentDate = new Date();
const day = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const date = day + "/" + month + "/" + year + " " + hours + ":" + minutes;
let previousValue = null;
let dataComment = local()
document.addEventListener('DOMContentLoaded', function () {
    let div = document.querySelector('.comment');
    let buttons = div.getElementsByClassName('rating');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function () {
            let selectedButton = div.querySelector('.bg-rating');
            if (selectedButton) {
                selectedButton.classList.remove('bg-rating');
            }
            this.classList.add('bg-rating');
            previousValue = +this.value;
        });
    }
});

function handleAddComment() {
    if (itemId.value) {
        const itemComment = dataComment.find(el => el.id === +itemId.value)
        itemComment.id = +itemId.value,
            itemComment.userId = authUsers.id,
            itemComment.comment = comment.value,
            itemComment.rating = previousValue
        itemComment.userName = authUsers.userName
        itemComment.idProduct = detailProduct.id
        itemComment.date = date
        validateComment(itemComment)
    } else {
        let newValue = {}
        if (dataComment.length === 0) {
            newValue = {
                id: 0,
                userId: authUsers.id,
                idProductDetail: detailProduct.id,
                comment: comment.value,
                rating: previousValue,
                date: date,
                userName: authUsers.userName
            }
        } else {
            const maxId = Math.max(...dataComment.map(item => item.id));
            newValue = {
                id: maxId + 1,
                userId: authUsers.id,
                idProductDetail: detailProduct.id,
                comment: comment.value,
                rating: previousValue,
                date: date,
                userName: authUsers.userName
            }
        }
        validateComment(newValue)
    }
}

function validateComment(params) {
    const idx = dataComment.find(el => el.id === params.id)
    let isValid = false
    if (params.comment === '') {
        isValid = true
        errRating.style.display = 'block'
    }
    if (params.rating < 1) {
        isValid = true
        errComment.style.display = 'block'
    }
    if (idx === undefined) {
        if (isValid === false) {
            dataComment.push(params)
            const myArrayJson = JSON.stringify(dataComment);
            localStorage.setItem('comment', myArrayJson);
            comment.value = ''
            previousValue = null
            errRating.style.display = 'none'
            errComment.style.display = 'none'
            const item = orderUser.find(el => el.userId === authUsers.id);
            const itemComment = dataComment.find(el => el.userId === authUsers.id);
            if (item && itemComment) {
                document.querySelector('#showFormComment').style.display = 'none';
            }
        }
    } else {
        const myArrayJson = JSON.stringify(dataComment);
        localStorage.setItem('comment', myArrayJson);
        comment.value = ''
        previousValue = null
        errRating.style.display = 'none'
        errComment.style.display = 'none'
        const item = orderUser.find(el => el.userId === authUsers.id);
        const itemComment = dataComment.find(el => el.userId === authUsers.id);
        if (item && itemComment) {
            document.querySelector('#showFormComment').style.display = 'none';
        }
    }
    renderComment(dataComment)
}

function handleDeleteComment(id) {
    const deleteItem = dataComment.find(item => item.id === id);
    if (deleteItem.id === id) {
        comment.value = ""
        const index = dataComment.indexOf(deleteItem);
        dataComment.splice(index, 1);
        const myArrayJson = JSON.stringify(dataComment);
        localStorage.setItem('comment', myArrayJson);
        renderComment(dataComment);
    }
    previousValue = null
    let selectedButton = document.querySelector('.bg-rating')
    selectedButton.classList.remove('bg-rating');
    document.querySelector('#send-comment').innerHTML = 'Send comment';
}


function renderComment() {
    let newContent = '';
    const newDT = dataComment.filter(el => el.idProductDetail === detailProduct.id);
    // -----------------------------
    let arr = []
    for (let i = 0; i < orderUser.length; i++) {
        const element = orderUser[i];
        arr.push(...element.order)
    }

    //b1: kiểm tra trong mảng có phần tử nào idUser = authUsers.id và el.primaryId === detailProduct.id
    // nếu có thì thì show form comment cho comment
    // nếu không có chứng tỏ chưa mua hàng không cho comment
    // b2: kiểm tra xem user đã comment hay chưa băng cách so sánh el.userId === authUsers.id và  el.idProduct === detailProduct.id
    //  nếu có thì ẩn form comment
    // b3 nếu đã comment rồi thì authUsers.id === comment.userId sẽ hiển thị bút edit và delete
    // khi click vào edit thì show form edit ra form comment đã có sẵn value và tiến hành chỉnh sửa
    // -----------------------

    newDT.forEach((comment) => {
        newContent += `
        <li class='list-comment'>
            <p class="user-comment">${comment.userName}
                <span>${comment.rating} <i style="color:#F28123" class='fas fa-star'></i></span></p>
            <p>${comment.comment}</p>
            <span>${comment.date}</span>
            ${authUsers.id === comment.userId ? `<div id='comment-btn'>
                <button onclick='handleEditComment(${comment.id})' class="mr-2">edit</button>
                <button onclick='handleDeleteComment(${comment.id})'>delete</button>
            </div>` : ''}
        </li>`;
    });
    document.querySelector('#showComment').innerHTML = newContent;
    const purchaseCheck = arr.find(el => el.idUser === authUsers.id && el.primaryId === detailProduct.id)
    // check trong order xem user da mua hang hay chua
    if (purchaseCheck) {
        document.querySelector('#showFormComment').style.display = 'block';
    }
    const userComment = dataComment.find(el => el.userId === authUsers.id && el.idProductDetail === detailProduct.id);
    // check user da comment hay chua
    if (userComment) {
        document.querySelector('#showFormComment').style.display = 'none';
    }
}

function handleEditComment(id) {
    document.querySelector('#showFormComment').style.display = 'block';
    document.querySelector('#send-comment').innerHTML = 'Edit comment';
    const editItem = dataComment.find(item => item.id === id);
    itemId.value = editItem.id
    comment.value = editItem.comment
    previousValue = editItem.rating
}

function local() {
    const results = localStorage.getItem('comment');
    const myArray = JSON.parse(results);
    return myArray ? myArray : []
}

renderComment()
