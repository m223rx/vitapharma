import { useState } from "react";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      image:
        "https://www.sbsmobile.com/ita/305114-thickbox_default/floxy-headphones.jpg",
      quantity: 1,
    },
    {
      id: 2,
      name: "Smartwatch",
      price: 149.99,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO4touz92RkST3TQDgbSums2rtrdL1UGWlHg&s",
      quantity: 2,
    },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className='text-gray-500'>Your cart is empty.</p>
      ) : (
        <div className='space-y-4'>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className='flex items-center justify-between p-4 border rounded-lg shadow-md'
            >
              <img
                src={item.image}
                alt={item.name}
                className='w-16 h-16 object-cover rounded'
              />
              <div className='flex-1 ml-4'>
                <h3 className='text-lg font-semibold'>{item.name}</h3>
                <p className='text-gray-600'>${item.price.toFixed(2)}</p>
              </div>
              <div className='flex items-center'>
                <button
                  className='p-2 bg-gray-200 rounded-l hover:bg-gray-300'
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  <FaMinus />
                </button>
                <span className='px-4 py-2 border'>{item.quantity}</span>
                <button
                  className='p-2 bg-gray-200 rounded-r hover:bg-gray-300'
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  <FaPlus />
                </button>
              </div>
              <button
                className='ml-4 p-2 bg-red-500 text-white rounded hover:bg-red-600'
                onClick={() => removeItem(item.id)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
          <div className='text-right font-bold text-lg mt-4'>
            Total: ${totalAmount.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
