import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast, Toaster } from "sonner";
import useAuth from "@/hooks/useAuth";
import axios from "@/api/axios";

const TUTOR_REGISTER_URL = "/register";
const CATEGORIES_URL = "/categories";

const TutorRegistrationForm = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [specialization, setSpecialization] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(CATEGORIES_URL, {
          headers: { Authorization: `Bearer ${auth?.accessToken}` },
          withCredentials: true,
        });
        setCategories(response.data);
      } catch (error) {
        toast.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, [auth]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "username":
      case "firstName":
      case "lastName":
        error = value ? "" : `${name} is required`;
        break;
      case "email":
        error = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Invalid email";
        break;
      case "password":
        error =
          value.length >= 8 ? "" : "Password must be at least 8 characters";
        break;
      case "confirmPassword":
        error = value === formData.password ? "" : "Passwords do not match";
        break;
      default:
        break;
    }
    setValidationErrors({ ...validationErrors, [name]: error });
  };

  const handleSpecializationChange = (category) => {
    setSpecialization((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleDocumentsChange = (index, file) => {
    const newDocuments = [...documents];
    newDocuments[index] = file;
    setDocuments(newDocuments);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    Object.keys(formData).forEach((key) => validateField(key, formData[key]));
    if (
      Object.values(validationErrors).some((error) => error) ||
      specialization.length === 0 ||
      documents.length === 0
    ) {
      toast.error("Please correct all errors and fill all required fields");
      return;
    }
    try {
      const response = await axios.post(
        TUTOR_REGISTER_URL,
        JSON.stringify({
          ...formData,
          specialization,
          documents,
          tutorStatus: "pending",
          roles: { Tutor: 1984 },
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(formData);
      console.log(JSON.stringify(response?.data));
      toast.success("Registration successful!");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(
        "Registration failed: " + error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col p-4">
      <h1 className="text-4xl font-bold mb-8 text-orange-600">ChesEd</h1>
      <Card className="w-full max-w-md">
        <Toaster />
        <CardHeader>
          <CardTitle className="text-xl">Tutor Registration</CardTitle>
          <CardDescription>
            Enter your information to register as a tutor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              "username",
              "firstName",
              "lastName",
              "email",
              "password",
              "confirmPassword",
            ].map((field) => (
              <div key={field} className="space-y-2">
                <Label htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                <Input
                  id={field}
                  name={field}
                  type={
                    field.includes("password" || "confirmPassword")
                      ? "password"
                      : "text"
                  }
                  value={formData[field]}
                  onChange={handleInputChange}
                  required
                />
                {validationErrors[field] && (
                  <p className="text-red-500 text-sm">
                    {validationErrors[field]}
                  </p>
                )}
              </div>
            ))}

            <div className="space-y-2">
              <Label>Specialization</Label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={category._id}
                      checked={specialization.includes(category.name)}
                      onCheckedChange={() =>
                        handleSpecializationChange(category.name)
                      }
                    />
                    <label
                      htmlFor={category._id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
              {specialization.length === 0 && (
                <p className="text-red-500 text-sm">
                  Please select at least one specialization
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Documents</Label>
              <div className="space-y-2">
                {documents.map((doc, index) => (
                  <Input
                    key={index}
                    type="file"
                    onChange={(e) =>
                      handleDocumentsChange(index, e.target.files[0])
                    }
                  />
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDocuments([...documents, null])}
                >
                  Add Document
                </Button>
              </div>
              {documents.length === 0 && (
                <p className="text-red-500 text-sm">
                  Please upload at least one document
                </p>
              )}
            </div>

            <Button type="submit" className="w-full">
              Register as Tutor
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorRegistrationForm;
