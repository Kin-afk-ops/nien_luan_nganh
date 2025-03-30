import AddCategoryComponent from '@/components/CategoryComponent/AddCategoryComponent'
import React from 'react'
import "./CategoryManageStyle.css"

const CategoryManage = () => {
  return (
    <div className='page_container'>
        <h2 className='title'>Thêm danh mục mới</h2>
        <AddCategoryComponent></AddCategoryComponent>
    </div>
  )
}

export default CategoryManage