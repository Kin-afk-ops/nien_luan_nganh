'use client';
import React, {useState} from 'react'
import '../../styles/globalStyle.css';
import styles from './homeCategory.module.css';
import categories from './categories';
import { FaBars } from 'react-icons/fa';
const HomeCategory = () => {

    const [showCategories, setShowCategories] = useState(false);

    const handleShowCategories = () => {
        setShowCategories(!showCategories);
    }
  return (
    <div className={styles.container}>
        <h2>Danh mục đa dạng</h2>
        <p className={styles.p_text}>Danh mục sản phẩm đa dạng, từ mới đến đã qua sử dụng. Hơn 1.000 sản phẩm được cập nhật mỗi tuần</p>
        <div className={styles.menu_icon} onClick={handleShowCategories}>
            <FaBars />
        </div>
        <div className={`${styles.category_container} ${showCategories ? styles.show : ''}`}>
            {categories.map((category) => (
                <a key={category.id} className={styles.category}>
                    <img src={category.image} alt={category.name} className={styles.category_img}/>
                    <p>{category.name}</p>
                </a>
            ))}
        </div>
    </div>
  )
}

export default HomeCategory