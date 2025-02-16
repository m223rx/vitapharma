import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image:
      "https://www.sbsmobile.com/ita/305114-thickbox_default/floxy-headphones.jpg",
    rating: 4,
    description:
      "Experience crystal-clear sound with our wireless headphones. Enjoy long battery life and superior comfort.",
  },
  {
    id: 2,
    name: "Smartwatch",
    price: 149.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO4touz92RkST3TQDgbSums2rtrdL1UGWlHg&s",
    rating: 5,
    description:
      "Stay connected and track your fitness goals with our advanced smartwatch.",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: 59.99,
    image: "https://m.media-amazon.com/images/I/71fEUcsDDEL.jpg",
    rating: 3,
    description:
      "Enhance your gaming experience with precision tracking and customizable buttons.",
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 129.99,
    image: "https://m.media-amazon.com/images/I/71fRP7KY9hL._AC_SL1500_.jpg",
    rating: 5,
    description:
      "A high-quality mechanical keyboard with customizable RGB lighting for ultimate performance.",
  },
];

function ProductDetailsPage() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === Number(productId));
  const [hovered, setHovered] = useState(false);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-semibold text-gray-600">
        Product not found.
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="container mx-auto px-6 py-12"
    >
      <div className="flex flex-col md:flex-row items-center">
        {/* Product Image */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 0.5 }}
          className="md:w-1/2 overflow-hidden"
        >
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md rounded-lg"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            animate={hovered ? { scale: 1.2 } : { scale: 1 }}
            transition={{ duration: 0.1 }}  
          />
        </motion.div>

        {/* Product Details */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:w-1/2 md:pl-10"
        >
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="mt-3 text-lg text-gray-600">{product.description}</p>
          <div className="mt-4 flex items-center">
            <span className="text-2xl font-semibold text-indigo-600">
              ${product.price}
            </span>
            <div className="ml-4 flex items-center">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-yellow-400 ${
                    i < product.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="mt-6 flex items-center cursor-pointer justify-center rounded-lg bg-indigo-600 px-6 py-3 text-white text-lg font-semibold hover:bg-indigo-700 transition"
          >
            <FaShoppingCart className="mr-2" />
            Add to Cart
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProductDetailsPage;
