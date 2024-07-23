import React, { useState } from "react";
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
  if (!auth?.accessToken) {
    navigate("/login", { state: { from: "/submit-assignment" } });
  }
  // else if (auth?.role !== 2001) {
  // navigate("/unauthorized");
  // }
  const [assignmentDetails, setAssignmentDetails] = useState({
    title: "",
    description: "",
    price: 0,
    dueDate: "",
    studentId: auth?.ID,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssignmentDetails((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        ASSIGNMENTS_URL,
        JSON.stringify(assignmentDetails),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.accessToken}`,
          },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      toast.success("Assignment submitted successfully!");
      setAssignmentDetails({
        title: "",
        description: "",
        price: 0,
        dueDate: "",
      });
      setTimeout(() => {
        navigate("/profile");
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
      <form onSubmit={handleSubmit} className="space-y-6">
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
          <Label htmlFor="price">Budget (in $)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            value={assignmentDetails.price}
            onChange={handleInputChange}
            placeholder="Enter your budget"
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
        <div className="flex justify-end">
          <Button type="submit">Submit Assignment</Button>
        </div>
      </form>
    </div>
  );
};

export default SubmitAssignment;
