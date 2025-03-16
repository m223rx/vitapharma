"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import image4 from "../assets/images/categories/pulse.jpg";
import image6 from "../assets/images/categories/wound_care.jpg";
import image1 from "../assets/images/categories/stethoscopes.jpg";
import image3 from "../assets/images/categories/thermometers.jpeg";
import image5 from "../assets/images/categories/mobility_aids.jpg";
import image2 from "../assets/images/categories/blood_pressure.jpg";
import image7 from "../assets/images/categories/patient_transfer.jpg";

function SubNavCategories() {
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState(null);

  const categories = [
    {
      name: "Diagnostic Equipment",
      subcategories: [
        {
          name: "Stethoscopes",
          image: image1,
          description:
            "Professional grade stethoscopes for accurate auscultation",
        },
        {
          name: "Blood Pressure Monitors",
          image: image2,
          description: "Digital and manual blood pressure monitoring devices",
        },
        {
          name: "Thermometers",
          image: image3,
          description:
            "Digital and infrared thermometers for accurate temperature measurement",
        },
        {
          name: "Pulse Oximeters",
          image: image4,
          description: "Devices for measuring blood oxygen saturation levels",
        },
      ],
    },
    {
      name: "Patient Care",
      subcategories: [
        {
          name: "Mobility Aids",
          image: image5,
          description: "Wheelchairs, walkers, and mobility assistance devices",
        },
        {
          name: "Wound Care",
          image: image6,
          description: "Advanced wound dressing and care products",
        },
        {
          name: "Patient Transfer",
          image: image7,
          description: "Equipment for safe patient movement and transfer",
        },
        {
          name: "Bathroom Safety",
          image: image1,
          description: "Safety equipment for bathroom use",
        },
      ],
    },
    {
      name: "Medical Supplies",
      subcategories: [
        {
          name: "Disposables",
          image: image2,
          description: "Essential disposable medical supplies",
        },
        {
          name: "First Aid",
          image: image3,
          description: "Comprehensive first aid supplies and kits",
        },
        {
          name: "Infection Control",
          image: image4,
          description: "Products for maintaining sterile environments",
        },
        {
          name: "Medical Instruments",
          image: image5,
          description: "Professional medical instruments and tools",
        },
      ],
    },
    {
      name: "Rehabilitation",
      subcategories: [
        {
          name: "Physical Therapy",
          image: image6,
          description: "Equipment for physical therapy and rehabilitation",
        },
        {
          name: "Exercise Equipment",
          image: image7,
          description: "Specialized exercise and rehabilitation equipment",
        },
        {
          name: "Therapy Supplies",
          image: image1,
          description: "Supplies for therapeutic treatments",
        },
        {
          name: "Pain Management",
          image: image2,
          description: "Products for pain relief and management",
        },
      ],
    },
    {
      name: "Professional Wear",
      subcategories: [
        {
          name: "Scrubs",
          image: image3,
          description: "Professional medical uniforms and scrubs",
        },
        {
          name: "Lab Coats",
          image: image4,
          description: "Professional laboratory and medical coats",
        },
        {
          name: "Medical Footwear",
          image: image5,
          description: "Comfortable and safe medical footwear",
        },
        {
          name: "Protective Gear",
          image: image6,
          description: "Personal protective equipment (PPE)",
        },
      ],
    },
  ];

  const DesktopSubcategoryCard = ({ subcategory }) => (
    <motion.div
      className='flex items-center space-x-3 p-2 hover:bg-gray-50'
      whileHover={{ x: 5 }}
      onMouseEnter={() => setHoveredSubcategory(subcategory)}
      onMouseLeave={() => setHoveredSubcategory(null)}
    >
      <img
        src={subcategory.image || "/placeholder.svg"}
        alt={subcategory.name}
        className='h-12 w-12 rounded-lg object-cover'
      />
      <div>
        <h3 className='text-sm font-medium text-gray-900'>
          {subcategory.name}
        </h3>
        <p className='text-xs text-gray-500'>{subcategory.description}</p>
      </div>
    </motion.div>
  );

  const MobileSubcategoryLink = ({ subcategory }) => (
    <motion.a
      href={`/category/${subcategory.name.toLowerCase()}`}
      className='block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#89AC46]'
      whileHover={{ x: 5 }}
    >
      {subcategory.name}
    </motion.a>
  );

  return (
    <div className='relative bg-white border-t border-gray-200'>
      <div className='hidden lg:block'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex h-16 items-center justify-center'>
            <div className='flex space-x-8'>
              {categories.map((category) => (
                <div
                  key={category.name}
                  className='relative'
                  onMouseEnter={() => setHoveredCategory(category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <button
                    className={`group flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors ${
                      hoveredCategory?.name === category.name
                        ? "text-[#89AC46]"
                        : "text-gray-700 hover:text-[#89AC46]"
                    }`}
                  >
                    {category.name}
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform ${
                        hoveredCategory?.name === category.name
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {hoveredCategory?.name === category.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className='absolute left-0 z-50 mt-2 w-[800px] -translate-x-1/4'
                      >
                        <div className='overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
                          <div className='grid grid-cols-2 gap-8 p-6'>
                            <div className='space-y-4'>
                              {category.subcategories.map((subcategory) => (
                                <DesktopSubcategoryCard
                                  key={subcategory.name}
                                  subcategory={subcategory}
                                />
                              ))}
                            </div>
                            <div className='relative h-full min-h-[400px] overflow-hidden rounded-lg'>
                              <motion.img
                                key={
                                  hoveredSubcategory?.image ||
                                  category.subcategories[0].image
                                }
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                src={
                                  hoveredSubcategory?.image ||
                                  category.subcategories[0].image ||
                                  "/placeholder.svg"
                                }
                                alt={hoveredSubcategory?.name || category.name}
                                className='absolute inset-0 h-full w-full object-cover'
                              />
                              <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/20' />
                              <div className='absolute bottom-4 left-4 right-4'>
                                <h3 className='text-lg font-semibold text-white'>
                                  {hoveredSubcategory?.name || category.name}
                                </h3>
                                <p className='mt-1 text-sm text-white/90'>
                                  {hoveredSubcategory?.description ||
                                    "Explore our range of medical equipment"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='lg:hidden'>
        <div className='divide-y divide-gray-200'>
          {categories.map((category) => (
            <div key={category.name} className='py-2'>
              <button
                onClick={() =>
                  setHoveredCategory(
                    hoveredCategory?.name === category.name ? null : category
                  )
                }
                className='flex w-full items-center justify-between px-4 py-2 text-base font-medium text-gray-700'
              >
                <span>{category.name}</span>
                <motion.span
                  animate={{
                    rotate: hoveredCategory?.name === category.name ? 180 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className='h-5 w-5' />
                </motion.span>
              </button>
              <AnimatePresence>
                {hoveredCategory?.name === category.name && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className='overflow-hidden bg-gray-50'
                  >
                    <div className='py-2'>
                      {category.subcategories.map((subcategory) => (
                        <MobileSubcategoryLink
                          key={subcategory.name}
                          subcategory={subcategory}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SubNavCategories;
