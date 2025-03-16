"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";
import image from "../assets/images/banners/food_supplements.jpg";
import { useNavigate } from "react-router-dom";

const latestProducts = [
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
  {
    id: 5,
    brand: "BIODERMA",
    name: "BIODERMA Photoderm MAX Aquafluide SPF50+",
    image: image,
    rating: 5,
    originalPrice: 59.99,
    discountedPrice: 49.99,
    discount: 17,
    isHot: true,
  },
  {
    id: 6,
    brand: "AVENE",
    name: "AVENE Cleanance Sunscreen SPF50+",
    image: image,
    rating: 4,
    originalPrice: 54.5,
    discountedPrice: 45.99,
    discount: 16,
    isHot: false,
  },
  {
    id: 7,
    brand: "EUCERIN",
    name: "EUCERIN Sun Oil Control Gel-Cream SPF50+",
    image: image,
    rating: 5,
    originalPrice: 69.99,
    discountedPrice: 59.99,
    discount: 14,
    isHot: false,
  },
  {
    id: 8,
    brand: "VICHY",
    name: "VICHY Capital Soleil UV-Age Daily SPF50+",
    image: image,
    rating: 4,
    originalPrice: 74.5,
    discountedPrice: 67.99,
    discount: 9,
    isHot: true,
  },
  {
    id: 9,
    brand: "HELIOCARE",
    name: "HELIOCARE 360° Gel Oil-Free SPF50",
    image: image,
    rating: 5,
    originalPrice: 84.99,
    discountedPrice: 76.5,
    discount: 10,
    isHot: false,
  },
  {
    id: 10,
    brand: "URIAGE",
    name: "URIAGE Bariésun Fragrance-Free Cream SPF50+",
    image: image,
    rating: 4,
    originalPrice: 49.99,
    discountedPrice: 42.99,
    discount: 14,
    isHot: false,
  },
];

function LatestProducts() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const categories = [
    { id: "all", name: "All Products" },
    { id: "new", name: "New Arrivals" },
    { id: "featured", name: "Featured" },
    { id: "bestsellers", name: "Bestsellers" },
  ];

  const displayedProducts = latestProducts;

  const handleProductDetailsClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <section className='bg-white py-16'>
      <div className='container mx-auto px-4'>
        <div className='mb-10 text-center'>
          <motion.h2
            className='mb-4 text-3xl font-bold'
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Latest Products
          </motion.h2>
          <motion.p
            className='mx-auto max-w-2xl text-gray-600'
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover our newest collection of high-quality skincare products
          </motion.p>
        </div>

        <div className='mb-10 flex flex-wrap justify-center gap-2'>
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-colors cursor-pointer ${
                activeTab === category.id
                  ? "bg-[#89AC46] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
          {displayedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className='group relative rounded-lg bg-white p-3 shadow-md transition-shadow hover:shadow-lg cursor-pointer'
              onClick={() => handleProductDetailsClick(product.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 + (index % 6) * 0.05 }}
            >
              <div className='absolute left-2 top-2 z-10 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                -{product.discount}%
              </div>
              {product.isHot && (
                <div className='absolute right-2 top-2 z-10 rounded bg-yellow-500 px-2 py-1 text-xs font-bold text-white'>
                  HOT
                </div>
              )}

              <div className='mb-3 aspect-square overflow-hidden rounded-lg'>
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
                />
              </div>

              <div className='flex flex-col justify-between h-[120px]'>
                <div>
                  <h3 className='mb-1 text-xs font-bold text-gray-600'>
                    {product.brand}
                  </h3>
                  <h4 className='mb-2 text-xs font-medium text-gray-800 line-clamp-2'>
                    {product.name}
                  </h4>
                  <div className='mb-2 flex'>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < product.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className='mb-2 flex items-center space-x-2'>
                    <span className='text-sm font-bold text-[#89AC46]'>
                      {product.discountedPrice.toFixed(3)}DT
                    </span>
                    <span className='text-xs text-gray-500 line-through'>
                      {product.originalPrice.toFixed(3)}DT
                    </span>
                  </div>
                  <button className='flex w-full items-center justify-center rounded-full border border-[#89AC46] bg-white px-2 py-1 text-xs font-medium text-[#89AC46] transition-colors hover:bg-[#89AC46] hover:text-white cursor-pointer'>
                    <ShoppingCart className='mr-1 h-3 w-3' />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LatestProducts;
