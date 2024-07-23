import { FaSearch } from "react-icons/fa";

const Heroes = () => {
  return (
    <>
      <div className="relative bg-gradient-to-r from-orange-400 to-red-600 h-screen flex items-center justify-center text-center">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            We Help to Upgrade Your Knowledge Effectively
          </h1>
          <p className="text-lg md:text-xl text-white mb-12">
            Grursus mal suada faci lisis Lorem ipsum dolor sit ametion
            consectetur adipiscing elit
          </p>
          <div className="relative flex items-center w-full max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search your courses"
              className="w-full py-3 px-4 rounded-l-lg focus:outline-none"
            />
            <div className="relative flex">
              <select className="h-full py-3 px-4 rounded-r-lg bg-white text-gray-700 focus:outline-none">
                <option value="Categories">Categories</option>
                <option value="Art & Design">Art & Design</option>
                <option value="Business">Business</option>
                <option value="Data Science">Data Science</option>
                <option value="Development">Development</option>
                <option value="Finance">Finance</option>
                {/* Add more categories as needed */}
              </select>
              <button className="absolute right-0 top-0 bg-orange-600 text-white px-4 py-2 rounded-r-lg hover:bg-orange-500 transition">
                <FaSearch />
              </button>{" "}
            </div>
            {/* <button className="absolute right-0 top-0 mt-3 mr-3 bg-orange-600 text-white px-4 py-2 rounded-r-lg hover:bg-orange-500 transition">
              <FaSearch />
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Heroes;
