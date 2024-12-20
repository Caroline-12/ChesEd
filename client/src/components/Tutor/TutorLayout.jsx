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
import Lessons from "./sections/Lessons";
import ChatSection from "./sections/ChatSection";
import UsersSection from "./sections/UsersSection";
import DashboardLanding from "./TutorLanding";
import TutorLanding from "./TutorLanding";
import RevenueSection from "./sections/RevenueSection";
import MyLessons from "./sections/MyLessons";
import Chatpage from "../Student/Chatpage";
import SideDrawer from "../miscellaneous/SideDrawer";
import TutorProfileUpdate from "./TutorProfileUpdate";
export function TutorLayout() {
  const { auth } = useAuth();
  const [lessons, setlessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetchlessons();
  }, []);

  const fetchlessons = async () => {
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

  console.log("lessons", lessons);
  const navItems = [
    { path: "/tutor-dashboard", label: "Dashboard", icon: Home },
    { path: "/tutor-dashboard/opportunities", label: "Opportunities", icon: Package },
    { path: "/tutor-dashboard/chat", label: "Chat", icon: MessageCircle },
    { path: "/tutor-dashboard/revenue", label: "Revenue", icon: LineChart },
    { path: "/tutor-dashboard/tutor-profile", label: "Profile", icon: CircleUser },
    {
      path: "/tutor-dashboard/mylessons",
      label: "My Lessons",
      icon: Search,
    },
  ];

  const renderNavItem = (item) => (
    <Link
      key={item.path}
      to={item.path}
      className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 ${
        location.pathname === item.path ? "bg-gray-700" : ""
      }`}
    >
      <item.icon className="h-5 w-5" />
      {item.label}
    </Link>
  );

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <span className="">ChesedTutor</span>
          </Link>
        </div>
        <nav className="flex-1 px-2 py-4">{navItems.map(renderNavItem)}</nav>
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
                  to="/tutor-dashboard"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <span className="sr-only">ChesedTutor</span>
                </Link>
                {navItems.map(renderNavItem)}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex flex-col w-full">
            <SideDrawer />
          </div>
        </header>

        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<TutorLanding lessons={lessons} />} />
            <Route
              path="opportunities"
              element={
                <Lessons lessons={lessons} loading={loading} error={error} />
              }
            />
            <Route path="chat" element={<Chatpage />} />
            <Route path="revenue" element={<RevenueSection />} />
            <Route path="tutor-profile" element={<TutorProfileUpdate />} />
            <Route path="mylessons" element={<MyLessons />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default TutorLayout;
