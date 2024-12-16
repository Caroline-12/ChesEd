import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, FileText, Upload, Link } from "lucide-react";
import { toast, Toaster } from "sonner";
import useAuth from "@/hooks/useAuth";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";

const lessons_URL = "/lessons/pendinglessons";

const Lessons = ({ lessons }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  // const [lessons, setlessons] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedlesson, setSelectedlesson] = useState(null);
  const [scheduleDate, setScheduleDate] = useState("");
  // start time and date time state varibles
  const [start, setStart] = useState(new Date());
  // const [end, setEnd] = useState(new Date());

  // useEffect(() => {
  //   const fetchlessons = async () => {
  //     try {
  //       const response = await axios.get(lessons_URL, {
  //         headers: { Authorization: `Bearer ${auth.accessToken}` },
  //       });
  //       setlessons(response.data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError("Failed to fetch lessons");
  //       setLoading(false);
  //       console.error("Error fetching lessons:", err);
  //       toast.error("Failed to fetch lessons");
  //     }
  //   };

  //   fetchlessons();
  // }, [auth.accessToken]);

  const filteredlessons = lessons.filter((lesson) =>
    selectedCategory === "All" ? lesson.status === "pending" : lesson.category === selectedCategory && lesson.status === "pending"
  );

  const handleAccept = async (lesson) => {
    try {
      await axios.put(
        "http://localhost:3500/lessons/assign",
        {
          lessonId: lesson._id,
          tutorId: auth.ID,
          assignee: lesson.student._id,
        },
        {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        }
      );
      console.log(`lesson ${lesson._id} accepted successfully`);
      toast.success("lesson accepted successfully!");
      navigate("/tutor-dashboard/mylessons");
    } catch (error) {
      console.error("Error accepting lesson:", error);
      toast.error("Failed to accept lesson");
    }
  };

  const handleStartChat = (studentId) => {
    // Implement logic to start a chat with the student
    console.log(`Starting chat with student: ${studentId}`);
    toast.info("Chat functionality not implemented yet");
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.value);
  };

  const handleSubmitWrittenLesson = async (e, lesson) => {
    e.preventDefault();

    if (!selectedFile || !lesson) {
      toast.error("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("lessonId", lesson._id);

    console.log(lesson);
    console.log(formData.lessonId);
    console.log(formData.file);
    console.log(selectedFile);
    try {
      console.log("Submitting written lesson...");
      const response = await axios.post(`/lessons/submit-lesson`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth?.accessToken}`,
        },
        withCredentials: true,
      });
      console.log(response);
      toast("Written lesson submitted successfully:", response.data);
      // console.log(JSON.stringify(response?.data));

      toast.success("Written lesson submitted successfully!");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error submitting written lesson:", error);
      toast.error("Failed to submit written lesson");
    }
  };

  const handleTimeChange = (e) => {
    const [hours, minutes] = e.target.value.split(":");
    const updatedDate = new Date(start);
    updatedDate.setHours(hours, minutes);
    setStart(updatedDate);
  };

  if (error) return <div>{error}</div>;

  console.log(lessons);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Opportunities</h1>
      <Toaster />
      <div className="mb-4">
        <Select onValueChange={(value) => setSelectedCategory(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            {auth.specialization.map((spec) => (
              <SelectItem key={spec} value={spec}>
                {spec}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredlessons.map((lesson) => (
            <TableRow key={lesson._id}>
              <TableCell>{lesson.title}</TableCell>
              <TableCell>{lesson.category}</TableCell>
              <TableCell>{lesson.student.username}</TableCell>
              <TableCell>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(lesson.proposedBudget)}

                {/* <Badge
                  variant={
                    lesson.status === "pending"
                      ? "destructive"
                      : lesson.status === "in-progress"
                      ? "default"
                      : "success"
                  }
                >
                  {lesson.status}
                </Badge> */}
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View Details</Button>
                  </DialogTrigger>
                  <DialogContent className="">
                    <DialogHeader>
                      <DialogTitle>{lesson.title}</DialogTitle>
                      <DialogDescription>
                        lesson details and actions
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Category</Label>
                        <span className="col-span-3">{lesson.category}</span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Description</Label>
                        <span className="col-span-3">{lesson.description}</span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Budget</Label>
                        <span className="col-span-3">
                          ${lesson.proposedBudget}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Due Date</Label>
                        <span className="col-span-3">
                          {new Date(lesson.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Status</Label>
                        <span className="col-span-3">{lesson.status}</span>
                      </div>
                      {lesson.writtenLesson && (
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Written Lesson</Label>
                          <a
                            href={lesson.writtenLesson}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="col-span-3 flex items-center"
                          >
                            <Link className="mr-2" />
                            View Lesson
                          </a>
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <div className="flex space-x-2">
                        {lesson.status === "pending" && (
                          <Button onClick={() => handleAccept(lesson)}>
                            Accept lesson
                          </Button>
                        )}
                        <Button
                          onClick={() => handleStartChat(lesson.student._id)}
                          variant="outline"
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Chat with Student
                        </Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Lessons;
