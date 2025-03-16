"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Briefcase,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Users,
  Zap,
  Award,
  ChevronRight,
} from "lucide-react";
import { benefits } from "../data/benefits";
import { values } from "../data/values";

import user from "../assets/images/user/user.jpg";

const jobListings = [
  {
    id: 1,
    title: "Medical Equipment Sales Specialist",
    department: "Sales",
    location: "New York, NY",
    type: "Full-time",
    description:
      "We're looking for an experienced Medical Equipment Sales Specialist to join our team. The ideal candidate will have a strong background in medical device sales and a passion for improving healthcare outcomes through innovative equipment solutions.",
    requirements: [
      "Bachelor's degree in Business, Healthcare, or related field",
      "3+ years of experience in medical equipment sales",
      "Knowledge of emergency medical services and equipment",
      "Strong communication and negotiation skills",
      "Ability to travel up to 50% of the time",
    ],
    posted: "March 10, 2025",
    featured: true,
  },
  {
    id: 2,
    title: "Product Development Engineer",
    department: "R&D",
    location: "Boston, MA",
    type: "Full-time",
    description:
      "Join our R&D team to design and develop next-generation VitaPharmaic and emergency medical equipment. You'll work closely with healthcare professionals to create innovative solutions that save lives.",
    requirements: [
      "Bachelor's or Master's degree in Biomedical Engineering or related field",
      "Experience with medical device development",
      "Knowledge of regulatory requirements (FDA, CE)",
      "Proficiency in CAD software",
      "Strong problem-solving skills",
    ],
    posted: "March 5, 2025",
    featured: true,
  },
  {
    id: 3,
    title: "Quality Assurance Specialist",
    department: "Quality",
    location: "Chicago, IL",
    type: "Full-time",
    description:
      "Ensure our medical equipment meets the highest quality standards and complies with all regulatory requirements. You'll be responsible for testing, documentation, and continuous improvement of our quality processes.",
    requirements: [
      "Bachelor's degree in Engineering, Quality Assurance, or related field",
      "Experience with ISO 13485 and FDA QSR regulations",
      "Knowledge of quality control methodologies",
      "Attention to detail and analytical skills",
      "Experience with quality management systems",
    ],
    posted: "March 1, 2025",
    featured: false,
  },
  {
    id: 4,
    title: "Technical Support Specialist",
    department: "Customer Support",
    location: "Remote",
    type: "Full-time",
    description:
      "Provide technical support to customers using our medical equipment. You'll troubleshoot issues, guide users through product features, and ensure customer satisfaction with our products and services.",
    requirements: [
      "Associate's or Bachelor's degree in a technical field",
      "Experience with medical equipment or healthcare technology",
      "Strong communication and customer service skills",
      "Problem-solving abilities",
      "Ability to work in a fast-paced environment",
    ],
    posted: "February 25, 2025",
    featured: false,
  },
  {
    id: 5,
    title: "Marketing Coordinator",
    department: "Marketing",
    location: "Miami, FL",
    type: "Full-time",
    description:
      "Support our marketing team in creating and implementing campaigns for our medical equipment products. You'll assist with content creation, event planning, and digital marketing initiatives.",
    requirements: [
      "Bachelor's degree in Marketing, Communications, or related field",
      "Experience with digital marketing platforms",
      "Strong writing and communication skills",
      "Knowledge of healthcare or medical industry a plus",
      "Creative thinking and attention to detail",
    ],
    posted: "February 20, 2025",
    featured: false,
  },
  {
    id: 6,
    title: "Supply Chain Analyst",
    department: "Operations",
    location: "Dallas, TX",
    type: "Full-time",
    description:
      "Optimize our supply chain processes to ensure efficient delivery of medical equipment to customers. You'll analyze data, identify improvement opportunities, and implement solutions to enhance our operations.",
    requirements: [
      "Bachelor's degree in Supply Chain, Business, or related field",
      "Experience with supply chain management",
      "Strong analytical and problem-solving skills",
      "Proficiency in data analysis tools",
      "Knowledge of inventory management systems",
    ],
    posted: "February 15, 2025",
    featured: false,
  },
  {
    id: 7,
    title: "Clinical Education Specialist",
    department: "Training",
    location: "Denver, CO",
    type: "Full-time",
    description:
      "Develop and deliver training programs for healthcare professionals on the proper use of our medical equipment. You'll create educational materials, conduct workshops, and provide ongoing support to ensure effective product utilization.",
    requirements: [
      "Bachelor's degree in Nursing, Healthcare Education, or related field",
      "Clinical experience in emergency medicine or VitaPharmaic services",
      "Strong presentation and communication skills",
      "Experience developing training materials",
      "Ability to travel up to 40% of the time",
    ],
    posted: "February 10, 2025",
    featured: false,
  },
  {
    id: 8,
    title: "Regulatory Affairs Associate",
    department: "Compliance",
    location: "Washington, DC",
    type: "Full-time",
    description:
      "Support our regulatory compliance efforts for medical devices and equipment. You'll assist with documentation, submissions to regulatory bodies, and ensuring our products meet all applicable standards and requirements.",
    requirements: [
      "Bachelor's degree in Life Sciences, Engineering, or related field",
      "Knowledge of medical device regulations (FDA, EU MDR)",
      "Attention to detail and organizational skills",
      "Strong written and verbal communication",
      "Experience with regulatory submissions a plus",
    ],
    posted: "February 5, 2025",
    featured: false,
  },
];

