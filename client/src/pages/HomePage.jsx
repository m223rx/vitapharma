import React from "react";
import { FcElectronics } from "react-icons/fc";
import { Star, ArrowRight } from "lucide-react";
import { FaTshirt, FaHome, FaStar, FaDumbbell, FaBook } from "react-icons/fa";

const categoryIcons = {
  Electronics: <FcElectronics />,
  Fashion: <FaTshirt className='text-blue-500' />,
  Home: <FaHome className='text-green-500' />,
  Beauty: <FaStar className='text-yellow-500' />,
  Sports: <FaDumbbell className='text-red-500' />,
  Books: <FaBook className='text-purple-500' />,
};

function HomePage() {

  return (
    <>
      <section className='bg-indigo-700 py-20 text-white'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col items-center text-center'>
            <h1 className='mb-4 text-4xl font-bold md:text-5xl lg:text-6xl'>
              Welcome to Pussy21
            </h1>
            <p className='mb-8 text-xl'>
              Discover amazing products at unbeatable prices
            </p>
            <a
              href='/products'
              className='rounded-full bg-white px-8 py-3 text-lg font-semibold text-indigo-700 transition duration-300 hover:bg-indigo-100'
            >
              Start Shopping
            </a>
          </div>
        </div>
      </section>
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <h2 className='mb-8 text-center text-3xl font-bold'>
            Featured Categories
          </h2>
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
            {Object.keys(categoryIcons).map((category, index) => (
              <a
                key={index}
                href='#'
                className='flex flex-col items-center rounded-lg bg-white p-4 shadow-md transition duration-300 hover:shadow-lg'
              >
                <div className='mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100'>
                  {categoryIcons[category]}
                </div>
                <span className='text-center font-medium'>{category}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className='bg-white py-16'>
        <div className='container mx-auto px-4'>
          <h2 className='mb-8 text-center text-3xl font-bold'>
            Popular Products
          </h2>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {[1, 2, 3, 4].map((product) => (
              <div key={product} className='rounded-lg border p-4 shadow-sm'>
                <div className='mb-4 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200'>
                  <img
                    src={`https://via.placeholder.com/300x300?text=Product+${product}`}
                    alt={`Product ${product}`}
                    className='object-cover'
                  />
                </div>
                <h3 className='mb-2 text-lg font-semibold'>Product Name</h3>
                <div className='mb-2 flex items-center'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className='h-5 w-5 fill-yellow-400 text-yellow-400'
                    />
                  ))}
                  <span className='ml-2 text-sm text-gray-600'>
                    (50 reviews)
                  </span>
                </div>
                <p className='mb-4 text-xl font-bold'>$99.99</p>
                <button className='w-full rounded-full bg-indigo-600 py-2 text-white transition duration-300 hover:bg-indigo-700 cursor-pointer'>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className='bg-indigo-100 py-12'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col items-center text-center md:flex-row md:justify-between md:text-left'>
            <div className='mb-4 md:mb-0'>
              <h2 className='mb-2 text-2xl font-bold text-indigo-800'>
                Hot Sales!
              </h2>
              <p className='text-lg text-indigo-600'>
                Get up to 50% off on selected items
              </p>
            </div>
            <a
              href='#'
              className='flex items-center rounded-full bg-indigo-600 px-6 py-2 text-white transition duration-300 hover:bg-indigo-700'
            >
              Shop Now <ArrowRight className='ml-2 h-5 w-5' />
            </a>
          </div>
        </div>
      </section>
      <section className='py-16'>
        <div className='container mx-auto px-4'>
          <h2 className='mb-8 text-center text-3xl font-bold'>
            What Our Customers Say
          </h2>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {[1, 2, 3].map((testimonial) => (
              <div
                key={testimonial}
                className='rounded-lg bg-white p-6 shadow-md'
              >
                <div className='mb-4 flex items-center'>
                  <div className='mr-4 h-12 w-12 rounded-full bg-gray-200'></div>
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
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className='bg-indigo-700 py-16 text-white'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col items-center text-center'>
            <h2 className='mb-4 text-3xl font-bold'>
              Subscribe to Our Newsletter
            </h2>
            <p className='mb-8 text-lg'>
              Stay updated with our latest offers and products
            </p>
            <form className='flex w-full max-w-md flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0'>
              <input
                type='email'
                placeholder='Enter your email'
                className='w-full rounded-full px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white border-white border-1 placeholder-white'
              />
              <button
                type='submit'
                className='rounded-full bg-white px-6 py-2 font-semibold text-indigo-700 transition duration-300 hover:bg-indigo-100'
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
