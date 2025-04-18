"use client";

import axiosInstance from "@/helpers/api/config";
import products from "@/models/ProductModel";
import Link from "next/link";
import { useEffect, useState } from "react";

const getProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};

export default function SanPham() {
  const [productList, setProductList] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const [refresh, setRefresh] = useState(false);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productList.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(productList.length / productsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        // Lọc chỉ các sản phẩm chưa được duyệt
        const unapprovedProducts = data.filter(
          (product: any) => product.approve === false
        );
        setProductList(unapprovedProducts);
      } catch (err) {
        console.error("❌ Lỗi khi lấy dữ liệu sản phẩm:", err);
        setMessage("❌ Không thể tải dữ liệu sản phẩm.");
      }
    };

    fetchProducts();
  }, [refresh]);

  const handleRemoveProduct = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) return;

    try {
      await axiosInstance.delete("/products/" + id);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h4 className="m-0 font-weight-bold text-primary">
            XÉT DUYỆT ĐƠN HÀNG <i className="fas fa-cart-arrow-down ml-2"></i>
          </h4>
        </div>
        <div className="card-body">
          {message && <div className="alert alert-danger">{message}</div>}
          <div className="table-responsive">
            <table className="table table-bordered" width="100%" cellSpacing="0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên Sản Phẩm</th>
                  <th>Danh Mục</th>
                  <th>Tình Trạng</th>
                  <th>Số Lượng</th>
                  <th>Đơn giá</th>
                  <th>Thay đổi</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center">
                      Không có sản phẩm nào.
                    </td>
                  </tr>
                ) : (
                  currentProducts.map((product: any, index: number) => (
                    <tr key={product._id}>
                      <td>{indexOfFirstProduct + index + 1}</td>
                      <td>{product.name}</td>
                      <td>{product.categories?.name || "Không rõ"}</td>
                      <td>{product.condition || "Không rõ"}</td>
                      <td>{product.quantity}</td>
                      <td>{product.price?.toLocaleString()} VND</td>
                      <td>
                        <Link href={`/admin/donhang/chitiet/${product._id}`}>
                          <button className="btn btn-success btn-sm mr-2">
                            Xem chi tiết
                          </button>
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRemoveProduct(product._id)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <nav>
                <ul className="pagination">
                  {/* Trang đầu */}
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => handlePageChange(1)}>
                      «
                    </button>
                  </li>

                  {/* Trang trước */}
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      ‹
                    </button>
                  </li>

                  {/* Các số trang */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNumber) => (
                      <li
                        key={pageNumber}
                        className={`page-item ${currentPage === pageNumber ? "active" : ""}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      </li>
                    )
                  )}

                  {/* Trang sau */}
                  <li
                    className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      ›
                    </button>
                  </li>

                  {/* Trang cuối */}
                  <li
                    className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(totalPages)}
                    >
                      »
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
