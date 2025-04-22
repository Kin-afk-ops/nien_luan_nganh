"use client";

import { CategoryAttribute } from "@/models/attributesModel";
import { categoryModel } from "@/models/CategoryModel";
import { getAllCateAttr, getAllCategories } from "@/utils/addCategory";
import Link from "next/link";
import { useEffect, useState } from "react";
import "./styles.css";

const DanhMuc = () => {
  const [categories, setCategories] = useState<categoryModel[]>([]);
  const [attribute, setAttribute] = useState<CategoryAttribute[]>([]);
  const [isChange, setisChange] = useState(false);
  const [showAll, setShowAll] = useState(false);

useEffect(() => {
        getAllCategories()
            .then(setCategories)
            .catch(error => console.error("Failed to fetch categories:", error));

        getAllCateAttr()
            .then(setAttribute)
            .catch(error => console.error("Failed to fetch attribute:", error));
    }, [isChange]);
    const handleEditCategory = (category: categoryModel) => {
      
    }

  return (
    <div className="container mt-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h4 className="m-0 font-weight-bold text-primary d-flex align-items-center">
            QUẢN LÝ DANH MỤC <i className="fas fa-list ms-2"></i>
          </h4>
        </div>
        <div className="card-body">
          <div className="table-responsive table_container">
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th>ID</th>
                  <th>TÊN DANH MỤC</th>
                  <th>Thay đổi</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>{category.name}</td>
                      <td>
                        <div className="button_group">
                          <Link
                            href={`/admin/quan-ly-danh-muc?id=${category.id}`}
                            className="btn btn-primary"
                          >
                            Chỉnh sửa
                          </Link>
                          <button
                            className="btn btn-warning"
                            onClick={() => {
                              setisChange(!isChange);
                            }}
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center">
                      Không có danh mục nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="card shadow">
        <div className="card-header">
          <h5 className="m-0 font-weight-bold text-primary">Tùy chỉnh:</h5>
        </div>
        <div className="card-body">
          <Link href="/quan-ly-danh-muc" className="btn btn-info">
            Thêm danh mục
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DanhMuc;
