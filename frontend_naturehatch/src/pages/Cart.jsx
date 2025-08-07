import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import CartTotal from '../components/CartTotal';
import axios from 'axios';
import Stars from '../components/Stars';

const backendUrl = 'https://naturehatch-website.onrender.com';

const Cart = () => {
  const { products, currency, cartItem, updateQuantity, navigate, removeFromCart } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${backendUrl}/api/user/cart`, {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        const fetchedCart = response.data.cart.map((item) => ({
          _id: item.productId._id,
          productname: item.productId.productname,
          price: item.productId.price,
          imageURL: item.productId.imageURL,
          size: item.size,
          quantity: item.quantity,
          rating: item.productId.averageRating || 0,
          reviews: item.productId.reviews?.length || 0,
        }));

        setCartData(fetchedCart);
      } catch (error) {
        console.error('Failed to fetch cart:', error.message);
      }
    };

    fetchCart();
  }, []);

  return (
    <div className="border-t pt-14 px-4 sm:px-10">
      <div className="text-2xl mb-4">
        <Title text1="YOUR" text2="CART" />
      </div>

      <div>
        {cartData.map((item, index) => (
          <div
            key={index}
            className="py-6 border-b grid grid-cols-[1fr] sm:grid-cols-[4fr_1.5fr_1fr] items-center gap-4 text-gray-700 shadow-sm"
          >
            {/* Product Info */}
            <div className="flex gap-4 sm:gap-6 items-start">
              <img
                className="w-16 sm:w-20 h-20 object-cover rounded-lg"
                src={item.imageURL || assets.defaultImage}
                alt={item.productname}
              />
              <div className="flex flex-col justify-between">
                <p className="font-medium text-base sm:text-lg">{item.productname}</p>
                <p className="text-sm text-gray-500 mt-1">{currency}{item.price}</p>
                <p className="text-xs text-gray-400 mt-1 font-semibold ">Qunatity : <span className='  font-black '>{item.quantity}</span></p>
              </div>
            </div>

            {/* Rating */}
            {/* Visible on mobile only */}
<div className="lg:block md:block hidden mt-2">
  <Stars stars={item.rating} />
  <span className="text-xs text-gray-500 mt-1">({item.reviews} Reviews)</span>
</div>


            {/* Controls */}
            <div className="flex items-center justify-start sm:justify-end space-x-2">
              {/* Quantity Buttons */}
              <button
                onClick={() => {
                  const newQty = item.quantity - 1;
                  updateQuantity(item._id, item.size, newQty);
                  if (newQty <= 0) {
                    setCartData((prev) => prev.filter((_, idx) => idx !== index));
                  } else {
                    setCartData((prev) =>
                      prev.map((cartItem, idx) =>
                        idx === index ? { ...cartItem, quantity: newQty } : cartItem
                      )
                    );
                  }
                }}
                className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-sm"
              >
                -
              </button>

              <span className="min-w-[24px] text-center">{item.quantity}</span>

              <button
                onClick={() => {
                  const newQty = item.quantity + 1;
                  updateQuantity(item._id, item.size, newQty);
                  setCartData((prev) =>
                    prev.map((cartItem, idx) =>
                      idx === index ? { ...cartItem, quantity: newQty } : cartItem
                    )
                  );
                }}
                className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-sm"
              >
                +
              </button>

              {/* Remove */}
              <button
                onClick={() => {
                  removeFromCart(item._id);
                  setCartData((prev) => prev.filter((_, idx) => idx !== index));
                }}
                className="text-red-600 hover:text-red-800 ml-2 text-2xl cursor-pointer"
                title="Remove item"
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Total & Checkout */}
      <div className="flex justify-end my-16">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="text-end">
            <button
              onClick={() => navigate('/place-order')}
              className="bg-green-700 hover:bg-green-800 text-white text-sm my-6 py-3 px-6 rounded-2xl"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
