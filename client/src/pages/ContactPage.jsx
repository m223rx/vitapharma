"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <motion.div
        className='container mx-auto px-4 py-8'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <motion.div className='text-center mb-12' variants={itemVariants}>
          <h1 className='text-4xl font-bold text-gray-800 mb-4'>Contact Us</h1>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto'>
          <motion.div
            className='bg-white rounded-lg shadow-lg p-8'
            variants={itemVariants}
          >
            <h2 className='text-2xl font-semibold mb-6'>Get in Touch</h2>
            <div className='space-y-6'>
              <motion.div className='flex items-center' whileHover={{ x: 5 }}>
                <div className='w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center'>
                  <Phone className='h-6 w-6 text-[#89AC46]' />
                </div>
                <div className='ml-4'>
                  <h3 className='text-lg font-medium'>Phone</h3>
                  <p className='text-gray-600'>+216 71 123 456</p>
                </div>
              </motion.div>

              <motion.div className='flex items-center' whileHover={{ x: 5 }}>
                <div className='w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center'>
                  <Mail className='h-6 w-6 text-[#89AC46]' />
                </div>
                <div className='ml-4'>
                  <h3 className='text-lg font-medium'>Email</h3>
                  <p className='text-gray-600'>contact@vitapharma.tn</p>
                </div>
              </motion.div>

              <motion.div className='flex items-center' whileHover={{ x: 5 }}>
                <div className='w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center'>
                  <MapPin className='h-6 w-6 text-[#89AC46]' />
                </div>
                <div className='ml-4'>
                  <h3 className='text-lg font-medium'>Address</h3>
                  <p className='text-gray-600'>
                    123 Medical Avenue, Tunis, Tunisia
                  </p>
                </div>
              </motion.div>

              <motion.div className='flex items-center' whileHover={{ x: 5 }}>
                <div className='w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center'>
                  <Clock className='h-6 w-6 text-[#89AC46]' />
                </div>
                <div className='ml-4'>
                  <h3 className='text-lg font-medium'>Business Hours</h3>
                  <p className='text-gray-600'>Mon - Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </motion.div>
            </div>

            <div className='mt-8'>
              <iframe
                title='map'
                className='w-full h-64 rounded-lg'
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102239.97813238266!2d10.1016261!3d36.8064948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd337f5e7ef543%3A0xd671924e714a0275!2sTunis%2C%20Tunisia!5e0!3m2!1sen!2sus!4v1647887573777!5m2!1sen!2sus'
                loading='lazy'
              ></iframe>
            </div>
          </motion.div>

          <motion.div
            className='bg-white rounded-lg shadow-lg p-8'
            variants={itemVariants}
          >
            <h2 className='text-2xl font-semibold mb-6'>Send us a Message</h2>
            <form onSubmit={handleSubmit} className='space-y-6'>
              <motion.div variants={itemVariants} whileHover={{ y: -2 }}>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Your Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ y: -2 }}>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Email Address
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ y: -2 }}>
                <label
                  htmlFor='subject'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Subject
                </label>
                <input
                  type='text'
                  id='subject'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants} whileHover={{ y: -2 }}>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  rows='4'
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                  required
                ></textarea>
              </motion.div>

              <motion.button
                type='submit'
                className='w-full bg-[#89AC46] text-white py-3 px-6 rounded-md hover:bg-[#626F47] transition-colors duration-300 flex items-center justify-center cursor-pointer'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className='w-5 h-5 mr-2' />
                Send Message
              </motion.button>
            </form>

            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className='mt-4 p-4 bg-green-100 text-green-700 rounded-md flex items-center'
                >
                  <CheckCircle className='w-5 h-5 mr-2' />
                  Thank you! Your message has been sent successfully.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
