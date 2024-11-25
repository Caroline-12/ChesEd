import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { Button } from "./ui/button";

export default function Navbar() {
  const { isLoggedIn, auth, logout } = useAuth();

  // Determine the dashboard route based on the user's roles
  const getDashboardRoute = () => {
    if (auth?.roles?.find((role) => role === 5150)) return "/admin-dashboard";
    if (auth?.roles?.find((role) => role === 1984)) return "/tutor-dashboard";
    if (auth?.roles?.find((role) => role === 2001)) return "/student-dashboard";
    return "/dashboard"; // Default fallback if no roles are matched
  };

  return (
    <header className="sticky top-0 z-50 bg-red-100">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold bg-transparent">
            <img
              src="chesed-logo.png"
              className="bg-transparent"
              alt="Logo"
              width="150"
              height="37"
            />
          </Link>
          <div className="flex justify-center items-center gap-8">
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn && auth?.accessToken ? (
                <>
                  {/* Dynamically render the correct dashboard link */}
                  <Link to={getDashboardRoute()} className="text-black font-bold">
                    Dashboard
                  </Link>
                  <Button onClick={logout} variant="secondary">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-black font-bold">
                    Login
                  </Link>
                  <Link to="/register" className="text-black font-bold">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
