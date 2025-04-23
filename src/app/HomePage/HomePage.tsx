"use client";
import HomeCategory from "@/components/HomeCategory/HomeCategory";
import ProductListContainer from "@/components/HomeProducts/ProductListContainer";
import SliderBanner from "@/components/SliderBanner.tsx/SliderBanner";
import axiosInstance from "@/helpers/api/config";
import { ProductModel } from "@/models/ProductModel";
import axios from "axios";
import { useGlobalState } from "../../data/stateStore";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [productList, setProductList] = useState<ProductModel[] | null>(null);
  const [productOutstanding1, setProductOutstanding1] = useState<
    ProductModel[]
  >([]);
  const [productOutstanding2, setProductOutstanding2] = useState<
    ProductModel[]
  >([]);
  const [freeProducts, setfreeProducts] = useState<ProductModel[] | null>(null);
  const { resetFilter } = useGlobalState();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products?approve=true");
        setProductList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`/products/outstanding/${10}?approve=true`)
      .then((response) => {
        setProductOutstanding1(response.data);
      });
  }, []);

  useEffect(() => {
    axiosInstance.get(`/products/outstanding/${2}`).then((response) => {
      setProductOutstanding2(response.data);
    });
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products/freeProduct/get");
        setfreeProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    resetFilter();
  }, []);

  return (
    <div>
      <SliderBanner />
      <HomeCategory />

      {productList && (
        <ProductListContainer
          header="Gợi ý cho bạn hôm nay"
          productList={productList}
          uniqueId="1"
        />
      )}

      {productList && (
        <ProductListContainer
          header={`Sản phẩm nổi bật: Laptop`}
          productList={productOutstanding1}
          uniqueId="2"
          canSeeAll
          categorySlug="laptop"
          categoryId={10}
        />
      )}
      {productList && (
        <ProductListContainer
          header={`Sản phẩm nổi bật: Sách`}
          productList={productOutstanding2}
          uniqueId="3"
          canSeeAll
          categorySlug="sach"
          categoryId={2}
          freeCost={false}
        />
      )}
      {freeProducts && (
        <ProductListContainer
          header="Đồ miễn phí"
          productList={freeProducts}
          uniqueId="4"
          canSeeAll
          categorySlug="mua-ban-do-cu"
          categoryId={1}
          freeCost={true}
        />
      )}
    </div>
  );
};

export default HomePage;
