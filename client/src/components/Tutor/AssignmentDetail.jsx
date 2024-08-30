import React, { useEffect, useState } from "react";
import axios from "@/api/axios";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { Badge } from "../ui/badge";
import Spinner from "../Spinner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast, Toaster } from "sonner";

const AssignmentDetails = () => {
  const { assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [start, setStart] = useState(new Date());
  const session = useSession();
  const supabase = useSupabaseClient();

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        };
        if (auth?.accessToken) {
          config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
        const response = await axios.get(
          `/assignments/${assignmentId}`,
          config
        );
        setAssignment(response.data);
      } catch (error) {
        console.error("Error fetching assignment details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignmentDetails();
  }, [assignmentId, auth?.accessToken]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmitWrittenLesson = async (e) => {
    e.preventDefault();
    // console.log(selectedFile);
    console.log(assignmentId);
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios.post(
        `/assignments/submit-lesson/${assignmentId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth?.accessToken}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Written lesson submitted successfully!");
      console.log(response.data);
      // setAssignment(response.data);
      // setSelectedFile(null);
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

  const createCalendarEvent = async () => {
    if (!start || !assignment) {
      toast.error(
        "Please ensure you've selected a start date and time for the event"
      );
      return;
    }

    const event = {
      summary: `Chesed Lesson: ${assignment.title}`,
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

    try {
      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.provider_token}`,
          },
          body: JSON.stringify(event),
        }
      );

      const data = await response.json();
      console.log(data);

      // Update assignment with meeting URL
      await axios.post(
        "/assignments/submit-lesson",
        {
          assignmentId: assignment._id,
          meetingUrl: data.hangoutLink,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );

      setAssignment((prevAssignment) => ({
        ...prevAssignment,
        status: "completed",
        lesson: [...prevAssignment.lesson, data.hangoutLink],
      }));

      toast.success("Virtual lesson scheduled successfully!");
    } catch (error) {
      console.error("Error scheduling virtual lesson:", error);
      toast.error("Failed to schedule virtual lesson");
    }
    // googleSignOut();
  };

  const googleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          scopes: "https://www.googleapis.com/auth/calendar.events",
        },
      });
      if (error) {
        console.error("Error signing in with Google:", error);
        toast.error("Failed to sign in with Google");
      } else {
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

  if (loading) return <Spinner />;
  if (!assignment) return <p>No assignment found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md font-sans">
      <Toaster />
      <Button onClick={handleGoBack} className="mb-4">
        Go Back
      </Button>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        {assignment.title}
      </h2>

      {/* Assignment Overview */}
      <section className="mb-8 p-6 bg-gray-100 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-blue-600 border-b border-gray-300 pb-2 mb-4">
          Assignment Overview
        </h3>
        <p>
          <strong>Description:</strong> {assignment.description}
        </p>
        <p>
          <strong>Category:</strong> {assignment.category}
        </p>
        <p>
          <strong>Proposed Budget:</strong> ${assignment.proposedBudget}
        </p>
        <p>
          <strong>Agreed Price:</strong> ${assignment.agreedPrice}
        </p>
        <p>
          <strong>Due Date:</strong>{" "}
          {new Date(assignment.dueDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Mode of Delivery:</strong> {assignment.modeOfDelivery}
        </p>
      </section>

      {/* Status Information */}
      <section className="mb-8 p-6 bg-gray-100 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-blue-600 border-b border-gray-300 pb-2 mb-4">
          Status Information
        </h3>
        <p>
          <strong>Assignment Status:</strong>
          <Badge
            variant={
              assignment.status === "pending"
                ? "destructive"
                : assignment.status === "in_progress"
                ? "default"
                : "success"
            }
          >
            {assignment.status}
          </Badge>
        </p>
        <p>
          <strong>Payment Status:</strong>{" "}
          {assignment.paymentStatus ? "Paid" : "Unpaid"}
        </p>
      </section>

      {/* Student and Tutor Information */}
      <section className="mb-8 p-6 bg-gray-100 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-blue-600 border-b border-gray-300 pb-2 mb-4">
          Participant Information
        </h3>
        <div className="flex justify-between">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <h4 className="font-semibold text-lg mb-2">Student</h4>
            <p>
              <strong>Username:</strong> {assignment.student?.username}
            </p>
            <p>
              <strong>Email:</strong> {assignment.student?.email}
            </p>
          </div>
          {["in_progress", "completed"].includes(assignment.status) && (
            <div className="w-full md:w-1/2">
              <h4 className="font-semibold text-lg mb-2">Tutor</h4>
              <p>
                <strong>Username:</strong> {assignment.tutor?.username || "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {assignment.tutor?.email || "N/A"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Submission Details */}
      <section className="mb-8 p-6 bg-gray-100 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-blue-600 border-b border-gray-300 pb-2 mb-4">
          Submission Details
        </h3>
        <div className="mb-6">
          <h4 className="font-semibold text-lg mb-2">Student Submission</h4>
          {assignment.documents?.length > 0 ? (
            assignment.documents.map((doc, index) => (
              <div key={index} className="mb-2">
                <a
                  href={`http://localhost:3500/${doc}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Document {index + 1}
                </a>
              </div>
            ))
          ) : (
            <p>No documents submitted by student.</p>
          )}
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-2">Tutor Submission</h4>
          {assignment.lesson?.length > 0 ? (
            assignment.lesson.map((lesson, index) => (
              <div key={index} className="mb-2">
                {lesson.includes("http") ? (
                  <a
                    href={lesson}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Meeting Link {index + 1}
                  </a>
                ) : (
                  <a
                    href={`http://localhost:3500/${lesson}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Document {index + 1}
                  </a>
                )}
              </div>
            ))
          ) : (
            <p>No documents submitted by tutor.</p>
          )}
        </div>
      </section>

      {/* Tutor Actions */}
      {auth.roles?.includes(1984) && assignment.status !== "completed" && (
        <section className="p-6 bg-gray-100 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-blue-600 border-b border-gray-300 pb-2 mb-4">
            Tutor Actions
          </h3>
          <Tabs
            defaultValue={
              assignment.modeOfDelivery === "offline" ? "lesson" : "schedule"
            }
          >
            <TabsList className="grid w-full grid-cols-2">
              {assignment.modeOfDelivery === "offline" && (
                <TabsTrigger value="lesson">Submit Lesson</TabsTrigger>
              )}
              {assignment.modeOfDelivery === "online" && (
                <TabsTrigger value="schedule">Schedule Call</TabsTrigger>
              )}
            </TabsList>
            {assignment.modeOfDelivery === "offline" && (
              <TabsContent value="lesson">
                <form
                  onSubmit={handleSubmitWrittenLesson}
                  className="space-y-6"
                  encType="multipart/form-data"
                  method="POST"
                >
                  <div className="grid gap-4 py-4">
                    <Label htmlFor="lesson-file">Lesson File</Label>
                    <Input
                      id="lesson-file"
                      type="file"
                      name="file"
                      onChange={handleFileChange}
                    />
                  </div>
                  <Button type="submit">Submit Lesson</Button>
                </form>
              </TabsContent>
            )}
            {assignment.modeOfDelivery === "online" && (
              <TabsContent value="schedule">
                {session ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Schedule a call with the student
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <Label htmlFor="date-time">Start of your event</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
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
                        onChange={handleTimeChange}
                      />
                      <Button onClick={createCalendarEvent}>
                        Schedule Call
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Label>Connect to Google Calendar to create an event</Label>
                    <Button onClick={googleSignIn} className="w-full">
                      Connect to Google
                    </Button>
                  </div>
                )}
              </TabsContent>
            )}
          </Tabs>
        </section>
      )}
    </div>
  );
};

export default AssignmentDetails;
