'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '@/styles/admin/sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const pathname = usePathname();

  const menuItems = [
    { path: '/admin', label: 'Trang chủ', icon: 'fas fa-home' },
    { path: '/admin/taikhoan', label: 'Quản lý Tài khoản', icon: 'fas fa-user' },
    { path: '/admin/danhmuc', label: 'Quản lý Danh Mục', icon: 'fas fa-list' },
    { path: '/admin/sanpham', label: 'Quản lý Sản Phẩm', icon: 'fa-brands fa-product-hunt' }, 
    { path: '/admin/donhang', label: 'Xét duyệt Đơn hàng', icon: 'fas fa-cart-arrow-down' },
  ];

  return (
    <ul className={`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ${isOpen ? 'open' : 'closed'}`} id="accordionSidebar">
      {/* Sidebar - Brand */}
      <Link href="/admin">
        <div className="sidebar-brand d-flex align-items-center justify-content-center">
          <div className="sidebar-brand-text mx-3">SNEAKERS SHOP</div>
        </div>
      </Link>

      {/* Divider */}
      <hr className="sidebar-divider" />

      {/* Heading */}
      <div className="sidebar-heading">Chức năng</div>

      {/* Nav Items */}
      {menuItems.map((item) => (
        <li className="nav-item" key={item.path}>
          <Link href={item.path}>
            <div className={`nav-link ${pathname === item.path ? 'active' : ''}`}>
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </div>
          </Link>
        </li>
      ))}

      <br />

      {/* Sidebar Toggler */}
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle" onClick={onToggle}></button>
      </div>
    </ul>
  );
};

export default Sidebar; 