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
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import StudentLessons from "./sections/StudentLessons";
import Payments from "./sections/StudentPayments";
import DashboardLanding from "./sections/DashboardLanding";
import PopularCourses from "../PopularCourses";

import Chatpage from "./Chatpage";
import SideDrawer from "../miscellaneous/SideDrawer";
import Profile from "./Profile";

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

  console.log(lessons);
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <img src="/chesed-logo.png" alt="Logo" className="h-12 w-full" />
          </Link>
        </div>
        <nav className="flex-1 px-2 py-4">
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
            My lessons
          </Link>
          <Link
            to="/student-dashboard/chats"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              location.pathname === "/student-dashboard/chats" ? "bg-gray-700" : ""
            }`}
          >
            <Package className="h-5 w-5" />
            My Chats
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
        <div className="p-4">
          <Link
            to="/student-dashboard/profile"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700"
          >
            <Button variant="secondary" className="w-full">
              Profile
            </Button>
          </Link>
          <Link
            to="/login"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 mt-2"
          >
            <Button className="w-full">Logout</Button>
          </Link>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 bg-white shadow-md">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  to="/student-dashboard"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <img src="/chesed-logo.png" alt="Logo" />
                  <span className="sr-only">Chesed</span>
                </Link>
                <Link
                  to="/student-dashboard"
                  className={`flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                    location.pathname === "/student-dashboard"
                      ? "bg-muted text-primary"
                      : ""
                  }`}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  to="/student-dashboard/lessons"
                  className={`flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                    location.pathname === "/student-dashboard/lessons"
                      ? "bg-muted text-primary"
                      : ""
                  }`}
                >
                  <Package className="h-5 w-5" />
                  My lessons
                </Link>
                <Link
                  to="/student-dashboard/courses"
                  className={`flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                    location.pathname === "/student-dashboard/courses"
                      ? "bg-muted text-primary"
                      : ""
                  }`}
                >
                  <Users className="h-5 w-5" />
                  Courses
                </Link>
                <Link
                  to="/student-dashboard/payments"
                  className={`flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                    location.pathname === "/student-dashboard/payments"
                      ? "bg-muted text-primary"
                      : ""
                  }`}
                >
                  <LineChart className="h-5 w-5" />
                  Payments
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* <div className="flex flex-col w-full">
            <SideDrawer />
          </div> */}
        </header>

        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<DashboardLanding lessons={lessons}/>} />
            <Route
              path="/lessons"
              element={<StudentLessons lessons={lessons} />}
            />
            <Route path="/chats" element={<Chatpage />} />
            <Route path="/courses" element={<PopularCourses />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
