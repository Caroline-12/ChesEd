import { useState, useEffect } from "react";
import axios from "@/api/axios";
// import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
const AssignTutors = () => {
  const [assignments, setAssignments] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedTutor, setSelectedTutor] = useState(null);

  useEffect(() => {
    fetchAssignments();
    fetchTutors();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get("/assignments");
      setAssignments(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching assignments:", err);
      setError("Failed to load assignments. Please try again later.");
      setLoading(false);
    }
  };

  const fetchTutors = async () => {
    try {
      const response = await axios.get("/users?role=tutor");
      setTutors(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching tutors:", err);
      setError("Failed to load tutors. Please try again later.");
      setLoading(false);
    }
  };

  const handleAssign = async () => {
    try {
      await axios.post(`/assignments/${selectedAssignment}/assign-tutor`, {
        tutorId: selectedTutor,
      });
      alert("Tutor assigned successfully!");
    } catch (err) {
      console.error("Error assigning tutor:", err);
      setError("Failed to assign tutor. Please try again later.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Assign Tutors</h1>
      <div className="mb-4">
        <Select
          options={assignments.map((a) => ({ value: a._id, label: a.title }))}
          onChange={(option) => setSelectedAssignment(option.value)}
          placeholder="Select Assignment"
        />
      </div>
      <div className="mb-4">
        <Select
          options={tutors.map((t) => ({ value: t._id, label: t.name }))}
          onChange={(option) => setSelectedTutor(option.value)}
          placeholder="Select Tutor"
        />
      </div>
      <Button onClick={handleAssign} className="bg-blue-600 text-white">
        Assign Tutor
      </Button>
    </div>
  );
};

export default AssignTutors;
