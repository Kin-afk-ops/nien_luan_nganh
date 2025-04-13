'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axiosInstance from '@/helpers/api/config';

const getProducts = async (id: string) => {
    try {
        const response = await axiosInstance.get("/products/" + id);
        return response.data;
    } catch (error) {
        console.error("Error fetching product data:", error);
        throw error;
    }
};

const editProduct = async (id: string, updatedData: any) => {
    try {
        const response = await axiosInstance.put('/products/' + id, updatedData);
        return response.data;
    } catch (error) {
        console.error('❌ Lỗi khi cập nhật sản phẩm:', error);
        throw error;
    }
};

const EditProductPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        if (id) {
            getProducts(id as string).then((data) => setProduct(data));
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const updatedProduct = {
            name: formData.get('ten_sanpham'),
            condition: formData.get('status'),
            description: formData.get('mo_ta'),
            price: Number(formData.get('don_gia')),
            quantity: Number(formData.get('so_luong')),
        };

        try {
            await editProduct(id as string, updatedProduct);
            alert('✅ Sản phẩm đã được cập nhật!');
            router.push('/admin/sanpham');
        } catch (error) {
            alert('❌ Có lỗi xảy ra khi cập nhật sản phẩm.');
        }
    };

    if (!product) return <p>Đang tải dữ liệu sản phẩm...</p>;

    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h4 className="mt-2">
                    <strong>CHỈNH SỬA SẢN PHẨM</strong>&ensp;
                    <i className="fas fa-list"></i>
                </h4>
            </div>

            <div className="card-body">
                <div className="table-responsive">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <input type="hidden" name="id_sanpham" value={product.id || ''} />

                        <div className="form-outline mb-4">
                            <label className="form-label"><b>Tên sản phẩm:</b></label>
                            <input type="text" className="form-control" name="ten_sanpham" defaultValue={product.name} required />
                        </div>

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
                                        required
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

                        <div className="form-outline mb-4">
                            <label className="form-label"><b>Mô tả:</b></label>
                            <textarea className="form-control" name="mo_ta" defaultValue={product.description}></textarea>
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label"><b>Đơn giá:</b></label>
                            <input type="number" className="form-control" name="don_gia" defaultValue={product.price} required />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label"><b>Số lượng:</b></label>
                            <input type="number" className="form-control" name="so_luong" defaultValue={product.quantity} required />
                        </div>

                        <button type="submit" className="btn btn-primary">Sửa</button>
                        <a href="/admin/sanpham" className="btn btn-info ms-2">Quay lại</a>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProductPage;
