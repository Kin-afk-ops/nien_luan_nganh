import Image from "next/image";
import "./payProduct.css";
import "./responsive.css";
import formatPrice from "@/helpers/format/formatPrice";
import { CartInterface } from "@/interfaces/cart";
import Link from "next/link";
import axiosInstance from "@/helpers/api/config";
import CartProductItem from "./CartProductItem";
import { useEffect, useState } from "react";

interface ChildProps {
  cartProduct: CartInterface[];

  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartProduct: React.FC<ChildProps> = ({ cartProduct, setLoading }) => {
  const [shippingFee, setShippingFee] = useState<number>(27000);
  const [totalPrice, setTotalPrice] = useState<number>(() => {
    return cartProduct.reduce((sum, c) => {
      return c.checked ? sum + c.product.price : sum;
    }, 0);
  });
  const [totalPriceNoShip, setTotalPriceNoShip] = useState<number>(() => {
    return cartProduct.reduce((sum, c) => {
      return c.checked ? sum + c.product.price + shippingFee : sum;
    }, 0);
  });

  return (
    <div className="pay__product">
      <div className="row no-gutters pay__product--head">
        <h2 className="l-6 m-12 s-12">Sản phẩm</h2>

        <div className="l-2 m-0 s-0">Đơn giá</div>
        <div className="l-2 m-0 s-0">Số lượng</div>
        <div className="l-2 m-0 s-0">Thành tiền</div>
      </div>

      {cartProduct !== null &&
        cartProduct?.map((c, index) => (
          <CartProductItem
            key={index}
            setLoading={setLoading}
            c={c}
            setTotalPrice={setTotalPrice}
            setTotalPriceNoShip={setTotalPriceNoShip}
          />
        ))}

      <div className="row no-gutters order__pay--content-wrap">
        {/* <div className="l-9 m-4 s-0"></div> */}
        {/* <div className="l-3 m-8 s-12"> */}
        {/* <div className="grid"> */}
        {/* <div className="row no-gutters order__pay--content "> */}
        <div className="order__pay--content ">
          <div className="">Tổng tiền hàng:</div>
          <div className="">{formatPrice(totalPrice)}</div>
        </div>

        <div className=" order__pay--content">
          <div className="">Tiền phí vận chuyển:</div>
          <div className="">{formatPrice(shippingFee)}/1 sản phẩm</div>
        </div>

        <div className=" order__pay--content">
          <div className="">Tổng thanh toán:</div>
          <div className=" order__pay--content-total">
            {formatPrice(totalPriceNoShip)}
          </div>
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default CartProduct;
