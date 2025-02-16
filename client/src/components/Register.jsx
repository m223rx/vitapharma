import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Lock, ChevronRight } from "lucide-react";

import registerImage from "../assets/register.png";

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    if (e.target.value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log("Form submitted:", formData, "OTP:", otp.join(""));
    }
  };

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='md:w-1/2'>
        <img
          src={registerImage}
          alt='Register'
          className='h-full w-full object-contain'
        />
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className='flex flex-col justify-center p-8 md:w-1/2'
      >
        <h2 className='mb-6 text-3xl font-bold text-gray-800'>
          Create an Account
        </h2>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className='mb-4 grid grid-cols-2 gap-4'>
                <div>
                  <label
                    htmlFor='firstName'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    First Name
                  </label>
                  <div className='relative'>
                    <input
                      type='text'
                      id='firstName'
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder='John'
                      className='w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 placeholder-gray-700'
                      required
                    />
                    <User className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor='lastName'
                    className='mb-2 block text-sm font-medium text-gray-700'
                  >
                    Last Name
                  </label>
                  <div className='relative'>
                    <input
                      type='text'
                      id='lastName'
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder='Doe'
                      className='w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 placeholder-gray-700'
                      required
                    />
                    <User className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                  </div>
                </div>
              </div>
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
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='john.doe@example.com'
                    className='w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 placeholder-gray-700'
                    required
                  />
                  <Mail className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                </div>
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='phone'
                  className='mb-2 block text-sm font-medium text-gray-700'
                >
                  Phone Number
                </label>
                <div className='relative'>
                  <input
                    type='tel'
                    id='phone'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder='+1 (123) 456-7890'
                    className='w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 placeholder-gray-700'
                    required
                  />
                  <Phone className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                </div>
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='address'
                  className='mb-2 block text-sm font-medium text-gray-700'
                >
                  Address
                </label>
                <div className='relative'>
                  <input
                    type='text'
                    id='address'
                    name='address'
                    value={formData.address}
                    onChange={handleChange}
                    placeholder='123 Main St'
                    className='w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 placeholder-gray-700'
                    required
                  />
                  <MapPin className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                </div>
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='country'
                  className='mb-2 block text-sm font-medium text-gray-700'
                >
                  Country
                </label>
                <select
                  id='country'
                  name='country'
                  value={formData.country}
                  onChange={handleChange}
                  className='w-full rounded-lg border border-gray-300 p-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 placeholder-gray-700'
                  required
                >
                  <option value=''>Select a country</option>
                  <option value='US'>United States</option>
                  <option value='CA'>Canada</option>
                  <option value='UK'>United Kingdom</option>
                  <option value='AU'>Australia</option>
                </select>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className='mb-4'>
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
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='********'
                    className='w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 placeholder-gray-700'
                    required
                  />
                  <Lock className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                </div>
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='confirmPassword'
                  className='mb-2 block text-sm font-medium text-gray-700'
                >
                  Confirm Password
                </label>
                <div className='relative'>
                  <input
                    type='password'
                    id='confirmPassword'
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    placeholder='********'
                    onChange={handleChange}
                    className='w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 placeholder-gray-700'
                    required
                  />
                  <Lock className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className='mb-4 text-center text-sm text-gray-600'>
                Please enter the 6-digit OTP sent to your email.
              </p>
              <div className='mb-6 flex justify-center space-x-2'>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type='text'
                    id={`otp-${index}`}
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    maxLength={1}
                    placeholder='-'
                    className='h-12 w-12 rounded-lg border border-gray-300 text-center text-xl focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 placeholder-gray-700'
                  />
                ))}
              </div>
            </motion.div>
          )}

          <button
            type='submit'
            className='flex w-full items-center justify-center rounded-lg bg-indigo-600 p-3 text-white transition duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50 placeholder-gray-700'
          >
            {step < 3 ? (
              <>
                Next <ChevronRight className='ml-2 h-5 w-5' />
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
