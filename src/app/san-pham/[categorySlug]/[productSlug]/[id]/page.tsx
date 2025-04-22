"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import "@/styles/globalStyle.css";
import "./detail.css";
import { ProductModel } from "@/models/ProductModel";
import ButtonComponent from "@/components/ButtonComponent/ButtonComponent";
import { BsFillHandIndexFill, BsShieldFillCheck } from "react-icons/bs";
import {
  FaRegFlag,
  FaShareAlt,
  FaRegHeart,
  FaCalendarAlt,
  FaTruck,
} from "react-icons/fa";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { BsShop } from "react-icons/bs";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { isImagePartiallyHidden, scrollToActive } from "./carouselImage";
import ContainerComponent from "@/components/ContainerComponent/ContainerComponent";
import { SellerModel } from "@/models/SellerModel";
import BreadcrumbComponent from "@/components/Breadcrumb/BreadcrumbComponent";
import { useInView } from "react-intersection-observer";
import ProductListContainer from "@/components/HomeProducts/ProductListContainer";
import ProductListComponent from "@/components/ProductListComponent/ProductListComponent";
import Link from "next/link";
import axiosInstance from "@/helpers/api/config";
import { detailLabels } from "@/data/detailLabels";
import CommentComponent from "@/components/commentComponent/CommentComponent";
import { CartFormInterface, CartInterface } from "@/interfaces/cart";
import { useAppSelector } from "@/lib/store";
import { addToCart } from "@/utils/addToCart";
import toast from "react-hot-toast";
import formatPrice from "@/helpers/format/formatPrice";
import { getLabelNamePairsByCateId } from "@/utils/addCategory";
import { useIsMobile } from "@/hooks/useIsMobile";
import StarRatings from "react-star-ratings";
interface LabelNamePair {
  label: string;
  name: string;
}

