"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Download,
  FileText,
  Image,
  Video,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
} from "lucide-react";
import { pressReleases } from "../data/pressReleases";
import { mediaResources } from "../data/mediaResources";
import { mediaCoverage } from "../data/mediaCoverage";
import { faqItems } from "../data/faqItems";

const PressMediaPage = () => {
  const [activeTab, setActiveTab] = useState("press-releases");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [mediaFilter, setMediaFilter] = useState("all");
  
  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };
  
  const filteredImages =
    mediaFilter === "all"
      ? mediaResources.images
      : mediaResources.images.filter(
          (image) => image.category.toLowerCase() === mediaFilter
        );

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
              Press & Media
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='text-lg text-white/90 mb-8'
            >
              Access the latest news, press releases, and media resources about
              VitaPharma and our innovative emergency medical equipment.
            </motion.p>
          </div>
        </div>
      </section>
      
      <section className='bg-white border-b border-gray-200'>
        <div className='container mx-auto px-4'>
          <div className='flex overflow-x-auto scrollbar-hide'>
            <button
              onClick={() => setActiveTab("press-releases")}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap cursor-pointer ${
                activeTab === "press-releases"
                  ? "text-[#89AC46] border-b-2 border-[#89AC46]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Press Releases
            </button>
            <button
              onClick={() => setActiveTab("media-resources")}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap cursor-pointer ${
                activeTab === "media-resources"
                  ? "text-[#89AC46] border-b-2 border-[#89AC46]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Media Resources
            </button>
            <button
              onClick={() => setActiveTab("media-coverage")}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap cursor-pointer ${
                activeTab === "media-coverage"
                  ? "text-[#89AC46] border-b-2 border-[#89AC46]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Media Coverage
            </button>
            <button
              onClick={() => setActiveTab("media-contacts")}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap cursor-pointer ${
                activeTab === "media-contacts"
                  ? "text-[#89AC46] border-b-2 border-[#89AC46]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Media Contacts
            </button>
            <button
              onClick={() => setActiveTab("faq")}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap cursor-pointer ${
                activeTab === "faq"
                  ? "text-[#89AC46] border-b-2 border-[#89AC46]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              FAQ
            </button>
          </div>
        </div>
      </section>
      
      {activeTab === "press-releases" && (
        <section className='py-12'>
          <div className='container mx-auto px-4'>
            <div className='mb-12'>
              <h2 className='text-2xl font-bold text-gray-800 mb-8'>
                Featured Press Releases
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {pressReleases
                  .filter((release) => release.featured)
                  .map((release) => (
                    <motion.div
                      key={release.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'
                    >
                      <img
                        src={release.image || "/placeholder.svg"}
                        alt={release.title}
                        className='h-48 w-full object-cover'
                      />
                      <div className='p-6'>
                        <div className='flex items-center mb-3'>
                          <Calendar size={16} className='text-[#89AC46] mr-2' />
                          <span className='text-sm text-gray-500'>
                            {release.date}
                          </span>
                        </div>
                        <h3 className='text-xl font-bold text-gray-800 mb-3'>
                          {release.title}
                        </h3>
                        <p className='text-gray-600 mb-4'>{release.excerpt}</p>
                        <div className='flex items-center justify-between'>
                          <a
                            href={`/press-releases/${release.id}`}
                            className='text-[#89AC46] font-medium hover:underline flex items-center'
                          >
                            Read Full Release
                            <ArrowRight size={16} className='ml-1' />
                          </a>
                          <a
                            href={release.pdf}
                            className='text-gray-600 hover:text-gray-800 flex items-center'
                          >
                            <Download size={16} className='mr-1' />
                            PDF
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>

            <div>
              <h2 className='text-2xl font-bold text-gray-800 mb-8'>
                All Press Releases
              </h2>
              <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
                {pressReleases.map((release, index) => (
                  <div
                    key={release.id}
                    className={`p-6 ${
                      index !== pressReleases.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }`}
                  >
                    <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
                      <div className='mb-4 md:mb-0'>
                        <div className='flex items-center mb-2'>
                          <Calendar size={16} className='text-[#89AC46] mr-2' />
                          <span className='text-sm text-gray-500'>
                            {release.date}
                          </span>
                        </div>
                        <h3 className='text-lg font-semibold text-gray-800'>
                          {release.title}
                        </h3>
                      </div>
                      <div className='flex items-center space-x-4'>
                        <a
                          href={`/press-releases/${release.id}`}
                          className='text-[#89AC46] font-medium hover:underline flex items-center'
                        >
                          Read
                          <ArrowRight size={16} className='ml-1' />
                        </a>
                        <a
                          href={release.pdf}
                          className='text-gray-600 hover:text-gray-800 flex items-center'
                        >
                          <Download size={16} className='mr-1' />
                          PDF
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className='text-center mt-8'>
                <button className='bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-50 transition-colors'>
                  Load More Press Releases
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {activeTab === "media-resources" && (
        <section className='py-12'>
          <div className='container mx-auto px-4'>
            <div className='max-w-3xl mx-auto mb-12 text-center'>
              <h2 className='text-2xl font-bold text-gray-800 mb-4'>
                Media Resources
              </h2>
              <p className='text-gray-600'>
                Access official VitaPharma logos, product images, videos, and
                documents for media use. All resources are available for
                download in high resolution.
              </p>
            </div>
            
            <div className='mb-8'>
              <div className='flex flex-wrap justify-center gap-3 mb-8'>
                <button
                  onClick={() => setMediaFilter("all")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    mediaFilter === "all"
                      ? "bg-[#89AC46] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Resources
                </button>
                <button
                  onClick={() => setMediaFilter("branding")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    mediaFilter === "branding"
                      ? "bg-[#89AC46] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Branding
                </button>
                <button
                  onClick={() => setMediaFilter("products")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    mediaFilter === "products"
                      ? "bg-[#89AC46] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Products
                </button>
                <button
                  onClick={() => setMediaFilter("team")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    mediaFilter === "team"
                      ? "bg-[#89AC46] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Team
                </button>
                <button
                  onClick={() => setMediaFilter("facilities")}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    mediaFilter === "facilities"
                      ? "bg-[#89AC46] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Facilities
                </button>
              </div>
            </div>
            
            <div className='mb-12'>
              <div className='flex items-center mb-6'>
                <Image size={20} className='text-[#89AC46] mr-2' />
                <h3 className='text-xl font-semibold text-gray-800'>Images</h3>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                {filteredImages.map((image) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'
                  >
                    <div className='p-2'>
                      <img
                        src={image.thumbnail || "/placeholder.svg"}
                        alt={image.title}
                        className='w-full h-40 object-cover rounded'
                      />
                    </div>
                    <div className='p-4'>
                      <h4 className='font-medium text-gray-800 mb-2'>
                        {image.title}
                      </h4>
                      <div className='flex items-center justify-between'>
                        <span className='text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full'>
                          {image.category}
                        </span>
                        <a
                          href={image.highRes}
                          className='text-[#89AC46] text-sm font-medium hover:underline flex items-center'
                        >
                          <Download size={14} className='mr-1' />
                          Download
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className='mb-12'>
              <div className='flex items-center mb-6'>
                <Video size={20} className='text-[#89AC46] mr-2' />
                <h3 className='text-xl font-semibold text-gray-800'>Videos</h3>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {mediaResources.videos.map((video) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'
                  >
                    <div className='relative'>
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className='w-full h-40 object-cover'
                      />
                      <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='w-12 h-12 rounded-full bg-white/80 flex items-center justify-center'>
                          <div className='w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-[#89AC46] border-b-[8px] border-b-transparent ml-1'></div>
                        </div>
                      </div>
                      <div className='absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded'>
                        {video.duration}
                      </div>
                    </div>
                    <div className='p-4'>
                      <h4 className='font-medium text-gray-800 mb-2'>
                        {video.title}
                      </h4>
                      <a
                        href={video.url}
                        className='text-[#89AC46] text-sm font-medium hover:underline flex items-center'
                      >
                        Watch Video
                        <ArrowRight size={14} className='ml-1' />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <div className='flex items-center mb-6'>
                <FileText size={20} className='text-[#89AC46] mr-2' />
                <h3 className='text-xl font-semibold text-gray-800'>
                  Documents
                </h3>
              </div>

              <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
                {mediaResources.documents.map((document, index) => (
                  <div
                    key={document.id}
                    className={`p-6 ${
                      index !== mediaResources.documents.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }`}
                  >
                    <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
                      <div className='mb-4 md:mb-0'>
                        <h4 className='font-semibold text-gray-800 mb-1'>
                          {document.title}
                        </h4>
                        <p className='text-sm text-gray-600'>
                          {document.description}
                        </p>
                      </div>
                      <div className='flex items-center'>
                        <span className='text-xs text-gray-500 mr-4'>
                          {document.fileSize}
                        </span>
                        <a
                          href={document.file}
                          className='bg-[#89AC46] text-white px-4 py-2 rounded-md hover:bg-[#7a9a3d] transition-colors flex items-center'
                        >
                          <Download size={16} className='mr-2' />
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
      
      {activeTab === "media-coverage" && (
        <section className='py-12'>
          <div className='container mx-auto px-4'>
            <div className='max-w-3xl mx-auto mb-12 text-center'>
              <h2 className='text-2xl font-bold text-gray-800 mb-4'>
                Media Coverage
              </h2>
              <p className='text-gray-600'>
                Recent news articles, interviews, and features about VitaPharma and
                our products from media outlets around the world.
              </p>
            </div>

            <div className='max-w-4xl mx-auto'>
              {mediaCoverage.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`bg-white p-6 rounded-lg shadow-sm mb-6 ${
                    index !== mediaCoverage.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  <div className='flex items-center mb-2'>
                    <span className='text-sm font-medium text-[#89AC46]'>
                      {item.publication}
                    </span>
                    <span className='mx-2 text-gray-300'>|</span>
                    <span className='text-sm text-gray-500 flex items-center'>
                      <Calendar size={14} className='mr-1' />
                      {item.date}
                    </span>
                  </div>
                  <h3 className='text-xl font-bold text-gray-800 mb-3'>
                    {item.title}
                  </h3>
                  <p className='text-gray-600 mb-4'>{item.excerpt}</p>
                  <a
                    href={item.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-[#89AC46] font-medium hover:underline flex items-center'
                  >
                    Read Article
                    <ArrowRight size={16} className='ml-1' />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {activeTab === "media-contacts" && (
        <section className='py-12'>
          <div className='container mx-auto px-4'>
            <div className='max-w-3xl mx-auto'>
              <div className='text-center mb-12'>
                <h2 className='text-2xl font-bold text-gray-800 mb-4'>
                  Media Contacts
                </h2>
                <p className='text-gray-600'>
                  For press inquiries, interview requests, or additional
                  information, please contact our media relations team.
                </p>
              </div>

              <div className='bg-white rounded-lg shadow-sm overflow-hidden mb-12'>
                <div className='p-6 border-b border-gray-200'>
                  <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                    Press & Media Inquiries
                  </h3>
                  <div className='space-y-3'>
                    <p className='flex items-center'>
                      <Mail className='h-5 w-5 text-[#89AC46] mr-3' />
                      <span className='text-gray-700'>media@VitaPharma.com</span>
                    </p>
                    <p className='flex items-center'>
                      <Phone className='h-5 w-5 text-[#89AC46] mr-3' />
                      <span className='text-gray-700'>+1 (555) 123-4567</span>
                    </p>
                  </div>
                </div>

                <div className='p-6'>
                  <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                    Media Relations Team
                  </h3>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='flex items-start'>
                      <img
                        src='/placeholder.svg?height=80&width=80&text=JD'
                        alt='Jane Doe'
                        className='w-16 h-16 rounded-full mr-4'
                      />
                      <div>
                        <h4 className='font-semibold text-gray-800'>
                          Jane Doe
                        </h4>
                        <p className='text-sm text-gray-600 mb-2'>
                          Director of Communications
                        </p>
                        <p className='text-sm text-gray-700'>
                          jane.doe@VitaPharma.com
                        </p>
                      </div>
                    </div>
                    <div className='flex items-start'>
                      <img
                        src='/placeholder.svg?height=80&width=80&text=JS'
                        alt='John Smith'
                        className='w-16 h-16 rounded-full mr-4'
                      />
                      <div>
                        <h4 className='font-semibold text-gray-800'>
                          John Smith
                        </h4>
                        <p className='text-sm text-gray-600 mb-2'>
                          Media Relations Manager
                        </p>
                        <p className='text-sm text-gray-700'>
                          john.smith@VitaPharma.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className='bg-[#89AC46]/5 rounded-lg p-6 md:p-8'>
                <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                  Subscribe to Press Releases
                </h3>
                <p className='text-gray-600 mb-6'>
                  Join our media distribution list to receive the latest press
                  releases and company announcements.
                </p>
                <form className='space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label
                        htmlFor='name'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Name
                      </label>
                      <input
                        type='text'
                        id='name'
                        className='w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]'
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='email'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Email
                      </label>
                      <input
                        type='email'
                        id='email'
                        className='w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]'
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor='organization'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Organization
                    </label>
                    <input
                      type='text'
                      id='organization'
                      className='w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Areas of Interest
                    </label>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                      <div className='flex items-center'>
                        <input
                          type='checkbox'
                          id='product-announcements'
                          className='h-4 w-4 text-[#89AC46] focus:ring-[#89AC46] border-gray-300 rounded'
                        />
                        <label
                          htmlFor='product-announcements'
                          className='ml-2 text-sm text-gray-700'
                        >
                          Product Announcements
                        </label>
                      </div>
                      <div className='flex items-center'>
                        <input
                          type='checkbox'
                          id='company-news'
                          className='h-4 w-4 text-[#89AC46] focus:ring-[#89AC46] border-gray-300 rounded'
                        />
                        <label
                          htmlFor='company-news'
                          className='ml-2 text-sm text-gray-700'
                        >
                          Company News
                        </label>
                      </div>
                      <div className='flex items-center'>
                        <input
                          type='checkbox'
                          id='industry-insights'
                          className='h-4 w-4 text-[#89AC46] focus:ring-[#89AC46] border-gray-300 rounded'
                        />
                        <label
                          htmlFor='industry-insights'
                          className='ml-2 text-sm text-gray-700'
                        >
                          Industry Insights
                        </label>
                      </div>
                      <div className='flex items-center'>
                        <input
                          type='checkbox'
                          id='events'
                          className='h-4 w-4 text-[#89AC46] focus:ring-[#89AC46] border-gray-300 rounded'
                        />
                        <label
                          htmlFor='events'
                          className='ml-2 text-sm text-gray-700'
                        >
                          Events & Webinars
                        </label>
                      </div>
                    </div>
                  </div>

                  <button
                    type='submit'
                    className='bg-[#89AC46] text-white px-6 py-2 rounded-md hover:bg-[#7a9a3d] transition-colors'
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {activeTab === "faq" && (
        <section className='py-12'>
          <div className='container mx-auto px-4'>
            <div className='max-w-3xl mx-auto'>
              <div className='text-center mb-12'>
                <h2 className='text-2xl font-bold text-gray-800 mb-4'>
                  Frequently Asked Questions
                </h2>
                <p className='text-gray-600'>
                  Find answers to common questions about media inquiries,
                  resources, and company information.
                </p>
              </div>

              <div className='space-y-4'>
                {faqItems.map((item, index) => (
                  <div
                    key={index}
                    className='bg-white rounded-lg shadow-sm overflow-hidden'
                  >
                    <button
                      className='w-full flex justify-between items-center p-6 text-left'
                      onClick={() => toggleFaq(index)}
                    >
                      <span className='font-semibold text-gray-800'>
                        {item.question}
                      </span>
                      {expandedFaq === index ? (
                        <ChevronUp className='h-5 w-5 text-gray-500' />
                      ) : (
                        <ChevronDown className='h-5 w-5 text-gray-500' />
                      )}
                    </button>

                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className='px-6 pb-6'
                      >
                        <p className='text-gray-600'>{item.answer}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              <div className='mt-12 text-center'>
                <p className='text-gray-600 mb-4'>
                  Don't see your question answered here? Contact our media
                  relations team directly.
                </p>
                <a
                  href='mailto:media@VitaPharma.com'
                  className='bg-[#89AC46] text-white px-6 py-2 rounded-md hover:bg-[#7a9a3d] transition-colors inline-block'
                >
                  Contact Media Relations
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PressMediaPage;
