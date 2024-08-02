import { useState, useEffect } from "react";
import axios from "@/api/axios";
import { Button } from "@/components/ui/button";

const CourseForm = ({ course, onClose }) => {
  const [title, setTitle] = useState(course ? course.title : "");
  const [description, setDescription] = useState(
    course ? course.description : ""
  );
  const [content, setContent] = useState(course ? course.content : "");
  const [price, setPrice] = useState(course ? course.price : "");
  const [thumbnail, setThumbnail] = useState(course ? course.thumbnail : "");
  const [category, setCategory] = useState(course ? course.category : "");
  const [duration, setDuration] = useState(course ? course.duration : "");
  const [level, setLevel] = useState(course ? course.level : "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
      title,
      description,
      content,
      price,
      thumbnail,
      category,
      duration,
      level,
    };

    try {
      if (course) {
        await axios.put(`/courses/${course._id}`, courseData);
      } else {
        await axios.post("/courses", courseData);
      }
      onClose();
    } catch (err) {
      console.error("Error saving course:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Thumbnail URL</label>
        <input
          type="text"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Duration (hours)
        </label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Level</label>
        <input
          type="text"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <Button type="submit" className="bg-blue-600 text-white">
        {course ? "Update Course" : "Create Course"}
      </Button>
      <Button onClick={onClose} className="bg-gray-500 text-white ml-2">
        Cancel
      </Button>
    </form>
  );
};

export default CourseForm;
