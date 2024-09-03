import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { FaBookOpen, FaHandHoldingDollar } from "react-icons/fa6";
import { MdRateReview } from "react-icons/md";
import { BiSolidNotepad } from "react-icons/bi";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
const DashboardLanding = () => {
  const [courses, setCourses] = useState([]);
  const [numlessons, setNumlessons] = useState(0);

  const { auth } = useAuth();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3500/lessons/student/${auth.ID}`,
          {
            headers: {
              Authorization: `Bearer ${auth?.accessToken}`,
            },
            withCredentials: true,
          }
        );
        setCourses(response.data);
        setNumlessons(response.data.length);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [auth.ID]);

  const renderCourseCard = (course) => {
    const { title, status, dueDate } = course;
    const dueDateFormatted = new Date(dueDate).toLocaleDateString();

    return (
      <div
        key={course._id}
        className="flex-shrink-0 w-80 p-4 border rounded-lg shadow-lg bg-white"
      >
        <h4 className=" font-medium text-md">{title}</h4>
        <p className="text-gray-500 mt-1">Due: {dueDateFormatted}</p>
        <div className="mt-3">
          <span
            className={`text-sm ${
              status === "completed"
                ? "text-green-600"
                : status === "in_progress"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {status.replace("_", " ").toUpperCase()}
          </span>
          <div className="w-full bg-gray-200 h-2 mt-2 rounded-full">
            <div
              className={`h-2 rounded-full ${
                status === "completed"
                  ? "bg-green-600"
                  : status === "in_progress"
                  ? "bg-yellow-600"
                  : "bg-red-600"
              }`}
              style={{
                width: `${
                  status === "completed"
                    ? "100%"
                    : status === "in_progress"
                    ? "50%"
                    : "0%"
                }`,
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-10 p-5 font-sans">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Enrolled Courses
            </CardTitle>
            <FaBookOpen />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total lessons</CardTitle>
            <BiSolidNotepad />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{numlessons}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payments</CardTitle>
            <FaHandHoldingDollar />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reviews</CardTitle>
            <MdRateReview />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+53</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-5">
        <h3 className="text-2xl font-bold">Continue Watching</h3>
        <Carousel className="flex gap-6 overflow-x-auto">
          {courses.slice(0, 3).map((course) => renderCourseCard(course))}
        </Carousel>
      </div>

      <section className="  py-10 mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Review Tutors </h2>
          {/* <Link
            href="#"
            className="text-sm font-medium text-primary"
            prefetch={false}
          >
            Browse Tutors
          </Link> */}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-card">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-lg font-medium">John Smith</div>
                  <div className="text-sm text-muted-foreground">
                    Math, Physics
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  ⭐<div className="text-sm font-medium">4.8</div>
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  $50/hr
                </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                John is an experienced tutor with a passion for helping students
                excel in Math and Physics. He has a proven track record of
                improving grades and test scores.
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Review Tutor</Button>
            </CardFooter>
          </Card>
          <Card className="bg-card">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-lg font-medium">Jane Doe</div>
                  <div className="text-sm text-muted-foreground">
                    English, Literature
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  ⭐<div className="text-sm font-medium">4.6</div>
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  $45/hr
                </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                Jane is a passionate English and Literature tutor with extensive
                experience in helping students improve their writing, reading
                comprehension, and critical thinking skills.
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Review Tutor</Button>
            </CardFooter>
          </Card>
          <Card className="bg-card">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-lg font-medium">Michael Johnson</div>
                  <div className="text-sm text-muted-foreground">
                    Computer Science, Programming
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  ⭐<div className="text-sm font-medium">4.9</div>
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  $60/hr
                </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                Michael is an expert in Computer Science and Programming, with a
                proven track record of helping students master complex concepts
                and excel in their coding projects.
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Review Tutor</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default DashboardLanding;
