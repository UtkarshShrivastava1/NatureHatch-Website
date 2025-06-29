import React from 'react'
import { useContext, useEffect, useState } from 'react';
import Title from './Title';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem';

const BestSeller=() => {
  const {products} = useContext(ShopContext);
  const[bestSeller , setBestSeller] = useState([]); 

  useEffect(() => {
    const bestProducts = products.filter((item) => (item.bestseller) );
    setBestSeller(bestProducts.slice(0,5));
  },[products]);
  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLER'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, perferendis molestias distinctio magni placeat nesciunt. </p>
      </div>


      {/* Rendring Products  */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-col-4 lg:grid-cols-5 gap-4 gap-y-6'>
      {bestSeller.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row justify-center items-center gap
          -4 md:gap-8">

            <ProductItem id={item.id} image={item.image} name={item.name} price={item.price}/>
          
            </div>
        ))}
        </div>
    </div>
  )
}

export default BestSeller
