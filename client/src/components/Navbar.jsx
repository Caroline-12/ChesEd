import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

import { Button } from "./ui/button";
export default function Navbar() {
  const { user } = useContext(AuthContext);
  // console.log(user);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("chesed-user");
    navigate("/sign-in");
  };
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            <img src="chesed-logo.png" alt="Logo" width="150" height="37" />
          </Link>
          <div className="flex items-center space-x-4 ">
            <ul className="hidden md:flex space-x-4 ">
              <li>
                <Link
                  to="/"
                  className="text-black  font-bold hover:text-orange-600"
                >
                  Home
                </Link>
              </li>
              <li className="relative group">
                <Link
                  to="/popular-courses"
                  className="text-black  font-bold hover:text-orange-600"
                >
                  Courses
                </Link>
                <ul className="absolute left-0 hidden group-hover:block bg-white shadow-lg">
                  {/* Add your sub-menu items here */}
                </ul>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="text-black  font-bold hover:text-orange-600"
                >
                  Blogs
                </Link>
              </li>
            </ul>
          </div>
          {user?.username ? (
            <ul className="flex items-center space-x-4">
              <li>
                <FaSearch />
              </li>
              {/* <li className="hidden md:block">
                <Link to="/dashboard" className="mr-4">
                  Dashboard
                </Link>
              </li> */}
              <li className="hidden md:block">
                <button onClick={handleSignOut}>
                  Sign Out: {user.username}
                </button>
              </li>
            </ul>
          ) : (
            <ul className="flex items-center space-x-4">
              <li className="hidden md:block">
                <Link to="/become-tutor" className="">
                  <Button>Become a Tutor</Button>
                </Link>
              </li>
              <li className="hidden md:block">
                <Link to="/sign-up" className="">
                  <Button>Sign Up</Button>
                </Link>
              </li>
              <li className="hidden md:block">
                <Link to="/sign-in" className="">
                  <Button>Login</Button>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}
