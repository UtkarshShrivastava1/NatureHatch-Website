import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { Outlet } from 'react-router-dom';

const MainLayout = ({ children }) => (
  <>
    <Navbar />
    <SearchBar />
    {/* <div>{children}</div> */}
    <Outlet />
    <Footer />
  </>
);

export default MainLayout;
