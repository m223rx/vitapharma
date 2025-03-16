import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

import image from "../assets/images/user/user.jpg";

function Feedbacks() {
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
            What Our Customers Say
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'
          >
            {[1, 2, 3].map((testimonial) => (
              <motion.div
                key={testimonial}
                variants={itemVariants}
                className='rounded-lg bg-white p-6 shadow-md'
              >
                <div className='mb-4 flex items-center'>
                  <div className='mr-4 h-12 w-12 rounded-full bg-gray-200'>
                    <img
                      src={image}
                      alt='User'
                      className='h-12 w-12 rounded-full'
                    />
                  </div>
                  <div>
                    <h3 className='font-semibold'>Customer Name</h3>
                    <div className='flex'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className='h-4 w-4 fill-yellow-400 text-yellow-400'
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className='text-gray-600'>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean euismod bibendum laoreet."
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Feedbacks;
