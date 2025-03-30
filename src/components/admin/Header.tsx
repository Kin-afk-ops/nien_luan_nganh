'use client';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
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

      <ul className="navbar-nav ml-auto">
        {/* Nav Item - Alerts */}
        <li className="nav-item dropdown no-arrow mx-1">
          <a className="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-bell fa-fw"></i>
            <span className="badge badge-danger badge-counter">3+</span>
          </a>
          <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="alertsDropdown">
            <h6 className="dropdown-header">Thông báo</h6>
            <a className="dropdown-item d-flex align-items-center" href="#">
              <div className="mr-3">
                <div className="icon-circle bg-primary">
                  <i className="fas fa-file-alt text-white"></i>
                </div>
              </div>
              <div>
                <div className="small text-gray-500">December 12, 2019</div>
                <span className="font-weight-bold">Đơn hàng mới!</span>
              </div>
            </a>
            <a className="dropdown-item d-flex align-items-center" href="#">
              <div className="mr-3">
                <div className="icon-circle bg-success">
                  <i className="fas fa-donate text-white"></i>
                </div>
              </div>
              <div>
                <div className="small text-gray-500">December 7, 2019</div>
                <span className="font-weight-bold">Thanh toán mới!</span>
              </div>
            </a>
            <a className="dropdown-item text-center small text-gray-500" href="#">Hiển thị tất cả thông báo</a>
          </div>
        </li>

        {/* Nav Item - Messages */}
        <li className="nav-item dropdown no-arrow mx-1">
          <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-envelope fa-fw"></i>
            <span className="badge badge-danger badge-counter">7</span>
          </a>
          <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="messagesDropdown">
            <h6 className="dropdown-header">Tin nhắn</h6>
            <a className="dropdown-item d-flex align-items-center" href="#">
              <div className="dropdown-list-image mr-3">
                <img className="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt="" />
                <div className="status-indicator bg-success"></div>
              </div>
              <div className="font-weight-bold">
                <div className="text-truncate">Xin chào! Tôi cần hỗ trợ về đơn hàng #12345</div>
                <div className="small text-gray-500">David Miller · 58m</div>
              </div>
            </a>
            <a className="dropdown-item text-center small text-gray-500" href="#">Đọc tất cả tin nhắn</a>
          </div>
        </li>

        <div className="topbar-divider d-none d-sm-block"></div>

        {/* Nav Item - User Information */}
        <li className="nav-item dropdown no-arrow">
          <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
            <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
          </a>
          <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="userDropdown">
            <a className="dropdown-item" href="#">
              <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
              Hồ sơ
            </a>
            <a className="dropdown-item" href="#">
              <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
              Cài đặt
            </a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
              <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
              Đăng xuất
            </a>
          </div>
        </li>
      </ul>

      <style jsx>{`
        .navbar {
          padding: 0.75rem 1rem;
        }

        .navbar-search {
          position: relative;
          width: 100%;
          max-width: 400px;
        }

        .input-group {
          position: relative;
        }

        .form-control {
          border-radius: 20px;
          padding: 0.375rem 0.75rem;
          font-size: 0.85rem;
        }

        .input-group-append {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          padding-right: 0.5rem;
        }

        .btn-primary {
          background: #4e73df;
          border: none;
          border-radius: 50%;
          width: 2rem;
          height: 2rem;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-primary:hover {
          background: #224abe;
        }

        #sidebarToggleTop {
          color: #4e73df;
          padding: 0.5rem;
        }

        #sidebarToggleTop:hover {
          color: #224abe;
        }

        .badge-counter {
          position: absolute;
          transform: scale(0.7);
          transform-origin: top right;
          right: 0.25rem;
          margin-top: -0.25rem;
        }

        .dropdown-list {
          min-width: 20rem;
          padding: 0;
          border: none;
          border-radius: 0.35rem;
        }

        .dropdown-list .dropdown-header {
          background-color: #4e73df;
          border: 1px solid #4e73df;
          color: white;
          font-weight: 700;
          padding: 0.75rem 1rem;
        }

        .dropdown-list .dropdown-item {
          white-space: normal;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #e3e6f0;
        }

        .dropdown-list .dropdown-item:last-child {
          border-bottom: none;
        }

        .icon-circle {
          height: 2rem;
          width: 2rem;
          border-radius: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dropdown-list-image {
          position: relative;
          line-height: 1;
          width: 2.5rem;
          height: 2.5rem;
        }

        .dropdown-list-image img {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 100%;
        }

        .status-indicator {
          background-color: #eaecf4;
          height: 0.75rem;
          width: 0.75rem;
          border-radius: 100%;
          position: absolute;
          bottom: 0;
          right: 0;
          border: 0.25rem solid white;
        }

        .bg-success {
          background-color: #1cc88a !important;
        }

        .bg-primary {
          background-color: #4e73df !important;
        }

        .topbar-divider {
          width: 0;
          border-right: 1px solid #e3e6f0;
          height: calc(4.375rem - 2rem);
          margin: 0 1rem;
        }

        .img-profile {
          height: 2rem;
          width: 2rem;
        }

        .dropdown-menu {
          min-width: 10rem;
        }

        .dropdown-item {
          padding: 0.5rem 1rem;
        }

        .dropdown-item i {
          width: 1rem;
          text-align: center;
        }

        .dropdown-divider {
          border-top: 1px solid #e3e6f0;
          margin: 0.5rem 0;
        }
      `}</style>
    </nav>
  );
};

export default Header; 