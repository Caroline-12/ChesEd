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
import {
  useSession,
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";

const ASSIGNMENTS_URL = "/assignments/pendingassignments";

const Assignments = () => {
  const session = useSession(); // User but a bunch of things gets stored here like current active tokens
  const supabase = useSupabaseClient(); // talk to supabase
  const { isLoading } = useSessionContext(); // loading state

  const navigate = useNavigate();
  const { auth } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [scheduleDate, setScheduleDate] = useState("");
  // start time and date time state varibles
  const [start, setStart] = useState(new Date());
  // const [end, setEnd] = useState(new Date());

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(ASSIGNMENTS_URL, {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        });
        setAssignments(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch assignments");
        setLoading(false);
        console.error("Error fetching assignments:", err);
        toast.error("Failed to fetch assignments");
      }
    };

    fetchAssignments();
  }, [auth.accessToken]);

  if (isLoading) return <></>;

  const googleSignIn = async () => {
    try {
      const { user, session, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          scopes:
            "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events",
        },
      });
      if (error) {
        console.error(
          "Error signing in with Google provider with supabase:",
          error
        );
        toast.error("Failed to sign in with Google");
      } else {
        console.log("Google sign in successful:", user, session);
        toast.success("Successfully connected to Google Calendar!");
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
      toast.error("Failed to sign in with Google");
    }
  };

  const googleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out with Google provider:", error);
        toast.error("Failed to sign out with Google");
      } else {
        console.log("Google sign out successful");
        toast.info("Disconnected from Google Calendar");
      }
    } catch (error) {
      console.error("Error signing out with Google:", error);
      toast.error("Failed to sign out with Google");
    }
  };

  const filteredAssignments = assignments.filter((assignment) =>
    selectedCategory === "All" ? true : assignment.category === selectedCategory
  );

  const handleAccept = async (assignment) => {
    try {
      await axios.put(
        "http://localhost:3500/assignments/assign",
        {
          assignmentId: assignment._id,
          tutorId: auth.ID,
          assignee: assignment.student._id,
        },
        {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        }
      );
      console.log(`Assignment ${assignment._id} accepted successfully`);
      toast.success("Assignment accepted successfully!");
      navigate("/tutor/mylessons");
    } catch (error) {
      console.error("Error accepting assignment:", error);
      toast.error("Failed to accept assignment");
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

  const handleSubmitWrittenLesson = async (e, assignment) => {
    e.preventDefault();

    if (!selectedFile || !assignment) {
      toast.error("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("assignmentId", assignment._id);

    console.log(assignment);
    console.log(formData.assignmentId);
    console.log(formData.file);
    console.log(selectedFile);
    try {
      console.log("Submitting written lesson...");
      const response = await axios.post(
        `/assignments/submit-lesson`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth?.accessToken}`,
          },
          withCredentials: true,
        }
      );
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

  const createCalendarEvent = async (assignment) => {
    console.log("Creating calendar event...", start, assignment);
    if (!start || !assignment) {
      toast.error(
        "Please ensure youve selected a start date and an assignment for the event"
      );
      return;
    }

    const event = {
      summary: "Chesed Lesson: " + assignment.title,
      location: "Google Meet (link will be provided)",
      description: assignment.description,
      start: {
        dateTime: start.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: new Date(start.getTime() + 30 * 60000).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      attendees: [{ email: assignment.student.email }],
      conferenceData: {
        createRequest: {
          requestId: "sample123",
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    };

    await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.provider_token}`,
        },
        body: JSON.stringify(event),
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        console.log(res);
        setAssignments(
          assignments.map((a) =>
            a._id === assignment._id
              ? {
                  ...a,
                  status: "completed",
                  lesson: res.lesson,
                }
              : a
          )
        );
        // change the status of the assignment to in progress
        try {
          axios.put(
            "/assignments/assign",
            {
              assignmentId: assignment._id,
              tutorId: auth.ID,
              assignee: assignment.student._id,
            },
            {
              headers: {
                Authorization: `Bearer ${auth.accessToken}`,
              },
            }
          );
          toast.success("Tutor assigned successfully");
          // navigate("/admin");
        } catch (err) {
          console.error("Error assigning tutor:", err);
          setError("Failed to assign tutor. Please try again later.");
        }

        toast.success("Virtual lesson scheduled successfully!");
        setStart(new Date());
      })
      .catch((error) => {
        console.error("Error scheduling virtual lesson:", error);
        googleSignOut();
        toast.error("Failed to schedule virtual lesson");
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  console.log(session);
  console.log(start);
  console.log(assignments);
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
          {filteredAssignments.map((assignment) => (
            <TableRow key={assignment._id}>
              <TableCell>{assignment.title}</TableCell>
              <TableCell>{assignment.category}</TableCell>
              <TableCell>{assignment.student.username}</TableCell>
              <TableCell>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(assignment.proposedBudget)}

                {/* <Badge
                  variant={
                    assignment.status === "pending"
                      ? "destructive"
                      : assignment.status === "in-progress"
                      ? "default"
                      : "success"
                  }
                >
                  {assignment.status}
                </Badge> */}
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">View Details</Button>
                  </DialogTrigger>
                  <DialogContent className="">
                    <DialogHeader>
                      <DialogTitle>{assignment.title}</DialogTitle>
                      <DialogDescription>
                        Assignment details and actions
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Category</Label>
                        <span className="col-span-3">
                          {assignment.category}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Description</Label>
                        <span className="col-span-3">
                          {assignment.description}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Budget</Label>
                        <span className="col-span-3">
                          ${assignment.proposedBudget}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Due Date</Label>
                        <span className="col-span-3">
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Status</Label>
                        <span className="col-span-3">{assignment.status}</span>
                      </div>
                      {assignment.writtenLesson && (
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">Written Lesson</Label>
                          <a
                            href={assignment.writtenLesson}
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
                        {assignment.status === "pending" && (
                          <Button onClick={() => handleAccept(assignment)}>
                            Accept Assignment
                          </Button>
                        )}
                        <Button
                          onClick={() =>
                            handleStartChat(assignment.student._id)
                          }
                          variant="outline"
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Chat with Student
                        </Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="ml-2">
                      Actions
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Assignment Actions</DialogTitle>
                    </DialogHeader>
                    <Tabs defaultValue="lesson">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="lesson">Submit Lesson</TabsTrigger>
                        <TabsTrigger value="schedule">
                          Schedule Call
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="lesson">
                        <form
                          onSubmit={handleSubmitWrittenLesson(assignment)}
                          className="space-y-6"
                          encType="multipart/form-data"
                          method="POST"
                        >
                          {" "}
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="lesson-file"
                                className="text-right"
                              >
                                Lesson File
                              </Label>
                              <Input
                                id="lesson-file"
                                type="file"
                                onChange={handleFileChange}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              type="submit"
                              disabled={assignment.status === "completed"}
                            >
                              Submit Lesson
                            </Button>
                          </DialogFooter>
                        </form>
                      </TabsContent>
                      <TabsContent value="schedule">
                        {session ? (
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold">
                              Hey {session.user.email}, schedule a call with the
                              student
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                              <Label htmlFor="date-time">
                                Start of your event
                              </Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !start && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {start ? (
                                      format(start, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={start}
                                    onSelect={setStart}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <Label htmlFor="time">Time</Label>
                              <Input
                                type="time"
                                id="time"
                                value={format(start, "HH:mm")}
                                onChange={handleTimeChange} // Update this line
                              />
                              <Button
                                onClick={() => createCalendarEvent(assignment)}
                              >
                                Schedule Call
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <Label>
                              Connect to Google Calendar to create an event
                            </Label>
                            <Button
                              onClick={() => googleSignIn()}
                              className="w-full"
                            >
                              Connect to Google
                            </Button>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
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

export default Assignments;
