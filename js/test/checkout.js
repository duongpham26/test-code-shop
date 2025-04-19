
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("shipping-form");

    form.addEventListener("submit", function (e) {
      e.preventDefault(); // chặn reload trang

      // Lấy dữ liệu
      const name = document.getElementById("recipient-name").value.trim();
      const phone = document.getElementById("recipient-phone").value.trim();
      const address = document.getElementById("recipient-address").value.trim();
      const note = document.getElementById("recipient-note").value.trim();

      // Validate đơn giản
      if (name === "" || phone === "" || address === "") {
        alert("Vui lòng điền đầy đủ các trường bắt buộc.");
        return;
      }

      const phoneRegex = /^0[0-9]{9}$/;
      if (!phoneRegex.test(phone)) {
        alert("Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng (VD: 0909123456).");
        return;
      }

      // Lưu thông tin vào localStorage hoặc sessionStorage
      const shippingInfo = {
        name: name,
        phone: phone,
        address: address,
        note: note
      };
      localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));

      // Chuyển sang bước tiếp theo
      window.location.href = "checkout4.html"; // thay bằng URL thật của bước tiếp theo
    });
  });


  // checkout 4
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("shipping-method-form");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Lấy giá trị phương thức giao hàng đã chọn
      const selectedShipping = document.querySelector('input[name="shipping"]:checked');
      if (!selectedShipping) {
        alert("Vui lòng chọn phương thức giao hàng.");
        return;
      }

      const shippingMethod = selectedShipping.value;

      // Lưu vào localStorage
      localStorage.setItem("shippingMethod", shippingMethod);

      // Chuyển đến bước thanh toán
      window.location.href = "checkout5.html"; // thay bằng đường dẫn thực tế
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    // Lấy thông tin từ localStorage
    const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));
    const shippingMethod = localStorage.getItem("shippingMethod");
  
    // Hiển thị thông tin người mua
    document.getElementById("buyer-name").innerText = shippingInfo.name;
    document.getElementById("buyer-email").innerText = shippingInfo.email || 'Chưa cung cấp'; // Nếu có email trong shippingInfo
    document.getElementById("buyer-phone").innerText = shippingInfo.phone;
    document.getElementById("shipping-address").innerText = shippingInfo.address;
    
    // Hiển thị phương thức giao hàng
    document.getElementById("shipping-method").innerText = shippingMethod || "Chưa chọn phương thức giao hàng";
  
    // Hiển thị danh sách sản phẩm (có thể thay đổi theo sản phẩm thực tế)
    const productList = document.getElementById("product-list");
    const products = [
      { name: "Trà Thảo Mộc A", price: 120000, quantity: 1 },
      { name: "Thực phẩm B", price: 120000, quantity: 2 }
    ];
  
    let total = 0;
    productList.innerHTML = "";
    products.forEach(product => {
      const totalPrice = product.price * product.quantity;
      total += totalPrice;
  
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.price.toLocaleString()}đ</td>
        <td>${product.quantity}</td>
        <td>${totalPrice.toLocaleString()}đ</td>
      `;
      productList.appendChild(row);
    });
  
    // Hiển thị phí giao hàng và tổng cộng
    const shippingFee = 30000; // Phí giao hàng cố định, có thể thay đổi
    const grandTotal = total + shippingFee;
    document.getElementById("shipping-fee").innerText = shippingFee.toLocaleString() + 'đ';
    document.getElementById("total-price").innerText = grandTotal.toLocaleString() + 'đ';
  });


  // qr code ===============================
  document.querySelector(".btn-success").addEventListener("click", function() {
    document.getElementById("qrModal").style.display = "block";
  });
  
  document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("qrModal").style.display = "none";
  });
  
  window.onclick = function(event) {
    const modal = document.getElementById("qrModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };  


//   //send zalo
//   function sendZaloMessage() {
//     const data = {
//       recipient: {
//         user_id: "ZALO_USER_ID" // ID Zalo của người nhận
//       },
//       message: {
//         text: "Cảm ơn bạn đã thanh toán! Đơn hàng của bạn đang được xử lý."
//       }
//     };
  
//     fetch("https://openapi.zalo.me/v2.0/oa/message", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "access_token": "YOUR_ACCESS_TOKEN" // Access Token của OA
//       },
//       body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(result => {
//       console.log("Zalo response", result);
//       alert("Đã gửi tin nhắn Zalo thành công!");
//     })
//     .catch(error => {
//       console.error("Lỗi gửi Zalo:", error);
//     });
//   }

function sendZaloMessage() {
    alert("Cảm ơn bạn đã thanh toán!\n\nVui lòng gửi mã đơn hàng hoặc ảnh minh chứng thanh toán qua Zalo để nhân viên xác nhận và gửi phần mềm.");
    
    // Mở Zalo OA bán hàng
    window.open("https://zalo.me/ID_OA_CUA_BAN", "_blank"); 
  }