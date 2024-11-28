import useAuth from "@/hooks/useAuth";
import axios from "@/api/axios";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/Spinner";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { capitalizeFullName } from "@/utils/stringUtils";

export default function UsersSection() {
  const { auth } = useAuth();
  const [tutors, setTutors] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePanel, setActivePanel] = useState("students"); // State to toggle between panels
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAllTutors();
    fetchAllStudents();
    fetchAllAdmins();
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

    setFilteredAdmins(
      admins.filter(
        (admin) =>
          admin.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          admin.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, tutors, students, admins]);

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
      const response = await axios.get("/users/students", {
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

  const fetchAllAdmins = async () => {
    try {
      const response = await axios.get("/users/admins", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      setAdmins(response.data);
      setFilteredAdmins(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching admins:", err);
      setError("Failed to load admins. Please try again later.");
      setLoading(false);
    }
  };

  const UserDetailsModal = ({ user, isOpen, onClose }) => {
    if (!user) return null;

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">User Profile</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.profileImage} />
              <AvatarFallback>{user.username?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="grid w-full gap-4">
              <div>
                <h3 className="font-semibold text-gray-500">Username</h3>
                <p className="text-lg">{capitalizeFullName(user.username)}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-500">Email</h3>
                <p className="text-lg">{user.email}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-500">Role</h3>
                <p className="text-lg capitalize">{user.role || 'student'}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-500">Join Date</h3>
                <p className="text-lg">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              {user.role === 'tutor' && (
                <>
                  <div>
                    <h3 className="font-semibold text-gray-500">Expertise</h3>
                    <p className="text-lg">{user.expertise || 'Not specified'}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-500">Total Lessons</h3>
                    <p className="text-lg">{user.totalLessons || 0}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
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

      <div className="flex">
        {/* Navigation Panel */}
        <div className="w-48 bg-gray-100 rounded-lg p-4 mr-6">
          <div
            onClick={() => setActivePanel("students")}
            className={`p-3 rounded-md cursor-pointer mb-2 transition-colors ${
              activePanel === "students"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Students
          </div>
          <div
            onClick={() => setActivePanel("tutors")}
            className={`p-3 rounded-md cursor-pointer mb-2 transition-colors ${
              activePanel === "tutors"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Tutors
          </div>
          <div
            onClick={() => setActivePanel("admins")}
            className={`p-3 rounded-md cursor-pointer transition-colors ${
              activePanel === "admins"
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            Admins
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
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
                  {(filteredStudents.length > 0 ? filteredStudents : []).map(
                    (student) =>
                      student.roles?.User && (
                        <UserItem 
                          key={student._id} 
                          user={student} 
                          onViewDetails={() => {
                            setSelectedUser(student);
                            setIsModalOpen(true);
                          }}
                        />
                      )
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
                  {(filteredTutors.length > 0 ? filteredTutors : []).map((tutor) => (
                    <UserItem 
                      key={tutor._id} 
                      user={tutor} 
                      onViewDetails={() => {
                        setSelectedUser(tutor);
                        setIsModalOpen(true);
                      }}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activePanel === "admins" && (
            <div className="overflow-x-auto">
              <h2 className="text-xl font-bold mb-4">Admins</h2>
              <table className="min-w-full text-left bg-white border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Email</th>
                    <th className="py-2 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(filteredAdmins.length > 0 ? filteredAdmins : []).map((admin) => (
                    <UserItem 
                      key={admin._id} 
                      user={admin} 
                      onViewDetails={() => {
                        setSelectedUser(admin);
                        setIsModalOpen(true);
                      }}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <UserDetailsModal 
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
      />
    </div>
  );
}

const UserItem = ({ user, onViewDetails }) => {
  return (
    <tr className="border-b">
      <td className="py-2 px-4">{capitalizeFullName(user.username)}</td>
      <td className="py-2 px-4">{user.email}</td>
      <td className="py-2 px-4">
        <Button
          variant="outline"
          className="text-orange-600 border-orange-600 hover:bg-orange-50"
          onClick={onViewDetails}
        >
          View Details
        </Button>
      </td>
    </tr>
  );
};
