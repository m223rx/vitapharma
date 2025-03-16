"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { timelineEvents } from "../data/timelineEvents";
import { leadershipTeam } from "../data/leadershipTeam";
import { impactStats } from "../data/impactStats";
import { coreValues } from "../data/coreValues";

const OurStoryPage = () => {
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);

  return (
    <div className='min-h-screen bg-gray-50'>
      <section className='bg-gradient-to-r from-[#89AC46] to-[#626F47] py-16 md:py-24'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col md:flex-row items-center'>
            <div className='md:w-1/2 mb-10 md:mb-0'>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6'
              >
                Our Story
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className='text-lg text-white/90 mb-8'
              >
                From humble beginnings to a global leader in emergency medical
                equipment, discover the journey that shaped VitaPharma and our
                mission to save lives.
              </motion.p>
            </div>
            <div className='md:w-1/2'>
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src='https://placehold.co/700x300'
                alt='VitaPharma Story'
                className='rounded-lg shadow-xl'
              />
            </div>
          </div>
        </div>
      </section>

      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='max-w-3xl mx-auto text-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className='text-3xl font-bold text-gray-800 mb-6'>
                Our Mission
              </h2>
              <p className='text-xl text-gray-600 mb-12'>
                To revolutionize emergency medical care by providing innovative,
                reliable, and user-centered equipment that empowers healthcare
                professionals to save lives.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className='text-3xl font-bold text-gray-800 mb-6'>
                Our Vision
              </h2>
              <p className='text-xl text-gray-600'>
                A world where every emergency responder has access to the best
                medical equipment, enabling them to provide optimal care and
                save more lives in critical situations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              Our Core Values
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              These principles guide everything we do at VitaPharma, from
              product development to customer service.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='bg-white p-6 rounded-lg shadow-sm'
              >
                <div className='bg-[#89AC46]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4'>
                  <value.icon className='text-[#89AC46] h-7 w-7' />
                </div>
                <h3 className='text-xl font-semibold text-gray-800 mb-3'>
                  {value.title}
                </h3>
                <p className='text-gray-600'>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              Our Journey
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              From our founding to the present day, explore the key milestones
              that have shaped VitaPharma's growth and impact.
            </p>
          </div>

          <div className='flex flex-col lg:flex-row gap-8'>
            <div className='lg:w-1/4'>
              <div className='bg-gray-50 rounded-lg p-4'>
                <ul className='space-y-2'>
                  {timelineEvents.map((event, index) => (
                    <li key={index}>
                      <button
                        className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                          activeTimelineIndex === index
                            ? "bg-[#89AC46] text-white"
                            : "hover:bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setActiveTimelineIndex(index)}
                      >
                        <span className='font-bold'>{event.year}</span> -{" "}
                        {event.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className='lg:w-3/4'>
              <motion.div
                key={activeTimelineIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className='bg-gray-50 rounded-lg overflow-hidden'
              >
                <img
                  src={
                    timelineEvents[activeTimelineIndex].image ||
                    "/placeholder.svg"
                  }
                  alt={timelineEvents[activeTimelineIndex].title}
                  className='w-full h-64 object-cover'
                />
                <div className='p-6'>
                  <div className='flex items-center mb-4'>
                    <span className='text-3xl font-bold text-[#89AC46] mr-3'>
                      {timelineEvents[activeTimelineIndex].year}
                    </span>
                    <h3 className='text-2xl font-semibold text-gray-800'>
                      {timelineEvents[activeTimelineIndex].title}
                    </h3>
                  </div>
                  <p className='text-gray-600'>
                    {timelineEvents[activeTimelineIndex].description}
                  </p>
                </div>
              </motion.div>

              <div className='flex justify-between mt-4'>
                <button
                  onClick={() =>
                    setActiveTimelineIndex(Math.max(0, activeTimelineIndex - 1))
                  }
                  disabled={activeTimelineIndex === 0}
                  className={`flex items-center px-4 py-2 rounded-md ${
                    activeTimelineIndex === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ChevronLeft className='h-5 w-5 mr-1' />
                  Previous
                </button>
                <button
                  onClick={() =>
                    setActiveTimelineIndex(
                      Math.min(
                        timelineEvents.length - 1,
                        activeTimelineIndex + 1
                      )
                    )
                  }
                  disabled={activeTimelineIndex === timelineEvents.length - 1}
                  className={`flex items-center px-4 py-2 rounded-md ${
                    activeTimelineIndex === timelineEvents.length - 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Next
                  <ChevronRight className='h-5 w-5 ml-1' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-16 bg-[#89AC46]/10'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              Our Impact
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              The numbers tell the story of our commitment to improving
              emergency medical care worldwide.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='bg-white p-6 rounded-lg shadow-sm text-center'
              >
                <div className='text-4xl font-bold text-[#89AC46] mb-2'>
                  {stat.number}
                </div>
                <h3 className='text-xl font-semibold text-gray-800 mb-3'>
                  {stat.label}
                </h3>
                <p className='text-gray-600'>{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              Our Leadership
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              Meet the experienced team guiding VitaPharma's mission to
              revolutionize emergency medical equipment.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {leadershipTeam.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='bg-gray-50 rounded-lg overflow-hidden shadow-sm'
              >
                <img
                  src={leader.image || "/placeholder.svg"}
                  alt={leader.name}
                  className='w-full h-64 object-cover'
                />
                <div className='p-6'>
                  <h3 className='text-xl font-semibold text-gray-800 mb-1'>
                    {leader.name}
                  </h3>
                  <p className='text-[#89AC46] font-medium mb-3'>
                    {leader.title}
                  </p>
                  <p className='text-gray-600'>{leader.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col lg:flex-row items-center gap-12'>
            <div className='lg:w-1/2'>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className='text-3xl font-bold text-gray-800 mb-6'
              >
                Our Global Presence
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className='text-lg text-gray-600 mb-6'
              >
                VitaPharma operates in over 50 countries across 6 continents,
                with headquarters in the United States and regional offices in
                Europe, Asia, and Australia.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className='text-lg text-gray-600 mb-6'
              >
                Our global network allows us to understand diverse healthcare
                needs and deliver tailored solutions for emergency medical
                services worldwide.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <ul className='space-y-2 mb-6'>
                  <li className='flex items-start'>
                    <CheckCircle className='h-5 w-5 text-[#89AC46] mr-2 flex-shrink-0 mt-0.5' />
                    <span className='text-gray-600'>
                      Manufacturing facilities in the US, Germany, and Singapore
                    </span>
                  </li>
                  <li className='flex items-start'>
                    <CheckCircle className='h-5 w-5 text-[#89AC46] mr-2 flex-shrink-0 mt-0.5' />
                    <span className='text-gray-600'>
                      Distribution centers strategically located for efficient
                      global delivery
                    </span>
                  </li>
                  <li className='flex items-start'>
                    <CheckCircle className='h-5 w-5 text-[#89AC46] mr-2 flex-shrink-0 mt-0.5' />
                    <span className='text-gray-600'>
                      Local support teams providing training and technical
                      assistance
                    </span>
                  </li>
                  <li className='flex items-start'>
                    <CheckCircle className='h-5 w-5 text-[#89AC46] mr-2 flex-shrink-0 mt-0.5' />
                    <span className='text-gray-600'>
                      Research partnerships with leading medical institutions
                      worldwide
                    </span>
                  </li>
                </ul>
              </motion.div>
            </div>
            <div className='lg:w-1/2'>
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                src='https://placehold.co/700x500'
                alt='VitaPharma Global Presence'
                className='rounded-lg shadow-sm'
              />
            </div>
          </div>
        </div>
      </section>

      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col lg:flex-row-reverse items-center gap-12'>
            <div className='lg:w-1/2'>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className='text-3xl font-bold text-gray-800 mb-6'
              >
                Our Commitment to Sustainability
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className='text-lg text-gray-600 mb-6'
              >
                At VitaPharma, we believe that saving lives and protecting our
                planet go hand in hand. We're committed to sustainable practices
                throughout our operations.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ul className='space-y-4 mb-6'>
                  <li className='flex items-start'>
                    <div className='bg-[#89AC46]/10 p-2 rounded-full mr-3 flex-shrink-0'>
                      <CheckCircle className='h-5 w-5 text-[#89AC46]' />
                    </div>
                    <div>
                      <h4 className='font-medium text-gray-800 mb-1'>
                        Carbon Neutrality
                      </h4>
                      <p className='text-gray-600'>
                        We're on track to achieve carbon-neutral operations by
                        2030 through renewable energy and carbon offset
                        programs.
                      </p>
                    </div>
                  </li>
                  <li className='flex items-start'>
                    <div className='bg-[#89AC46]/10 p-2 rounded-full mr-3 flex-shrink-0'>
                      <CheckCircle className='h-5 w-5 text-[#89AC46]' />
                    </div>
                    <div>
                      <h4 className='font-medium text-gray-800 mb-1'>
                        Sustainable Materials
                      </h4>
                      <p className='text-gray-600'>
                        We're transitioning to eco-friendly materials and
                        reducing plastic in our products and packaging.
                      </p>
                    </div>
                  </li>
                  <li className='flex items-start'>
                    <div className='bg-[#89AC46]/10 p-2 rounded-full mr-3 flex-shrink-0'>
                      <CheckCircle className='h-5 w-5 text-[#89AC46]' />
                    </div>
                    <div>
                      <h4 className='font-medium text-gray-800 mb-1'>
                        Waste Reduction
                      </h4>
                      <p className='text-gray-600'>
                        Our manufacturing facilities implement zero-waste
                        initiatives and comprehensive recycling programs.
                      </p>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>
            <div className='lg:w-1/2'>
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                src='https://placehold.co/700x500'
                alt='VitaPharma Sustainability Initiatives'
                className='rounded-lg shadow-sm'
              />
            </div>
          </div>
        </div>
      </section>

      <section className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              Community Involvement
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              We're committed to giving back to communities and supporting
              emergency medical services worldwide.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='bg-white rounded-lg overflow-hidden shadow-sm'
            >
              <img
                src='https://placehold.co/300x300'
                alt='Training Programs'
                className='w-full h-48 object-cover'
              />
              <div className='p-6'>
                <h3 className='text-xl font-semibold text-gray-800 mb-3'>
                  Training Programs
                </h3>
                <p className='text-gray-600 mb-4'>
                  We provide free training programs for VitaPharmaics and EMTs
                  in underserved communities, helping them develop skills to
                  save more lives.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='bg-white rounded-lg overflow-hidden shadow-sm'
            >
              <img
                src='https://placehold.co/300x300'
                alt='Equipment Donations'
                className='w-full h-48 object-cover'
              />
              <div className='p-6'>
                <h3 className='text-xl font-semibold text-gray-800 mb-3'>
                  Equipment Donations
                </h3>
                <p className='text-gray-600 mb-4'>
                  Through our VitaPharma Cares initiative, we donate essential
                  medical equipment to emergency services in developing regions.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='bg-white rounded-lg overflow-hidden shadow-sm'
            >
              <img
                src='https://placehold.co/300x300'
                alt='Disaster Response'
                className='w-full h-48 object-cover'
              />
              <div className='p-6'>
                <h3 className='text-xl font-semibold text-gray-800 mb-3'>
                  Disaster Response
                </h3>
                <p className='text-gray-600 mb-4'>
                  Our rapid response team provides equipment and support to
                  areas affected by natural disasters and humanitarian crises.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className='py-16 bg-[#89AC46]'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold text-white mb-6'>
            Join Us in Our Mission
          </h2>
          <p className='text-xl text-white/90 mb-8 max-w-3xl mx-auto'>
            Whether you're a healthcare professional, partner, or someone
            passionate about improving emergency care, there are many ways to be
            part of our story.
          </p>
          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <a
              href='/careers'
              className='bg-white text-[#89AC46] px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors'
            >
              Join Our Team
            </a>
            <a
              href='/partnerships'
              className='border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors'
            >
              Become a Partner
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurStoryPage;
