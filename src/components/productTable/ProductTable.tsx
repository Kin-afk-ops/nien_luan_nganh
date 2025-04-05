"use client";
import { useEffect, useState } from "react";
import "./productTable.css";
import "./responsive.css";
import { ProductInterface } from "@/interfaces/product";
import axiosInstance from "@/helpers/api/config";
import formatDate from "@/helpers/format/formattedDate";

interface ChildProps {
  userId: string | null;
  cateLabelId: string | null;
  searchMode: boolean;
  searchValue: string;
  setSearchMode: React.Dispatch<React.SetStateAction<boolean>>;
  dateValue: string;
}

const ProductTable: React.FC<ChildProps> = ({
  userId,
  cateLabelId,
  searchMode,
  searchValue,
  setSearchMode,
  dateValue,
}) => {
  const [products, setProducts] = useState<ProductInterface[] | null>(null);

  useEffect(() => {
    console.log(searchValue);

    const getProducts = async (): Promise<void> => {
      if (userId) {
        await axiosInstance
          .get(`/product/seller/${userId}`)
          .then((res) => {
            setProducts(res.data);

            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);

            setProducts(null);
          });
      } else {
        console.log("chua dang nhap");
      }
    };

    const getProductBySearchMode = async (): Promise<void> => {
      console.log(userId);

      if (userId) {
        await axiosInstance
          .get(
            `/product/search?searchValue=${encodeURIComponent(
              searchValue
            )}&cateValue=${cateLabelId?.toString()}&dateValue=${dateValue.toString()}`
          )
          .then((res) => {
            setProducts(res.data);
          })
          .catch((error) => {
            console.log(error);

            setProducts(null);
          });
      } else {
        console.log("chua dang nhap");
      }
    };

    if (searchMode) {
      getProductBySearchMode();
    } else {
      getProducts();
    }
  }, [userId, searchMode, searchValue, setSearchMode, cateLabelId, dateValue]);

  return (
    <div className="main-container product__table--container">
      <table className="product__table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên sản phẩm</th>
            <th>Danh mục</th>
            <th>Ngày bán</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products !== null ? (
            products?.map((p, index) => (
              <tr key={p._id}>
                <td>{index + 1}</td>
                <td className="product__table--name">{p.name}</td>
                <td>{p.categories?.name || "N/A"}</td>

                <td>{p?.updatedAt ? formatDate(p?.updatedAt) : "N/A"}</td>

                <td>{p.condition}</td>
                <td>
                  <button>Sửa</button>
                  <button>Xóa</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
