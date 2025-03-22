"use client";

import { Button, Form, Table, Breadcrumb, Card } from "react-bootstrap";
import React, { ChangeEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CartUI: React.FC = () => {
  // You can add state management here (for example, for quantity changes).
  // Assuming we might have some state to manage quantity and items, here is an example:

  const [quantity, setQuantity] = React.useState<number>(2); // Example for managing quantity.

  // Handle quantity change
  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, Number(e.target.value)); // Ensure quantity is at least 1
    setQuantity(newQuantity);
  };

  return (
    <div className="container">
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

      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active>Giỏ hàng</Breadcrumb.Item>
      </Breadcrumb>

      <Table responsive="sm" bordered>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Hình ảnh</th>
            <th scope="col">Tên giày</th>
            <th scope="col">Đơn giá</th>
            <th scope="col">Khuyến mãi</th>
            <th scope="col">Số lượng</th>
            <th scope="col">Thành tiền</th>
            <th scope="col">Thay đổi</th>
          </tr>
        </thead>
        <tbody>
          {/* Repeat this row for each cart item */}
          <tr>
            <td>
              <input type="checkbox" defaultChecked name="check-gio-hang[]" />
            </td>
            <td>
              <img
                src="/images2/adidas.jpg"
                alt="shoe image"
                className="img-fluid rounded-start"
                width="100px"
              />
            </td>
            <td>Giày Adidas</td>
            <td>1,000,000 VNĐ</td>
            <td>10%</td>
            <td>
              <div className="d-flex">
                <Button variant="info" style={{ marginRight: "2px" }}>
                  <i className="fas fa-minus"></i>
                </Button>

                <Form.Control
                  type="number"
                  value={quantity}
                  min="1"
                  style={{ width: "80px" }}
                  onChange={handleQuantityChange}
                />

                <Button
                  variant="info"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  <i className="fas fa-plus"></i>
                </Button>
              </div>
            </td>
            <td>
              <b>1,800,000 VNĐ</b>
            </td>
            <td>
              <Button variant="info" className="mr-2">
                Cập nhật
              </Button>
              <Button variant="danger">Xóa</Button>
            </td>
          </tr>
          {/* End repeat row */}
        </tbody>
      </Table>

      <Card>
        <Card.Body>
          <div className="float-start">
            <h4 className="text-success">Tổng tiền: 1,800,000 VNĐ</h4>
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
