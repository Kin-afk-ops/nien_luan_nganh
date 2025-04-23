"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../assets/logo/logo.png";
import "./header.css"
import Link from "next/link";
import { useGlobalState } from "@/data/stateStore";
import { useRouter } from "next/navigation";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { CategoriesInterface } from "@/interfaces/categories";
import axiosInstance from "@/helpers/api/config";
import CategoriesBlock from "../categoriesBlock/CategoriesBlock";

const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const { setFilter, filterList } = useGlobalState();

  const [displayCategories, setDisplayCategories] = useState<boolean>(false);

  const [categories, setCategories] = useState<CategoriesInterface[] | null>(
    null
  );
  const [searchMode, setSearchMode] = useState<boolean>(false);

  const [cateLabel, setCateLabel] = useState<CategoriesInterface | null>(null);

  const [displaySearch, setDisplaySearch] = useState<boolean>(false);

  const router = useRouter();

  const handleSearch = () => {
    if (searchValue.trim()) {
      setFilter("search", searchValue);
      const query = new URLSearchParams(window.location.search);
      query.set("search", searchValue);
      router.push(`/mua-ban-do-cu?id=1&${query.toString()}`);
      setSearchValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const getCategories = async (): Promise<void> => {
      try {
        const res = await axiosInstance.get(`/category/getallCategories`);
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const handleChangePageCate = () => {
      if (searchMode && cateLabel?.slug && cateLabel?.id) {
        router.push(`/${cateLabel?.slug}?id=${cateLabel?.id}`);
      }
    };

    handleChangePageCate();
  }, [cateLabel, searchMode, router]);

  return (
    <nav className=" header">
      <div className=" grid wide header__container">
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

        {/* Menu Content */}
        <div className="header__categories" id="">
          <button
            className="m-0 s-0 nav-link dropdown-toggle"
            type="button"
            onClick={() => setDisplayCategories(true)}
          >
            Danh Mục
          </button>

          <button className="l-0 " onClick={() => setDisplayCategories(true)}>
            <i className="fa-solid fa-bars"></i>
          </button>

          {displayCategories && (
            <CategoriesBlock
              setDisplayCategories={setDisplayCategories}
              categories={categories}
              setSearchMode={setSearchMode}
              setCateLabel={setCateLabel}
            />
          )}
        </div>

        <div
          className="header__search--mobile-icon"
          onClick={() => setDisplaySearch(true)}
        >
          {" "}
          <i className="fa-solid fa-magnifying-glass "></i>
        </div>

        {displaySearch && (
          <>
            <div
              className="modal-overlay "
              onClick={() => setDisplaySearch(false)}
            ></div>
            <div className="header__search--mobile">
              {/* Ô tìm kiếm */}

              <input
                className=""
                type="text"
                placeholder="Tìm kiếm..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="header__search--icon" onClick={handleSearch}>
                <FaSearch size={18} />
              </button>

              {/* Menu điều hướng */}
            </div>
          </>
        )}

        <div className="header__search">
          {/* Ô tìm kiếm */}

          <input
            className=""
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
          <Link href={"/tai-khoan/dang-nhap"} className="header__navbar--item">
            Đăng nhập
          </Link>
          <Link href={"/tai-khoan/dang-ky"} className="header__navbar--item">
            Đăng ký
          </Link>

          <Link href="/sellform" className="header__navbar--item">
            Đăng bán
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
