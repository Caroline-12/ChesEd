import {
  FaPalette,
  FaCode,
  FaBriefcase,
  FaBullhorn,
  FaMusic,
  FaDollarSign,
  FaHeartbeat,
  FaLeaf,
  FaDatabase,
  FaLongArrowAltRight,
} from "react-icons/fa";

const categories = [
  { title: "Art & Design", courses: "5+ Courses", icon: <FaPalette /> },
  { title: "Development", courses: "10+ Courses", icon: <FaCode /> },
  { title: "Business", courses: "7+ Courses", icon: <FaBriefcase /> },
  { title: "Marketing", courses: "9+ Courses", icon: <FaBullhorn /> },
  { title: "Music", courses: "4+ Courses", icon: <FaMusic />, highlight: true },
  { title: "Finance", courses: "18+ Courses", icon: <FaDollarSign /> },
  { title: "Medical", courses: "8+ Courses", icon: <FaHeartbeat /> },
  { title: "Lifestyle", courses: "3+ Courses", icon: <FaLeaf /> },
  { title: "Data Science", courses: "6+ Courses", icon: <FaDatabase /> },
];

const CategoriesPage = () => {
  return (
    <div className=" bg-orange-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Top Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="p-6 rounded-lg shadow-md hover:bg-orange-500  hover:text-white bg-white transition-transform transform hover:scale-105  border-2"
            >
              <div className="flex items-center space-x-4">
                <div className="text-orange-500 hover:text-white text-3xl">
                  <i>{category.icon}</i>
                </div>
                <div>
                  <h4 className="text-xl font-bold ">{category.title}</h4>
                  <p>{category.courses}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="p-6 rounded-lg shadow-md bg-transparent flex items-center justify-center hover:border border-orange-500 transition-transform transform hover:scale-105 hover:border-orange-500 border-2">
            <div>
              <h4 className="text-xl font-bold text-gray-800">Explore more</h4>
              <p className="text-yellow-500">50+ Categories</p>
              <div className="mt-4">
                <FaLongArrowAltRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
