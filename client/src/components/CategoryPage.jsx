import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const CategoryPage = () => {
  const { category } = useParams();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, [category]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/courses?category=${category}`
      );
      const data = response.data;
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses: ", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-40">
          <h2 className="text-3xl font-bold  mb-8 text-center">
            {category} Courses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <Link to={`/courses/${course.category}/${course.id}`} key={index}>
                <div className="bg-orange-50 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                  <div className="mb-4 h-40 bg-gray-200 flex items-center justify-center">
                    <img
                      src={course.imgSrc}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
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
                      <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                      <span className="ml-2 ">({course.ratingCount})</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
