import React from "react";
import { motion } from "framer-motion";
import { FcElectronics } from "react-icons/fc";
import { CiFaceSmile } from "react-icons/ci";
import { FaTshirt, FaHome, FaStar, FaDumbbell, FaBook } from "react-icons/fa";

function FeaturedCategories() {
  const categoryIcons = {
    Face: <CiFaceSmile className='text-blue-500'/>,
    Fashion: <FaTshirt className='text-blue-500' />,
    Home: <FaHome className='text-green-500' />,
    Beauty: <FaStar className='text-yellow-500' />,
    Sports: <FaDumbbell className='text-red-500' />,
    Books: <FaBook className='text-purple-500' />,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <>
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='mb-8 text-center text-3xl font-bold'
          >
            Featured Categories
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
          >
            {Object.keys(categoryIcons).map((category, index) => (
              <motion.a
                key={index}
                href='#'
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='flex flex-col items-center rounded-lg bg-white p-4 shadow-md transition duration-300 hover:shadow-lg'
              >
                <div className='mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100'>
                  {categoryIcons[category]}
                </div>
                <span className='text-center font-medium'>{category}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default FeaturedCategories;
