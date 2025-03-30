'use client';

import Link from 'next/link';

export default function OrderApproval() {
    return (
        <div className="container mt-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h4 className="m-0 font-weight-bold text-primary">
                        XÉT DUYỆT ĐƠN HÀNG <i className="fas fa-cart-arrow-down ml-2"></i>
                    </h4>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tên người nhận</th>
                                    <th>Địa chỉ nhận</th>
                                    <th>Số điện thoại</th>
                                    <th>Ngày đặt hàng</th>
                                    <th>Ghi chú</th>
                                    <th>Tổng tiền</th>
                                    <th>Thay đổi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Nguyễn Văn A</td>
                                    <td>123 Đường ABC, TP.HCM</td>
                                    <td>0901234567</td>
                                    <td>2024-03-20</td>
                                    <td>Giao hàng nhanh</td>
                                    <td>1,500,000 VND</td>
                                    <td>
                                        <Link href="#">
                                            <button className="btn btn-success btn-sm mr-2">Xem chi tiết</button>
                                        </Link>
                                        <button className="btn btn-danger btn-sm">Xóa</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}