import React from 'react';

import contactImage from "../assets/contact.png"

function AboutPage() {
  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left side text */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl font-extrabold text-[#89AC46] mb-4">
              Welcome to Our Marketplace
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              We provide a seamless shopping experience, offering a wide range of products for every need. Whether you're looking for the latest tech gadgets, stylish apparel, or home essentials, you'll find it all here.
            </p>
            <p className="text-lg text-gray-700">
              Our mission is to connect buyers and sellers, providing a platform where you can shop with confidence and discover great deals. We believe in creating a marketplace that is convenient, secure, and offers excellent customer service.
            </p>
          </div>

          {/* Right side image */}
          <div className="lg:w-1/2 lg:mt-0">
            <img 
              src={contactImage}
              alt="Marketplace" 
              className="rounded-lg w-full h-auto"
            />
          </div>
        </div>

        {/* Additional section (optional) */}
        <div className="mb-7 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h3>
          <p className="text-lg text-gray-600">
            Our marketplace offers unique features such as secure payments, fast shipping, and a wide selection of trusted sellers. Join us today and be part of a growing community of satisfied customers!
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
