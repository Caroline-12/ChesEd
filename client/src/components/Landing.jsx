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
import Heroes from "./Heroes";
import StudentLanding from "./Student/StudentLanding";
export default function Landing() {
  const { user } = useContext(AuthContext);
  // console.log(user);
  return (
    <div className="">
      <Navbar />
      <Heroes />
      {/* <CTA /> */}
      <StudentLanding />
      <CategoriesPage />
      <PopularCourses />
      <Testimonials />
      {/* <Instructors /> */}
      <PartnersSection />
      {/* <NewsAndBlogsSection /> */}
      <Footer />
    </div>
  );
}
