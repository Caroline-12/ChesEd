import Navbar from "./Navbar";
import Footer from "./Footer";
import CTA from "./CTA";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import CategoriesPage from "./CategoriesPage";
import PopularCourses from "./PopularCourses";
import Testimonials from "./Testimonials";
import Instructors from "./Instructors";
import PartnersSection from "./PartnersSection";
import NewsAndBlogsSection from "./NewsAndBlogsSection";
export default function Landing() {
  const { user } = useContext(AuthContext);
  // console.log(user);
  return (
    <div className="">
      <Navbar />
      <CTA />
      <CategoriesPage />
      {/* <PopularCourses /> */}
      <Testimonials />
      <Instructors />
      <PartnersSection />
      <NewsAndBlogsSection />
      <Footer />
    </div>
  );
}
