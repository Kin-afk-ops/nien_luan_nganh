import Image from "next/image";
import "./payProduct.css";
import "./responsive.css";
import formatPrice from "@/helpers/format/formatPrice";
import Link from "next/link";
import { SellerProductInterface } from "@/interfaces/orderProduct";
import axiosInstance from "@/helpers/api/config";

interface ChildProps {
  orderProduct: SellerProductInterface[] | null;
  userId: string | null;
  setFilterModeLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  filterModeLoading: boolean;
}

const SellerProductContainer: React.FC<ChildProps> = ({
  orderProduct,
  userId,
  setFilterModeLoading,
  filterModeLoading,
  setLoading,
}) => {
  const handleCancel = async (id: string): Promise<void> => {
    if (userId) {
      setLoading(true);
      await axiosInstance
        .put(`/order/${id}/${userId}`, {
          status: "Đơn bị hủy",
        })
        .then((res) => {
          console.log(res.data);
          alert("Đơn hàng đã hủy");
          setFilterModeLoading(!filterModeLoading);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          alert("Đơn hàng  hủy thất bại");
          setLoading(false);
        });
      setLoading(false);
    }
  };

  const handleShip = async (id: string): Promise<void> => {
    if (userId) {
      setLoading(true);
      await axiosInstance
        .put(`/order/${id}/${userId}`, {
          status: "Đang giao hàng",
        })
        .then((res) => {
          console.log(res.data);
          alert("Đơn hàng đã giao");
          setFilterModeLoading(!filterModeLoading);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          alert("Đơn hàng chưa được giao");
          setLoading(false);
        });
      setLoading(false);
    }
  };

  const handleReceive = async (id: string): Promise<void> => {
    if (userId) {
      setLoading(true);
      await axiosInstance
        .put(`/order/${id}/${userId}`, {
          status: "Hoàn thành",
        })
        .then((res) => {
          console.log(res.data);
          alert("Đơn hàng đã nhận");
          setFilterModeLoading(!filterModeLoading);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          alert("Đơn hàng  nhận thất bại");
          setLoading(false);
        });
      setLoading(false);
    }
  };

  return (
    <div className="pay__product">
      <div className="row no-gutters pay__product--head">
        <h2 className="l-6 m-12 s-12">Sản phẩm</h2>
        <div className="l-2 m-0 s-0">Đơn giá</div>
        <div className="l-2 m-0 s-0">Số lượng</div>
        <div className="l-2 m-0 s-0">Thành tiền</div>
      </div>

      {orderProduct !== null &&
        orderProduct?.map((c) => (
          <div className="row no-gutters pay__product--body" key={c._id}>
            <div className="l-10 m-9 s-12 pay__product--buyer">
              {" "}
              <i className="fa-solid fa-user"></i>
              <p>{c?.infoUser.name}</p>
              <button className="pay__product--buyer-chat">Chat</button>
            </div>
            <div className="l-2 m-3 s-12">
              <div className="order__product--status">{c.status}</div>{" "}
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

            <div className="l-9 m-12 s-12 order__product--address">
              {c.note !== "" && "Lưu ý " + c.note}
            </div>
            <div className="l-9 m-12 s-12 order__product--address">
              Đơn hàng được vận chuyển từ{" "}
              <b>
                {c.product.addressInfo.address +
                  ", " +
                  c.product.addressInfo.ward +
                  ", " +
                  c.product.addressInfo.district +
                  ", " +
                  c.product.addressInfo.province +
                  " "}
              </b>{" "}
              đến
              {
                <b>
                  {" " +
                    c.externalAddress.address +
                    ", " +
                    c.externalAddress.ward +
                    ", " +
                    c.externalAddress.district +
                    ", " +
                    c.externalAddress.province +
                    ". "}
                </b>
              }
            </div>
            <div className="l-3 m-3 s-5">
              {c?.status === "Đang chuẩn bị hàng" && (
                <button className="main-btn" onClick={() => handleShip(c._id)}>
                  Xác nhận giao hàng
                </button>
              )}

              {c?.status === "Đang giao hàng" && (
                <button
                  className="main-btn"
                  onClick={() => handleCancel(c._id)}
                >
                  Hủy giao hàng
                </button>
              )}

              {c?.status === "Đang giao hàng" && (
                <button
                  className="secondary-btn order__receive"
                  onClick={() => handleReceive(c._id)}
                >
                  Đã giao hàng
                </button>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default SellerProductContainer;
