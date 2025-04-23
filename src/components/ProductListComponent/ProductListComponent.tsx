import { ProductModel } from '@/models/ProductModel'
import React from 'react'
import "./style.css"
import ProductCard from '../HomeProducts/ProductCard';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';

interface Props {
    products: ProductModel[];
    title?: string;
    flexable?: string;
}

const ProductListComponent = (props: Props) => {
    const { products, title, flexable } = props;
    const isMobile = useIsMobile();
  return (
    <div className={`main_container`}>
        {title && <h3 style={{marginBottom: 30}}>{title}</h3>}
        {isMobile ? (
           <div className="swipper_container">
              <div className="swipper_wrap_container">
                <Swiper
                  modules={[ Navigation,Pagination]} // Đảm bảo sử dụng modules đúng
                  spaceBetween={10}
                  slidesPerView={2}
                  slidesPerGroup={1}
                  
                  pagination={{ clickable: true }}
                  loop={true}
                  navigation
                  className="swiper_wrapper"
                >
                  {products.map((product, index: number) => (
                    <SwiperSlide key={index}>
                      <ProductCard product={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
           </div>
        ) 
        : (
            <div className={`product_list ${flexable}`}>
                {products.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        )
        }
    </div>
  )
}

export default ProductListComponent