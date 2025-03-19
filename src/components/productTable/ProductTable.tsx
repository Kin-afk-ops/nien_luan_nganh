"use client";
import { useEffect, useState } from "react";
import "./productTable.css";
import { ProductInterface } from "@/interfaces/product";
import axiosInstance from "@/helpers/api/config";
import formatDate from "@/helpers/format/formattedDate";

interface ChildProps {
  userId: string | null;
}

const ProductTable: React.FC<ChildProps> = ({ userId }) => {
  const [products, setProducts] = useState<ProductInterface[] | null>(null);

  useEffect(() => {
    const getProduct = async (): Promise<void> => {
      if (userId) {
        try {
          const res = await axiosInstance.get(`/product/${userId}`);
          setProducts(res.data);
          console.log(res.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("chua dang nhap");
      }
    };

    getProduct();
  }, [userId]);

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
          {products?.map((p, index) => (
            <tr key={p._id}>
              <td>{index + 1}</td>
              <td>{p.name}</td>
              <td>{p.categories?.name || "N/A"}</td>

              <td>{p?.updatedAt ? formatDate(p.updatedAt) : "N/A"}</td>

              <td>wow</td>
              <td>
                <button>Sửa</button>
                <button>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
