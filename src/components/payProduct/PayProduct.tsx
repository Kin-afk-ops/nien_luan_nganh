import Image from "next/image";
import "./payProduct.css";
import formatPrice from "@/helpers/format/formatPrice";

const PayProduct = () => {
  return (
    <div className=" pay__product">
      <div className="row no-gutters pay__product--head">
        <h2 className="l-6">Sản phẩm</h2>
        <div className="l-2">Đơn giá</div>
        <div className="l-2">Số lượng</div>
        <div className="l-2">Thành tiền</div>
      </div>
      <div className="row no-gutters pay__product--body">
        <div className="l-1 pay__product--item">
          <Image
            src={"/assets/account/avatar_default.png"}
            alt="anh san pham"
            width={40}
            height={40}
          />
        </div>
        <div className="l-5  pay__product-name">
          Chun Cột Tóc Đen Và Nhiều Màu Siêu Dai
        </div>
        <div className="l-2 pay__product--item">{formatPrice(8000)}</div>
        <div className="l-2 pay__product--item">1</div>
        <div className="l-2 pay__product--item">{formatPrice(8000)}</div>
      </div>
    </div>
  );
};

export default PayProduct;
