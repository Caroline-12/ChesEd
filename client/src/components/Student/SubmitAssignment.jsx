import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast, Toaster } from "sonner";
import axios from "@/api/axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ASSIGNMENTS_URL = "/assignments";

const SubmitAssignment = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [assignmentDetails, setAssignmentDetails] = useState({
    title: "",
    description: "",
    proposedBudget: 0,
    dueDate: "",
    category: "",
    studentId: auth.ID,
    file: null,
  });

  useEffect(() => {
    if (!auth?.accessToken) {
      navigate("/login", { state: { from: "/submit-assignment" } });
    } else {
      setAssignmentDetails((prev) => ({ ...prev, studentId: auth.ID }));
    }
  }, [auth, navigate]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
          withCredentials: true,
        };

        const response = await axios.get(
          "http://localhost:3500/categories",
          config
        );
        setCategories(response.data);
      } catch (error) {
        toast.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setAssignmentDetails((prev) => ({
      ...prev,
      [name]: name === "proposedBudget" ? parseFloat(value) : value,
    }));
    setAssignmentDetails((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleCategoryChange = (e) => {
    setAssignmentDetails({ ...assignmentDetails, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", assignmentDetails.title);
    formData.append("description", assignmentDetails.description);
    formData.append("proposedBudget", assignmentDetails.proposedBudget);
    formData.append("dueDate", assignmentDetails.dueDate);
    formData.append("category", assignmentDetails.category);
    formData.append("studentId", assignmentDetails.studentId);
    formData.append("file", assignmentDetails.file);

    console.log("Form data:", formData);
    try {
      const response = await axios.post(ASSIGNMENTS_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth?.accessToken}`,
        },
        withCredentials: true,
      });
      console.log(JSON.stringify(response?.data));
      toast.success("Assignment submitted successfully!");
      setAssignmentDetails({
        title: "",
        description: "",
        proposedBudget: 0,
        dueDate: "",
        category: "",
        studentId: "",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      toast.error(
        "Submission failed: " + error.response?.data?.message || error.message
      );
    }
  };

  const goback = () => navigate(-1);

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white rounded-lg shadow-xl">
      <button onClick={goback}>Go Back</button>
      <Toaster />
      <h2 className="text-3xl font-bold mb-6 text-center">
        Submit Your Assignment
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
        method="POST"
      >
        <div>
          <Label htmlFor="title">Assignment Title</Label>
          <Input
            id="title"
            name="title"
            value={assignmentDetails.title}
            onChange={handleInputChange}
            placeholder="Enter the title of your assignment"
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={assignmentDetails.description}
            onChange={handleInputChange}
            placeholder="Describe your assignment in detail"
            required
            rows={4}
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={assignmentDetails.category}
            onChange={handleCategoryChange}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="proposedBudget">Proposed Budget (in $)</Label>
          <Input
            id="proposedBudget"
            name="proposedBudget"
            type="number"
            value={assignmentDetails.proposedBudget}
            onChange={handleInputChange}
            placeholder="Enter your proposed budget"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            name="dueDate"
            type="date"
            value={assignmentDetails.dueDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="document">Upload Document</Label>
          <input type="file" name="file" onChange={handleInputChange} />
        </div>
        <div className="flex justify-end">
          <Button type="submit">Submit Assignment</Button>
        </div>
      </form>
    </div>
  );
};

export default SubmitAssignment;
