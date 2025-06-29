import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Shop = () => {
  const { products ,search ,showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [price, setPrice] = useState(500);
  const [availability, setAvailability] = useState([]); // 'In Stock' or 'Out of Stock'
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortProducts, setSortProducts] = useState('default'); // Corrected state name

  // When products load initially
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // Handle availability change
  const toggleAvailability = (e) => {
    const value = e.target.value;
    if (availability.includes(value)) {
      setAvailability((prev) => prev.filter((item) => item !== value));
    } else {
      setAvailability((prev) => [...prev, value]);
    }
  };

  // Sort logic
 const sortProduct = (products, sortOption) => {
  let sortedProducts = [...products];

  switch (sortOption) {
    case 'low-high':
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case 'high-low':
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case 'A-Z':
      sortedProducts.sort((a, b) => a.productname.localeCompare(b.productname));
      break;
    case 'Z-A':
      sortedProducts.sort((a, b) => b.productname.localeCompare(a.productname));
      break;
    case 'Old-New':
      sortedProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case 'New-Old':
      sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    default:
      break;
  }

  return sortedProducts;
};


  // Handle sort change
  // useEffect(() => {
  //   const sortedProducts = sortProduct(filteredProducts, sortProducts);
  //   setFilteredProducts(sortedProducts);
  // }, [sortProducts]); // Only depend on the sortProducts state

 useEffect(() => {
  const sortedProducts = sortProduct(filteredProducts, sortProducts);
  setFilteredProducts(sortedProducts);
}, [sortProducts, products]);

  // Filter logic
  useEffect(() => {
    let updatedProducts = [...products];
    
    if (showSearch &&search) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }


    // Filter by availability
    if (availability.length > 0) {
      updatedProducts = updatedProducts.filter((product) => {
        const stockStatus = product.inStock ? "In Stock" : "Out of Stock";
        return availability.includes(stockStatus);
      });
    }

    // Filter by price
    updatedProducts = updatedProducts.filter((product) => product.price <= price);

    setFilteredProducts(updatedProducts);
    // fillerProducts.sort((a, b) => a.price - b.price); // Sort by price after filtering
    // setFilteredProducts(fillerProducts); // Update the filtered products state
  }, [availability, price, products, search, showSearch]); // Added showSearch and search to dependencies

  return (
    <div className="flex flex-col sm:flex-row gap-10 pt-10 border-t px-4 sm:px-10">

      {/* Filter Section */}
      <div className="min-w-[240px]">
        <p
          className="my-2 text-xl font-semibold flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTER
          <img
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt="arrow"
          />
        </p>

        {/* Availability Filter */}
        <div className={`border border-gray-300 rounded-lg p-5 mt-6 transition-all ${showFilter ? 'block' : 'hidden'} sm:block`}>
          <p className="text-lg font-medium mb-3">Availability</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex items-center gap-2 cursor-pointer hover:text-orange-500">
              <input
                type="checkbox"
                className="w-4 h-4"
                value="In Stock"
                onChange={toggleAvailability}
              />
              In Stock
            </label>

            <label className="flex items-center gap-2 cursor-pointer hover:text-orange-500">
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

        {/* Price Filter */}
        {/* <div className={`p-6 bg-white rounded-2xl shadow-md mt-8 flex flex-col items-center ${showFilter ? 'block' : 'hidden'} sm:block`}>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Select Price</h2>
          <p className="text-xl text-teal-600 font-semibold mb-4">Up to ₹{price}+</p>

          <input
            type="range"
            min="37"
            max="17500"
            value={price}
            onChange={handleChange}
            className="w-full h-2 bg-teal-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
          />
          <button
            className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-300"
            onClick={() => setPrice(500)}>Go</button>
        </div> */}
      </div>

      {/* Product Listing */}
      <div className="flex-1">
        <div className="flex justify-between items-center text-base sm:text-2xl mb-4">
          <Title text1={"All"} text2={"Products"} />

          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <p className="text-gray-500 text-sm sm:text-base">Sort By:</p>
            <select onChange={(e) => setSortProducts(e.target.value)} className="border border-gray-300 rounded-lg p-2 text-sm sm:text-base">
              <option value="default">Featured</option>
              {/* <option value="bestSelling">Best Selling</option> */}
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductItem
              key={index}
              name={product.productname}
              id={product._id}
              image={product.imageURL}
              price={product.price}
              rating={product.reviews}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
