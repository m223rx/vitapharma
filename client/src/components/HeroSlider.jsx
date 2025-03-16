"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import slide1 from "../assets/images/banners/slide1.jpg";
import slide2 from "../assets/images/banners/slide2.jpg";
import slide3 from "../assets/images/banners/slide3.jpg";

const slides = [
  {
    id: 1,
    title: "Welcome to VitaPharma",
    description: "Discover amazing products at unbeatable prices",
    image: slide1,
    link: "/products",
  },
  {
    id: 2,
    title: "New Arrivals",
    description: "Explore our latest fashion trends",
    image: slide2,
    link: "/new-arrivals",
  },
  {
    id: 3,
    title: "Special Offers",
    description: "Up to 50% off on selected items",
    image: slide3,
    link: "/sale",
  },
];

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const HeroSlider = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  const slideIndex = ((page % slides.length) + slides.length) % slides.length;

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setPage([page + 1, 1]);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, page]);

  const paginate = (newDirection) => {
    setIsAutoPlaying(false);
    setPage([page + newDirection, newDirection]);
  };

  const handleDotClick = (index) => {
    setIsAutoPlaying(false);
    setPage([index, index > page ? 1 : -1]);
  };

  const handleSlideClick = () => {
    navigate(slides[slideIndex].link);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <motion.section
      className='relative h-[600px] bg-[#89AC46] overflow-hidden'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag='x'
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className='absolute inset-0 cursor-pointer'
          onClick={handleSlideClick}
        >
          <div className='absolute inset-0 bg-black opacity-40 z-10' />
          <img
            src={slides[slideIndex].image || "/placeholder.svg"}
            alt={slides[slideIndex].title}
            className='w-full h-full object-cover'
          />
          <div className='absolute inset-0 z-20 flex flex-col items-center justify-center text-white'>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className='mb-4 text-4xl font-bold md:text-5xl lg:text-6xl text-center'
            >
              {slides[slideIndex].title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className='mb-8 text-xl text-center'
            >
              {slides[slideIndex].description}
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='rounded-full bg-white px-8 py-3 text-lg font-semibold text-[#89AC46] transition duration-300 hover:bg-[#626F47] hover:text-white cursor-pointer'
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.button
        className='absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-[#89AC46] backdrop-blur-sm text-white hover:bg-[#89AC46]/30 transition-colors cursor-pointer'
        onClick={() => paginate(-1)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft className='w-6 h-6' />
      </motion.button>

      <motion.button
        className='absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-[#89AC46] backdrop-blur-sm text-white hover:bg-[#89AC46]/30 transition-colors cursor-pointer'
        onClick={() => paginate(1)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight className='w-6 h-6' />
      </motion.button>

      <div className='absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2'>
        {slides.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full ${
              slideIndex === index ? "bg-[#89AC46]" : "bg-white/50"
            }`}
            onClick={() => handleDotClick(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default HeroSlider;
