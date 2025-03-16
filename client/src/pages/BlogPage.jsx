"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Calendar,
  Clock,
  ChevronRight,
  Tag,
} from "lucide-react";
import { blogPosts } from "../data/blogPosts";
import GetInTouch from "../components/GetInTouch";

const categories = [
  "All Categories",
  "Industry Trends",
  "Equipment Guide",
  "Technology",
  "Maintenance",
  "Compliance",
  "Training",
  "Procurement",
];

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  
  useEffect(() => {
    let filtered = [...blogPosts];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }
    
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    setFilteredPosts(filtered);
    
    setFeaturedPosts(blogPosts.filter((post) => post.featured));
  }, [searchQuery, selectedCategory]);
  
  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <section className='bg-gradient-to-r from-[#89AC46] to-[#626F47] py-16 md:py-24'>
        <div className='container mx-auto px-4'>
          <div className='max-w-3xl mx-auto text-center'>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6'
            >
              VitaPharma Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='text-lg text-white/90 mb-8'
            >
              Insights, news, and resources for emergency medical professionals
              and healthcare providers.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <form
                onSubmit={handleSearch}
                className='relative max-w-xl mx-auto'
              >
                <input
                  type='text'
                  placeholder='Search articles...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full py-3 px-5 pl-12 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-white bg-white'
                />
                <Search
                  className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400'
                  size={20}
                />
                <button
                  type='submit'
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#89AC46] text-white px-4 py-1 rounded-full hover:bg-[#626F47] transition-colors cursor-pointer'
                >
                  Search
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      
      <section className='py-8 border-b border-gray-200 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-wrap justify-center gap-3'>
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-[#89AC46] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {featuredPosts.length > 0 &&
        selectedCategory === "All Categories" &&
        !searchQuery && (
          <section className='py-12 bg-white'>
            <div className='container mx-auto px-4'>
              <h2 className='text-2xl font-bold text-gray-800 mb-8'>
                Featured Articles
              </h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {featuredPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className='bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'
                  >
                    <div className='md:flex h-full'>
                      <div className='md:w-2/5'>
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          className='h-48 md:h-full w-full object-cover'
                        />
                      </div>
                      <div className='p-6 md:w-3/5'>
                        <div className='flex items-center mb-2'>
                          <span className='text-xs font-medium bg-[#89AC46]/10 text-[#89AC46] px-2 py-1 rounded-full'>
                            {post.category}
                          </span>
                          <span className='text-xs text-gray-500 ml-2 flex items-center'>
                            <Clock size={12} className='mr-1' />
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className='text-xl font-bold text-gray-800 mb-2 line-clamp-2'>
                          {post.title}
                        </h3>
                        <p className='text-gray-600 mb-4 line-clamp-3'>
                          {post.excerpt}
                        </p>
                        <div className='flex items-center justify-between mt-auto'>
                          <div className='flex items-center'>
                            <img
                              src={post.authorImage || "/placeholder.svg"}
                              alt={post.author}
                              className='w-8 h-8 rounded-full mr-2'
                            />
                            <span className='text-sm text-gray-700'>
                              {post.author}
                            </span>
                          </div>
                          <a
                            href={`/blog/${post.id}`}
                            className='text-[#89AC46] font-medium hover:underline flex items-center'
                          >
                            Read More
                            <ChevronRight size={16} className='ml-1' />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}
        
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='flex justify-between items-center mb-8'>
            <h2 className='text-2xl font-bold text-gray-800'>
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : selectedCategory !== "All Categories"
                ? `${selectedCategory} Articles`
                : "Latest Articles"}
            </h2>
            <span className='text-sm text-gray-500'>
              {filteredPosts.length} articles
            </span>
          </div>

          {filteredPosts.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'
                >
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className='h-48 w-full object-cover'
                  />
                  <div className='p-6'>
                    <div className='flex items-center mb-3'>
                      <span className='text-xs font-medium bg-[#89AC46]/10 text-[#89AC46] px-2 py-1 rounded-full'>
                        {post.category}
                      </span>
                      <span className='text-xs text-gray-500 ml-2 flex items-center'>
                        <Calendar size={12} className='mr-1' />
                        {post.date}
                      </span>
                    </div>
                    <h3 className='text-xl font-bold text-gray-800 mb-2 line-clamp-2'>
                      {post.title}
                    </h3>
                    <p className='text-gray-600 mb-4 line-clamp-3'>
                      {post.excerpt}
                    </p>
                    <div className='flex items-center justify-between mt-auto'>
                      <div className='flex items-center'>
                        <img
                          src={post.authorImage || "/placeholder.svg"}
                          alt={post.author}
                          className='w-8 h-8 rounded-full mr-2'
                        />
                        <span className='text-sm text-gray-700'>
                          {post.author}
                        </span>
                      </div>
                      <span className='text-xs text-gray-500 flex items-center'>
                        <Clock size={12} className='mr-1' />
                        {post.readTime}
                      </span>
                    </div>
                    <div className='mt-4 pt-4 border-t border-gray-100'>
                      <div className='flex flex-wrap gap-2'>
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className='text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full flex items-center'
                          >
                            <Tag size={10} className='mr-1' />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <a
                      href={`/blog/${post.id}`}
                      className='mt-4 inline-block text-[#89AC46] font-medium hover:underline flex items-center'
                    >
                      Read Article
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className='text-center py-12'>
              <div className='text-5xl mb-4'>🔍</div>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                No articles found
              </h3>
              <p className='text-gray-600 mb-6'>
                We couldn't find any articles matching your search criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Categories");
                }}
                className='bg-[#89AC46] text-white px-6 py-2 rounded-md hover:bg-[#7a9a3d] transition-colors'
              >
                Clear Filters
              </button>
            </div>
          )}
          {filteredPosts.length > 6 && (
            <div className='text-center mt-12'>
              <button className='bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors'>
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </section>

      <GetInTouch />
    </div>
  );
};

export default BlogPage;
