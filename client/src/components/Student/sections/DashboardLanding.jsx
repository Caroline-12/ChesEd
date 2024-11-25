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
import { Link } from "react-router-dom";
import { toast } from "sonner";

const DashboardLanding = ({lessons}) => {
  const { auth } = useAuth();
  const numberOfLessons = lessons.length;
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Function to fetch paid lessons from the backend API
    const fetchPaidLessons = async () => {
      try {
        const response = await axios.get(`/payments/lessons/${auth.ID}/paid`);
        setPayments(response.data); // Set the fetched data to the state
      } catch (err) {
        toast.error("Error fetching paid lessons.");
      }
    };

    fetchPaidLessons();
  }, []);

  
  return (
    <div className="space-y-4">
      <Card className="flex flex-col md:flex-row items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={auth.avatarUrl} alt="Profile Image" />
            <AvatarFallback>
              {auth.username ? auth.username[0] : "?"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Welcome, {auth.username}!</h1>
            <p className="text-sm text-muted-foreground">
            </p>
          </div>
        </div>
        <Link to={"/student-dashboard/profile"} variant="secondary" className="mt-4 md:mt-0">
          Edit Profile
        </Link>
      </Card>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {/* <Card className="bg-white shadow-lg">
          <CardHeader className="flex items-center">
            <FaBookOpen className="h-6 w-6 text-blue-500 mr-2" />
            <CardTitle>Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-muted-foreground">
              Courses currently enrolled in
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="link" as="a" href="/student-dashboard/lessons">
              View Courses
            </Button>
          </CardFooter>
        </Card> */}

        <Card className="bg-white shadow-lg">
          <CardHeader className="flex items-center">
            <BiSolidNotepad className="h-6 w-6 text-green-500 mr-2" />
            <CardTitle>lessons</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{numberOfLessons}</p>
            <p className="text-sm text-muted-foreground"> lessons</p>
          </CardContent>
          <CardFooter>
            <Link to="/student-dashboard/lessons">
            <Button variant="link" as="a" >
              View lessons
            </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* <Card className="bg-white shadow-lg">
          <CardHeader className="flex items-center">
            <MdRateReview className="h-6 w-6 text-yellow-500 mr-2" />
            <CardTitle>Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">Total reviews given</p>
          </CardContent>
          <CardFooter>
          <Link to="/student-dashboard/reviews">
            <Button variant="link" as="a" href="/student-dashboard/reviews">
              View Reviews
            </Button>
            </Link>
          </CardFooter>
        </Card> */}

        <Card className="bg-white shadow-lg">
          <CardHeader className="flex items-center">
            <FaHandHoldingDollar className="h-6 w-6 text-red-500 mr-2" />
            <CardTitle>Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{payments.length}</p>
            <p className="text-sm text-muted-foreground">Pending payments</p>
          </CardContent>
          <CardFooter>
            <Button variant="link" as="a" href="/student-dashboard/payments">
              View Payments
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardLanding;
