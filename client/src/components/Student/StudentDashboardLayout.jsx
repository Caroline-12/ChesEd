import { Link, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";
import {
  Bell,
  CircleUser,
  Home,
  Menu,
  Package,
  LineChart,
  Search,
  Users,
  MessageCircle,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import StudentLessons from "./sections/StudentLessons";
import Payments from "./sections/StudentPayments";
import DashboardLanding from "./sections/DashboardLanding";
import PopularCourses from "../PopularCourses";
import Chatpage from "./Chatpage";
import SideDrawer from "../miscellaneous/SideDrawer";
import Profile from "./Profile";
import BrowseTutors from "./sections/BrowseTutors";
import TutorListing from "./sections/TutorListing";

export default function Dashboard() {
  const { auth } = useAuth();
  const [lessons, setlessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetchAlllessons();
  }, []);

  const fetchAlllessons = async () => {
    try {
      const response = await axios.get(`/lessons/student/${auth.ID}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      setlessons(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching lessons:", err);
      setError("Failed to load lessons. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white flex flex-col h-screen sticky top-0">
        <div className="p-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <img src="/chesed-logo.png" alt="Logo" className="h-8 w-8" />
            <span>ChesedStudent</span>
          </Link>
        </div>
        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          <Link
            to="/student-dashboard"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              location.pathname === "/student-dashboard" ? "bg-gray-700" : ""
            }`}
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            to="/student-dashboard/lessons"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              location.pathname === "/student-dashboard/lessons" ? "bg-gray-700" : ""
            }`}
          >
            <Package className="h-5 w-5" />
            My Lessons
          </Link>
          <Link
            to="/student-dashboard/browse-tutors"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              location.pathname === "/student-dashboard/browse-tutors" ? "bg-gray-700" : ""
            }`}
          >
            <GraduationCap className="h-5 w-5" />
            Browse Tutors
          </Link>
          <Link
            to="/student-dashboard/tutors"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              location.pathname === "/student-dashboard/tutors" ? "bg-gray-700" : ""
            }`}
          >
            <Users className="h-5 w-5" />
            All Tutors
          </Link>
          <Link
            to="/student-dashboard/chats"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              location.pathname === "/student-dashboard/chats" ? "bg-gray-700" : ""
            }`}
          >
            <MessageCircle className="h-5 w-5" />
            Chats
          </Link>
          <Link
            to="/student-dashboard/payments"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              location.pathname === "/student-dashboard/payments" ? "bg-gray-700" : ""
            }`}
          >
            <LineChart className="h-5 w-5" />
            Payments
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <Link
            to="/student-dashboard/profile"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 mb-2"
          >
            <CircleUser className="h-5 w-5" />
            Profile
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 text-red-400 hover:text-red-300"
            onClick={() => {
              localStorage.removeItem("user");
            }}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Link>
        </div>
      </aside>
      <div className="flex-1 flex flex-col h-screen">
        <header className="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-10">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="flex flex-col h-full bg-gray-800 text-white">
                  <div className="p-4 flex items-center gap-2">
                    <img src="/chesed-logo.png" alt="Logo" className="h-8 w-8" />
                    <span className="text-xl font-bold">ChesedStudent</span>
                  </div>
                  <nav className="flex-1 px-2 py-4">
                    <Link
                      to="/student-dashboard"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700"
                    >
                      <Home className="h-5 w-5" />
                      Dashboard
                    </Link>
                    <Link
                      to="/student-dashboard/lessons"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700"
                    >
                      <Package className="h-5 w-5" />
                      My Lessons
                    </Link>
                    <Link
                      to="/student-dashboard/browse-tutors"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700"
                    >
                      <GraduationCap className="h-5 w-5" />
                      Browse Tutors
                    </Link>
                    <Link
                      to="/student-dashboard/tutors"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700"
                    >
                      <Users className="h-5 w-5" />
                      All Tutors
                    </Link>
                    <Link
                      to="/student-dashboard/chats"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Chats
                    </Link>
                    <Link
                      to="/student-dashboard/payments"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700"
                    >
                      <LineChart className="h-5 w-5" />
                      Payments
                    </Link>
                  </nav>
                  <div className="p-4 border-t border-gray-700">
                    <Link
                      to="/student-dashboard/profile"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 mb-2"
                    >
                      <CircleUser className="h-5 w-5" />
                      Profile
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 text-red-400 hover:text-red-300"
                      onClick={() => {
                        localStorage.removeItem("user");
                      }}
                    >
                      <LogOut className="h-5 w-5" />
                      Logout
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Toggle notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* Add notification items here */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route
              path="/"
              element={<DashboardLanding lessons={lessons} />}
            />
            <Route
              path="lessons"
              element={
                <StudentLessons
                  lessons={lessons}
                  loading={loading}
                  error={error}
                />
              }
            />
            <Route path="browse-tutors" element={<BrowseTutors />} />
            <Route path="tutors" element={<TutorListing />} />
            <Route path="chats" element={<Chatpage />} />
            <Route path="payments" element={<Payments />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
