"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ChevronRight,
  Heart,
  ArrowRight,
} from "lucide-react";

const initialCartItems = [
  {
    id: 1,
    name: "Professional Digital Blood Pressure Monitor",
    image: "https://placehold.co/300x300",
    price: 79.99,
    quantity: 1,
    variant: "Standard Package",
    brand: "MediTech",
    inStock: true,
    maxQuantity: 10,
  },
  {
    id: 2,
    name: "Professional Stethoscope",
    image: "https://placehold.co/300x300",
    price: 129.99,
    quantity: 2,
    variant: "Classic Edition",
    brand: "MediListen",
    inStock: true,
    maxQuantity: 5,
  },
  {
    id: 3,
    name: "Infrared Thermometer",
    image: "https://placehold.co/300x300",
    price: 39.99,
    quantity: 1,
    variant: "Standard",
    brand: "TempScan",
    inStock: true,
    maxQuantity: 8,
  },
];

const recommendedProducts = [
  {
    id: 4,
    name: "Pulse Oximeter",
    image: "https://placehold.co/300x300",
    price: 39.99,
    discountedPrice: 34.99,
    brand: "PulseCheck",
    rating: 4.7,
    reviewCount: 192,
  },
  {
    id: 5,
    name: "Digital Weighing Scale",
    image: "https://placehold.co/300x300",
    price: 59.99,
    discountedPrice: null,
    brand: "WeighWell",
    rating: 4.3,
    reviewCount: 76,
  },
  {
    id: 6,
    name: "First Aid Kit - Professional",
    image: "https://placehold.co/300x300",
    price: 79.99,
    discountedPrice: 69.99,
    brand: "SafeGuard",
    rating: 4.6,
    reviewCount: 27,
  },
  {
    id: 7,
    name: "Nebulizer Machine",
    image: "https://placehold.co/300x300",
    price: 69.99,
    discountedPrice: null,
    brand: "BreathEasy",
    rating: 4.8,
    reviewCount: 22,
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isPromoValid, setIsPromoValid] = useState(true);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 8.0;
  const tax = subtotal * 0.07;
  const discount = promoApplied ? promoDiscount : 0;
  const total = subtotal + shipping + tax - discount;

  const updateQuantity = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const moveToWishlist = (id) => {
    console.log(`Item ${id} moved to wishlist`);
    removeItem(id);
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "VitaPharmaIC20") {
      setPromoApplied(true);
      setPromoDiscount(subtotal * 0.2);
      setIsPromoValid(true);
    } else {
      setPromoApplied(false);
      setPromoDiscount(0);
      setIsPromoValid(false);
    }
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.discountedPrice || product.price,
          quantity: 1,
          variant: "Standard",
          brand: product.brand,
          inStock: true,
          maxQuantity: 10,
        },
      ]);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-white border-b border-gray-200'>
        <div className='container mx-auto px-4 py-8'>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>
            Shopping Cart
          </h1>
          <div className='flex items-center text-sm text-gray-500 mt-2'>
            <a href='/' className='hover:text-[#89AC46]'>
              Home
            </a>
            <ChevronRight className='mx-2 h-4 w-4' />
            <span className='text-gray-700'>Cart</span>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        {cartItems.length > 0 ? (
          <div className='flex flex-col lg:flex-row gap-8'>
            <div className='lg:w-2/3'>
              <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6'>
                <div className='p-6'>
                  <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-xl font-semibold text-gray-800'>
                      Cart Items ({cartItems.length})
                    </h2>
                    <button
                      className='text-sm text-gray-500 hover:text-[#89AC46]'
                      onClick={() => setCartItems([])}
                    >
                      Clear Cart
                    </button>
                  </div>
                  <div className='divide-y divide-gray-200'>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className='py-6 first:pt-0 last:pb-0'
                      >
                        <div className='flex flex-col sm:flex-row'>
                          <div className='sm:w-24 sm:h-24 mb-4 sm:mb-0 flex-shrink-0'>
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className='w-full h-full object-contain rounded-md border border-gray-200'
                            />
                          </div>
                          <div className='sm:ml-6 flex-grow'>
                            <div className='flex flex-col sm:flex-row sm:justify-between'>
                              <div>
                                <h3 className='text-base font-medium text-gray-800 mb-1'>
                                  {item.name}
                                </h3>
                                <p className='text-sm text-gray-500 mb-1'>
                                  Brand: {item.brand}
                                </p>
                                <p className='text-sm text-gray-500 mb-2'>
                                  Variant: {item.variant}
                                </p>
                                <div className='flex items-center text-sm text-gray-500 mb-4 sm:mb-0'>
                                  <span
                                    className={
                                      item.inStock
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }
                                  >
                                    {item.inStock ? "In Stock" : "Out of Stock"}
                                  </span>
                                </div>
                              </div>

                              <div className='flex flex-col items-start sm:items-end'>
                                <span className='text-lg font-bold text-gray-800 mb-2'>
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                                <span className='text-sm text-gray-500'>
                                  ${item.price.toFixed(2)} each
                                </span>
                              </div>
                            </div>
                            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4'>
                              <div className='flex items-center mb-4 sm:mb-0'>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.id,
                                      Math.max(1, item.quantity - 1)
                                    )
                                  }
                                  disabled={item.quantity <= 1}
                                  className={`p-1 border border-gray-300 rounded-l-md ${
                                    item.quantity <= 1
                                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                      : "bg-white text-gray-600 hover:bg-gray-50"
                                  }`}
                                >
                                  <Minus size={16} />
                                </button>
                                <input
                                  type='number'
                                  min='1'
                                  max={item.maxQuantity}
                                  value={item.quantity}
                                  onChange={(e) => {
                                    const val = parseInt(e.target.value);
                                    if (
                                      !isNaN(val) &&
                                      val >= 1 &&
                                      val <= item.maxQuantity
                                    ) {
                                      updateQuantity(item.id, val);
                                    }
                                  }}
                                  className='w-12 text-center border-t border-b border-gray-300 py-1 focus:outline-none'
                                />
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.id,
                                      Math.min(
                                        item.maxQuantity,
                                        item.quantity + 1
                                      )
                                    )
                                  }
                                  disabled={item.quantity >= item.maxQuantity}
                                  className={`p-1 border border-gray-300 rounded-r-md ${
                                    item.quantity >= item.maxQuantity
                                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                      : "bg-white text-gray-600 hover:bg-gray-50"
                                  }`}
                                >
                                  <Plus size={16} />
                                </button>
                              </div>

                              <div className='flex space-x-2'>
                                <button
                                  onClick={() => moveToWishlist(item.id)}
                                  className='flex items-center text-sm text-gray-500 hover:text-[#89AC46]'
                                >
                                  <Heart size={16} className='mr-1' />
                                  <span className='hidden sm:inline'>
                                    Save for Later
                                  </span>
                                </button>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className='flex items-center text-sm text-gray-500 hover:text-red-600'
                                >
                                  <Trash2 size={16} className='mr-1' />
                                  <span className='hidden sm:inline'>
                                    Remove
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='flex justify-between items-center mb-8'>
                <a
                  href='/products'
                  className='flex items-center text-[#89AC46] hover:underline'
                >
                  <ShoppingCart size={18} className='mr-2' />
                  Continue Shopping
                </a>
              </div>
              <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
                <div className='p-6'>
                  <h2 className='text-xl font-semibold text-gray-800 mb-6'>
                    Recommended Products
                  </h2>

                  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
                    {recommendedProducts.map((product) => (
                      <div
                        key={product.id}
                        className='border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow'
                      >
                        <div className='aspect-square mb-3'>
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className='w-full h-full object-contain'
                          />
                        </div>
                        <h3 className='text-sm font-medium text-gray-800 mb-1 line-clamp-2 h-10'>
                          {product.name}
                        </h3>
                        <p className='text-xs text-gray-500 mb-2'>
                          {product.brand}
                        </p>
                        <div className='flex items-center justify-between'>
                          <div>
                            {product.discountedPrice ? (
                              <div className='flex items-center'>
                                <span className='text-sm font-bold text-[#89AC46]'>
                                  ${product.discountedPrice.toFixed(2)}
                                </span>
                                <span className='ml-1 text-xs text-gray-500 line-through'>
                                  ${product.price.toFixed(2)}
                                </span>
                              </div>
                            ) : (
                              <span className='text-sm font-bold text-[#89AC46]'>
                                ${product.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => addToCart(product)}
                            className='text-xs bg-[#89AC46] text-white px-2 py-1 rounded hover:bg-[#7a9a3d]'
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className='lg:w-1/3'>
              <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-24'>
                <div className='p-6'>
                  <h2 className='text-xl font-semibold text-gray-800 mb-6'>
                    Order Summary
                  </h2>
                  <div className='mb-6'>
                    <label
                      htmlFor='promo-code'
                      className='block text-sm font-medium text-gray-700 mb-2'
                    >
                      Promo Code
                    </label>
                    <div className='flex'>
                      <input
                        type='text'
                        id='promo-code'
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder='Enter code'
                        className={`flex-grow rounded-l-md border ${
                          !isPromoValid ? "border-red-300" : "border-gray-300"
                        } px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]`}
                      />
                      <button
                        onClick={applyPromoCode}
                        className='bg-[#89AC46] text-white px-4 py-2 rounded-r-md hover:bg-[#7a9a3d]'
                      >
                        Apply
                      </button>
                    </div>
                    {!isPromoValid && (
                      <p className='mt-1 text-sm text-red-600'>
                        Invalid promo code. Try "VitaPharmaIC20" for 20% off.
                      </p>
                    )}
                    {promoApplied && (
                      <p className='mt-1 text-sm text-green-600'>
                        Promo code applied successfully!
                      </p>
                    )}
                  </div>
                  <div className='space-y-3 text-sm border-t border-gray-200 pt-4'>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Subtotal</span>
                      <span className='font-medium'>
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Shipping</span>
                      <span className='font-medium'>
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Tax (7%)</span>
                      <span className='font-medium'>${tax.toFixed(2)}</span>
                    </div>
                    {promoApplied && (
                      <div className='flex justify-between text-green-600'>
                        <span>Discount (20%)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                  <div className='flex justify-between items-center border-t border-gray-200 mt-4 pt-4'>
                    <span className='text-lg font-semibold text-gray-800'>
                      Total
                    </span>
                    <span className='text-xl font-bold text-[#89AC46]'>
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <a
                    href='/checkout'
                    className='block w-full bg-[#89AC46] text-white text-center py-3 rounded-md mt-6 hover:bg-[#7a9a3d] transition-colors flex items-center justify-center'
                  >
                    Proceed to Checkout
                    <ArrowRight size={18} className='ml-2' />
                  </a>
                  <div className='flex items-center justify-center mt-4 text-xs text-gray-500'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-4 w-4 mr-1'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                    Secure Checkout
                  </div>
                  <div className='flex justify-center space-x-2 mt-4'>
                    <img
                      src='/placeholder.svg?height=30&width=40&text=Visa'
                      alt='Visa'
                      className='h-6'
                    />
                    <img
                      src='/placeholder.svg?height=30&width=40&text=MC'
                      alt='Mastercard'
                      className='h-6'
                    />
                    <img
                      src='/placeholder.svg?height=30&width=40&text=Amex'
                      alt='American Express'
                      className='h-6'
                    />
                    <img
                      src='/placeholder.svg?height=30&width=40&text=PayPal'
                      alt='PayPal'
                      className='h-6'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center'>
            <div className='flex justify-center mb-4'>
              <ShoppingCart size={64} className='text-gray-300' />
            </div>
            <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
              Your cart is empty
            </h2>
            <p className='text-gray-600 mb-6'>
              Looks like you haven't added any items to your cart yet.
            </p>
            <a
              href='/products'
              className='inline-block bg-[#89AC46] text-white px-6 py-3 rounded-md hover:bg-[#7a9a3d] transition-colors'
            >
              Start Shopping
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
