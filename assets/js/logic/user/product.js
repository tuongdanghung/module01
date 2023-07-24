const data = JSON.parse(localStorage.getItem('product'));
let currentPage = 1; // Trang hiện tại
const itemsPerPage = 8; // Số phần tử trên mỗi trang
function render() {
	const totalPages = Math.ceil(data.length / itemsPerPage);
	let newContent = '';
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const searchInput = document.getElementById('searchInput');
	const keyword = searchInput.value.toLowerCase();
	const itemsToRender = data.filter(item => item.title.toLowerCase().includes(keyword))
		.slice(startIndex, endIndex);
	itemsToRender.forEach(element => {
		newContent += `
        <div class="col-lg-3 col-md-6 text-center">
			<div class="single-product-item">
				<div class="product-image">
					<a href="single-product.html" onclick="handleDetail(${element.id})">
						<img src="assets/img/products/${element.img[0].src}" alt="">
					</a>
				</div>
				<h3>${element.title}</h3>
				<p class="product-price"><span>Quantity : ${element.quantity !== 0 ? element.quantity : '<i class="text-danger">Out of stock</i>'} pcs</span> ${element.price} $ </p>
				<a href="single-product.html" onclick="handleDetail(${element.id})" class="cart-btn"><i class="fas fa-shopping-cart"></i> Add to Cart</a>
			</div>
		</div>
        `
	});
	console.log(itemsToRender)
	document.querySelector('#showProduct').innerHTML = newContent;
	if (itemsToRender.length === 0) {
		document.querySelector('#showProduct').innerText = `No product found`
	}
	const paginationContainer = document.querySelector('#pagination');
	paginationContainer.innerHTML = ''; // Xóa các nút phân trang hiện tại
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

function handleDetail(id) {
	const item = data.find(item => item.id === id);
	const myArrayJson = JSON.stringify(item);
	localStorage.setItem('productDetail', myArrayJson);
}
render()