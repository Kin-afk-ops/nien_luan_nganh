"use client";
import "./dangban.css";
import axios from 'axios';
import { Button, Form, Table, Breadcrumb, Card } from 'react-bootstrap';
import React, { ChangeEvent, useState } from 'react';


const DangBan = () => {
    const handleImagePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        const previewContainer = document.getElementById("image-preview-container");

        if (files && previewContainer) {
            Array.from(files).forEach(file => {
                if (file && (file.type.startsWith("image/") || file.type.startsWith("video/"))) {
                    const reader = new FileReader();

                    reader.onload = function (e) {
                        const result = e.target?.result as string;

                        // Tạo div chứa preview và nút xóa
                        const fileContainer = document.createElement("div");
                        fileContainer.style.position = "relative";
                        fileContainer.style.display = "inline-block";
                        fileContainer.style.margin = "5px";

                        // Tạo phần tử preview
                        const previewElement = document.createElement(file.type.startsWith("image/") ? "img" : "video");
                        previewElement.src = result;
                        previewElement.style.display = "block";
                        previewElement.style.maxWidth = "150px";
                        previewElement.style.borderRadius = "8px";

                        if (file.type.startsWith("video/")) {
                            previewElement.setAttribute("controls", "controls");
                        }

                        // Tạo nút xóa
                        const deleteButton = document.createElement("button");
                        deleteButton.innerText = "✖";
                        deleteButton.style.position = "absolute";
                        deleteButton.style.top = "5px";
                        deleteButton.style.right = "5px";
                        deleteButton.style.background = "red";
                        deleteButton.style.color = "white";
                        deleteButton.style.border = "none";
                        deleteButton.style.borderRadius = "50%";
                        deleteButton.style.width = "24px";
                        deleteButton.style.height = "24px";
                        deleteButton.style.cursor = "pointer";
                        deleteButton.style.fontSize = "16px";
                        deleteButton.style.lineHeight = "24px";
                        deleteButton.style.textAlign = "center";
                        deleteButton.onclick = () => {
                            previewContainer.removeChild(fileContainer);
                        };

                        // Gắn các phần tử vào fileContainer
                        fileContainer.appendChild(previewElement);
                        fileContainer.appendChild(deleteButton);

                        // Thêm vào previewContainer
                        previewContainer.appendChild(fileContainer);
                    };

                    reader.readAsDataURL(file);
                }
            });

            // Reset input để có thể thêm lại file cũ
            event.target.value = "";
        }
    };


    const [price, setPrice] = React.useState<number | string>("");
    const [isFree, setIsFree] = React.useState(false);

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
    };

    const handleFreeChange = () => {
        setIsFree(!isFree);
        if (!isFree) {
            setPrice(0); // Khi chọn "Hàng miễn phí", giá về 0
        } else {
            setPrice(""); // Khi bỏ chọn, cho phép nhập lại giá
        }
    };


    const [quantity, setQuantity] = React.useState<number>(1); // Example for managing quantity.

    // Handle quantity change
    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Math.max(1, Number(e.target.value)); // Ensure quantity is at least 1
        setQuantity(newQuantity);
    };

    const [productName, setProductName] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [detail, setDetail] = React.useState("");
    const [files, setFiles] = React.useState<File[]>([]);

    const handleSell = async () => {
        try {
            // Validate required fields
            if (!productName || !category || !status || !address || !description || !detail) {
                alert("Vui lòng điền đầy đủ thông tin!");
                return;
            }

            // Create FormData for file upload
            const formData = new FormData();
            files.forEach((file) => {
                formData.append("images", file);
            });

            // Add product data
            formData.append("name", productName);
            formData.append("category", category);
            formData.append("status", status);
            formData.append("quantity", quantity.toString());
            formData.append("price", price.toString());
            formData.append("address", address);
            formData.append("description", description);
            formData.append("detail", detail);
            console.log(formData);
            // // Send request to server
            // const response = await axios.post("http://localhost:6969/api/product/create", formData, {
            //     headers: {
            //         "Content-Type": "multipart/form-data",
            //     },
            // });

            // if (response.status === 200) {
            //     alert("Đăng bán sản phẩm thành công!");
            //     // Reset form
            //     setProductName("");
            //     setCategory("");
            //     setStatus("");
            //     setQuantity(1);
            //     setPrice("");
            //     setAddress("");
            //     setDescription("");
            //     setDetail("");
            //     setFiles([]);
            //     // Clear preview container
            //     const previewContainer = document.getElementById("image-preview-container");
            //     if (previewContainer) {
            //         previewContainer.innerHTML = "";
            //     }
            // }
            // console.log(response.data);
        } catch (error) {
            console.error("Error creating product:", error);
            alert("Có lỗi xảy ra khi đăng bán sản phẩm. Vui lòng thử lại!");
        }
    };

    return (
        <div className="container">
            <div
                className="card mb-3 shadow-5"
                style={{ backgroundColor: "#EEEEEE" }}
            >
                <div className="card-body" style={{ marginTop: "40px" }}>
                    <center>
                        <h3 className="card-title">ĐĂNG BÁN</h3>
                        <p>Mô tả các mặt hàng một cách trung thực và nhận được khoản thanh toán đảm bảo 100%.</p>
                    </center>
                </div>
            </div>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item active>Đăng bán</Breadcrumb.Item>
            </Breadcrumb>
            <div className="wrapper">
                <div className="sellform-container">
                    <div className="image-vid">
                        <h4>Ảnh và video:</h4>
                        <div className="file-upload-wrapper">
                            <input
                                type="file"
                                accept="image/*,video/*"
                                id="file-upload"
                                multiple  // Allows multiple file uploads
                                onChange={handleImagePreview}
                            />
                            <label htmlFor="file-upload">Tải lên hình ảnh và video</label>
                        </div>
                        <div id="image-preview-container" className="review-image">
                            {/* Previews will be dynamically added here */}
                        </div>
                    </div>
                    <div className="category">
                        <h4>Danh mục</h4>
                        <select 
                            className="category-option"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="" hidden>Lựa chọn danh mục</option>
                            <option value="electronics">Điện tử</option>
                            <option value="fashion">Thời trang</option>
                            <option value="home">Nhà cửa</option>
                            <option value="books">Sách</option>
                            <option value="sports">Thể thao</option>
                        </select>
                    </div>
                    <div className="name-product">
                        <h4>Tên sản phẩm:</h4>
                        <input 
                            type="text" 
                            name="product-name" 
                            id="product-name" 
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <div className="status">
                        <h4>Tình trạng:</h4>
                        <div>
                            <div className="option">
                                <input 
                                    type="radio" 
                                    name="status" 
                                    id="new" 
                                    value="new"
                                    checked={status === "new"}
                                    onChange={(e) => setStatus(e.target.value)}
                                />
                                <label htmlFor="new">Hàng mới</label>
                            </div>
                            <div className="option">
                                <input 
                                    type="radio" 
                                    name="status" 
                                    id="like-new" 
                                    value="like-new"
                                    checked={status === "like-new"}
                                    onChange={(e) => setStatus(e.target.value)}
                                />
                                <label htmlFor="like-new">Như mới</label>
                            </div>
                            <div className="option">
                                <input 
                                    type="radio" 
                                    name="status" 
                                    id="good" 
                                    value="good"
                                    checked={status === "good"}
                                    onChange={(e) => setStatus(e.target.value)}
                                />
                                <label htmlFor="good">Tốt</label>
                            </div>
                            <div className="option">
                                <input 
                                    type="radio" 
                                    name="status" 
                                    id="average" 
                                    value="average"
                                    checked={status === "average"}
                                    onChange={(e) => setStatus(e.target.value)}
                                />
                                <label htmlFor="average">Trung bình</label>
                            </div>
                            <div className="option">
                                <input 
                                    type="radio" 
                                    name="status" 
                                    id="bad" 
                                    value="bad"
                                    checked={status === "bad"}
                                    onChange={(e) => setStatus(e.target.value)}
                                />
                                <label htmlFor="bad">Kém</label>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex quantity-button">
                        <h4>Số lượng: </h4>
                        <Button variant="info" onClick={() => setQuantity(prev => Math.max(1, prev - 1))} style={{ marginRight: '10px' }}>
                            <i className="fas fa-minus"></i>
                        </Button>

                        <Form.Control
                            type="number"
                            value={quantity}
                            min="1"
                            style={{ width: '80px' }}
                            onChange={handleQuantityChange}
                        />

                        <Button variant="info" onClick={() => setQuantity(prev => prev + 1)}>
                            <i className="fas fa-plus"></i>
                        </Button>
                    </div>
                    <div className="price relative w-full">
                        <h4>Giá bán:</h4>
                        <input
                            type="number"
                            name="price"
                            id="price-input"
                            value={price}
                            onChange={handlePriceChange}
                            disabled={isFree}
                            className="w-full border border-gray-300 rounded-md p-2 pr-12 text-right"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                            VND
                        </span>
                        <input
                            type="checkbox"
                            name="free"
                            id="free-checkbox"
                            onChange={handleFreeChange}
                            checked={isFree}
                        />
                        <label htmlFor="free-checkbox">Hàng miễn phí</label>
                    </div>
                    <div className="address">
                        <h4>Địa chỉ:</h4>
                        <input 
                            type="text" 
                            name="address" 
                            id="address" 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="description">
                        <h4>Mô tả:</h4>
                        <textarea 
                            name="description" 
                            maxLength={500} 
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="detail">
                        <h4>Chi tiết sản phẩm:</h4>
                        <textarea 
                            name="detail" 
                            maxLength={500} 
                            id="detail"
                            value={detail}
                            onChange={(e) => setDetail(e.target.value)}
                        ></textarea>
                    </div>
                </div>
                <Button onClick={handleSell} className="nextbtn">
                    Đăng bán
                </Button>
            </div>
        </div>
    );
};

export default DangBan;
