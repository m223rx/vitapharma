"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

function HotSalesDiv() {
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='bg-[#89AC46] py-12'
      >
        <div className='container mx-auto px-4'>
          <div className='flex flex-col items-center text-center md:flex-row md:justify-between md:text-left'>
            <div className='mb-4 md:mb-0'>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className='mb-2 text-2xl font-bold text-[#fff]'
              >
                Hot Sales!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className='text-lg text-[#fff]'
              >
                Get up to 50% off on selected items
              </motion.p>
            </div>
            <motion.a
              href='#'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='flex items-center rounded-full bg-[#fff] px-6 py-2 text-[#89AC46] transition duration-300 hover:bg-[#626F47] hover:text-white'
            >
              Shop Now <ArrowRight className='ml-2 h-5 w-5' />
            </motion.a>
          </div>
        </div>
      </motion.section>
    </>
  );
}

export default HotSalesDiv;
