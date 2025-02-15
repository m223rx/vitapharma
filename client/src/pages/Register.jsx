import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import CountryList from "react-select-country-list"; // Import Country List
import { FaUser, FaEnvelope, FaPhone, FaLock, FaGlobe } from "react-icons/fa"; // Import icons
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const countryOptions = CountryList().getData(); // Get country list options
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleNextStep = () => {
    if (step === 3) {
      // Save user data to localStorage after successful registration
      const user = {
        firstName,
        lastName,
        address1,
        address2,
        country,
        phone,
        email,
        password,
      };

      // Store user object in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Registered successfully!");
      
      // Redirect to the Login page after registration
      setTimeout(() => {
        navigate("/login"); // Navigate to the Login page
      }, 0);
    }

    if (step === 1 && !firstName) {
      toast.error("First name is required");
      return;
    }
    if (step === 1 && !lastName) {
      toast.error("Last name is required");
      return;
    }
    if (step === 1 && !address1) {
      toast.error("Address 1 is required");
      return;
    }
    if (step === 1 && !address2) {
      toast.error("Address 2 is required");
      return;
    }
    if (step === 1 && !country) {
      toast.error("Country is required");
      return;
    }
    if (step === 1 && !phone) {
      toast.error("Phone number is required");
      return;
    }
    if (step === 1 && !email) {
      toast.error("Email is required");
      return;
    }

    if (step === 2 && !password) {
      toast.error("Password is required");
      return;
    }
    if (step === 2 && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (step === 3 && !otp) {
      toast.error("OTP is required");
      return;
    }

    setStep(step + 1); // Move to the next step
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-6 shadow-lg rounded-2xl"
      >
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          Register
        </h2>
        <form className="space-y-4">
          {step === 1 && (
            <>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-blue-500" />
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-blue-300 rounded-lg"
                  required
                />
              </div>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-blue-500" />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-blue-300 rounded-lg"
                  required
                />
              </div>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-blue-500" />
                <input
                  type="text"
                  placeholder="Address 1"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-blue-300 rounded-lg"
                  required
                />
              </div>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-blue-500" />
                <input
                  type="text"
                  placeholder="Address 2"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-blue-300 rounded-lg"
                  required
                />
              </div>
              <div className="relative">
                <FaGlobe className="absolute left-3 top-3 text-blue-500" />
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-blue-300 rounded-lg"
                  required
                >
                  <option value="">Select Country</option>
                  {countryOptions.map((country, index) => (
                    <option key={index} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <FaPhone className="absolute left-3 top-3 text-blue-500" />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-blue-300 rounded-lg"
                  required
                />
              </div>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-blue-500" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-blue-300 rounded-lg"
                  required
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-blue-500" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-blue-300 rounded-lg"
                  required
                />
              </div>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-blue-500" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-blue-300 rounded-lg"
                  required
                />
              </div>
            </>
          )}

          {step === 3 && (
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-blue-500" />
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-blue-300 rounded-lg"
                required
              />
            </div>
          )}

          <button
            type="button"
            onClick={handleNextStep}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
          >
            {step === 3 ? "Submit" : "Next"}
          </button>
        </form>
        <ToastContainer />
      </motion.div>
    </div>
  );
}
