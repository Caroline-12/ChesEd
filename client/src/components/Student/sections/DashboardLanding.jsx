import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import axios from "@/api/axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, GraduationCap, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardLanding = () => {
  const { auth } = useAuth();
  const [stats, setStats] = useState({
    totalLessons: 0,
    completedLessons: 0,
    activeLessons: 0,
    payments: [],
    recentNotifications: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const [lessonsRes, paymentsRes] = await Promise.all([
          axios.get("/lessons/student/" + auth.ID, {
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          }),
          axios.get("/payments/lessons/" + auth.ID + "/paid", {
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          }),
        ]);

        // Calculate completed and active lessons
        const completedLessons = lessonsRes.data.filter(
          (lesson) => lesson.status === "completed"
        ).length;
        const activeLessons = lessonsRes.data.filter(
          (lesson) => lesson.status === "active"
        ).length;

        setStats({
          totalLessons: lessonsRes.data.length,
          completedLessons,
          activeLessons,
          payments: paymentsRes.data,
          recentNotifications: [
            {
              id: 1,
              title: "Active Lessons",
              message: `${activeLessons} lessons in progress`,
              time: "Just now",
              icon: <BookOpen className="h-4 w-4" />,
            },
            {
              id: 2,
              title: "Completed Lessons",
              message: `${completedLessons} lessons completed`,
              time: "Updated now",
              icon: <CheckCircle className="h-4 w-4" />,
            },
            {
              id: 3,
              title: "Payments",
              message: `${paymentsRes.data.length} payments processed`,
              time: "Updated now",
              icon: <GraduationCap className="h-4 w-4" />,
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
  }, [auth.accessToken, auth.ID]);

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  return (
    <div className="flex">
      <div className="flex-1 space-y-8 pr-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold mb-2">
                Welcome back, {capitalizeFirstLetter(auth?.firstName)}! 👋
              </h1>
              <p className="text-orange-100">
                Here's your learning overview for{" "}
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
                <AvatarImage src={auth?.avatarUrl} />
                <AvatarFallback>
                  {auth?.firstName?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Lessons</CardTitle>
              <BookOpen className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLessons}</div>
              <p className="text-xs text-gray-500">Enrolled lessons</p>
              <Progress
                value={(stats.totalLessons / 10) * 100}
                className="mt-2 bg-orange-100"
              />
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Active Lessons
              </CardTitle>
              <GraduationCap className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeLessons}</div>
              <p className="text-xs text-gray-500">Lessons in progress</p>
              <Progress
                value={(stats.activeLessons / stats.totalLessons) * 100}
                className="mt-2 bg-orange-100"
              />
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Completed Lessons
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedLessons}</div>
              <p className="text-xs text-gray-500">Successfully completed</p>
              <Progress
                value={(stats.completedLessons / stats.totalLessons) * 100}
                className="mt-2 bg-orange-100"
              />
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 gap-6">
          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest updates and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {stats.recentNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-center space-x-4"
                  >
                    <div className="bg-orange-100 p-2 rounded-full">
                      {notification.icon}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-sm text-gray-500">
                        {notification.message}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">{notification.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardLanding;
