const data = JSON.parse(localStorage.getItem('post'))
let currentPage = 1; // Trang hiện tại
const itemsPerPage = 6; // Số phần tử trên mỗi trang
function render() {
	let newContent = '';
	const totalPages = Math.ceil(data.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const searchInput = document.getElementById('searchInput');
	const keyword = searchInput.value.toLowerCase();
	const itemsToRender = data.filter(item => item.title.toLowerCase().includes(keyword))
		.slice(startIndex, endIndex);
	itemsToRender.forEach((item) => {
		newContent += `
        <div class="col-lg-4 col-md-6">
					<div class="single-latest-news">
						<a onclick="handleClick(${item.id})" href="single-news.html">
                        <div style="background-image: url('${item.img}')" class="latest-news-bg"></div>
						</a>
						<div class="news-text-box">
							<h3><h4>${item.title}</h4></h3>
							<p class="excerpt prd-description">${item.description}</p>
							<button onclick="handleClick(${item.id})" class="read-more-btn">read more <i
									class="fas fa-angle-right"></i></button>
						</div>
					</div>
				</div>
        `
	})
	document.getElementById('show-post').innerHTML = newContent
	if (itemsToRender.length === 0) {
		document.getElementById('show-post').innerText = 'No posts found'
	}
	const paginationContainer = document.querySelector('#pagination');
	// 
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

function handleClick(id) {
	const item = data.find(el => el.id === id)
	const myArray = JSON.stringify(item);
	localStorage.setItem('blogDetail', myArray);
	window.location.href = "http://127.0.0.1:5502/single-news.html"
}

render()