import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { ArrowLeft, Calendar, Mail } from "lucide-react";
import { getProfilePhotoUrl, handleImageError, getInitials } from "@/utils/profileUtils";

export default function TutorDetail() {
  const { tutorId } = useParams();
  const navigate = useNavigate();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutorDetails = async () => {
      try {
        const response = await axios.get(`/tutors/${tutorId}`);
        setTutor(response.data);
      } catch (error) {
        toast.error("Failed to fetch tutor details");
        navigate("/tutors");
      } finally {
        setLoading(false);
      }
    };

    fetchTutorDetails();
  }, [tutorId, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <Skeleton className="h-8 w-24 mb-6" />
        <Card>
          <CardHeader className="space-y-4">
            <Skeleton className="h-32 w-32 rounded-full mx-auto" />
            <Skeleton className="h-8 w-[300px] mx-auto" />
            <Skeleton className="h-4 w-[200px] mx-auto" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-10 w-[200px] mx-auto" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!tutor) {
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Card>
        <CardHeader className="text-center">
          <Avatar className="h-32 w-32 mx-auto mb-4">
            <AvatarImage 
              src={getProfilePhotoUrl(tutor)}
              alt={`${tutor.firstName}'s profile`}
              onError={(e) => handleImageError(e, tutor)}
            />
            <AvatarFallback>{getInitials(tutor)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl mb-2">
            {tutor.firstName} {tutor.lastName}
          </CardTitle>
          <div className="flex items-center justify-center text-gray-500 space-x-2">
            <Mail className="h-4 w-4" />
            <span>{tutor.email}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {tutor.specialization?.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Specializations</h3>
              <div className="flex flex-wrap gap-2">
                {tutor.specialization.map((spec, index) => (
                  <Badge key={index} variant="secondary">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {tutor.bio && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">About</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{tutor.bio}</p>
            </div>
          )}

          {tutor.calendlyProfile && (
            <div className="text-center">
              <a
                href={tutor.calendlyProfile}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full sm:w-auto">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule a Session
                </Button>
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
