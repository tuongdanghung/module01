const authUser = JSON.parse(localStorage.getItem('auth'))
if (authUser && authUser.role === 1) {
    document.getElementById('checkAdmin').style.display = 'block';
}

if (window.location.href.includes('/admin/addProduct.html') && !authUser) {
    window.location.href = '/index.html';
}
if (window.location.href.includes('/admin/addProduct.html') && authUser.role !== 1) {
    window.location.href = '/index.html';
}
// 
if (window.location.href.includes('/admin/addUser.html') && !authUser) {
    window.location.href = '/index.html';
}

if (window.location.href.includes('/admin/addUser.html') && authUser.role !== 1) {
    window.location.href = '/index.html';
}
// 
if (window.location.href.includes('/admin/addPost.html') && !authUser) {
    window.location.href = '/index.html';
}

if (window.location.href.includes('/admin/addPost.html') && authUser.role !== 1) {
    window.location.href = '/index.html';
}
// 
if (window.location.href.includes('/admin/addComment.html') && !authUser) {
    window.location.href = '/index.html';
}

if (window.location.href.includes('/admin/addComment.html') && authUser.role !== 1) {
    window.location.href = '/index.html';
}
// 
if (window.location.href.includes('/admin/addOrder.html') && !authUser) {
    window.location.href = '/index.html';
}

if (window.location.href.includes('/admin/addOrder.html') && authUser.role !== 1) {
    window.location.href = '/index.html';
}
// 


if (!authUser) {
    document.getElementById("profile").href = "/login.html";
    document.getElementById('checkOrder').style.display = 'none';
    document.getElementById("shopping-cart").style.display = "none";
    document.getElementById("profile").style.display = "none";
    document.getElementById("sign-out").style.marginTop = "17px";
}
function handleLogOut() {
    localStorage.removeItem('auth');
    localStorage.removeItem('productDetail');
    localStorage.removeItem('addCart');
    localStorage.removeItem('blogDetail');
    window.location.href = 'login.html'
}