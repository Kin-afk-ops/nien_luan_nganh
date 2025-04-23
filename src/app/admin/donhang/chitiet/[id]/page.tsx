'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import axiosInstance from '@/helpers/api/config';
import { CategoriesInterface } from '@/interfaces/categories';
import { AddressInterface } from '@/interfaces/addressUser';
import { ImageUploadInterface } from '@/interfaces/imageUpload';
import CategoriesBlock from '@/components/categoriesBlock/CategoriesBlock';
import { useSelector } from 'react-redux';
import { RootState } from '@/hooks/useAppDispatch';

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
        const response = await axiosInstance.put(`/products/` + id, {
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
    const [displayCategories, setDisplayCategories] = useState(false);
    const [cateLabel, setCateLabel] = useState<CategoriesInterface | null>(null);
    const [addresses, setAddresses] = useState<AddressInterface[]>([]);
    const [categoriesArray, setCategoriesArray] = useState<CategoriesInterface[] | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [choiceAddress, setChoiceAddress] = useState<AddressInterface | null>(null);
    const [loadingAddress, setLoadingAddress] = useState<boolean>(false);
    const [attributesList, setAttributesList] = useState<any[]>([]);
    const [attributeValues, setAttributeValues] = useState<{ [key: string]: string }>({});
    const [nameValue, setNameValue] = useState<string>("");
    const [condition, setCondition] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [price, setPrice] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [imageProduct, setImageProduct] = useState<ImageUploadInterface>({
        path: "/assets/account/avatar_default.png",
        publicId: "",
    });
    const user = useSelector((state: RootState) => state.user.currentUser) || null;
    const searchParams = useSearchParams();
    const productEditId = searchParams.get("id");

    useEffect(() => {
        if (id) {
            getProducts(id as string).then((data) => setProduct(data));
        }
    }, [id]);

    useEffect(() => {
        const fetchAttributes = async () => {
            if (cateLabel?.id) {
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
        if (product && categoriesArray && !cateLabel) {
            const matchedCategory = categoriesArray.find(
                (cate) => cate.name === product.categories?.name
            );
            if (matchedCategory) {
                setCateLabel(matchedCategory);
            }

            // Gán giá trị mặc định cho các thuộc tính khi sản phẩm đã được tải
            const attributesFromProduct = product.attributes || {};
            setAttributeValues(attributesFromProduct);
        }
    }, [product, categoriesArray]);

    useEffect(() => {
        if (user) setUserId(user._id);

        const getCategories = async () => {
            try {
                const res = await axiosInstance.get(`/category/getallCategories`);
                setCategoriesArray(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        const getAddressUser = async () => {
            try {
                const res = await axiosInstance.get(`/addressInfoUser/${user?._id}`);
                setAddresses(res.data);
                setChoiceAddress(res.data.find((a) => a.default === true));
            } catch (error) {
                console.log(error);
            }
        };

        const getProduct = async () => {
            if (productEditId) {
                try {
                    const res = await axiosInstance.get(`/products/oneProduct/${productEditId}`);
                    setProduct(res.data);
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
    }, [user, productEditId]);

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

                        <div className="category mb-4" style={{ position: 'relative' }}>
                            <label className="form-label"><b>Danh mục:</b></label>
                            <div className="sell__form--categories border rounded px-3 py-2" style={{ backgroundColor: '#e0e0e0' }}>
                                {cateLabel ? cateLabel.name : "Chọn danh mục"}
                                <i className="fa-solid fa-angle-down float-end mt-1"></i>
                            </div>
                            {displayCategories && (
                                <CategoriesBlock
                                    setDisplayCategories={setDisplayCategories}
                                    categories={categoriesArray}
                                    setCateLabel={setCateLabel}
                                    setSearchMode={() => { }}
                                />
                            )}
                        </div>


                        {attributesList.length > 0 && (
                            <div className="attribute mb-4">
                                <div className="row g-3">
                                    {attributesList.map((attr) => (
                                        <div key={attr.name} className="col-md-4 col-sm-6 col-12">
                                            <label className="form-label"><b>{attr.label}:</b></label>
                                            <select
                                                value={product.details[attr.name] || ""}
                                                className="form-select"
                                                disabled={true}
                                                onChange={(e) => {
                                                    setAttributeValues((prev) => ({
                                                        ...prev,
                                                        [attr.name]: e.target.value,
                                                    }))
                                                }}
                                            >
                                                <option value="">Chọn {attr.label}</option>
                                                {attr.options.map((opt: any) => (
                                                    <option key={opt._id} value={opt.value}>
                                                        {opt.value}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tình trạng sản phẩm */}
                        <div className="status mb-4">
                            <h4 className="mb-2">Tình trạng:</h4>
                            {["Mới", "Như mới", "Tốt", "Trung bình", "Kém"].map((status) => (
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
                                            "Mới": "Mới",
                                            "Như mới": "Như mới",
                                            "Tốt": "Tốt",
                                            "Trung bình": "Trung bình",
                                            "Kém": "Kém",
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
