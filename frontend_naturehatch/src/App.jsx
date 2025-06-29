// import { Routes, Route } from 'react-router-dom';
// import MainLayout from './MainLayout';

// import Home from './pages/Home';
// import About from './pages/AboutUs';
// import Contact from './pages/Contact';
// import Product from './pages/Product';
// import WhyChooseUs from './pages/WhyChooseUs';
// import Blogs from './pages/Blogs';
// import Cart from './pages/Cart';
// import Login from './pages/Login';
// import PlaceOrder from './pages/PlaceOrder';
// import Orders from './pages/Orders';
// import Shop from './pages/Shop';

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AdminLayout from './AdminLayout';

// function App() {
//   return (
//     <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
//       <ToastContainer />

//       <Routes>
//         {/* All user-facing pages inside MainLayout */}
//         <Route element={<MainLayout />}>
//           <Route path='/' element={<Home />} />
//           <Route path='/shop' element={<Shop />} />
//           <Route path='/whychooseus' element={<WhyChooseUs />} />
//           <Route path='/about' element={<About />} />
//           <Route path='/contact' element={<Contact />} />
//           <Route path='/blogs' element={<Blogs />} />
//           <Route path='/product/:productId' element={<Product />} />
//           <Route path='/cart' element={<Cart />} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/place-order' element={<PlaceOrder />} />
//           <Route path='/orders' element={<Orders />} />
//           <Route path='/admin-login' element={<Login2 />} />
//         </Route>

//         {/* Admin pages WITHOUT layout */}
//         <Route element={<AdminLayout/>}>
//         <Route path='/admin-dashboard/add' element={<Add />} />
//         </Route>
//       </Routes>
//     </div>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import About from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import WhyChooseUs from "./pages/WhyChooseUs";
import Blogs from "./pages/Blogs"; // Added Blogs page
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Shop from "./pages/Shop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import GoogleLoginPage from './pages/GoogleLoginPage';

function App() {
  return (
    <>
      <div className="">
        <Navbar />
      </div>
      {/* <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'> */}
      <div className="px- sm:px-[vw] md:px-[vw] lg:px-[vw]">
        <ToastContainer />

        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/whychooseus" element={<WhyChooseUs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blogs />} /> {/* Added Blogs route */}
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />{" "}
          {/* Fixed typo */}
          <Route path="/orders" element={<Orders />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
