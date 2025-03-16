"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, Menu, X, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SubNavCategories from "./SubNavCategories";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("isAuthenticated"));
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    navigate("/auth");
    setIsProfileMenuOpen(false);
  };

  const handleRegister = () => {
    navigate("/register");
    setIsProfileMenuOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsProfileMenuOpen(false);
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const toggleProfileMenu = () => {
    if (!isLoggedIn) {
      navigate("/auth");
      return;
    }
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <>
      <motion.div
        className='w-full bg-[#89AC46] flex justify-center align-center'
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <h1 className='text-white text-center py-2 text-sm'>
          Free Delivery for Orders Over 99 TND Across Tunisia!
        </h1>
      </motion.div>
      <div className='sticky top-0 z-50'>
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className='bg-white shadow-md relative'
        >
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between h-16'>
              <div className='flex items-center'>
                <motion.div
                  className='flex-shrink-0'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className='text-2xl font-bold text-[#89AC46]'>
                    ParaMed
                  </span>
                </motion.div>
              </div>

              <div className='hidden md:block'>
                <div className='ml-10 flex items-baseline space-x-4'>
                  <motion.a
                    href='/'
                    className='text-gray-600 hover:text-[#89AC46] px-3 py-2 rounded-md text-sm font-medium'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Home
                  </motion.a>
                  {["Sale", "About", "Contact"].map((item, index) => (
                    <motion.a
                      key={item}
                      href={`/${item.toLowerCase()}`}
                      className='text-gray-600 hover:text-[#89AC46] px-3 py-2 rounded-md text-sm font-medium'
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className='hidden md:block'>
                <div className='ml-4 flex items-center md:ml-6'>
                  <motion.div
                    className='relative'
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <input
                      type='text'
                      placeholder='Search medical supplies...'
                      className='bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-[#89AC46]'
                    />
                    <Search className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
                  </motion.div>

                  <motion.button
                    onClick={toggleProfileMenu}
                    className='ml-3 p-1 rounded-full text-gray-600 hover:text-[#89AC46] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#89AC46] cursor-pointer'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <User className='h-6 w-6' />
                  </motion.button>

                  <AnimatePresence>
                    {isProfileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className='absolute top-16 right-24 bg-white mt w-48 shadow-lg rounded-md border border-gray-200 z-50'
                      >
                        {!isLoggedIn ? (
                          <div className='py-2'>
                            <motion.button
                              onClick={handleLogin}
                              className='block w-full hover:text-[#89AC46] px-4 py-2 text-gray-600 hover:bg-gray-100'
                              whileHover={{ backgroundColor: "#F3F4F6" }}
                            >
                              Login
                            </motion.button>
                            <motion.button
                              onClick={handleRegister}
                              className='block w-full hover:text-[#89AC46] px-4 py-2 text-gray-600 hover:bg-gray-100'
                              whileHover={{ backgroundColor: "#F3F4F6" }}
                            >
                              Register
                            </motion.button>
                          </div>
                        ) : (
                          <div className='py-2'>
                            <motion.button
                              className='block w-full px-4 py-2 text-gray-600 hover:bg-gray-100'
                              whileHover={{ backgroundColor: "#F3F4F6" }}
                            >
                              Profile
                            </motion.button>
                            <motion.button
                              className='block w-full px-4 py-2 text-gray-600 hover:bg-gray-100'
                              whileHover={{ backgroundColor: "#F3F4F6" }}
                            >
                              Orders
                            </motion.button>
                            <motion.button
                              onClick={handleLogout}
                              className='block w-full px-4 py-2 text-gray-600 hover:bg-gray-100'
                              whileHover={{ backgroundColor: "#F3F4F6" }}
                            >
                              Logout
                            </motion.button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    onClick={handleCartClick}
                    className='ml-3 p-1 rounded-full text-gray-600 hover:text-[#89AC46] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#89AC46] cursor-pointer'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShoppingCart className='h-6 w-6' />
                  </motion.button>
                </div>
              </div>

              <motion.div
                className='-mr-2 flex md:hidden'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.button
                  onClick={toggleMenu}
                  className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[#89AC46] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className='sr-only'>Open main menu</span>
                  {isMenuOpen ? (
                    <X className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Menu className='block h-6 w-6' aria-hidden='true' />
                  )}
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Desktop SubNav */}
          <div className='hidden md:block border-t border-gray-200'>
            <SubNavCategories />
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className='md:hidden'
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                  <motion.a
                    href='/'
                    className='text-gray-600 hover:text-[#89AC46] block px-3 py-2 rounded-md text-base font-medium'
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    Home
                  </motion.a>

                  {["Sale", "About", "Contact"].map((item, index) => (
                    <motion.a
                      key={item}
                      href={`/${item.toLowerCase()}`}
                      className='text-gray-600 hover:text-[#89AC46] block px-3 py-2 rounded-md text-base font-medium'
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>

                {/* Mobile SubNav */}
                <div className='border-t border-gray-200'>
                  <SubNavCategories />
                </div>

                <div className='pt-4 pb-3 border-t border-gray-200'>
                  <div className='flex items-center px-5'>
                    <div className='relative w-full'>
                      <input
                        type='text'
                        placeholder='Search medical supplies...'
                        className='w-full bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-[#89AC46]'
                      />
                      <Search className='absolute left-3 top-2.5 h-5 w-5 text-gray-400' />
                    </div>
                  </div>
                  <div className='mt-3 px-2 space-y-1'>
                    <motion.button
                      onClick={handleCartClick}
                      className='flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#89AC46] hover:bg-gray-100'
                      whileHover={{ backgroundColor: "#F3F4F6" }}
                    >
                      <ShoppingCart className='mr-3 h-6 w-6' />
                      Cart
                    </motion.button>
                    {!isLoggedIn ? (
                      <motion.button
                        onClick={handleLogin}
                        className='flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#89AC46] hover:bg-gray-100'
                        whileHover={{ backgroundColor: "#F3F4F6" }}
                      >
                        <User className='mr-3 h-6 w-6' />
                        Login/Register
                      </motion.button>
                    ) : (
                      <motion.button
                        onClick={handleLogout}
                        className='flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#89AC46] hover:bg-gray-100'
                        whileHover={{ backgroundColor: "#F3F4F6" }}
                      >
                        <User className='mr-3 h-6 w-6' />
                        Logout
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  );
};

export default Navbar;
