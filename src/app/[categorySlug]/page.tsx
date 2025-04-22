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
import { useIsMobile } from "@/hooks/useIsMobile";
import { FaList } from "react-icons/fa";
import { Sheet } from "react-modal-sheet";
import BottomSheetModalComponent from "@/components/BottomSheetComponent/BottomSheetModalComponent";


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
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile();


  
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


//   useEffect(() => {
//     const query = new URLSearchParams(window.location.search);
//     const priceRange = priceData.find(p => p.label === filterList.price);

//     if (priceRange) {
//         const min = priceRange.minValue || 0;
//         const max = priceRange.maxValue || 1000000000;
        
//         setMinPrice(min);
//         setMaxPrice(max);

//         // Cập nhật URL với minPrice và maxPrice nếu tồn tại
//         if (priceRange.minValue) {
//             query.set("minPrice", String(min));
//         } else {
//             query.delete("minPrice");
//         }

//         if (priceRange.maxValue) {
//             query.set("maxPrice", String(max));
//         } else {
//             query.delete("maxPrice");
//         }

//     } else {
//         // Nếu filterList.price bị reset, xóa cả minPrice và maxPrice khỏi URL
//         setMinPrice(0);
//         setMaxPrice(1000000000);
//         query.delete("minPrice");
//         query.delete("maxPrice");
//     }

//     router.push(`?${query.toString()}`);
// }, [filterList.price]);

//   useEffect(() => {
//     const query = new URLSearchParams(window.location.search);
//     const statusValue = statusData.find(s => s.label === filterList.status);

//     if (statusValue) {
//         setStatus(statusValue.value);
//         query.set("conditions", statusValue.value);
//     } else {
//         setStatus("all");
//         query.delete("conditions");
//     }

//     router.push(`?${query.toString()}`);
//     }, [filterList.status]);

//     useEffect(() => {
//       const query = new URLSearchParams(window.location.search);
//       if(filterList.isFreeShip) {
//         setFreeShip(filterList.isFreeShip);
//         query.set("isFreeShip", filterList.isFreeShip);
//       }else {
//         setFreeShip("");
//         query.delete("isFreeShip");
//       }

//       router.push(`?${query.toString()}`);
//     },[filterList.isFreeShip]);

    useEffect(() => {
      // Tạo một đối tượng URLSearchParams để xây dựng query string
      const query = new URLSearchParams(window.location.search);
      // Cập nhật giá trị của bộ lọc price
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
        setMinPrice(0);
        setMaxPrice(1000000000);
        query.delete("minPrice");
        query.delete("maxPrice");
      }
      const statusValue = statusData.find(s => s.label === filterList.status);
      if (statusValue) {
        setStatus(statusValue.value);
        query.set("conditions", statusValue.value);
      } else {
        setStatus("all");
        query.delete("conditions");
      }
      // Cập nhật trạng thái bộ lọc isFreeShip
      if (filterList.isFreeShip) {
        setFreeShip(filterList.isFreeShip);
        query.set("isFreeShip", filterList.isFreeShip);
      } else {
        setFreeShip("");
        query.delete("isFreeShip");
      }
      // Thay đổi URL của trang hiện tại với các bộ lọc mới
      router.push(`?${query.toString()}`);
    }, [filterList, router]);
    




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
          <aside className="aside_container">
            <SortBarComponent categoryId={category?.id}></SortBarComponent>
          </aside>
          <main>
            <div className="header">
              <div className="category_name">
                <h2 style={{ alignItems: "center" }}>{category?.name}</h2>
                <p>{`(${data?.totalProducts ?? ""} sản phẩm)`}</p>
              </div>
              <div className="select">
                {!isMobile && <label htmlFor="sort_product">Lọc theo: </label>}
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
              {isMobile && (
              <div className="filter_icon" onClick={() => setIsOpen(true)}>
                <FaList size={24} color="black" />
              </div>
            )}
            </div>
           
                {filterList["search"] && (
                  <div className="search_key_container">
                    <p>Từ khóa tìm kiếm: </p>
                    <p className="search_key">{` "${filterList['search']}"`}</p>
                  </div>
                )}
              
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
        {/* <Sheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
         <Sheet.Container className="sheet_container">
           <Sheet.Header />
           <Sheet.Content>
             <div className="filter_sheet_container">
               <SortBarComponent categoryId={category?.id} />
             </div>
           </Sheet.Content>
         </Sheet.Container>
         <Sheet.Backdrop onTap={() => setIsOpen(false)} />
       </Sheet> */}
       <BottomSheetModalComponent isOpen={isOpen} onClose={() => setIsOpen(false)}>
         <div className="filter_sheet_container">
           <SortBarComponent categoryId={category?.id} />
         </div>
        </BottomSheetModalComponent>
    </div>
  );
};

export default FillerProductByCategory;
