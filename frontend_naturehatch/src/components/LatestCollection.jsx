import React from 'react'
import { useContext , useState,useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

  // createContext:- The context itself does not hold the information, it only represents the kind of information you can provide or read from components.

  const {products} = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0,10));
  },[products]);
  return (
    <div>
      <div className='text-center py-10 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTION'}/>
     <p className='w-3/4 m-auto text-xs sm:text-sm md:text:base text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
        </div> 

        {/* Rendring Products  */}

      <div className='grid grid-cols-2 
      sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
         {/* Mapping through the latest products come from the context/shopContext */}
        {latestProducts.map((product, index) => (
          <div key={index} className="flex flex-col md:flex-row justify-center items-center gap
          -4 md:gap-8">


            <ProductItem id={product._id} image={product.image} name={product.name} price={product.price}/>
            </div>
        ))}
      </div>

    </div>
  )
}

export default LatestCollection
