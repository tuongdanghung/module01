const email = document.getElementById('email');
const userName = document.getElementById('name');
const isBlock = document.getElementById('isBlock');
const password = document.getElementById('password');
const auth = JSON.parse(localStorage.getItem('auth'));
const user = JSON.parse(localStorage.getItem('user'));
const item = user.find(el => el.id === auth.id);
function render() {
    email.value = item.email;
    userName.value = item.userName;
    password.value = item.password;
    isBlock.value = item.isBlock;
    if (auth.isBlock === "true") {
        document.querySelector('#submit-btn').innerText = "Your account has been locked and cannot be changed"
        document.getElementById('name').disabled = true
        document.getElementById('password').disabled = true
    }
}

function handleUpdate() {
    Toastify({
        text: 'Updated successfully',
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
    item.id,
        item.userName = userName.value,
        item.password = password.value
    item.repeatPassword = password.value
    let newAuth = {
        id: item.id,
        userName: userName.value,
        email: item.email,
        role: item.role,
        isBlock: item.isBlock
    }
    const myArrayJson = JSON.stringify(user);
    localStorage.setItem('user', myArrayJson);
    const myAuth = JSON.stringify(newAuth);
    localStorage.setItem('auth', myAuth);
}
render()