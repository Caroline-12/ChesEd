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

const TutorLanding = () => {
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

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
      {/* Main Content Section */}
      <div className="flex-1 space-y-8">
        <Card className="p-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={auth.avatarUrl} alt="Profile Image" />
              <AvatarFallback>{auth.username ? auth.username[0] : "?"}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Welcome, {auth.username}!</h1>
              <p className="text-muted-foreground">Here's your performance overview.</p>
            </div>
          </div>
          <Link to="/tutor-dashboard/profile">
            <Button>Edit Profile</Button>
          </Link>
        </Card>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
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
              <Button variant="link" as={Link} to="/tutor-dashboard/schedule">
                View Full Schedule
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Right Sidebar Section */}
      <div className="w-full lg:w-1/4 h-full overflow-y-auto space-y-4 p-4 border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
  {/* Notifications Section */}
  <Card>
    <CardHeader>
      <CardTitle>Notifications</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition"
          >
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Notification #{index + 1}: This is a new update.
              </p>
            </div>
            <span className="text-xs text-gray-500">2h ago</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>

  {/* Quick Links Section */}
  <Card>
    <CardHeader>
      <CardTitle>Quick Links</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {[
          { label: "View Reviews", path: "/tutor-dashboard/reviews" },
          { label: "Get Help", path: "/tutor-dashboard/help" },
          { label: "Account Settings", path: "/tutor-dashboard/settings" },
          { label: "Submit Feedback", path: "/tutor-dashboard/feedback" },
        ].map((link, index) => (
          <li
            key={index}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition"
          >
            <Link
              to={link.path}
              className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"
            >
              <FaBookOpen className="text-gray-500 w-4 h-4" />
              <span>{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>

  {/* Upcoming Lessons Section */}
  <Card>
    <CardHeader>
      <CardTitle>Upcoming Lessons</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-3">
        {Array.from({ length: 15 }).map((_, index) => (
          <li
            key={index}
            className="flex items-start space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition"
          >
            <BiSolidNotepad className="text-green-500 w-5 h-5" />
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Lesson #{index + 1}
              </p>
              <p className="text-xs text-gray-500">
                Scheduled for: {new Date().toLocaleString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Button
        variant="link"
        as={Link}
        to="/tutor-dashboard/schedule"
        className="text-blue-500 hover:text-blue-700"
      >
        View Full Schedule
      </Button>
    </CardFooter>
  </Card>
</div>

    </div>
  );
};

export default TutorLanding;
