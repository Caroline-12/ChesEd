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
  LogOut,
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
      <aside className="w-64 bg-gray-800 text-white flex flex-col h-screen sticky top-0">
        <div className="p-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <img src="/chesed-logo.png" alt="Logo" className="h-8 w-8" />
            <span>ChesedAdmin</span>
          </Link>
        </div>
        <nav className="flex-1 px-2 py-4 overflow-y-auto">
          <Link
            to="/admin-dashboard"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              location.pathname === "/admin-dashboard" ? "bg-gray-700" : ""
            }`}
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            to="/admin-dashboard/opportunities"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              location.pathname === "/admin-dashboard/opportunities" ? "bg-gray-700" : ""
            }`}
          >
            <Package className="h-5 w-5" />
            lessons
          </Link>
          <Link
            to="/admin-dashboard/approvetutors"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              location.pathname === "/admin-dashboard/approvetutors" ? "bg-gray-700" : ""
            }`}
          >
            <Package className="h-5 w-5" />
            Approve Tutors
          </Link>
          <Link
            to="/admin-dashboard/categories"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              location.pathname === "/admin-dashboard/categories" ? "bg-gray-700" : ""
            }`}
          >
            <Package className="h-5 w-5" />
            Categories
          </Link>
          <Link
            to="/admin-dashboard/users"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              location.pathname === "/admin-dashboard/users" ? "bg-gray-700" : ""
            }`}
          >
            <Users className="h-5 w-5" />
            Users
          </Link>
          <Link
            to="/admin-dashboard/payments"
            className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
              location.pathname === "/admin-dashboard/payments" ? "bg-gray-700" : ""
            }`}
          >
            <LineChart className="h-5 w-5" />
            Payments
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <Link
            to="/admin-dashboard/profile"
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
                    <span className="text-xl font-bold">ChesedAdmin</span>
                  </div>
                  <nav className="flex-1 px-2 py-4">
                    <Link
                      to="/admin-dashboard"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700"
                    >
                      <Home className="h-5 w-5" />
                      Dashboard
                    </Link>
                    <Link
                      to="/admin-dashboard/opportunities"
                      className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
                        location.pathname === "/admin-dashboard/opportunities" ? "bg-gray-700" : ""
                      }`}
                    >
                      <Package className="h-5 w-5" />
                      lessons
                    </Link>
                    <Link
                      to="/admin-dashboard/approvetutors"
                      className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
                        location.pathname === "/admin-dashboard/approvetutors" ? "bg-gray-700" : ""
                      }`}
                    >
                      <Package className="h-5 w-5" />
                      Approve Tutors
                    </Link>
                    <Link
                      to="/admin-dashboard/categories"
                      className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
                        location.pathname === "/admin-dashboard/categories" ? "bg-gray-700" : ""
                      }`}
                    >
                      <Package className="h-5 w-5" />
                      Categories
                    </Link>
                    <Link
                      to="/admin-dashboard/users"
                      className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
                        location.pathname === "/admin-dashboard/users" ? "bg-gray-700" : ""
                      }`}
                    >
                      <Users className="h-5 w-5" />
                      Users
                    </Link>
                    <Link
                      to="/admin-dashboard/payments"
                      className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
                        location.pathname === "/admin-dashboard/payments" ? "bg-gray-700" : ""
                      }`}
                    >
                      <LineChart className="h-5 w-5" />
                      Payments
                    </Link>
                  </nav>
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
            <Route path="/" element={<AdminDashboard />} />
            <Route
              path="opportunities"
              element={<ManageLessons lessons={lessons} loading={loading} error={error} />}
            />
            <Route path="users" element={<UsersSection />} />
            <Route path="payments" element={<Payments />} />
            <Route path="approvetutors" element={<ApproveTrainersSection />} />
            <Route path="categories" element={<AdminCategoryManagement />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
