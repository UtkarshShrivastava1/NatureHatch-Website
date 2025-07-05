import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Stars from '../components/Stars';

function ProductItem({ id, image, name, price, rating, reviews, isNew = true }) {
  const { currency } = useContext(ShopContext);

  return (
    <div className="bg-white p-3 sm:p-4 border border-gray-100 rounded-2xl shadow-md 
                    hover:shadow-xl hover:border-gray-300 hover:scale-[1.02]
                    transition-transform duration-300 ease-in-out w-full mb-3.5">

      <Link to={`/product/${id}`} className="block group">

        {/* Product Image */}
        <div className="overflow-hidden rounded-xl relative">
          <img
            src={image}
            alt={name}
            className="w-full h-48 sm:h-56 md:h-60 lg:h-64 object-cover 
                       group-hover:scale-110 transition-transform duration-300 ease-in-out"
          />

          {/* NEW Badge */}
          {isNew && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs sm:text-sm px-2 py-0.5 rounded-full z-10 shadow-md">
              New
            </span>
          )}
        </div>

        {/* Name */}
        <p className="pt-3 text-sm sm:text-base font-semibold text-gray-800 truncate">
          {name}
        </p>

        {/* Ratings */}
        <div className="flex items-center gap-2 pt-1">
          <Stars stars={rating} reviews={reviews} />
          <span className="text-xs text-gray-500 hidden sm:inline">({reviews})</span>
        </div>

        {/* Price */}
        <p className="pt-2 text-sm sm:text-base font-semibold text-teal-600">
          {currency}{price}
        </p>
      </Link>
    </div>
  );
}

export default ProductItem;
