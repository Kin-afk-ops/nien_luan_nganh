'use client';

import { useState } from 'react';
import axiosInstance from "@/helpers/api/config";


export type NewUser = {
    email: string;
    sdt: string;
    password: string;
  };
  
  export const createUser = async (user: NewUser) => {
    try {
      const response = await axiosInstance.post('/user', user);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };


export default function ThemTaiKhoan() {
  const [formData, setFormData] = useState({
    email: '',
    sdt: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    console.log("📤 Gửi dữ liệu:", formData); // Log dữ liệu gửi đi
  
    try {
      const res = await createUser(formData);
      console.log("✅ Phản hồi từ server:", res); // Log phản hồi server
  
      setMessage('✅ Tài khoản được tạo thành công!');
      setFormData({ email: '', sdt: '', password: '' });
    } catch (err: any) {
      console.error("❌ Lỗi khi gửi dữ liệu:", err); // Log lỗi nếu có
      setMessage('❌ Lỗi tạo tài khoản.');
    }
  };

  return (
    <div className="card shadow mb-4 mt-4">
      <div className="card-header py-3">
        <h4 className="m-0 font-weight-bold text-primary" style={{ marginTop: '10px' }}>
          <strong>THÊM TÀI KHOẢN</strong>&ensp;
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
                name="sdt"
                className="form-control"
                value={formData.sdt}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label">Mật khẩu</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">Thêm</button>
            &nbsp;
            <a href="/admin/taikhoan" className="btn btn-info">Quay lại</a>

            {message && <div className="alert alert-info mt-3">{message}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
