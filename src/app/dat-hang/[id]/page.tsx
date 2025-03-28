"use client";
import { useParams } from "next/navigation";
import PayProduct from "@/components/payProduct/PayProduct";
import "./page.css";
import formatPrice from "@/helpers/format/formatPrice";
import "./responsive.css";
import { useEffect, useState } from "react";
import { AddressInterface } from "@/interfaces/addressUser";
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/useAppDispatch";
import axiosInstance from "@/helpers/api/config";
import { CartInterface } from "@/interfaces/cart";

const OrderPage = () => {
  const params = useParams<{ id: string }>();

  const [userId, setUserId] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<AddressInterface[] | null>(null);
  const [cartCheck, setCartCheck] = useState<CartInterface[] | null>(null);

  useEffect(() => {
    if (params) {
      setUserId(params.id);
    }

    const getAddressUser = async (): Promise<void> => {
      try {
        const res = await axiosInstance.get(`/addressInfoUser/${userId}`);
        setAddresses(res?.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getCartCheck = async (): Promise<void> => {
      try {
        const res = await axiosInstance.get(`/cart/checked/${userId}`);
        setCartCheck(res?.data);

        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAddressUser();
    getCartCheck();
  }, [userId, params]);

  const getTotalPrice = (): number => {
    let totalPrice: number = 0;

    cartCheck?.forEach((c) => {
      totalPrice += c.quantity * c.productId.price;
    });

    return totalPrice;
  };

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
            {addresses !== null &&
              addresses
                .filter((address) => address.default === true)
                .map((a, index) => (
                  <div key={index}>
                    <b> {a.nameAddress + " " + a.phoneAddress}</b>
                    <span>
                      {" | " +
                        a.address +
                        ", " +
                        a.district +
                        ", " +
                        a.province +
                        "."}
                    </span>
                  </div>
                ))}

            <div className="order__address--default">Mặc định</div>
            <button>Thay đổi</button>
          </div>
        </div>

        <div className="main-container">
          {" "}
          <PayProduct cartCheck={cartCheck} />
          <div className=" row no-gutters order__foot">
            <div className="l-5 m-6 s-12 order__foot--note">
              <label htmlFor="">Lời nhắn:</label>
              <input type="text" placeholder="Lưu ý cho người bán" />
            </div>
            <div className="l-7 m-6 s-12 gird order__foot--ship">
              <div className="row no-gutters order__foot--ship-content">
                <div className="l-8 m-8 s-5">Phí vận chuyển:</div>
                <div className="l-4 m-4 s-7">{formatPrice(27000)}</div>
              </div>
            </div>
          </div>
          <div className=" row no-gutters order__total">
            <div className="l-10 m-10 s-7">
              Tổng số tiền ({cartCheck?.length} sản phẩm):
            </div>
            <div className="l-2 m-2 s-5">{formatPrice(getTotalPrice())}</div>
          </div>
        </div>

        <div className="main-container">
          <div className="order__pay">
            <div className="grid order__pay--method">
              <div className="row no-gutters">
                <div className="l-9 m-6 s-12">Phương thức thanh toán</div>
                <select className="l-3 m-6 s-12" name="" id="">
                  <option value="">Thanh toán khi nhận hàng</option>
                  <option value="">Thanh toán bằng MOMO</option>
                  <option value="">Thanh toán bằng VN PAY</option>
                </select>
              </div>
            </div>
            <div className="grid">
              <div className="row no-gutters order__pay--content-wrap">
                <div className="l-9 m-4 s-0"></div>
                <div className="l-3 m-8 s-12">
                  <div className="grid">
                    <div className="row no-gutters order__pay--content ">
                      <div className="l-8 m-9 s-6">Tổng tiền hàng:</div>
                      <div className="l-4 m-3 s-6">{formatPrice(8000)}</div>
                    </div>

                    <div className="row no-gutters order__pay--content">
                      <div className="l-8 m-9 s-6">
                        Tổng tiền phí vận chuyển:
                      </div>
                      <div className="l-4 m-3 s-6">{formatPrice(8000)}</div>
                    </div>

                    <div className="row no-gutters order__pay--content">
                      <div className="l-8 m-9 s-6">Tổng thanh toán:</div>
                      <div className="l-4 m-3 s-6 order__pay--content-total">
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
