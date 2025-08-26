import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Shop = () => {

  //Scroll to top----------

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  //--------------------
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [price, setPrice] = useState(500);
  const [availability, setAvailability] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortProducts, setSortProducts] = useState('default');

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const toggleAvailability = (e) => {
    const value = e.target.value;
    setAvailability((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const sortProduct = (products, sortOption) => {
    let sorted = [...products];
    switch (sortOption) {
      case 'low-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'A-Z':
        sorted.sort((a, b) => a.productname.localeCompare(b.productname));
        break;
      case 'Z-A':
        sorted.sort((a, b) => b.productname.localeCompare(a.productname));
        break;
      case 'Old-New':
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'New-Old':
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }
    return sorted;
  };

  useEffect(() => {
    const sorted = sortProduct(filteredProducts, sortProducts);
    setFilteredProducts(sorted);
  }, [sortProducts]);

  useEffect(() => {
    let updated = [...products];

    if (showSearch && search) {
      updated = updated.filter((product) =>
        product.productname.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (availability.length > 0) {
      updated = updated.filter((product) => {
        const stockStatus = product.inStock ? "In Stock" : "Out of Stock";
        return availability.includes(stockStatus);
      });
    }

    updated = updated.filter((product) => product.price <= price);

    setFilteredProducts(updated);
  }, [availability, price, products, search, showSearch]);

  return (
    <div className="flex flex-col sm:flex-row gap-8 pt-10 border-t px-4 sm:px-10">
      {/* Filter Section */}
      <div className="sm:min-w-[240px] w-full sm:w-auto">
        <p
          className="my-2 text-lg font-semibold flex justify-between items-center cursor-pointer sm:text-xl"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTER
          <img
            className={`h-3 sm:hidden transition-transform duration-200 ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt="arrow"
          />
        </p>

        <div
          className={`border border-gray-300 rounded-lg p-4 mt-4 transition-all duration-300 ${
            showFilter ? 'block' : 'hidden'
          } sm:block`}
        >
          <p className="text-base font-medium mb-3">Availability</p>
          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4"
                value="In Stock"
                onChange={toggleAvailability}
              />
              In Stock
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4"
                value="Out of Stock"
                onChange={toggleAvailability}
              />
              Out of Stock
            </label>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="flex-1 w-full">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-3 sm:gap-0">
          <Title text1="All" text2="Products" />
          <div className="flex items-center gap-2 text-sm">
            <p className="text-gray-500">Sort By:</p>
            <select
              onChange={(e) => setSortProducts(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1"
            >
              <option value="default">Featured</option>
              <option value="A-Z">Alphabetically, A-Z</option>
              <option value="Z-A">Alphabetically, Z-A</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="Old-New">Date: Old to New</option>
              <option value="New-Old">Date: New to Old</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.length === 0 ? (
            <p className="text-gray-600 col-span-full text-center">
              No products found.
            </p>
          ) : (
            filteredProducts.map((product, index) => (
              <ProductItem
                key={index}
                name={product.productname}
                id={product._id}
                image={product.imageURL}
                price={product.price}
                rating={product.reviews}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
