import { useState, useEffect } from "react";
import axios from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import CourseForm from "../CourseForm";
import useAuth from "@/hooks/useAuth";
import { MdEdit, MdDelete } from "react-icons/md";
import { CreateCourse } from "../CreateCourse";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      if (auth?.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
      }

      const response = await axios.get("/courses", config);
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
        <CreateCourse course={selectedCourse} onClose={handleFormClose} />
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className="text-left">Title</TableCell>
            <TableCell className="text-left">Description</TableCell>
            <TableCell className="text-left">Category</TableCell>
            <TableCell className="text-left">Price</TableCell>
            <TableCell className="text-left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="text-left">{course.title}</TableCell>
              <TableCell className="text-left">{course.description}</TableCell>
              <TableCell className="text-left">{course.category}</TableCell>
              <TableCell className="text-left">{course.price}</TableCell>
              <TableCell className="text-left">
                <Button
                  onClick={() => handleEdit(course)}
                  className="mr-2 bg-yellow-500 text-white"
                >
                  <MdEdit />
                </Button>
                <Button
                  onClick={() => handleDelete(course._id)}
                  className="bg-red-500 text-white"
                >
                  <MdDelete />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageCourses;
