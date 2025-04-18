"use client";
import { useState, useRef, useEffect } from "react";
import "./page.css";
import "./responsive.css";
import formatDate from "@/helpers/format/formattedDate";
import formatDateToInput from "@/helpers/format/formatDateToInput";
import CategoriesBlock from "@/components/categoriesBlock/CategoriesBlock";
import ProductTable from "@/components/productTable/ProductTable";
import { useSelector } from "react-redux";
import { RootState } from "@/hooks/useAppDispatch";
import { CategoriesInterface } from "@/interfaces/categories";
import axiosInstance from "@/helpers/api/config";

const AddProductPage = () => {
  const user =
    useSelector((state: RootState) => state.user.currentUser) || null;
  const [userId, setUserId] = useState<string | null>(null);
  const [dateValue, setDateValue] = useState<string>("");
  const [displayCategories, setDisplayCategories] = useState<boolean>(false);
  const dateRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<CategoriesInterface[] | null>(
    null
  );
  const [cateLabel, setCateLabel] = useState<CategoriesInterface | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchMode, setSearchMode] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setUserId(user._id);
    }

    const getCategories = async (): Promise<void> => {
      try {
        const res = await axiosInstance.get("/category/getallCategories");
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, [user]);

  return (
    <>
      <h3 className="profile__header">Tất cả sản phẩm</h3>
      <div className="main-container profile__product--filler s-0">
        <div className="profile__product--filler-wrap">
          <input
            type="text"
            placeholder="Nhập từ khoá ở đây"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Ngăn hành động mặc định (nếu có)
                setSearchMode(true);
              }
            }}
          />
        </div>

        <button className="secondary-btn" onClick={() => setSearchMode(true)}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <div className="profile__product--filler-wrap">
          <div
            className="profile__product--filler-categories"
            onClick={() => setDisplayCategories(true)}
          >
            {cateLabel ? cateLabel.name : "Danh mục"}
            <i className="fa-solid fa-angle-down"></i>
          </div>
          {displayCategories && (
            <CategoriesBlock
              setDisplayCategories={setDisplayCategories}
              categories={categories}
              setCateLabel={setCateLabel}
              setSearchMode={setSearchMode}
            />
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
            {dateValue === "" ? "Chọn ngày" : formatDate(dateValue)}
            <i className="fa-regular fa-calendar"></i>
          </label>
          <input
            type="date"
            name=""
            value={dateValue}
            onChange={(e) => {
              setDateValue(e.target.value);
              setSearchMode(true);
            }}
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
      </div>

      <div className="main-container profile__product--filler mobile l-0 m-0">
        <div className="profile__product--filler-wrap">
          <input
            type="text"
            placeholder="Nhập từ khoá ở đây"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault(); // Ngăn hành động mặc định (nếu có)
                setSearchMode(true);
              }
            }}
          />
          <button className="secondary-btn" onClick={() => setSearchMode(true)}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <div className="profile__product--filler-wrap">
          <div
            className="profile__product--filler-categories"
            onClick={() => setDisplayCategories(true)}
          >
            {cateLabel ? cateLabel.name : "Danh mục"}
            <i className="fa-solid fa-angle-down"></i>
          </div>
          {displayCategories && (
            <CategoriesBlock
              setDisplayCategories={setDisplayCategories}
              categories={categories}
              setCateLabel={setCateLabel}
              setSearchMode={setSearchMode}
            />
          )}
          <select name="" id="">
            <option value="">Trạng thái</option>
            <option value="">Đang đăng bán</option>
            <option value="">Đã bán</option>
          </select>
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
            {dateValue === "" ? "Chọn ngày" : formatDate(dateValue)}
            <i className="fa-regular fa-calendar profile__product--date-icon"></i>
          </label>
          <input
            type="date"
            name=""
            value={dateValue}
            onChange={(e) => {
              setDateValue(e.target.value);
              setSearchMode(true);
            }}
            id="profile__product--date"
            ref={dateRef}
            placeholder="Chọn ngày"
          />
        </div>
        <div className="profile__product--filler-wrap"></div>
      </div>
      <ProductTable
        userId={userId}
        cateLabelId={cateLabel ? cateLabel?.id : ""}
        searchMode={searchMode}
        searchValue={searchValue}
        setSearchMode={setSearchMode}
        dateValue={dateValue}
      />
    </>
  );
};

export default AddProductPage;
