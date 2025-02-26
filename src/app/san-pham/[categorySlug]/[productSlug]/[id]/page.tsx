"use client";
import React, { useEffect, useState } from 'react'
import { useParams } from "next/navigation";
import "@/styles/globalStyle.css"
import "./detail.css"
import { ProductModel } from '@/models/ProductModel';
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent';


const ProductDetail  = () => {

    const { categorySlug, productSlug, id } = useParams();
    const [count, setCount] = useState(1);
    const [product, setProduct] = useState<ProductModel>();
    useEffect(() => {
        if(!id) return;
        fetch(`http://localhost:8000/api/products/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error(error));
        
    }
    , [id]);

    const handlePlus = () => {
      setCount(count + 1);
    }

    const handleMinus = () => {
      if(count > 1) setCount(count - 1);
    }

    if (!product) return <p>Không có sản phẩm</p>;

  return (
    <div className='container'>
      <div className='sub-container'>
        <div className="main-info-container">
          <div className="product-image-container">
            <img src={product.imageUri} alt={product.name} className='product-image'/>
          </div>
          <div className="info">
            <h2>{product.name}</h2>
            <h2 style={{color: "coral"}}>{`${product.price}đ`}</h2>
            <p>{`Vận chuyển từ: ${product.location}`}</p>
            <div className="row-container">
                <p >Số lượng:</p>
                <div className="minus-button" onClick={handleMinus}>-</div>
                <p className="count">{count}</p>
                {product.quantityStock <= 1 ? <div className="plus-button disabled-button">+</div>
                : <div className="plus-button" onClick={handlePlus}>+</div>}
                <p style={{color: "gray"}}>{`Còn lại ${product.quantityStock} sản phẩm có sẵn trong kho`}</p> 
            </div>
            <div className="row-container">
            <ButtonComponent label='Thêm vào giỏ hàng'
              style={{color: "coral", border: "2px solid coral"}}
            ></ButtonComponent>
            <ButtonComponent label='Mua ngay'
              style={{backgroundColor: "coral", color: "white"}}
            ></ButtonComponent>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  )
}

export default ProductDetail 