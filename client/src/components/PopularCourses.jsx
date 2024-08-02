import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
// import Navbar from "./Navbar";
import useAuth from "@/hooks/useAuth";
import axios from "../api/axios";
import { Toaster, toast } from "sonner";
const COURSES_URL = "/popular-courses";

const PopularCourses = () => {
  const { auth, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchCourses();
  }, [auth, isLoggedIn]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };

      if (auth?.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
      }

      const response = await axios.get(COURSES_URL, config);
      setCourses(response?.data);
    } catch (err) {
      console.error("Error fetching courses:", err.message);
      if (err.response?.status === 403) {
        console.log("Authentication required to view courses");
        // Optionally, you could redirect to login page here
      }
      setCourses([]); // Set courses to empty array on error
    } finally {
      setLoading(false);
    }
  };

  console.log(courses);

  const handleCourseClick = (course) => {
    if (isLoggedIn) {
      navigate(`/courses/${course._id}`);
    } else {
      if (
        window.confirm(
          "You need to be logged in to view a course. Would you like to log in now?"
        )
      ) {
        navigate("/login", { state: { from: "/courses" } });
      }
    }
  };

  return (
    <>
      <Toaster />
      <div className="bg-gradient-to-br from-orange-100 to-red-100  py-16">
        <div className="container mx-auto px-4 md:px-40">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Our Popular Courses
          </h2>
          {loading ? (
            <p>Loading...</p>
          ) : courses.length > 0 ? (
            <>
              <div className="flex justify-around mb-4">
                <a
                  href="#"
                  className="text-orange-600 border-b-2 border-orange-600 pb-1"
                >
                  All Categories
                </a>
                <a href="#" className="pb-1">
                  Trending
                </a>
                <a href="#" className="pb-1">
                  Popularity
                </a>
                <a href="#" className="pb-1">
                  Featured
                </a>
                <a href="#" className="pb-1">
                  Art & Design
                </a>
                <a href="#" className="pb-1">
                  Other Courses
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div
                    onClick={() => handleCourseClick(course)}
                    key={course.id}
                    className=" p-6 no-underline hover:cursor-pointer hover:bg-transparent bg-orange-50  rounded-lg shadow-sm transition-transform transform hover:scale-105"
                  >
                    <div className="mb-4 h-40 bg-gray-200 flex items-center justify-center">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mb-2 text-xs font-semibold text-pink-500 uppercase">
                      {course.category}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <p className="mb-2 text-sm">{course.description}</p>
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <span>{course.lessons} Lessons</span>
                      <span>{course.type}</span>
                    </div>
                    <div className="flex items-center justify-between border-t-2 pt-2">
                      <span className="text-lg font-bold">{course.price}</span>
                      <div className="flex items-center">
                        <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                        <span className="ml-2">{course.ratingCount}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="cursor-pointer p-6 bg-orange-50 rounded-lg shadow-md flex items-center justify-center transition-transform transform hover:scale-105 hover:border-orange-500 border-2">
                  <div>
                    <h4 className="text-xl font-bold">
                      The World's Largest Selection of Online Courses
                    </h4>
                    <Button className="" href="#">
                      Browse All
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-96">
              <p className="text-xl">No courses found</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PopularCourses;
