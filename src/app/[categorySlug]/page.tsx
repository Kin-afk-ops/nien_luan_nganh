"use client";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { categoryModel } from "@/models/CategoryModel";
import { ProductModel } from "@/models/ProductModel";
import "./categoryStyle.css";
import BreadcrumbComponent from "@/components/Breadcrumb/BreadcrumbComponent";
import { FillerProductModel } from "@/models/FillerProductModel";
import sortValue from "@/models/sortValue";
import ProductCard from "@/components/HomeProducts/ProductCard";
import { DiVim } from "react-icons/di";
import axios from "axios";
import axiosInstance from "@/helpers/api/config";
import SortBarComponent from "@/components/DropDownComponent/SortBarComponent";
import FilterListComponent from "@/components/filterComponent/FilterListComponent";
import {useGlobalState} from '../../data/stateStore';
import { priceData, statusData, clothSize } from '../../data/sortData';
import PaginationComponent from "@/components/PaginationComponent/PaginationComponent";


const FillerProductByCategory = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { categorySlug } = useParams();
  const [category, setCategory] = useState<categoryModel>();
  const [data, setData] = useState<FillerProductModel>();
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || 0);
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || 1000000000);
  const [status, setStatus] = useState(searchParams.get("status") || "all");
  const limit = 8; // Số sản phẩm tối đa trong 1 lần tải trang
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [isFreeShip, setFreeShip] = useState(searchParams.get("isFreeShip") || "");
  const [freeCost, setfreeCost] = useState(searchParams.get("freeCost") || "");
  const {filterList, setFilter} = useGlobalState();
  const [search, setsearch] = useState(searchParams.get("search") || "");


  
  useEffect(() => {
    const fetchCategory = async () => {
      const res = await axiosInstance(`/categories/${categorySlug}`);
      setCategory(res.data);
    };
    fetchCategory();
  }, [categorySlug]);

  

  useEffect(() => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sort: sort,
      minPrice: minPrice.toString(),
      maxPrice: maxPrice.toString(),
      conditions: status,
      search: filterList['search'] || "",
  });
    // Thêm các bộ lọc từ filterList (ngoại trừ minPrice, maxPrice, conditions)
    Object.entries(filterList).forEach(([key, value]) => {
        if (value && !["price", "status"].includes(key)) {
          queryParams.set(key, value.toString());
        }
    });

    console.log("Đây là seach",filterList['search']);

    const fetchData = async () => {
        try {
            const res = await axiosInstance.get(
                `/categories/products/${category?.id}?${queryParams.toString()}`
            );
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    fetchData();
}, [category?.id, page, sort, minPrice, maxPrice, status, filterList]);


  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const priceRange = priceData.find(p => p.label === filterList.price);

    if (priceRange) {
        const min = priceRange.minValue || 0;
        const max = priceRange.maxValue || 1000000000;
        
        setMinPrice(min);
        setMaxPrice(max);

        // Cập nhật URL với minPrice và maxPrice nếu tồn tại
        if (priceRange.minValue) {
            query.set("minPrice", String(min));
        } else {
            query.delete("minPrice");
        }

        if (priceRange.maxValue) {
            query.set("maxPrice", String(max));
        } else {
            query.delete("maxPrice");
        }

    } else {
        // Nếu filterList.price bị reset, xóa cả minPrice và maxPrice khỏi URL
        setMinPrice(0);
        setMaxPrice(1000000000);
        query.delete("minPrice");
        query.delete("maxPrice");
    }

    router.push(`?${query.toString()}`);
}, [filterList.price]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const statusValue = statusData.find(s => s.label === filterList.status);

    if (statusValue) {
        setStatus(statusValue.value);
        query.set("conditions", statusValue.value);
    } else {
        setStatus("all");
        query.delete("conditions");
    }

    router.push(`?${query.toString()}`);
    }, [filterList.status]);

    useEffect(() => {
      const query = new URLSearchParams(window.location.search);
      if(filterList.isFreeShip) {
        setFreeShip(filterList.isFreeShip);
        query.set("isFreeShip", filterList.isFreeShip);
      }else {
        setFreeShip("");
        query.delete("isFreeShip");
      }

      router.push(`?${query.toString()}`);
    },[filterList.isFreeShip])




  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value;
    setSort(selectedSort);
    router.push(`?sort=${selectedSort}`);
  };

  

  return (
    <div style={{ backgroundColor: "white" }}>
      <div className="page_container">
        <BreadcrumbComponent id={category?.id ?? 0}></BreadcrumbComponent>
        <div className="list_container">
          <aside>
            <SortBarComponent categoryId={category?.id}></SortBarComponent>
          </aside>
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
            <FilterListComponent></FilterListComponent>
            <div className="product_list">
              {data?.products ? (
                data.products.map((product, index) => (
                  <ProductCard product={product} key={index}></ProductCard>
                ))
              ) : (
                <div></div>
              )}
            </div>
            <div className="pagination">
              <PaginationComponent currentPage={page} totalPages={data?.totalPages ?? 0} onPageChange={setPage}></PaginationComponent>
              
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default FillerProductByCategory;
