const product = JSON.parse(localStorage.getItem('product'));
const blog = JSON.parse(localStorage.getItem('post'));
const newArr = product.slice(0, 4);
const newProduct = product.slice(0, 3);
const newBlog = blog.slice(0, 3);
function renderOwl() {
	let newContent = '';
	newArr.forEach((item) => {
		newContent += `
        <div class="text-center">
			<div class="single-product-item">
				<div>
					<a onclick='handleDetail(${item.id})' href="single-product.html">
						<img height="170px" src="assets/img/products/${item.img[0].src}" alt="">
					</a>
				</div>
				<h3 class="mt-2">${item.title}</h3>
				<p class="product-price"><span>Sell of 30%: ${(item.price * 30) / 100}$</span> ${item.price} $</p>
				<button class="btn-seemore" onclick='handleDetail(${item.id})' class="cart-btn">
					<i class="fas fa-shopping-cart"></i> See More</button>
			</div>
		</div>`;
	});
	document.getElementById('showOwl').innerHTML = newContent
}

function handleDetail(id) {
	const item = newArr.find(item => item.id === id);
	const myArrayJson = JSON.stringify(item);
	localStorage.setItem('productDetail', myArrayJson);
	window.location.href = 'http://127.0.0.1:5502/single-product.html'
}

function renderOur() {
	let newContent = '';
	newProduct.forEach((item) => {
		newContent += `
        <div class="col-lg-4 col-md-6 text-center">
			<div class="single-product-item">
				<div class="p-3">
					<a onclick='handleDetail(${item.id})' href="single-product.html">
						<img src="assets/img/products/${item.img[0].src}" alt="">
					</a>
				</div>
				<h3>${item.title}</h3>
				<p class="product-price">${item.price}$ </p>
				<button class="btn-seemore" onclick='handleDetail(${item.id})' class="cart-btn">
					<i class="fas fa-shopping-cart"></i> See More</button>
			</div>
		</div>`;
	});
	document.getElementById('showOur').innerHTML = newContent
}

function renderBlog() {
	let newContent = '';
	newBlog.forEach((item) => {
		newContent += `
        <div class="col-lg-4 col-md-6">
			<div class="single-latest-news">
				<a href="single-news.html">
					<div style="background-image: url('${item.img}')" class="latest-news-bg"></div>
				</a>
				<div class="news-text-box">
					<h3><a href="single-news.html">${item.title}</a></h3>
					<p class="blog-meta">
						<span class="author"><i class="fas fa-user"></i> Admin</span>
						<span class="date"><i class="fas fa-calendar"></i> 27 December, 2019</span>
					</p>
					<p class="excerpt prd-description">${item.description}</p>
					<a href="single-news.html" class="read-more-btn">read more <i
							class="fas fa-angle-right"></i></a>
				</div>
			</div>
		</div>`;
	});
	document.getElementById('show-blog').innerHTML = newContent
}

renderBlog()

renderOwl()

renderOur()

