import React from "react";
import { useParams, Link } from "react-router-dom";
import coursesData from "../../courses.json";
import Navbar from "./Navbar";

const CourseDetail = () => {
  const { id } = useParams();
  const course = coursesData.find((course) => course.id === parseInt(id));

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-40">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {course.title}
          </h2>
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/3">
              <div className="mb-4 h-80 bg-gray-200 flex items-center justify-center">
                <img
                  src={course.imgSrc}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2">Course Description</h3>
                <p>{course.description}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-2">Course Content</h3>
                <ul className="list-disc list-inside">
                  {course.content.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
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
                  {course.category}
                </div>
                <div className="mb-2">
                  <span className="font-bold">Price: </span>
                  {course.price}
                </div>
                <div className="mb-2">
                  <span className="font-bold">Lessons: </span>
                  {course.lessons}
                </div>
                <div className="mb-2">
                  <span className="font-bold">Type: </span>
                  {course.type}
                </div>
                <div className="mb-2">
                  <span className="font-bold">Rating: </span>
                  <span className="text-yellow-500">⭐⭐⭐⭐⭐</span> (
                  {course.ratingCount})
                </div>
                <div className="mt-4">
                  <Link
                    to="/popular-courses"
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