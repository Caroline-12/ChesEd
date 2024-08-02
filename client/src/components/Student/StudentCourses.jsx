import { useState, useEffect } from "react";
// import CourseCard from "../components/CourseCard";
import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";

const StudentCourses = () => {
  const { auth } = useAuth();
  const [courses, setCourses] = useState([]);
  const categories = [
    { id: 1, name: "Development" },
    { id: 2, name: "Design" },
    { id: 3, name: "Marketing" },
    // Add more categories as needed
  ];
  useEffect(() => {
    // Fetch courses and categories from the API
    const fetchCourses = async () => {
      try {
        const StudentCoursesResponse = await axios.get("/courses", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
        console.log(coursesResponse.data);
        setCourses(coursesResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchCourses();
  }, []);

  console.log(courses);
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Courses</h1>
      <div className="flex space-x-4 mb-6">
        <div className="w-1/4">
          <h2 className="text-2xl font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category.id}
                className="text-lg text-gray-700 hover:text-orange-600 cursor-pointer"
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        className="w-full h-48 object-cover"
        src={course.thumbnail}
        alt={course.title}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{course.title}</h3>
        <p className="text-gray-600">{course.description}</p>
        <div className="mt-4">
          <span className="text-gray-800 font-bold">${course.price}</span>
          <span className="text-gray-500 ml-2 line-through">
            ${course.originalPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentCourses;
