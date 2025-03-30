'use client';

import Link from 'next/link';

export default function UserManagement() {
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
                                    <th>Tên đăng nhập</th>
                                    <th>Mã phân quyền</th>
                                    <th>Thay đổi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Nguyễn Văn A</td>
                                    <td>nguyenvana@example.com</td>
                                    <td>0123456789</td>
                                    <td>nguyenvana</td>
                                    <td>Admin</td>
                                    <td>
                                        <Link href="#">
                                            <button className="btn btn-warning btn-sm mr-2">Sửa</button>
                                        </Link>
                                        <button className="btn btn-danger btn-sm">Xóa</button>
                                    </td>
                                </tr>
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
                    <Link href="#">
                        <button className="btn btn-info">Thêm Tài khoản</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}