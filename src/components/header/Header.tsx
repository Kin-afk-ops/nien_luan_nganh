"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/logo/logo.png";
import { useState, FormEvent, useEffect } from "react";

import { FaSearch, FaShoppingCart, FaBars } from "react-icons/fa";
import "./header.css";
import "./responsive.css";

import axiosInstance from "@/helpers/api/config";

export default function Header() {
  const [searchValue, setSearchValue] = useState<string>("");
  const handleSearch = async (): Promise<void> => {
    await axiosInstance
      .get(`/product/search?searchValue=${searchValue}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <nav className="header">
      <div className="grid wide header__container">
        {/* Logo */}
        <Link href="/">
          <Image src={logo} alt="Logo" width={120} height={50} />
        </Link>

        {/* Nút Toggle Menu */}
        {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <FaBars />
        </button> */}

        {/* Nội dung menu */}
        <div className="header__search">
          {/* Ô tìm kiếm */}

          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Ngăn hành động mặc định (nếu có)
                handleSearch();
              }
            }}
          />
          <button className="header__search--icon" onClick={handleSearch}>
            <FaSearch size={18} />
          </button>

          {/* Menu điều hướng */}
        </div>
        <div className="header__navbar">
          <Link
            href="/tai-khoan/dang-nhap"
            className="header__navbar--item"
            style={{ border: "none" }}
          >
            Đăng nhập
          </Link>
          <Link
            href="/tai-khoan/dang-ky"
            className="header__navbar--item"
            style={{ border: "none" }}
          >
            Đăng ký
          </Link>
          <Link href="/tai-khoan/dang-nhap" className="header__navbar--item">
            Đăng bán
          </Link>
        </div>
      </div>
    </nav>
  );
}
