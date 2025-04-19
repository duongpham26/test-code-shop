// Mở modal khi nhấn "Tạo bài viết"
document.querySelector(".btn-success").addEventListener("click", function() {
    document.getElementById("qrModal").style.display = "block";
  });
  
  // Đóng modal khi nhấn "X"
  document.querySelectorAll(".closeModalBtn").forEach(button => {
    button.addEventListener('click', function() {
      document.getElementById('qrModal').style.display = 'none';
    });
  });
  
  // Đóng modal khi click ngoài modal
  window.onclick = function(event) {
    const modal = document.getElementById("qrModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
  
  // Xử lý lưu sản phẩm
  document.getElementById('saveBtn').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const content = document.getElementById('content').value;
    const imageFile = document.getElementById('image').files[0];  // Lấy file ảnh
    const link = document.getElementById('link').value;
  
    if (name && content && imageFile && link) {
      // Chuyển file ảnh thành Data URL
      const reader = new FileReader();
      reader.onloadend = function() {
        const imageDataURL = reader.result; // Data URL của ảnh
  
        // Lưu thông tin sản phẩm vào localStorage
        const product = { name, content, image: imageDataURL, link };
        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products)); // Lưu vào localStorage
  
        // Hiển thị sản phẩm
        displayProducts();
  
        // Đóng modal và reset form
        document.getElementById('qrModal').style.display = 'none';
        document.getElementById('productForm').reset();
      };
      
      // Đọc file ảnh dưới dạng Data URL
      reader.readAsDataURL(imageFile);
    } else {
      alert('Vui lòng điền đầy đủ thông tin!');
    }
  });
  
  // Hiển thị sản phẩm dưới dạng card
  function displayProducts() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = ''; // Xóa tất cả sản phẩm cũ
    const products = JSON.parse(localStorage.getItem('products')) || [];
  
    products.forEach(product => {
      const card = document.createElement('div');
      card.classList.add('col-md-4', 'col-sm-6', 'mb-3');
      card.innerHTML = `
        <div class="card">
          <img src="${product.image}" class="card-img-top" alt="Hình ảnh sản phẩm">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.content}</p>
            <a href="${product.link}" class="btn btn-primary" target="_blank">Xem demo</a>
          </div>
        </div>
      `;
      productGrid.appendChild(card);
    });
  }
  
  // Hiển thị sản phẩm khi trang được tải
  displayProducts();
  