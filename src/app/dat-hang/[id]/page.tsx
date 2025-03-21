import PayProduct from "@/components/payProduct/PayProduct";
import "./page.css";
import formatPrice from "@/helpers/format/formatPrice";
import Image from "next/image";

const OrderPage = () => {
  return (
    <div className=" order">
      <div className="grid wide">
        <h1 className="main-container">Đặt hàng</h1>
        <div className="main-container order__address ">
          <div className="order__address--header">
            <i className="fa-solid fa-location-dot"></i>
            <h2>Địa chỉ nhận hàng</h2>
          </div>
          <div className="order__address--container">
            <span>
              <b> Nguyễn Vũ Linh (+84) 589443320 </b>| Số 9, Hẻm 4 Mậu Thân (đối
              diện Hủ tiếu dì Tư), Phường Xuân Khánh, Quận Ninh Kiều, Cần Thơ
            </span>
            <div className="order__address--default">Mặc định</div>
            <button>Thay đổi</button>
          </div>
        </div>

        <div className="main-container">
          {" "}
          <PayProduct />
          <div className=" row no-gutters order__foot">
            <div className="l-5 order__foot--note">
              <label htmlFor="">Lời nhắn:</label>
              <input type="text" placeholder="Lưu ý cho người bán" />
            </div>
            <div className="l-7 gird order__foot--ship">
              <div className="row no-gutters order__foot--ship-content">
                <div className="l-8">Phí vận chuyển:</div>
                <div className="l-4">{formatPrice(27000)}</div>
              </div>
            </div>
          </div>
          <div className=" row no-gutters order__total">
            <div className="l-10">Tổng số tiền (1 sản phẩm):</div>
            <div className="l-2">{formatPrice(27000)}</div>
          </div>
        </div>

        <div className="main-container">
          <div className="order__pay">
            <div className="grid order__pay--method">
              <div className="row no-gutters">
                <div className="l-9">Phương thức thanh toán</div>
                <select className="l-3" name="" id="">
                  <option value="">Thanh toán khi nhận hàng</option>
                  <option value="">Thanh toán bằng MOMO</option>
                  <option value="">Thanh toán bằng VN PAY</option>
                </select>
              </div>
            </div>
            <div className="grid">
              <div className="row no-gutters order__pay--content-wrap">
                <div className="l-9"></div>
                <div className="l-3">
                  <div className="grid">
                    <div className="row no-gutters order__pay--content ">
                      <div className="l-8">Tổng tiền hàng:</div>
                      <div className="l-4">{formatPrice(8000)}</div>
                    </div>

                    <div className="row no-gutters order__pay--content">
                      <div className="l-8">Tổng tiền phí vận chuyển:</div>
                      <div className="l-4">{formatPrice(8000)}</div>
                    </div>

                    <div className="row no-gutters order__pay--content">
                      <div className="l-8">Tổng thanh toán:</div>
                      <div className="l-4 order__pay--content-total">
                        {formatPrice(8000)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer__btn">
              <button className="main-btn">Đặt hàng</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
