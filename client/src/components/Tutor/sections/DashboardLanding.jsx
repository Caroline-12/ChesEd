import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaBookOpen, FaHandHoldingDollar } from "react-icons/fa6";
import { MdRateReview } from "react-icons/md";
import { BiSolidNotepad } from "react-icons/bi";
import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { InlineWidget, PopupButton } from "react-calendly";
import { GraduationCap } from "lucide-react";
import { BookOpen } from "lucide-react";
import { Bell } from "lucide-react";

const DashboardLanding = () => {
  const { auth } = useAuth();
  const [payments, setPayments] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [ongoingLessons, setOngoingLessons] = useState([]);
  
  useEffect(() => {
    const fetchPaidLessons = async () => {
      try {
        const response = await axios.get(`/payments/lessons/${auth.ID}/paid`);
        setPayments(response.data);
      } catch (err) {
        toast.error("Error fetching paid lessons.");
      }
    };

    const fetchCompletedLessons = async () => {
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        };
        if (auth?.accessToken) {
          config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
        const response = await axios.get(`/lessons/tutor/${auth.ID}/completed`, config);
        setCompletedLessons(response.data);
      } catch (err) {
        toast.error("Error fetching completed lessons.");
      }
    };

    const fetchOngoingLessons = async () => {
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        };
        if (auth?.accessToken) {
          config.headers.Authorization = `Bearer ${auth.accessToken}`;
        }
        const response = await axios.get(`/lessons/tutor/${auth.ID}/ongoing`, config);
        setOngoingLessons(response.data);
      } catch (err) {
        toast.error("Error fetching ongoing lessons.");
      }
    };

    fetchOngoingLessons();
    fetchCompletedLessons();
    fetchPaidLessons();
  }, []);

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  return (
    <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
      {/* Main Content Section */}
      <div className="flex-1 space-y-8">
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow-lg p-8 text-white col-span-full">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold mb-2">
                Welcome back, {capitalizeFirstLetter(auth?.firstName)}! 👋
              </h1>
              <p className="text-orange-100">
                Here's your teaching overview for{" "}
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

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Ongoing Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{ongoingLessons.length}</p>
              <p>Active lessons in progress.</p>
            </CardContent>
            <CardFooter>
              <Button variant="link" as={Link} to="/tutor-dashboard/lessons/ongoing">
                View Details
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Completed Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{completedLessons.length}</p>
              <p>Lessons successfully completed.</p>
            </CardContent>
            <CardFooter>
              <Button variant="link" as={Link} to="/tutor-dashboard/lessons/completed">
                View Details
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Your earnings so far.</p>
            </CardContent>
            <CardFooter>
              <Button variant="link" as={Link} to="/tutor-dashboard/payments">
                View Payments
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <p>View your upcoming lessons and plan ahead.</p>
            </CardContent>
            <CardFooter>
            <Button variant="link">
              <PopupButton
                url="https://calendly.com/fidelotieno11/30min?back=1&primary=false"
                rootElement={document.getElementById("root")}
                text="View your calendly schedule"
              />
            </Button>
            </CardFooter>
          </Card>

          <Card>
          <InlineWidget url="https://calendly.com/fidelotieno11" />
          </Card>
        </div>
      </div>

      {/* Right Sidebar Section */}
      <div className="w-full lg:w-1/4 h-full overflow-y-auto space-y-4 p-4 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5 text-orange-500" />
          </Button>
        </div>

        {/* Recent Notifications */}
        <div className="space-y-4">
          {/* {stats.recentNotifications.map((notification) => (
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
          ))} */}
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
};

export default DashboardLanding;
