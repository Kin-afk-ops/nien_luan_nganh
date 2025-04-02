"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/logo/logo.png";
import { useAppSelector } from "@/lib/store";
// import userAvatar from '../../assets/avatar/default-avatar.png';
import React, { ChangeEvent, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch, FaShoppingCart, FaBars } from "react-icons/fa";
import { logout } from "@/lib/features/user/userSlice";
import { useDispatch } from "react-redux";
import axiosInstance from "@/helpers/api/config";

interface ChildProps {
  user: {
    _id: string;
    accessToken: string;
    phone: string;
    email: string;
    firebase: boolean;
  } | null;
}

const HeaderLogged: React.FC<ChildProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const [userInfo, setUserInfo] = useState({ name: "", avatar: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUserInfoApi();
  }, []);

  const getUserInfo = (user: any) => {
    try {
      if (user && user.name) {
        setUserInfo({
          name: user.name,
          avatar: user.avatar?.path || "",
        });
      } else {
        setUserInfo({ name: "User", avatar: "" });
      }
    } catch (err) {
      setUserInfo({ name: "User", avatar: "" });
    } finally {
      setIsLoading(false);
    }
  };

  const getUserInfoApi = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axiosInstance.get(
        "infoUser/67d2576a25ba8a11767e2b53"
      );
      getUserInfo(response.data);
    } catch (err) {
      setError("Failed to load user info");
      setUserInfo({ name: "User", avatar: "" });
      setIsLoading(false);
    }
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    alert("Đăng xuất thành công");
    window.location.href = "/tai-khoan/dang-nhap";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" href="/HomePage">
          <Image src={logo} alt="Logo" width={120} height={50} />
        </Link>

        {/* Nút Toggle Menu */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <FaBars />
        </button>

        {/* Nội dung menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Ô tìm kiếm */}
          <form
            className="d-flex flex-grow-1 mx-lg-4 my-2 my-lg-0 position-relative"
            onSubmit={handleSearch}
          >
            <input
              className="form-control pe-5"
              type="search"
              placeholder="Tìm kiếm..."
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="btn position-absolute end-0 top-50 translate-middle-y me-2 border-0 bg-transparent"
              type="submit"
            >
              <FaSearch size={18} />
            </button>
          </form>

          {/* Menu điều hướng */}
          <div className="d-flex flex-column flex-lg-row gap-2 align-items-lg-center">
            <Link href="/gio-hang" className="btn text-primary">
              <FaShoppingCart size={18} className="me-1" />
            </Link>

            {/* Thông tin người dùng */}
            <div className="dropdown">
              <button
                className="btn dropdown-toggle d-flex align-items-center"
                type="button"
                data-bs-toggle="dropdown"
              >
                {!isLoading && userInfo.avatar && (
                  <Image
                    src={userInfo.avatar}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-circle me-2"
                  />
                )}
                {isLoading ? "Loading..." : userInfo.name || "User"}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" href="/tai-khoan">
                    Trang cá nhân
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    href="/dang-xuat"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </Link>
                </li>
              </ul>
            </div>

            <Link
              href="/dangban"
              className="btn"
              style={{
                backgroundColor: "#FF8C00",
                color: "white",
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#E07B00")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#FF8C00")
              }
            >
              Đăng bán
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderLogged;
