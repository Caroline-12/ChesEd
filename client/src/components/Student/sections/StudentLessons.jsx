import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { MdOutlinePending } from "react-icons/md";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import ReactPaginate from "react-paginate";
import { useState } from "react";

function StudentLessons({ lessons }) {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [currentPage, setCurrentPage] = useState(0);
  const lessonsPerPage = 10;

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

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

  const reversedLessons = [...lessons].reverse();
  const offset = currentPage * lessonsPerPage;
  const currentLessons = reversedLessons.slice(offset, offset + lessonsPerPage);

  return (
    <div className="container ">
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
                  <th className="py-2 text-start">Tutor</th>
                  <th className="py-2 text-start">Paid</th>
                  <th className="py-2 text-start">Mode of Delivery</th>
                  <th className="py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentLessons.map((lesson) => (
                  <LessonItem key={lesson._id} lesson={lesson} />
                ))}
              </tbody>
            </table>
          </div>
          <ReactPaginate
            previousLabel={"< previous"}
            nextLabel={"next >"}
            breakLabel={"..."}
            pageCount={Math.ceil(lessons.length / lessonsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination flex justify-center mt-4"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link px-3 py-1 border rounded-md mx-1"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link px-3 py-1 border rounded-md mx-1"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link px-3 py-1 border rounded-md mx-1"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link px-3 py-1 border rounded-md mx-1"}
            activeClassName={"active"}
            activeLinkClassName={"bg-orange-500 text-white"}
            renderOnZeroPageCount={null}
          />
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
      <td className="py-2 font-medium">{lesson.title}</td>
      <td className="py-2">{new Date(lesson.dueDate).toLocaleDateString()}</td>
      <td className="py-2">
        {lesson?.agreedPrice ? (
          `$${lesson.agreedPrice}`
        ) : (
          <span
            aria-label="Price agreement pending"
            title="Price agreement pending"
          >
            <MdOutlinePending />
          </span>
        )}
      </td>
      <td className="py-2">
        <Badge
          color="primary"
          className="capitalize"
          style={{
            backgroundColor:
              lesson.status === "completed"
                ? "green"
                : lesson.status === "in_progress"
                ? "orange"
                : "red",
          }}
        >
          {lesson.status.replace("_", " ")}
        </Badge>
      </td>
      <td className="py-2">{lesson.tutor?.username || "N/A"}</td>
      <td className="py-2">
        {lesson.paymentStatus ? (
          <span
            aria-label="Payment made successfully"
            title="Payment made successfully"
            className="text-green-500"
          >
            <CheckIcon />
          </span>
        ) : (
          <span
            aria-label="Payment pending"
            title="Payment pending"
            className="text-red-500"
          >
            <CloseIcon />
          </span>
        )}
      </td>
      <td className="py-2">{lesson.modeOfDelivery}</td>
      <td className="py-2 flex gap-2 justify-center">
        <Button
          variant="outline"
          className="text-orange-800 border-orange-800 hover:bg-orange-200"
          onClick={() => navigate(`/lesson/${lesson._id}`)}
        >
          View Details
        </Button>
        {/* {!lesson.paid && (
          <Button
            variant="outline"
            className="text-red-800 border-red-800 hover:bg-red-200"
            onClick={handlePayNow}
          >
            Pay Now
          </Button>
        )} */}
      </td>
    </tr>
  );
};

export default StudentLessons;
