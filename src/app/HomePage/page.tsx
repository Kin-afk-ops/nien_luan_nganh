"use client";
import HomeCategory from "@/components/HomeCategory/HomeCategory";
import ProductListContainer from "@/components/HomeProducts/ProductListContainer";
import SliderBanner from "@/components/SliderBanner.tsx/SliderBanner";
import axiosInstance from "@/helpers/api/config";
import axios from "axios";
import React, { useEffect, useState } from "react";

const page = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/products")
      .then((res) => {
        setProductList(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <SliderBanner />
      <HomeCategory />
      <ProductListContainer productList={productList} />
    </div>
  );
};

export default page;
