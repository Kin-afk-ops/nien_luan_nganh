"use client";
import React from "react";
import styles from "./HomeProduct.module.css";
import ProductCard from "./ProductCard";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/swiperCss.css";
import { ProductModel } from "@/models/ProductModel";

interface Props {
  header?: string;
  productList: ProductModel[] | null;
  productCatogory?: any;
  width?: string;
  uniqueId?: string;
}

const ProductListContainer: React.FC<Props> = ({
  header,
  productList,
  productCatogory,
  width,
  uniqueId,
}) => {
  const swiper = useSwiper();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{header}</h2>
        <a href="#">Xem tất cả</a>
      </div>
      <div className={styles.swiperContainer}>
        {productList && (
          <div>
            <div className={`swiper-button-prev prev${uniqueId}`}></div>
            <Swiper
              modules={[Navigation, Pagination]} // Đảm bảo sử dụng modules đúng
              spaceBetween={10}
              slidesPerView={5}
              slidesPerGroup={5}
              navigation={{
                nextEl: `.swiper-button-next.next${uniqueId}`,
                prevEl: `.swiper-button-prev.prev${uniqueId}`,
              }}
              pagination={{ clickable: true }}
              loop={true}
              className={styles.swiperWrapper}
            >
              {productList.map((product, index: number) => (
                <SwiperSlide key={index}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className={`swiper-button-next next${uniqueId}`}></div>
          </div>
        )}
      </div>
      {/* <div className={styles.productContainer}>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
        </div> */}
    </div>
  );
};

export default ProductListContainer;
