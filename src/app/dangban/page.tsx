"use client";
import "./dangban.css";
import { Button, Form, Table, Breadcrumb, Card } from "react-bootstrap";
import React, { ChangeEvent, useState, useEffect } from "react";
import AddressModal from "@/components/addressModal/addressModal2";
import { AddressInterface } from "@/interfaces/addressUser";
import { useParams } from "next/navigation";
import categoriesData from "@/components/category/categories";
import AddressList from "@/components/addressList/AddressList";

const DangBan = () => {
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [addresses, setAddresses] = useState<AddressInterface[]>([]);
  const [indexAddress, setIndexAddress] = useState<number | null>(null);
  const [editAddressMode, setEditAddressMode] = useState<boolean>(false);
  const [categories, setCategories] = useState<
    { attributeId: number; label: string; listDataType: any[] }[]
  >([]);
  const [category, setCategory] = useState<string>("");
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: string;
  }>({});
  const [currentListDataType, setCurrentListDataType] = useState<any[]>([]);
  const { categorySlug } = useParams();
  const [productName, setProductName] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [detail, setDetail] = React.useState("");
  const [files, setFiles] = React.useState<File[]>([]);
  const [price, setPrice] = React.useState<number | string>("");
  const [isFree, setIsFree] = React.useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (addresses.length > 0) {
      const lastAddress = addresses[addresses.length - 1];
      const formattedAddress = `${lastAddress.address}, ${lastAddress.ward}, ${lastAddress.district}, ${lastAddress.province}`;
      setAddress(formattedAddress);
    }
  }, [addresses]);

  const handleImagePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    const previewContainer = document.getElementById("image-preview-container");

    if (uploadedFiles && previewContainer) {
      // Update the files state with the new files
      const newFiles = Array.from(uploadedFiles);
      setFiles((prevFiles) => {
        // Filter out any duplicates based on file name and size
        const existingFileNames = prevFiles.map((f) => `${f.name}-${f.size}`);
        const uniqueNewFiles = newFiles.filter(
          (file) => !existingFileNames.includes(`${file.name}-${file.size}`)
        );
        return [...prevFiles, ...uniqueNewFiles];
      });
      console.log("Files after update:", newFiles);

      Array.from(uploadedFiles).forEach((file) => {
        if (
          file &&
          (file.type.startsWith("image/") || file.type.startsWith("video/"))
        ) {
          const reader = new FileReader();

          reader.onload = function (e) {
            const result = e.target?.result as string;

            const fileContainer = document.createElement("div");
            fileContainer.style.position = "relative";
            fileContainer.style.display = "inline-block";
            fileContainer.style.margin = "5px";

            const previewElement = document.createElement(
              file.type.startsWith("image/") ? "img" : "video"
            );
            previewElement.src = result;
            previewElement.style.display = "block";
            previewElement.style.maxWidth = "150px";
            previewElement.style.borderRadius = "8px";

            if (file.type.startsWith("video/")) {
              previewElement.setAttribute("controls", "controls");
            }

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
              // Remove the file from files state
              setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
            };

            fileContainer.appendChild(previewElement);
            fileContainer.appendChild(deleteButton);
            previewContainer.appendChild(fileContainer);
          };

          reader.readAsDataURL(file);
        }
      });

      event.target.value = "";
    }
  };

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

  const [quantity, setQuantity] = React.useState<number>(1);

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, Number(e.target.value));
    setQuantity(newQuantity);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategoryId = e.target.value;
    setCategory(selectedCategoryId);

    // Find the selected category and update its listDataType
    const selectedCategory = categories.find(
      (cat) => cat.attributeId.toString() === selectedCategoryId
    );
    if (selectedCategory) {
      setCurrentListDataType(selectedCategory.listDataType || []);
      setSelectedAttributes({}); // Reset selected attributes when category changes
    } else {
      setCurrentListDataType([]);
    }
  };

  const handleAttributeChange = (attributeId: string, value: string) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeId]: value,
    }));
  };

  const handleSell = () => {
    try {
      // Comprehensive form validation
      if (!productName.trim()) {
        alert("Vui lòng nhập tên sản phẩm!");
        return;
      }
      if (!category) {
        alert("Vui lòng chọn danh mục!");
        return;
      }
      if (!status) {
        alert("Vui lòng chọn tình trạng sản phẩm!");
        return;
      }
      if (!address) {
        alert("Vui lòng nhập địa chỉ!");
        return;
      }
      if (!description.trim()) {
        alert("Vui lòng nhập mô tả sản phẩm!");
        return;
      }
      if (!isFree && (!price || Number(price) <= 0)) {
        alert("Vui lòng nhập giá hợp lệ!");
        return;
      }

      // Create product object with form data
      const productData = {
        name: productName.trim(),
        categoryId: category,
        status: status,
        quantity: quantity,
        price: isFree ? 0 : Number(price),
        address: address.trim(),
        description: description.trim(),
        detail: detail.trim(),
        attributes: selectedAttributes,
        images: files,
      };

      console.log("Product data:", productData);
      alert("Sản phẩm đã được đăng bán thành công!");

      // Reset form
      setProductName("");
      setCategory("");
      setStatus("");
      setAddress("");
      setDescription("");
      setDetail("");
      setPrice("");
      setQuantity(1);
      setFiles([]);
      setSelectedAttributes({});
      const previewContainer = document.getElementById(
        "image-preview-container"
      );
      if (previewContainer) {
        previewContainer.innerHTML = "";
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Có lỗi xảy ra khi đăng bán sản phẩm. Vui lòng thử lại!");
    }
  };

  return (
    <div className="grid wide container">
      <div
        className="card mb-3 shadow-5"
        style={{ backgroundColor: "#EEEEEE" }}
      >
        <div className="card-body" style={{ marginTop: "40px" }}>
          <center>
            <h3 className="card-title">ĐĂNG BÁN</h3>
            <p>
              Mô tả các mặt hàng một cách trung thực và nhận được khoản thanh
              toán đảm bảo 100%.
            </p>
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
                multiple // Allows multiple file uploads
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
              onChange={handleCategoryChange}
            >
              <option value="" hidden>
                Chọn danh mục
              </option>
              {categories.map((cat) => (
                <option key={cat.attributeId} value={cat.attributeId}>
                  {cat.label}
                </option>
              ))}
            </select>

            {currentListDataType.length > 0 && (
              <div
                className="category-attributes"
                style={{ marginTop: "20px" }}
              >
                {currentListDataType.map((attribute, index) => (
                  <div
                    key={index}
                    className="attribute-select"
                    style={{ marginBottom: "10px" }}
                  >
                    <label style={{ display: "block", marginBottom: "5px" }}>
                      {attribute.label}:
                    </label>
                    <select
                      className="form-select"
                      value={selectedAttributes[attribute.id] || ""}
                      onChange={(e) =>
                        handleAttributeChange(attribute.id, e.target.value)
                      }
                    >
                      <option value="">Chọn {attribute.label}</option>
                      {attribute.options?.map(
                        (option: any, optIndex: number) => (
                          <option key={option.id} value={option.id}>
                            {option.value}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                ))}
              </div>
            )}
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
            <Button
              variant="info"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              style={{ marginRight: "10px" }}
            >
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
          <div className="price relative w-full">
            <h4>Giá bán:</h4>
            <div className="d-flex">
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
          </div>
          <div className="address">
            <h4>Địa chỉ:</h4>
            <AddressList
              setAddressModal={setAddressModal}
              setEditAddressMode={setEditAddressMode}
              setAddressId={setAddress}
              setIndexAddress={setIndexAddress}
              addresses={addresses}
              setAddresses={setAddresses}
              userId={null}
              setChoiceAddress={function (
                value: React.SetStateAction<AddressInterface | null>
              ): void {
                throw new Error("Function not implemented.");
              }}
              setChoiceAddressModal={function (
                value: React.SetStateAction<boolean>
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
            {/* <div className="profile__info--form-block">
                            <p className="profile__info--form-address">Địa chỉ</p>
                            <button
                                className="profile__info--form-address-btn"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setAddressModal(true);
                                }}
                            >
                                <i className="fa-solid fa-plus"></i>
                                Thêm mới
                            </button>
                        </div> */}
            {addressModal && (
              <AddressModal
                addressModal={addressModal}
                setAddressModal={setAddressModal}
                addresses={addresses}
                setAddresses={setAddresses}
                indexAddress={indexAddress}
                editAddressMode={editAddressMode}
              />
            )}
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
        </div>
        <Button onClick={handleSell} className="nextbtn">
          Đăng bán
        </Button>
      </div>
    </div>
  );
};

export default DangBan;
