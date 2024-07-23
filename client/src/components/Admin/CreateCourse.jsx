import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast, Toaster } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "@/api/axios";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const COURSES_URL = "/courses";

export function CreateCourse() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState({
    title: "",
    description: "",
    content: "",
    tutor: "",
    admin: "669c5d3980267bb6fb7d9c56",
    category: "",
    duration: 0,
    level: "",
    price: 0,
    thumbnail: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;
    if (name === "duration" || name === "price") {
      parsedValue = parseInt(value);
    }
    setCourseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      `Creating course with details: ${JSON.stringify(courseDetails)}`
    );
    console.log(
      `Creating course with details: ${JSON.stringify(courseDetails)}`
    );
    try {
      const response = await axios.post(
        COURSES_URL,
        JSON.stringify({ ...courseDetails }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.accessToken}`,
          },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      setCourseDetails({
        title: "",
        description: "",
        content: "",
        tutor: "",
        category: "",
        duration: 0,
        level: "",
        price: 0,
        thumbnail: "",
      });
      toast.success("Course created successfully!");
    } catch (error) {
      toast.error("Registration failed: " + error.response.data.message);
    }
  };

  const goback = () => navigate(-1);

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full md:w-1/2">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Toaster />
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter title"
                  value={courseDetails.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Enter description"
                  value={courseDetails.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="content">Content</Label>
                <Input
                  id="content"
                  name="content"
                  placeholder="Enter content URL"
                  value={courseDetails.content}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                <Input
                  id="thumbnail"
                  name="thumbnail"
                  placeholder="Enter thumbnail URL"
                  value={courseDetails.thumbnail}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  name="category"
                  placeholder="Enter category"
                  value={courseDetails.category}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="tutor">Assign Tutor</Label>
                <Input
                  id="tutor"
                  name="tutor"
                  placeholder="Enter tutor ID"
                  value={courseDetails.tutor}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="level">Level</Label>
                <Input
                  id="level"
                  name="level"
                  placeholder="Enter course level"
                  value={courseDetails.level}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  placeholder="Enter Duration"
                  value={courseDetails.duration}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Enter price"
                  value={courseDetails.price}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={goback}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
