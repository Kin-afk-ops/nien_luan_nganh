"use client";
import { useState, useRef } from "react";
import "./page.css";
import formatDate from "@/helpers/format/formattedDate";
import formatDateToInput from "@/helpers/format/formatDateToInput";
import CategoriesBlock from "@/components/categoriesBlock/CategoriesBlock";

const AddProductPage = () => {
  const [dateValue, setDateValue] = useState<string>("");
  const [displayCategories, setDisplayCategories] = useState<boolean>(false);
  const dateRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <h3 className="profile__header">Tất cả sản phẩm</h3>
      <div className="main-container profile__product--filler ">
        <div className="profile__product--filler-wrap">
          <input type="text" placeholder="Nhập từ khoá ở đây" />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="profile__product--filler-wrap">
          <div
            className="profile__product--filler-categories"
            onClick={() => setDisplayCategories(true)}
          >
            Danh mục
            <i className="fa-solid fa-angle-down"></i>
          </div>
          {displayCategories && (
            <CategoriesBlock setDisplayCategories={setDisplayCategories} />
          )}
        </div>
        <div className="profile__product--filler-wrap">
          <label
            htmlFor="profile__product--date"
            onClick={() => {
              if (dateRef.current) {
                dateRef.current.showPicker(); // Mở trình chọn ngày
              }
            }}
          >
            {dateValue === "" ? "Chọn ngày" : dateValue}
            <i className="fa-regular fa-calendar"></i>
          </label>
          <input
            type="date"
            name=""
            value={dateValue}
            onChange={(e) => setDateValue(formatDate(e.target.value))}
            id="profile__product--date"
            ref={dateRef}
            placeholder="Chọn ngày"
          />
        </div>
        <div className="profile__product--filler-wrap">
          <select name="" id="">
            <option value="">Trạng thái</option>
            <option value="">Đang đăng bán</option>
            <option value="">Đã bán</option>
          </select>
        </div>
        <button className="secondary-btn">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </>
  );
};

export default AddProductPage;
