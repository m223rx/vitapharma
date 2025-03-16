"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ShoppingCart,
  Filter,
  X,
  Search,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Sliders,
} from "lucide-react";
import { allProducts } from "../data/allProducts";

const categories = [...new Set(allProducts.map((item) => item.category))];
const brands = [...new Set(allProducts.map((item) => item.brand))];

const AllProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeBrands, setActiveBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [availability, setAvailability] = useState("all");
  const [sortOption, setSortOption] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedFilters, setExpandedFilters] = useState({
    categories: true,
    brands: true,
    price: true,
    availability: true,
  });

  const productsPerPage = 12;

  useEffect(() => {
    let result = [...allProducts];

    if (activeCategory !== "All") {
      result = result.filter((product) => product.category === activeCategory);
    }

    if (activeBrands.length > 0) {
      result = result.filter((product) => activeBrands.includes(product.brand));
    }

    result = result.filter((product) => {
      const price = product.discountedPrice || product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    if (availability === "inStock") {
      result = result.filter((product) => product.inStock);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          (product.tags &&
            product.tags.some((tag) => tag.toLowerCase().includes(query)))
      );
    }

    switch (sortOption) {
      case "featured":
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "price-low":
        result.sort((a, b) => {
          const priceA = a.discountedPrice || a.price;
          const priceB = b.discountedPrice || b.price;
          return priceA - priceB;
        });
        break;
      case "price-high":
        result.sort((a, b) => {
          const priceA = a.discountedPrice || a.price;
          const priceB = b.discountedPrice || b.price;
          return priceB - priceA;
        });
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [
    activeCategory,
    activeBrands,
    priceRange,
    availability,
    sortOption,
    searchQuery,
  ]);

  const toggleBrand = (brand) => {
    setActiveBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleFilterSection = (section) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = Number(value);
    setPriceRange(newRange);
  };

  const resetFilters = () => {
    setActiveCategory("All");
    setActiveBrands([]);
    setPriceRange([0, 2000]);
    setAvailability("all");
    setSortOption("featured");
    setSearchQuery("");
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className='min-h-screen bg-gray-50'>
      <section className='bg-gradient-to-r from-[#89AC46] to-[#626F47] py-10 md:py-16'>
        <div className='container mx-auto px-4'>
          <motion.div
            className='text-center text-white'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className='mb-2 text-3xl md:text-4xl font-bold'>
              All Products
            </h1>
            <p className='mx-auto max-w-2xl text-sm md:text-base'>
              Browse our complete collection of high-quality medical equipment
              and supplies for healthcare professionals.
            </p>
          </motion.div>
        </div>
      </section>

      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col lg:flex-row gap-8'>
          <div className='lg:hidden mb-4'>
            <button
              className='w-full flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-md shadow-sm border border-gray-200'
              onClick={() => setIsSidebarOpen(true)}
            >
              <Filter size={18} />
              <span>Filter Products</span>
            </button>
          </div>

          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                className='fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
              >
                <motion.div
                  className='absolute right-0 top-0 h-full w-4/5 max-w-md bg-white overflow-y-auto'
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "tween" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className='p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10'>
                    <h3 className='font-semibold text-lg'>Filters</h3>
                    <button onClick={() => setIsSidebarOpen(false)}>
                      <X size={20} />
                    </button>
                  </div>

                  <div className='p-4'>
                    <FilterSection
                      title='Categories'
                      isExpanded={expandedFilters.categories}
                      toggleExpand={() => toggleFilterSection("categories")}
                    >
                      <div className='space-y-2'>
                        <div className='flex items-center'>
                          <input
                            type='radio'
                            id='mobile-all'
                            name='category'
                            checked={activeCategory === "All"}
                            onChange={() => setActiveCategory("All")}
                            className='mr-2'
                          />
                          <label htmlFor='mobile-all'>All Categories</label>
                        </div>
                        {categories.map((category) => (
                          <div key={category} className='flex items-center'>
                            <input
                              type='radio'
                              id={`mobile-${category}`}
                              name='category'
                              checked={activeCategory === category}
                              onChange={() => setActiveCategory(category)}
                              className='mr-2'
                            />
                            <label htmlFor={`mobile-${category}`}>
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </FilterSection>

                    <FilterSection
                      title='Brands'
                      isExpanded={expandedFilters.brands}
                      toggleExpand={() => toggleFilterSection("brands")}
                    >
                      <div className='space-y-2 max-h-48 overflow-y-auto'>
                        {brands.map((brand) => (
                          <div key={brand} className='flex items-center'>
                            <input
                              type='checkbox'
                              id={`mobile-${brand}`}
                              checked={activeBrands.includes(brand)}
                              onChange={() => toggleBrand(brand)}
                              className='mr-2'
                            />
                            <label htmlFor={`mobile-${brand}`}>{brand}</label>
                          </div>
                        ))}
                      </div>
                    </FilterSection>

                    <FilterSection
                      title='Price Range'
                      isExpanded={expandedFilters.price}
                      toggleExpand={() => toggleFilterSection("price")}
                    >
                      <div className='space-y-4'>
                        <div className='flex items-center justify-between'>
                          <input
                            type='number'
                            value={priceRange[0]}
                            onChange={(e) =>
                              handlePriceChange(0, e.target.value)
                            }
                            className='w-24 p-2 border border-gray-300 rounded-md'
                            min='0'
                          />
                          <span className='mx-2'>to</span>
                          <input
                            type='number'
                            value={priceRange[1]}
                            onChange={(e) =>
                              handlePriceChange(1, e.target.value)
                            }
                            className='w-24 p-2 border border-gray-300 rounded-md'
                            min='0'
                          />
                        </div>
                        <div className='flex justify-between text-sm text-gray-500'>
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </FilterSection>

                    <FilterSection
                      title='Availability'
                      isExpanded={expandedFilters.availability}
                      toggleExpand={() => toggleFilterSection("availability")}
                    >
                      <div className='space-y-2'>
                        <div className='flex items-center'>
                          <input
                            type='radio'
                            id='mobile-all-availability'
                            name='availability'
                            checked={availability === "all"}
                            onChange={() => setAvailability("all")}
                            className='mr-2'
                          />
                          <label htmlFor='mobile-all-availability'>
                            All Products
                          </label>
                        </div>
                        <div className='flex items-center'>
                          <input
                            type='radio'
                            id='mobile-in-stock'
                            name='availability'
                            checked={availability === "inStock"}
                            onChange={() => setAvailability("inStock")}
                            className='mr-2'
                          />
                          <label htmlFor='mobile-in-stock'>In Stock Only</label>
                        </div>
                      </div>
                    </FilterSection>

                    <div className='mt-6 space-y-3'>
                      <button
                        onClick={() => {
                          resetFilters();
                          setIsSidebarOpen(false);
                        }}
                        className='w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
                      >
                        Reset Filters
                      </button>
                      <button
                        onClick={() => setIsSidebarOpen(false)}
                        className='w-full px-4 py-2 bg-[#89AC46] text-white rounded-md hover:bg-[#7a9a3d]'
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className='hidden lg:block w-64 flex-shrink-0'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 sticky top-24'>
              <div className='p-4 border-b border-gray-200'>
                <h3 className='font-semibold text-lg flex items-center'>
                  <Sliders size={18} className='mr-2' />
                  Filters
                </h3>
              </div>

              <div className='p-4 space-y-6'>
                <FilterSection
                  title='Categories'
                  isExpanded={expandedFilters.categories}
                  toggleExpand={() => toggleFilterSection("categories")}
                >
                  <div className='space-y-2'>
                    <div className='flex items-center'>
                      <input
                        type='radio'
                        id='all'
                        name='category'
                        checked={activeCategory === "All"}
                        onChange={() => setActiveCategory("All")}
                        className='mr-2'
                      />
                      <label htmlFor='all'>All Categories</label>
                    </div>
                    {categories.map((category) => (
                      <div key={category} className='flex items-center'>
                        <input
                          type='radio'
                          id={category}
                          name='category'
                          checked={activeCategory === category}
                          onChange={() => setActiveCategory(category)}
                          className='mr-2'
                        />
                        <label htmlFor={category}>{category}</label>
                      </div>
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title='Brands'
                  isExpanded={expandedFilters.brands}
                  toggleExpand={() => toggleFilterSection("brands")}
                >
                  <div className='space-y-2 max-h-48 overflow-y-auto'>
                    {brands.map((brand) => (
                      <div key={brand} className='flex items-center'>
                        <input
                          type='checkbox'
                          id={brand}
                          checked={activeBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className='mr-2'
                        />
                        <label htmlFor={brand}>{brand}</label>
                      </div>
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title='Price Range'
                  isExpanded={expandedFilters.price}
                  toggleExpand={() => toggleFilterSection("price")}
                >
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <input
                        type='number'
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(0, e.target.value)}
                        className='w-20 p-2 border border-gray-300 rounded-md'
                        min='0'
                      />
                      <span className='mx-2'>to</span>
                      <input
                        type='number'
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(1, e.target.value)}
                        className='w-20 p-2 border border-gray-300 rounded-md'
                        min='0'
                      />
                    </div>
                    <div className='flex justify-between text-sm text-gray-500'>
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </FilterSection>

                <FilterSection
                  title='Availability'
                  isExpanded={expandedFilters.availability}
                  toggleExpand={() => toggleFilterSection("availability")}
                >
                  <div className='space-y-2'>
                    <div className='flex items-center'>
                      <input
                        type='radio'
                        id='all-availability'
                        name='availability'
                        checked={availability === "all"}
                        onChange={() => setAvailability("all")}
                        className='mr-2'
                      />
                      <label htmlFor='all-availability'>All Products</label>
                    </div>
                    <div className='flex items-center'>
                      <input
                        type='radio'
                        id='in-stock'
                        name='availability'
                        checked={availability === "inStock"}
                        onChange={() => setAvailability("inStock")}
                        className='mr-2'
                      />
                      <label htmlFor='in-stock'>In Stock Only</label>
                    </div>
                  </div>
                </FilterSection>

                <button
                  onClick={resetFilters}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          <div className='flex-grow'>
            <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6'>
              <div className='flex flex-col md:flex-row gap-4'>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className='flex-grow'
                >
                  <div className='relative'>
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
                  </div>
                </form>

                <div className='flex-shrink-0'>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className='pl-4 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#89AC46] appearance-none bg-white'
                    style={{
                      backgroundImage:
                        'url(\'data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>\')',
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 0.5rem center",
                      backgroundSize: "1.5em 1.5em",
                    }}
                  >
                    <option value='featured'>Featured</option>
                    <option value='newest'>Newest</option>
                    <option value='price-low'>Price: Low to High</option>
                    <option value='price-high'>Price: High to Low</option>
                    <option value='rating'>Highest Rated</option>
                  </select>
                </div>
              </div>

              {(activeCategory !== "All" ||
                activeBrands.length > 0 ||
                availability === "inStock" ||
                searchQuery) && (
                <div className='mt-4 flex flex-wrap gap-2'>
                  {activeCategory !== "All" && (
                    <div className='bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center'>
                      <span>Category: {activeCategory}</span>
                      <button
                        onClick={() => setActiveCategory("All")}
                        className='ml-2 text-gray-500 hover:text-gray-700'
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}

                  {activeBrands.map((brand) => (
                    <div
                      key={brand}
                      className='bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center'
                    >
                      <span>Brand: {brand}</span>
                      <button
                        onClick={() => toggleBrand(brand)}
                        className='ml-2 text-gray-500 hover:text-gray-700'
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}

                  {availability === "inStock" && (
                    <div className='bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center'>
                      <span>In Stock Only</span>
                      <button
                        onClick={() => setAvailability("all")}
                        className='ml-2 text-gray-500 hover:text-gray-700'
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}

                  {searchQuery && (
                    <div className='bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center'>
                      <span>Search: {searchQuery}</span>
                      <button
                        onClick={() => setSearchQuery("")}
                        className='ml-2 text-gray-500 hover:text-gray-700'
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}

                  <button
                    onClick={resetFilters}
                    className='text-[#89AC46] text-sm hover:underline'
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>

            <div className='mb-4'>
              <p className='text-gray-600'>
                Showing{" "}
                {filteredProducts.length > 0 ? indexOfFirstProduct + 1 : 0}-
                {Math.min(indexOfLastProduct, filteredProducts.length)} of{" "}
                {filteredProducts.length} products
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {currentProducts.map((product) => (
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
                      {!product.inStock && (
                        <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
                          <span className='bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium'>
                            Out of Stock
                          </span>
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
                        <button
                          className={`flex items-center justify-center rounded-full p-2 ${
                            product.inStock
                              ? "bg-white border-2 border-[#89AC46] text-[#89AC46] hover:bg-[#89AC46] hover:text-white"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          } transition-colors`}
                          disabled={!product.inStock}
                        >
                          <ShoppingCart size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className='text-center py-12 bg-white rounded-lg shadow-sm'>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                    No products found
                  </h3>
                  <p className='text-gray-500 mb-6'>
                    Try adjusting your search or filter criteria
                  </p>
                  <button
                    onClick={resetFilters}
                    className='px-4 py-2 bg-[#89AC46] text-white rounded-md hover:bg-[#626F47] transition-colors'
                  >
                    Reset Filters
                  </button>
                </motion.div>
              </div>
            )}

            {filteredProducts.length > 0 && totalPages > 1 && (
              <div className='mt-8 flex justify-center'>
                <nav className='flex items-center'>
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-l-md border border-gray-300 ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div className='hidden sm:flex'>
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 &&
                          pageNumber <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => paginate(pageNumber)}
                            className={`w-10 h-10 border border-gray-300 ${
                              currentPage === pageNumber
                                ? "bg-[#89AC46] text-white"
                                : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (
                        (pageNumber === 2 && currentPage > 3) ||
                        (pageNumber === totalPages - 1 &&
                          currentPage < totalPages - 2)
                      ) {
                        return (
                          <button
                            key={pageNumber}
                            className='w-10 h-10 border border-gray-300 bg-white text-gray-700'
                            disabled
                          >
                            ...
                          </button>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <div className='sm:hidden flex items-center px-4 h-10 border-t border-b border-gray-300 bg-white'>
                    <span>
                      Page {currentPage} of {totalPages}
                    </span>
                  </div>

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-r-md border border-gray-300 ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <ChevronRight size={18} />
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterSection = ({ title, children, isExpanded, toggleExpand }) => {
  return (
    <div className='border-b border-gray-200 pb-4'>
      <button
        className='flex items-center justify-between w-full py-2 text-left font-medium'
        onClick={toggleExpand}
      >
        {title}
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='overflow-hidden pt-2'
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllProductsPage;
