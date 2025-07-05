import React, { useContext, useState } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import { ShopContext } from '../context/ShopContext';
import CartTotal from './CartTotal'; // Assuming CartTotal is correct

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const { setShowSearch, cartCount  ,navigate,token,setToken  } = useContext(ShopContext);


  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItem({});
   
  };

  const carouselText = [
    "100% Organic Free-Range Eggs",
    "Fresh and Healthy, Direct from the Farm",
    "Boost Your Health with Nature Hatch!"
  ];

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

  return (
    <div className='w-full bg-white shadow-md sticky   z-50 '>
      {/* Top Bar */}
      <div className='bg-gradient-to-r from-green-700 to-green-600 text-white py-3 px-4 md:px-5'>
        <div className='container mx-auto flex justify-between items-center'>

          {/* Left - Social Media */}
          <div className='flex gap-4'>
            <a href='#' className='hover:text-gray-300'><FaFacebookF /></a>
            <a href='#' className='hover:text-gray-300'><FaInstagram /></a>
            <a href='#' className='hover:text-gray-300'><FaTwitter /></a>
            <a href='#' className='hover:text-gray-300'><FaLinkedinIn /></a>
          </div>

          {/* Center - Text Carousel */}
          <div className='w-[50%] text-center font-semibold text-sm md:text-lg'>
            <Slider {...settings}>
              {carouselText.map((text, index) => (
                <div key={index}>
                  <p>{text}</p>
                </div>
              ))}
            </Slider>
          </div>

          {/* Right - Spacer */}
          <div className='w-[10%]'></div>

        </div>
      </div>

      {/* Main Navbar */}
      <div className='container mx-auto flex items-center justify-between py-5 px-4'>

        {/* Logo */}
        <Link to='/'>
          <h1 className='text-sm  lg:text-2xl font-bold text-gray-700 md:text-xl mr-5\4.5 '>Nature Hatch</h1>
        </Link>

        {/* Menu */}
        <ul className='hidden sm:flex gap-5 text-md font-semibold text-gray-700 md:text-sm text-sm '>
          <li className='hover:text-green-500'><NavLink to='/' className={({ isActive }) => isActive ? 'text-green-700' : ''}>HOME</NavLink></li>

          <li><NavLink to='/shop' className={({ isActive }) => isActive ? 'text-green-700' : ''}>SHOP</NavLink></li>

          {/* Blogs Dropdown */}
          <li className='relative'
              onMouseEnter={() => setDropdownVisible('blogs')}
              onMouseLeave={() => setDropdownVisible(null)}>
            <NavLink to='/blogs' className={({ isActive }) => isActive ? 'text-green-700' : ''} >BLOGS</NavLink>
            {dropdownVisible === 'blogs' && (
              <div className='absolute top-full left-0 bg-white shadow-md rounded-md w-40 py-2'>
                <Link to='/blogs/lifestyle' className='block px-4 py-2 hover:bg-gray-200'>Life Style</Link>
                <Link to='/blogs/egg-fact' className='block px-4 py-2 hover:bg-gray-200'>Egg Fact</Link>
                <Link to='/blogs/recipes' className='block px-4 py-2 hover:bg-gray-200'>Recipes</Link>
              </div>
            )}
          </li>

          {/* Why Choose Us Dropdown */}
          <li className='relative'
              onMouseEnter={() => setDropdownVisible('whychooseus')}
              onMouseLeave={() => setDropdownVisible(null)}>
            <NavLink to='/whychooseus' className={({ isActive }) => isActive ? 'text-green-700' : ''} >WHY CHOOSE US ?</NavLink>
            {dropdownVisible === 'whychooseus' && (
              <div className='absolute top-full left-0 bg-white shadow-md rounded-md w-42 py-2'>
                <Link to='/whychooseus/WhyChoseUs' className={`block px-4 py-2 hover:bg-gray-200 ({ isActive }) => isActive ? 'text-green-700' : '' `}>Why Choose Us</Link>
                <Link to='/whychooseus/fram-to-plate' className='block px-4 py-2 hover:bg-gray-200'>Farm to Plate</Link>
              </div>
            )}
          </li>

          <li><NavLink to='/about' className={({ isActive }) => isActive ? 'text-green-700' : ''} >ABOUT</NavLink></li>
          <li><NavLink to='/contact' className={({ isActive }) => isActive ? 'text-green-700' : ''} >CONTACT</NavLink></li>
        </ul>

        {/* Icons */}
        <div className='flex gap-6 items-center'>
          <img onClick={() => setShowSearch(true)} src={assets.search_icon} alt="Search" className='w-5 cursor-pointer' />
          
          <div className="relative group">
            <img
              onClick= { () => token ? null : navigate('/login')}
              src={assets.profile_icon}
              alt="Profile"
              className="w-5  cursor-pointer"
            />

            {token && 
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-10 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300">
                <ul className="py-2 text-sm text-gray-700">
                  <li><a href="/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</a></li>
                  <li><Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">My Orders</Link></li>
                  <li><button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Log Out</button></li>
                </ul>
              </div>
            }
          </div>

          <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} alt="Cart" className='w-5 min-w-5' />
            <p className='absolute right-[-5px] bottom-[-5px] w-4 h-4 text-[8px] flex items-center justify-center bg-black text-white rounded-full'>
              {cartCount}
            </p>
          </Link>

          {/* Hamburger for Mobile */}
          <img src={assets.menu_icon} alt="Menu" className='w-5 cursor-pointer sm:hidden' onClick={() => setVisible(!visible)} />
        </div>

      </div>

      {/* Sidebar for mobile */}
      <div className={`fixed top-0 right-0 bottom-0 bg-white transition-all duration-300 ${visible ? 'w-full' : 'w-0'} overflow-hidden shadow-lg`}>
        <div className='flex flex-col text-gray-600'>

          {/* Close Button */}
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img src={assets.dropdown_icon} alt='Close' className='h-4 rotate-180' />
            <p>Back</p>
          </div>

          {/* Mobile Nav */}
          <NavLink onClick={() => setVisible(false)} to='/' className='block py-2 px-6 border-b'>Home</NavLink>
           <NavLink onClick={() => setVisible(false)} to='/shop' className='block py-2 px-6 border-b'>Shop</NavLink>
          <NavLink onClick={() => setVisible(false)} to='/blogs' className='block py-2 px-6 border-b'>Blogs</NavLink>
          <NavLink onClick={() => setVisible(false)} to='/blogs' className='block py-2 px-6 border-b'>Why Choose Us?</NavLink>
          <NavLink onClick={() => setVisible(false)} to='/about' className='block py-2 px-6 border-b'>About</NavLink>
          <NavLink onClick={() => setVisible(false)} to='/contact' className='block py-2 px-6 border-b'>Contact</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
