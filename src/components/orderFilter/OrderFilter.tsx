"use client";

import { useState } from "react";
import "./orderFilter.css";
import "./responsive.css";
import axiosInstance from "@/helpers/api/config";
import { OrderProductInterface } from "@/interfaces/orderProduct";

interface ChildProps {
  filterMode: string;
  setFilterMode: React.Dispatch<React.SetStateAction<string>>;
  filterModeLoading: boolean;
  setFilterModeLoading: React.Dispatch<React.SetStateAction<boolean>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  userId: string | null;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number | null>>;
  setTotalItems: React.Dispatch<React.SetStateAction<number>>;
  setOrderProduct: React.Dispatch<
    React.SetStateAction<OrderProductInterface[] | null>
  >;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderFilter: React.FC<ChildProps> = ({
  filterMode,
  setFilterMode,
  filterModeLoading,
  setFilterModeLoading,
  searchValue,
  setSearchValue,
  userId,
  currentPage,
  setCurrentPage,
  setTotalPages,
  setTotalItems,
  setOrderProduct,
  setLoading,
}) => {
  const handleSearch = async (): Promise<void> => {
    if (userId && searchValue !== "") {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `/order/search/${userId}?page=${currentPage}&limit=10&status=${filterMode}&searchValue=${searchValue}`
        );

        setTotalPages(res.data.totalPages);

        setOrderProduct(res.data.data);
        setTotalItems(res.data.totalItems);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="main-container order__filter">
      <div className="order__filter-top">
        <div
          className={filterMode === "Tất cả" ? "order__filter--active" : ""}
          onClick={() => {
            setFilterMode("Tất cả");
            setTotalItems(0);
            setFilterModeLoading(!filterModeLoading);
          }}
        >
          Tất cả
        </div>

        <div
          className={
            filterMode === "Đang chuẩn bị hàng" ? "order__filter--active" : ""
          }
          onClick={() => {
            setFilterMode("Đang chuẩn bị hàng");
            setTotalItems(0);
            setFilterModeLoading(!filterModeLoading);
          }}
        >
          Đang chuẩn bị hàng
        </div>

        <div
          className={
            filterMode === "Đang giao hàng" ? "order__filter--active" : ""
          }
          onClick={() => {
            setFilterMode("Đang giao hàng");
            setTotalItems(0);
            setFilterModeLoading(!filterModeLoading);
          }}
        >
          Đang giao hàng
        </div>
        <div
          className={filterMode === "Đơn bị hủy" ? "order__filter--active" : ""}
          onClick={() => {
            setFilterMode("Đơn bị hủy");
            setTotalItems(0);
            setFilterModeLoading(!filterModeLoading);
          }}
        >
          Đơn bị hủy
        </div>
        <div
          className={filterMode === "Hoàn thành" ? "order__filter--active" : ""}
          onClick={() => {
            setFilterMode("Hoàn thành");
            setTotalItems(0);
            setFilterModeLoading(!filterModeLoading);
          }}
        >
          Hoàn thành
        </div>
      </div>

      <div className="order__filter--search">
        <input
          type="text"
          placeholder="Nhập tên sản phẩm hoặc người bán hàng"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <button
          className="secondary-btn order__filter--search-btn"
          onClick={() => {
            setCurrentPage(1);
            setTotalItems(0);
            setTotalPages(null);
            setOrderProduct(null);
            handleSearch();
          }}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>
  );
};

export default OrderFilter;
