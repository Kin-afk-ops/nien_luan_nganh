"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/logo/logo.png";
import { useAppSelector } from "@/lib/store";
import React, { useEffect, useState, FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch, FaShoppingCart, FaBars } from "react-icons/fa";
import { logout } from "@/lib/features/user/userSlice";
import { useDispatch } from "react-redux";
import axiosInstance from "@/helpers/api/config";

type SubCategoryType = {
  [key: string]: string;
};

type CategoryType = {
  "hang-sx"?: SubCategoryType;
  "loai-sp"?: SubCategoryType;
  "dung-luong"?: SubCategoryType;
  "mau-sac"?: SubCategoryType;
};

type DanhmucType = {
  [key: string]: CategoryType;
};

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", avatar: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const dispatch = useDispatch();

  const danhmuc: DanhmucType = {
    "dien-thoai": {
      "hang-sx": {
        samsung: "Samsung",
        apple: "Apple",
        xiaomi: "Xiaomi",
        oppo: "Oppo",
        vivo: "Vivo",
        nokia: "Nokia",
      },
      "dung-luong": {
        "64gb": "64GB",
        "128gb": "128GB",
        "256gb": "256GB",
        "512gb": "512GB",
      },
      "mau-sac": {
        den: "Đen",
        trang: "Trắng",
        xanh: "Xanh",
        do: "Đỏ",
        vang: "Vàng",
      },
    },
    "phu-kien": {
      "loai-sp": {
        "tai-nghe": "Tai nghe",
        "sac-du-phong": "Sạc dự phòng",
        "cap-sac": "Cáp sạc",
      },
      "hang-sx": {
        apple: "Apple",
        samsung: "Samsung",
        xiaomi: "Xiaomi",
        oppo: "Oppo",
        vivo: "Vivo",
      },
    },
    laptop: {
      "hang-sx": {
        apple: "Apple",
        samsung: "Samsung",
        xiaomi: "Xiaomi",
      },
    },
  };

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
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

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
  };

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

        {/* Toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <FaBars />
        </button>

        {/* Menu content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-3">
            {/* Dropdown Danh Mục */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn"
                data-bs-toggle="dropdown"
              >
                Danh Mục
              </button>
              <ul className="dropdown-menu">
                {Object.keys(danhmuc).map((key) => (
                  <li key={key} className="dropdown-submenu position-relative">
                    <div
                      className="dropdown-item"
                      onMouseEnter={() => setHoveredCategory(key)}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                      {hoveredCategory === key && (
                        <ul className="dropdown-menu position-absolute start-100 top-0 mt-0 ms-1 show">
                          {Object.entries(danhmuc[key]).map(
                            ([subKey, subValue]) => (
                              <li key={subKey}>
                                <span className="dropdown-item-text fw-bold">
                                  {subKey === "hang-sx"
                                    ? "Hãng sản xuất"
                                    : subKey === "loai-sp"
                                    ? "Loại sản phẩm"
                                    : subKey === "dung-luong"
                                    ? "Dung lượng"
                                    : subKey === "mau-sac"
                                    ? "Màu sắc"
                                    : subKey}
                                </span>
                                <ul className="dropdown-menu show position-static">
                                  {Object.entries(subValue).map(
                                    ([subSubKey, subSubValue]) => (
                                      <li key={subSubKey}>
                                        <Link
                                          className="dropdown-item ps-4"
                                          href={`/${key}/${subKey}/${subSubKey}`}
                                        >
                                          {subSubValue}
                                        </Link>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          {/* Search form */}
          <form
            className="d-flex flex-grow-1 position-relative mx-2"
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

          {/* Right Menu */}
          <div className="d-flex align-items-center gap-3 ms-auto">
            <Link href="/gio-hang" className="btn text-primary">
              <FaShoppingCart size={20} />
            </Link>

            {/* User dropdown */}
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
                  <button className="dropdown-item" onClick={handleLogout}>
                    Đăng xuất
                  </button>
                </li>
              </ul>
            </div>

            {/* Đăng bán */}
            <Link
              href="/dangban"
              className="btn text-white"
              style={{ backgroundColor: "#FF8C00" }}
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
}
