import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast, Toaster } from "sonner";
import axios from "@/api/axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const lessons_URL = "/lessons";

const Submitlesson = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [lessonDetails, setlessonDetails] = useState({
    title: "",
    description: "",
    proposedBudget: 0,
    dueDate: "",
    category: "",
    studentId: auth.ID,
    file: null,
    modeOfDelivery: "",
  });

  useEffect(() => {
    if (!auth?.accessToken) {
      navigate("/login", { state: { from: "/submit-lesson" } });
    } else {
      setlessonDetails((prev) => ({ ...prev, studentId: auth.ID }));
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
    setlessonDetails((prev) => ({
      ...prev,
      [name]: name === "proposedBudget" ? parseFloat(value) : value,
    }));
    setlessonDetails((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleCategoryChange = (e) => {
    setlessonDetails({ ...lessonDetails, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", lessonDetails.title);
    formData.append("description", lessonDetails.description);
    formData.append("proposedBudget", lessonDetails.proposedBudget);
    formData.append("dueDate", lessonDetails.dueDate);
    formData.append("category", lessonDetails.category);
    formData.append("studentId", lessonDetails.studentId);
    formData.append("file", lessonDetails.file);
    formData.append("modeOfDelivery", lessonDetails.modeOfDelivery);
    formData.append("paymentStatus", false);

    console.log("Form data:", formData);
    try {
      const response = await axios.post(lessons_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth?.accessToken}`,
        },
        withCredentials: true,
      });
      console.log(JSON.stringify(response?.data));
      toast.success("lesson submitted successfully!");
      setlessonDetails({
        title: "",
        description: "",
        proposedBudget: 0,
        dueDate: "",
        category: "",
        studentId: "",
      });
      setTimeout(() => {
        navigate("/dashboard/lessons");
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
        Submit Your lesson
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
        method="POST"
      >
        <div>
          <Label htmlFor="title">lesson Title</Label>
          <Input
            id="title"
            name="title"
            value={lessonDetails.title}
            onChange={handleInputChange}
            placeholder="Enter the title of your lesson"
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={lessonDetails.description}
            onChange={handleInputChange}
            placeholder="Describe your lesson in detail"
            required
            rows={4}
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={lessonDetails.category}
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
            value={lessonDetails.proposedBudget}
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
            value={lessonDetails.dueDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="document">Upload Document</Label>
          <input type="file" name="file" onChange={handleInputChange} />
        </div>
        {/* mode of delivery radio button
         */}
        <div>
          <Label htmlFor="modeOfDelivery">Mode of Delivery</Label>
          <div>
            <input
              type="radio"
              id="online"
              name="modeOfDelivery"
              value="online"
              // set the state when the radio button is clicked
              onChange={handleInputChange}
            />
            <label htmlFor="online">Virtual lesson</label>
          </div>
          <div>
            <input
              type="radio"
              id="offline"
              name="modeOfDelivery"
              value="offline"
              // set the state when the radio button is clicked
              onChange={handleInputChange}
            />
            <label htmlFor="offline">written lesson</label>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Submit lesson</Button>
        </div>
      </form>
    </div>
  );
};

export default Submitlesson;