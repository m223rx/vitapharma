"use client";

import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Check,
  CreditCard,
  ShieldCheck,
  Truck,
  Info,
  AlertCircle,
  Landmark,
} from "lucide-react";

import visa from "../assets/images/icons/visa.png";
import poste from "../assets/images/icons/poste.png";
import mastercard from "../assets/images/icons/mastercard.png";

const cartItems = [
  {
    id: 1,
    name: "Professional Digital Blood Pressure Monitor",
    image: "https://placehold.co/300x300",
    price: 79.99,
    quantity: 1,
    variant: "Standard Package",
  },
  {
    id: 2,
    name: "Professional Stethoscope",
    image: "https://placehold.co/300x300",
    price: 129.99,
    quantity: 2,
    variant: "Classic Edition",
  },
  {
    id: 3,
    name: "Infrared Thermometer",
    image: "https://placehold.co/300x300",
    price: 39.99,
    quantity: 1,
    variant: "Standard",
  },
];

const subtotal = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);
const shipping = subtotal > 100 ? 0 : 12.99;
const tax = subtotal * 0.07;
const total = subtotal + shipping + tax;

const shippingMethods = [
  {
    id: "standard",
    name: "Standard Shipping",
    price: 0,
    description: "Delivery in 3-5 business days",
    estimatedDelivery: "3-5 business days",
  },
  {
    id: "express",
    name: "Express Shipping",
    price: 15.99,
    description: "Delivery in 1-2 business days",
    estimatedDelivery: "1-2 business days",
  },
  {
    id: "nextday",
    name: "Next Day Delivery",
    price: 29.99,
    description: "Guaranteed delivery by tomorrow",
    estimatedDelivery: "Next business day",
  },
];

