import useAuth from "@/hooks/useAuth";
import axios from "@/api/axios";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Spinner from "@/components/Spinner";

export default function UsersSection() {
  const { auth } = useAuth();
  const [tutors, setTutors] = useState([]);
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllTutors();
    fetchAllStudents();
  }, []);

  const fetchAllTutors = async () => {
    try {
      const response = await axios.get("/tutors", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      setTutors(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load tutors. Please try again later.");
      setLoading(false);
    }
  };

  const fetchAllStudents = async () => {
    try {
      const response = await axios.get("/users", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      setStudents(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load tutors. Please try again later.");
      setLoading(false);
    }
  };

  console.log(tutors);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      {loading && <Spinner />}
      <Card>
        <CardHeader>
          <CardTitle>Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left bg-white">
              <thead>
                <tr>
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map(
                    (student) =>
                      // search for this question mark implimentation
                      student.roles?.User && (
                        <UserItem key={student._id} user={student} />
                      )
                  )
                ) : (
                  <tr>
                    <td colSpan="3">No students found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tutors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left bg-white">
              <thead>
                <tr>
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tutors.length > 0 ? (
                  tutors.map((tutor) => (
                    <UserItem key={tutor._id} user={tutor} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No tutors found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const UserItem = ({ user }) => {
  const navigate = useNavigate();

  return (
    <tr className="border-b">
      <td className="py-2 px-4">{user.username}</td>
      <td className="py-2 px-4">{user.email}</td>
      <td className="py-2 px-4">
        <Button
          variant="outline"
          className="text-blue-800 border-blue-800 hover:bg-blue-200"
          onClick={() => navigate(`/admin/user/${user._id}`)}
        >
          View Details
        </Button>
      </td>
    </tr>
  );
};
