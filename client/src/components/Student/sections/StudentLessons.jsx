import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";

function StudentLessons({ lessons }) {
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

  console.log(lessons);
  return (
    <div className="container mx-auto p-4">
      <Card>
        <div className="text-center py-10 text-black rounded-lg mb-10">
          <h1 className="text-5xl font-bold mb-4">
            Need help with your Understanding?
          </h1>
          <p className="text-xl mb-8">Get expert assistance from our tutors!</p>
          <Button
            onClick={handleSubmitlesson}
            className=" transition duration-300 ease-in-out transform hover:scale-105"
          >
            Submit Your Lesson
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
                {lessons.map((lesson) => (
                  <LessonItem key={lesson._id} lesson={lesson} />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const LessonItem = ({ lesson }) => {
  const navigate = useNavigate();

  const handlePayNow = () => {
    // Replace with your payment route or logic
    navigate(`/payment/${lesson._id}`);
  };

  return (
    <tr className="border-b">
      <td className="py-2 px-4  font-medium">{lesson.title}</td>
      <td className="py-2 px-4">
        {new Date(lesson.dueDate).toLocaleDateString()}
      </td>
      <td className="py-2 px-4">
        {lesson?.agreedPrice ? `$${lesson.agreedPrice}` : "pending"}
      </td>
      <td className="py-2 px-4">
        <Badge
          color="primary"
          className="capitalize"
          style={{
            backgroundColor: lesson.status === "completed" ? "green" : "red",
          }}
        >
          {lesson.status}
        </Badge>
      </td>
      <td className="py-2 px-4">{lesson.paid ? "Yes" : "No"}</td>
      <td className="py-2 px-4 flex gap-2">
        <Button
          variant="outline"
          className="text-orange-800 border-orange-800 hover:bg-orange-200"
          onClick={() => navigate(`/lesson/${lesson._id}`)}
        >
          View Details
        </Button>
        {!lesson.paid && (
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

export default StudentLessons;
