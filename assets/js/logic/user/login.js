const registerEmail = document.getElementById('registerEmail');
const registerName = document.getElementById('registerName');
const registerPassword = document.getElementById('registerPassword');
const registerRepeatPassword = document.getElementById('registerRepeatPassword');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
// value login -register
const errRegisterEmail = document.getElementById('errRegisterEmail');
const errRegisterName = document.getElementById('errRegisterName');
const errRegisterPassword = document.getElementById('errRegisterPassword');
const errRegisterRepeatPassword = document.getElementById('errRegisterRepeatPassword');
const errLogin = document.getElementById('errLogin');
// valid data

let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let passwordFormat = /.{8,}/;
// check regex pattern

const data = registerLocal()
function handleRegister() {
    const reEmail = registerEmail.value
    const reName = registerName.value
    const rePassword = registerPassword.value
    const reRepeatPassword = registerRepeatPassword.value

    let newValue = {}
    if (data.length === 0) {
        newValue = { id: 0, role: 1, email: reEmail, isBlock: false, userName: reName, password: rePassword, repeatPassword: reRepeatPassword }
    } else {
        const maxId = Math.max(...data.map(item => item.id));
        newValue = { id: maxId + 1, role: 2, email: reEmail, isBlock: false, userName: reName, password: rePassword, repeatPassword: reRepeatPassword }
    }
    validate(newValue)
}

function validate(params) {
    let isValid = false
    if (params.email === '') {
        isValid = true
        errRegisterEmail.style.display = 'block'
    }
    // check email
    if (params.userName === '') {
        isValid = true
        errRegisterName.style.display = 'block'
    }
    // check email
    if (params.password === '') {
        isValid = true
        errRegisterPassword.style.display = 'block'
    }
    // check password
    if (params.repeatPassword === '') {
        isValid = true
        errRegisterRepeatPassword.style.display = 'block'
    }
    // check repeat password
    if (!mailFormat.test(params.email) && params.email !== '') {
        errRegisterEmail.innerHTML = 'Invalid email format'
        errRegisterEmail.style.display = 'block'
        isValid = true;
    }
    if (!passwordFormat.test(params.password) && params.password !== '') {
        errRegisterPassword.innerHTML = 'Must be more than 8 characters'
        errRegisterPassword.style.display = 'block'
        isValid = true;
    }
    // check regex email

    if (isValid === false) {
        if (params.password === params.repeatPassword) {
            const index = data.findIndex(el => el.email === params.email)
            if (index === -1) {
                Toastify({
                    text: 'Register successfully',
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
                data.push(params)
                const myArrayJson = JSON.stringify(data);
                localStorage.setItem('user', myArrayJson);
                errRegisterEmail.style.display = 'none'
                errRegisterName.style.display = 'none'
                errRegisterPassword.style.display = 'none'
                errRegisterRepeatPassword.style.display = 'none'
                // 
                registerEmail.value = ''
                registerName.value = ''
                registerPassword.value = ''
                registerRepeatPassword.value = ''
                registerLocal()

            } else {
                errRegisterEmail.innerHTML = 'The Email was registered'
                errRegisterEmail.style.display = 'block'
            }
        } else {
            Toastify({
                text: 'Register failed',
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
            return
        }
    }
}
function registerLocal() {
    const results = localStorage.getItem('user');
    const myArray = JSON.parse(results);
    return myArray ? myArray : []
}

//  register

function submitLogin() {
    const loginEmail = document.getElementById('loginEmail').value
    const password = document.getElementById('loginPassword').value
    const value = { email: loginEmail, password: password }
    const user = data.find(el => el.email === value.email && el.password === value.password)
    if (user) {
        const { password, repeatPassword, ...newUser } = user;
        const myArrayJson = JSON.stringify(newUser);
        localStorage.setItem('auth', myArrayJson);
        window.location.href = "index.html";
    } else if (user === undefined) {
        document.getElementById('errLogin').style.display = 'block'
    }
}