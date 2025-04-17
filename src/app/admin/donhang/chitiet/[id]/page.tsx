'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axiosInstance from '@/helpers/api/config';

// Hàm lấy thông tin sản phẩm từ API
const getProducts = async (id: string) => {
    try {
        const response = await axiosInstance.get("/products/" + id);
        return response.data;
    } catch (error) {
        console.error("Error fetching product data:", error);
        throw error;
    }
};

// Hàm cập nhật sản phẩm (duyệt sản phẩm)
const approveProduct = async (id: string) => {
    try {
        const response = await axiosInstance.put(`/products/` +id, {
            approve: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error approving product:", error);
        throw error;
    }
};

const DetailProductPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            getProducts(id as string).then((data) => setProduct(data));
        }
    }, [id]);

    const handleApprove = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        try {
            setLoading(true);
            await approveProduct(id as string);
            alert("Sản phẩm đã được duyệt!");
            router.push("/admin/sanpham");
        } catch (error) {
            alert("Duyệt sản phẩm thất bại.");
        } finally {
            setLoading(false);
        }
    };

    if (!product) return <p>Đang tải dữ liệu sản phẩm...</p>;

    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h4 className="mt-2">
                    <strong>CHI TIẾT SẢN PHẨM</strong>&ensp;
                    <i className="fas fa-list"></i>
                </h4>
            </div>

            <div className="card-body">
                <div className="table-responsive">
                    <form encType="multipart/form-data" onSubmit={handleApprove}>
                        <input type="hidden" name="id_sanpham" value={product.id || ''} />

                        {/* Tên sản phẩm */}
                        <div className="form-outline mb-4">
                            <label className="form-label"><b>Tên sản phẩm:</b></label>
                            <input
                                type="text"
                                className="form-control"
                                name="ten_sanpham"
                                defaultValue={product.name}
                                readOnly
                                style={{ backgroundColor: '#e0e0e0' }}
                            />
                        </div>

                        {/* Tình trạng sản phẩm */}
                        <div className="status mb-4">
                            <h4 className="mb-2">Tình trạng:</h4>
                            {["new", "like-new", "good", "average", "bad"].map((status) => (
                                <div className="form-check" key={status}>
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="status"
                                        id={status}
                                        value={status}
                                        defaultChecked={product.condition === status}
                                        disabled
                                    />
                                    <label className="form-check-label" htmlFor={status}>
                                        {{
                                            "new": "Hàng mới",
                                            "like-new": "Như mới",
                                            "good": "Tốt",
                                            "average": "Trung bình",
                                            "bad": "Kém",
                                        }[status]}
                                    </label>
                                </div>
                            ))}
                        </div>

                        {/* Mô tả sản phẩm */}
                        <div className="form-outline mb-4">
                            <label className="form-label"><b>Mô tả:</b></label>
                            <textarea
                                className="form-control"
                                name="mo_ta"
                                defaultValue={product.description}
                                readOnly
                                style={{ backgroundColor: '#e0e0e0' }}
                            ></textarea>
                        </div>

                        {/* Đơn giá */}
                        <div className="form-outline mb-4">
                            <label className="form-label"><b>Đơn giá:</b></label>
                            <input
                                type="number"
                                className="form-control"
                                name="don_gia"
                                defaultValue={product.price}
                                readOnly
                                style={{ backgroundColor: '#e0e0e0' }}
                            />
                        </div>

                        {/* Số lượng */}
                        <div className="form-outline mb-4">
                            <label className="form-label"><b>Số lượng:</b></label>
                            <input
                                type="number"
                                className="form-control"
                                name="so_luong"
                                defaultValue={product.quantity}
                                readOnly
                                style={{ backgroundColor: '#e0e0e0' }}
                            />
                        </div>

                        {/* Nút duyệt và quay lại */}
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? "Đang duyệt..." : "Duyệt"}
                        </button>
                        <a href="/admin/sanpham" className="btn btn-info ms-2">Quay lại</a>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DetailProductPage;
