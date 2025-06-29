import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProduct = ({ category, subCategory }) => {  // Destructure props here

  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();

      // Filter products by category
      productsCopy = productsCopy.filter((item) => category === item.category);

      // Filter products by subcategory
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

      // Set the related products, limiting to 5 items
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);


  return (
    <div className='my-24'>
      <div className='text-center text-3xl'>
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-4 gap-y-6'>
        {related.map((item, index) => (
          // Corrected map to return ProductItem component
          <ProductItem
            key={index}
            id={item._id}
            price={item.price}
            name={item.productname}
            rating={item.averageRating}
            image={item.imageURL}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
