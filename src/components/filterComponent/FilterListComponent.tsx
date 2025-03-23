import React from "react";
import { useGlobalState } from "../../data/stateStore";
import { FaXmark } from "react-icons/fa6";
import "./filterList.css";

const FilterListComponent = () => {
  const { filterList, removeFilter, resetFilter, setIsResetFilterList } = useGlobalState();

  // Lọc ra các bộ lọc hợp lệ (không rỗng, không undefined)
  const activeFilters = Object.entries(filterList).filter(([_, value]) => value);

  return (
    <div className="filter_container">
      {activeFilters.length > 0 ? (
        <>
          {/* Hiển thị tất cả các bộ lọc */}
          {activeFilters.map(([key, value]) => (
            <div className="filter_item" key={key}>
              <p>
                {value === 'freeship' ? 'Miễn phí vận chuyển' : value}
              </p>
              <FaXmark onClick={() => removeFilter(key)} className="filter_icon" />
            </div>
          ))}

          {/* Nút Xóa tất cả */}
          <p
            className="remove_all"
            onClick={() => {
              resetFilter();
              setIsResetFilterList();
            }}
          >
            Xoá tất cả
          </p>
        </>
      ) : (
        <p className="no_filter">Không có bộ lọc nào</p>
      )}
    </div>
  );
};

export default FilterListComponent;
