"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  ChevronRight,
  ChevronLeft,
  Check,
  Info,
  Truck,
  RefreshCw,
  Shield,
  Minus,
  Plus,
  ChevronDown,
  MessageCircle,
  ChevronUp,
  X,
} from "lucide-react";

import user from "../assets/images/user/user.jpg";

const productData = {
  id: 1,
  name: "Professional Digital Blood Pressure Monitor",
  brand: "MediTech",
  category: "Diagnostic Equipment",
  rating: 4.8,
  reviewCount: 128,
  price: 89.99,
  discountedPrice: 79.99,
  discount: 11,
  inStock: true,
  stockCount: 24,
  sku: "BP-MT-2025",
  isNew: true,
  isFeatured: true,
  description:
    "The MediTech Professional Digital Blood Pressure Monitor provides accurate and reliable blood pressure readings for clinical and home use. With its advanced technology, this device measures systolic and diastolic blood pressure as well as pulse rate with exceptional precision.",
  features: [
    "Clinically validated for accuracy",
    "Large, easy-to-read LCD display",
    "Memory function stores up to 120 readings",
    "Irregular heartbeat detection",
    "Hypertension indicator",
    "Date and time stamp for each reading",
    "Automatic power-off to conserve battery life",
    "Includes carrying case for easy storage and transport",
  ],
  specifications: [
    { name: "Measurement Method", value: "Oscillometric" },
    {
      name: "Measurement Range",
      value: "Pressure: 0-299 mmHg, Pulse: 40-199 beats/min",
    },
    { name: "Accuracy", value: "Pressure: ±3 mmHg, Pulse: ±5%" },
    { name: "Power Source", value: "4 AA batteries or AC adapter (included)" },
    { name: "Cuff Size", value: "Standard adult (22-42 cm)" },
    { name: "Display", value: "Digital LCD with backlight" },
    { name: "Dimensions", value: "128 × 115 × 130 mm" },
    { name: "Weight", value: "Approximately 350g (without batteries)" },
    { name: "Warranty", value: "2 years" },
  ],
  images: [
    "https://placehold.co/300x300",
    "https://placehold.co/300x300",
    "https://placehold.co/300x300",
    "https://placehold.co/300x300",
    "https://placehold.co/300x300",
  ],
  variants: [
    { id: 1, name: "Standard Package", price: 79.99, isDefault: true },
    {
      id: 2,
      name: "Deluxe Package (Extra Cuff)",
      price: 99.99,
      isDefault: false,
    },
    {
      id: 3,
      name: "Professional Kit (With Software)",
      price: 129.99,
      isDefault: false,
    },
  ],
  tags: ["blood pressure", "monitor", "digital", "diagnostic", "hypertension"],
  shippingInfo:
    "Free shipping on orders over $50. Standard delivery: 3-5 business days.",
  returnPolicy:
    "30-day money-back guarantee. See our return policy for details.",
};

const reviewsData = [
  {
    id: 1,
    user: "Dr. Sarah Johnson",
    avatar: user,
    rating: 5,
    date: "2025-02-15",
    title: "Excellent for clinical use",
    comment:
      "I've been using this blood pressure monitor in my practice for the past month, and I'm extremely impressed with its accuracy. The readings consistently match our hospital-grade equipment. The memory function is particularly useful for tracking patient progress over time.",
    helpful: 24,
    verified: true,
  },
  {
    id: 2,
    user: "Michael Chen",
    avatar: user,
    rating: 4,
    date: "2025-02-10",
    title: "Great for home monitoring",
    comment:
      "After my recent diagnosis of hypertension, my doctor recommended I monitor my blood pressure at home. This device is easy to use and gives consistent readings. The only minor issue is that the cuff can be a bit tricky to position correctly at first, but I got the hang of it quickly.",
    helpful: 18,
    verified: true,
  },
  {
    id: 3,
    user: "Emma Williams",
    avatar: user,
    rating: 5,
    date: "2025-01-28",
    title: "Worth every penny",
    comment:
      "The quality of this blood pressure monitor exceeds my expectations. The display is clear and easy to read, even for my aging eyes. I appreciate the irregular heartbeat detection feature, which actually helped me identify an issue I wasn't aware of. Highly recommend!",
    helpful: 15,
    verified: true,
  },
  {
    id: 4,
    user: "Robert Garcia",
    avatar: user,
    rating: 4,
    date: "2025-01-22",
    title: "Reliable and convenient",
    comment:
      "I've been comparing the readings from this device with the ones taken at my doctor's office, and they're remarkably close. The memory function is great for keeping track of my progress. Battery life is excellent too - I've been using it daily for a month and haven't had to replace them yet.",
    helpful: 10,
    verified: true,
  },
  {
    id: 5,
    user: "Jennifer Lee",
    avatar: user,
    rating: 3,
    date: "2025-01-15",
    title: "Good but could be better",
    comment:
      "The monitor works well and seems accurate, but the cuff is a bit stiff and uncomfortable. Also, the beeping is quite loud and there doesn't seem to be a way to turn it down or off. Otherwise, it's a solid product that does what it promises.",
    helpful: 8,
    verified: true,
  },
];

