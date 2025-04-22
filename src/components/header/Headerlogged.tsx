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

const HeaderLogged: React.FC<ChildProps> = ({ user }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [infoUser, setInfoUser] = useState<InfoUserInterface | null>(null);
  const [infoUserName, setInfoUserName] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [displaySearch, setDisplaySearch] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>("dien-thoai");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [displayCategories, setDisplayCategories] = useState<boolean>(false);
  const [searchValue, setsearchValue] = useState('');
  const [categories, setCategories] = useState<CategoriesInterface[] | null>(
    null
  );
  const {setFilter, filterList} = useGlobalState();

  const [serchMode, setSearchMode] = useState<boolean>(false);

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
        setFilter('search',searchValue);
        const query = new URLSearchParams(window.location.search);
        query.set("search", searchValue);
        router.push(`/mua-ban-do-cu?id=1&${query.toString()}`);
        setsearchValue('');
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
  const handleWhenMouseEnter = (state: boolean) => {
    const dropdownMenu = document.querySelector(
      ".dropdown-menu"
    ) as HTMLElement;
    if (dropdownMenu) {
      if (state) {
        dropdownMenu.style.display = "block";
      } else {
        dropdownMenu.style.display = "none";
      }
    }
  };

  const handleSubmenuMouseEnter = (state: boolean) => {
    const submenu = document.querySelector(".submenu") as HTMLElement;
    if (submenu) {
      if (state) {
        submenu.style.display = "block";
      } else {
        submenu.style.display = "none";
      }
    }
  };

  const handleCategoryHover = (category: string | null) => {
    setHoveredCategory(category);
  };

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

          {/* <ul
            className="header__categories--list"
            onMouseEnter={() => handleWhenMouseEnter(true)}
            onMouseLeave={() => handleWhenMouseEnter(false)}
          >
            {Object.keys(danhmuc).map((key) => (
              <li
                key={key}
                onMouseEnter={() => handleCategoryHover(key)}
                onMouseLeave={() => handleCategoryHover(null)}
              >
                <button className="dropdown-item">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>

                {hoveredCategory === key && (
                  <ul className="dropdown-menu submenu">
                    {Object.entries(danhmuc[key]).map(([subKey, subValue]) => (
                      <li key={subKey} className="dropdown-item-container">
                        <span className="dropdown-item submenu-title">
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
                        <ul className="dropdown-menu submenu">
                          {Object.entries(subValue).map(
                            ([subSubKey, subSubValue]) => (
                              <li key={subSubKey}>
                                <Link
                                  className="dropdown-item"
                                  href={`/${key}/${subKey}/${subSubKey}`}
                                >
                                  {subSubValue}
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul> */}
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
                onChange={(e) => setsearchValue(e.target.value)}
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
            onChange={(e) => setsearchValue(e.target.value)}
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
