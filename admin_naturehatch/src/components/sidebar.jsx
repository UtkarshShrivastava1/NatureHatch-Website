import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  ChevronRight,
  Plus,
  ListOrdered,
  ShoppingBag,
  LogOut,
  User,
} from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280 && window.innerWidth >= 1024) {
        setCollapsed(true);
      } else if (window.innerWidth >= 1280) {
        setCollapsed(false);
      }

      if (window.innerWidth >= 1024) {
        setShowMobileMenu(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileMenu]);

  const menuItems = [
    { name: "Add Items", path: "/add", icon: <Plus size={20} /> },
    { name: "List Items", path: "/list", icon: <ListOrdered size={20} /> },
    { name: "Orders", path: "/orders", icon: <ShoppingBag size={20} /> },
  ];

  const SidebarContent = ({ isMobile = false }) => (
    <>
      {/* Logo */}
      <div className="flex items-center px-4 py-6">
        <div className="bg-gradient-to-r from-green-500 to-lime-400 rounded-xl p-2 shadow-lg flex-shrink-0">
          <div className="text-white font-bold text-xl">AP</div>
        </div>
        {(!collapsed || isMobile) && (
          <div
            className="ml-3 overflow-hidden whitespace-nowrap transition-all duration-300"
            style={{
              width: collapsed && !isMobile ? "0" : "auto",
              opacity: collapsed && !isMobile ? 0 : 1,
            }}
          >
            <span className="text-lg font-semibold bg-gradient-to-r from-green-500 to-lime-400 bg-clip-text text-transparent inline-block">
              Admin Panel
            </span>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <div className="mt-6 px-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center ${
                collapsed && !isMobile ? "justify-center" : "justify-start"
              } 
              gap-2 px-3 py-2.5 my-1 
              rounded-lg transition-all duration-300 ease-in-out group
              ${
                isActive
                  ? "bg-gradient-to-r from-green-500 to-lime-400 text-white shadow-lg"
                  : "hover:bg-green-50 text-gray-700"
              }`
            }
            onClick={() => setShowMobileMenu(false)}
          >
            <div
              className="flex items-center justify-center transition-all duration-300 ease-in-out"
              style={{ width: collapsed && !isMobile ? "20px" : "24px" }}
            >
              {React.cloneElement(item.icon, { size: 18 })}
            </div>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap
              ${collapsed && !isMobile ? "w-0 opacity-0" : "w-auto opacity-100"}`}
            >
              <span className="font-medium">{item.name}</span>
            </div>
            {collapsed && !isMobile && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-green-700 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {item.name}
              </div>
            )}
          </NavLink>
        ))}
      </div>

      {/* User Profile */}
      <div className="mt-auto px-1 py-4">
        <div
          className={`flex ${
            collapsed && !isMobile ? "justify-center" : "items-center"
          } gap-3 p-3 rounded-xl hover:bg-green-50 cursor-pointer w-full`}
        >
          <div className="relative flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-lime-400 flex items-center justify-center">
              <User size={20} color="white" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          {(!collapsed || isMobile) && (
            <div
              className="flex-1 overflow-hidden whitespace-nowrap transition-all duration-300"
              style={{
                width: collapsed && !isMobile ? "0" : "auto",
                opacity: collapsed && !isMobile ? 0 : 1,
              }}
            >
              <p className="font-semibold text-gray-800">Chris Morgan</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          )}
        </div>
      </div>

      {/* Logout */}
      <div className="px-2 pb-4">
        <button
          onClick={() => setToken("")}
          className={`flex ${
            collapsed && !isMobile
              ? "justify-center"
              : "items-center justify-start"
          } gap-3 p-2 rounded-xl hover:bg-green-100 text-red-500 transition-colors duration-300 w-full`}
        >
          <LogOut size={20} />
          {(!collapsed || isMobile) && (
            <span className="font-medium">Logout</span>
          )}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="p-2 rounded-full bg-white shadow-lg text-gray-700"
        >
          {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out ${
          showMobileMenu ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setShowMobileMenu(false)}
      >
        <div
          className={`fixed inset-y-0 left-0 w-3/4 max-w-xs bg-white transform transition-transform duration-300 ease-in-out overflow-y-auto ${
            showMobileMenu ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <SidebarContent isMobile={true} />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:flex flex-col ${
          collapsed ? "w-16" : "w-54"
        } min-h-screen bg-white border-r border-gray-100 shadow-sm transition-all duration-300 ease-in-out relative`}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 bg-white rounded-full p-1.5 shadow-md hover:bg-green-50 transition-colors duration-300 border border-gray-100 z-10"
        >
          <ChevronRight
            size={16}
            className={`transform transition-transform duration-300 ${
              collapsed ? "rotate-0" : "rotate-180"
            }`}
          />
        </button>

        <SidebarContent isMobile={false} />
      </div>
    </>
  );
};

export default Sidebar;
