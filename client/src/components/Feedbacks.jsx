"use client";
import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import image from "../assets/images/user/user.jpg";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: image,
    rating: 5,
    comment:
      "The products are amazing! My skin has never felt better. I've been using them for a month and already see results.",
  },
  {
    id: 2,
    name: "Michael Chen",
    image: image,
    rating: 4,
    comment:
      "Great customer service and fast shipping. The sunscreen works perfectly for my sensitive skin.",
  },
  {
    id: 3,
    name: "Emma Williams",
    image: image,
    rating: 5,
    comment:
      "I've tried many skincare brands, but this one truly stands out. Will definitely purchase again!",
  },
  {
    id: 4,
    name: "David Rodriguez",
    image: image,
    rating: 5,
    comment:
      "The quality of these products is exceptional. Worth every penny and the results speak for themselves.",
  },
  {
    id: 5,
    name: "Olivia Taylor",
    image: image,
    rating: 4,
    comment:
      "I love how gentle yet effective these products are. Perfect for my daily skincare routine.",
  },
];

function Feedbacks() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  const getItemsToShow = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }
    return 3;
  };

  const [itemsToShow, setItemsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(getItemsToShow());
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsToShow);

  useEffect(() => {
    if (isPaused) return;

    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, maxIndex, isPaused]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <section className='py-16 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mb-12 text-center text-3xl font-bold'
        >
          What Our Customers Say
        </motion.h2>

        <div
          className='relative mx-auto max-w-7xl'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className='overflow-hidden px-4'>
            <motion.div
              className='flex'
              initial={{ x: 0 }}
              animate={{ x: `${-currentIndex * (100 / itemsToShow)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {testimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  className={`flex-shrink-0 px-3`}
                  style={{ width: `${100 / itemsToShow}%` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className='h-full rounded-lg bg-white p-6 shadow-md'>
                    <div className='mb-4 flex items-center'>
                      <div className='mr-4 h-12 w-12 rounded-full bg-gray-200 overflow-hidden'>
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className='h-full w-full object-cover'
                        />
                      </div>
                      <div>
                        <h3 className='font-semibold'>{testimonial.name}</h3>
                        <div className='flex'>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className='text-gray-600'>"{testimonial.comment}"</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <button
            onClick={prevSlide}
            className={`absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-opacity ${
              currentIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100 hover:bg-gray-100"
            }`}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className='h-6 w-6 text-gray-800' />
          </button>

          <button
            onClick={nextSlide}
            className={`absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-opacity ${
              currentIndex === maxIndex
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100 hover:bg-gray-100"
            }`}
            disabled={currentIndex === maxIndex}
          >
            <ChevronRight className='h-6 w-6 text-gray-800' />
          </button>

          <div className='mt-8 flex justify-center space-x-2'>
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  currentIndex === index ? "bg-[#89AC46]" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Feedbacks;
