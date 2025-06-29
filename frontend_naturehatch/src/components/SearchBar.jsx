import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if ( (location.pathname === '/shop' || location.pathname === '/' ) ) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="fixed top-40 left-0 right-0 z-60 flex justify-center items-center ">
      <div className="bg-white shadow-lg border border-gray-200 rounded-full px-6 py-3 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 flex items-center gap-3 transition-all duration-300 ease-in-out">
        <img src={assets.search_icon} alt="Search" className="w-5 opacity-70" />

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-sm"
        />

        <img
          onClick={() => setShowSearch(false)}
          src={assets.cross_icon}
          alt="Close"
          className="w-4 h-4 cursor-pointer opacity-60 hover:opacity-100 transition"
        />
      </div>
    </div>
  ) : null;
};

export default SearchBar;
