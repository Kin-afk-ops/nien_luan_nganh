"use client";
import React from "react";
import styles from "./HomeProduct.module.css";
import { ProductCardModel, ProductModel } from "@/models/ProductModel";
import { FaLocationDot } from "react-icons/fa6";
import { FaTruck, FaCoins } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import formatPrice from "@/helpers/format/formatPrice";

interface Props {
  product?: ProductModel;
}

const ProductCard = (props: Props) => {
  const { product } = props;

  const handleReload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = (e.currentTarget as HTMLAnchorElement).href;
  };
  return (
    <Link className={styles.card} href={`/san-pham/${product?.categories.slug}/${product?.slug}/${product?._id}`} 
      onClick={handleReload}>
      <div className={styles.image}>
        {
          product?.image && (
            <img src={product?.image.path} alt="product"/>
          )
        }
      </div>
      <div className={styles.info}>
        <div className={styles.nameField}>
          <p>{product?.name}</p>
        </div>
        {
          product && <p className={styles.price}>{`${formatPrice(product?.price)}`}</p>
        }
        
        <div className={styles.location}>
          <FaLocationDot/>
          {product?.addressInfo ? <p>{product.addressInfo.province}</p> : <p>Không có Tỉnh</p> 
        }
        </div>
      </div>
       {product?.isFreeShip && 
        <div className={styles.row_item}>
          <FaTruck size={15} />
          <p style={{fontSize: 15}}>Freeship</p>
        </div> }
        {product?.price === 0 && (
          <div className={styles.circle_item}>
            <p>Miễn phí</p>
          </div>
        )}
    </Link>
  );
};

export default ProductCard;
