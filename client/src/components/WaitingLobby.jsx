import { Button } from "@/components/ui/button"; // Assuming you have a button component
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation

const WaitingLobby = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/"); // Navigate to the home page or any other relevant page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-4 text-orange-600">
          Welcome to the Waiting Lobby
        </h1>
        <p className="text-gray-700 mb-6">
          Thank you for registering as a tutor! Your registration is currently
          <span className=" text-orange-500 font-semibold"> pending</span>{" "}
          approval. Our team is reviewing your application.
        </p>
        <p className="text-gray-700 mb-6">
          You will receive an{" "}
          <span className=" text-orange-500 font-semibold"> email </span> once
          your registration has been approved. In the meantime, feel free to
          explore our platform or contact us if you have any questions.
        </p>
        <Button
          className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
          onClick={handleBackToHome}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default WaitingLobby;
