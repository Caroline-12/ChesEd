import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Bell, CircleUser } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { MessageSquare, Calendar, Clock, FileText, Users } from "lucide-react";

export default function DashboardLanding() {
  // Mock data for charts
  const semesterGradeData = [
    { name: "Course 1", grade: 3.5 },
    { name: "Course 2", grade: 3.2 },
    { name: "Course 3", grade: 3.8 },
    { name: "Course 4", grade: 3.6 },
    { name: "Course 5", grade: 3.9 },
    { name: "Course 6", grade: 3.7 },
  ];

  const users = [
    { name: "Students", value: 30 },
    { name: "Tutors", value: 15 },
    { name: "Admins", value: 5 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const revenueData = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 5000 },
    { name: "Apr", revenue: 4500 },
    { name: "May", revenue: 6000 },
    { name: "Jun", revenue: 5500 },
  ];
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Your Dashboard today</h1>

        <Card className="mb-6 bg-blue-500 text-white">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Creative outdoor ads</h2>
            <p className="mb-4">
              Every large design company whether it's a multi-national branding
              corporation or a regular down at heel tatty magazine publisher
              needs to fill holes in the workforce.
            </p>
            <Button variant="secondary">Get started</Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={semesterGradeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="grade" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={users}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {users.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Your documents</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span>Submission NLP Programming</span>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </li>
                <li className="flex justify-between items-center">
                  <span>Submission Mobile Programming</span>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progress Learning</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span>NLP Typography</span>
                  <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </li>
                <li className="flex justify-between items-center">
                  <span>NLP Data Structure</span>
                  <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </li>
                <li className="flex justify-between items-center">
                  <span>NLP Architecture</span>
                  <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-red-600 h-2.5 rounded-full"
                      style={{ width: "40%" }}
                    ></div>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="w-80 bg-white p-6 border-l">
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5 text-gray-500" />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
          <img
            src="/path-to-user-avatar.jpg"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
        </div>

        <h2 className="text-lg font-semibold mb-4">Payments</h2>
        <ul className="space-y-4 mb-8">
          <li className="flex items-center">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
            <div className="flex-1">
              <div className="font-semibold">Meeting with Mr Lurah</div>
              <div className="text-sm text-gray-500 flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-1" />
                <span>August 15</span>
                <Clock className="h-4 w-4 ml-2 mr-1" />
                <span>10:00 - 11:30</span>
              </div>
            </div>
          </li>
          <li className="flex items-center">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
            <div className="flex-1">
              <div className="font-semibold">Meeting with Tim Dough</div>
              <div className="text-sm text-gray-500 flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-1" />
                <span>August 15</span>
                <Clock className="h-4 w-4 ml-2 mr-1" />
                <span>14:00 - 15:00</span>
              </div>
            </div>
          </li>
        </ul>

        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-4 mb-8">
          <li className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
              <FileText className="h-4 w-4 text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="font-semibold">Submission NLP Programming</div>
              <div className="text-sm text-gray-500">2 hours ago</div>
            </div>
          </li>
          <li className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <Users className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="font-semibold">Outcome administration</div>
              <div className="text-sm text-gray-500">5 hours ago</div>
            </div>
          </li>
          <li className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <MessageSquare className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="font-semibold">Teacher Panel Discussion</div>
              <div className="text-sm text-gray-500">1 day ago</div>
            </div>
          </li>
        </ul>

        <h2 className="text-lg font-semibold mb-4">Latest Messages</h2>
        <div className="flex space-x-2">
          <img
            src="/path-to-avatar1.jpg"
            alt="User 1"
            className="w-8 h-8 rounded-full"
          />
          <img
            src="/path-to-avatar2.jpg"
            alt="User 2"
            className="w-8 h-8 rounded-full"
          />
          <img
            src="/path-to-avatar3.jpg"
            alt="User 3"
            className="w-8 h-8 rounded-full"
          />
          <img
            src="/path-to-avatar4.jpg"
            alt="User 4"
            className="w-8 h-8 rounded-full"
          />
          <img
            src="/path-to-avatar5.jpg"
            alt="User 5"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