const departments = [
  {
    name: "Research & Development",
    description:
      "Our R&D team designs and develops innovative medical equipment that meets the evolving needs of emergency medical professionals.",
    image: "https://placehold.co/300x300",
  },
  {
    name: "Sales & Marketing",
    description:
      "This team brings our products to market, building relationships with healthcare providers and communicating the value of our solutions.",
    image: "https://placehold.co/300x300",
  },
  {
    name: "Operations & Manufacturing",
    description:
      "From supply chain management to production, this team ensures our high-quality products are delivered efficiently to customers.",
    image: "https://placehold.co/300x300",
  },
  {
    name: "Quality & Regulatory",
    description:
      "This team ensures our products meet all quality standards and regulatory requirements, maintaining our reputation for excellence.",
    image: "https://placehold.co/300x300",
  },
];

const CareersPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedJobType, setSelectedJobType] = useState("All");
  const [expandedJob, setExpandedJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = jobListings.filter((job) => {
    if (selectedDepartment !== "All" && job.department !== selectedDepartment)
      return false;

    if (selectedLocation !== "All" && job.location !== selectedLocation)
      return false;

    if (selectedJobType !== "All" && job.type !== selectedJobType) return false;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        job.title.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.department.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const departments = [...new Set(jobListings.map((job) => job.department))];
  const locations = [...new Set(jobListings.map((job) => job.location))];
  const jobTypes = [...new Set(jobListings.map((job) => job.type))];

  const toggleJobExpansion = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
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
              Join Our Team
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='text-lg text-white/90 mb-8'
            >
              Help us revolutionize emergency medical equipment and make a
              difference in healthcare worldwide.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a
                href='#open-positions'
                className='bg-white text-[#89AC46] px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors'
              >
                View Open Positions
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              Why Join VitaPharma?
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              At VitaPharma, we're more than just a medical equipment company.
              We're a team of passionate individuals dedicated to improving
              emergency healthcare worldwide.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='bg-gray-50 p-6 rounded-lg'
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

      <section className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              Employee Benefits
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              We offer a comprehensive benefits package designed to support your
              health, wellbeing, and professional growth.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='bg-white p-6 rounded-lg shadow-sm'
              >
                <div className='flex items-center mb-4'>
                  <div className='bg-[#89AC46]/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mr-4'>
                    <benefit.icon className='text-[#89AC46] h-6 w-6' />
                  </div>
                  <h3 className='text-xl font-semibold text-gray-800'>
                    {benefit.title}
                  </h3>
                </div>
                <ul className='space-y-2'>
                  {benefit.items.map((item, idx) => (
                    <li key={idx} className='flex items-start'>
                      <CheckCircle className='h-5 w-5 text-[#89AC46] mr-2 flex-shrink-0 mt-0.5' />
                      <span className='text-gray-600'>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>Our Teams</h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              Discover the diverse teams that make up VitaPharma and find where
              your skills and passion fit best.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {departments.map((dept, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='bg-gray-50 rounded-lg overflow-hidden shadow-sm'
              >
                <img
                  src={dept.image || "https://placehold.co/300x300"}
                  alt={dept.name}
                  className='w-full h-48 object-cover'
                />
                <div className='p-6'>
                  <h3 className='text-xl font-semibold text-gray-800 mb-3'>
                    {dept.name}
                  </h3>
                  <p className='text-gray-600 mb-4'>{dept.description}</p>
                  <a
                    href='#open-positions'
                    className='text-[#89AC46] font-medium hover:underline inline-flex items-center'
                    onClick={() => setSelectedDepartment(dept.name)}
                  >
                    View Open Positions
                    <ChevronRight className='ml-1 h-4 w-4' />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id='open-positions' className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              Open Positions
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              Explore our current job openings and find the perfect opportunity
              to grow your career with VitaPharma.
            </p>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-sm mb-8'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
              <div className='md:col-span-2'>
                <input
                  type='text'
                  placeholder='Search positions...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#89AC46]'
                />
              </div>

              <div>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#89AC46]'
                >
                  <option value='All'>All Departments</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#89AC46]'
                >
                  <option value='All'>All Locations</option>
                  {locations.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {filteredJobs.length > 0 ? (
            <div className='space-y-4'>
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className='bg-white rounded-lg shadow-sm overflow-hidden'
                >
                  <div
                    className={`p-6 cursor-pointer ${
                      job.featured ? "border-l-4 border-[#89AC46]" : ""
                    }`}
                    onClick={() => toggleJobExpansion(job.id)}
                  >
                    <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
                      <div>
                        <div className='flex items-center mb-2'>
                          {job.featured && (
                            <span className='bg-[#89AC46]/10 text-[#89AC46] text-xs font-medium px-2 py-1 rounded-full mr-2'>
                              Featured
                            </span>
                          )}
                          <span className='text-sm text-gray-500'>
                            {job.posted}
                          </span>
                        </div>
                        <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                          {job.title}
                        </h3>
                        <div className='flex flex-wrap items-center text-sm text-gray-600'>
                          <span className='flex items-center mr-4 mb-2'>
                            <Briefcase className='h-4 w-4 mr-1 text-gray-400' />
                            {job.department}
                          </span>
                          <span className='flex items-center mr-4 mb-2'>
                            <MapPin className='h-4 w-4 mr-1 text-gray-400' />
                            {job.location}
                          </span>
                          <span className='flex items-center mb-2'>
                            <Clock className='h-4 w-4 mr-1 text-gray-400' />
                            {job.type}
                          </span>
                        </div>
                      </div>
                      <div className='mt-4 md:mt-0'>
                        {expandedJob === job.id ? (
                          <ChevronUp className='h-6 w-6 text-gray-400' />
                        ) : (
                          <ChevronDown className='h-6 w-6 text-gray-400' />
                        )}
                      </div>
                    </div>
                  </div>

                  {expandedJob === job.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className='px-6 pb-6 border-t border-gray-100'
                    >
                      <div className='pt-4'>
                        <h4 className='font-semibold text-gray-800 mb-2'>
                          Job Description
                        </h4>
                        <p className='text-gray-600 mb-4'>{job.description}</p>

                        <h4 className='font-semibold text-gray-800 mb-2'>
                          Requirements
                        </h4>
                        <ul className='list-disc pl-5 mb-6 space-y-1 text-gray-600'>
                          {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>

                        <a
                          href={`/careers/apply/${job.id}`}
                          className='inline-block bg-[#89AC46] text-white px-6 py-2 rounded-md hover:bg-[#7a9a3d] transition-colors'
                        >
                          Apply Now
                        </a>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className='bg-white p-8 rounded-lg shadow-sm text-center'>
              <div className='text-5xl mb-4'>🔍</div>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                No positions found
              </h3>
              <p className='text-gray-600 mb-6'>
                We couldn't find any positions matching your search criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDepartment("All");
                  setSelectedLocation("All");
                  setSelectedJobType("All");
                }}
                className='bg-[#89AC46] text-white px-6 py-2 rounded-md hover:bg-[#7a9a3d] transition-colors'
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className='py-16 bg-[#89AC46]/5'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              Employee Stories
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              Hear from our team members about their experiences working at
              VitaPharma.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='bg-white p-6 rounded-lg shadow-sm'
            >
              <div className='flex items-center mb-4'>
                <img
                  src={user}
                  alt='Jane Doe'
                  className='w-16 h-16 rounded-full mr-4'
                />
                <div>
                  <h3 className='font-semibold text-gray-800'>Jane Doe</h3>
                  <p className='text-sm text-gray-600'>
                    Product Development Engineer
                  </p>
                  <p className='text-xs text-gray-500'>5 years at VitaPharma</p>
                </div>
              </div>
              <p className='text-gray-600 italic'>
                "Working at VitaPharma has been the most rewarding experience of my
                career. I get to collaborate with talented professionals who are
                passionate about improving emergency medical care, and I can see
                the direct impact of our work on saving lives."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='bg-white p-6 rounded-lg shadow-sm'
            >
              <div className='flex items-center mb-4'>
                <img
                  src={user}
                  alt='Michael Smith'
                  className='w-16 h-16 rounded-full mr-4'
                />
                <div>
                  <h3 className='font-semibold text-gray-800'>Michael Smith</h3>
                  <p className='text-sm text-gray-600'>Sales Manager</p>
                  <p className='text-xs text-gray-500'>3 years at VitaPharma</p>
                </div>
              </div>
              <p className='text-gray-600 italic'>
                "The growth opportunities at VitaPharma are incredible. I started
                as a Sales Representative and was promoted to Manager within two
                years. The company invests in employee development and
                recognizes hard work and dedication."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='bg-white p-6 rounded-lg shadow-sm'
            >
              <div className='flex items-center mb-4'>
                <img
                  src={user}
                  alt='Sarah Johnson'
                  className='w-16 h-16 rounded-full mr-4'
                />
                <div>
                  <h3 className='font-semibold text-gray-800'>Sarah Johnson</h3>
                  <p className='text-sm text-gray-600'>
                    Quality Assurance Specialist
                  </p>
                  <p className='text-xs text-gray-500'>2 years at VitaPharma</p>
                </div>
              </div>
              <p className='text-gray-600 italic'>
                "The culture at VitaPharma is what sets it apart. There's a strong
                emphasis on work-life balance, and the company truly cares about
                employee wellbeing. I feel supported both professionally and
                personally, which makes me proud to be part of this team."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              Our Application Process
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              We've designed a straightforward application process to help you
              find the right opportunity at VitaPharma.
            </p>
          </div>

          <div className='max-w-4xl mx-auto'>
            <div className='relative'>
              <div className='hidden md:block absolute left-[15px] top-0 bottom-0 w-1 bg-gray-200'></div>

              <div className='space-y-8'>
                {[
                  {
                    step: 1,
                    title: "Apply Online",
                    description:
                      "Browse our open positions and submit your application through our careers portal. Make sure to include your resume and a cover letter explaining why you're interested in joining VitaPharma.",
                  },
                  {
                    step: 2,
                    title: "Initial Screening",
                    description:
                      "Our recruitment team will review your application and reach out to qualified candidates for an initial phone or video screening to discuss your background and interest in the role.",
                  },
                  {
                    step: 3,
                    title: "Interview Process",
                    description:
                      "Qualified candidates will be invited for interviews with the hiring manager and team members. Depending on the role, this may include technical assessments or presentations.",
                  },
                  {
                    step: 4,
                    title: "Final Decision",
                    description:
                      "After the interview process, we'll make a decision and extend an offer to the selected candidate. We aim to provide timely feedback to all candidates throughout the process.",
                  },
                  {
                    step: 5,
                    title: "Onboarding",
                    description:
                      "Once you accept our offer, we'll guide you through the onboarding process to ensure a smooth transition into your new role at VitaPharma.",
                  },
                ].map((process, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className='flex'
                  >
                    <div className='flex-shrink-0 relative'>
                      <div className='flex items-center justify-center w-8 h-8 rounded-full bg-[#89AC46] text-white font-bold z-10 relative'>
                        {process.step}
                      </div>
                    </div>
                    <div className='ml-6'>
                      <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                        {process.title}
                      </h3>
                      <p className='text-gray-600 mb-2'>
                        {process.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='py-16 bg-[#89AC46]'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold text-white mb-6'>
            Ready to Join Our Team?
          </h2>
          <p className='text-xl text-white/90 mb-8 max-w-3xl mx-auto'>
            Explore our open positions and take the first step toward a
            rewarding career at VitaPharma.
          </p>
          <a
            href='#open-positions'
            className='bg-white text-[#89AC46] px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors'
          >
            View Open Positions
          </a>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
