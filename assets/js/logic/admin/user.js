const user = JSON.parse(localStorage.getItem('user'))
let currentPage = 1; // Trang hiện tại
const itemsPerPage = 12; // Số phần tử trên mỗi trang
function render() {
  const totalPages = Math.ceil(user.length / itemsPerPage);
  let newContent = '';
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const searchInput = document.getElementById('searchInput');
  const keyword = searchInput.value.toLowerCase();
  const itemsToRender = user.filter(item => item.userName.toLowerCase().includes(keyword))
    .slice(startIndex, endIndex);
  itemsToRender.forEach((item, index) => {
    const isBlockValue = item.isBlock ? 'true' : 'false';
    newContent += `
        <tr>
          <td class="text-center">${index + 1}</td>
          <td class="text-center">${item.id}</td>
          <td class="text-center">${item.userName}</td>
          <td class="text-center">${item.email}</td>
          <td class="text-center">${item.password}</td>
          <td class="text-center">
            ${item.role !== 1 ? `<select class="form-select" aria-label="Default select example" onchange="handleSelectChange(${index}, this.value)">
            <option value="true" ${isBlockValue === 'true' ? 'selected' : ''}>True</option>
            <option value="false" ${isBlockValue === 'false' ? 'selected' : ''}>False</option>
          </select>` : ""}
            
          </td>
          <td class="text-center">
            <div>
            ${item.role !== 1 ? `<button class="btn btn-danger" onclick="handleDelete(${item.id})">delete</button>` : ""}
              
            </div>
          </td>
        </tr>`;
  })
  document.querySelector('#showProduct').innerHTML = newContent;
  const paginationContainer = document.querySelector('#pagination');
  paginationContainer.innerHTML = ''; // Xóa các nút phân trang hiện tại

  // Tạo nút cho mỗi trang
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
  // handle paginations
  searchInput.addEventListener('input', () => {
    currentPage = 1; // Reset trang về 1 khi thực hiện tìm kiếm
    render(); // Gọi lại hàm render()
  });
}

function handleSelectChange(index, value) {
  user[index].isBlock = value === 'true';
  const { password, repeatPassword, ...newUser } = user[index];
  const myArrayUser = JSON.stringify(user);
  localStorage.setItem('user', myArrayUser);
}



function handleDelete(id) {
  var result = confirm("Are you sure you want to delete?");
  const deleteItem = user.find(item => item.id === id);
  if (result) {
    if (deleteItem.id === id) {
      const index = user.indexOf(deleteItem);
      user.splice(index, 1);
      const myArrayUser = JSON.stringify(user);
      localStorage.setItem('user', myArrayUser);
      Toastify({
        text: 'Delete user successfully',
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
    }
  }

  render(user)
}
render()