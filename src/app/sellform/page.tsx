"use client";
import "./sellform.css";

const DangBan = () => {
  const handleImagePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const previewContainer = document.getElementById("image-preview-container");

    if (files && previewContainer) {
      previewContainer.innerHTML = ""; // Clear any previous previews

      Array.from(files).forEach((file) => {
        if (
          file &&
          (file.type.startsWith("image/") || file.type.startsWith("video/"))
        ) {
          const reader = new FileReader();

          reader.onload = function (e) {
            const result = e.target?.result as string;

            // Create preview element based on file type
            const previewElement = document.createElement(
              file.type.startsWith("image/") ? "img" : "video"
            );
            previewElement.src = result;
            previewElement.style.display = "block";

            if (file.type.startsWith("video/")) {
              previewElement.setAttribute("controls", "controls");
              previewElement.style.maxWidth = "100%"; // Ensure video is responsive
            }

            previewContainer.appendChild(previewElement);
          };

          reader.readAsDataURL(file);
        }
      });
    }
  };

  return (
    <div className="wrapper">
      <div className="page-name">
        <h1>Đăng bán</h1>
        <p>
          Mô tả các mặt hàng một cách trung thực và nhận được khoản thanh toán
          đảm bảo 100%.
        </p>
      </div>
      <div className="sellform-container">
        <div className="image-vid">
          <h4>Ảnh và video:</h4>
          <div className="file-upload-wrapper">
            <input
              type="file"
              accept="image/*,video/*"
              id="file-upload"
              multiple // Allows multiple file uploads
              onChange={handleImagePreview}
            />
            <label htmlFor="file-upload">Tải lên hình ảnh và video</label>
          </div>
          <div id="image-preview-container" className="review-image">
            {/* Previews will be dynamically added here */}
          </div>
        </div>
        <div className="category">
          <h4>Danh mục</h4>
          <select className="category-option">
            <option value="" hidden>
              Lựa chọn danh mục
            </option>
            <option value="option1">Lựa chọn 1</option>
            <option value="option2">Lựa chọn 2</option>
          </select>
        </div>
        <div className="name-product">
          <h4>Tên sản phẩm:</h4>
          <input type="text" name="product-name" id="product-name" />
        </div>
        <div className="status">
          <h4>Tình trạng:</h4>
          <div>
            <div className="option">
              <input type="radio" name="status" id="new" />
              <label htmlFor="new">Hàng mới</label>
            </div>
            <div className="option">
              <input type="radio" name="status" id="like-new" />
              <label htmlFor="like-new">Như mới</label>
            </div>
            <div className="option">
              <input type="radio" name="status" id="good" />
              <label htmlFor="good">Tốt</label>
            </div>
            <div className="option">
              <input type="radio" name="status" id="average" />
              <label htmlFor="average">Trung bình</label>
            </div>
            <div className="option">
              <input type="radio" name="status" id="bad" />
              <label htmlFor="bad">Kém</label>
            </div>
          </div>
        </div>
        <div className="quantity">
          <h4>Số lượng:</h4>
          <input type="number" name="quantity" id="quantity" />
        </div>
        <div className="price">
          <h4>Giá bán:</h4>
          <input type="number" name="price" id="price-input" />
          <input type="radio" name="free" id="free-radio" />
          <label htmlFor="free-radio">Hàng miễn phí</label>
        </div>
      </div>
      <a href="#" className="nextbtn">
        Đăng bán
      </a>
    </div>
  );
};

export default DangBan;
