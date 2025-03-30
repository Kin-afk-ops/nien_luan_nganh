"use client";

import { Button, Form, Table, Breadcrumb, Card, Spinner } from "react-bootstrap";
import React, { ChangeEvent, useState, useEffect } from "react";
import axiosInstance from "@/helpers/api/config";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAppSelector } from "@/lib/store";

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
  const [cartData, setCartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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
          setCartData({ cart: data || [] });
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
  const handleQuantityChange = async (cartItemId: string, newQuantity: number, productQuantity: number) => {
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
      prev.includes(cartItemId) ? prev.filter((id) => id !== cartItemId) : [...prev, cartItemId]
    );
  };

  // Tính tổng tiền
  const totalAmount =
    cartData?.cart?.reduce((sum: number, item: any) => {
      if (!selectedItems.includes(item._id)) return sum;
      const product = item.productId;
      return sum + product.price * item.quantity * (1 - (product.discount || 0));
    }, 0) || 0;

  if (loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

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
    <div className="container">
      <div className="card mb-3 shadow-5" style={{ backgroundColor: "#EEEEEE" }}>
        <div className="card-body" style={{ marginTop: "40px" }}>
          <center>
            <h3 className="card-title">GIỎ HÀNG</h3>
          </center>
        </div>
      </div>

      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active>Giỏ hàng</Breadcrumb.Item>
      </Breadcrumb>

      <Table responsive="sm" bordered>
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
                    <Button
                      variant="info"
                      style={{ marginRight: "2px" }}
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1, product.quantity)}
                    >
                      -
                    </Button>

                    <Form.Control
                      type="number"
                      value={item.quantity}
                      min="1"
                      max={product.quantity}
                      style={{ width: "80px" }}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleQuantityChange(item._id, Number(e.target.value), product.quantity)
                      }
                    />

                    <Button
                      variant="info"
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1, product.quantity)}
                    >
                      +
                    </Button>
                  </div>
                </td>
                <td>
                  <b>{(product.price * item.quantity * (1 - (product.discount || 0))).toLocaleString()} VNĐ</b>
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleRemoveItem(item._id)}>
                    Xóa
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Card>
        <Card.Body>
          <div className="float-start">
            <h4 className="text-success">Tổng tiền: {totalAmount.toLocaleString()} VNĐ</h4>
          </div>
          <div className="float-end">
            <Button variant="success" style={{ margin: "15px" }}>
              Thanh Toán
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CartUI;
