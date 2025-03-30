import React from 'react'
import "./paginationStyle.css"

interface Props {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const PaginationComponent = (props: Props) => {

    const { totalPages, currentPage, onPageChange } = props;

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 3; // Luôn hiển thị 1, 2, 3 ít nhất
      
        // Luôn hiển thị trang 1
        pages.push(1);
      
        // Nếu trang hiện tại <= 3, hiển thị luôn 1, 2, 3
        if (currentPage <= 3) {
          for (let i = 2; i <= Math.min(3, totalPages); i++) {
            pages.push(i);
          }
        } else {
          // Nếu trang >= 4, thêm "..." trước trang hiện tại
          pages.push("...");
          for (let i = currentPage - 1; i <= Math.min(totalPages, currentPage + 1); i++) {
            pages.push(i);
          }
        }
      
        // Nếu chưa đến trang cuối, hiển thị "..." và trang cuối
        if (currentPage < totalPages - 1) {
          pages.push("...");
          pages.push(totalPages);
        }
      
        return pages;
      };

      const handleChangePage = (newPage: number) => {
        onPageChange(newPage);
        window.scrollTo({top: 0, behavior: "smooth"});
      }
      

  return (
    <div className="pagination">
    {/* Nút Previous */}
    <button
        className={`page-btn ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => handleChangePage(currentPage - 1)}
        disabled={currentPage === 1}
    >
        &lt;
    </button>

    {/* Hiển thị các số trang */}
    {renderPageNumbers().map((page, index) =>
        page === "..." ? (
        <span key={index} className="page-dots">...</span>
        ) : (
        <button
            key={index}
            className={`page-btn ${currentPage === page ? "active" : ""}`}
            onClick={() => handleChangePage(Number(page))}
        >
            {page}
        </button>
        )
    )}

    {/* Nút Next */}
    <button
        className={`page-btn ${currentPage === totalPages ? "disabled" : ""}`}
        onClick={() => handleChangePage(currentPage + 1)}
        disabled={currentPage === totalPages}
    >
        &gt;
    </button>
    </div>

  )
}

export default PaginationComponent