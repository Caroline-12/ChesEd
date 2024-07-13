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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";

export function CreateCourse({ toggleModal }) {
  const [courseDetails, setCourseDetails] = useState({
    courseID: "",
    title: "",
    category: "",
    description: "",
    content: "",
    tutorId: 0,
    adminId: 0,
    price: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let parsedValue = value;
    if (name === "tutorId" || name === "adminId" || name === "price") {
      parsedValue = parseInt(value);
    }
    setCourseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/courses", courseDetails)
      .then((response) => {
        console.log(response.data);
        setCourseDetails({
          courseID: "",
          title: "",
          category: "",
          description: "",
          content: "",
          tutorId: 0,
          adminId: 0,
          price: 0,
        });
        toggleModal();
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });

    console.log(courseDetails);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="courseID">Course ID</Label>
              <Input
                id="courseID"
                name="courseID"
                placeholder="Enter course ID"
                value={courseDetails.courseID}
                onChange={handleInputChange}
              />
            </div>
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
              <Label htmlFor="tutorId">Tutor ID</Label>
              <Input
                id="tutorId"
                name="tutorId"
                type="number"
                placeholder="Enter tutor ID"
                value={courseDetails.tutorId}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="adminId">Admin ID</Label>
              <Input
                id="adminId"
                name="adminId"
                type="number"
                placeholder="Enter admin ID"
                value={courseDetails.adminId}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                placeholder="Enter price"
                value={courseDetails.price}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={toggleModal}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
