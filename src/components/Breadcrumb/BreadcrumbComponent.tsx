import { categoryModel } from '@/models/CategoryModel';
import React, { useEffect, useState } from 'react'
import  Link  from 'next/link';
import "./breadcrumbStyle.css"
import { MdArrowForwardIos } from "react-icons/md";
import { DiVim } from 'react-icons/di';


interface Props {
    id: number;
    productName?: string;
    isInOutStandings?: boolean;
}
const BreadcrumbComponent = (props: Props) => {
    const { id, productName, isInOutStandings } = props;
    const [breadcrumb, setBreadcrumb] = useState<categoryModel[]>([]);

    useEffect(() => {
        const fetchBreadcrumb = async () => {
                fetch(`http://localhost:8000/api/categories/breadcrumb/${id}`)
                .then(response => response.json())
                .then(data => setBreadcrumb(data))
                .catch(error => console.error('Error parsing breadcrumb data:', error));
        }

        if(id) {
            fetchBreadcrumb();
        } 
    },[id]);

    if(!breadcrumb) return <p></p>

  return (
    <nav aria-label="breadcrumb" className={`${isInOutStandings ? 'text-small' : ''}`}>
      <ul className="breadcrumb_container">
        {!isInOutStandings && <li className='item'>
          <Link href="/" className="text-blue-500 hover:underline">
            Trang chủ
          </Link>
        </li>}
        {breadcrumb.map((category, index) => (
          <li key={category.id} className="item">
            {(isInOutStandings && index == 0) ? (<div></div>) : (<MdArrowForwardIos/>)}
            <Link href={`/${category.slug}?id=${category.id}`} className="text-blue-500 hover:underline">
              {category.name}
            </Link>
          </li>
        ))}
        {!isInOutStandings && 
          <div className="item">
            <MdArrowForwardIos/>
            <p style={{color: 'gray'}}>{productName}</p>
          </div>}
      </ul>
    </nav>
  )
}

export default BreadcrumbComponent