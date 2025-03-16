"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Printer,
  ChevronRight,
  Package,
  Truck,
  Calendar,
  Download,
} from "lucide-react";

const orderData = {
  id: "ORD-12345678",
  date: "March 16, 2025",
  status: "Processing",
  paymentMethod: "Credit Card (**** 1234)",
  shippingMethod: "Standard Shipping",
  estimatedDelivery: "March 20-22, 2025",
  items: [
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
  ],
  customer: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
  },
  shippingAddress: {
    street: "123 Main Street",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    country: "United States",
  },
  billingAddress: {
    street: "123 Main Street",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
    country: "United States",
  },
  subtotal: 379.96,
  shipping: 0,
  tax: 26.6,
  total: 406.56,
};

const trackingSteps = [
  { id: 1, name: "Order Placed", date: "March 16, 2025", completed: true },
  { id: 2, name: "Processing", date: "March 16, 2025", completed: true },
  { id: 3, name: "Shipped", date: "Expected March 18, 2025", completed: false },
  {
    id: 4,
    name: "Delivered",
    date: "Expected March 20-22, 2025",
    completed: false,
  },
];

const OrderConfirmationPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const printOrder = () => {
    window.print();
  };

  const downloadInvoice = () => {
    console.log("Downloading invoice for order:", orderData.id);
    alert("Invoice download started");
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#89AC46]'></div>
          <p className='mt-4 text-gray-600'>Loading order information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='bg-white border-b border-gray-200'>
        <div className='container mx-auto px-4 py-8'>
          <div className='flex items-center text-sm text-gray-500'>
            <a href='/' className='hover:text-[#89AC46]'>
              Home
            </a>
            <ChevronRight className='mx-2 h-4 w-4' />
            <a href='/account/orders' className='hover:text-[#89AC46]'>
              My Orders
            </a>
            <ChevronRight className='mx-2 h-4 w-4' />
            <span className='text-gray-700'>Order #{orderData.id}</span>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-8'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-center'
        >
          <div className='flex justify-center mb-4'>
            <CheckCircle size={48} className='text-[#89AC46]' />
          </div>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mb-2'>
            Thank You for Your Order!
          </h1>
          <p className='text-gray-600 mb-4'>
            Your order has been received and is being processed. A confirmation
            email has been sent to {orderData.customer.email}.
          </p>
          <div className='flex flex-col sm:flex-row justify-center gap-4 mt-6'>
            <button
              onClick={printOrder}
              className='flex items-center justify-center px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors'
            >
              <Printer size={18} className='mr-2' />
              Print Order
            </button>
            <button
              onClick={downloadInvoice}
              className='flex items-center justify-center px-6 py-2 bg-[#89AC46] text-white rounded-md hover:bg-[#7a9a3d] transition-colors'
            >
              <Download size={18} className='mr-2' />
              Download Invoice
            </button>
          </div>
        </motion.div>

        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Order Details */}
          <div className='lg:w-2/3'>
            {/* Order Information */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6'>
              <div className='p-6'>
                <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6'>
                  <div>
                    <h2 className='text-xl font-semibold text-gray-800'>
                      Order #{orderData.id}
                    </h2>
                    <p className='text-gray-600 mt-1'>
                      Placed on {orderData.date}
                    </p>
                  </div>
                  <div className='mt-4 sm:mt-0'>
                    <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800'>
                      {orderData.status}
                    </span>
                  </div>
                </div>

                {/* Order Tracking */}
                <div className='mb-8'>
                  <h3 className='text-lg font-medium text-gray-800 mb-4'>
                    Order Tracking
                  </h3>
                  <div className='relative'>
                    {/* Progress Bar */}
                    <div className='absolute top-5 left-5 right-5 h-0.5 bg-gray-200'>
                      <div
                        className='h-0.5 bg-[#89AC46]'
                        style={{
                          width: `${
                            ((trackingSteps.filter((step) => step.completed)
                              .length -
                              1) /
                              (trackingSteps.length - 1)) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>

                    {/* Steps */}
                    <div className='flex justify-between relative'>
                      {trackingSteps.map((step) => (
                        <div
                          key={step.id}
                          className='flex flex-col items-center'
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                              step.completed
                                ? "bg-[#89AC46] text-white"
                                : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            {step.completed ? (
                              <CheckCircle size={20} />
                            ) : (
                              step.id
                            )}
                          </div>
                          <div className='text-center mt-2'>
                            <p
                              className={`text-sm font-medium ${
                                step.completed
                                  ? "text-gray-800"
                                  : "text-gray-500"
                              }`}
                            >
                              {step.name}
                            </p>
                            <p className='text-xs text-gray-500 mt-1'>
                              {step.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                  <div>
                    <h3 className='text-lg font-medium text-gray-800 mb-3'>
                      Shipping Information
                    </h3>
                    <div className='bg-gray-50 p-4 rounded-md'>
                      <p className='text-sm text-gray-700 mb-2'>
                        <span className='font-medium'>
                          {orderData.customer.name}
                        </span>
                      </p>
                      <p className='text-sm text-gray-700'>
                        {orderData.shippingAddress.street}
                        <br />
                        {orderData.shippingAddress.city},{" "}
                        {orderData.shippingAddress.state}{" "}
                        {orderData.shippingAddress.zipCode}
                        <br />
                        {orderData.shippingAddress.country}
                      </p>
                      <div className='mt-3 pt-3 border-t border-gray-200'>
                        <p className='text-sm text-gray-700'>
                          <span className='font-medium'>Shipping Method:</span>{" "}
                          {orderData.shippingMethod}
                        </p>
                        <p className='text-sm text-gray-700 mt-1'>
                          <span className='font-medium'>
                            Estimated Delivery:
                          </span>{" "}
                          {orderData.estimatedDelivery}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className='text-lg font-medium text-gray-800 mb-3'>
                      Payment Information
                    </h3>
                    <div className='bg-gray-50 p-4 rounded-md'>
                      <p className='text-sm text-gray-700 mb-2'>
                        <span className='font-medium'>Payment Method:</span>{" "}
                        {orderData.paymentMethod}
                      </p>
                      <p className='text-sm text-gray-700'>
                        <span className='font-medium'>Billing Address:</span>
                        <br />
                        {orderData.billingAddress.street}
                        <br />
                        {orderData.billingAddress.city},{" "}
                        {orderData.billingAddress.state}{" "}
                        {orderData.billingAddress.zipCode}
                        <br />
                        {orderData.billingAddress.country}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className='text-lg font-medium text-gray-800 mb-4'>
                    Order Items
                  </h3>
                  <div className='border rounded-md overflow-hidden'>
                    <table className='min-w-full divide-y divide-gray-200'>
                      <thead className='bg-gray-50'>
                        <tr>
                          <th
                            scope='col'
                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Product
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Quantity
                          </th>
                          <th
                            scope='col'
                            className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'
                          >
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody className='bg-white divide-y divide-gray-200'>
                        {orderData.items.map((item) => (
                          <tr key={item.id}>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <div className='flex items-center'>
                                <div className='flex-shrink-0 h-10 w-10'>
                                  <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    className='h-10 w-10 object-contain'
                                  />
                                </div>
                                <div className='ml-4'>
                                  <div className='text-sm font-medium text-gray-900'>
                                    {item.name}
                                  </div>
                                  <div className='text-sm text-gray-500'>
                                    Variant: {item.variant}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500'>
                              {item.quantity}
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                              ${(item.price * item.quantity).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6'>
              <div className='p-6'>
                <h3 className='text-lg font-medium text-gray-800 mb-4'>
                  Delivery Information
                </h3>
                <div className='space-y-4'>
                  <div className='flex items-start'>
                    <Package className='h-5 w-5 text-gray-400 mt-0.5 mr-3' />
                    <div>
                      <h4 className='text-sm font-medium text-gray-800'>
                        Package Contents
                      </h4>
                      <p className='text-sm text-gray-600 mt-1'>
                        Your order will be packed securely to ensure it arrives
                        in perfect condition.
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start'>
                    <Truck className='h-5 w-5 text-gray-400 mt-0.5 mr-3' />
                    <div>
                      <h4 className='text-sm font-medium text-gray-800'>
                        Shipping Details
                      </h4>
                      <p className='text-sm text-gray-600 mt-1'>
                        {orderData.shippingMethod} - Estimated delivery by{" "}
                        {orderData.estimatedDelivery}. You will receive a
                        tracking number once your order ships.
                      </p>
                    </div>
                  </div>

                  <div className='flex items-start'>
                    <Calendar className='h-5 w-5 text-gray-400 mt-0.5 mr-3' />
                    <div>
                      <h4 className='text-sm font-medium text-gray-800'>
                        Delivery Instructions
                      </h4>
                      <p className='text-sm text-gray-600 mt-1'>
                        No specific delivery instructions provided. If you need
                        to add special instructions, please contact our customer
                        service.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help */}
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
              <div className='p-6'>
                <h3 className='text-lg font-medium text-gray-800 mb-4'>
                  Need Help?
                </h3>
                <p className='text-sm text-gray-600 mb-4'>
                  If you have any questions or concerns about your order, please
                  don't hesitate to contact our customer service team.
                </p>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <a
                    href='/contact'
                    className='block text-center px-4 py-2 border border-[#89AC46] text-[#89AC46] rounded-md hover:bg-[#f9fbf5] transition-colors'
                  >
                    Contact Support
                  </a>
                  <a
                    href='/faq'
                    className='block text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors'
                  >
                    View FAQs
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className='lg:w-1/3'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden sticky top-24'>
              <div className='p-6'>
                <h2 className='text-xl font-semibold text-gray-800 mb-6'>
                  Order Summary
                </h2>

                {/* Summary Details */}
                <div className='space-y-3 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Subtotal</span>
                    <span className='font-medium'>
                      ${orderData.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Shipping</span>
                    <span className='font-medium'>
                      {orderData.shipping === 0
                        ? "Free"
                        : `$${orderData.shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Tax</span>
                    <span className='font-medium'>
                      ${orderData.tax.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className='flex justify-between items-center border-t border-gray-200 mt-4 pt-4'>
                  <span className='text-lg font-semibold text-gray-800'>
                    Total
                  </span>
                  <span className='text-xl font-bold text-[#89AC46]'>
                    ${orderData.total.toFixed(2)}
                  </span>
                </div>

                {/* Actions */}
                <div className='mt-6 space-y-3'>
                  <a
                    href='/account/orders'
                    className='block w-full text-center px-4 py-2 bg-[#89AC46] text-white rounded-md hover:bg-[#7a9a3d] transition-colors'
                  >
                    View All Orders
                  </a>
                  <a
                    href='/products'
                    className='block w-full text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors'
                  >
                    Continue Shopping
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
