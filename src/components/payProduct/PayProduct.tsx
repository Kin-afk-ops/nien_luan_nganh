import Image from "next/image";
import "./payProduct.css";
import "./responsive.css";
import formatPrice from "@/helpers/format/formatPrice";
import { CartInterface } from "@/interfaces/cart";
import Link from "next/link";

interface ChildProps {
  cartProduct: CartInterface[];
}

const PayProduct: React.FC<ChildProps> = ({ cartProduct }) => {
  console.log(cartProduct);

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
          <div className="row no-gutters pay__product--body" key={index}>
            <div className="l-12 pay__product--buyer">
              {" "}
              <i className="fa-solid fa-shop"></i>
              <p>{c.product.sellerInfo && c.product.sellerInfo.name}</p>
              <button className="pay__product--buyer-chat">Chat</button>
              <Link href={"/"} className="link pay__product--buyer-view">
                Xem shop
              </Link>
            </div>
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
              <p>{c.product.name}</p>
              <div className="l-0 pay__product--name-item">
                {"Đơn giá: " + formatPrice(c.product.price)}
              </div>
              <div className="l-0 pay__product--name-item">
                {"Số lượng: " + c.quantity}
              </div>
              <div className="l-0 pay__product--name-item">
                {"Thành tiền: " + formatPrice(c.product.price * c.quantity)}
              </div>
            </div>
            <div className="l-2 m-0 s-0 pay__product--item">
              {formatPrice(c.product.price)}
            </div>
            <div className="l-2 m-0 s-0 pay__product--item">{c.quantity}</div>
            <div className="l-2 m-0 s-0 pay__product--item">
              {formatPrice(c.product.price * c.quantity)}
            </div>
          </div>
        ))}
    </div>
  );
};

export default PayProduct;
