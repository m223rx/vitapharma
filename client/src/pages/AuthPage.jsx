"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Tab } from "@headlessui/react";
import Login from "../components/Login";
import Register from "../components/Register";

const AuthPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 p-4'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl'
      >
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className='flex'>
            <Tab
              className={({ selected }) =>
                `w-1/2 py-4 text-center text-lg font-medium focus:outline-none ${
                  selected
                    ? "bg-[#89AC46] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`
              }
            >
              Login
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-1/2 py-4 text-center text-lg font-medium focus:outline-none ${
                  selected
                    ? "bg-[#89AC46] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`
              }
            >
              Register
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <Login />
            </Tab.Panel>
            <Tab.Panel>
              <Register />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </motion.div>
    </div>
  );
};

export default AuthPage;
