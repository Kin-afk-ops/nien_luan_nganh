"use client";
import Link from "next/link";
import Image from "next/image";

import logo from "../../assets/logo/logo.png";
// import userAvatar from '../../assets/avatar/default-avatar.png';
import { useState, useEffect } from "react";

import { FaSearch, FaShoppingCart, FaBars } from "react-icons/fa";
import { logout } from "@/lib/features/user/userSlice";

import axiosInstance from "@/helpers/api/config";
import "./header.css";
import "./responsive.css";
import { InfoUserInterface } from "@/interfaces/infoUser";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import CategoriesBlock from "../categoriesBlock/CategoriesBlock";
import { CategoriesInterface } from "@/interfaces/categories";
import { useGlobalState } from "@/data/stateStore";

interface ChildProps {
  user: {
    _id: string;
    accessToken: string;
    phone: string;
    email: string;
    firebase: boolean;
  };
}

const HeaderLogged: React.FC<ChildProps> = ({ user }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [infoUser, setInfoUser] = useState<InfoUserInterface | null>(null);
  const [infoUserName, setInfoUserName] = useState<string | null>(null);

  const [displaySearch, setDisplaySearch] = useState<boolean>(false);
  const [displayCategories, setDisplayCategories] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState<CategoriesInterface[] | null>(
    null
  );
  const { setFilter, filterList } = useGlobalState();

  const [searchMode, setSearchMode] = useState<boolean>(false);

  const [cateLabel, setCateLabel] = useState<CategoriesInterface | null>(null);

  useEffect(() => {
    const getInfoUser = async (): Promise<void> => {
      if (user.firebase) {
        setInfoUserName(user.email);
      } else {
        if (user.email !== "none") {
          setInfoUserName(user.email);
        } else {
          setInfoUserName(user.phone);
        }
      }

      try {
        const res = await axiosInstance.get(`/infoUser/${user?._id}`);
        setInfoUser(res.data);
        if (res.data.name) setInfoUserName(res.data.name);
      } catch (error) {
        console.log(error);
      }
    };

    getInfoUser();
  }, [user]);

  // const handleSearch = async (): Promise<void> => {
  //   await axiosInstance
  //     .get(`/product/search?searchValue=${searchValue}`)
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((error) => console.log(error));
  // };

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

  const handleLogout = async () => {
    dispatch(logout());
    window.location.replace("/");
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
            // onMouseEnter={() => handleWhenMouseEnter(true)}
            // onMouseLeave={() => handleWhenMouseEnter(false)}
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
          <Link
            href={`/gio-hang/${user?._id}`}
            className="header__navbar--item"
          >
            <FaShoppingCart size={18} className="me-1" />
          </Link>

          {/* Thông tin người dùng */}
          <div className="header__navbar--item header__navbar--image">
            <Image
              src={
                infoUser?.avatar
                  ? infoUser?.avatar?.path
                  : "/assets/account/avatar_default.png"
              }
              alt="User Avatar"
              width={40}
              height={40}
            />

            <p className="header__navbar--name">{infoUserName}</p>
            <i className="fa-solid fa-angle-down"></i>

            <ul className=" header__navbar--dropdown">
              <li className="header__navbar--dropdown-item">
                <i className="customer__nav--icon fa-regular fa-user"></i>

                <Link href="/ho-so/thong-tin">Hồ sơ của tôi</Link>
              </li>

              <li className="header__navbar--dropdown-item">
                <i className="customer__nav--icon  fa-solid fa-chart-line"></i>
                <Link href="/ho-so/don-ban">Đơn bán</Link>
              </li>

              <li className="header__navbar--dropdown-item">
                <i className="customer__nav--icon  fa-solid fa-cart-shopping"></i>
                <Link href="/ho-so/don-mua">Đơn mua</Link>
              </li>
              <li className="header__navbar--dropdown-item">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <button
                  className="header__navbar--dropdown-logout"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
              </li>
            </ul>
          </div>

          <Link href="/sellform" className="header__navbar--item">
            Đăng bán
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HeaderLogged;
