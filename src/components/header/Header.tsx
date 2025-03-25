"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../assets/logo/logo.png";
import "./header.css";
import Link from "next/link";

const Header = () => {
  const [headerInputFocus, setHeaderInputFocus] = useState<boolean>(false);

  return (
    <header>
      <div className="header__container">
        <div className="grid wide ">
          <div className="row header__main">
            <div className="l-2">
              <Link href={"/"} className="link">
                <Image
                  src={"/assets/oreka_logo.png"}
                  alt="logo"
                  width={84}
                  height={25}
                />
              </Link>
            </div>
            <div className="l-5">
              <div
                className={
                  headerInputFocus ? "header__input focus" : "header__input"
                }
              >
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  onFocus={() => {
                    setHeaderInputFocus(true);
                  }}
                  onBlur={() => {
                    setHeaderInputFocus(false);
                  }}
                />
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
            {/* <div className="l-2"></div> */}
            <div className="l-5 header__user">
              <p>Đăng ký</p>
              <p>Đăng nhập</p>
              <button className="main-btn">Đăng bán</button>
            </div>
          </div>
        </div>
      </div>
      <div className="header__container">
        <div className="grid wide">
          <div className="row no-gutters header__categories">
            <i className="fa-solid fa-bars"></i>
            <div>Sách</div>
            <div>Đồ cho nam</div>
            <div>Thời trang nữ</div>
            <div>Đồ làm đẹp </div>
            <div>Đồ cho mẹ và bé</div>
            <div>Đồ chơi & trò chơi</div>
            <div>Đồ dùng nhà cửa</div>
            <div>Thiết bị điện tử</div>
            <div>Đồ văn phòng</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
