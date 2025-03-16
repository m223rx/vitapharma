"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import image from "../../assets/images/banners/face_care.webp";

const products = [
  {
    id: 1,
    brand: "SVR",
    name: "SVR SUN SECURE BLUR SPF50+",
    image: image,
    rating: 5,
    originalPrice: 64.769,
    discountedPrice: 51.45,
    discount: 21,
    isHot: true,
  },
  {
    id: 2,
    brand: "LA ROCHE-POSAY",
    name: "LA ROCHE POSAY PACK ANTHELIOS",
    image: image,
    rating: 4,
    originalPrice: 79.016,
    discountedPrice: 59.989,
    discount: 24,
    isHot: false,
  },
  {
    id: 3,
    brand: "SENSILIS",
    name: "SENSILIS Water Fluid SPF50+ 40ml",
    image: image,
    rating: 5,
    originalPrice: 64.26,
    discountedPrice: 51.408,
    discount: 20,
    isHot: false,
  },
  {
    id: 4,
    brand: "ISDIN",
    name: "ISDIN Active Unify COLOR Fusion",
    image: image,
    rating: 4,
    originalPrice: 79.968,
    discountedPrice: 71.85,
    discount: 10,
    isHot: false,
  },
];

const categories = ["FACE", "BODY"];

function FacialCare() {
  const [activeCategory, setActiveCategory] = useState("FACE");
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const productsPerView = 3;
  const maxIndex = Math.max(0, products.length - productsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className='bg-white py-16'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col lg:flex-row lg:gap-8'>
          <motion.div
            className='mb-8 lg:mb-0 lg:w-1/3'
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className='relative aspect-[3/4] overflow-hidden rounded-lg'>
              <img
                src={image || "/placeholder.svg"}
                alt='Woman applying skincare'
                className='h-full w-full object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
              <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
                <h2 className='mb-2 text-3xl font-bold'>Sun Care</h2>
                <button className='rounded-full bg-[#89AC46] px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-[#00A066] cursor-pointer flex items-center justify-between gap-2'>
                  ALL PRODUCTS{" "}
                  <i>
                    <ChevronRight className='h-6 w-6 text-white' />
                  </i>
                </button>
              </div>
            </div>
          </motion.div>

          <div className='lg:w-2/3'>
            <div className='mb-8 flex'>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? "bg-[#89AC46] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className='relative aspect-[5/3] cursor-pointer'>
              <div className='absolute inset-0'>
                <div
                  ref={sliderRef}
                  className='relative h-full overflow-hidden'
                >
                  <motion.div
                    className='flex h-full'
                    animate={{ x: `${-currentIndex * 33.333}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    {products.map((product) => (
                      <motion.div
                        key={product.id}
                        className='w-1/3 flex-shrink-0 p-2'
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                      >
                        <div className='group relative h-full rounded-lg bg-white p-10 shadow-md transition-shadow hover:shadow-lg'>
                          <div className='absolute left-2 top-2 z-10 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                            -{product.discount}%
                          </div>
                          {product.isHot && (
                            <div className='absolute right-2 top-2 z-10 rounded bg-yellow-500 px-2 py-1 text-xs font-bold text-white'>
                              HOT
                            </div>
                          )}
                          <div className='mb-4 h-[40%] overflow-hidden rounded-lg'>
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                            />
                          </div>
                          <div className='flex flex-col justify-between h-[60%]'>
                            <div>
                              <h3 className='mb-1 text-sm font-bold text-gray-600'>
                                {product.brand}
                              </h3>
                              <h4 className='mb-2 text-sm font-medium text-gray-800'>
                                {product.name}
                              </h4>
                              <div className='mb-3 flex'>
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < product.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>

                            <div>
                              <div className='mb-4 flex items-center space-x-2'>
                                <span className='text-lg font-bold text-[#89AC46]'>
                                  {product.discountedPrice.toFixed(3)}DT
                                </span>
                                <span className='text-sm text-gray-500 line-through'>
                                  {product.originalPrice.toFixed(3)}DT
                                </span>
                              </div>
                              <button className='flex w-full items-center justify-center rounded-full border-2 border-[#89AC46] bg-white px-4 py-2 text-sm font-medium text-[#89AC46] transition-colors hover:bg-[#89AC46] hover:text-white'>
                                <ShoppingCart className='mr-2 h-4 w-4' />
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={prevSlide}
                  className={`absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition-opacity ${
                    currentIndex === 0
                      ? "opacity-50"
                      : "opacity-100 hover:bg-white"
                  }`}
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft className='h-6 w-6 text-gray-800' />
                </button>
                <button
                  onClick={nextSlide}
                  className={`absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md transition-opacity ${
                    currentIndex === maxIndex
                      ? "opacity-50"
                      : "opacity-100 hover:bg-white"
                  }`}
                  disabled={currentIndex === maxIndex}
                >
                  <ChevronRight className='h-6 w-6 text-gray-800' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FacialCare;
