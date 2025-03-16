import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const Aside = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [rating, setRating] = useState(0);

  const toggleAside = () => setIsOpen(!isOpen);

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports",
    "Books",
    "Toys",
    "Health & Beauty",
    "Automotive",
    "Jewelry",
    "Food & Groceries",
  ];

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = Number.parseInt(e.target.value);
    setPriceRange(newPriceRange);
  };

  return (
    <>
      <button
        className='fixed left-0 top-20 z-40 m-2 rounded-full bg-[#89AC46] p-2 text-white shadow-lg transition-all duration-300 hover:bg-indigo-700 focus:outline-none lg:hidden'
        onClick={toggleAside}
      >
        {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>

      <aside
        className={`fixed left-0 top-0 z-30 h-full w-64 transform overflow-y-auto bg-white p-5 shadow-lg transition-all duration-300 lg:relative lg:top-0 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className='mb-4 text-xl font-semibold text-gray-800'>Filters</h2>

        <div className='mb-6'>
          <h3 className='mb-2 font-medium text-gray-700'>Categories</h3>
          <ul className='space-y-2'>
            {categories.map((category, index) => (
              <li key={index}>
                <label className='flex items-center'>
                  <input
                    type='checkbox'
                    className='form-checkbox text-[#89AC46]'
                  />
                  <span className='ml-2 text-gray-700'>{category}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className='mb-6'>
          <h3 className='mb-2 font-medium text-gray-700'>Price Range</h3>
          <div className='flex items-center space-x-2'>
            <input
              type='number'
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              className='w-20 rounded border px-2 py-1'
            />
            <span>-</span>
            <input
              type='number'
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              className='w-20 rounded border px-2 py-1'
            />
          </div>
        </div>

        <div className='mb-6'>
          <h3 className='mb-2 font-medium text-gray-700'>Minimum Rating</h3>
          <div className='flex items-center'>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                className={`cursor-pointer ${
                  star <= rating
                    ? "fill-[#89AC46] text-[#89AC46]"
                    : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        <button className='w-full rounded bg-[#89AC46] py-2 text-white hover:bg-indigo-700'>
          Apply Filters
        </button>
      </aside>

      {isOpen && (
        <div
          className='fixed inset-0 z-20 bg-[#F1F0E9] bg-opacity-50 lg:hidden'
          onClick={toggleAside}
        ></div>
      )}
    </>
  );
};

export default Aside;
