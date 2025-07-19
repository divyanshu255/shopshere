import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../app/slices/authSlice';
import toast from 'react-hot-toast';
import { CiLight, CiDark, CiMenuBurger, CiLogout } from 'react-icons/ci';

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const user = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`, {
      credentials: 'include',
    });
    const data = await res.json();
    if (data.success) {
      dispatch(setUser(null));
      toast.success(data.message);
      navigate('/login');
    }
  };

  return (
    <header className={`shadow-lg fixed w-full z-50 top-0 ${isDarkMode ? 'bg-black/95 backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm'}`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link className="text-2xl font-bold flex items-center gap-3 hover:scale-105 transition-transform duration-300" to="/">
          <img src="/logocart.png" alt="ShopSphere" className="w-10 h-10" />
          <span className={`font-extrabold tracking-wide ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>ShopSphere</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="font-semibold hover:text-blue-600 transition-colors duration-300">
            Home
          </Link>
          <Link to="/products" className="font-semibold hover:text-blue-600 transition-colors duration-300">
            Products
          </Link>
          {user && (
            <Link to="/cart" className="font-semibold hover:text-blue-600 transition-colors duration-300">
              Cart
            </Link>
          )}
        </div>

        {/* Right Side Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="font-medium text-sm px-3 py-1 bg-gray-100  rounded-full">
                {user.name}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                to="/login" 
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Sign Up
              </Link>
            </div>
          )}
          
          {/* Dark Mode Toggle */}
          <button 
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300" 
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <CiLight size={24} className="text-white" /> : <CiDark size={24} className="text-gray-800" />}
          </button>

          {/* Logout Button (only for logged in users) */}
          {user && (
            <button 
              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center gap-1" 
              onClick={handleLogout}
              title="Logout"
            >
              <CiLogout size={18} />
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <CiMenuBurger size={24} className={isDarkMode ? 'text-white' : 'text-gray-800'} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} ${isDarkMode ? 'bg-black/95' : 'bg-white/95'} backdrop-blur-sm border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="container mx-auto px-6 py-4 space-y-4">
          <Link 
            to="/" 
            className="block font-semibold hover:text-blue-600 transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            className="block font-semibold hover:text-blue-600 transition-colors duration-300"
            onClick={() => setIsOpen(false)}
          >
            Products
          </Link>
          {user ? (
            <>
              <Link 
                to="/cart" 
                className="block font-semibold hover:text-blue-600 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Cart
              </Link>
              <div className="flex items-center gap-3 py-2">
                <span className="font-medium text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                  {user.name}
                </span>
              </div>
              <button 
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-300" 
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                <CiLogout size={18} />
                Logout
              </button>
            </>
          ) : (
            <div className="space-y-3">
              <Link 
                to="/login" 
                className="block w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold text-center rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="block w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-center rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
