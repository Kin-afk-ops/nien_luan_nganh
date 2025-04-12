"use client";
import axiosInstance from "@/helpers/api/config";
import { LoginUser } from "@/interfaces/loginUser";
import { RootState } from "@/lib/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TestPage = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const [users, setUsers] = useState<LoginUser[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/user"); // Cập nhật đường dẫn API của bạn
        setUsers(res.data); // Giả sử API trả về danh sách người dùng
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, []);
  return (
    <div>
      {user && (
        <div>
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                <span>Email:</span> {user.email} | <span>Phone:</span>{" "}
                {user.phone}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TestPage;
