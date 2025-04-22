"use client";
import AddCategoryComponent from '@/components/CategoryComponent/AddCategoryComponent'
import React, { useEffect, useState } from 'react'
import "./CategoryManageStyle.css";
import { useSearchParams  } from 'next/navigation'
import { CategoriesInterface } from '@/interfaces/categories';
import { categoryModel } from '@/models/CategoryModel';
import axiosInstance from '@/helpers/api/config';
import { getCategoryById } from '@/utils/addCategory';

const CategoryManage = () => {
  const params = useSearchParams ();
  const categoryId = params.get('id');
  const [category, setCategory] = useState<categoryModel>();
  useEffect(() => {
    const fetchCategory = async () => {
      console.log("Category Id is: ",categoryId);
      try {
        if(categoryId) {
          const response = await getCategoryById(Number(categoryId));
          setCategory(response);
        }
      }catch(error) {
        console.error("Failed to fetch category:", error);
      }
    }
    fetchCategory();
  },[]);

  return (
    <div className='page_container'>
        <h2 className='title'>Thêm danh mục mới</h2>
        <AddCategoryComponent categoryProps={category}></AddCategoryComponent>
    </div>
  )
}

export default CategoryManage