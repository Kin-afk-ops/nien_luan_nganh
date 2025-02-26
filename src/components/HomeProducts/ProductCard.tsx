"use client"
import React from 'react'
import styles from './HomeProduct.module.css'
import { ProductCardModel, ProductModel } from '@/models/ProductModel'
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";

interface Props{
  product?: ProductModel;
}

const ProductCard = (props: Props) => {
  const { product } = props;
  return (
    <Link className={styles.card} href={`/san-pham/${product?.categorySlug}/${product?.slug}/${product?.id}`}>
      <div className={styles.image}>
        <img src={product?.imageUri} alt="product"/>
      </div>
      <div className={styles.info}>
        <div className={styles.nameField}>
          <p>{product?.name}</p>
        </div>
        <p className={styles.price}>{`${product?.price}đ`}</p>
        <div className={styles.location}>
          <FaLocationDot/>
          <p>{product?.location}</p>
        </div>
      </div>
    </Link>
    
  )
}

export default ProductCard