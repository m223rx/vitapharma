import React, { useState, useEffect } from "react";
import { products } from "../data/products";
import { Star, ShoppingCart } from "lucide-react";

const SalePage = () => {
  const [saleProducts, setSaleProducts] = useState([]);

  useEffect(() => {
    const discountedProducts = products.filter(
      (product) => product.discountedPrice !== null
    );
    setSaleProducts(discountedProducts);
  }, []);

  const calculateDiscount = (original, discounted) => {
    return Math.round(((original - discounted) / original) * 100);
  };

  return (
    <div className='min-h-screen bg-gray-100'>
      <main className='container mx-auto px-4 py-8'>
        <h1 className='mb-8 text-center text-4xl font-bold text-[#89AC46]'>
          On Sale Items
        </h1>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {saleProducts.map((product) => (
            <div
              key={product.id}
              className='overflow-hidden rounded-lg bg-white shadow-lg transition duration-300 hover:shadow-xl'
            >
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className='h-48 w-full object-contain'
              />
              <div className='p-4'>
                <h2 className='mb-2 text-xl font-semibold'>{product.name}</h2>
                <p className='mb-2 text-sm text-gray-600'>{product.category}</p>
                <div className='mb-2 flex items-center'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                  <span className='ml-2 text-sm text-gray-600'>
                    ({product.reviewCount})
                  </span>
                </div>
                <div className='mb-2 flex items-center'>
                  <span className='text-2xl font-bold text-[#89AC46]'>
                    ${product.discountedPrice.toFixed(2)}
                  </span>
                  <span className='ml-2 text-sm text-gray-500 line-through'>
                    ${product.price.toFixed(2)}
                  </span>
                  <span className='ml-2 rounded-full bg-red-100 px-2 py-1 text-sm font-semibold text-red-600'>
                    {calculateDiscount(product.price, product.discountedPrice)}%
                    OFF
                  </span>
                </div>
                <p className='mb-4 text-sm text-gray-600'>
                  {product.description}
                </p>
                <button className='flex w-full items-center justify-center rounded-full bg-[#89AC46] px-4 py-2 text-white transition duration-300 hover:bg-[#626F47] cursor-pointer'>
                  <ShoppingCart className='mr-2 h-5 w-5' />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SalePage;
