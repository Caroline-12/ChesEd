import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useAuth from "../../hooks/useAuth";

const StudentLanding = () => {
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
    <div className="container mx-auto px-4">
      <div className="text-center py-20 bg-gradient-to-t from-orange-400 to-red-600 text-white rounded-lg shadow-xl my-10">
        <h1 className="text-5xl font-bold mb-4">
          Need Help with Your Assignment?
        </h1>
        <p className="text-xl mb-8">Get expert assistance from our tutors!</p>
        <Button
          onClick={handleSubmitAssignment}
          className="bg-white text-purple-600 hover:bg-purple-100 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Submit Your Assignment
        </Button>
      </div>
    </div>
  );
};

export default StudentLanding;
