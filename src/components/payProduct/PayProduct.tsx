import Image from "next/image";
import "./payProduct.css";
import "./responsive.css";
import formatPrice from "@/helpers/format/formatPrice";
import { CartInterface } from "@/interfaces/cart";

interface ChildProps {
  cartCheck: CartInterface[] | null;
}

const PayProduct: React.FC<ChildProps> = ({ cartCheck }) => {
  return (
    <div className="pay__product">
      <div className="row no-gutters pay__product--head">
        <h2 className="l-6 m-12 s-12">Sản phẩm</h2>
        <div className="l-2 m-0 s-0">Đơn giá</div>
        <div className="l-2 m-0 s-0">Số lượng</div>
        <div className="l-2 m-0 s-0">Thành tiền</div>
      </div>

      {cartCheck !== null &&
        cartCheck?.map((c, index) => (
          <div className="row no-gutters pay__product--body" key={index}>
            <div className="l-1 m-2 s-4 pay__product--item pay__product--image">
              <Image
                className="pay__product--item-image pc"
                src={"/assets/account/avatar_default.png"}
                alt="anh san pham"
                width={40}
                height={40}
              />

              <Image
                className="pay__product--item-image tablet"
                src={"/assets/account/avatar_default.png"}
                alt="anh san pham"
                width={80}
                height={80}
              />

              <Image
                className="pay__product--item-image mobile"
                src={"/assets/account/avatar_default.png"}
                alt="anh san pham"
                width={100}
                height={100}
              />
            </div>
            <div className="l-5 m-10 s-8 pay__product--name">
              <p>{c.productId.name}</p>
              <div className="l-0 pay__product--name-item">
                {"Đơn giá: " + formatPrice(c.productId.price)}
              </div>
              <div className="l-0 pay__product--name-item">
                {"Số lượng: " + c.quantity}
              </div>
              <div className="l-0 pay__product--name-item">
                {"Thành tiền: " + formatPrice(c.productId.price * c.quantity)}
              </div>
            </div>
            <div className="l-2 m-0 s-0 pay__product--item">
              {formatPrice(c.productId.price)}
            </div>
            <div className="l-2 m-0 s-0 pay__product--item">{c.quantity}</div>
            <div className="l-2 m-0 s-0 pay__product--item">
              {formatPrice(c.productId.price * c.quantity)}
            </div>
          </div>
        ))}
    </div>
  );
};

export default PayProduct;
