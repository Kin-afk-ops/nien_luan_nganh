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
import { InfoUserInterface } from "@/interfaces/infoUser";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

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
  const [searchValue, setSearchValue] = useState<string>("");

  const [isLoading, setIsLoading] = useState(true);

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
        console.log(res.data);

        setInfoUser(res.data);
        if (res.data.name) setInfoUserName(res.data.name);
      } catch (error) {
        console.log(error);
      }
    };

    getInfoUser();
  }, [user]);

  const handleSearch = async (): Promise<void> => {
    await axiosInstance
      .get(`/product/search?searchValue=${searchValue}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const handleLogout = async () => {
    dispatch(logout());
    window.location.replace("/");
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
          <Link href="/gio-hang" className="header__navbar--item">
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
