import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const AssignmentDetail = () => {
  const { auth } = useAuth();
  const { assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssignment();
  }, []);

  const fetchAssignment = async () => {
    try {
      const response = await axios.get(`/assignments/${assignmentId}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      setAssignment(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching assignment:", err);
      setError("Failed to load assignment. Please try again later.");
      setLoading(false);
    }
  };

  const handleAssignTutor = () => {
    navigate(`/admin/assign-tutor/${assignmentId}`);
  };

  if (loading)
    return <div className="text-center mt-8">Loading assignment...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>Assignment Details</CardTitle>
          </CardHeader>
          <CardContent>
            {assignment && (
              <div>
                <h2 className="text-xl font-semibold">{assignment.title}</h2>
                <p className="mt-2">Description: {assignment.description}</p>
                <p className="mt-2">
                  Due Date: {new Date(assignment.dueDate).toLocaleDateString()}
                </p>
                <p className="mt-2">Price: ${assignment.price}</p>
                <p className="mt-2">Status: {assignment.status}</p>
                <p className="mt-2">Paid: {assignment.paid ? "Yes" : "No"}</p>
                <p className="mt-2">Student: {assignment.student.username}</p>
                <p className="mt-2">
                  Tutor:{" "}
                  {assignment.tutor
                    ? assignment.tutor.username
                    : "Not assigned"}
                </p>
                <Button
                  variant="outline"
                  className="mt-4 text-orange-800 border-orange-800 hover:bg-orange-200"
                  onClick={handleAssignTutor}
                >
                  Assign Tutor
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AssignmentDetail;
