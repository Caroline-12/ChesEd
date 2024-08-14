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

const PENDING_TUTORS_URL = "http://localhost:3500/tutors/pending";
const APPROVE_TUTOR_URL = "http://localhost:3500/tutors/approve";

const ApproveTrainersSection = () => {
  const { auth } = useAuth();
  const [pendingTutors, setPendingTutors] = useState([]);
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
                <TableCell>Documents</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingTutors.map((tutor) => (
                <TableRow key={tutor._id}>
                  <TableCell>{`${tutor.firstName} ${tutor.lastName} (${tutor.username})`}</TableCell>
                  <TableCell>{tutor.email}</TableCell>
                  <TableCell>{tutor.specialization.join(", ")}</TableCell>
                  {/* <TableCell>
                    <ul>
                      {tutor.documents.map((document, index) => (
                        <li key={index}>{document}</li>
                      ))}
                    </ul>
                  </TableCell> */}
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => rejectTutor(tutor._id)}
                      >
                        Reject
                      </Button>
                      <Button onClick={() => approveTutor(tutor._id)}>
                        Approve
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default ApproveTrainersSection;
