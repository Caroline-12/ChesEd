import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import axios from "@/api/axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Users, BookOpen, GraduationCap, CheckCircle } from "lucide-react";

export default function DashboardLanding() {
  const { auth } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTutors: 0,
    totalLessons: 0,
    recentNotifications: [],
    pendingTutors: 0,
    categories: 0,
    completedLessons: 0,
    activeLessons: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const [studentsRes, tutorsRes, lessonsRes, pendingTutorsRes, categoriesRes] = await Promise.all([
          axios.get("/users/students", {
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          }),
          axios.get("/tutors", {
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          }),
          axios.get("/lessons", {
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          }),
          axios.get("/tutors/pending", {
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          }),
          axios.get("/categories", {
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          }),
        ]);

        // Calculate completed and active lessons
        const completedLessons = lessonsRes.data.filter((lesson) => lesson.status === "completed").length;
        const activeLessons = lessonsRes.data.filter((lesson) => lesson.status === "active").length;

        setStats({
          totalStudents: studentsRes.data.length,
          totalTutors: tutorsRes.data.length,
          totalLessons: lessonsRes.data.length,
          pendingTutors: pendingTutorsRes.data.length,
          categories: categoriesRes.data.length,
          completedLessons,
          activeLessons,
          recentNotifications: [
            {
              id: 1,
              title: "New Tutor Applications",
              message: `${pendingTutorsRes.data.length} tutors waiting for approval`,
              time: "Just now",
              icon: <GraduationCap className="h-4 w-4" />,
            },
            {
              id: 2,
              title: "Active Lessons",
              message: `${activeLessons} lessons in progress`,
              time: "Updated now",
              icon: <BookOpen className="h-4 w-4" />,
            },
            {
              id: 3,
              title: "Platform Statistics",
              message: `${completedLessons} lessons completed successfully`,
              time: "Updated now",
              icon: <CheckCircle className="h-4 w-4" />,
            },
          ],
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [auth.accessToken]);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 space-y-8 pr-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {auth?.user?.firstName || auth.username}! 👋
              </h1>
              <p className="text-orange-100">
                Here's your platform overview for{" "}
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="hidden md:block">
              <Avatar className="h-16 w-16">
                <AvatarImage src={auth?.user?.profileImage} />
                <AvatarFallback>{auth?.username?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
              <p className="text-xs text-gray-500">Active learners on platform</p>
              <Progress value={(stats.totalStudents / 100) * 100} className="mt-2 bg-orange-100">
                <div className="bg-orange-500 h-full w-full" />
              </Progress>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Tutors</CardTitle>
              <GraduationCap className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTutors}</div>
              <p className="text-xs text-gray-500">Qualified educators</p>
              <Progress value={(stats.totalTutors / 50) * 100} className="mt-2 bg-orange-100">
                <div className="bg-orange-500 h-full w-full" />
              </Progress>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Active Lessons</CardTitle>
              <BookOpen className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeLessons}</div>
              <p className="text-xs text-gray-500">Ongoing learning sessions</p>
              <Progress value={(stats.activeLessons / stats.totalLessons) * 100} className="mt-2 bg-orange-100">
                <div className="bg-orange-500 h-full w-full" />
              </Progress>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Bell className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingTutors}</div>
              <p className="text-xs text-gray-500">Tutor applications waiting</p>
              <Progress value={(stats.pendingTutors / 10) * 100} className="mt-2 bg-orange-100">
                <div className="bg-orange-500 h-full w-full" />
              </Progress>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Course Categories</CardTitle>
              <CardDescription>Total available learning categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{stats.categories}</div>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Completed Lessons</CardTitle>
              <CardDescription>Successfully finished sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">{stats.completedLessons}</div>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Platform Activity</CardTitle>
              <CardDescription>Current active vs total lessons</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {((stats.activeLessons / stats.totalLessons) * 100).toFixed(1)}%
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-white p-6 border-l min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-orange-500" />
          </Button>
        </div>

        {/* Recent Notifications */}
        <div className="space-y-4">
          {stats.recentNotifications.map((notification) => (
            <Card key={notification.id} className="bg-white hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-orange-100 p-2 rounded-full">
                    {notification.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-gray-500">{notification.message}</p>
                    <p className="text-xs text-orange-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              Review Applications
            </Button>
            <Button variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-50">
              View Reports
            </Button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-2 rounded-full">
                <GraduationCap className="h-4 w-4 text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-medium">New Tutor Registered</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-2 rounded-full">
                <BookOpen className="h-4 w-4 text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Lesson Completed</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
