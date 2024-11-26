import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-orange-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-600 mt-2">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="px-6 py-3 text-white bg-orange-600 rounded-lg shadow hover:bg-orange-500 focus:ring-2 focus:ring-orange-400 focus:outline-none"
          >
            Visit Our Homepage
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <img
          src="/404.jpg"
          alt="404 Illustration"
          className="w-full max-w-md"
        />
      </div>
    </div>
  );
};

export default Missing;
