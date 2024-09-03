import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Edit, BookOpen, FileText } from "lucide-react";
import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";
import Navbar from "../Navbar";

const StudentProfilePage = () => {
  const { auth } = useAuth();
  const [lessons, setlessons] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudentlessons();
  }, []);

  const fetchStudentlessons = async () => {
    try {
      const response = await axios.get(`/lessons/student/${auth.ID}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      setlessons(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching lessons:", err);
      setError("Failed to load lessons. Please try again later.");
      setLoading(false);
    }
  };

  if (loading)
    return <div className="text-center mt-8">Loading profile...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  // if (!profile)
  //   return <div className="text-center mt-8">No profile data available.</div>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                {/* <AvatarImage src={profile.avatar} alt={profile.username} /> */}
                <AvatarFallback>
                  {/* {profile.firstName[0]}
                {profile.lastName[0]} */}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{auth.username}</h1>
                {/* <p className="text-gray-500">{profile.email}</p>
              <p className="text-sm mt-1">
                Education Level: {profile.educationLevel}
              </p> */}
              </div>
              <Button variant="outline" className="ml-auto">
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="lessons" className="space-y-4">
          <TabsList>
            <TabsTrigger value="lessons">lessons</TabsTrigger>
          </TabsList>

          <TabsContent value="lessons">
            <Card>
              <CardHeader>
                <CardTitle>My lessons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lessons.map((lesson) => (
                    <lessonItem key={lesson._id} lesson={lesson} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

const lessonItem = ({ lesson }) => (
  <div className="flex items-center justify-between p-4 bg-orange-100 rounded-lg">
    <div className="flex items-center space-x-4">
      <FileText className="h-6 w-6 text-green-500" />
      <div>
        <h4 className="font-semibold text-orange-800">{lesson.title}</h4>
        <p className="text-sm text-gray-500">
          Due: {new Date(lesson.dueDate).toLocaleDateString()}
        </p>
      </div>
    </div>
    <Badge variant={getlessonstatusVariant(lesson.status)}>
      {lesson.status}
    </Badge>
  </div>
);

const getlessonstatusVariant = (status) => {
  switch (status) {
    case "completed":
      return "success";
    case "in_progress":
      return "default";
    case "pending":
      return "warning";
    case "cancelled":
      return "destructive";
    default:
      return "default";
  }
};

export default StudentProfilePage;
