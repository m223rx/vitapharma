import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/HomePage";
import About from "./pages/AboutPage";
import Contact from "./pages/ContactPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import SalePage from "./pages/SalePage";
import AuthPage from "./pages/AuthPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/auth" && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/sale' element={<SalePage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
      </Routes>
      {location.pathname !== "/auth" && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
