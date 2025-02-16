import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify functions
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      !storedUser ||
      storedUser.email !== email ||
      storedUser.password !== password
    ) {
      toast.error("Invalid email or password!");
      return;
    }

    toast.success("Login successful!");
    localStorage.setItem("isAuthenticated", true);
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-[#FBFFE4]'>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className='w-full max-w-md bg-white p-6 shadow-lg rounded-2xl'
      >
        <h2 className='text-2xl font-semibold text-center text-blue-600 mb-6'>
          Login
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='relative'>
            <span className='absolute left-3 top-3 text-blue-500'>📧</span>
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 pl-10 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <div className='relative'>
            <span className='absolute left-3 top-3 text-blue-500'>🔒</span>
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 pl-10 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg'
          >
            Login
          </button>
        </form>
        <p className='text-sm text-gray-600 text-center mt-4'>
          Don't have an account?{" "}
          <Link to='/register' className='text-blue-500'>
            Sign up
          </Link>
        </p>
      </motion.div>
      {/* ToastContainer component to display the toast notifications */}
      <ToastContainer />
    </div>
  );
}
