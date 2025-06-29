import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import CartTotal from '../components/CartTotal';
import axios from 'axios';

const backendUrl = 'http://localhost:5000'; // Adjust as needed

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
          name: item.productId.productname,
          price: item.productId.price,
          imageURL: item.productId.imageURL,
          size: item.size,
          quantity: item.quantity,
        }));

        setCartData(fetchedCart);
      } catch (error) {
        console.error('Failed to fetch cart:', error.message);
      }
    };

    fetchCart();
  }, []);

  return (
    <div className="border-t pt-14 px-10">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id) || item;

          return (
            <div
              key={index}
              className="py-4 border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 shadow-lg"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20 rounded-b-lg"
                  src={productData.imageURL || assets.defaultImage}
                  alt={productData.name}
                />
                <div>
                  <p className="font-medium">{productData.productname}</p>
                  <p className="text-gray-500 text-md">
                    {currency}
                    {productData.price}
                  </p>
                  <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 max-w-10">10</p>
                </div>
              </div>

              {/* <div className="flex items-center space-x-2">
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
              </div> */}

<div className="flex items-center space-x-2">
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

  <button
    onClick={() => {
      removeFromCart(item._id);
      setCartData((prev) => prev.filter((_, idx) => idx !== index));
    }}
    className="text-red-600 hover:text-red-800 ml-2 text-3xl cursor-pointer"
    title="Remove item"
  >
    🗑
  </button>
</div>

              {/* <button
    onClick={() => {
      removeFromCart(item._id);
      setCartData((prev) => prev.filter((_, idx) => idx !== index));
    }}
    className="text-red-600 hover:text-red-800 ml-2 text-3xl cursor-pointer"

    title="Remove item"
  >
    🗑
  </button> */}

            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end items-center justify-end">
            <button
              onClick={() => navigate('/place-order')}
              className="bg-green-700 text-white text-sm my-8 py-3 cursor-pointer px-4 rounded-2xl"
            >
              PROCEED TO CHECK OUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
