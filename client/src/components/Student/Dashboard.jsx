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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import StudentAssignments from "./sections/StudentAssignments";
import Courses from "./sections/AllCourses";
import Payments from "./sections/StudentPayments";
import DashboardLanding from "./sections/DashboardLanding";
import PopularCourses from "../PopularCourses";

export default function Dashboard() {
  const { auth } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetchAllAssignments();
  }, []);

  const fetchAllAssignments = async () => {
    try {
      const response = await axios.get(`/assignments/student/${auth.ID}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      setAssignments(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching assignments:", err);
      setError("Failed to load assignments. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <img src="/chesed-logo.png" alt="Logo" className="h-8 w-8" />
            <span>Chesed</span>
          </Link>
        </div>
        <nav className="flex-1 px-2 py-4">
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              location.pathname === "/dashboard" ? "bg-gray-700" : ""
            }`}
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            to="/dashboard/assignments"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              location.pathname === "/dashboard/assignments"
                ? "bg-gray-700"
                : ""
            }`}
          >
            <Package className="h-5 w-5" />
            My Assignments
          </Link>
          <Link
            to="/dashboard/courses"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              location.pathname === "/dashboard/courses" ? "bg-gray-700" : ""
            }`}
          >
            <Users className="h-5 w-5" />
            Courses
          </Link>
          <Link
            to="/dashboard/payments"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              location.pathname === "/dashboard/payments" ? "bg-gray-700" : ""
            }`}
          >
            <LineChart className="h-5 w-5" />
            Payments
          </Link>
        </nav>
        <div className="p-4">
          <Link
            to="/dashboard/profile"
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
                  to="/dashboard"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <img src="/chesed-logo.png" alt="Logo" />
                  <span className="sr-only">Chesed</span>
                </Link>
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                    location.pathname === "/dashboard"
                      ? "bg-muted text-primary"
                      : ""
                  }`}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  to="/dashboard/assignments"
                  className={`flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                    location.pathname === "/dashboard/assignments"
                      ? "bg-muted text-primary"
                      : ""
                  }`}
                >
                  <Package className="h-5 w-5" />
                  My Assignments
                </Link>
                <Link
                  to="/dashboard/courses"
                  className={`flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                    location.pathname === "/dashboard/courses"
                      ? "bg-muted text-primary"
                      : ""
                  }`}
                >
                  <Users className="h-5 w-5" />
                  Courses
                </Link>
                <Link
                  to="/dashboard/payments"
                  className={`flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                    location.pathname === "/dashboard/payments"
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

          <div className="flex items-center space-x-4">
            <Input placeholder="Search..." className="hidden md:block" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Input placeholder="Search..." />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
              <Badge variant="dot" className="absolute right-1 top-1" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/logout">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<DashboardLanding />} />
            <Route
              path="/assignments"
              element={<StudentAssignments assignments={assignments} />}
            />
            <Route path="/courses" element={<PopularCourses />} />
            <Route path="/payments" element={<Payments />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
