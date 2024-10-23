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
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

const MyLessons = () => {
  const [lessons, setlessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchlessons = async () => {
      try {
        const response = await axios.get(`/lessons/tutor/${auth.ID}`, {
          headers: { Authorization: `Bearer ${auth.accessToken}` },
        });
        console.log(response);
        setlessons(response.data);
      } catch (error) {
        console.error("Error fetching lessons", error);
      } finally {
        setLoading(false);
      }
    };

    fetchlessons();
  }, [auth.ID]);

  console.log(lessons);
  const handleViewMore = (lessonId) => {
    navigate(`/lesson/${lessonId}`);
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
              <TableHead>Paid</TableHead>
              <TableHead>Submitted Date</TableHead>
              <TableHead>Due date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessons.map((lesson) => (
              <TableRow key={lesson._id}>
                <TableCell>{lesson.title}</TableCell>
                <TableCell>{lesson.student?.username || "N/A"}</TableCell>
                <TableCell>{lesson.category}</TableCell>
                <TableCell>
                  <Badge
                    color="primary"
                    className="capitalize"
                    style={{
                      backgroundColor:
                        lesson.status === "completed" ? "green" : "red",
                    }}
                  >
                    {lesson.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {lesson.paymentStatus ? (
                    <span
                      aria-label="Payment made successfully"
                      title="Payment made successfully"
                      className="text-green-500"
                    >
                      <CheckIcon />
                    </span>
                  ) : (
                    <span
                      aria-label="Payment pending"
                      title="Payment pending"
                      className="text-red-500"
                    >
                      <CloseIcon />
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(lesson.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(lesson.dueDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleViewMore(lesson._id)}>
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
