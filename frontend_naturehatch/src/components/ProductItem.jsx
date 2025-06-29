import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

function ProductItem({ id, image, name, price,rating }) {
  const { currency } = useContext(ShopContext);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
        <div className="overflow-hidden rounded-lg relative group">
          <img
            className="w-full h-60 object-cover group-hover:scale-110 transition-all duration-300 ease-in-out"
            src={image}
            alt={name}
          />
        </div>
        <p className="pt-3 text-md font-semibold text-gray-800 truncate">{name}</p>
        <p className="pt-3 text-sm font-medium text-gray-800 truncate">{rating}</p>
        <p className="pt-2 text-sm font-semibold text-gray-900">{currency}{price}</p>
      </Link>
    </div>
  );
}

export default ProductItem;
