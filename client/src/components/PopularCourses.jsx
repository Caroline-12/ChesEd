import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import Navbar from "./Navbar";
import { CreateCourse } from "./CreateCourse";

const PopularCourses = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/courses");
      const data = response.data;
      setCourses(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching courses: ", error);
    }
  };
  console.log(courses);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-40">
          <h2 className="text-3xl font-bold  mb-8 text-center">
            Our Popular Courses
          </h2>
          {/* design filter for small screens */}
          <div className="flex justify-around mb-4">
            <a
              href="#"
              className="text-orange-600 border-b-2 border-orange-600 pb-1"
            >
              All Categories
            </a>
            <a href="#" className=" pb-1">
              Trending
            </a>
            <a href="#" className=" pb-1">
              Popularity
            </a>
            <a href="#" className=" pb-1">
              Featured
            </a>
            <a href="#" className=" pb-1">
              Art & Design
            </a>
            <a href="#" className=" pb-1">
              Other Courses
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-orange-50 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                <div className="mb-4 h-40 bg-gray-200 flex items-center justify-center">
                  <span className="text-3xl">500X273</span>
                </div>
                <div className="mb-2 text-xs font-semibold text-pink-500 uppercase">
                  {course.category}
                </div>
                <h3 className="text-xl font-bold  mb-2">{course.title}</h3>
                <p className=" mb-2 text-sm">{course.description}</p>
                <div className="flex items-center justify-between  mb-4 text-sm">
                  <span>{course.lessons}</span>
                  <span>{course.type}</span>
                </div>
                <div className="flex items-center justify-between border-t-2 pt-2">
                  <span className="text-lg font-bold ">{course.price}</span>
                  <div className="flex items-center">
                    <span className="text-yellow-500">⭐⭐⭐⭐⭐⭐</span>
                    <span className="ml-2 ">({course.ratingCount})</span>
                  </div>
                </div>
              </div>
            ))}
            <div
              onClick={toggleModal}
              className="cursor-pointer p-6 bg-orange-100 rounded-lg shadow-md flex items-center justify-center transition-transform transform hover:scale-105 hover:border-orange-500 border-2"
            >
              <div>
                <h4 className="text-xl font-bold ">
                  The World's Largest Selection of Online Courses
                </h4>
                <Button className="" href="#">
                  Browse All
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
            <CreateCourse toggleModal={toggleModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default PopularCourses;
