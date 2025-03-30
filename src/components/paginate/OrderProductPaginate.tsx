"use client";

import ReactPaginate from "react-paginate";
import "./paginate.css";

interface ChildProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number | null;
}

const OrderProductPaginate: React.FC<ChildProps> = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected + 1);
  };
  return (
    <div className="pagination">
      {totalPages && (
        <ReactPaginate
          onPageChange={handlePageClick}
          className="paginationPage"
          previousLabel="<"
          nextLabel=">"
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          forcePage={currentPage - 1}
          previousClassName="prev"
          nextClassName="next"
          activeClassName="active"
        />
      )}
    </div>
  );
};

export default OrderProductPaginate;
