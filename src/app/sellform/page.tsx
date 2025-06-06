"use client";
import { useEffect, useState } from "react";
import "./sellform.css";
import Image from "next/image";
import { ICategory, productFormInterface } from "@/interfaces/product";
import axiosInstance from "@/helpers/api/config";
import CategoriesBlock from "@/components/categoriesBlock/CategoriesBlock";
import { CategoriesInterface } from "@/interfaces/categories";
import { AddressInterface } from "@/interfaces/addressUser";
import AddressModal from "@/components/addressModal/AddressModal";
import AddressList from "@/components/addressList/addressList";
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/useAppDispatch";
import { validationEmpty } from "@/helpers/validation/address";
import formatSlug from "@/helpers/format/formatSlug";
import Loading from "@/components/loading/Loading";
import uploadImage from "@/helpers/image/uploadImage";
import { useRouter, useSearchParams } from "next/navigation";
import { AvatarInterface } from "@/interfaces/avatar";
import updateImage from "@/helpers/image/updateImage";
import { ImageUploadInterface } from "@/interfaces/imageUpload";

const DangBan = () => {
  const router = useRouter();
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
  const [attributesList, setAttributesList] = useState<any[]>([]);
  const [attributeValues, setAttributeValues] = useState<{
    [key: string]: string;
  }>({});
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
  const [loading, setLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();

  const editMode = searchParams.get("edit") === "true";
  const productEditId = searchParams.get("id");
  const [imageProduct, setImageProduct] = useState<ImageUploadInterface>({
    path: "/assets/account/avatar_default.png",
    publicId: "",
  });

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

        setChoiceAddress(
          res?.data.filter((a: { default: boolean }) => a.default === true)[0]
        );
      } catch (error) {
        console.log(error);
      }
    };

    const getProduct = async (): Promise<void> => {
      if (productEditId) {
        try {
          const res = await axiosInstance.get(
            `/product/oneProduct/${productEditId}`
          );

          console.log(res.data);

          setNameValue(res.data.name);
          setCateLabel(res.data.categories);
          setCondition(res.data.condition);
          setQuantity(res.data.quantity);
          setPrice(res.data.price);
          setDescription(res.data.description);
          setChoiceAddress(res.data.addressInfo);
          setImageProduct(res.data.image);
          setAttributeValues(res.data.attributes || {});
        } catch (error) {
          console.log(error);
        }
      }
    };

    getCategories();

    getAddressUser();

    getProduct();
  }, [user, userId, loadingAddress, productEditId]);

  useEffect(() => {
    const fetchAttributes = async () => {
      if (cateLabel && cateLabel.id && cateLabel.attributeId) {
        try {
          const res = await axiosInstance.get(
            `/category/getAttrByCateId/${cateLabel.id}`
          );

          setAttributesList(res.data.listDataTypes ?? []);
        } catch (error) {
          console.error("Lỗi khi lấy thuộc tính sản phẩm", error);
        }
      } else {
        setAttributesList([]);
        setAttributeValues({});
      }
    };
    fetchAttributes();
  }, [cateLabel]);

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

  const validationForm = (): boolean => {
    if (
      validationEmpty(nameValue) &&
      cateLabel &&
      condition &&
      quantity &&
      validationEmpty(price) &&
      validationEmpty(description) &&
      choiceAddress &&
      validationEmpty(imageProduct.publicId)
    ) {
      return true;
    }

    return false;
  };

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    console.log(checkFile);

    if (validationForm()) {
      if (!editMode) {
        const image = await uploadImage(file);

        const newProduct: productFormInterface = {
          name: nameValue,
          categories: cateLabel ? cateLabel : null,
          slug: formatSlug(nameValue),
          condition: condition,
          quantity: quantity,
          price: Number(price),
          description,
          addressId: choiceAddress ? choiceAddress?._id : null,
          image: image,
          details: attributeValues,
        };

        await axiosInstance
          .post(`/products/${userId}`, newProduct)
          .then((res) => {
            setLoading(false);
            window.location.replace("/ho-so/tat-ca-san-pham");
            alert("Thêm sản phẩm thành công! Chờ xét duyệt");
          })
          .catch((error) => {
            console.log(error);
            alert("Lỗi khi thêm");
          });
      } else {
        setCheckFile(true);
        const newProduct: productFormInterface = {
          name: nameValue,
          categories: cateLabel ? cateLabel : null,
          slug: formatSlug(nameValue),
          condition: condition,
          quantity: quantity,
          price: Number(price),
          description,
          addressId: choiceAddress ? choiceAddress?._id : null,
          image: checkFile
            ? await updateImage(file, imageProduct?.publicId)
            : imageProduct,
          details: attributeValues,
        };

        await axiosInstance
          .put(`/product/${productEditId}`, newProduct)
          .then((res) => {
            setLoading(false);

            alert("Chỉnh sửa sản phẩm thành công");
            window.location.replace("/ho-so/tat-ca-san-pham");
          })
          .catch((error) => {
            console.log(error);
            alert("Lỗi khi thêm");
          });
      }
    } else {
      alert("Vui lòng cung cấp đầy đủ thông tin ");
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading />}
      <form
        className="wrapper"
        onSubmit={(e) => {
          e.stopPropagation();
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
                    setCheckFile(true);
                  } else {
                    setProductImageError(true);
                    setCheckFile(false);
                  }
                }}
              />

              <Image
                className="sell__form--image"
                src={!checkFile ? imageProduct.path : URL.createObjectURL(file)}
                alt="avatar "
                width={400}
                height={400}
              />

              {productImageError && (
                <p className="sell__form--image-error">Vui lòng nhập một ảnh</p>
              )}

              <label
                htmlFor="sellFormImage"
                className="secondary-btn sell__form--image-label"
              >
                Tải lên hình ảnh và video
              </label>
            </div>
          </div>

          <div className="name-product">
            <h4>Tên sản phẩm:</h4>
            <input
              type="text"
              name="product-name"
              id="product-name"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
            />
          </div>
          <h4>Danh Mục:</h4>
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
          <div className="attribute">
            {attributesList.length > 0 && (
              <div className="dynamic-attributes">
                {attributesList.map((attr) => (
                  <div key={attr.name} className="attribute-select">
                    <h4>{attr.label}:</h4>
                    <select
                      value={attributeValues[attr.name] || ""}
                      onChange={(e) =>
                        setAttributeValues((prev) => ({
                          ...prev,
                          [attr.name]: e.target.value,
                        }))
                      }
                    >
                      <option value="">Chọn {attr.label}</option>
                      {attr.options.map((opt: any) => (
                        <option key={opt._id} value={opt.value}>
                          {opt.value}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="status">
            <h4>Tình trạng:</h4>
            <div>
              <div className="option">
                <input
                  type="radio"
                  name="status"
                  checked={condition === "Mới"}
                  onChange={(e) => setCondition(e.target.value)}
                  id="new"
                  value="Mới"
                />
                <label htmlFor="new">Hàng mới</label>
              </div>
              <div className="option">
                <input
                  type="radio"
                  name="status"
                  checked={condition === "Như mới"}
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
                  checked={condition === "Tốt"}
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
                  checked={condition === "Trung bình"}
                  onChange={(e) => setCondition(e.target.value)}
                />
                <label htmlFor="average">Trung bình</label>
              </div>
              <div className="option">
                <input
                  type="radio"
                  name="status"
                  checked={condition === "Kém"}
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
              onChange={(e) => {
                setFreePrice(!freePrice);
                if (e.target.checked) {
                  setPrice("0");
                }
              }}
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
              cols={50}
              rows={8}
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

            <button onClick={() => setChoiceAddressModal(true)} type="button">
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
