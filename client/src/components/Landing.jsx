import Navbar from "./Navbar";
import Footer from "./Footer";
import CTA from "./CTA";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
export default function Landing() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div>
      <Navbar />
      <CTA />
      <Footer />
    </div>
  );
}
