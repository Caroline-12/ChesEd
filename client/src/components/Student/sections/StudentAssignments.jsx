import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

function StudentAssignments({ assignments }) {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleSubmitAssignment = () => {
    if (auth?.accessToken) {
      navigate("/submit-assignment");
    } else {
      if (
        window.confirm(
          "You need to be logged in to submit an assignment. Would you like to log in now?"
        )
      ) {
        navigate("/login", { state: { from: "submit-assignment" } });
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <div className="text-center py-10 text-black rounded-lg mb-10">
          <h1 className="text-5xl font-bold mb-4">
            Need Help with Your Assignment?
          </h1>
          <p className="text-xl mb-8">Get expert assistance from our tutors!</p>
          <Button
            onClick={handleSubmitAssignment}
            className="hover:bg-purple-100 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Submit Your Assignment
          </Button>
        </div>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 text-start pl-4">Title</th>
                  <th className="py-2 text-start">Due Date</th>
                  <th className="py-2 text-start">Price</th>
                  <th className="py-2 text-start">Status</th>
                  <th className="py-2 text-start">Paid</th>
                  <th className="py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <AssignmentItem
                    key={assignment._id}
                    assignment={assignment}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const AssignmentItem = ({ assignment }) => {
  const navigate = useNavigate();

  const handlePayNow = () => {
    // Replace with your payment route or logic
    navigate(`/payment/${assignment._id}`);
  };

  return (
    <tr className="border-b">
      <td className="py-2 px-4">{assignment.title}</td>
      <td className="py-2 px-4">
        {new Date(assignment.dueDate).toLocaleDateString()}
      </td>
      <td className="py-2 px-4">${assignment.price}</td>
      <td className="py-2 px-4">{assignment.status}</td>
      <td className="py-2 px-4">{assignment.paid ? "Yes" : "No"}</td>
      <td className="py-2 px-4 flex gap-2">
        <Button
          variant="outline"
          className="text-orange-800 border-orange-800 hover:bg-orange-200"
          onClick={() => navigate(`/admin/assignment/${assignment._id}`)}
        >
          View Details
        </Button>
        {!assignment.paid && (
          <Button
            variant="outline"
            className="text-red-800 border-red-800 hover:bg-red-200"
            onClick={handlePayNow}
          >
            Pay Now
          </Button>
        )}
      </td>
    </tr>
  );
};

export default StudentAssignments;
