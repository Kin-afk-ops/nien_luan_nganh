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

  // Xử lý thay đổi số lượng
  const handleQuantityChange = async (
    cartItemId: string,
    newQuantity: number,
    productQuantity: number
  ) => {
    try {
      const validQuantity = Math.max(1, Math.min(newQuantity, productQuantity));
      setCartData((prev: any) => ({
        ...prev,
        cart: prev.cart.map((item: any) =>
          item._id === cartItemId ? { ...item, quantity: validQuantity } : item
        ),
      }));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const handleRemoveItem = async (cartItemId: string) => {
    try {
      await axiosInstance.delete("/cart/delete/" + cartItemId);
      setRefresh((prev) => !prev); // Cập nhật giỏ hàng sau khi xóa
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Xử lý chọn sản phẩm
  const handleCheckboxChange = (cartItemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(cartItemId)
        ? prev.filter((id) => id !== cartItemId)
        : [...prev, cartItemId]
    );
  };

  // Tính tổng tiền
  const totalAmount =
    cartData?.cart?.reduce((sum: number, item: any) => {
      if (!selectedItems.includes(item._id)) return sum;
      const product = item.productId;
      return (
        sum + product.price * item.quantity * (1 - (product.discount || 0))
      );
    }, 0) || 0;

  const handlechangeOrder = async (): Promise<void> => {
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
          <CartProduct cartProduct={cartData} setLoading={setLoading} />
        ) : (
          <div className="display-flex-center">
            Không có sản phẩm trong giỏ hàng
          </div>
        )}

        {/* <Breadcrumb>
          <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item active>Giỏ hàng</Breadcrumb.Item>
        </Breadcrumb> */}

        {/* <table>
          <thead>
            <tr>
              <th></th>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Đơn giá</th>
              <th>Khuyến mãi</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
              <th>Thay đổi</th>
            </tr>
          </thead>
          <tbody>
            {cartData?.cart?.map((item: any) => {
              const product = item.productId;
              if (!product) return null;
  
              return (
                <tr key={item._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item._id)}
                      onChange={() => handleCheckboxChange(item._id)}
                    />
                  </td>
                  <td>
                    <img
                      src={product.images?.url?.[0] || "/default-image.jpg"}
                      alt={product.name}
                      className="img-fluid rounded-start"
                      width="100px"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price.toLocaleString()} VNĐ</td>
                  <td>{(product.discount || 0) * 100}%</td>
                  <td>
                    <div className="d-flex">
                      <button
                        style={{ marginRight: "2px" }}
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            item.quantity - 1,
                            product.quantity
                          )
                        }
                      >
                        -
                      </button>
  
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        max={product.quantity}
                        style={{ width: "80px" }}
                      />
  
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            item.quantity + 1,
                            product.quantity
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>
                    <b>
                      {(
                        product.price *
                        item.quantity *
                        (1 - (product.discount || 0))
                      ).toLocaleString()}{" "}
                      VNĐ
                    </b>
                  </td>
                  <td>
                    <button onClick={() => handleRemoveItem(item._id)}>
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table> */}

        {cartData.length > 0 && (
          <div className="cart__btn">
            <button className="main-btn" onClick={handlechangeOrder}>
              Đặt hàng
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartUI;
