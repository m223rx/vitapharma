import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import SalePage from "./pages/SalePage";
import AuthPage from "./pages/AuthPage";
import BlogPage from "./pages/BlogPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import CareersPage from "./pages/CareersPage";
import ContactPage from "./pages/ContactPage";
import CheckoutPage from "./pages/CheckoutPage";
import PressMediaPage from "./pages/PressMediaPage";
import OurStoryPage from "./components/OurStoryPage";
import NewArrivalsPage from "./pages/NewArrivalsPage";
import AllProductsPage from "./pages/AllProductsPage";
import PartnershipPage from "./pages/PartnershipPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/auth" && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog' element={<BlogPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/sale' element={<SalePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/careers' element={<CareersPage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/our-story' element={<OurStoryPage />} />
        <Route path='/products' element={<AllProductsPage />} />
        <Route path='/press-media' element={<PressMediaPage />} />
        <Route path='/new-arrivals' element={<NewArrivalsPage />} />
        <Route path='/partnerships' element={<PartnershipPage />} />
        <Route path='/product/:productId' element={<ProductDetailsPage />} />
        <Route path='/order-confirmation' element={<OrderConfirmationPage />} />
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
