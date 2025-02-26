"use client";
import HomeCategory from '@/components/HomeCategory/HomeCategory'
import ProductListContainer from '@/components/HomeProducts/ProductListContainer'
import SliderBanner from '@/components/SliderBanner.tsx/SliderBanner'
import { ProductModel } from '@/models/ProductModel'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const HomePage = () => {
   const [productList, setProductList] = useState<ProductModel[]>([]);
  
    useEffect(() => {
      axios.get('http://localhost:8000/api/products')
        .then(response => {setProductList(response.data)})
        .catch(error => console.error(error));
    }, []);
  return (
    <div>
        <SliderBanner />
        <HomeCategory/>
        <ProductListContainer header='Gợi ý cho bạn hôm nay' productList={productList} uniqueId='1'/>
        <ProductListContainer header={`Sản phẩm nổi bật: Sách`} productList={productList} uniqueId='2'/>
        <ProductListContainer header="Đồ miễn phí" productList={productList} uniqueId='3'/>
        <ProductListContainer header="Sản phẩm đã xem" productList={productList} uniqueId='4'/>
    </div>
  )
}

export default HomePage