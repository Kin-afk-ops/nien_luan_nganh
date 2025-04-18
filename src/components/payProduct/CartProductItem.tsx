"use client";

import axiosInstance from "@/helpers/api/config";
import formatPrice from "@/helpers/format/formatPrice";
import { CartInterface } from "@/interfaces/cart";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./payProduct.css";
import "./responsive.css";

interface ChildProps {
  c: CartInterface;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  setTotalPriceNoShip: React.Dispatch<React.SetStateAction<number>>;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  refresh: boolean;
}

const CartProductItem: React.FC<ChildProps> = ({
  c,
  setLoading,
  setTotalPrice,
  setTotalPriceNoShip,
  setRefresh,
  refresh,
}) => {
  const params = useParams<{ id: string }>();
  const [userId, setUserId] = useState<string | null>(null);
  const [checkCart, setCheckCart] = useState<boolean>(c?.checked);
  const [quantity, setQuantity] = useState<number>(c?.quantity);

  useEffect(() => {
    if (params) {
      setUserId(params?.id);
    }
  }, [params]);
  const handleChecked = async (
    checked: boolean,
    cartId: string,
    price: number
  ): Promise<void> => {
    setLoading(true);

    const newForm: {
      checked: boolean;
    } = {
      checked,
    };
    await axiosInstance
      .put(`/cart/${cartId}/${userId}`, newForm)
      .then((res) => {
        setLoading(false);
        if (res.data.checked) {
          setTotalPrice((prevTotal) => prevTotal + price * c.quantity);
          setTotalPriceNoShip(
            (prevTotal) => prevTotal + price * c.quantity + 27000
          );
        } else {
          setTotalPrice((prevTotal) => prevTotal - price * c.quantity);
          setTotalPriceNoShip(
            (prevTotal) => prevTotal - price * c.quantity - 27000
          );
        }

        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setRefresh(!refresh);

        alert("Có lỗi");
      });
  };

  const handleQuantityChange = async (
    mode: string,
    cartId: string
  ): Promise<void> => {
    setLoading(true);
    if (mode === "increase") {
      try {
        await axiosInstance.put(`/cart/${cartId}/${userId}`, {
          quantity: quantity + 1,
        });
        setQuantity((q) => q + 1);

        setTotalPrice((prevTotal) => prevTotal + c.product.price);
        setTotalPriceNoShip((prevTotal) => prevTotal + c.product.price);

        setRefresh(!refresh);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
      setLoading(false);
    }

    if (mode === "reduce") {
      if (c.quantity > 1) {
        try {
          const res = await axiosInstance.put(`/cart/${cartId}/${userId}`, {
            quantity: quantity - 1 > 1 ? quantity - 1 : 1,
          });
          setQuantity(res.data.quantity);

          setTotalPrice((prevTotal) => prevTotal - c.product.price);
          setTotalPriceNoShip((prevTotal) => prevTotal - c.product.price);
          setRefresh(!refresh);

          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      }
      setLoading(false);
    }
  };

  const handleDelete = async (
    cartId: string,
    cartCheck: boolean,
    cartPrice: number
  ): Promise<void> => {
    setLoading(true);

    try {
      if (cartCheck) {
        setTotalPrice((p) => p - cartPrice);
        setTotalPriceNoShip((p) => p - cartPrice - 27000);
      }
      await axiosInstance.delete(`/cart/delete/${cartId}/${userId}`);
      alert("Đã xóa");

      setRefresh(!refresh);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="row no-gutters pay__product--body">
      <div className="l-10 m-10 s-11 pay__product--buyer">
        {" "}
        <i className="fa-solid fa-shop"></i>
        <p>{c.product.sellerInfo && c.product.sellerInfo.name}</p>
        <button className="pay__product--buyer-chat">Chat</button>
        <Link href={"/"} className="link pay__product--buyer-view">
          Xem shop
        </Link>
      </div>
      <div
        className="l-2 m-2 s-1 cart__product--delete"
        onClick={() => handleDelete(c._id, c.checked, c.product.price)}
      >
        <i className="fa-regular fa-trash-can"></i>
      </div>
      <input
        className="l-1 m-1 s-1 cart__product--checkbox"
        type="checkbox"
        checked={c.checked}
        onChange={(e) => {
          handleChecked(e.target.checked, c._id, c.product.price);
        }}
      />
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
      <div className="l-4 m-9 s-7 pay__product--name">
        <p>{c.product.name}</p>
        <div className="l-0 pay__product--name-item">
          {"Đơn giá: " + formatPrice(c.product.price)}
        </div>
        <div className="l-0 pay__product--name-item">
          Số lượng:
          <div
            className="pay__product--item-item"
            onClick={() => handleQuantityChange("reduce", c._id)}
          >
            -
          </div>
          {quantity}
          <div
            className="pay__product--item-item"
            onClick={() => handleQuantityChange("increase", c._id)}
          >
            +
          </div>
        </div>
        <div className="l-0 pay__product--name-item">
          {"Thành tiền: " + formatPrice(c.product.price * quantity)}
        </div>
      </div>
      <div className="l-2 m-0 s-0 pay__product--item">
        {formatPrice(c.product.price)}
      </div>
      <div className="l-2 m-0 s-0 pay__product--item">
        <div
          className="pay__product--item-item"
          onClick={() => handleQuantityChange("reduce", c._id)}
        >
          -
        </div>
        {quantity}

        <div
          className="pay__product--item-item"
          onClick={() => handleQuantityChange("increase", c._id)}
        >
          +
        </div>
      </div>
      <div className="l-2 m-0 s-0 pay__product--item">
        {formatPrice(c.product.price * quantity)}
      </div>
    </div>
  );
};

export default CartProductItem;
