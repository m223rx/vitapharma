import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import About from "./pages/AboutPage";
import Contact from "./pages/ContactPage";
import Navbar from "./components/Navbar";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Footer from "./components/Footer";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/products' element={<ProductsPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
