"use client";

import Link from "next/link";
import "./header.css";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/features/user/userSlice";

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const dispatch = useDispatch();

  const handleHome = (): void => {
    window.location.replace("/");
    dispatch(logout());
  };

  const handleLogout = () => {
    dispatch(logout());

    window.location.replace("/admin");
  };

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
      <button
        id="sidebarToggleTop"
        className="btn btn-link d-md-none rounded-circle mr-3"
        onClick={onToggleSidebar}
      >
        <i className="fa fa-bars"></i>
      </button>
      <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <input
            type="text"
            className="form-control bg-light border-0 small"
            placeholder="Tìm kiếm..."
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <i className="fas fa-search fa-sm"></i>
            </button>
          </div>
        </div>
      </form>

      <div className="d-flex align-items-center ml-2">
        <button
          onClick={handleHome}
          className="btn btn-outline-success btn-sm home-btn mr-2"
        >
          <i className="fas fa-home mr-1"></i> Trang chủ
        </button>
        <button
          className="btn btn-outline-danger btn-sm logout-btn"
          onClick={handleLogout}
        >
          <i className="fas fa-sign-out-alt mr-1"></i> Đăng xuất
        </button>
      </div>
    </nav>
  );
};

export default Header;
