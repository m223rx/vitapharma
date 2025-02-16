import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import loginImage from "../assets/login.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='md:w-1/2'>
        <img
          src={loginImage}
          alt='Login'
          className='h-full w-full object-contain'
        />
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className='flex flex-col justify-center p-8 md:w-1/2'
      >
        <h2 className='mb-6 text-3xl font-bold text-gray-800'>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='mb-2 block text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <div className='relative'>
              <input
                type='email'
                id='email'
                onChange={handleChange}
                value={formData.email}
                className='w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 placeholder-gray-700'
                placeholder='john.doe@example.com'
                required
              />
              <Mail className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
            </div>
          </div>
          <div className='mb-6'>
            <label
              htmlFor='password'
              className='mb-2 block text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <div className='relative'>
              <input
                type='password'
                id='password'
                onChange={handleChange}
                value={formData.password}
                className='w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 placeholder-gray-700'
                placeholder='********'
                required
              />
              <Lock className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
            </div>
          </div>
          <button
            type='submit'
            onClick={handleSubmit}
            className='w-full rounded-lg bg-indigo-600 p-3 text-white transition duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 cursor-pointer'
          >
            Log In
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
