import { OrderProductInterface } from "@/interfaces/orderTable";
import "./orderProductTable.css";

const OrderProductTable = () => {
  // data
  const orders: OrderProductInterface[] = [
    {
      id: 1,
      productName: "Giày Adidas",
      buyerName: "Nguyễn Văn A",
      shippingAddress: "123 Đường ABC, Quận 1, TP.HCM",
      quantity: 2,
      shippingFee: 30000,
      totalPrice: 1800000,
      status: "Chờ xác nhận",
    },
    {
      id: 2,
      productName: "Áo Nike",
      buyerName: "Trần Văn B",
      shippingAddress: "456 Đường XYZ, Quận 3, TP.HCM",
      quantity: 1,
      shippingFee: 20000,
      totalPrice: 800000,
      status: "Đang xử lý",
    },
    {
      id: 3,
      productName: "Quần Puma",
      buyerName: "Lê Thị C",
      shippingAddress: "789 Đường LMN, Quận 5, TP.HCM",
      quantity: 3,
      shippingFee: 25000,
      totalPrice: 1500000,
      status: "Hoàn thành",
    },
  ];

  return (
    <div className="main-container">
      <table className="order__product--table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên sản phẩm</th>
            <th>Người mua hàng</th>
            <th>Địa chỉ giao hàng</th>
            <th>Số lượng</th>
            <th>Phí giao hàng</th>
            <th>Tổng giá tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.productName}</td>
              <td>{order.buyerName}</td>
              <td>{order.shippingAddress}</td>
              <td>{order.quantity}</td>
              <td>{order.shippingFee.toLocaleString()} VNĐ</td>
              <td>{order.totalPrice.toLocaleString()} VNĐ</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderProductTable;
