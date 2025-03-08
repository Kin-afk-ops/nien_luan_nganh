<<<<<<< HEAD
import HomeCategory from '@/components/HomeCategory/HomeCategory'
import ProductListContainer from '@/components/HomeProducts/ProductListContainer'
import SliderBanner from '@/components/SliderBanner.tsx/SliderBanner'
import React, {use, useEffect, useState} from 'react'
=======
"use client";
import HomeCategory from "@/components/HomeCategory/HomeCategory";
import ProductListContainer from "@/components/HomeProducts/ProductListContainer";
import SliderBanner from "@/components/SliderBanner.tsx/SliderBanner";
import axiosInstance from "@/helpers/api/config";
import axios from "axios";
import React, { useEffect, useState } from "react";
>>>>>>> b2b4cb99b68a18dc36eb56864012b41ba12f28f8

const page = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
<<<<<<< HEAD
    fetch('http://localhost:3000/api/products')
      .then(response => response.json())
      .then(data => setProductList(data))
      .catch(error => console.error(error));
=======
    axiosInstance
      .get("/products")
      .then((res) => {
        setProductList(res.data);
      })
      .catch((error) => console.error(error));
>>>>>>> b2b4cb99b68a18dc36eb56864012b41ba12f28f8
  }, []);

  return (
    <div>
<<<<<<< HEAD
        <SliderBanner />
        <HomeCategory/>
        <ProductListContainer productList={productList}/>
    </div>
  )
}

export default page
=======
      <SliderBanner />
      <HomeCategory />
      <ProductListContainer productList={productList} />
    </div>
  );
};

export default page;
>>>>>>> b2b4cb99b68a18dc36eb56864012b41ba12f28f8
