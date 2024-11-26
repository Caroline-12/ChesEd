import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { toast } from "sonner";

const TutorAssignmentForm = ({ assignmentId }) => {
  const { auth } = useAuth();
  const [tutors, setTutors] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      const response = await axios.get("/tutors", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      setTutors(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching tutors:", err);
      setError("Failed to load tutors. Please try again later.");
      setLoading(false);
    }
  };

  const handleAssignTutor = async () => {
    if (!selectedTutor) {
      setError("Please select a tutor");
      return;
    }
    try {
      await axios.put(
        "/lessons/assign",
        { assignmentId, tutorId: selectedTutor, assignee: auth.ID },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );
      toast.success("Tutor assigned successfully");
      navigate("/admin-dashboard");
    } catch (err) {
      console.error("Error assigning tutor:", err);
      setError("Failed to assign tutor. Please try again later.");
    }
  };

  console.log(selectedTutor);
  console.log(auth.ID);
  console.log(assignmentId);
  if (loading) return <div className="text-center mt-8">Loading tutors...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assign Tutor</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Select
            onValueChange={(value) => setSelectedTutor(value)}
            value={selectedTutor}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select tutor" />
            </SelectTrigger>
            <SelectContent>
              {tutors.map((tutor) => (
                <SelectItem key={tutor._id} value={tutor._id}>
                  {tutor.username}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="mt-4 text-orange-800 border-orange-800 hover:bg-orange-200"
            onClick={handleAssignTutor}
          >
            Assign
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TutorAssignmentForm;
