import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CiStar } from "react-icons/ci";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Navbar from "../Navbar";

const lesson = {
  _id: "669f3abf19c8c5cd6402389d",
  title: "Advanced JavaScript lesson",
  description:
    "Create a web application that demonstrates the use of async/await, promises, and error handling in JavaScript.",
  student: {
    _id: "669c5c7ff60b0910bb28c51b",
    username: "Student1",
  },
  price: 50,
  status: "completed",
  dueDate: "2024-08-15T23:59:59.999Z",
  createdAt: "2024-07-23T05:08:15.603Z",
  __v: 0,
  admin: {
    _id: "669c5d3980267bb6fb7d9c56",
    username: "Admin1",
  },
  tutor: null,
};

export default function Profile() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-8 p-6 max-w-4xl mx-auto">
        <section className="bg-background rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Student Profile</h2>
            <Button variant="outline">Edit Profile</Button>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-card rounded-lg p-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-lg font-medium">Student1</div>
                  <div className="text-sm text-muted-foreground">
                    student1@example.com
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium">Phone</div>
                  <div className="text-sm text-muted-foreground">
                    +1 (555) 123-4567
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Address</div>
                  <div className="text-sm text-muted-foreground">
                    123 Main St, Anytown USA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-background rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Course Progress</h2>
            <Link
              to="#"
              className="text-sm font-medium text-primary"
              prefetch={false}
            >
              View All Courses
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Introduction to Web Development</CardTitle>
                <CardDescription>Completed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Grade: A</div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Feedback: Excellent work
                  </div>
                </div>
                <Progress value={100} className="mt-2" />
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Advanced JavaScript</CardTitle>
                <CardDescription>In Progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Progress: 75%</div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Feedback: Keep up the good work
                  </div>
                </div>
                <Progress value={75} className="mt-2" />
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>React Fundamentals</CardTitle>
                <CardDescription>Pending</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Progress: 0%</div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Feedback: -
                  </div>
                </div>
                <Progress value={0} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </section>
        <section className="bg-background rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">lesson Management</h2>
            <Link
              to="#"
              className="text-sm font-medium text-primary"
              prefetch={false}
            >
              View All lessons
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>{lesson.title}</CardTitle>
                <CardDescription>{lesson.status}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">
                    Due Date: {new Date(lesson.dueDate).toLocaleDateString()}
                  </div>
                  <Button size="sm" variant="outline">
                    Upload Files
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-muted-foreground">
                    Assigned to:{" "}
                    {lesson.tutor ? lesson.tutor.username : "Not Assigned"}
                  </div>
                  <Button size="sm" variant="outline">
                    {lesson.tutor ? "Contact Tutor" : "Assign Tutor"}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </section>
        <section className="bg-background rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Tutor Marketplace</h2>
            <Link
              to="#"
              className="text-sm font-medium text-primary"
              prefetch={false}
            >
              Browse Tutors
            </Link>
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
                    <CiStar className="h-5 w-5 fill-primary" />
                    <div className="text-sm font-medium">4.8</div>
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    $50/hr
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  John is an experienced tutor with a passion for helping
                  students excel in Math and Physics. He has a proven track
                  record of improving grades and test scores.
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
                      Chemistry, Biology
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CiStar className="h-5 w-5 fill-primary" />
                    <div className="text-sm font-medium">4.9</div>
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    $60/hr
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  Jane specializes in Chemistry and Biology. Her interactive
                  teaching methods make complex concepts easy to understand. She
                  has helped many students achieve top grades.
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
                    <div className="text-lg font-medium">Alice Johnson</div>
                    <div className="text-sm text-muted-foreground">
                      English, History
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CiStar className="h-5 w-5 fill-primary" />
                    <div className="text-sm font-medium">4.7</div>
                  </div>
                  <div className="text-sm font-medium text-muted-foreground">
                    $55/hr
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  Alice is a passionate tutor for English and History. She
                  engages students with creative teaching strategies and has a
                  history of helping students excel in their studies.
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Review Tutor</Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}
