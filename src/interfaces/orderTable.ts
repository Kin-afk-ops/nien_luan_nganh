export interface OrderProductInterface {
  id: number;
  productName: string;
  buyerName: string;
  shippingAddress: string;
  quantity: number;
  shippingFee: number;
  totalPrice: number;
  status:
    | "Chờ xác nhận"
    | "Đang xử lý"
    | "Chờ giao hàng"
    | "Đơn bị hủy"
    | "Hoàn thành";
}
