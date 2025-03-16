import { FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <div className='group relative overflow-hidden rounded-lg border bg-white p-4 shadow-md transition duration-300 hover:shadow-lg'>
      <img
        src={product.image}
        alt={product.name}
        className='h-40 w-full rounded-lg object-cover'
      />
      <div className='mt-3'>
        <h3 className='text-lg font-semibold'>{product.name}</h3>
        <div className='mt-2 flex items-center gap-2'>
          <span className='text-xl font-bold text-[#89AC46]'>
            ${product.price}
          </span>
          <div className='flex items-center'>
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-yellow-400 ${
                  i < product.rating ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition duration-300 group-hover:opacity-100'>
        <button className='rounded-lg bg-white px-4 py-2 text-black font-semibold shadow-md transition hover:bg-gray-100'>
          See More
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
