import { OrderProductInterface } from "@/interfaces/orderProduct";

import "./orderProduct.css";
import PayProduct from "../payProduct/PayProduct";

interface ChildProps {
  orderProduct: OrderProductInterface[] | null;
}
const OrderProduct: React.FC<ChildProps> = ({ orderProduct }) => {
  console.log(orderProduct);

  return (
    <div className="order__product">
      {orderProduct !== null &&
        orderProduct.map((products) => (
          <PayProduct
            cartProduct={products.products}
            key={products._id}
            orderProductCheck={true}
          />
        ))}

      <div className="order__product--delete-btn">
        <button className="main-btn">Hủy đơn hàng</button>
      </div>
    </div>
  );
};

export default OrderProduct;
