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
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const DashboardLanding = () => {
  const [courses, setCourses] = useState([]);
  const { auth } = useAuth();
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    fetchUserProfile();
    fetchEnrolledCourses();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`/users/profile/${auth.ID}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      setUserProfile(response.data);
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      const response = await axios.get(`/courses/enrolled/${auth.ID}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      setCourses(response.data);
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  return (
    <div className="space-y-4">
      <Card className="flex flex-col md:flex-row items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={userProfile.avatarUrl} alt="Profile Image" />
            <AvatarFallback>
              {userProfile.name ? userProfile.name[0] : "?"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Welcome, {userProfile.name}!</h1>
            <p className="text-sm text-muted-foreground">
              Let's explore your learning journey.
            </p>
          </div>
        </div>
        <Button variant="secondary" className="mt-4 md:mt-0">
          Edit Profile
        </Button>
      </Card>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <Card className="bg-white shadow-lg">
          <CardHeader className="flex items-center">
            <FaBookOpen className="h-6 w-6 text-blue-500 mr-2" />
            <CardTitle>Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{courses.length}</p>
            <p className="text-sm text-muted-foreground">
              Courses currently enrolled in
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="link" as="a" href="/dashboard/courses">
              View Courses
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader className="flex items-center">
            <BiSolidNotepad className="h-6 w-6 text-green-500 mr-2" />
            <CardTitle>Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm text-muted-foreground">Pending assignments</p>
          </CardContent>
          <CardFooter>
            <Button variant="link" as="a" href="/dashboard/assignments">
              View Assignments
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader className="flex items-center">
            <MdRateReview className="h-6 w-6 text-yellow-500 mr-2" />
            <CardTitle>Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">Total reviews given</p>
          </CardContent>
          <CardFooter>
            <Button variant="link" as="a" href="/dashboard/reviews">
              View Reviews
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader className="flex items-center">
            <FaHandHoldingDollar className="h-6 w-6 text-red-500 mr-2" />
            <CardTitle>Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$150</p>
            <p className="text-sm text-muted-foreground">Pending payments</p>
          </CardContent>
          <CardFooter>
            <Button variant="link" as="a" href="/dashboard/payments">
              View Payments
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardLanding;
