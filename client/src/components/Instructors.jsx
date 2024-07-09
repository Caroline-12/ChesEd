import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";

const instructors = [
  {
    name: "Steve Johnson",
    role: "General Director",
    imgSrc: "https://via.placeholder.com/930x1028",
  },
  {
    name: "Olivia Jackson",
    role: "Chief Manager",
    imgSrc: "https://via.placeholder.com/545x606",
  },
  {
    name: "Tamerlan Aziev",
    role: "Course Researcher",
    imgSrc: "https://via.placeholder.com/545x606",
  },
  {
    name: "Silvia Perry",
    role: "Linguistic Mentor",
    imgSrc: "https://via.placeholder.com/545x606",
  },
  {
    name: "David Schwimmer",
    role: "Computer Engineer",
    imgSrc: "https://via.placeholder.com/545x606",
  },
];

const InstructorCard = ({ instructor, large }) => {
  return (
    <div className={`p-4 ${large ? "col-span-2 row-span-2" : "col-span-1"}`}>
      <div className="relative w-full">
        <img
          className="rounded-lg w-full"
          src={instructor.imgSrc}
          alt={instructor.name}
        />
        <div className="absolute bottom-0 left-0 w-full p-4 bg-white bg-opacity-80 rounded-b-lg">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">
              {instructor.name}
            </p>
            <p className="text-gray-600">{instructor.role}</p>
            <div className="flex items-center justify-center mt-2 text-gray-500">
              <a className="mx-1" href="#">
                <FaFacebookF />
              </a>
              <a className="mx-1" href="#">
                <FaTwitter />
              </a>
              <a className="mx-1" href="#">
                <FaInstagram />
              </a>
              <a className="mx-1" href="#">
                <FaPinterest />
              </a>
              <a className="mx-1" href="#">
                <BsYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Instructors = () => {
  return (
    <section className="w-full py-8 bg-gray-50">
      <div className="mx-auto lg:max-w-6xl px-3">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex justify-center items-center">
          <span className="border-t border-yellow-500 w-16 mr-2"></span>
          Our Instructors
          <span className="border-t border-yellow-500 w-16 ml-2"></span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {instructors.map((instructor, index) => (
            <InstructorCard
              key={index}
              instructor={instructor}
              large={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructors;
