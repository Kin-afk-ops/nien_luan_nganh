"use client";
import { useEffect, useState } from "react";
import "./sellform.css";
import Image from "next/image";
import { ICategory } from "@/interfaces/product";
import axiosInstance from "@/helpers/api/config";
import CategoriesBlock from "@/components/categoriesBlock/CategoriesBlock";
import { CategoriesInterface } from "@/interfaces/categories";
import { AddressInterface } from "@/interfaces/addressUser";
import AddressModal from "@/components/addressModal/AddressModal";
import AddressList from "@/components/addressList/addressList";
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/useAppDispatch";

const DangBan = () => {
  const user =
    useSelector((state: RootState) => state.user.currentUser) || null;
  const [userId, setUserId] = useState<string | null>(null);
  const [addresses, setAddresses] = useState<AddressInterface[]>([]);
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [editAddressMode, setEditAddressMode] = useState<boolean>(false);
  const [addressId, setAddressId] = useState<string>("");
  const [indexAddress, setIndexAddress] = useState<number>(9999);
  const [loadingAddress, setLoadingAddress] = useState<boolean>(false);

  const [file, setFile] = useState<File | null>(null);
  const [checkFile, setCheckFile] = useState<boolean>(false);
  const [productImageError, setProductImageError] = useState<boolean>(false);
  const [nameValue, setNameValue] = useState<string>("");
  const [categoriesValue, setCategoriesValue] =
    useState<CategoriesInterface | null>(null);

  const [categoriesArray, setCategoriesArray] = useState<
    CategoriesInterface[] | null
  >(null);
  const [displayCategories, setDisplayCategories] = useState<boolean>(false);
  const [cateLabel, setCateLabel] = useState<CategoriesInterface | null>(null);
  const [searchMode, setSearchMode] = useState<boolean>(false);

  const [condition, setCondition] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<string>("");

  const [freePrice, setFreePrice] = useState<boolean>(false);
  const [choiceAddress, setChoiceAddress] = useState<AddressInterface | null>(
    null
  );

  const [choiceAddressModal, setChoiceAddressModal] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (user) setUserId(user?._id);

    const getCategories = async (): Promise<void> => {
      try {
        const res = await axiosInstance.get(`/category/getallCategories`);

        setCategoriesArray(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getAddressUser = async (): Promise<void> => {
      try {
        const res = await axiosInstance.get(`/addressInfoUser/${user?._id}`);
        setAddresses(res?.data);

        setChoiceAddress(res?.data.filter((a) => a.default === true)[0]);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();

    getAddressUser();
  }, [user, userId, loadingAddress]);

  // useEffect(() => {
  //   const getAttributesOfCategory = async (): Promise<void> => {
  //     console.log(cateLabel);

  //     try {
  //       const res = await axiosInstance.get(
  //         `category/getAttributesOfCategory/${cateLabel?.attributeId}`
  //       );

  //       console.log(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getAttributesOfCategory();
  // }, [cateLabel]);

  const handleSubmit = async (): Promise<void> => {
    console.log("haha");
  };

  return (
    <>
      <form
        className="wrapper"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="page-name">
          <h1>Đăng bán</h1>
          <p>
            Mô tả các mặt hàng một cách trung thực và nhận được khoản thanh toán
            đảm bảo 100%.
          </p>
        </div>
        <div className="sellform-container">
          <div className="image-vid">
            <h4>Ảnh sản phẩm:</h4>
            <div className="file-upload-wrapper">
              <input
                id="sellFormImage"
                type="file"
                className="display-none"
                onChange={(e) => {
                  const files = e.target.files;

                  // Kiểm tra nếu không có file nào được chọn
                  if (!files || files.length === 0) {
                    setCheckFile(false);
                    return;
                  }

                  setFile(files[0]);

                  if (files[0].type?.startsWith("image/")) {
                    setProductImageError(false);
                  } else {
                    setProductImageError(true);
                  }

                  setCheckFile(true);
                }}
              />

              {file && (
                <Image
                  className="profile__info--top-image"
                  src={URL.createObjectURL(file)}
                  alt="avatar "
                  width={400}
                  height={400}
                />
              )}

              <label htmlFor="sellFormImage">Tải lên hình ảnh và video</label>
            </div>
          </div>

          <div className="name-product">
            <h4>Tên sản phẩm:</h4>
            <input type="text" name="product-name" id="product-name" />
          </div>

          <div className="category">
            <div
              className="sell__form--categories"
              onClick={() => setDisplayCategories(true)}
            >
              {cateLabel ? cateLabel.name : "Danh mục"}
              <i className="fa-solid fa-angle-down"></i>
            </div>
            {displayCategories && (
              <CategoriesBlock
                setDisplayCategories={setDisplayCategories}
                categories={categoriesArray}
                setCateLabel={setCateLabel}
                setSearchMode={setSearchMode}
              />
            )}
          </div>
          <div className="status">
            <h4>Tình trạng:</h4>
            <div>
              <div className="option">
                <input
                  type="radio"
                  name="status"
                  onChange={(e) => setCondition(e.target.value)}
                  id="new"
                  value="Hàng mới"
                />
                <label htmlFor="new">Hàng mới</label>
              </div>
              <div className="option">
                <input
                  type="radio"
                  name="status"
                  onChange={(e) => setCondition(e.target.value)}
                  id="like-new"
                  value="Như mới"
                />
                <label htmlFor="like-new">Như mới</label>
              </div>
              <div className="option">
                <input
                  type="radio"
                  name="status"
                  onChange={(e) => setCondition(e.target.value)}
                  id="good"
                  value="Tốt"
                />
                <label htmlFor="good">Tốt</label>
              </div>
              <div className="option">
                <input
                  type="radio"
                  name="status"
                  id="average"
                  value="Trung bình"
                  onChange={(e) => setCondition(e.target.value)}
                />
                <label htmlFor="average">Trung bình</label>
              </div>
              <div className="option">
                <input
                  type="radio"
                  name="status"
                  onChange={(e) => setCondition(e.target.value)}
                  id="bad"
                  value="Kém"
                />
                <label htmlFor="bad">Kém</label>
              </div>
            </div>
          </div>
          <div className="quantity">
            <h4>Số lượng:</h4>
            <input
              type="number"
              name="quantity"
              id="quantity"
              min={"1"}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <div className="price">
            <h4>Giá bán:</h4>
            <input
              type="number"
              name="price"
              id="price-input"
              min={"0"}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <input
              type="checkbox"
              name="free"
              id="free-radio"
              checked={freePrice}
              onChange={() => setFreePrice(!freePrice)}
            />
            <label htmlFor="free-radio">Hàng miễn phí</label>
          </div>

          <div className="sell__form--block">
            <label htmlFor="product__description" className="sell__form--label">
              <h4> Mô tả sản phẩm</h4>
            </label>
            <textarea
              placeholder="mô tả"
              name=""
              id="product__description"
              cols="50"
              rows="8"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
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
        <button className="main-btn sell__form--button" type="submit">
          Đăng bán
        </button>
      </form>

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

export default DangBan;
