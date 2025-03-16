"use client";
import { useEffect, useState } from "react";
import "./productTable.css";
import { ProductInterface } from "@/interfaces/product";

interface ChildProps {
  userId: string | null;
}

const ProductTable: React.FC<ChildProps> = ({ userId }) => {
  const [product, setProduct] = useState<ProductInterface | null>(null);

    useEffect(()=>{
        const getProduct = async ():Promise<void>
    },[userId])

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
          {/* {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.date}</td>
              <td
                className={
                  product.status === "Đang bán"
                    ? styles.statusActive
                    : styles.statusInactive
                }
              >
                {product.status}
              </td>
              <td>
                <button
                  onClick={() => handleEdit(product.id)}
                  className={styles.editButton}
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className={styles.deleteButton}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))} */}
          <tr>
            <td>1</td>
            <th>hua</th>
            <th>hua</th>
            <th>hua</th>
            <th>hua</th>
            <th>hua</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
