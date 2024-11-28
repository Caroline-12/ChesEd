import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Modal from "@/components/Modal";
import TutorAssignmentForm from "../TutorAssignmentForm";
import ReactPaginate from "react-paginate";

const ManageLessons = ({ lessons }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedlessonId, setSelectedlessonId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const lessonsPerPage = 10;
  const handleAssignTutor = (lessonId) => {
    setSelectedlessonId(lessonId);
    setShowModal(true);
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedlessonId(null);
  };

  const reversedLessons = [...lessons].reverse();
  const offset = currentPage * lessonsPerPage;
  const currentLessons = reversedLessons.slice(offset, offset + lessonsPerPage);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage lessons</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className=" text-left">
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Student</th>
              <th className="py-2 px-4 border-b">Due Date</th>
              <th className="py-2 px-4 border-b">Uploaded Files:</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
  {currentLessons.map((lesson) => (
    <tr key={lesson._id} className="text-center">
      <td className="text-left py-2 px-4 border-b">{lesson.title}</td>
      <td className="text-left py-2 px-4 border-b">{lesson.description}</td>
      <td className="py-2 px-4 border-b">{lesson.student?.username}</td>
      <td className="py-2 px-4 border-b">
        {lesson.dueDate
          ? format(new Date(lesson.dueDate), "yyyy-MM-dd")
          : "No Due Date"}
      </td>
      <td className="py-2 px-4 border-b">
        {lesson.documents?.length > 0 ? (
          <a
            href={`http://localhost:3500/${lesson.documents[0]}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:underline"
          >
            {lesson.documents[0].split("/").pop()} {/* Display only the filename */}
          </a>
        ) : (
          <span className="text-gray-500">No Documents</span>
        )}
      </td>
      <td className="py-2 px-4 border-b">
        {lesson.price ? `$${lesson.price}` : "Not Set"}
      </td>
      <td className="py-2 px-4 border-b">
        <Badge>{lesson.status}</Badge>
      </td>
      <td className="py-2 px-4 border-b">
        <Button
          className="bg-green-500 text-white"
          onClick={() => handleAssignTutor(lesson._id)}
        >
          Assign Tutor
        </Button>
      </td>
    </tr>
  ))}
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
</tbody>

        </table>
      </div>
      <Modal isOpen={showModal} onClose={closeModal}>
        <TutorAssignmentForm lessonId={selectedlessonId} />
      </Modal>
    </div>
  );
};

export default ManageLessons;
