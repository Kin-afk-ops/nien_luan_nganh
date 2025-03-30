"use client"
import React from 'react'
import styles from './HomeProduct.module.css'
import { ProductCardModel, ProductModel } from '@/models/ProductModel'
import { FaLocationDot } from "react-icons/fa6";
import { FaTruck, FaCoins } from "react-icons/fa";
import Link from "next/link";

interface Props{
  product?: ProductModel;
}



const ProductCard = (props: Props) => {
  const { product } = props;;

  const handleReload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = (e.currentTarget as HTMLAnchorElement).href;
  };
  return (
    <Link className={styles.card} href={`/san-pham/${product?.categories.slug}/${product?.slug}/${product?._id}`} 
      onClick={handleReload}>
      <div className={styles.image}>
        <img src={product?.images.url[0]} alt="product"/>
      </div>
      <div className={styles.info}>
        <div className={styles.nameField}>
          <p>{product?.name}</p>
        </div>
        <p className={styles.price}>{`${product?.price}đ`}</p>
        <div className={styles.location}>
          <FaLocationDot/>
          {
            product?.address && <p>{product?.address.province}</p>
          }
        </div>
      </div>
       {product?.isFreeShip && 
        <div className={styles.row_item}>
          <FaTruck size={15} />
          <p style={{fontSize: 15}}>Freeship</p>
        </div> }
    </Link>
    
  )
}

export default ProductCard