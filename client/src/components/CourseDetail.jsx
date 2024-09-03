import { useParams, Link } from "react-router-dom";
import coursesData from "../../courses.json";
import Navbar from "./Navbar";
import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";
import { useState, useEffect } from "react";

const CourseDetail = () => {
  const { courseId } = useParams();
  const { auth } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching course?...");
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    console.log("Fetching course?...");
    try {
      console.log("Fetching course?...");
      const response = await axios.get(`/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      console.log(response.data);
      setCourse(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching lesson:", err);
      setError("Failed to load lesson. Please try again later.");
      setLoading(false);
    }
  };

  console.log(course);

  if (error) {
    return <div>Course not found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-40">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {course?.title}
          </h2>
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/3">
              <div className="mb-4 h-80 bg-gray-200 flex items-center justify-center">
                <img
                  src={course?.thumbnail}
                  alt={course?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2">Course Description</h3>
                <p>{course?.description}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2">Course Content</h3>
                <ul className="list-disc list-inside">
                  {/* {course?.content.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))} */}

                  {course?.content}
                </ul>
              </div>
            </div>
            <div className="lg:w-1/3 lg:pl-8">
              <div className="p-6 bg-orange-100 rounded-lg shadow-md">
                <div className="mb-4 text-xl font-bold text-orange-600">
                  Course Details
                </div>
                <div className="mb-2">
                  <span className="font-bold">Category: </span>
                  {course?.category}
                </div>
                <div className="mb-2">
                  <span className="font-bold">Price: </span>
                  {course?.price}
                </div>
                <div className="mb-2">
                  <span className="font-bold">Lessons: </span>
                  {course?.lessons}
                </div>
                <div className="mb-2">
                  <span className="font-bold">Type: </span>
                  {course?.type}
                </div>
                <div className="mb-2">
                  <span className="font-bold">Rating: </span>
                  <span className="text-yellow-500">⭐⭐⭐⭐⭐</span> (
                  {course?.ratingCount})
                </div>
                <div className="mt-4">
                  <Link
                    to="/"
                    // I will resort to the courses page and route later on when I have the UI to list all courses
                    // to="/courses"
                    className="text-orange-600 underline"
                  >
                    Back to Courses
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
