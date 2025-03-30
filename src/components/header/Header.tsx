'use client';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/logo/logo.png';
import { useState, FormEvent, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaShoppingCart, FaBars } from 'react-icons/fa';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" href="/HomePage">
          <Image src={logo} alt="Logo" width={120} height={50} />
        </Link>

        {/* Nút Toggle Menu */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <FaBars />
        </button>

        {/* Nội dung menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Ô tìm kiếm */}
          <form className="d-flex flex-grow-1 mx-lg-4 my-2 my-lg-0 position-relative" onSubmit={handleSearch}>
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

          {/* Menu điều hướng */}
          <div className="d-flex flex-column flex-lg-row gap-2 align-items-lg-center">
            <Link href="/gio-hang" className="btn text-primary">
              <FaShoppingCart size={18} className="me-1" />
            </Link>
            <Link href="/tai-khoan/dang-nhap" className="btn btn-outline-primary" style={{ border: 'none'}}>Đăng nhập</Link>
            <Link href="/tai-khoan/dang-ky" className="btn btn-outline-primary" style={{ border: 'none'}}>Đăng ký</Link>
            <Link 
              href="/dangban" 
              className="btn" 
              style={{ backgroundColor: '#FF8C00', color: 'white', transition: '0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E07B00'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF8C00'}
            >Đăng bán</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
