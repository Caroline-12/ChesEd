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
import AdminDashboard from "./AdminDashboard";
import UsersSection from "./sections/UsersSection";
import ManageLessons from "./sections/ManageLessons";
import ManageCourses from "./sections/ManageCourses";
import Payments from "./sections/Payments";
import DashboardLanding from "./AdminDashboard";
import { CreateCourse } from "./CreateCourse";
import ApproveTrainersSection from "./sections/ApproveTrainersSection";
import AdminCategoryManagement from "./sections/AdminCategoryManagement";

export function AdminLayout() {
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
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      if (auth?.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
      }

      const response = await axios.get(`/lessons`, config);
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
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <img src="/chesed-logo.png" alt="Logo" className="h-8 w-8" />
            <span>ChesedAdmin</span>
          </Link>
        </div>
        <nav className="flex-1 px-2 py-4">
          <Link
            to="/admin"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              location.pathname === "/admin" ? "bg-gray-700" : ""
            }`}
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            to="/admin/lessons"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              location.pathname === "/admin/lessons" ? "bg-gray-700" : ""
            }`}
          >
            <Package className="h-5 w-5" />
            lessons
          </Link>
          <Link
            to="/admin/approvetutors"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              location.pathname === "/admin/approvetutors" ? "bg-gray-700" : ""
            }`}
          >
            <Package className="h-5 w-5" />
            Approve Tutors
          </Link>
          <Link
            to="/admin/categories"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              location.pathname === "/admin/categories" ? "bg-gray-700" : ""
            }`}
          >
            <Package className="h-5 w-5" />
            Categories
          </Link>
          <Link
            to="/admin/courses"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              location.pathname === "/admin/courses" ? "bg-gray-700" : ""
            }`}
          >
            <Users className="h-5 w-5" />
            Manage Courses
          </Link>
          <Link
            to="/admin/users"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              location.pathname === "/admin/users" ? "bg-gray-700" : ""
            }`}
          >
            <Users className="h-5 w-5" />
            Users
          </Link>
          <Link
            to="/admin/payments"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              location.pathname === "/admin/payments" ? "bg-gray-700" : ""
            }`}
          >
            <LineChart className="h-5 w-5" />
            Payments
          </Link>
        </nav>
        <div className="p-4">
          <Link
            to="/admin/profile"
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
                  to="/admin"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <img src="/chesed-logo.png" alt="Logo" />
                  <span className="sr-only">Chesed</span>
                </Link>
                <Link
                  to="/admin"
                  className={`flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                    location.pathname === "/admin"
                      ? "bg-muted text-primary"
                      : ""
                  }`}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  to="/admin/lessons"
                  className={`flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                    location.pathname === "/admin/lessons"
                      ? "bg-muted text-primary"
                      : ""
                  }`}
                >
                  <Package className="h-5 w-5" />
                  lessons
                </Link>
                <Link
                  to="/admin/approvetutors"
                  className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
                    location.pathname === "/admin/approvetutors"
                      ? "bg-gray-700"
                      : ""
                  }`}
                >
                  <Package className="h-5 w-5" />
                  Approve Tutors
                </Link>
                <Link
                  to="/admin/categories"
                  className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
                    location.pathname === "/admin/categories"
                      ? "bg-gray-700"
                      : ""
                  }`}
                >
                  <Package className="h-5 w-5" />
                  Categories
                </Link>
                <Link
                  to="/admin/courses"
                  className={`flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                    location.pathname === "/admin/courses"
                      ? "bg-muted text-primary"
                      : ""
                  }`}
                >
                  <Users className="h-5 w-5" />
                  Manage Courses
                </Link>
                <Link
                  to="/admin/users"
                  className={`flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                    location.pathname === "/admin/users"
                      ? "bg-muted text-primary"
                      : ""
                  }`}
                >
                  <Users className="h-5 w-5" />
                  Users
                </Link>
                <Link
                  to="/admin/payments"
                  className={`flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                    location.pathname === "/admin/payments"
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
        </header>

        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<DashboardLanding />} />
            <Route
              path="lessons"
              element={<ManageLessons lessons={lessons} />}
            />
            <Route path="courses" element={<ManageCourses />} />
            <Route path="payments" element={<Payments />} />
            <Route path="users" element={<UsersSection />} />
            <Route path="approvetutors" element={<ApproveTrainersSection />} />
            <Route path="categories" element={<AdminCategoryManagement />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
