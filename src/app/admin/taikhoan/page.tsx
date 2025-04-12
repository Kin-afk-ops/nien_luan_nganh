'use client';

import axiosInstance from '@/helpers/api/config';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Loading from "@/components/loading/Loading";
import { InfoUserInterface } from '@/interfaces/infoUser';

const getUser = async () => {
  try {
    const [userResponse, infoResponse] = await Promise.all([
      axiosInstance.get("/user"),
      axiosInstance.get("/infouser"),
    ]);

    const users = userResponse.data;
    const infos = infoResponse.data;

    const merged = users.map((user: any) => {
      const matchedInfo = infos.find((info: any) => info.userId === user._id);
      return {
        ...user,
        info: matchedInfo || {},
      };
    });

    return merged;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export default function UserManagement() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userList, setUserList] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getUser();
        setUserList(data);
      } catch (err) {
        setError("Không thể tải dữ liệu tài khoản. Vui lòng thử lại sau.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserData();
  }, [refresh]);

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const handleRemoveUser = async (id: string) => {
    try {
      await axiosInstance.delete("/user/" + id);
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
            QUẢN LÝ TÀI KHOẢN <i className="fas fa-user ml-2"></i>
          </h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" width="100%" cellSpacing="0">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên người dùng</th>
                  <th>Email</th>
                  <th>SĐT</th>
                  <th>Mã phân quyền</th>
                  <th>Thay đổi</th>
                </tr>
              </thead>
              <tbody>
                {userList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center">
                      Không có dữ liệu người dùng.
                    </td>
                  </tr>
                ) : (
                  userList.map((user: any, index: number) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.info?.name || "Chưa có tên"}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.role}</td>
                      <td>
                        <Link href={`/admin/taikhoan/suataikhoan/${user._id}`}>
                          <button className="btn btn-warning btn-sm mr-2">Sửa</button>
                        </Link>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRemoveUser(user._id)}
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
        </div>
      </div>

      <div className="card shadow">
        <div className="card-header">
          <h5 className="card-title m-0">Tùy chỉnh:</h5>
        </div>
        <div className="card-body">
          <Link href="/admin/taikhoan/themtaikhoan">
            <button className="btn btn-info">Thêm Tài khoản</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
