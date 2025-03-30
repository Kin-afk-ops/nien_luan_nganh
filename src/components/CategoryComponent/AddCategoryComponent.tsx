'use client';
import { CategoryAttribute } from '@/models/attributesModel';
import { categoryModel } from '@/models/CategoryModel';
import React, { useEffect, useState } from 'react';
import "./addCateForm.css";
import { createCategory, getAllCateAttr, getAllCategories } from '@/utils/addCategory';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import Modal from "react-modal";
import AddCateAttributeComponent from './AddCateAttributeComponent';
import { FaEdit } from "react-icons/fa";


Modal.setAppElement("body");


const AddCategoryComponent = () => {
    const [attribute, setAttribute] = useState<CategoryAttribute[]>([]);
    const [categories, setCategories] = useState<categoryModel[]>([]);
    const [newCategory, setNewCategory] = useState<Partial<categoryModel>>({});
    const [selectedAttribute, setSelectedAttribute] = useState<CategoryAttribute | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        getAllCategories()
            .then(setCategories)
            .catch(error => console.error("Failed to fetch categories:", error));

        getAllCateAttr()
            .then(setAttribute)
            .catch(error => console.error("Failed to fetch attribute:", error));
    }, []);

    useEffect(() => {
        console.log("Selected Attributes: ", selectedAttribute);
        if (!newCategory?.attributeId || newCategory.attributeId === 0) {
            setSelectedAttribute(null); // Reset khi không có attributeId
            return;
        }
        if (newCategory?.attributeId && attribute.length > 0) {
            const foundAttr = attribute.find(attr => attr.attributeId === Number(newCategory.attributeId));
            setSelectedAttribute(foundAttr || null);
        }
    }, [newCategory?.attributeId, attribute]); // Thêm attribute để tránh lỗi

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewCategory(prev => ({
            ...prev,
            [name]: name === "parentId" || name === "attributeId" ? Number(value) || '' : value
        }));
    };

    const handleSubmit = async() => {
        if(newCategory) {
            await createCategory(newCategory);
            setNewCategory({});
            setSelectedAttribute(null);
        }
    };

    const handleEditMode = () => {
        setEditMode(true);
        setModalIsOpen(true);
    }

    return (
        <div>
            <form>
                <div className="form-group">
                    <label className='form-label'>Tên danh mục:</label>
                    <input
                        type="text"
                        name="name"
                        value={newCategory.name || ''}
                        onChange={handleChange}
                        className='form-input'
                    />
                </div>

                <div className="form-group">
                    <label className='form-label'>Danh mục cha (nếu có):</label>
                    <select
                        name="parentId"
                        value={newCategory.parentId || ''}
                        onChange={handleChange}
                        className='form-select'
                    >
                        <option value="">Không có</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group attribute-group">
                    <label className='form-label'>Thuộc tính (nếu có):</label>
                    <div className="select-group">
                        <select
                            name="attributeId"
                            value={newCategory.attributeId || ''}
                            onChange={handleChange}
                            className='form-select'
                        >
                            <option value={0}>Không có</option>
                            {attribute.map(attr => (
                                <option key={attr.attributeId} value={attr.attributeId}>
                                    {attr.label}
                                </option>
                            ))}
                        </select>
                        <ButtonComponent label='Tạo tuộc tính mới' onClick={() => setModalIsOpen(true)}
                            style={{backgroundColor: 'coral', width: 180, height: 40, fontSize: 13, color: 'white'}}    
                        ></ButtonComponent>
                    </div>
                </div>
            </form>

            <div className="attribute_detail">
                <div className='flex'>
                    <h3>Thuộc tính chi tiết</h3>
                    <FaEdit size={20} onClick={() => handleEditMode()} className='edit_icon'/>
                </div>
                {selectedAttribute !== null ? (
                    <ul>
                        {selectedAttribute.listDataTypes.map(detail => (
                            <li key={detail.id} className='item'>{detail.label}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Chọn danh mục và thuộc tính để xem chi tiết</p>
                )}
            </div>
            <ButtonComponent label='Tạo danh mục' onClick={handleSubmit}
                style={{backgroundColor: 'blue', width: 200, color: 'white'}}
            ></ButtonComponent>
            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
                style={{
                    overlay: {
                      backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền mờ
                    },
                    content: {
                      width: "500px",
                      margin: "auto",
                      padding: "20px",
                      borderRadius: "10px",
                      
                    },
                  }}
                >
                    
                <h2>Thêm chi tiết</h2>
               <AddCateAttributeComponent onClick={() => {
                    setEditMode(false);
                    setModalIsOpen(false); //
               }} attributeData={selectedAttribute} 
                    isEditAttribute={editMode}
                ></AddCateAttributeComponent>
                <button onClick={() => setModalIsOpen(false)}>Đóng</button>
            </Modal>
        </div>
    );
};

export default AddCategoryComponent;
