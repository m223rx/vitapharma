import React from "react";
import { motion } from "framer-motion";

function FeaturedCategories() {
  const categoryIcons = {
    Face: "https://www.skincenterofsouthmiami.com/wp-content/uploads/2018/06/Skin-Center-of-South-Miami-Facials-and-Skin-Care.jpg",
    Body: "https://n.nordstrommedia.com/it/74e510ba-45a9-4056-a6c9-40f879ec10f4.jpeg?h=600&w=750",
    Health:
      "https://www.alimed.com/_resources/cache/images/category/932271_278x278-pad.jpg",
    Beauty:
      "https://static.independent.co.uk/2022/04/21/21/health%20and%20beauty.jpg?width=1200&height=1200&fit=crop",
    Hair: "https://imgs.littleextralove.com/wp-content/uploads/2022/08/what-is-an-ideal-hair-care-routine-for-a-whole-week-feat.jpg",
    Food: "https://cdn.mos.cms.futurecdn.net/pDRCwL6fuJyh5wdkTCg7NL.jpg",
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
                <div className='mb-2 flex h-16 w-16 items-center justify-center rounded-full overflow-hidden bg-gray-100'>
                  <img
                    src={categoryIcons[category]}
                    alt=''
                    className='h-full w-full object-cover'
                  />
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
