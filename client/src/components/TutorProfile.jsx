import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useParams, Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ChatModal from "./ChatModal";

export default function TutorProfile() {
  const { auth } = useAuth();
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const fetchTutorDetails = async () => {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      if (auth?.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
      }
      const response = await fetch(
        `http://localhost:3500/tutors/${id}`,
        config
      );
      const data = await response.json();
      setTutor(data);
    };

    if (id) fetchTutorDetails();
  }, [id, auth]);

  const goback = () => {
    window.history.back();
  };

  if (!tutor) return <p>Loading...</p>;

  return (
    <section className="w-full py-8 bg-gray-50">
      <div className="mx-auto lg:max-w-4xl px-3">
        <button
          onClick={goback}
          className="text-black py-2 px-4 rounded-full mb-6"
        >
          Go Back
        </button>
        <div className="flex flex-col items-center">
          {/* <img
            className="h-32 w-32 rounded-full mb-4"
            alt={tutor.username}
            src={tutor.profilePhoto || "https://via.placeholder.com/150"}
            loading="lazy"
          /> */}
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {tutor.firstName} {tutor.lastName}
          </h2>
          <p className="text-xl text-gray-600 mb-2">{tutor.username}</p>
          <p className="text-lg text-gray-600 mb-4">{tutor.email}</p>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Specialization
          </h3>
          <p className="text-lg text-gray-600 mb-4">
            {tutor.specialization.join(", ")}
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Teaching Experience
          </h3>
          <p className="text-lg text-gray-600 mb-4">
            {tutor.teachingExperience}
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Interests</h3>
          <p className="text-lg text-gray-600 mb-4">{tutor.interests}</p>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            English Proficiency
          </h3>
          <p className="text-lg text-gray-600 mb-4">
            {tutor.englishProficiency}
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Courses Taught
          </h3>
          <ul className="list-disc pl-5 text-lg text-gray-600 mb-4">
            {tutor.coursesTaught && tutor.coursesTaught.length > 0 ? (
              tutor.coursesTaught.map((course, index) => (
                <li key={index}>{course}</li>
              ))
            ) : (
              <>
                <li>Course A</li>
                <li>Course B</li>
              </>
            )}
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Student Reviews
          </h3>
          <div className="space-y-4">
            {tutor.reviews && tutor.reviews.length > 0 ? (
              tutor.reviews.map((review, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <p className="text-lg text-gray-600">"{review.text}"</p>
                  <p className="text-sm text-gray-500">
                    - {review.studentName}
                  </p>
                </div>
              ))
            ) : (
              <>
                <div className="border-b border-gray-200 pb-4">
                  <p className="text-lg text-gray-600">
                    "Great tutor with in-depth knowledge and a passion for
                    teaching."
                  </p>
                  <p className="text-sm text-gray-500">- Student A</p>
                </div>
                <div className="border-b border-gray-200 pb-4">
                  <p className="text-lg text-gray-600">
                    "Highly recommend! Very patient and helpful."
                  </p>
                  <p className="text-sm text-gray-500">- Student B</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to={"/submit-assignment"}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-full"
          >
            Submit Assignment
          </Link>
          <button
            onClick={() => setShowChat(true)}
            className="ml-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full"
          >
            Chat with Tutor
          </button>
        </div>

        <ChatModal showChat={showChat} onClose={() => setShowChat(false)} />
      </div>
    </section>
  );
}
