import Image from "next/image";
import "./payProduct.css";
import "./responsive.css";
import formatPrice from "@/helpers/format/formatPrice";

const PayProduct = () => {
  return (
    <div className="pay__product">
      <div className="row no-gutters pay__product--head">
        <h2 className="l-6 m-12">Sản phẩm</h2>
        <div className="l-2 m-0">Đơn giá</div>
        <div className="l-2 m-0">Số lượng</div>
        <div className="l-2 m-0">Thành tiền</div>
      </div>
      <div className="row no-gutters pay__product--body">
        <div className="l-1 m-2 pay__product--item pay__product--image">
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
        </div>
        <div className="l-5 m-10 pay__product--name">
          <span>Chun Cột Tóc Đen Và Nhiều Màu Siêu Dai</span>
          <div className=" pay__product--name-item">
            {"Đơn giá: " + formatPrice(8000)}
          </div>
          <div className=" pay__product--name-item">{"Số lượng: " + "1"}</div>
          <div className=" pay__product--name-item">
            {"Thành tiền: " + formatPrice(8000)}
          </div>
        </div>
        <div className="l-2 m-0 pay__product--item">{formatPrice(8000)}</div>
        <div className="l-2 m-0 pay__product--item">1</div>
        <div className="l-2 m-0 pay__product--item">{formatPrice(8000)}</div>
      </div>
    </div>
  );
};

export default PayProduct;
