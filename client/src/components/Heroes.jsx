import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectLabel,
  SelectValue,
} from "./ui/select";

const Heroes = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleSubmitlesson = () => {
    if (auth?.accessToken) {
      navigate("/submit-lesson");
    } else {
      if (
        window.confirm(
          "You need to be logged in to submit an lesson. Would you like to log in now?"
        )
      ) {
        navigate("/login", { state: { from: "submit-lesson" } });
      }
    }
  };
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      <div
        className=" h-screen flex flex-col items-center justify-center text-center bg-gradient-to-t from-orange-100 to-red-100"
        onClick={toggleDropdown}
      >
        <div className="container mx-auto px-6 py-12 relative">
          <h1 className="text-4xl md:text-6xl font-bold text-orange-900 tracking-wide leading-loose mb-6">
            We Help to Upgrade Your Knowledge Effectively
          </h1>
          <p className="text-lg md:text-xl text-orange-900 tracking-wide leading-loose mb-12">
            Grursus mal suada faci lisis Lorem ipsum dolor sit ametion
            consectetur adipiscing elit
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mb-12">
            <div className="relative">
              <Button
                className="text-orange-600 bg-white px-6 py-3 rounded-lg hover:bg-orange-600 hover:text-white hover:border-white border-2 transition"
                onClick={toggleDropdown}
              >
                Get Started
              </Button>
              {dropdownVisible && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg z-10">
                  <Button
                    onClick={() => navigate("/register")}
                    variant="outline"
                    className="block w-full text-left px-6 py-3 text-gray-700  hover:bg-gray-100 transition"
                  >
                    As a Student
                  </Button>
                  <Button
                    onClick={() => navigate("/become-tutor")}
                    variant="outline"
                    className="block w-full text-left px-6 py-3 text-gray-700  hover:bg-gray-100 transition"
                  >
                    As a Tutor
                  </Button>
                </div>
              )}
            </div>
            <Button
              onClick={handleSubmitlesson}
              variant="outline"
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:text-orange-500 border-2 transition"
            >
              Request a lesson
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-6 py-12">
          <div className="relative flex items-center w-full max-w-lg mx-auto bg-white rounded-lg shadow">
            <Input
              type="text"
              placeholder="Search your courses"
              className="w-full py-3 px-4 rounded-l-lg focus:outline-none"
            />
            <div className="relative flex items-center">
              <Select>
                <SelectTrigger className="w-[240px]">
                  <SelectValue placeholder="Search within a cartegory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="Art & Design">Art & Design</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Development">Development</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button className="absolute right-0  bg-orange-600 text-white px-4 py-2 rounded-r-lg hover:bg-orange-500 transition">
                Find me a tutor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Heroes;
