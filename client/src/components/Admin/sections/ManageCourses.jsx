import { useState, useEffect } from "react";
import axios from "@/api/axios";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import CourseForm from "../CourseForm";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("/courses");
      setCourses(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to load courses. Please try again later.");
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedCourse(null);
    setShowForm(true);
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setShowForm(true);
  };

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`/courses/${courseId}`);
      fetchCourses();
    } catch (err) {
      console.error("Error deleting course:", err);
      setError("Failed to delete course. Please try again later.");
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    fetchCourses();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Button onClick={handleCreate} className="mb-4 bg-blue-600 text-white">
        Create New Course
      </Button>
      {showForm && (
        <CourseForm course={selectedCourse} onClose={handleFormClose} />
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <Card key={course._id} className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{course.description}</p>
              <div className="flex justify-between mt-4">
                <Button
                  onClick={() => handleEdit(course)}
                  className="bg-yellow-500 text-white"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(course._id)}
                  className="bg-red-500 text-white"
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageCourses;
