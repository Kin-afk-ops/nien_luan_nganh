'use client';

import Link from 'next/link';

export default function SanPham() {
    return (
        <div className="container mt-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h4 className="m-0 font-weight-bold text-primary">
                        QUẢN LÝ SẢN PHẨM <i className="fa-brands fa-product-hunt ml-2"></i>
                    </h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tên giày</th>
                                    <th>Loại giày</th>
                                    <th>Thương hiệu</th>
                                    <th>Đơn giá</th>
                                    <th>Hình ảnh 1</th>
                                    <th>Đánh giá</th>
                                    <th>Thay đổi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Air Max</td>
                                    <td>Thể thao</td>
                                    <td>Nike</td>
                                    <td>2,000,000 VND</td>
                                    <td><img src="/images/shoe1.jpg" alt="Giày" width="50" /></td>
                                    <td>4.5 sao</td>
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
                        <button className="btn btn-info">Thêm Giày</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
