"use client";

import contactImage from "../assets/contact.png";

function AboutPage() {
  return (
    <div className='bg-gray-50'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        <div className='flex flex-col lg:flex-row items-center'>
          <div className='lg:w-1/2 text-center lg:text-left'>
            <h2 className='text-3xl font-extrabold text-[#89AC46] mb-4'>
              Welcome to VitaPharma
            </h2>
            <p className='text-lg text-gray-700 mb-6'>
              At VitaPharma, we are committed to enhancing health and well-being
              through innovative and high-quality VitaPharmaical solutions. Our
              mission is to provide trusted healthcare products that empower
              individuals to lead healthier lives.
            </p>
            <p className='text-lg text-gray-700 mb-6'>
              With a strong foundation in medical expertise and cutting-edge
              research, we develop and distribute a range of products designed
              to support preventive care, recovery, and overall wellness. From
              pharmaceutical-grade supplements to advanced medical supplies,
              every product we offer is crafted with precision and care to meet
              the highest industry standards. At VitaPharma, we believe that
              healthcare should be accessible, reliable, and tailored to
              individual needs.
            </p>
            <p className='text-lg text-gray-700'>
              Our dedication to quality, safety, and customer satisfaction
              drives us to continually innovate and improve our offerings. Join
              us in our journey towards a healthier future—because at
              VitaPharma, your well-being is our priority.
            </p>
          </div>

          <div className='lg:w-1/2 lg:mt-0'>
            <img
              src={contactImage}
              alt='Marketplace'
              className='rounded-lg w-full h-auto'
            />
          </div>
        </div>

        <div className='mb-7 text-center'>
          <h3 className='text-2xl font-semibold text-gray-800 mb-4'>
            Why Choose Us?
          </h3>
          <p className='text-lg text-gray-600'>
            At VitaPharma, we are dedicated to providing high-quality,
            research-backed VitaPharmaical solutions that promote health and
            well-being. Our commitment to innovation, safety, and customer
            satisfaction ensures that every product meets the highest standards.
            With a focus on accessibility and reliability, we strive to make
            healthcare more effective and convenient for everyone.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
