import { ProductModel } from '@/models/ProductModel'
import React from 'react'
import "./style.css"
import ProductCard from '../HomeProducts/ProductCard';

interface Props {
    products: ProductModel[];
    title?: string;
    flexable?: string;
}

const ProductListComponent = (props: Props) => {
    const { products, title, flexable } = props;
  return (
    <div className={`main_container`}>
        {title && <h3 style={{marginBottom: 30}}>{title}</h3>}
        <div className={`list_product_container ${flexable}`}>
            {products.map((product, index) => (
                <div key={index}>
                    <ProductCard product={product}/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ProductListComponent