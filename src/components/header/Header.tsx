"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/logo/logo.png";
import { useState, FormEvent, useEffect } from "react";

import { FaSearch, FaShoppingCart, FaBars } from "react-icons/fa";
import "./header.css";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <nav className="header">
      <div className="header__container">
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
            type="search"
            placeholder="Tìm kiếm..."
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="header__search--icon" type="submit">
            <FaSearch size={18} />
          </button>
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
          <Link href="/dangban" className="header__navbar--item">
            Đăng bán
          </Link>
        </div>
      </div>
    </nav>
  );
}
