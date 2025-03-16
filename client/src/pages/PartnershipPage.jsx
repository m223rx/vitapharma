"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Users,
  TrendingUp,
  Globe,
  ShieldCheck,
  Truck,
  BadgePercent,
  Building2,
  Hospital,
  Store,
  ArrowRight,
} from "lucide-react";

const partnershipTypes = [
  {
    id: "distributor",
    title: "Distributor Partnership",
    icon: Store,
    description:
      "Join our network of distributors to bring our high-quality medical equipment to your region.",
    benefits: [
      "Exclusive territory rights",
      "Competitive wholesale pricing",
      "Marketing and sales support",
      "Product training and certification",
      "Dedicated account manager",
    ],
  },
  {
    id: "manufacturer",
    title: "Manufacturer Partnership",
    icon: Building2,
    description:
      "Collaborate with us to develop and manufacture innovative medical equipment and supplies.",
    benefits: [
      "Joint product development",
      "Quality control expertise",
      "Regulatory compliance support",
      "Access to our distribution network",
      "Long-term supply agreements",
    ],
  },
  {
    id: "healthcare",
    title: "Healthcare Provider Partnership",
    icon: Hospital,
    description:
      "Special programs for hospitals, clinics, and healthcare practices to access premium equipment at preferred rates.",
    benefits: [
      "Volume-based discounts",
      "Equipment maintenance programs",
      "Staff training and education",
      "Customized procurement solutions",
      "Priority technical support",
    ],
  },
  {
    id: "technology",
    title: "Technology Partnership",
    icon: Globe,
    description:
      "Integrate your healthcare technology solutions with our equipment and platform.",
    benefits: [
      "API access and integration support",
      "Co-marketing opportunities",
      "Joint solution development",
      "Access to our customer base",
      "Technical collaboration",
    ],
  },
];

const testimonials = [
  {
    id: 1,
    quote:
      "Partnering with VitaPharma has transformed our business. Their support and high-quality products have helped us expand into new markets and increase our revenue by 35% in just one year.",
    name: "Sarah Johnson",
    title: "CEO, MedSupply Solutions",
    image: "/placeholder.svg?height=80&width=80&text=SJ",
    partnerType: "Distributor",
  },
  {
    id: 2,
    quote:
      "The team at VitaPharma understands the unique challenges of healthcare providers. Their partnership program has allowed our hospital to access cutting-edge equipment while significantly reducing our procurement costs.",
    name: "Dr. Michael Chen",
    title: "Director of Procurement, Central Hospital",
    image: "/placeholder.svg?height=80&width=80&text=MC",
    partnerType: "Healthcare Provider",
  },
  {
    id: 3,
    quote:
      "As a manufacturer, we've found VitaPharma to be an invaluable partner. Their market insights and distribution capabilities have helped us reach new customers and improve our product development process.",
    name: "Emma Williams",
    title: "Operations Director, MediTech Devices",
    image: "/placeholder.svg?height=80&width=80&text=EW",
    partnerType: "Manufacturer",
  },
];

const faqItems = [
  {
    question: "What are the requirements to become a distributor partner?",
    answer:
      "To become a distributor partner, we typically look for companies with established presence in the medical equipment market, strong sales capabilities, technical knowledge of medical devices, and compliance with local regulations. Each partnership is evaluated on a case-by-case basis, and we're open to discussing opportunities with businesses of various sizes.",
  },
  {
    question: "How long does the partnership application process take?",
    answer:
      "The partnership application process typically takes 2-4 weeks. After submitting your application, our partnership team will review your information and contact you for an initial discussion. If there's a good fit, we'll proceed with due diligence and contract negotiations. Once approved, we'll provide onboarding and training to get you started.",
  },
  {
    question: "What kind of support do partners receive?",
    answer:
      "Our partners receive comprehensive support including product training, marketing materials, technical documentation, sales enablement resources, and access to our partner portal. Each partner is assigned a dedicated account manager who provides ongoing assistance. We also offer regular training sessions, business planning support, and co-marketing opportunities.",
  },
  {
    question: "Are there any fees associated with becoming a partner?",
    answer:
      "Partnership fee structures vary depending on the type of partnership and market. Some partnerships may require initial investments for inventory, training, or certification. Others may have annual program fees that provide access to exclusive benefits. We're transparent about any costs involved and work to ensure the partnership is financially beneficial for both parties.",
  },
  {
    question: "Can I apply for multiple partnership types?",
    answer:
      "Yes, you can apply for multiple partnership types if your business operates in different capacities. Many of our partners engage with us in various ways. For example, a company might be both a distributor and a technology partner. In your application, you can indicate all partnership types you're interested in, and our team will work with you to determine the best arrangement.",
  },
  {
    question: "What territories are available for distribution partnerships?",
    answer:
      "We're actively expanding our global presence and have various territories available for distribution partnerships. Available territories change based on our current coverage and strategic growth plans. During the application process, we'll discuss your areas of operation and explore potential territory arrangements that align with our expansion strategy.",
  },
];