const relatedProducts = [
  {
    id: 2,
    name: "Professional Stethoscope",
    category: "Diagnostic Equipment",
    image: "https://placehold.co/300x300",
    brand: "MediListen",
    rating: 4.8,
    reviewCount: 245,
    price: 129.99,
    discountedPrice: null,
    isNew: false,
  },
  {
    id: 3,
    name: "Infrared Thermometer",
    category: "Diagnostic Equipment",
    image: "https://placehold.co/300x300",
    brand: "TempScan",
    rating: 4.2,
    reviewCount: 87,
    price: 49.99,
    discountedPrice: 39.99,
    isNew: false,
  },
  {
    id: 4,
    name: "Pulse Oximeter",
    category: "Diagnostic Equipment",
    image: "https://placehold.co/300x300",
    brand: "PulseCheck",
    rating: 4.7,
    reviewCount: 192,
    price: 39.99,
    discountedPrice: null,
    isNew: true,
  },
  {
    id: 5,
    name: "Digital Weighing Scale",
    category: "Diagnostic Equipment",
    image: "https://placehold.co/300x300",
    brand: "WeighWell",
    rating: 4.3,
    reviewCount: 76,
    price: 59.99,
    discountedPrice: null,
    isNew: false,
  },
];

const ProductDetailsPage = () => {
  const [mainImage, setMainImage] = useState(productData.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    productData.variants.find((v) => v.isDefault) || productData.variants[0]
  );
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlist, setIsWishlist] = useState(false);
  const [expandedSection, setExpandedSection] = useState("description");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [helpfulReviews, setHelpfulReviews] = useState(new Set());

  const averageRating =
    reviewsData.reduce((acc, review) => acc + review.rating, 0) /
    reviewsData.length;

  const ratingDistribution = Array(5).fill(0);
  reviewsData.forEach((review) => {
    ratingDistribution[5 - review.rating]++;
  });

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < productData.stockCount) {
      setQuantity(quantity + 1);
    }
  };

  const handleVariantChange = (variantId) => {
    const variant = productData.variants.find((v) => v.id === variantId);
    if (variant) {
      setSelectedVariant(variant);
    }
  };

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % productData.images.length;
    setCurrentImageIndex(newIndex);
    setMainImage(productData.images[newIndex]);
  };

  const prevImage = () => {
    const newIndex =
      (currentImageIndex - 1 + productData.images.length) %
      productData.images.length;
    setCurrentImageIndex(newIndex);
    setMainImage(productData.images[newIndex]);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
    setMainImage(productData.images[index]);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const markHelpful = (reviewId) => {
    setHelpfulReviews((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const addToCart = () => {
    console.log("Added to cart:", {
      product: productData,
      variant: selectedVariant,
      quantity,
    });
  };

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
  };

  const shareData = {
    url: window.location.href,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareData.url);
    alert("Link copied to clipboard!");
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-white border-b border-gray-200'>
        <div className='container mx-auto px-4 py-3'>
          <nav className='flex text-sm'>
            <a href='/' className='text-gray-500 hover:text-[#89AC46]'>
              Home
            </a>
            <ChevronRight className='mx-2 h-5 w-5 text-gray-400' />
            <a href='/products' className='text-gray-500 hover:text-[#89AC46]'>
              Products
            </a>
            <ChevronRight className='mx-2 h-5 w-5 text-gray-400' />
            <a
              href={`/products/${productData.category
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className='text-gray-500 hover:text-[#89AC46]'
            >
              {productData.category}
            </a>
            <ChevronRight className='mx-2 h-5 w-5 text-gray-400' />
            <span className='text-gray-700 font-medium truncate'>
              {productData.name}
            </span>
          </nav>
        </div>
      </div>

      <section className='py-8 md:py-12'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col lg:flex-row gap-8'>
            <div className='lg:w-1/2'>
              <div className='relative bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 mb-4'>
                {productData.isNew && (
                  <div className='absolute top-4 left-4 z-10 bg-[#89AC46] text-white text-xs font-bold px-2 py-1 rounded'>
                    NEW
                  </div>
                )}
                {productData.discount > 0 && (
                  <div className='absolute top-4 right-4 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded'>
                    -{productData.discount}%
                  </div>
                )}
                <div
                  className='relative aspect-square cursor-pointer'
                  onClick={openLightbox}
                >
                  <img
                    src={mainImage || "/placeholder.svg"}
                    alt={productData.name}
                    className='w-full h-full object-contain p-4'
                  />
                  <div className='absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-300'></div>
                </div>

                <button
                  className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100'
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                >
                  <ChevronLeft className='h-5 w-5 text-gray-700' />
                </button>
                <button
                  className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100'
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                >
                  <ChevronRight className='h-5 w-5 text-gray-700' />
                </button>
              </div>

              <div className='flex space-x-2 overflow-x-auto pb-2'>
                {productData.images.map((image, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 cursor-pointer ${
                      currentImageIndex === index
                        ? "border-[#89AC46]"
                        : "border-gray-200"
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${productData.name} - view ${index + 1}`}
                      className='w-full h-full object-cover'
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className='lg:w-1/2'>
              <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
                <div className='mb-4'>
                  <div className='text-sm text-gray-500 mb-1'>
                    {productData.category}
                  </div>
                  <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-2'>
                    {productData.name}
                  </h1>
                  <div className='flex items-center mb-4'>
                    <div className='flex mr-2'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={`${
                            i < Math.floor(productData.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 fill-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className='text-sm text-gray-600'>
                      {productData.rating} ({productData.reviewCount} reviews)
                    </span>
                    <span className='mx-2 text-gray-300'>|</span>
                    <span className='text-sm text-gray-600'>
                      Brand:{" "}
                      <a href='#' className='text-[#89AC46] hover:underline'>
                        {productData.brand}
                      </a>
                    </span>
                  </div>

                  <div className='mb-6'>
                    {productData.discountedPrice ? (
                      <div className='flex items-center'>
                        <span className='text-3xl font-bold text-[#89AC46]'>
                          ${selectedVariant.price.toFixed(2)}
                        </span>
                        <span className='ml-3 text-lg text-gray-500 line-through'>
                          ${productData.price.toFixed(2)}
                        </span>
                        <span className='ml-2 bg-red-100 text-red-700 px-2 py-0.5 rounded text-sm font-medium'>
                          Save $
                          {(productData.price - selectedVariant.price).toFixed(
                            2
                          )}
                        </span>
                      </div>
                    ) : (
                      <span className='text-3xl font-bold text-[#89AC46]'>
                        ${selectedVariant.price.toFixed(2)}
                      </span>
                    )}
                    <div className='text-sm text-gray-500 mt-1'>
                      {productData.inStock ? (
                        <span className='text-green-600 flex items-center'>
                          <Check size={16} className='mr-1' /> In Stock (
                          {productData.stockCount} available)
                        </span>
                      ) : (
                        <span className='text-red-600'>Out of Stock</span>
                      )}
                    </div>
                  </div>

                  <div className='mb-6'>
                    <h3 className='text-sm font-medium text-gray-700 mb-2'>
                      Quantity
                    </h3>
                    <div className='flex items-center'>
                      <button
                        onClick={decreaseQuantity}
                        disabled={quantity <= 1}
                        className={`p-2 border border-gray-300 rounded-l-md ${
                          quantity <= 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type='number'
                        min='1'
                        max={productData.stockCount}
                        value={quantity}
                        onChange={(e) => {
                          const val = Number.parseInt(e.target.value);
                          if (
                            !isNaN(val) &&
                            val >= 1 &&
                            val <= productData.stockCount
                          ) {
                            setQuantity(val);
                          }
                        }}
                        className='w-16 text-center border-t border-b border-gray-300 py-2 focus:outline-none'
                      />
                      <button
                        onClick={increaseQuantity}
                        disabled={quantity >= productData.stockCount}
                        className={`p-2 border border-gray-300 rounded-r-md ${
                          quantity >= productData.stockCount
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className='flex flex-col sm:flex-row gap-3 mb-6'>
                    <button
                      onClick={addToCart}
                      disabled={!productData.inStock}
                      className={`flex-grow flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium cursor-pointer ${
                        productData.inStock
                          ? "bg-[#89AC46] text-white hover:bg-[#7a9a3d]"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <ShoppingCart size={20} />
                      Add to Cart
                    </button>
                    <button
                      onClick={toggleWishlist}
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-md border cursor-pointer ${
                        isWishlist
                          ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <Heart
                        size={20}
                        className={isWishlist ? "fill-red-600" : ""}
                      />
                      <span className='hidden sm:inline'>Wishlist</span>
                    </button>
                    <button
                      className='flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 cursor-pointer'
                      onClick={copyToClipboard}
                    >
                      <Share2 size={20} />
                      <span className='hidden sm:inline'>Share</span>
                    </button>
                  </div>

                  <div className='border-t border-gray-200 pt-6'>
                    <h3 className='text-sm font-medium text-gray-700 mb-3'>
                      Product Highlights
                    </h3>
                    <ul className='space-y-2'>
                      {productData.features
                        .slice(0, 4)
                        .map((feature, index) => (
                          <li key={index} className='flex items-start'>
                            <Check
                              size={16}
                              className='mr-2 text-[#89AC46] mt-1 flex-shrink-0'
                            />
                            <span className='text-sm text-gray-600'>
                              {feature}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  <div className='border-t border-gray-200 mt-6 pt-6 space-y-4'>
                    <div className='flex items-start'>
                      <Truck
                        size={18}
                        className='mr-2 text-gray-600 mt-0.5 flex-shrink-0'
                      />
                      <div>
                        <h4 className='text-sm font-medium text-gray-700'>
                          Shipping
                        </h4>
                        <p className='text-sm text-gray-600'>
                          {productData.shippingInfo}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-start'>
                      <RefreshCw
                        size={18}
                        className='mr-2 text-gray-600 mt-0.5 flex-shrink-0'
                      />
                      <div>
                        <h4 className='text-sm font-medium text-gray-700'>
                          Returns
                        </h4>
                        <p className='text-sm text-gray-600'>
                          {productData.returnPolicy}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-start'>
                      <Shield
                        size={18}
                        className='mr-2 text-gray-600 mt-0.5 flex-shrink-0'
                      />
                      <div>
                        <h4 className='text-sm font-medium text-gray-700'>
                          Warranty
                        </h4>
                        <p className='text-sm text-gray-600'>
                          {productData.specifications.find(
                            (s) => s.name === "Warranty"
                          )?.value || "Standard manufacturer warranty applies."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-8 hidden md:block'>
        <div className='container mx-auto px-4'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
            <div className='border-b border-gray-200'>
              <div className='flex'>
                <button
                  className={`px-6 py-4 text-sm font-medium cursor-pointer ${
                    activeTab === "description"
                      ? "text-[#89AC46] border-b-2 border-[#89AC46]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </button>
                <button
                  className={`px-6 py-4 text-sm font-medium cursor-pointer ${
                    activeTab === "specifications"
                      ? "text-[#89AC46] border-b-2 border-[#89AC46]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveTab("specifications")}
                >
                  Specifications
                </button>
                <button
                  className={`px-6 py-4 text-sm font-medium cursor-pointer ${
                    activeTab === "reviews"
                      ? "text-[#89AC46] border-b-2 border-[#89AC46]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews ({reviewsData.length})
                </button>
              </div>
            </div>

            <div className='p-6'>
              {activeTab === "description" && (
                <div>
                  <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                    Product Description
                  </h2>
                  <p className='text-gray-600 mb-6'>
                    {productData.description}
                  </p>

                  <h3 className='text-lg font-semibold text-gray-800 mb-3'>
                    Key Features
                  </h3>
                  <ul className='space-y-2 mb-6'>
                    {productData.features.map((feature, index) => (
                      <li key={index} className='flex items-start'>
                        <Check
                          size={18}
                          className='mr-2 text-[#89AC46] mt-1 flex-shrink-0'
                        />
                        <span className='text-gray-600'>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className='bg-gray-50 p-4 rounded-lg border border-gray-200'>
                    <div className='flex items-start'>
                      <Info
                        size={20}
                        className='mr-2 text-blue-500 mt-1 flex-shrink-0'
                      />
                      <div>
                        <h4 className='font-medium text-gray-800 mb-1'>
                          Important Information
                        </h4>
                        <p className='text-sm text-gray-600'>
                          This device is intended for home use. While it
                          provides accurate readings, it should not replace
                          regular check-ups with healthcare professionals.
                          Always consult your doctor regarding your blood
                          pressure readings and before making any changes to
                          your medication or treatment plan.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "specifications" && (
                <div>
                  <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                    Technical Specifications
                  </h2>
                  <div className='overflow-x-auto'>
                    <table className='min-w-full divide-y divide-gray-200'>
                      <tbody className='divide-y divide-gray-200'>
                        {productData.specifications.map((spec, index) => (
                          <tr
                            key={index}
                            className={
                              index % 2 === 0 ? "bg-gray-50" : "bg-white"
                            }
                          >
                            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 w-1/3'>
                              {spec.name}
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                              {spec.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className='mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200'>
                    <div className='flex items-start'>
                      <Info
                        size={20}
                        className='mr-2 text-blue-500 mt-1 flex-shrink-0'
                      />
                      <div>
                        <h4 className='font-medium text-gray-800 mb-1'>
                          Product Documentation
                        </h4>
                        <p className='text-sm text-gray-600 mb-2'>
                          For detailed instructions on how to use this product,
                          please refer to the following resources:
                        </p>
                        <ul className='space-y-1 text-sm'>
                          <li>
                            <a
                              href='#'
                              className='text-[#89AC46] hover:underline flex items-center'
                            >
                              <ChevronRight size={14} className='mr-1' />
                              User Manual (PDF)
                            </a>
                          </li>
                          <li>
                            <a
                              href='#'
                              className='text-[#89AC46] hover:underline flex items-center'
                            >
                              <ChevronRight size={14} className='mr-1' />
                              Quick Start Guide (PDF)
                            </a>
                          </li>
                          <li>
                            <a
                              href='#'
                              className='text-[#89AC46] hover:underline flex items-center'
                            >
                              <ChevronRight size={14} className='mr-1' />
                              Troubleshooting Guide
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <div className='flex flex-col md:flex-row gap-8'>
                    <div className='md:w-1/3'>
                      <h2 className='text-xl font-semibold text-gray-800 mb-4'>
                        Customer Reviews
                      </h2>
                      <div className='bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6'>
                        <div className='flex items-center mb-3'>
                          <div className='text-3xl font-bold text-gray-800 mr-2'>
                            {averageRating.toFixed(1)}
                          </div>
                          <div>
                            <div className='flex'>
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={18}
                                  className={`${
                                    i < Math.floor(averageRating)
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300 fill-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <div className='text-sm text-gray-500'>
                              {reviewsData.length} reviews
                            </div>
                          </div>
                        </div>

                        <div className='space-y-2'>
                          {[5, 4, 3, 2, 1].map((rating) => {
                            const count = ratingDistribution[5 - rating];
                            const percentage =
                              (count / reviewsData.length) * 100;
                            return (
                              <div key={rating} className='flex items-center'>
                                <div className='w-12 text-sm text-gray-600'>
                                  {rating} stars
                                </div>
                                <div className='flex-grow mx-2 bg-gray-200 rounded-full h-2.5'>
                                  <div
                                    className='bg-yellow-400 h-2.5 rounded-full'
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <div className='w-8 text-sm text-gray-500 text-right'>
                                  {count}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <button className='w-full py-2 px-4 border border-[#89AC46] text-[#89AC46] rounded-md hover:bg-[#f9fbf5] transition-colors'>
                        Write a Review
                      </button>
                    </div>

                    <div className='md:w-2/3'>
                      <div className='space-y-6'>
                        {reviewsData.map((review) => (
                          <div
                            key={review.id}
                            className='border-b border-gray-200 pb-6 last:border-b-0'
                          >
                            <div className='flex justify-between mb-2'>
                              <div className='flex items-center'>
                                <img
                                  src={review.avatar || "/placeholder.svg"}
                                  alt={review.user}
                                  className='w-10 h-10 rounded-full mr-3'
                                />
                                <div>
                                  <div className='flex items-center'>
                                    <h4 className='font-medium text-gray-800'>
                                      {review.user}
                                    </h4>
                                    {review.verified && (
                                      <span className='ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full'>
                                        Verified Purchase
                                      </span>
                                    )}
                                  </div>
                                  <div className='flex items-center text-sm text-gray-500'>
                                    <div className='flex mr-2'>
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          size={14}
                                          className={`${
                                            i < review.rating
                                              ? "text-yellow-400 fill-yellow-400"
                                              : "text-gray-300 fill-gray-300"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <span>
                                      {new Date(
                                        review.date
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <h5 className='font-medium text-gray-800 mb-2'>
                              {review.title}
                            </h5>
                            <p className='text-gray-600 mb-3'>
                              {review.comment}
                            </p>

                            <div className='flex items-center'>
                              <button
                                onClick={() => markHelpful(review.id)}
                                className={`flex items-center text-sm ${
                                  helpfulReviews.has(review.id)
                                    ? "text-[#89AC46]"
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                              >
                                <ThumbsUp size={14} className='mr-1' />
                                Helpful (
                                {helpfulReviews.has(review.id)
                                  ? review.helpful + 1
                                  : review.helpful}
                                )
                              </button>
                              <button className='ml-4 text-sm text-gray-500 hover:text-gray-700 flex items-center'>
                                <MessageCircle size={14} className='mr-1' />
                                Reply
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className='py-6 md:hidden'>
        <div className='container mx-auto px-4'>
          <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
            <div
              className='border-b border-gray-200 p-4 cursor-pointer'
              onClick={() => toggleSection("description")}
            >
              <div className='flex justify-between items-center'>
                <h3 className='font-medium text-gray-800'>Description</h3>
                {expandedSection === "description" ? (
                  <ChevronUp size={18} className='text-gray-500' />
                ) : (
                  <ChevronDown size={18} className='text-gray-500' />
                )}
              </div>
            </div>

            <AnimatePresence>
              {expandedSection === "description" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className='overflow-hidden'
                >
                  <div className='p-4 border-b border-gray-200'>
                    <p className='text-gray-600 mb-4'>
                      {productData.description}
                    </p>

                    <h4 className='font-medium text-gray-800 mb-2'>
                      Key Features
                    </h4>
                    <ul className='space-y-2'>
                      {productData.features.map((feature, index) => (
                        <li key={index} className='flex items-start'>
                          <Check
                            size={16}
                            className='mr-2 text-[#89AC46] mt-1 flex-shrink-0'
                          />
                          <span className='text-sm text-gray-600'>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div
              className='border-b border-gray-200 p-4 cursor-pointer'
              onClick={() => toggleSection("specifications")}
            >
              <div className='flex justify-between items-center'>
                <h3 className='font-medium text-gray-800'>Specifications</h3>
                {expandedSection === "specifications" ? (
                  <ChevronUp size={18} className='text-gray-500' />
                ) : (
                  <ChevronDown size={18} className='text-gray-500' />
                )}
              </div>
            </div>

            <AnimatePresence>
              {expandedSection === "specifications" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className='overflow-hidden'
                >
                  <div className='p-4 border-b border-gray-200'>
                    <div className='space-y-3'>
                      {productData.specifications.map((spec, index) => (
                        <div
                          key={index}
                          className='pb-2 border-b border-gray-100 last:border-b-0'
                        >
                          <div className='text-sm font-medium text-gray-700'>
                            {spec.name}
                          </div>
                          <div className='text-sm text-gray-600'>
                            {spec.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div
              className='p-4 cursor-pointer'
              onClick={() => toggleSection("reviews")}
            >
              <div className='flex justify-between items-center'>
                <h3 className='font-medium text-gray-800'>
                  Reviews ({reviewsData.length})
                </h3>
                {expandedSection === "reviews" ? (
                  <ChevronUp size={18} className='text-gray-500' />
                ) : (
                  <ChevronDown size={18} className='text-gray-500' />
                )}
              </div>
            </div>

            <AnimatePresence>
              {expandedSection === "reviews" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className='overflow-hidden'
                >
                  <div className='p-4'>
                    <div className='flex items-center mb-4'>
                      <div className='text-2xl font-bold text-gray-800 mr-2'>
                        {averageRating.toFixed(1)}
                      </div>
                      <div>
                        <div className='flex'>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={`${
                                i < Math.floor(averageRating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300 fill-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div className='text-xs text-gray-500'>
                          {reviewsData.length} reviews
                        </div>
                      </div>
                    </div>

                    <div className='space-y-4 mt-4'>
                      {reviewsData.slice(0, 2).map((review) => (
                        <div
                          key={review.id}
                          className='border-b border-gray-200 pb-4 last:border-b-0'
                        >
                          <div className='flex items-center mb-2'>
                            <img
                              src={review.avatar || "/placeholder.svg"}
                              alt={review.user}
                              className='w-8 h-8 rounded-full mr-2'
                            />
                            <div>
                              <div className='font-medium text-gray-800 text-sm'>
                                {review.user}
                              </div>
                              <div className='flex items-center text-xs text-gray-500'>
                                <div className='flex mr-2'>
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      size={12}
                                      className={`${
                                        i < review.rating
                                          ? "text-yellow-400 fill-yellow-400"
                                          : "text-gray-300 fill-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          <h5 className='font-medium text-gray-800 text-sm mb-1'>
                            {review.title}
                          </h5>
                          <p className='text-sm text-gray-600'>
                            {review.comment}
                          </p>
                        </div>
                      ))}
                    </div>

                    <button className='w-full mt-4 py-2 px-4 border border-[#89AC46] text-[#89AC46] rounded-md text-sm'>
                      View All Reviews
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className='py-8 md:py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6'>
            Related Products
          </h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {relatedProducts.map((product) => (
              <motion.div
                key={product.id}
                className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className='relative'>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className='w-full h-48 object-cover'
                  />
                  {product.isNew && (
                    <div className='absolute top-2 right-2 bg-[#89AC46] text-white text-xs font-bold px-2 py-1 rounded'>
                      NEW
                    </div>
                  )}
                </div>

                <div className='p-4'>
                  <div className='text-xs text-gray-500 mb-1'>
                    {product.category}
                  </div>
                  <h3 className='font-semibold text-gray-800 mb-1 line-clamp-2 h-12'>
                    {product.name}
                  </h3>
                  <div className='text-sm text-gray-600 mb-2'>
                    {product.brand}
                  </div>

                  <div className='flex items-center mb-2'>
                    <div className='flex mr-2'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300 fill-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className='text-xs text-gray-500'>
                      ({product.reviewCount})
                    </span>
                  </div>

                  <div className='flex items-center justify-between mt-4'>
                    <div>
                      {product.discountedPrice ? (
                        <div className='flex items-center'>
                          <span className='text-lg font-bold text-[#89AC46]'>
                            ${product.discountedPrice.toFixed(2)}
                          </span>
                          <span className='ml-2 text-xs text-gray-500 line-through'>
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className='text-lg font-bold text-[#89AC46]'>
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button className='flex items-center justify-center rounded-full p-2 bg-white border-2 border-[#89AC46] text-[#89AC46] hover:bg-[#89AC46] hover:text-white transition-colors cursor-pointer'>
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center'
            onClick={closeLightbox}
          >
            <button
              className='absolute top-4 right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70'
              onClick={closeLightbox}
            >
              <X size={24} />
            </button>

            <button
              className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-3 text-white hover:bg-opacity-70'
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-3 text-white hover:bg-opacity-70'
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight size={24} />
            </button>

            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={productData.images[currentImageIndex]}
              alt={productData.name}
              className='max-h-[80vh] max-w-[90vw] object-contain'
              onClick={(e) => e.stopPropagation()}
            />

            <div className='absolute bottom-4 left-0 right-0 flex justify-center space-x-2'>
              {productData.images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    currentImageIndex === index ? "bg-white" : "bg-gray-500"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleThumbnailClick(index);
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ThumbsUp = ({ size, className }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <path d='M7 10v12' />
    <path d='M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z' />
  </svg>
);

export default ProductDetailsPage;
