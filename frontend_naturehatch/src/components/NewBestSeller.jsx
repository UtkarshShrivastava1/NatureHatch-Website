import { useState } from 'react';
import { useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';


export default function BestSellers() {
  const {products} = useContext(ShopContext);
  // console.log("(New Bestseller) : Products",products);
  const[bestSeller , setBestSeller] = useState([]); 

  useEffect(() => {
    const bestProducts = products.filter((item) => (item.bestseller) );
    // console.log(" (New Bestseller) Best Product",bestProducts);
    setBestSeller(bestProducts.slice(0,5));
  },[products]);

  

  const StarRating = ({ rating, reviews }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-gray-600">({reviews})</span>
      </div>
    );
  };

  // const formatPrice = (price) => {
  //   return `Rs. ${price.toFixed(2)}`;
  // };

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">OUR BESTSELLERS!</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSeller.map((product) => (
            <div key={product._id} className="flex flex-col">
              <div className="relative">
                <div className="bg-yellow-400 rounded-full p-16 mb-4 overflow-hidden">
                  {product.onSale && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Sale
                      </span>
                    </div>
                  )}
                  <img 
                    src={product.imageURL} 
                    alt={product.name} 
                    className="absolute inset-0 w-full h-full object-contain p-4"
                  />
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
              
              <StarRating rating={product.rating} reviews={product.reviews} />
              
              {/* <div className="mt-2 flex items-center">
                {product.originalPrice !== product.salePrice && (
                  <span className="text-gray-500 line-through mr-2">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-gray-900 font-medium">
                  {product.hasOptions ? `From ${formatPrice(product.salePrice)}` : formatPrice(product.salePrice)}
                </span>
              </div> */}
              
              <div className="mt-4">
                <button
                  className={`w-full py-3 px-4 rounded-lg border text-center font-medium transition-colors
                    ${product.hasOptions 
                      ? 'border-orange-500 text-orange-500 hover:bg-orange-50' 
                      : 'bg-orange-500 border-orange-500 text-white hover:bg-orange-600'}`}
                >
                  {product.hasOptions ? 'Choose options' : 'Add to cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-orange-400 py-6 px-4 text-center">
          <h3 className="text-3xl text-white font-bold">
            Secret Behind Our Signature Orange Yolk
          </h3>
          <div className="flex justify-center items-center mt-2 text-white">
            <span>Eggoz Loyalty Club |</span>
            <div className="flex items-center mx-2">
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center mr-1">
                <span className="text-orange-500 font-bold text-xs">P</span>
              </div>
              <span>Get upto 10% Off using POPCoins</span>
            </div>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}