const paymentMethods = [
  { id: "credit-card", name: "Credit Card", icon: CreditCard },
  {
    id: "bank-transfer",
    name: "Bank Transfer",
    icon: Landmark,
  },
];

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedStep, setExpandedStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",

    shippingMethod: "standard",

    paymentMethod: "credit-card",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",

    saveInfo: true,
    createAccount: false,
    termsAccepted: false,
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const toggleStep = (step) => {
    if (step <= currentStep) {
      setExpandedStep(expandedStep === step ? null : step);
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
      if (!formData.phone) newErrors.phone = "Phone number is required";
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.zipCode) newErrors.zipCode = "ZIP code is required";
    }

    if (step === 2) {
      if (!formData.shippingMethod)
        newErrors.shippingMethod = "Please select a shipping method";
    }

    if (step === 3) {
      if (formData.paymentMethod === "credit-card") {
        if (!formData.cardName) newErrors.cardName = "Name on card is required";
        if (!formData.cardNumber) {
          newErrors.cardNumber = "Card number is required";
        } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
          newErrors.cardNumber = "Card number is invalid";
        }
        if (!formData.cardExpiry) {
          newErrors.cardExpiry = "Expiry date is required";
        } else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
          newErrors.cardExpiry = "Expiry date should be MM/YY";
        }
        if (!formData.cardCvc) {
          newErrors.cardCvc = "CVC is required";
        } else if (!/^\d{3,4}$/.test(formData.cardCvc)) {
          newErrors.cardCvc = "CVC is invalid";
        }
      }
    }

    if (step === 4) {
      if (!formData.termsAccepted)
        newErrors.termsAccepted = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setExpandedStep(nextStep);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    setExpandedStep(prevStep);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateStep(currentStep)) {
      console.log("Order submitted:", formData);
      window.location.href = "/order-confirmation";
    }
  };

  const selectedShippingMethod = shippingMethods.find(
    (method) => method.id === formData.shippingMethod
  );
  const finalShipping = selectedShippingMethod
    ? selectedShippingMethod.price
    : shipping;
  const finalTotal = subtotal + finalShipping + tax;

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-white border-b border-gray-200'>
        <div className='container mx-auto px-4 py-8'>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>
            Checkout
          </h1>
          <div className='flex items-center text-sm text-gray-500 mt-2'>
            <a href='/' className='hover:text-[#89AC46]'>
              Home
            </a>
            <ChevronRight className='mx-2 h-4 w-4' />
            <a href='/cart' className='hover:text-[#89AC46]'>
              Cart
            </a>
            <ChevronRight className='mx-2 h-4 w-4' />
            <span className='text-gray-700'>Checkout</span>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col lg:flex-row gap-8'>
          <div className='lg:w-2/3'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6'>
              <div
                className={`p-4 border-b border-gray-200 flex justify-between items-center cursor-pointer ${
                  currentStep >= 1 ? "bg-white" : "bg-gray-50"
                }`}
                onClick={() => toggleStep(1)}
              >
                <div className='flex items-center'>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      currentStep > 1
                        ? "bg-[#626F47] text-white"
                        : "bg-[#89AC46] text-white"
                    }`}
                  >
                    {currentStep > 1 ? <Check size={16} /> : "1"}
                  </div>
                  <h3 className='font-semibold text-gray-800'>
                    Shipping Information
                  </h3>
                </div>
                {expandedStep === 1 ? (
                  <ChevronUp size={20} className='text-gray-500' />
                ) : (
                  <ChevronDown size={20} className='text-gray-500' />
                )}
              </div>

              {expandedStep === 1 && (
                <div className='p-6'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <label
                        htmlFor='firstName'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        First Name *
                      </label>
                      <input
                        type='text'
                        id='firstName'
                        name='firstName'
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full rounded-md border ${
                          errors.firstName
                            ? "border-red-300"
                            : "border-gray-300"
                        } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]`}
                      />
                      {errors.firstName && (
                        <p className='mt-1 text-sm text-red-600'>
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor='lastName'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Last Name *
                      </label>
                      <input
                        type='text'
                        id='lastName'
                        name='lastName'
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full rounded-md border ${
                          errors.lastName ? "border-red-300" : "border-gray-300"
                        } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]`}
                      />
                      {errors.lastName && (
                        <p className='mt-1 text-sm text-red-600'>
                          {errors.lastName}
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
                          errors.email ? "border-red-300" : "border-gray-300"
                        } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]`}
                      />
                      {errors.email && (
                        <p className='mt-1 text-sm text-red-600'>
                          {errors.email}
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
                          errors.phone ? "border-red-300" : "border-gray-300"
                        } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]`}
                      />
                      {errors.phone && (
                        <p className='mt-1 text-sm text-red-600'>
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div className='md:col-span-2'>
                      <label
                        htmlFor='address'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Address *
                      </label>
                      <input
                        type='text'
                        id='address'
                        name='address'
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full rounded-md border ${
                          errors.address ? "border-red-300" : "border-gray-300"
                        } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]`}
                      />
                      {errors.address && (
                        <p className='mt-1 text-sm text-red-600'>
                          {errors.address}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor='city'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        City *
                      </label>
                      <input
                        type='text'
                        id='city'
                        name='city'
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full rounded-md border ${
                          errors.city ? "border-red-300" : "border-gray-300"
                        } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]`}
                      />
                      {errors.city && (
                        <p className='mt-1 text-sm text-red-600'>
                          {errors.city}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor='state'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        State/Province *
                      </label>
                      <input
                        type='text'
                        id='state'
                        name='state'
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full rounded-md border ${
                          errors.state ? "border-red-300" : "border-gray-300"
                        } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]`}
                      />
                      {errors.state && (
                        <p className='mt-1 text-sm text-red-600'>
                          {errors.state}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor='zipCode'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        ZIP/Postal Code *
                      </label>
                      <input
                        type='text'
                        id='zipCode'
                        name='zipCode'
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`w-full rounded-md border ${
                          errors.zipCode ? "border-red-300" : "border-gray-300"
                        } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]`}
                      />
                      {errors.zipCode && (
                        <p className='mt-1 text-sm text-red-600'>
                          {errors.zipCode}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor='country'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Country *
                      </label>
                      <select
                        id='country'
                        name='country'
                        value={formData.country}
                        onChange={handleChange}
                        className='w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]'
                      >
                        <option value='TN'>Tunisia</option>
                      </select>
                    </div>
                  </div>

                  <div className='mt-6'>
                    <button
                      type='button'
                      onClick={handleNextStep}
                      className='w-full bg-[#89AC46] text-white py-3 rounded-md hover:bg-[#7a9a3d] transition-colors cursor-pointer'
                    >
                      Continue to Shipping
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6'>
              <div
                className={`p-4 border-b border-gray-200 flex justify-between items-center cursor-pointer ${
                  currentStep >= 2 ? "bg-white" : "bg-gray-50"
                }`}
                onClick={() => toggleStep(2)}
              >
                <div className='flex items-center'>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      currentStep > 2
                        ? "bg-[#626F47] text-white"
                        : currentStep === 2
                        ? "bg-[#89AC46] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {currentStep > 2 ? <Check size={16} /> : "2"}
                  </div>
                  <h3
                    className={`font-semibold ${
                      currentStep >= 2 ? "text-gray-800" : "text-gray-500"
                    }`}
                  >
                    Shipping Method
                  </h3>
                </div>
                {expandedStep === 2 ? (
                  <ChevronUp size={20} className='text-gray-500' />
                ) : (
                  <ChevronDown size={20} className='text-gray-500' />
                )}
              </div>

              {expandedStep === 2 && (
                <div className='p-6'>
                  <div className='space-y-4'>
                    {shippingMethods.map((method) => (
                      <div
                        key={method.id}
                        className='border rounded-md p-4 hover:border-[#89AC46] transition-colors'
                      >
                        <label className='flex items-start cursor-pointer'>
                          <input
                            type='radio'
                            name='shippingMethod'
                            value={method.id}
                            checked={formData.shippingMethod === method.id}
                            onChange={handleChange}
                            className='mt-1 h-4 w-4 text-[#89AC46] focus:ring-[#89AC46] border-gray-300'
                          />
                          <div className='ml-3 flex-grow'>
                            <div className='flex justify-between'>
                              <span className='font-medium text-gray-800'>
                                {method.name}
                              </span>
                              <span className='font-medium text-gray-800'>
                                {method.price === 0
                                  ? "Free"
                                  : `$${method.price.toFixed(2)}`}
                              </span>
                            </div>
                            <p className='text-sm text-gray-600 mt-1'>
                              {method.description}
                            </p>
                            <p className='text-sm text-gray-600 mt-1'>
                              Estimated delivery:{" "}
                              <span className='font-medium'>
                                {method.estimatedDelivery}
                              </span>
                            </p>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>

                  {errors.shippingMethod && (
                    <p className='mt-2 text-sm text-red-600'>
                      {errors.shippingMethod}
                    </p>
                  )}

                  <div className='mt-6 flex justify-between'>
                    <button
                      type='button'
                      onClick={handlePrevStep}
                      className='px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors'
                    >
                      Back
                    </button>
                    <button
                      type='button'
                      onClick={handleNextStep}
                      className='px-6 py-2 bg-[#89AC46] text-white rounded-md hover:bg-[#7a9a3d] transition-colors cursor-pointer'
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Payment Method */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6'>
              <div
                className={`p-4 border-b border-gray-200 flex justify-between items-center cursor-pointer ${
                  currentStep >= 3 ? "bg-white" : "bg-gray-50"
                }`}
                onClick={() => toggleStep(3)}
              >
                <div className='flex items-center'>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      currentStep > 3
                        ? "bg-[#626F47] text-white"
                        : currentStep === 3
                        ? "bg-[#89AC46] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {currentStep > 3 ? <Check size={16} /> : "3"}
                  </div>
                  <h3
                    className={`font-semibold ${
                      currentStep >= 3 ? "text-gray-800" : "text-gray-500"
                    }`}
                  >
                    Payment Method
                  </h3>
                </div>
                {expandedStep === 3 ? (
                  <ChevronUp size={20} className='text-gray-500' />
                ) : (
                  <ChevronDown size={20} className='text-gray-500' />
                )}
              </div>

              {expandedStep === 3 && (
                <div className='p-6'>
                  <div className='space-y-4'>
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className='border rounded-md p-4 hover:border-[#89AC46] transition-colors'
                      >
                        <label className='flex items-center cursor-pointer'>
                          <input
                            type='radio'
                            name='paymentMethod'
                            value={method.id}
                            checked={formData.paymentMethod === method.id}
                            onChange={handleChange}
                            className='h-4 w-4 text-[#89AC46] focus:ring-[#89AC46] border-gray-300'
                          />
                          <div className='ml-3 flex items-center'>
                            {typeof method.icon === "string" ? (
                              <img
                                src={method.icon || "/placeholder.svg"}
                                alt={method.name}
                                className='h-6 w-6 mr-2'
                              />
                            ) : (
                              <method.icon className='h-6 w-6 mr-2 text-gray-600' />
                            )}
                            <span className='font-medium text-gray-800'>
                              {method.name}
                            </span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>

                  {formData.paymentMethod === "credit-card" && (
                    <div className='mt-6 border-t border-gray-200 pt-6'>
                      <h4 className='font-medium text-gray-800 mb-4'>
                        Card Details
                      </h4>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='md:col-span-2'>
                          <label
                            htmlFor='cardName'
                            className='block text-sm font-medium text-gray-700 mb-1'
                          >
                            Name on Card *
                          </label>
                          <input
                            type='text'
                            id='cardName'
                            name='cardName'
                            value={formData.cardName}
                            onChange={handleChange}
                            className={`w-full rounded-md border ${
                              errors.cardName
                                ? "border-red-300"
                                : "border-gray-300"
                            } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]`}
                          />
                          {errors.cardName && (
                            <p className='mt-1 text-sm text-red-600'>
                              {errors.cardName}
                            </p>
                          )}
                        </div>

                        <div className='md:col-span-2'>
                          <label
                            htmlFor='cardNumber'
                            className='block text-sm font-medium text-gray-700 mb-1'
                          >
                            Card Number *
                          </label>
                          <input
                            type='text'
                            id='cardNumber'
                            name='cardNumber'
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder='XXXX XXXX XXXX XXXX'
                            className={`w-full rounded-md border ${
                              errors.cardNumber
                                ? "border-red-300"
                                : "border-gray-300"
                            } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]`}
                          />
                          {errors.cardNumber && (
                            <p className='mt-1 text-sm text-red-600'>
                              {errors.cardNumber}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor='cardExpiry'
                            className='block text-sm font-medium text-gray-700 mb-1'
                          >
                            Expiry Date *
                          </label>
                          <input
                            type='text'
                            id='cardExpiry'
                            name='cardExpiry'
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            placeholder='MM/YY'
                            className={`w-full rounded-md border ${
                              errors.cardExpiry
                                ? "border-red-300"
                                : "border-gray-300"
                            } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]`}
                          />
                          {errors.cardExpiry && (
                            <p className='mt-1 text-sm text-red-600'>
                              {errors.cardExpiry}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor='cardCvc'
                            className='block text-sm font-medium text-gray-700 mb-1'
                          >
                            CVC/CVV *
                          </label>
                          <input
                            type='text'
                            id='cardCvc'
                            name='cardCvc'
                            value={formData.cardCvc}
                            onChange={handleChange}
                            placeholder='XXX'
                            className={`w-full rounded-md border ${
                              errors.cardCvc
                                ? "border-red-300"
                                : "border-gray-300"
                            } px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]`}
                          />
                          {errors.cardCvc && (
                            <p className='mt-1 text-sm text-red-600'>
                              {errors.cardCvc}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className='mt-4 flex items-center bg-blue-50 p-3 rounded-md'>
                        <Info
                          size={18}
                          className='text-blue-500 mr-2 flex-shrink-0'
                        />
                        <p className='text-sm text-blue-700'>
                          Your payment information is encrypted and secure. We
                          never store your full card details.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className='mt-6 flex justify-between'>
                    <button
                      type='button'
                      onClick={handlePrevStep}
                      className='px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors'
                    >
                      Back
                    </button>
                    <button
                      type='button'
                      onClick={handleNextStep}
                      className='px-6 py-2 bg-[#89AC46] text-white rounded-md hover:bg-[#7a9a3d] transition-colors cursor-pointer'
                    >
                      Continue to Review
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 4: Review Order */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6'>
              <div
                className={`p-4 border-b border-gray-200 flex justify-between items-center cursor-pointer ${
                  currentStep >= 4 ? "bg-white" : "bg-gray-50"
                }`}
                onClick={() => toggleStep(4)}
              >
                <div className='flex items-center'>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      currentStep === 4
                        ? "bg-[#89AC46] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    4
                  </div>
                  <h3
                    className={`font-semibold ${
                      currentStep >= 4 ? "text-gray-800" : "text-gray-500"
                    }`}
                  >
                    Review Order
                  </h3>
                </div>
                {expandedStep === 4 ? (
                  <ChevronUp size={20} className='text-gray-500' />
                ) : (
                  <ChevronDown size={20} className='text-gray-500' />
                )}
              </div>

              {expandedStep === 4 && (
                <div className='p-6'>
                  <div className='space-y-6'>
                    {/* Shipping Information Summary */}
                    <div>
                      <div className='flex justify-between items-center mb-3'>
                        <h4 className='font-medium text-gray-800'>
                          Shipping Information
                        </h4>
                        <button
                          type='button'
                          onClick={() => {
                            setCurrentStep(1);
                            setExpandedStep(1);
                          }}
                          className='text-sm text-[#89AC46] hover:underline'
                        >
                          Edit
                        </button>
                      </div>
                      <div className='bg-gray-50 p-4 rounded-md'>
                        <p className='text-sm text-gray-700'>
                          {formData.firstName} {formData.lastName}
                          <br />
                          {formData.address}
                          <br />
                          {formData.city}, {formData.state} {formData.zipCode}
                          <br />
                          {formData.country === "US"
                            ? "United States"
                            : formData.country}
                          <br />
                          {formData.phone}
                          <br />
                          {formData.email}
                        </p>
                      </div>
                    </div>

                    {/* Shipping Method Summary */}
                    <div>
                      <div className='flex justify-between items-center mb-3'>
                        <h4 className='font-medium text-gray-800'>
                          Shipping Method
                        </h4>
                        <button
                          type='button'
                          onClick={() => {
                            setCurrentStep(2);
                            setExpandedStep(2);
                          }}
                          className='text-sm text-[#89AC46] hover:underline'
                        >
                          Edit
                        </button>
                      </div>
                      <div className='bg-gray-50 p-4 rounded-md'>
                        <p className='text-sm text-gray-700'>
                          {selectedShippingMethod?.name} -{" "}
                          {selectedShippingMethod?.price === 0
                            ? "Free"
                            : `$${selectedShippingMethod?.price.toFixed(2)}`}
                          <br />
                          Estimated delivery:{" "}
                          {selectedShippingMethod?.estimatedDelivery}
                        </p>
                      </div>
                    </div>

                    {/* Payment Method Summary */}
                    <div>
                      <div className='flex justify-between items-center mb-3'>
                        <h4 className='font-medium text-gray-800'>
                          Payment Method
                        </h4>
                        <button
                          type='button'
                          onClick={() => {
                            setCurrentStep(3);
                            setExpandedStep(3);
                          }}
                          className='text-sm text-[#89AC46] hover:underline'
                        >
                          Edit
                        </button>
                      </div>
                      <div className='bg-gray-50 p-4 rounded-md'>
                        <p className='text-sm text-gray-700'>
                          {formData.paymentMethod === "credit-card" && (
                            <>
                              Credit Card
                              <br />
                              {formData.cardName}
                              <br />
                              **** **** **** {formData.cardNumber.slice(-4)}
                            </>
                          )}
                          {formData.paymentMethod === "paypal" && "PayPal"}
                          {formData.paymentMethod === "bank-transfer" &&
                            "Bank Transfer"}
                        </p>
                      </div>
                    </div>

                    {/* Order Items Summary */}
                    <div>
                      <h4 className='font-medium text-gray-800 mb-3'>
                        Order Items
                      </h4>
                      <div className='bg-gray-50 p-4 rounded-md'>
                        <div className='divide-y divide-gray-200'>
                          {cartItems.map((item) => (
                            <div
                              key={item.id}
                              className='py-3 first:pt-0 last:pb-0 flex items-center'
                            >
                              <div className='w-16 h-16 flex-shrink-0'>
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className='w-full h-full object-contain'
                                />
                              </div>
                              <div className='ml-4 flex-grow'>
                                <h5 className='text-sm font-medium text-gray-800'>
                                  {item.name}
                                </h5>
                                <p className='text-xs text-gray-500'>
                                  Variant: {item.variant}
                                </p>
                                <div className='flex justify-between mt-1'>
                                  <span className='text-xs text-gray-500'>
                                    Qty: {item.quantity}
                                  </span>
                                  <span className='text-sm font-medium text-gray-800'>
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Order Notes */}
                    <div>
                      <label
                        htmlFor='notes'
                        className='block text-sm font-medium text-gray-700 mb-1'
                      >
                        Order Notes (Optional)
                      </label>
                      <textarea
                        id='notes'
                        name='notes'
                        value={formData.notes}
                        onChange={handleChange}
                        rows='3'
                        placeholder='Special instructions for delivery or any other notes'
                        className='w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#89AC46]'
                      ></textarea>
                    </div>

                    {/* Terms and Conditions */}
                    <div>
                      <div className='flex items-start'>
                        <input
                          type='checkbox'
                          id='termsAccepted'
                          name='termsAccepted'
                          checked={formData.termsAccepted}
                          onChange={handleChange}
                          className='mt-1 h-4 w-4 text-[#89AC46] focus:ring-[#89AC46] border-gray-300 rounded'
                        />
                        <label
                          htmlFor='termsAccepted'
                          className='ml-2 block text-sm text-gray-700'
                        >
                          I have read and agree to the{" "}
                          <a
                            href='#'
                            className='text-[#89AC46] hover:underline'
                          >
                            Terms and Conditions
                          </a>
                          ,{" "}
                          <a
                            href='#'
                            className='text-[#89AC46] hover:underline'
                          >
                            Privacy Policy
                          </a>
                          , and{" "}
                          <a
                            href='#'
                            className='text-[#89AC46] hover:underline'
                          >
                            Return Policy
                          </a>
                          .
                        </label>
                      </div>
                      {errors.termsAccepted && (
                        <p className='mt-1 text-sm text-red-600'>
                          {errors.termsAccepted}
                        </p>
                      )}
                    </div>

                    {/* Create Account Option */}
                    <div>
                      <div className='flex items-start'>
                        <input
                          type='checkbox'
                          id='createAccount'
                          name='createAccount'
                          checked={formData.createAccount}
                          onChange={handleChange}
                          className='mt-1 h-4 w-4 text-[#89AC46] focus:ring-[#89AC46] border-gray-300 rounded'
                        />
                        <label
                          htmlFor='createAccount'
                          className='ml-2 block text-sm text-gray-700'
                        >
                          Create an account for faster checkout next time
                        </label>
                      </div>
                    </div>

                    <div className='mt-6 flex justify-between'>
                      <button
                        type='button'
                        onClick={handlePrevStep}
                        className='px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors'
                      >
                        Back
                      </button>
                      <button
                        type='submit'
                        onClick={handleSubmit}
                        className='px-6 py-3 bg-[#89AC46] text-white rounded-md hover:bg-[#7a9a3d] transition-colors cursor-pointer'
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className='lg:w-1/3'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-24'>
              <div className='p-6'>
                <h2 className='text-xl font-semibold text-gray-800 mb-6'>
                  Order Summary
                </h2>

                {/* Items Summary */}
                <div className='mb-6'>
                  <div className='flex justify-between text-sm text-gray-600 mb-2'>
                    <span>
                      Items (
                      {cartItems.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}
                      )
                    </span>
                    <button
                      type='button'
                      className='text-[#89AC46] hover:underline'
                    >
                      View
                    </button>
                  </div>
                  <div className='max-h-48 overflow-y-auto'>
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className='flex items-center py-2 border-b border-gray-100 last:border-b-0'
                      >
                        <div className='w-10 h-10 flex-shrink-0'>
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className='w-full h-full object-contain'
                          />
                        </div>
                        <div className='ml-3 flex-grow'>
                          <p className='text-xs text-gray-800 line-clamp-1'>
                            {item.name}
                          </p>
                          <div className='flex justify-between mt-1'>
                            <span className='text-xs text-gray-500'>
                              Qty: {item.quantity}
                            </span>
                            <span className='text-xs font-medium text-gray-800'>
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary Details */}
                <div className='space-y-3 text-sm border-t border-gray-200 pt-4'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Subtotal</span>
                    <span className='font-medium'>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Shipping</span>
                    <span className='font-medium'>
                      {finalShipping === 0
                        ? "Free"
                        : `$${finalShipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Tax (7%)</span>
                    <span className='font-medium'>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className='flex justify-between items-center border-t border-gray-200 mt-4 pt-4'>
                  <span className='text-lg font-semibold text-gray-800'>
                    Total
                  </span>
                  <span className='text-xl font-bold text-[#89AC46]'>
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>

                <div className='mt-6 flex items-center justify-center p-3 bg-gray-50 rounded-md border border-gray-200'>
                  <ShieldCheck size={18} className='text-[#89AC46] mr-2' />
                  <span className='text-sm text-gray-700'>Secure Checkout</span>
                </div>

                <div className='mt-4 flex justify-center space-x-2'>
                  <img src={visa} alt='Visa' className='h-6' />
                  <img src={mastercard} alt='Mastercard' className='h-6' />
                  <img src={poste} alt='Poste' className='h-6' />
                </div>

                <div className='mt-6 text-xs text-gray-500 space-y-2'>
                  <div className='flex items-start'>
                    <Truck size={14} className='mr-1 mt-0.5 flex-shrink-0' />
                    <span>Free shipping on orders over $100</span>
                  </div>
                  <div className='flex items-start'>
                    <AlertCircle
                      size={14}
                      className='mr-1 mt-0.5 flex-shrink-0'
                    />
                    <span>30-day money-back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
