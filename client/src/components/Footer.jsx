import { BsTelephone } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="container flex flex-row justify-between">
        <div className="w-full md:w-1/3 mb-6 md:mb-0 text-sm">
          <h2 className="text-2xl font-bold text-orange-500 mb-4">Chesed</h2>
          <p className="">Theodore Lowe, Ap #867-859 Sit Rd, </p>
          <p>Azusa New York</p>
          <p className="mt-2 text-2xl font-semibold">
            <span className="inline-block mr-2">
              <BsTelephone />
            </span>
            (702) 123-1478
          </p>
          <p>info@company.com</p>
          <div className="flex mt-4 space-x-4">
            <a href="#">
              <FaFacebookF />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaPinterest />
            </a>
            <a href="#">
              <BsYoutube />
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-lg font-bold text-white mb-4">Company</h3>
          <ul>
            <li>
              <a href="#" className="hover:underline text-xs">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-xs">
                Resource Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-xs">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-xs">
                Instructor
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-xs">
                Become A Teacher
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h3 className="text-lg font-bold text-white mb-4">Categories</h3>
          <ul>
            <li>
              <a href="#" className="hover:underline text-xs">
                All Courses
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-xs">
                Digital Marketing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-xs">
                Design & Branding
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-xs">
                Storytelling & Voice Over
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-xs">
                News & Blogs
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-bold text-white mb-4">Get in touch!</h3>
          <p className="mb-4 text-xs">
            Fusce varius, dolor tempor interdum tristiquei bibendum.
          </p>
          <div className="flex">
            <input
              type="email"
              className="w-full p-2 rounded-l bg-gray-800 text-gray-300 focus:outline-none text-sm"
              placeholder="Email"
            />
            <button className="bg-orange-500 text-sm text-white p-2 rounded-r">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="text-center mt-10 text-gray-500 text-sm">
        <p>&copy; {currentYear} Chesed All Rights Reserved by RadiusTheme</p>
        <p>
          <a href="#" className="hover:underline text-xs">
            Privacy Policy
          </a>

          <a href="#" className="hover:underline text-xs">
            Terms of Use
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
