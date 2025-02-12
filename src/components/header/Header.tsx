import Image from "next/image";
import React from "react";
import logo from "../../assets/logo/logo.png";
import "./header.css";

const Header = () => {
  return (
    <div className="header__container">
      <header className="grid wide">
        <Image src={logo} alt="Mô tả hình ảnh" />
        <input type="text" placeholder="Nhập nội dung tìm kiếm..." />
        <a href="">Đăng ký</a>
        <a href="">Đăng nhập</a>
        <a href="">Đăng bán</a>
        <div className="dropdown-row">
          <select>
            <option value="" hidden>
              Tất cả danh mục
            </option>
            <option value="option1">Lựa chọn 1</option>
            <option value="option2">Lựa chọn 2</option>
          </select>

          <select>
            <option value="" hidden>
              Sách
            </option>
            <option value="option1">Lựa chọn 1</option>
            <option value="option2">Lựa chọn 2</option>
          </select>

          <select>
            <option value="" hidden>
              Quần áo
            </option>
            <option value="option1">Lựa chọn 1</option>
            <option value="option2">Lựa chọn 2</option>
          </select>

          <select>
            <option value="" hidden>
              Mỹ phẩm
            </option>
            <option value="option1">Lựa chọn 1</option>
            <option value="option2">Lựa chọn 2</option>
          </select>

          <select>
            <option value="" hidden>
              Đồ chơi
            </option>
            <option value="option1">Lựa chọn 1</option>
            <option value="option2">Lựa chọn 2</option>
          </select>

          <select>
            <option value="" hidden>
              Thiết bị điện tử
            </option>
            <option value="option1">Lựa chọn 1</option>
            <option value="option2">Lựa chọn 2</option>
          </select>
        </div>
      </header>
    </div>
  );
};

export default Header;
