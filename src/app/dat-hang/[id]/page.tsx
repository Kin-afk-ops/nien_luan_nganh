"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
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
import AddressList from "@/components/addressList/addressList";
import AddressModal from "@/components/addressModal/AddressModal";
import {
  OrderProductForm,
  OrderProductInterface,
} from "@/interfaces/orderProduct";
import Loading from "@/components/loading/Loading";
import toast from "react-hot-toast";
import { error } from "console";

const OrderPage = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const productId = searchParams.get("productId");
  const quantity = searchParams.get("quantity");
  const buyMode = searchParams.get("buy") === "true";

  const [userId, setUserId] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<AddressInterface[]>([]);
  const [cartCheck, setCartCheck] = useState<CartInterface[] | null>(null);
  const [shippingFee, setShippingFee] = useState<number>(27000);
  const [choiceAddressModal, setChoiceAddressModal] = useState<boolean>(false);
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [editAddressMode, setEditAddressMode] = useState<boolean>(false);
  const [addressId, setAddressId] = useState<string>("");
  const [indexAddress, setIndexAddress] = useState<number>(9999);
  const [loadingAddress, setLoadingAddress] = useState<boolean>(false);
  const [choiceAddress, setChoiceAddress] = useState<AddressInterface | null>(
    null
  );
  const [noteValue, setNoteValue] = useState<string>("");

  const [payMethod, setPayMethod] = useState<string>(
    "Thanh toán khi nhận hàng"
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (params) {
      setUserId(params.id);
    }

    const getAddressUser = async (): Promise<void> => {
      try {
        const res = await axiosInstance.get(`/addressInfoUser/${params.id}`);
        setAddresses(res?.data);

        setChoiceAddress(res?.data.filter((a) => a.default === true)[0]);
      } catch (error) {
        console.log(error);
      }
    };

    const getCartCheck = async (): Promise<void> => {
      try {
        const res = await axiosInstance.get(`/cart/checked/${params.id}`);
        setCartCheck(res?.data);

        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getProductBuy = async (): Promise<void> => {
      try {
        const res = await axiosInstance.get(
          `/product//oneProduct/${productId}`
        );

        if (productId && quantity) {
          const tempCart: CartInterface = {
            _id: "temp",
            buyerId: params.id,
            productId: productId,
            product: res.data,
            quantity: parseInt(quantity),
            checked: true,
          };
          setCartCheck([tempCart]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (buyMode) {
      getProductBuy();
    } else {
      getCartCheck();
    }

    getAddressUser();
  }, [userId, params, loadingAddress, productId, buyMode, quantity]);

  const getTotalPrice = (): number => {
    let totalPrice: number = 0;

    cartCheck?.forEach((c) => {
      totalPrice += c.quantity * c.product.price;
    });

    return totalPrice;
  };

  const getTotalPriceShip = (): number => {
    let totalPrice: number = 0;

    cartCheck?.forEach((c) => {
      totalPrice += c.quantity * c.product.price + 27000;
    });

    return totalPrice;
  };

  const handleOrder = async (): Promise<void> => {
    setLoading(true);

    try {
      if (!cartCheck) return;

      for (const c of cartCheck) {
        try {
          const res = await axiosInstance.get(
            `/product/oneProduct/${c.productId}`
          );
          const productData = res.data;
          const newQuantity = productData.quantity - c.quantity;

          if (newQuantity < 0) {
            toast.error("Đã hết hàng");
            continue;
          }

          const newOrder: OrderProductForm = {
            addressId: choiceAddress?._id ?? "",
            note: noteValue,
            shippingFee: shippingFee,
            totalAmount: getTotalPrice(),
            productId: c?.product._id,
            quantity: c?.quantity,
            paymentMethod: payMethod,
          };

          await axiosInstance.post(`/order/${params.id}`, newOrder);
          toast.success("Đặt hàng thành công");

          await axiosInstance.put(`/product/${c.productId}`, {
            quantity: newQuantity,
          });
          window.location.replace(`/ho-so/don-mua`);
        } catch (error) {
          console.error("Lỗi khi xử lý sản phẩm:", error);
          toast.error("Có lỗi xảy ra với sản phẩm trong đơn hàng.");
        }
      }

      if (!buyMode) {
        try {
          const res = await axiosInstance.delete(`/cart/deleteCheck/${userId}`);
          console.log(res.data);
        } catch (error) {
          console.error("Lỗi khi xóa giỏ hàng:", error);
        }
      }
    } catch (err) {
      console.error("Lỗi khi đặt hàng:", err);
      toast.error("Có lỗi xảy ra khi đặt hàng.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <div className=" order">
        <div className="grid wide">
          <h1 className="main-container">Đặt hàng</h1>
          <div className="main-container order__address ">
            <div className="order__address--header">
              <i className="fa-solid fa-location-dot"></i>
              <h2>Địa chỉ nhận hàng</h2>
            </div>
            <div className="order__address--container">
              {choiceAddress !== null && (
                <div>
                  <b>
                    {" "}
                    {choiceAddress?.nameAddress +
                      " " +
                      choiceAddress?.phoneAddress}
                  </b>
                  <span>
                    {" | " +
                      choiceAddress?.address +
                      ", " +
                      choiceAddress?.ward +
                      ", " +
                      choiceAddress?.district +
                      ", " +
                      choiceAddress?.province +
                      "."}
                  </span>
                </div>
              )}

              {choiceAddress?.default === true && (
                <div className="order__address--default">Mặc định</div>
              )}

              <button onClick={() => setChoiceAddressModal(true)}>
                Thay đổi
              </button>
            </div>
          </div>

          <div className="main-container">
            {cartCheck && <PayProduct cartProduct={cartCheck} />}
            <div className=" row no-gutters order__foot">
              <div className="l-5 m-6 s-12 order__foot--note">
                <label htmlFor="">Lời nhắn:</label>
                <input
                  type="text"
                  placeholder="Lưu ý cho người bán"
                  onChange={(e) => setNoteValue(e.target.value)}
                  value={noteValue}
                />
              </div>
              <div className="l-7 m-6 s-12 gird order__foot--ship">
                <div className="row no-gutters order__foot--ship-content">
                  <div className="l-8 m-8 s-5">Phí vận chuyển:</div>
                  <div className="l-4 m-4 s-7">
                    {formatPrice(shippingFee)}/1 Sản phẩm
                  </div>
                </div>
              </div>
            </div>
            <div className=" row no-gutters order__total">
              <div className="l-10 m-10 s-7">
                Tổng số tiền ({cartCheck?.length} sản phẩm):
              </div>
              <div className="l-2 m-2 s-5">
                {formatPrice(getTotalPriceShip())}
              </div>
            </div>
          </div>

          <div className="main-container">
            <div className="order__pay">
              <div className="grid order__pay--method">
                <div className="row no-gutters">
                  <div className="l-9 m-6 s-12">Phương thức thanh toán</div>
                  <select
                    className="l-3 m-6 s-12"
                    name=""
                    id=""
                    value={payMethod}
                    onChange={(e) => setPayMethod(e.target.value)}
                  >
                    <option value="Thanh toán khi nhận hàng">
                      Thanh toán khi nhận hàng
                    </option>
                    <option value="Thanh toán bằng MOMO">
                      Thanh toán bằng MOMO
                    </option>
                    <option value="Thanh toán bằng VN PAY">
                      Thanh toán bằng VN PAY
                    </option>
                  </select>
                </div>
              </div>
              <div className="grid">
                <div className="row no-gutters order__pay--content-wrap">
                  {/* <div className="l-9 m-4 s-0"></div> */}
                  {/* <div className="l-3 m-8 s-12"> */}
                  {/* <div className="grid"> */}
                  {/* <div className="row no-gutters order__pay--content "> */}
                  <div className="order__pay--content ">
                    <div className="">Tổng tiền hàng:</div>
                    <div className="">{formatPrice(getTotalPrice())}</div>
                  </div>

                  <div className=" order__pay--content">
                    <div className="">Tổng tiền phí vận chuyển:</div>
                    <div className="">
                      {formatPrice(shippingFee)} /1 Sản phẩm
                    </div>
                  </div>

                  <div className=" order__pay--content">
                    <div className="">Tổng thanh toán:</div>
                    <div className=" order__pay--content-total">
                      {formatPrice(getTotalPriceShip())}
                    </div>
                  </div>
                  {/* </div> */}
                  {/* </div> */}
                </div>
              </div>
              <div className="footer__btn">
                <button className="main-btn" onClick={handleOrder}>
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {choiceAddressModal && (
        <>
          <div
            className="modal-overlay"
            onClick={() => setChoiceAddressModal(false)}
          ></div>
          <div className="choice__address">
            <AddressList
              userId={userId}
              setAddressModal={setAddressModal}
              setEditAddressMode={setEditAddressMode}
              setAddressId={setAddressId}
              setIndexAddress={setIndexAddress}
              addresses={addresses}
              setAddresses={setAddresses}
              setChoiceAddress={setChoiceAddress}
              setChoiceAddressModal={setChoiceAddressModal}
            />
            <i
              className="fa-solid fa-xmark choice__address--close"
              onClick={() => setChoiceAddressModal(false)}
            ></i>
          </div>
        </>
      )}

      {addressModal && (
        <AddressModal
          addressModal={addressModal}
          setAddressModal={setAddressModal}
          addresses={addresses}
          editAddressMode={editAddressMode}
          indexAddress={indexAddress}
          userId={userId}
          loadingAddress={loadingAddress}
          setLoadingAddress={setLoadingAddress}
          addressId={addressId}
        />
      )}
    </>
  );
};

export default OrderPage;
