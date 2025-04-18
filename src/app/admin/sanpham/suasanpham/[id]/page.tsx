'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import axiosInstance from '@/helpers/api/config';
import { CategoriesInterface } from '@/interfaces/categories';
import CategoriesBlock from '@/components/categoriesBlock/CategoriesBlock';
import { AddressInterface } from '@/interfaces/addressUser';
import { useSelector } from 'react-redux';
import { RootState } from '@/hooks/useAppDispatch';
import { ImageUploadInterface } from '@/interfaces/imageUpload';

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
    const user = useSelector((state: RootState) => state.user.currentUser) || null;
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<any>(null);
    const [displayCategories, setDisplayCategories] = useState<boolean>(false);
    const [cateLabel, setCateLabel] = useState<CategoriesInterface | null>(null);
    const [addresses, setAddresses] = useState<AddressInterface[]>([]);
    const [categoriesArray, setCategoriesArray] = useState<CategoriesInterface[] | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [searchMode, setSearchMode] = useState<boolean>(false);
    const [choiceAddress, setChoiceAddress] = useState<AddressInterface | null>(null);
    const searchParams = useSearchParams();
    const productEditId = searchParams.get("id");

    const [nameValue, setNameValue] = useState<string>("");
    const [condition, setCondition] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [price, setPrice] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [imageProduct, setImageProduct] = useState<ImageUploadInterface>({
        path: "/assets/account/avatar_default.png",
        publicId: "",
    });
    const [attributeValues, setAttributeValues] = useState<{ [key: string]: string }>({});
    const [loadingAddress, setLoadingAddress] = useState<boolean>(false);
    const [attributesList, setAttributesList] = useState<any[]>([]);

    useEffect(() => {
        if (id) {
            getProducts(id as string).then((data) => setProduct(data));
        }
    }, [id]);

    useEffect(() => {
        const fetchAttributes = async () => {
            if (cateLabel && cateLabel.id) {
                try {
                    const res = await axiosInstance.get(`/category/getAttrByCateId/${cateLabel.id}`);
                    setAttributesList(res.data.listDataTypes);
                } catch (error) {
                    console.error("Lỗi khi lấy thuộc tính sản phẩm", error);
                }
            } else {
                setAttributesList([]);
                setAttributeValues({});
            }
        };
        fetchAttributes();
    }, [cateLabel]);

    useEffect(() => {
        if (user) setUserId(user._id);

        const getCategories = async (): Promise<void> => {
            try {
                const res = await axiosInstance.get(`/category/getallCategories`);
                setCategoriesArray(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        const getAddressUser = async (): Promise<void> => {
            try {
                const res = await axiosInstance.get(`/addressInfoUser/${user?._id}`);
                setAddresses(res?.data);
                setChoiceAddress(res?.data.find((a) => a.default === true));
            } catch (error) {
                console.log(error);
            }
        };

        const getProduct = async (): Promise<void> => {
            if (productEditId) {
                try {
                    const res = await axiosInstance.get(`/products/oneProduct/${productEditId}`);
                    setNameValue(res.data.name);
                    setCateLabel(res.data.categories);
                    setCondition(res.data.condition);
                    setQuantity(res.data.quantity);
                    setPrice(res.data.price);
                    setDescription(res.data.description);
                    setChoiceAddress(res.data.addressInfo);
                    setImageProduct(res.data.image);
                    setAttributeValues(res.data.attributes || {});
                } catch (error) {
                    console.log(error);
                }
            }
        };

        getCategories();
        getAddressUser();
        getProduct();
    }, [user, userId, loadingAddress, productEditId]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const updatedProduct = {
            name: formData.get('ten_sanpham'),
            condition: formData.get('status'),
            description: formData.get('mo_ta'),
            price: Number(formData.get('don_gia')),
            quantity: Number(formData.get('so_luong')),
            category: formData.get('category_id'), // 👈 lấy category từ input ẩn
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
                        <input type="hidden" name="category_id" value={cateLabel?._id || ''} />

                        <div className="form-outline mb-4">
                            <label className="form-label"><b>Tên sản phẩm:</b></label>
                            <input type="text" className="form-control" name="ten_sanpham" defaultValue={product.name} required />
                        </div>

                        <div className="category mb-4">
                            <label className="form-label"><b>Danh mục:</b></label>
                            <div
                                className="sell__form--categories border rounded px-3 py-2 cursor-pointer"
                                onClick={() => setDisplayCategories(true)}
                            >
                                {cateLabel ? cateLabel.name : "Chọn danh mục"}
                                <i className="fa-solid fa-angle-down float-end mt-1"></i>
                            </div>
                            {displayCategories && (
                                <CategoriesBlock
                                    setDisplayCategories={setDisplayCategories}
                                    categories={categoriesArray}
                                    setCateLabel={setCateLabel}
                                    setSearchMode={setSearchMode}
                                />
                            )}
                        </div>
                        <div className="attribute mb-4">
                            {attributesList.length > 0 && (
                                <div className="dynamic-attributes mb-4 ">
                                    {attributesList.map((attr) => (
                                        <div key={attr.name} className="attribute-select">
                                            <label mr-10><b>{attr.label}:</b></label>
                                            <select
                                                value={attributeValues[attr.name] || ""}
                                                className="attribute-select border rounded px-3 py-2 cursor-pointer"
                                                onChange={(e) =>
                                                    setAttributeValues((prev) => ({
                                                        ...prev,
                                                        [attr.name]: e.target.value,
                                                    }))
                                                }
                                            >
                                                <option value="">Chọn {attr.label}</option>
                                                {attr.options.map((opt: any) => (
                                                    <option key={opt._id} value={opt.value}>{opt.value}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="status mb-4">
                            <label className="mb-2"><b>Tình trạng:</b></label>
                            {["Mới", "Như mới", "Tốt", "Trung bình", "Kém"].map((status) => (
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
                                        {status}
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
