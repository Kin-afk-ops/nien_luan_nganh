"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { categoryModel } from "@/models/CategoryModel";
import { ProductModel } from "@/models/ProductModel";
import "./style.css";
import BreadcrumbComponent from "@/components/Breadcrumb/BreadcrumbComponent";
import { FillerProductModel } from "@/models/FillerProductModel";
import sortValue from "@/models/sortValue";
import ProductCard from "@/components/HomeProducts/ProductCard";
import { DiVim } from "react-icons/di";

const FillerProductByCategory = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { categorySlug } = useParams();
  const [category, setCategory] = useState<categoryModel>();
  const [data, setData] = useState<FillerProductModel>();
  const [page, setPage] = useState(1);
  const limit = 48; // Số sản phẩm tối đa trong 1 lần tải trang
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetch(
        `http://localhost:8000/api/categories/${categorySlug}`
      );
      const data = await res.json();
      setCategory(data);
    };
    fetchCategory();
  }, [categorySlug]);

  useEffect(() => {
    const fectchData = () => {
      fetch(
        `http://localhost:8000/api/categories/products/${category?.id}?page=${page}&limit=${limit}&sort=${sort}`
      )
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.log(err));
    };
    fectchData();
  }, [category?.id, page, sort]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectdSort = e.target.value;
    setSort(selectdSort);
    router.push(`?sort=${selectdSort}`);
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <div className="page_container">
        <BreadcrumbComponent id={category?.id ?? 0}></BreadcrumbComponent>
        <div className="list_container">
          <aside></aside>
          <main>
            <div className="header">
              <div className="category_name">
                <h2 style={{ alignItems: "center" }}>{category?.name}</h2>
                <p>{`(${data?.totalProducts ?? ""} sản phẩm)`}</p>
              </div>
              <div className="select">
                <label htmlFor="sort_product">Lọc theo: </label>
                <select
                  name="Lọc sản phẩm"
                  id="sort_product"
                  value={sort}
                  onChange={handleSortChange}
                  className="select_box"
                >
                  {sortValue.map((value, index) => (
                    <option key={index} value={value.value}>
                      {value.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="product_list">
              {data?.products ? (
                data.products.map((product) => (
                  <ProductCard product={product} key={product.id}></ProductCard>
                ))
              ) : (
                <div></div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default FillerProductByCategory;
