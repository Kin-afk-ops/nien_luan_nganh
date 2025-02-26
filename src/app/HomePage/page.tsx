import HomeCategory from '@/components/HomeCategory/HomeCategory'
import ProductListContainer from '@/components/HomeProducts/ProductListContainer'
import SliderBanner from '@/components/SliderBanner.tsx/SliderBanner'
import React, {use, useEffect, useState} from 'react'

const page = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(response => response.json())
      .then(data => setProductList(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
        <SliderBanner />
        <HomeCategory/>
        <ProductListContainer productList={productList}/>
    </div>
  )
}

export default page