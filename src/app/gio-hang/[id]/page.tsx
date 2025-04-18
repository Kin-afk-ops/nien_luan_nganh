"use client";

import React, { ChangeEvent, useState, useEffect } from "react";
import axiosInstance from "@/helpers/api/config";
import { useAppSelector } from "@/lib/store";
import CartProduct from "@/components/payProduct/CartProduct";
import { CartInterface } from "@/interfaces/cart";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/components/loading/Loading";
import Link from "next/link";

// Gọi API lấy giỏ hàng
const getCart = async (id: string) => {
  try {
    const response = await axiosInstance.get("/cart/" + id);

    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

const CartUI: React.FC = () => {
  const router = useRouter();

  const [cartData, setCartData] = useState<CartInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [refresh, setRefresh] = useState(false); // State để cập nhật giỏ hàng
  const currentUser = useAppSelector((state) => state.user.currentUser);

  // Fetch dữ liệu giỏ hàng khi refresh thay đổi
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setLoading(true);
        setError(null);
        if (currentUser?._id) {
          const data = await getCart(currentUser._id);
          setCartData(data);
        }
      } catch (err) {
        setError("Không thể tải dữ liệu giỏ hàng. Vui lòng thử lại sau.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCartData();
  }, [refresh, currentUser?._id]); // Khi refresh thay đổi, fetch lại giỏ hàng

  const handleChangeOrder = async (): Promise<void> => {
    await axiosInstance
      .get(`/cart/checked/${currentUser?._id}`)
      .then((res) => {
        if (res.data.length > 0) {
          router.push(`/dat-hang/${currentUser?._id}`);
        } else {
          alert("Hãy chọn sản phẩm");
        }
      })
      .catch((error) => {
        console.log(error);

        alert("Hãy chọn sản phẩm");
      });
  };

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <>
      {loading && <Loading />}
      <div className="grid wide">
        <div
          className="card mb-3 shadow-5"
          style={{ backgroundColor: "#EEEEEE" }}
        >
          <div className="card-body" style={{ marginTop: "40px" }}>
            <center>
              <h3 className="card-title">GIỎ HÀNG</h3>
            </center>
          </div>
        </div>

        {cartData.length !== 0 ? (
          <CartProduct
            cartProduct={cartData}
            setLoading={setLoading}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        ) : (
          <div className="display-flex-center">
            Không có sản phẩm trong giỏ hàng
          </div>
        )}

        {cartData.length > 0 && (
          <div className="cart__btn">
            <button className="main-btn" onClick={handleChangeOrder}>
              Đặt hàng
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartUI;
