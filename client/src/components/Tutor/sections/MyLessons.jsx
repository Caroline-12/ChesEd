import React, { useEffect, useState } from "react";
import axios from "@/api/axios";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import Spinner from "@/components/Spinner";
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

const MyLessons = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(`/assignments/tutor/${auth.ID}`, {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        });
        console.log(response);
        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching assignments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [auth.ID]);

  console.log(assignments);
  const handleViewMore = (assignmentId) => {
    navigate(`/assignment/${assignmentId}`);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted Date</TableHead>
              <TableHead>Due date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment._id}>
                <TableCell>{assignment.title}</TableCell>
                <TableCell>{assignment.student?.username || "N/A"}</TableCell>
                <TableCell>{assignment.category}</TableCell>
                <TableCell>
                  <Badge
                    color="primary"
                    className="capitalize"
                    style={{
                      backgroundColor:
                        assignment.status === "completed" ? "green" : "red",
                    }}
                  >
                    {assignment.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(assignment.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(assignment.dueDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleViewMore(assignment._id)}>
                    View More
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default MyLessons;