const ProductDetail = () => {
  const { categorySlug, productSlug, id } = useParams();
  const [labelNamePairs, setLabelNamePairs] = useState<LabelNamePair[]>([]);
  const [count, setCount] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [sellerInfo, setSellerInfo] = useState<SellerModel>();
  const [product, setProduct] = useState<ProductModel>();
  const [imgIndex, setimgIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [differentProduct, setDifferentProduct] = useState<ProductModel[]>([]);
  const [similarProduct, setSimilarProduct] = useState<ProductModel[]>([]);
  const [showAll, setShowAll] = useState(false);
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const isMobile = useIsMobile();

  useEffect(() => {
    const getProductSeller = async (): Promise<void> => {
      if (product) {
        await axiosInstance
          .get(`/products/differentP/${product?.sellerId}`)

          .then((res) => setDifferentProduct(res.data))
          .catch((err) => console.error("Lỗi khi fetch dữ liệu:", err));
        console.log("InView");
      }
    };

    getProductSeller();
  }, [inView]);

  useEffect(() => {
    const getProductCategories = (): void => {
      if (product) {
        axiosInstance
          .get(`/products/similar/${product?.categories.id}`)

          .then((res) => setSimilarProduct(res.data))
          .catch((err) => console.error("Lỗi khi fetch dữ liệu:", err));
        console.log("InView");
      }
    };

    getProductCategories();
  }, [inView]);

  useEffect(() => {
    if (!id) return;
    axiosInstance
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    if (!product?.sellerId) return;
    axiosInstance
      .get(`/seller/${product?.sellerId}`)
      .then((res) => setSellerInfo(res.data))
      .catch((error) => console.error(error));
  }, [product?.sellerId]);

  useEffect(() => {
    const fetchLabelNamePairs = async () => {
      if (product?.categories.id !== undefined) {
        const pairs = await getLabelNamePairsByCateId(product.categories.id);
        setLabelNamePairs(pairs);
      }
    };
    fetchLabelNamePairs();
  }, [product?.categories?.id]);

  const handlePlus = () => {
    setCount(count + 1);
  };

  const handleMinus = () => {
    if (count > 1) setCount(count - 1);
  };

  //Di chuyển ảnh

  const setItemRef = (el: HTMLDivElement | null, index: number) => {
    itemRefs.current[index] = el;
  };

  // const handleNext = () => {
  //   if (!product || !product.image) {
  //     return <div>Không có hình ảnh</div>;
  //   }
  //   if (selectedIndex < product.images.url.length - 1) {
  //     const newIndex = selectedIndex + 1;
  //     setSelectedIndex(newIndex);
  //     setimgIndex(newIndex);
  //     if (
  //       isImagePartiallyHidden(containerRef.current, itemRefs.current[newIndex])
  //     ) {
  //       scrollToActive(itemRefs.current[newIndex]);
  //     }
  //   }
  // };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      setSelectedIndex(newIndex);
      setimgIndex(newIndex);
      if (
        isImagePartiallyHidden(containerRef.current, itemRefs.current[newIndex])
      ) {
        scrollToActive(itemRefs.current[newIndex]);
      }
    }
  };

  //Thêm hàng vào giỏ hàng
  const handleAddToCart = () => {
    const cart: CartFormInterface = {
      productId: product?._id || "", // Use the product ID if available
      quantity: count, // Use the current count as the quantity
    };

    if (!currentUser) {
      toast.error("Vui lòng đăng nhập !");
      return;
    } else {
      addToCart(currentUser?._id, cart);
      toast.success("Bạn đã thêm sản phẩm vào giỏ hàng");
    }
  };
  // Di chuyển ảnh

  if (!product) return <div style={{ height: 1000 }}></div>;
  const detailEntries = Object.entries(product.details || {});
  const visibleDetails = showAll ? detailEntries : detailEntries.slice(0, 1);

  return (
    <div className={isMobile ? "container_mobile" : "container"}>
      {product.categories && (
        <BreadcrumbComponent
          id={product.categories.id}
          productName={product.name}
        />
      )}
      {/* Thông tin sản phẩm */}
      <div className="sub-container">
        <div className="main-info-container">
          <div className="product-image-container">
            <div className="product-images">
              {product.image && (
                <img
                  src={product.image.path}
                  alt={product.name}
                  className="product-image"
                />
              )}
            </div>
            <div className="carousel-wrapper">
              <div className="arrow left" onClick={handlePrev}>
                &lt;
              </div>
              {/* <div className="carousel-container" ref={containerRef}>
                {product.images.url.map((img, index) => (
                  <div
                    className={`thumbnail ${
                      selectedIndex === index ? "active" : ""
                    }`}
                    key={index}
                    onClick={() => [setSelectedIndex(index), setimgIndex(index)]}
                    ref={(el) => setItemRef(el, index)}
                  >
                    <img
                      src={img}
                      alt={`Image ${index}`}
                      width={80}
                      height={80}
                      className="thumbnail-img"
                    />
                  </div>
                ))}
              </div> */}
              {/* <div className="arrow right" onClick={handleNext}>
                &gt;
              </div> */}
            </div>
          </div>
          <div className="info">
            <h2>{product.name}</h2>
            <h2 style={{ color: "coral" }}>{`${formatPrice(
              product.price
            )}`}</h2>
            <p>{`Vận chuyển từ: ${product.addressInfo.province}`}</p>
            <div className="row-container">
              <p>Số lượng:</p>
              <div className="minus-button" onClick={handleMinus}>
                -
              </div>
              <p className="count">{count}</p>
              {product.quantity <= count ? (
                <div className="plus-button disabled-button">+</div>
              ) : (
                <div className="plus-button" onClick={handlePlus}>
                  +
                </div>
              )}
              <p
                style={{ color: "gray" }}
              >{`Còn lại ${product.quantity} sản phẩm có sẵn trong kho`}</p>
            </div>
            <div className="row-container mobile-display">
              <ButtonComponent
                label="Thêm vào giỏ hàng"
                style={{ color: "coral", border: "2px solid coral" }}
                onClick={handleAddToCart}
              ></ButtonComponent>
              <ButtonComponent
                label="Mua ngay"
                style={{ backgroundColor: "coral", color: "white" }}
              ></ButtonComponent>
            </div>
            <div className="info-footer">
              <div className="icon-container">
                <BsShieldFillCheck size={25} color="coral" />
              </div>
              <p style={{ color: "gray" }}>
                Nhận sản phẩm như mô tả. Hoặc nhận hoàn tiền. Thông tin thẻ của
                bạn được bảo mật và không được chia sẻ với người bán
              </p>
            </div>
          </div>
        </div>

        {/* <div className="row-container gap-40 ">
          <div className="row">
            <p>Bạn có sản phẩm tương tự?</p>
            <a href="#" style={{ color: "coral", fontWeight: "bold" }}>
              Đăng bán
            </a>
          </div>
          <div className="row">
            <FaRegFlag color="gray"></FaRegFlag>
            <a href="#" style={{ marginLeft: 10, color: "gray" }}>
              Báo cáo
            </a>
          </div>
          <div className="row">
            <FaShareAlt color="gray"></FaShareAlt>
            <a href="#" style={{ marginLeft: 10, color: "gray" }}>
              Chia sẻ
            </a>
          </div>
          <div className="row">
            <FaRegHeart color="gray"></FaRegHeart>
            <a href="#" style={{ marginLeft: 10, color: "gray" }}>
              Yêu thích
            </a>
          </div>
        </div> */}
      </div>
      {/* Thông tin người bán*/}
      <div className="seller-container">
        <div className="content">
          <ContainerComponent title="Thông tin người bán">
            <div className="seller-content">
              <div className="seller-info">
                <div className="row-info">
                  <div className="seller-avatar">
                    <img src={sellerInfo?.avatar} alt="Avatar" />
                  </div>
                  <div className="seller_main_info">
                    <h3>{sellerInfo?.name}</h3>
                    <div className="item-info gap-20 mobile_info">
                      <p>{`${sellerInfo?.productQuantity} sản phẩm`}</p>
                      <p>{`${sellerInfo?.sold} đã bán`}</p>
                    </div>
                    <a className="visit_shop_button" href="#">
                      <BsShop size={20}></BsShop>
                      <p style={{ color: "rgb(80, 79, 79)" }}>Xem shop</p>
                    </a>
                  </div>
                </div>
              </div>
              <div className="trust">
                <div className="trust_item">
                  <div className="icon">
                    <BsShieldFillCheck
                      size={25}
                      color="#6ca8fb"
                    ></BsShieldFillCheck>
                  </div>
                  <p style={{ color: "gray", fontSize: 14 }}>Đáng tin cậy</p>
                </div>
                <div className="trust_item">
                  <div className="icon">
                    <FaCalendarAlt size={25} color="#6ca8fb"></FaCalendarAlt>
                  </div>
                  <div>
                    <p
                      style={{ color: "gray", fontSize: 14 }}
                    >{`Thành viên từ ${2025}`}</p>
                  </div>
                </div>
                <div className="trust_item">
                  <div className="icon">
                    <FaTruck size={25} color="#6ca8fb"></FaTruck>
                  </div>
                  <p style={{ color: "gray", fontSize: 14 }}>Giao hàng nhanh</p>
                </div>
              </div>
            </div>
          </ContainerComponent>
          {/* Thông tin nổi bật */}
          <ContainerComponent title="Thông tin nổi bật">
            <div className="outstanding_info">
              <div className="outstanding_item">
                <p className="column1">Danh mục</p>
                <div className="column2">
                  <BreadcrumbComponent
                    id={product.categories.id}
                    isInOutStandings
                  ></BreadcrumbComponent>
                </div>
              </div>
              <div className="outstanding_item">
                <p className="column1">Phí vận chuyển</p>
                <div className="column2 ml">
                  {product.isFreeShip == true ? (
                    <p>Free ship</p>
                  ) : (
                    <p>Người mua trả</p>
                  )}
                </div>
              </div>
              <div className="outstanding_item">
                <p className="column1">Tình trạng</p>
                <div className="column2 ml">
                  <p>{product.condition}</p>
                </div>
              </div>
              {visibleDetails.map(([key, value]) => {
                const labelPair = labelNamePairs.find(
                  (pair) => pair.name === key
                );
                const label = labelPair ? labelPair.label : key;
                return (
                  <div className="outstanding_item" key={key}>
                    <p className="column1">{label}</p>
                    <div className="column2 ml">
                      <p>{value}</p>
                    </div>
                  </div>
                );
              })}
              <div className="show_all_container">
                <p
                  className="show-all"
                  onClick={() => setShowAll(!showAll)}
                >{`${showAll ? "Thu gọn" : "Xem thêm"}`}</p>
              </div>
              {product.size && (
                <div className="outstanding_item">
                  <p className="column1">Kích thước</p>
                  <div className="column2 ml">
                    <p>{product.size}</p>
                  </div>
                </div>
              )}
            </div>
          </ContainerComponent>
          {/* Mô tả sản phẩm */}
          <ContainerComponent title="Mô tả sản phẩm">
            <div className="description">
              <p>{product.description}</p>
            </div>
          </ContainerComponent>
          <ContainerComponent title="Đánh giá">
            <div className="review">
              <div className="rating">
                {product.ratingStar !== null && (
                  <StarRatings
                    rating={product.ratingStar.average}
                    starRatedColor="#FFD700"
                    numberOfStars={5}
                    starDimension="24px"
                    starSpacing="3px"
                  ></StarRatings>
                )}
              </div>
              <div className="rating_count">
                <p>{`(${product.ratingStar.count} đánh giá)`}</p>
              </div>
            </div>
            <CommentComponent
              productId={product._id}
              starRating={product.ratingStar}
            ></CommentComponent>
          </ContainerComponent>
          <div ref={ref}>
            {differentProduct ? (
              <ProductListComponent
                flexable="flex"
                title="Sản phâm khác của Shop"
                products={differentProduct}
              />
            ) : (
              <div className="loading">Loading...</div>
            )}
          </div>
        </div>
        <div className="similar-products" ref={ref}>
          <div className="similar_title">
            <h3 style={{ color: "#6ca8fb" }}>Sản phẩm tương tự</h3>
          </div>
          <div className="link">
            {similarProduct ? (
              <ProductListComponent products={similarProduct} />
            ) : (
              <div className="loading">Loading...</div>
            )}
          </div>
          <div className="link">
            <Link
              href={`/${categorySlug}?id=${product.categories.id}`}
              className="link_item"
            >
              Xem chi tiết
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
