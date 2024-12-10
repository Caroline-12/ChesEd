import { useEffect, useState } from "react";
import axios from "@/api/axios";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { Badge } from "../ui/badge";
import Spinner from "../Spinner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useCalendlyEventListener } from "react-calendly";
import { toast, Toaster } from "sonner";
import { ChatState } from "@/context/ChatProvider";
import { PopupButton } from "react-calendly";
import AgreementSection from "./AgreementSection";

const LessonDetails = () => {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const { setSelectedChat, chats, setChats } = ChatState();

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
      toast.success("Written lesson submitted successfully!", response.data);
    } catch (error) {
      console.error("Error submitting written lesson:", error);
      toast.error("Failed to submit written lesson");
    }
  };

  useCalendlyEventListener({
    onEventScheduled: (event) => {
      console.log("Event scheduled", event);
      createCalendarEvent();
    },
  });

  const createCalendarEvent = async () => {
    try {
      toast.success("Virtual lesson scheduled successfully!");
    } catch (error) {
      console.error("Error scheduling virtual lesson:", error);
      toast.error("Failed to schedule virtual lesson");
    }
  };

  const handlePayment = async () => {
    console.log("Initiate payment for lesson ID:", lessonId);
    try {
      const response = await axios.post(`/payments/create-checkout-session`, {
        lessonId,
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      const err = error.response.data.error.message;
      toast.error(err);
    }
  };

  if (loading) return <Spinner />;
  if (!lesson) return <p>No lesson found</p>;

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };
      const { data } = await axios.post(
        `/chat`,
        { chatWith: userId, myUserId: auth.ID },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      navigate(auth.roles.includes(1984) ? "/tutor-dashboard/chat/" : "/tutor-dashboard/chats");
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  console.log(lesson);

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
        {/* Lesson Overview */}
        <section className="p-6 bg-gray-100 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-blue-600 border-b border-gray-300 pb-2 mb-4">
            Lesson Overview
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
            <strong>Lesson Status:</strong>
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
                onClick={handlePayment}
                className="bg-blue-600 text-white"
              >
                Pay Now
              </Button>
            </div>
          )}
        </section>

        {(auth.roles.includes(1984) || auth.roles.includes(2001)) &&
          lesson.status !== "completed" && (
            <AgreementSection
              lesson={lesson}
              auth={auth}
              onAgreementComplete={(updatedLesson) => {
                setLesson(updatedLesson);
                // If agreement is accepted, you might want to trigger a refresh
                if (updatedLesson.agreement?.status === "accepted") {
                  toast.success(
                    "Agreement completed! You can now proceed with the lesson."
                  );
                }
              }}
            />
          )}

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

        {/* Section to trigger chat modal */}
        <section className="p-6 bg-gray-100 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold text-blue-600 border-b border-gray-300 pb-2 mb-4">
            Chat with Participant
          </h3>
          {["in_progress", "completed"].includes(lesson.status)? (
          <Button
            onClick={() => {
              const participantId = auth.roles.includes(1984)
                ? lesson.student._id
                : lesson.tutor._id;
                console.log(participantId);
              accessChat(participantId);
              navigate("/tutor-dashboard/chats")
            }}
          >
            Start Chat
          </Button>
          ):
          <p>You can start a chat after your lesson has been claimed</p>
          }
        </section>
        {/* {
          <ChatModal
            roomId={`lesson_${lessonId}`}
            userType={
              auth.roles.includes(1984)
                ? "tutor"
                : auth.roles.includes(2001)
                ? "student"
                : "admin"
            }
            senderId={auth.ID}
            recipientId={
              auth.roles.includes(1984) ? lesson.student._id : lesson.tutor._id
            }
            showChat={showChat}
            onClose={() => setShowChat(false)}
          />
        } */}

        {/* File Upload - Only for Tutor */}
        {auth.roles.includes(1984) && (
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
        )}

        {/* New section for offline lesson status and document access */}
        {auth.roles.includes(2001) &&
          lesson.modeOfDelivery === "offline" &&
          (lesson.status === "in_progress" ||
            lesson.status === "completed") && (
            <section className="md:col-span-2 p-6 bg-gray-100 rounded-lg shadow-sm mt-8">
              <h3 className="text-xl font-semibold text-blue-600 border-b border-gray-300 pb-2 mb-4">
                Offline Lesson Status
              </h3>
              <p>
                <strong>Status:</strong> {lesson.status}
              </p>
              {lesson.submittedDocuments &&
              lesson.submittedDocuments.length > 0 ? (
                <div>
                  <h4 className="font-semibold mt-4 mb-2">
                    Submitted Documents:
                  </h4>
                  <ul>
                    {lesson.submittedDocuments.map((doc, index) => (
                      <li key={index} className="mb-2">
                        <span>{doc.name}</span>
                        <Button
                          // onClick={() => handleDownloadDocument(doc.id)}
                          className="ml-4 bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Download
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-4">No documents have been submitted yet.</p>
              )}
            </section>
          )}

        {/* Calendar Integration - Only for Tutor */}
        {lesson.modeOfDelivery == "online" && auth.roles.includes(2001) && (
          <section className="md:col-span-2 p-6 bg-gray-100 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-blue-600 border-b border-gray-300 pb-2 mb-4">
              Schedule a Virtual Lesson
            </h3>
            <PopupButton
              url="https://calendly.com/fidelotieno11"
              className="bg-blue-600 text-white py-2 px-4 rounded"
              rootElement={document.getElementById("root")}
              text="Click here to schedule!"
            />
            {/* {auth.calenlyProfile ? (
              <Button variant="destructive" className="mt-2">
                Edit Calendly link
              </Button>
            ) : (
              <Button variant="outline" className="mt-2"></Button>
            )} */}
          </section>
        )}
      </div>
    </div>
  );
};

export default LessonDetails;