const processSteps = [
  {
    title: "Application",
    description:
      "Submit your partnership application through our online form with details about your business and partnership interests.",
  },
  {
    title: "Initial Assessment",
    description:
      "Our partnership team will review your application and contact you for an initial discussion to explore the opportunity.",
  },
  {
    title: "Due Diligence",
    description:
      "We'll conduct a thorough evaluation of the partnership potential, including business alignment, market opportunity, and compliance.",
  },
  {
    title: "Agreement",
    description:
      "If there's a good fit, we'll work together to define partnership terms and finalize a formal agreement.",
  },
  {
    title: "Onboarding",
    description:
      "Once approved, you'll receive comprehensive onboarding, training, and resources to ensure a successful partnership.",
  },
];

const PartnershipPage = () => {
  const [activePartnership, setActivePartnership] = useState("distributor");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    country: "",
    partnershipType: "",
    businessDescription: "",
    existingMarkets: "",
    additionalInfo: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.companyName) errors.companyName = "Company name is required";
    if (!formData.contactName) errors.contactName = "Contact name is required";

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.phone) errors.phone = "Phone number is required";
    if (!formData.partnershipType)
      errors.partnershipType = "Please select a partnership type";
    if (!formData.businessDescription)
      errors.businessDescription = "Business description is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form submitted:", formData);
      setFormSubmitted(true);

      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        website: "",
        country: "",
        partnershipType: "",
        businessDescription: "",
        existingMarkets: "",
        additionalInfo: "",
      });
    }
  };

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
                Grow Your Business with VitaPharma Partnership
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className='text-lg text-white/90 mb-8'
              >
                Join our global network of partners to expand your reach, access
                cutting-edge medical equipment, and create new revenue
                opportunities.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <a
                  href='#apply'
                  className='inline-block bg-white text-[#89AC46] px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors'
                >
                  Become a Partner
                </a>
                <a
                  href='#partnership-types'
                  className='inline-block ml-4 text-white border border-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors'
                >
                  Learn More
                </a>
              </motion.div>
            </div>
            <div className='md:w-1/2'>
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src='https://placehold.co/700x300'
                alt='VitaPharma Partnership'
                className='rounded-lg shadow-xl'
              />
            </div>
          </div>
        </div>
      </section>

      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              Why Partner With Us?
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              Discover the advantages of joining the VitaPharma partner
              ecosystem and how we help our partners succeed in the medical
              equipment market.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='bg-gray-50 p-6 rounded-lg'
            >
              <div className='bg-[#89AC46]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4'>
                <TrendingUp className='text-[#89AC46] h-7 w-7' />
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-3'>
                Business Growth
              </h3>
              <p className='text-gray-600'>
                Expand your product portfolio, reach new markets, and increase
                your revenue streams through our partnership programs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='bg-gray-50 p-6 rounded-lg'
            >
              <div className='bg-[#89AC46]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4'>
                <Users className='text-[#89AC46] h-7 w-7' />
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-3'>
                Expert Support
              </h3>
              <p className='text-gray-600'>
                Benefit from our industry expertise, technical knowledge, and
                dedicated partner support team to help you succeed.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='bg-gray-50 p-6 rounded-lg'
            >
              <div className='bg-[#89AC46]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4'>
                <Globe className='text-[#89AC46] h-7 w-7' />
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-3'>
                Global Network
              </h3>
              <p className='text-gray-600'>
                Join our worldwide network of partners and gain access to
                international markets and collaborative opportunities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className='bg-gray-50 p-6 rounded-lg'
            >
              <div className='bg-[#89AC46]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4'>
                <ShieldCheck className='text-[#89AC46] h-7 w-7' />
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-3'>
                Quality Assurance
              </h3>
              <p className='text-gray-600'>
                Represent products that meet the highest quality standards and
                comply with international medical regulations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='bg-gray-50 p-6 rounded-lg'
            >
              <div className='bg-[#89AC46]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4'>
                <Truck className='text-[#89AC46] h-7 w-7' />
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-3'>
                Supply Chain Excellence
              </h3>
              <p className='text-gray-600'>
                Leverage our efficient logistics network and inventory
                management systems to optimize your operations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className='bg-gray-50 p-6 rounded-lg'
            >
              <div className='bg-[#89AC46]/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4'>
                <BadgePercent className='text-[#89AC46] h-7 w-7' />
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-3'>
                Competitive Advantage
              </h3>
              <p className='text-gray-600'>
                Gain a competitive edge with exclusive products, preferential
                pricing, and innovative solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section id='partnership-types' className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              Partnership Programs
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              We offer various partnership opportunities tailored to different
              business models and objectives.
            </p>
          </div>

          <div className='flex flex-col lg:flex-row gap-8'>
            <div className='lg:w-1/3'>
              <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
                {partnershipTypes.map((type) => (
                  <button
                    key={type.id}
                    className={`w-full text-left p-4 border-b border-gray-200 last:border-b-0 flex items-center transition-colors ${
                      activePartnership === type.id
                        ? "bg-[#89AC46]/10 border-l-4 border-l-[#89AC46]"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setActivePartnership(type.id)}
                  >
                    <type.icon
                      className={`h-6 w-6 mr-3 ${
                        activePartnership === type.id
                          ? "text-[#89AC46]"
                          : "text-gray-500"
                      }`}
                    />
                    <div>
                      <h3
                        className={`font-medium ${
                          activePartnership === type.id
                            ? "text-[#89AC46]"
                            : "text-gray-800"
                        }`}
                      >
                        {type.title}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className='lg:w-2/3'>
              {partnershipTypes.map(
                (type) =>
                  activePartnership === type.id && (
                    <motion.div
                      key={type.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className='bg-white rounded-lg shadow-sm p-6'
                    >
                      <div className='flex items-center mb-6'>
                        <type.icon className='h-10 w-10 text-[#89AC46] mr-4' />
                        <h3 className='text-2xl font-bold text-gray-800'>
                          {type.title}
                        </h3>
                      </div>

                      <p className='text-gray-600 mb-6'>{type.description}</p>

                      <h4 className='text-lg font-semibold text-gray-800 mb-4'>
                        Key Benefits
                      </h4>
                      <ul className='space-y-3 mb-6'>
                        {type.benefits.map((benefit, index) => (
                          <li key={index} className='flex items-start'>
                            <CheckCircle className='h-5 w-5 text-[#89AC46] mr-2 flex-shrink-0 mt-0.5' />
                            <span className='text-gray-600'>{benefit}</span>
                          </li>
                        ))}
                      </ul>

                      <a
                        href='#apply'
                        className='inline-flex items-center text-[#89AC46] font-medium hover:underline'
                      >
                        Apply for this partnership
                        <ArrowRight className='ml-2 h-4 w-4' />
                      </a>
                    </motion.div>
                  )
              )}
            </div>
          </div>
        </div>
      </section>

      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              Partnership Process
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              Our streamlined process makes it easy to become a VitaPharma
              partner and start growing your business.
            </p>
          </div>

          <div className='relative'>
            <div className='hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2'></div>

            <div className='space-y-12 relative'>
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <div className='bg-gray-50 p-6 rounded-lg shadow-sm'>
                      <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                        {index + 1}. {step.title}
                      </h3>
                      <p className='text-gray-600'>{step.description}</p>
                    </div>
                  </div>

                  <div className='hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-[#89AC46] text-white font-bold absolute left-1/2 transform -translate-x-1/2'>
                    {index + 1}
                  </div>

                  <div className='md:w-1/2'></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='py-16 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              Partner Success Stories
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              Hear from our partners about their experience working with
              VitaPharma.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className='bg-white p-6 rounded-lg shadow-sm'
              >
                <div className='flex items-center mb-4'>
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className='w-16 h-16 rounded-full mr-4'
                  />
                  <div>
                    <h3 className='font-semibold text-gray-800'>
                      {testimonial.name}
                    </h3>
                    <p className='text-sm text-gray-600'>{testimonial.title}</p>
                    <span className='inline-block mt-1 text-xs bg-[#89AC46]/10 text-[#89AC46] px-2 py-1 rounded-full'>
                      {testimonial.partnerType} Partner
                    </span>
                  </div>
                </div>
                <p className='text-gray-600 italic'>"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className='py-16 bg-white'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              Frequently Asked Questions
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              Find answers to common questions about our partnership programs.
            </p>
          </div>

          <div className='max-w-3xl mx-auto'>
            {faqItems.map((item, index) => (
              <div
                key={index}
                className='mb-4 border border-gray-200 rounded-lg overflow-hidden'
              >
                <button
                  className='w-full flex justify-between items-center p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors'
                  onClick={() => toggleFaq(index)}
                >
                  <span className='font-medium text-gray-800'>
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
                    className='p-4 bg-white'
                  >
                    <p className='text-gray-600'>{item.answer}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id='apply' className='py-16 bg-[#89AC46]/5'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-800 mb-4'>
              Apply for Partnership
            </h2>
            <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
              Interested in becoming a VitaPharma partner? Fill out the form
              below and our partnership team will contact you.
            </p>
          </div>

          <div className='max-w-4xl mx-auto'>
            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='bg-white p-8 rounded-lg shadow-sm text-center'
              >
                <div className='flex justify-center mb-4'>
                  <CheckCircle className='h-16 w-16 text-green-500' />
                </div>
                <h3 className='text-2xl font-bold text-gray-800 mb-2'>
                  Application Submitted!
                </h3>
                <p className='text-gray-600 mb-6'>
                  Thank you for your interest in partnering with VitaPharma. Our
                  partnership team will review your application and contact you
                  within 3-5 business days.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className='bg-[#89AC46] text-white px-6 py-2 rounded-md hover:bg-[#7a9a3d] transition-colors'
                >
                  Submit Another Application
                </button>
              </motion.div>
            ) : (
              <div className='bg-white p-6 md:p-8 rounded-lg shadow-sm'>
                <form onSubmit={handleSubmit}>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='md:col-span-2'>
                      <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                        Company Information
                      </h3>
                    </div>

                    <div>
                      <label
                        htmlFor='companyName'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Company Name *
                      </label>
                      <input
                        type='text'
                        id='companyName'
                        name='companyName'
                        value={formData.companyName}
                        onChange={handleChange}
                        className={`w-full rounded-md border ${
                          formErrors.companyName
                            ? "border-red-300"
                            : "border-gray-300"
                        } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]`}
                      />
                      {formErrors.companyName && (
                        <p className='mt-1 text-sm text-red-600'>
                          {formErrors.companyName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor='website'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Company Website
                      </label>
                      <input
                        type='text'
                        id='website'
                        name='website'
                        value={formData.website}
                        onChange={handleChange}
                        className='w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]'
                      />
                    </div>

                    <div>
                      <label
                        htmlFor='contactName'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Contact Name *
                      </label>
                      <input
                        type='text'
                        id='contactName'
                        name='contactName'
                        value={formData.contactName}
                        onChange={handleChange}
                        className={`w-full rounded-md border ${
                          formErrors.contactName
                            ? "border-red-300"
                            : "border-gray-300"
                        } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]`}
                      />
                      {formErrors.contactName && (
                        <p className='mt-1 text-sm text-red-600'>
                          {formErrors.contactName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor='email'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Email Address *
                      </label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full rounded-md border ${
                          formErrors.email
                            ? "border-red-300"
                            : "border-gray-300"
                        } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]`}
                      />
                      {formErrors.email && (
                        <p className='mt-1 text-sm text-red-600'>
                          {formErrors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor='phone'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Phone Number *
                      </label>
                      <input
                        type='tel'
                        id='phone'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full rounded-md border ${
                          formErrors.phone
                            ? "border-red-300"
                            : "border-gray-300"
                        } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]`}
                      />
                      {formErrors.phone && (
                        <p className='mt-1 text-sm text-red-600'>
                          {formErrors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor='country'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Country
                      </label>
                      <select
                        id='country'
                        name='country'
                        value={formData.country}
                        onChange={handleChange}
                        className='w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]'
                      >
                        <option value=''>Select a country</option>
                        <option value='TN'>Tunisia</option>
                        <option value='OTHER'>Other</option>
                      </select>
                    </div>

                    <div className='md:col-span-2 mt-4'>
                      <h3 className='text-xl font-semibold text-gray-800 mb-4'>
                        Partnership Information
                      </h3>
                    </div>

                    <div className='md:col-span-2'>
                      <label
                        htmlFor='partnershipType'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Partnership Type of Interest *
                      </label>
                      <select
                        id='partnershipType'
                        name='partnershipType'
                        value={formData.partnershipType}
                        onChange={handleChange}
                        className={`w-full rounded-md border ${
                          formErrors.partnershipType
                            ? "border-red-300"
                            : "border-gray-300"
                        } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]`}
                      >
                        <option value=''>Select partnership type</option>
                        <option value='distributor'>
                          Distributor Partnership
                        </option>
                        <option value='manufacturer'>
                          Manufacturer Partnership
                        </option>
                        <option value='healthcare'>
                          Healthcare Provider Partnership
                        </option>
                        <option value='technology'>
                          Technology Partnership
                        </option>
                      </select>
                      {formErrors.partnershipType && (
                        <p className='mt-1 text-sm text-red-600'>
                          {formErrors.partnershipType}
                        </p>
                      )}
                    </div>

                    <div className='md:col-span-2'>
                      <label
                        htmlFor='businessDescription'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Business Description *
                      </label>
                      <textarea
                        id='businessDescription'
                        name='businessDescription'
                        value={formData.businessDescription}
                        onChange={handleChange}
                        rows='4'
                        placeholder='Please describe your business, including your main products/services and target markets.'
                        className={`w-full rounded-md border ${
                          formErrors.businessDescription
                            ? "border-red-300"
                            : "border-gray-300"
                        } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]`}
                      ></textarea>
                      {formErrors.businessDescription && (
                        <p className='mt-1 text-sm text-red-600'>
                          {formErrors.businessDescription}
                        </p>
                      )}
                    </div>

                    <div className='md:col-span-2'>
                      <label
                        htmlFor='existingMarkets'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Existing Markets
                      </label>
                      <textarea
                        id='existingMarkets'
                        name='existingMarkets'
                        value={formData.existingMarkets}
                        onChange={handleChange}
                        rows='3'
                        placeholder='What markets do you currently serve? Please list countries or regions.'
                        className='w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]'
                      ></textarea>
                    </div>

                    <div className='md:col-span-2'>
                      <label
                        htmlFor='additionalInfo'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Additional Information
                      </label>
                      <textarea
                        id='additionalInfo'
                        name='additionalInfo'
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        rows='3'
                        placeholder="Any other information you'd like to share about your partnership interest."
                        className='w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]'
                      ></textarea>
                    </div>
                  </div>

                  <div className='mt-8'>
                    <button
                      type='submit'
                      className='w-full bg-[#89AC46] text-white py-3 rounded-md hover:bg-[#7a9a3d] transition-colors'
                    >
                      Submit Application
                    </button>
                    <p className='text-sm text-gray-500 mt-2 text-center'>
                      By submitting this form, you agree to our{" "}
                      <a href='#' className='text-[#89AC46] hover:underline'>
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a href='#' className='text-[#89AC46] hover:underline'>
                        Terms of Service
                      </a>
                      .
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className='py-16 bg-[#89AC46]'>
        <div className='container mx-auto px-4 text-center'>
          <h2 className='text-3xl font-bold text-white mb-6'>
            Ready to Grow Your Business?
          </h2>
          <p className='text-xl text-white/90 mb-8 max-w-3xl mx-auto'>
            Join our partner network today and discover new opportunities for
            growth and collaboration.
          </p>
          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <a
              href='#apply'
              className='bg-white text-[#89AC46] px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors'
            >
              Apply Now
            </a>
            <a
              href='#'
              className='border border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors'
            >
              Contact Partnership Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnershipPage;
