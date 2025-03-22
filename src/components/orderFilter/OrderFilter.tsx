import "./orderFilter.css";

const OrderFilter = () => {
  return (
    <div className="main-container order__filter">
      <div className="order__filter-top">
        <div>Tất cả</div>
        <div>Chờ xác nhận</div>
        <div>Đang xử lý</div>
        <div>Chờ giao hàng</div>
        <div>Đơn bị hủy</div>
        <div>Hoàn thành</div>
      </div>

      <div className="order__filter--search">
        <input type="text" placeholder="Nhập từ khóa ở đây" />
        <button className="secondary-btn order__filter--search-btn">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>
  );
};

export default OrderFilter;
