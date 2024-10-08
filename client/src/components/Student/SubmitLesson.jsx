import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import axios from "@/api/axios";
import useAuth from "../../hooks/useAuth";
import { ArrowLeft, Upload } from "lucide-react";
import emailjs from "@emailjs/browser";
import Spinner from "../Spinner";
const LESSONS_URL = "/lessons";

export default function SubmitLesson() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [lessonDetails, setLessonDetails] = useState({
    title: "",
    description: "",
    proposedBudget: 0,
    dueDate: "",
    category: "",
    studentId: auth?.ID || "",
    file: null,
    modeOfDelivery: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!auth?.accessToken) {
      navigate("/login?redirect=/submit-lesson");
    } else {
      setLessonDetails((prev) => ({ ...prev, studentId: auth.ID }));
    }
  }, [auth]);

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
  }, [auth.accessToken]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setLessonDetails((prev) => ({
      ...prev,
      [name]: files
        ? files[0]
        : name === "proposedBudget"
        ? parseFloat(value)
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    Object.entries(lessonDetails).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("paymentStatus", false);

    try {
      const response = await axios.post(LESSONS_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth?.accessToken}`,
        },
        withCredentials: true,
      });
      console.log(response);
      toast.success("Lesson submitted successfully!");

      // Send an email using EmailJS
      const emailParams = {
        to_name: auth?.name, // Student's name
        to_email: auth?.email, // Student's email
        from_name: "Chesed", // Your platform's name
        message: "Your lesson has been successfully submitted.",
      };

      emailjs
        .send(
          "service_qtdaau5", // Replace with your EmailJS service ID
          "template_0si157p", // Replace with your EmailJS template ID
          emailParams,
          "Hq22flwsxrgCxCVdF" // Replace with your EmailJS user ID
        )
        .then(
          (result) => {
            console.log(result.text);
            toast.success("Email sent successfully!");
          },
          (error) => {
            toast.error("Failed to send email: " + error.text);
          }
        );
      setIsSubmitting(false);
      navigate("/dashboard/lessons");
    } catch (error) {
      toast.error(
        "Submission failed: " + error.response?.data?.message || error.message
      );
    }
  };

  return (
    <>
      {isSubmitting && <Spinner />}
      <Card className="max-w-2xl mx-auto my-10">
        <CardHeader>
          <Button
            variant="ghost"
            className="w-fit p-0 mb-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <CardTitle className="text-3xl font-bold text-center">
            Request a lesson
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            encType="multipart/form-data"
          >
            <div className="space-y-2">
              <Label htmlFor="title">Lesson Title</Label>
              <Input
                id="title"
                name="title"
                value={lessonDetails.title}
                onChange={handleInputChange}
                placeholder="Enter the title of your lesson"
                required
              />
            </div>
            <div className="space-y-2">
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
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                name="category"
                onValueChange={(value) =>
                  setLessonDetails((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
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
            <div className="space-y-2">
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
            <div className="space-y-2">
              <Label htmlFor="file">Upload Document</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="file"
                  name="file"
                  type="file"
                  onChange={handleInputChange}
                  className="flex-grow"
                />
                <Button type="button" size="icon">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Mode of Delivery</Label>
              <RadioGroup
                name="modeOfDelivery"
                onValueChange={(value) =>
                  setLessonDetails((prev) => ({
                    ...prev,
                    modeOfDelivery: value,
                  }))
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="online" id="online" />
                  <Label htmlFor="online">Virtual Lesson</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="offline" id="offline" />
                  <Label htmlFor="offline">Written Lesson</Label>
                </div>
              </RadioGroup>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" onClick={handleSubmit}>
            Submit Lesson
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
