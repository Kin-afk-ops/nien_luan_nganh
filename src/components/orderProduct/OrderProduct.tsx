import { OrderProductInterface } from "@/interfaces/orderProduct";

import "./orderProduct.css";
import OrderProductContainer from "../payProduct/OrderProductContainer";

interface ChildProps {
  orderProduct: OrderProductInterface[] | null;
}
const OrderProduct: React.FC<ChildProps> = ({ orderProduct }) => {
  console.log(orderProduct);

  return (
    <div className="order__product">
      <OrderProductContainer orderProduct={orderProduct} />
    </div>
  );
};

export default OrderProduct;
