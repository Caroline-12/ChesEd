import useAuth from "@/hooks/useAuth";
import axios from "@/api/axios";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/Spinner";
import { useNavigate } from "react-router-dom";
export default function UsersSection() {
  const { auth } = useAuth();
  const [tutors, setTutors] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePanel, setActivePanel] = useState("students"); // State to toggle between panels

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllTutors();
    fetchAllStudents();
  }, []);

  useEffect(() => {
    setFilteredTutors(
      tutors.filter(
        (tutor) =>
          tutor.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tutor.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    setFilteredStudents(
      students.filter(
        (student) =>
          student.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, tutors, students]);

  const fetchAllTutors = async () => {
    try {
      const response = await axios.get("/tutors", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      setTutors(response.data);
      setFilteredTutors(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching tutors:", err);
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
      setFilteredStudents(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to load students. Please try again later.");
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Search Bar */}
      <Input
        type="text"
        placeholder="Search users by name or email..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />

      {/* Panel Navigation Buttons */}
      <div className="flex space-x-4">
        <Button
          variant={activePanel === "students" ? "solid" : "outline"}
          onClick={() => setActivePanel("students")}
          className={activePanel === "students" ? "bg-blue-600 text-white" : ""}
        >
          Students
        </Button>
        <Button
          variant={activePanel === "tutors" ? "solid" : "outline"}
          onClick={() => setActivePanel("tutors")}
          className={activePanel === "tutors" ? "bg-blue-600 text-white" : ""}
        >
          Tutors
        </Button>
      </div>

      {/* Active Panel Content */}
      <div className="mt-4">
        {activePanel === "students" && (
          <div className="overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">Students</h2>
            <table className="min-w-full text-left bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map(
                    (student) =>
                      student.roles?.User && (
                        <UserItem key={student._id} user={student} />
                      )
                  )
                ) : (
                  <tr>
                    <td colSpan="3" className="py-4 text-center">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activePanel === "tutors" && (
          <div className="overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">Tutors</h2>
            <table className="min-w-full text-left bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTutors.length > 0 ? (
                  filteredTutors.map((tutor) => (
                    <UserItem key={tutor._id} user={tutor} />
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="py-4 text-center">
                      No tutors found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
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
          onClick={() => navigate(`/dashboard/user/${user._id}`)}
        >
          View Details
        </Button>
      </td>
    </tr>
  );
};
