"use client";
import { motion } from "framer-motion";

function GetInTouch() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='bg-[#89AC46] py-16 text-white'
      >
        <div className='container mx-auto px-4'>
          <div className='flex flex-col items-center text-center'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='mb-4 text-3xl font-bold'
            >
              Subscribe to Our Newsletter
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className='mb-8 text-lg'
            >
              Stay updated with our latest offers and products
            </motion.p>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className='flex w-full max-w-md flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'
            >
              <input
                type='email'
                placeholder='Enter your email'
                className='w-full rounded-full border-1 border-white px-4 py-2 text-gray-800 placeholder-white focus:outline-none focus:ring-2 focus:ring-white'
              />
              <motion.button
                type='submit'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='rounded-full bg-white px-6 py-2 font-semibold text-[#89AC46] transition duration-300 hover:bg-[#626F47]  hover:text-white cursor-pointer'
              >
                Subscribe
              </motion.button>
            </motion.form>
          </div>
        </div>
      </motion.section>
    </>
  );
}

export default GetInTouch;
