import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import Modal from "@/components/Modal"; // Use your custom modal

const PENDING_TUTORS_URL = "http://localhost:3500/tutors/pending";
const APPROVE_TUTOR_URL = "http://localhost:3500/tutors/approve";

const ApproveTrainersSection = () => {
  const { auth } = useAuth();
  const [pendingTutors, setPendingTutors] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null); // To store the selected tutor for detailed view
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPendingTutors = async () => {
      setIsLoading(true);
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        };
        if (auth?.accessToken) {
          config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }

        const response = await axios.get(PENDING_TUTORS_URL, config);
        setPendingTutors(response.data);
      } catch (error) {
        console.error("Error fetching pending tutors:", error);
        toast.error("Failed to fetch pending tutors");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingTutors();
  }, []);

  console.log(pendingTutors);

  const openReviewModal = (tutor) => {
    setSelectedTutor(tutor);
    setIsModalOpen(true);
  };

  const closeReviewModal = () => {
    setSelectedTutor(null);
    setIsModalOpen(false);
  };

  const approveTutor = async (tutorId) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      if (auth?.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
      }

      await axios.put(APPROVE_TUTOR_URL, { tutorId }, config);
      toast.success("Tutor approved successfully");
      setPendingTutors(pendingTutors.filter((tutor) => tutor._id !== tutorId));
      closeReviewModal();

      // Create mailto link
      const subject = encodeURIComponent(
        "Congratulations! You have been approved as a tutor"
      );
      const body = encodeURIComponent(`
           <div style="font-family: Arial, sans-serif; color: #333;">
             <h1 style="color: #4CAF50;">Congratulations!</h1>
             <p>Dear Tutor,</p>
             <p>We are pleased to inform you that you have been approved as a tutor on our platform.</p>
             <p>We look forward to your valuable contributions.</p>
             <p>Best regards,</p>
             <p>The ChesEd Team</p>
           </div>
         `);
      const mailtoLink = `mailto:${"1040533@cuea.edu"}?subject=${subject}&body=${body}`;

      // Open mailto link
      window.location.href = mailtoLink;
    } catch (error) {
      console.error("Error approving tutor:", error);
      toast.error("Failed to approve tutor");
    }
  };

  const rejectTutor = async (tutorId) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      if (auth?.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
      }
      // Implement tutor rejection logic here
      toast.success("Tutor rejected successfully");
      setPendingTutors(pendingTutors.filter((tutor) => tutor._id !== tutorId));
      closeReviewModal();
    } catch (error) {
      console.error("Error rejecting tutor:", error);
      toast.error("Failed to reject tutor");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Approve Tutors</CardTitle>
        <CardDescription>
          Review and approve or reject pending tutor registrations.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Spinner />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>Review</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingTutors.map((tutor) => (
                <TableRow key={tutor._id}>
                  <TableCell>{`${tutor.firstName} ${tutor.lastName}`}</TableCell>
                  <TableCell>{tutor.email}</TableCell>
                  <TableCell>{tutor.specialization.join(", ")}</TableCell>
                  <TableCell>
                    <Button onClick={() => openReviewModal(tutor)}>
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {isModalOpen && selectedTutor && (
        <Modal isOpen={isModalOpen} onClose={closeReviewModal}>
          <h2 className="text-xl font-bold mb-4">Review Tutor</h2>
          <p>
            <strong>Name:</strong>{" "}
            {`${selectedTutor.firstName} ${selectedTutor.lastName}`}
          </p>
          <p>
            <strong>Email:</strong> {selectedTutor.email}
          </p>
          <p>
            <strong>Specialization:</strong>{" "}
            {selectedTutor.specialization.join(", ")}
          </p>
          {/* <p>
            <strong>Teaching Experience:</strong>{" "}
            {selectedTutor.teachingExperience}
          </p> */}

          {/* Render Profile Photo */}
          <div className="my-4">
            <h3 className="font-semibold">Profile Photo:</h3>
            <img
              src={`http://localhost:3500/${selectedTutor.profilePhoto}`}
              alt="Profile"
              className="w-32 h-32 object-cover rounded"
            />
          </div>

          {/* Render Government ID */}
          <div className="my-4">
            <h3 className="font-semibold">Government ID:</h3>
            <a
              href={`http://localhost:3500/${selectedTutor.governmentId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Government ID
            </a>
          </div>

          {/* Render Other Documents */}
          <div className="my-4">
            <h3 className="font-semibold">Submitted Documents:</h3>
            <ul>
              {selectedTutor.documents.map((doc, index) => (
                <li key={index}>
                  <a
                    href={`http://localhost:3500/${doc}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {doc.split("/").pop()}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => rejectTutor(selectedTutor._id)}
            >
              Reject
            </Button>
            <Button onClick={() => approveTutor(selectedTutor._id)}>
              Approve
            </Button>
          </div>
        </Modal>
      )}
    </Card>
  );
};

export default ApproveTrainersSection;
