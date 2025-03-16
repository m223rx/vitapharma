"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Filter, X, Search } from "lucide-react";
import { newArrivals } from "../data/newArrivals";

const categories = [...new Set(newArrivals.map((item) => item.category))];

const NewArrivalsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState(newArrivals);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(8);

  useEffect(() => {
    let result = [...newArrivals];

    if (activeCategory !== "All") {
      result = result.filter((product) => product.category === activeCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    switch (sortOption) {
      case "newest":
        result.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [activeCategory, sortOption, searchQuery]);

  const loadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 4, filteredProducts.length));
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setVisibleProducts(8);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setVisibleProducts(8);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setVisibleProducts(8);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <section className='bg-gradient-to-r from-[#89AC46] to-[#626F47] py-12 md:py-20'>
        <div className='container mx-auto px-4'>
          <motion.div
            className='text-center text-white'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className='mb-4 text-3xl md:text-5xl font-bold'>
              New Arrivals
            </h1>
            <p className='mx-auto max-w-2xl text-sm md:text-lg'>
              Discover our latest medical equipment and supplies. Stay
              up-to-date with cutting-edge technology and essential healthcare
              products.
            </p>
          </motion.div>
        </div>
      </section>
      <section className='py-8 border-b border-gray-200'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
            <button
              className='flex md:hidden items-center gap-2 px-4 py-2 bg-white rounded-md shadow-sm'
              onClick={toggleFilter}
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>

            <div className='hidden md:flex items-center space-x-2 overflow-x-auto pb-2'>
              <button
                onClick={() => handleCategoryChange("All")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  activeCategory === "All"
                    ? "bg-[#89AC46] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    activeCategory === category
                      ? "bg-[#89AC46] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {isFilterOpen && (
              <div className='md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end'>
                <motion.div
                  className='w-4/5 bg-white h-full overflow-y-auto'
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "tween" }}
                >
                  <div className='p-4 border-b border-gray-200 flex justify-between items-center'>
                    <h3 className='font-semibold'>Filters</h3>
                    <button onClick={toggleFilter}>
                      <X size={20} />
                    </button>
                  </div>

                  <div className='p-4'>
                    <h4 className='font-medium mb-2'>Categories</h4>
                    <div className='space-y-2'>
                      <div className='flex items-center'>
                        <input
                          type='radio'
                          id='all'
                          name='category'
                          checked={activeCategory === "All"}
                          onChange={() => handleCategoryChange("All")}
                          className='mr-2'
                        />
                        <label htmlFor='all'>All</label>
                      </div>
                      {categories.map((category) => (
                        <div key={category} className='flex items-center'>
                          <input
                            type='radio'
                            id={category}
                            name='category'
                            checked={activeCategory === category}
                            onChange={() => handleCategoryChange(category)}
                            className='mr-2'
                          />
                          <label htmlFor={category}>{category}</label>
                        </div>
                      ))}
                    </div>

                    <h4 className='font-medium mt-6 mb-2'>Sort By</h4>
                    <select
                      value={sortOption}
                      onChange={handleSortChange}
                      className='w-full p-2 border border-gray-300 rounded-md'
                    >
                      <option value='newest'>Newest First</option>
                      <option value='price-low'>Price: Low to High</option>
                      <option value='price-high'>Price: High to Low</option>
                      <option value='rating'>Highest Rated</option>
                    </select>

                    <button
                      className='mt-6 w-full bg-[#89AC46] text-white py-2 rounded-md'
                      onClick={toggleFilter}
                    >
                      Apply Filters
                    </button>
                  </div>
                </motion.div>
              </div>
            )}

            <div className='flex items-center gap-4 w-full md:w-auto'>
              <form onSubmit={handleSearch} className='relative flex-grow'>
                <input
                  type='text'
                  placeholder='Search products...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#89AC46]'
                />
                <Search
                  className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
                  size={18}
                />
              </form>

              <div className='hidden md:block'>
                <select
                  value={sortOption}
                  onChange={handleSortChange}
                  className='pl-4 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#89AC46] appearance-none bg-white'
                  style={{
                    backgroundImage:
                      'url(\'data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>\')',
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.5rem center",
                    backgroundSize: "1.5em 1.5em",
                  }}
                >
                  <option value='newest'>Newest First</option>
                  <option value='price-low'>Price: Low to High</option>
                  <option value='price-high'>Price: High to Low</option>
                  <option value='rating'>Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-8 md:py-12'>
        <div className='container mx-auto px-4'>
          {filteredProducts.length > 0 ? (
            <>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {filteredProducts.slice(0, visibleProducts).map((product) => (
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
                      <div className='absolute top-2 right-2 bg-[#89AC46] text-white text-xs font-bold px-2 py-1 rounded'>
                        NEW
                      </div>
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
                        <span className='text-lg font-bold text-[#89AC46]'>
                          ${product.price.toFixed(2)}
                        </span>
                        <button className='flex items-center justify-center bg-white border-2 border-[#89AC46] rounded-full p-2 text-[#89AC46] hover:bg-[#89AC46] hover:text-white transition-colors cursor-pointer'>
                          <ShoppingCart size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {visibleProducts < filteredProducts.length && (
                <div className='mt-8 text-center'>
                  <button
                    onClick={loadMore}
                    className='px-6 py-3 bg-white border border-[#89AC46] text-[#89AC46] rounded-md hover:bg-[#89AC46] hover:text-white transition-colors'
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className='text-center py-12'>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                  No products found
                </h3>
                <p className='text-gray-500'>
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setSearchQuery("");
                    setSortOption("newest");
                  }}
                  className='mt-4 px-4 py-2 bg-[#89AC46] text-white rounded-md hover:bg-[#626F47] transition-colors'
                >
                  Reset Filters
                </button>
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewArrivalsPage;
