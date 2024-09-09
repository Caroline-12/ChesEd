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
import { PaystackButton } from "react-paystack";

const LessonDetails = () => {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [start, setStart] = useState(new Date());
  const session = useSession();
  const supabase = useSupabaseClient();

  useEffect(() => {
    const fetchLessonDetails = async () => {
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        };
        if (auth?.accessToken) {
          config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
        const response = await axios.get(`/lessons/${lessonId}`, config);
        setLesson(response.data);
      } catch (error) {
        console.error("Error fetching lesson details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessonDetails();
  }, [lessonId, auth?.accessToken]);

  console.log(lesson);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmitWrittenLesson = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await axios.post(
        `/lessons/submit-lesson/${lessonId}`,
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
    if (!start || !lesson) {
      toast.error(
        "Please ensure you've selected a start date and time for the event"
      );
      return;
    }

    const event = {
      summary: `Chesed Lesson: ${lesson.title}`,
      location: "Google Meet (link will be provided)",
      description: lesson.description,
      start: {
        dateTime: start.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: new Date(start.getTime() + 30 * 60000).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      attendees: [{ email: lesson.student.email }],
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

      await axios.post(
        "/lessons/submit-lesson",
        {
          lessonId: lesson._id,
          meetingUrl: data.hangoutLink,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        }
      );

      setLesson((prevLesson) => ({
        ...prevLesson,
        status: "completed",
        lesson: [...prevLesson.lesson, data.hangoutLink],
      }));

      toast.success("Virtual lesson scheduled successfully!");
    } catch (error) {
      console.error("Error scheduling virtual lesson:", error);
      toast.error("Failed to schedule virtual lesson");
    }
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
        toast.info("Disconnected from Google Calendar");
      }
    } catch (error) {
      console.error("Error signing out with Google:", error);
      toast.error("Failed to sign out with Google");
    }
  };

  if (loading) return <Spinner />;
  if (!lesson) return <p>No lesson found</p>;

  const config = {
    reference: new Date().getTime().toString(),
    email: lesson.student?.email,
    // change this to the agreed amount
    amount: lesson.proposedBudget * 100,
    currency: "KES", // Change the currency to USD
    publicKey: "pk_test_890d8a5a9d26cb4123a86f1b4679655493fbb60b",
  };

  const handlePaystackSuccessAction = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    toast.success("Payment successful");
    navigate(`/lesson/${lessonId}`);
  };

  // you can call this function anything
  const handlePaystackCloseAction = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    toast.info("closed");
  };

  const componentProps = {
    ...config,
    text: "Pay now",
    onSuccess: (reference) => handlePaystackSuccessAction(reference),
    onClose: handlePaystackCloseAction,
  };
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md font-sans">
      <Toaster />
      <Button onClick={handleGoBack} className="mb-4">
        Go Back
      </Button>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        {lesson.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* lesson Overview */}
        <section className="p-6 bg-gray-100 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-blue-600 border-b border-gray-300 pb-2 mb-4">
            lesson Overview
          </h3>
          <p>
            <strong>Description:</strong> {lesson.description}
          </p>
          <p>
            <strong>Category:</strong> {lesson.category}
          </p>
          <p>
            <strong>Proposed Budget:</strong> ${lesson.proposedBudget}
          </p>
          <p>
            <strong>Agreed Price:</strong> ${lesson.agreedPrice}
          </p>
          <p>
            <strong>Due Date:</strong>{" "}
            {new Date(lesson.dueDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Mode of Delivery:</strong> {lesson.modeOfDelivery}
          </p>
        </section>

        {/* Status and Payment Information */}
        <section className="p-6 bg-gray-100 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-blue-600 border-b border-gray-300 pb-2 mb-4">
            Status & Payment Information
          </h3>
          <p>
            <strong>lesson Status:</strong>
            <Badge
              variant={
                lesson.status === "pending"
                  ? "destructive"
                  : lesson.status === "in_progress"
                  ? "default"
                  : "success"
              }
            >
              {lesson.status}
            </Badge>
          </p>
          <p>
            <strong>Payment Status:</strong>{" "}
            {lesson.paymentStatus ? "Paid" : "Unpaid"}
          </p>

          {lesson.status === "in_progress" && !lesson.paymentStatus && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Make Payment
              </h4>
              <Button
                onClick={() => {
                  navigate(`/payment/${lessonId}`);
                }}
                className="bg-blue-600 text-white"
              >
                Pay Now
              </Button>
            </div>
          )}
        </section>

        <section className="mb-8 p-6 bg-gray-100 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-blue-600 border-b border-gray-300 pb-2 mb-4">
            Participant Information
          </h3>
          <div className="flex justify-between">
            <div className="w-full md:w-1/2 mb-4 md:mb-0">
              <h4 className="font-semibold text-lg mb-2">Student</h4>
              <p>
                <strong>Username:</strong> {lesson.student?.username}
              </p>
              <p>
                <strong>Email:</strong> {lesson.student?.email}
              </p>
            </div>
            {["in_progress", "completed"].includes(lesson.status) && (
              <div className="w-full md:w-1/2">
                <h4 className="font-semibold text-lg mb-2">Tutor</h4>
                <p>
                  <strong>Username:</strong> {lesson.tutor?.username || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {lesson.tutor?.email || "N/A"}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* File Upload */}
        <section className="md:col-span-2 p-6 bg-gray-100 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-blue-600 border-b border-gray-300 pb-2 mb-4">
            Upload Written Lesson
          </h3>
          <form onSubmit={handleSubmitWrittenLesson}>
            <Label
              htmlFor="file-upload"
              className="block text-sm font-medium text-gray-700"
            >
              Upload File
            </Label>
            <Input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              className="mb-4"
            />
            <Button type="submit">Submit Lesson</Button>
          </form>
        </section>

        {/* Calendar Integration */}
        <section className="md:col-span-2 p-6 bg-gray-100 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-blue-600 border-b border-gray-300 pb-2 mb-4">
            Schedule a Virtual Lesson
          </h3>
          <Tabs defaultValue="calendar" className="mb-4">
            <TabsList>
              <TabsTrigger value="calendar">Pick a Date</TabsTrigger>
              <TabsTrigger value="time">Pick a Time</TabsTrigger>
            </TabsList>
            <TabsContent value="calendar">
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
                    {start ? format(start, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={start}
                    onSelect={setStart}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </TabsContent>
            <TabsContent value="time">
              <Input
                type="time"
                value={format(start, "HH:mm")}
                onChange={handleTimeChange}
              />
            </TabsContent>
          </Tabs>
          <Button onClick={createCalendarEvent}>Create Calendar Event</Button>

          {session?.provider_token ? (
            <Button
              onClick={googleSignOut}
              variant="destructive"
              className="mt-2"
            >
              Disconnect Google Calendar
            </Button>
          ) : (
            <Button onClick={googleSignIn} variant="outline" className="mt-2">
              Connect Google Calendar
            </Button>
          )}
        </section>
      </div>
    </div>
  );
};

export default LessonDetails;
