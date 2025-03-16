"use client";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { allProducts } from "../data/allProducts";

function PopularProducts() {
  const navigate = useNavigate();
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

  const handleProductDetailsClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <section className='bg-white py-16'>
        <div className='container mx-auto px-4'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className='mb-8 text-center text-3xl font-bold'
          >
            Popular Products
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          >
            {allProducts.slice(0, 4).map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className='rounded-lg border p-4 shadow-sm cursor-pointer'
                onClick={() => handleProductDetailsClick(product.id)}
              >
                <div className='mb-4 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200'>
                  <img
                    src={product.image}
                    alt={`Product ${product}`}
                    className='object-cover'
                  />
                </div>
                <h3 className='mb-2 text-lg font-semibold'>{product.name}</h3>
                <div className='mb-2 flex items-center'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300 fill-gray-300"
                      }`}
                    />
                  ))}
                  <span className='ml-2 text-sm text-gray-600'>
                    ({product.reviewCount})
                  </span>
                </div>
                <p className='mb-4 text-xl font-bold'>${product.price}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='w-full cursor-pointer rounded-full bg-[#89AC46] py-2 text-white transition duration-300 hover:bg-[#626F47]'
                >
                  Add to Cart
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default PopularProducts;
