import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import image from "../../assets/images/banners/woman_applying_skincare.jpg";
import { useNavigate } from "react-router-dom";

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

function SunCare() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("FACE");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const sliderRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, products.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const slidePercentage = 100 / itemsPerView;

  const handleButtonClick = () => {
    navigate("/products");
  };

  const handleProductDetailsClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <section className='bg-white py-8 md:py-16'>
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
              <div className='absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white'>
                <h2 className='mb-2 text-2xl md:text-3xl font-bold'>
                  Sun Care
                </h2>
                <button
                  className='rounded-full bg-[#89AC46] px-4 py-2 md:px-6 md:py-2 text-xs md:text-sm font-medium text-white transition-colors hover:bg-[#626F47] cursor-pointer flex items-center justify-between gap-2'
                  onClick={handleButtonClick}
                >
                  ALL PRODUCTS{" "}
                  <i>
                    <ChevronRight className='h-4 w-4 md:h-6 md:w-6 text-white' />
                  </i>
                </button>
              </div>
            </div>
          </motion.div>

          <div className='lg:w-2/3'>
            <div className='mb-4 md:mb-8 flex'>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-2 md:px-6 md:py-3 text-xs md:text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? "bg-[#89AC46] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className='relative aspect-[1/1] sm:aspect-[3/2] md:aspect-[5/3] cursor-pointer'>
              <div className='absolute inset-0'>
                <div
                  ref={sliderRef}
                  className='relative h-full overflow-hidden'
                >
                  <motion.div
                    className='flex h-full'
                    animate={{ x: `${-currentIndex * slidePercentage}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    {products.map((product) => (
                      <motion.div
                        key={product.id}
                        className={`flex-shrink-0 p-1 md:p-2`}
                        style={{ width: `${slidePercentage}%` }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                      >
                        <div
                          className='group relative h-full rounded-lg bg-white p-2 sm:p-4 md:p-6 lg:p-10 shadow-md transition-shadow hover:shadow-lg'
                          onClick={() => handleProductDetailsClick(product.id)}
                        >
                          <div className='absolute left-1 top-1 md:left-2 md:top-2 z-10 rounded bg-red-600 px-1 py-0.5 md:px-2 md:py-1 text-[10px] md:text-xs font-bold text-white'>
                            -{product.discount}%
                          </div>

                          {product.isHot && (
                            <div className='absolute right-1 top-1 md:right-2 md:top-2 z-10 rounded bg-yellow-500 px-1 py-0.5 md:px-2 md:py-1 text-[10px] md:text-xs font-bold text-white'>
                              HOT
                            </div>
                          )}

                          <div className='mb-2 md:mb-4 h-[40%] overflow-hidden rounded-lg'>
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                            />
                          </div>

                          <div className='flex flex-col justify-between h-[60%]'>
                            <div>
                              <h3 className='mb-0.5 md:mb-1 text-xs md:text-sm font-bold text-gray-600'>
                                {product.brand}
                              </h3>

                              <h4 className='mb-1 md:mb-2 text-xs md:text-sm font-medium text-gray-800 line-clamp-2'>
                                {product.name}
                              </h4>

                              <div className='mb-2 md:mb-3 flex'>
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 md:h-4 md:w-4 ${
                                      i < product.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>

                            <div>
                              <div className='mb-2 md:mb-4 flex items-center space-x-1 md:space-x-2'>
                                <span className='text-sm md:text-lg font-bold text-[#89AC46]'>
                                  {product.discountedPrice.toFixed(3)}DT
                                </span>
                                <span className='text-xs md:text-sm text-gray-500 line-through'>
                                  {product.originalPrice.toFixed(3)}DT
                                </span>
                              </div>

                              <button className='flex w-full items-center justify-center rounded-full border-2 border-[#89AC46] bg-white px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium text-[#89AC46] transition-colors hover:bg-[#89AC46] hover:text-white cursor-pointer'>
                                <ShoppingCart className='mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4' />
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                <button
                  onClick={prevSlide}
                  className={`absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-1 md:p-2 shadow-md transition-opacity ${
                    currentIndex === 0
                      ? "opacity-50"
                      : "opacity-100 hover:bg-white"
                  }`}
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft className='h-4 w-4 md:h-6 md:w-6 text-gray-800' />
                </button>
                <button
                  onClick={nextSlide}
                  className={`absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-1 md:p-2 shadow-md transition-opacity ${
                    currentIndex === maxIndex
                      ? "opacity-50"
                      : "opacity-100 hover:bg-white"
                  }`}
                  disabled={currentIndex === maxIndex}
                >
                  <ChevronRight className='h-4 w-4 md:h-6 md:w-6 text-gray-800' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SunCare;
