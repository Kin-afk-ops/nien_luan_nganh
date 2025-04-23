"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/helpers/api/config";
import { FaCalendar, FaClipboardList } from "react-icons/fa";

// API call
const getProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};

const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

const getCategories = async () => {
  try {
    const response = await axiosInstance.get("/category/getallCateAttr");
    return response.data;
  } catch (error) {
    console.error("Error fetching category data:", error);
    throw error;
  }
};

export default function Dashboard() {
  const [approvedProductCount, setApprovedProductCount] = useState<number>(0);
  const [pendingProductCount, setPendingProductCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  const [categoryCount, setCategoryCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, users, categories] = await Promise.all([
          getProducts(),
          getUsers(),
          getCategories(),
        ]);

        // Handle product count based on "approve"
        const productData = Array.isArray(products)
          ? products
          : products.data || [];
        const approved = productData.filter(
          (p: any) => p.approve === true
        ).length;
        const pending = productData.filter(
          (p: any) => p.approve === false
        ).length;
        setApprovedProductCount(approved);
        setPendingProductCount(pending);

        // Other counts
        const userData = Array.isArray(users) ? users : users.data || [];
        const categoryData = Array.isArray(categories)
          ? categories
          : categories.data || [];
        setUserCount(userData.length);
        setCategoryCount(categoryData.length);
      } catch (error) {
        setApprovedProductCount(0);
        setPendingProductCount(0);
        setUserCount(0);
        setCategoryCount(0);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container my-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0 fw-bold text-uppercase">Thống kê</h4>
        </div>

        <div className="card-body">
          <div className="row g-4">
            <StatBox
              title="Số người dùng"
              value={userCount}
              icon={<FaCalendar className="fa-2x text-gray-300" />}
              border="primary"
            />
            <StatBox
              title="Số danh mục"
              value={categoryCount}
              icon={<FaCalendar className="fa-2x text-gray-300" />}
              border="primary"
            />
            <StatBox
              title="Số sản phẩm"
              value={approvedProductCount}
              icon={<FaClipboardList className="fa-2x text-gray-300" />}
              border="info"
            />
            <StatBox
              title="Số yêu cầu đăng bán"
              value={pendingProductCount}
              icon={<FaClipboardList className="fa-2x text-gray-300" />}
              border="warning"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Component hiển thị từng ô thống kê
type StatBoxProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  border: "success" | "primary" | "info" | "warning";
};

function StatBox({ title, value, icon, border }: StatBoxProps) {
  return (
    <div className="col-xl-3 col-md-6">
      <div className={`card border-start border-${border} shadow-sm h-100`}>
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <div
              className={`text-muted text-uppercase small fw-bold text-${border}`}
            >
              {title}
            </div>
            <div className="h5 fw-bold text-dark">{value}</div>
          </div>
          <div className="text-end text-gray-300">{icon}</div>
        </div>
      </div>
    </div>
  );
}
