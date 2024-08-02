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

  const handleSubmitAssignment = () => {
    if (auth?.accessToken) {
      navigate("/submit-assignment");
    } else {
      if (
        window.confirm(
          "You need to be logged in to submit an assignment. Would you like to log in now?"
        )
      ) {
        navigate("/login", { state: { from: "submit-assignment" } });
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
        className="relative bg-cover bg-center h-screen flex flex-col items-center justify-center text-center bg-gradient-to-r from-orange-400 to-red-600"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1660245094600-c45a01fcc8e3?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
        onClick={toggleDropdown}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-6 py-12 relative">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            We Help to Upgrade Your Knowledge Effectively
          </h1>
          <p className="text-lg md:text-xl text-white mb-12">
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
                    variant="outline"
                    className="block w-full text-left px-6 py-3 text-gray-700  hover:bg-gray-100 transition"
                  >
                    As a Student
                  </Button>
                  <Button
                    variant="outline"
                    className="block w-full text-left px-6 py-3 text-gray-700  hover:bg-gray-100 transition"
                  >
                    As a Tutor
                  </Button>
                </div>
              )}
            </div>
            <Button
              onClick={handleSubmitAssignment}
              variant="outline"
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:text-orange-500 border-2 transition"
            >
              Submit a Task
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
                <FaSearch />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Heroes;
