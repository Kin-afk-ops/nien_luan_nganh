'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axiosInstance from '@/helpers/api/config';

export type User = {
  email: string;
  phone: string;
  password: string;
};

export const editUser = async (user: User, id: string) => {
  try {
    const response = await axiosInstance.put('/user/' + id, user);
    return response.data;
  } catch (error) {
    console.error('❌ Lỗi khi cập nhật user:', error);
    throw error;
  }
};

export default function SuaTaiKhoan() {
  const { id } = useParams();
  const [formData, setFormData] = useState<User>({
    email: '',
    phone: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  // Lấy dữ liệu user hiện tại từ server
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get('/user/' + id);
        setFormData({
          email: res.data.email || '',
          phone: res.data.phone || '',
          password: '', // Không show mật khẩu ra ngoài
        });
      } catch (err) {
        console.error('❌ Lỗi khi lấy dữ liệu user:', err);
        setMessage('❌ Không thể tải dữ liệu tài khoản.');
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await editUser(formData, id as string);
      console.log("✅ Phản hồi từ server:", res);

      setMessage('✅ Tài khoản được cập nhật thành công!');
      // Giữ lại formData nếu muốn
    } catch (err: any) {
      console.error("❌ Lỗi khi gửi dữ liệu:", err);
      setMessage('❌ Lỗi cập nhật tài khoản.');
    }
  };

  return (
    <div className="card shadow mb-4 mt-4">
      <div className="card-header py-3">
        <h4 className="m-0 font-weight-bold text-primary" style={{ marginTop: '10px' }}>
          <strong>CHỈNH SỬA TÀI KHOẢN</strong>&ensp;
          <i className="fas fa-user"></i>
        </h4>
      </div>

      <div className="card-body">
        <div className="table-responsive">
          <form onSubmit={handleSubmit}>
            <div className="form-outline mb-4">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">Số điện thoại</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">Mật khẩu mới</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">Lưu</button>
            &nbsp;
            <a href="/admin/taikhoan" className="btn btn-info">Quay lại</a>

            {message && <div className="alert alert-info mt-3">{message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
