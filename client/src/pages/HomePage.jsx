import React from "react";
import HeroSlider from "../components/HeroSlider";
import FeaturedCategories from "../components/FeaturedCategories";
import PopularProducts from "../components/PopularProducts";
import Feedbacks from "../components/Feedbacks";
import SunCare from "../components/products/SunCare";
import FacialCare from "../components/products/FacialCare";
import HairCare from "../components/products/HairCare";
import FoodSupplements from "../components/products/FoodSupplements";
import LatestProducts from "../components/LatestProducts";
import HotSalesDiv from "../components/HotSalesDiv";
import GetInTouch from "../components/GetInTouch";

function HomePage() {
  return (
    <>
      <HeroSlider />
      <FeaturedCategories />
      <PopularProducts />
      <HotSalesDiv />
      <SunCare />
      <FacialCare />
      <HairCare />
      <FoodSupplements />
      <LatestProducts />
      <Feedbacks />
      <GetInTouch />
    </>
  );
}

export default HomePage;
