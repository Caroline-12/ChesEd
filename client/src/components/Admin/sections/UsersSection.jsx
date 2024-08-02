import useAuth from "@/hooks/useAuth";
import axios from "@/api/axios";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function UsersSection() {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("/users", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again later.");
      setLoading(false);
    }
  };

  console.log(users);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const students = users.filter((user) => user.roles === "student");
  const tutors = users.filter((user) => user.roles === "tutor");

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((student) => (
                  <UserItem key={student._id} user={student} />
                ))}
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
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((tutor) => (
                  <UserItem key={tutor._id} user={tutor} />
                ))}
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
