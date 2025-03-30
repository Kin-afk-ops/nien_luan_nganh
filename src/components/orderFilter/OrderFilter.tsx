"use client";

import { useState } from "react";
import "./orderFilter.css";
import "./responsive.css";
import axiosInstance from "@/helpers/api/config";

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
}) => {
  const handleSearch = async (): Promise<void> => {
    try {
      const res = await axiosInstance.get(
        `/order/search?page=${currentPage}&limit=10&status=${filterMode}&searchValue=${searchValue}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-container order__filter">
      <div className="order__filter-top">
        <div
          className={filterMode === "Tất cả" ? "order__filter--active" : ""}
          onClick={() => {
            setFilterMode("Tất cả");
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
            setFilterModeLoading(!filterModeLoading);
          }}
        >
          Đang giao hàng
        </div>
        <div
          className={filterMode === "Đơn bị hủy" ? "order__filter--active" : ""}
          onClick={() => {
            setFilterMode("Đơn bị hủy");
            setFilterModeLoading(!filterModeLoading);
          }}
        >
          Đơn bị hủy
        </div>
        <div
          className={filterMode === "Hoàn thành" ? "order__filter--active" : ""}
          onClick={() => {
            setFilterMode("Hoàn thành");
            setFilterModeLoading(!filterModeLoading);
          }}
        >
          Hoàn thành
        </div>
      </div>

      {/* <div className="order__filter--search">
        <input
          type="text"
          placeholder="Nhập từ khóa ở đây"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          className="secondary-btn order__filter--search-btn"
          onClick={() => {
            setCurrentPage(1);
            setTotalItems(0);
            setTotalPages(null);
            handleSearch();
          }}
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div> */}
    </div>
  );
};

export default OrderFilter;
