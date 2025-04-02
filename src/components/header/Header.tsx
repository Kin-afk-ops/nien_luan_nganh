'use client';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/logo/logo.png';
import { useState, FormEvent, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaShoppingCart, FaBars, FaList } from 'react-icons/fa';
import './Header.css'

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

const DropdownMenu = ({ items, basePath }: { items: { [key: string]: string }, basePath: string }) => (
  <ul className="dropdown-menu">
    {Object.keys(items).map((key) => (
      <li key={key}>
        <Link className="dropdown-item" href={`${basePath}/${key}`}>
          {items[key]}
        </Link>
      </li>
    ))}
  </ul>
);

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('dien-thoai');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
  };

  const danhmuc: DanhmucType = {
    "dien-thoai": {
      "hang-sx": {
        "samsung": "Samsung",
        "apple": "Apple",
        "xiaomi": "Xiaomi",
        "oppo": "Oppo",
        "vivo": "Vivo",
        "nokia": "Nokia",
      },
      "dung-luong": {
        "64gb": "64GB",
        "128gb": "128GB",
        "256gb": "256GB",
        "512gb": "512GB",
      },
      "mau-sac": {
        "den": "Đen",
        "trang": "Trắng",
        "xanh": "Xanh",
        "do": "Đỏ",
        "vang": "Vàng",
      },
    },
    "phu-kien": {
      "loai-sp": {
        "tai-nghe": "Tai nghe",
        "sac-du-phong": "Sạc dự phòng",
        "cap-sac": "Cáp sạc",
      },
      "hang-sx": {
        "apple": "Apple",
        "samsung": "Samsung",
        "xiaomi": "Xiaomi",
        "oppo": "Oppo",
        "vivo": "Vivo",
      },
    },
    "laptop": {
      "hang-sx": {
        "apple": "Apple",
        "samsung": "Samsung",
        "xiaomi": "Xiaomi",
      },
    }
  };
  const handleWhenMouseEnter = (state: boolean) => {
    const dropdownMenu = document.querySelector('.dropdown-menu') as HTMLElement;
    if (dropdownMenu) {
      if (state) {
        dropdownMenu.style.display = 'block';
      } else {
        dropdownMenu.style.display = 'none';
      }
    }
  }

  const handleSubmenuMouseEnter = (state: boolean) => {
    const submenu = document.querySelector('.submenu') as HTMLElement;
    if (submenu) {
      if (state) {
        submenu.style.display = 'block';
      } else {
        submenu.style.display = 'none';
      }
    }
  }

  const handleCategoryHover = (category: string | null) => {
    setHoveredCategory(category);
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
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars />
        </button>

        {/* Menu Content */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                type="button"
                onMouseEnter={() => handleWhenMouseEnter(true)}
                onMouseLeave={() => handleWhenMouseEnter(false)}
              >
                Danh Mục
              </button>
              <ul className="dropdown-menu" onMouseEnter={() => handleWhenMouseEnter(true)} onMouseLeave={() => handleWhenMouseEnter(false)}>
                {Object.keys(danhmuc).map((key) => (
                  <li 
                    key={key} 
                    className="dropdown-item-container"
                    onMouseEnter={() => handleCategoryHover(key)}
                    onMouseLeave={() => handleCategoryHover(null)}
                  >
                    <button
                      className="dropdown-item"
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                    {/* Hiển thị sub-menu khi hover vào danh mục */}
                    {hoveredCategory === key && (
                      <ul className="dropdown-menu submenu">
                        {Object.entries(danhmuc[key]).map(([subKey, subValue]) => (
                          <li key={subKey} className="dropdown-item-container">
                            <span className="dropdown-item submenu-title">
                              {subKey === "hang-sx" ? "Hãng sản xuất" :
                               subKey === "loai-sp" ? "Loại sản phẩm" :
                               subKey === "dung-luong" ? "Dung lượng" :
                               subKey === "mau-sac" ? "Màu sắc" : subKey}
                            </span>
                            <ul className="dropdown-menu submenu">
                              {Object.entries(subValue).map(([subSubKey, subSubValue]) => (
                                <li key={subSubKey}>
                                  <Link 
                                    className="dropdown-item" 
                                    href={`/${key}/${subKey}/${subSubKey}`}
                                  >
                                    {subSubValue}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          </ul>

            {/* Ô tìm kiếm */}
            <form className="d-flex flex-grow-1 position-relative" onSubmit={handleSearch}>
              <input
                className="form-control pe-5"
                type="search"
                placeholder="Tìm kiếm..."
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn position-absolute end-0 top-50 translate-middle-y me-2 border-0 bg-transparent" type="submit">
                <FaSearch size={18} />
              </button>
            </form>
          </div>

          {/* Menu điều hướng */}
          <div className="d-flex flex-column flex-lg-row gap-2 align-items-lg-center">
            <Link href="/gio-hang" className="btn text-primary">
              <FaShoppingCart size={18} className="me-1" />
            </Link>
            <Link href="/tai-khoan/dang-nhap" className="btn btn-outline-primary" style={{ border: 'none' }}>Đăng nhập</Link>
            <Link href="/tai-khoan/dang-ky" className="btn btn-outline-primary" style={{ border: 'none' }}>Đăng ký</Link>
            <Link 
              href="/dangban" 
              className="btn" 
              style={{ backgroundColor: '#FF8C00', color: 'white', transition: '0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E07B00'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF8C00'}
            >Đăng bán</Link>
          </div>
        </div>
    </nav>
  );
}
