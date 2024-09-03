import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useAuth from "../../hooks/useAuth";

const StudentLanding = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleSubmitlesson = () => {
    if (auth?.accessToken) {
      navigate("/submit-lesson");
    } else {
      if (
        window.confirm(
          "You need to be logged in to submit an lesson. Would you like to log in now?"
        )
      ) {
        navigate("/login", { state: { from: "submit-lesson" } });
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="text-center py-20 bg-gradient-to-t from-orange-400 to-red-600 text-white rounded-lg shadow-xl my-10">
        <h1 className="text-5xl font-bold mb-4">Need Help with Your lesson?</h1>
        <p className="text-xl mb-8">Get expert assistance from our tutors!</p>
        <Button
          onClick={handleSubmitlesson}
          className="bg-white text-purple-600 hover:bg-purple-100 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Submit Your lesson
        </Button>
      </div>
    </div>
  );
};

export default StudentLanding;
