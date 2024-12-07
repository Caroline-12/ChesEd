import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "@/api/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { getProfilePhotoUrl, handleImageError, getInitials } from "@/utils/profileUtils";

export default function TutorListing() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get("/tutors");
        setTutors(response.data);
      } catch (error) {
        toast.error("Failed to fetch tutors");
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <Card key={n} className="w-full">
            <CardHeader className="space-y-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-[300px]" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-10 w-[100px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {tutors.map((tutor) => (
        <Card key={tutor._id} className="w-full hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage 
                  src={getProfilePhotoUrl(tutor)}
                  alt={`${tutor.firstName}'s profile`}
                  onError={(e) => handleImageError(e, tutor)}
                />
                <AvatarFallback>{getInitials(tutor)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">
                  {tutor.firstName} {tutor.lastName}
                </CardTitle>
                <p className="text-sm text-gray-500">{tutor.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tutor.specialization?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tutor.specialization.map((spec, index) => (
                    <Badge key={index} variant="secondary">
                      {spec}
                    </Badge>
                  ))}
                </div>
              )}
              
              {tutor.bio && (
                <p className="text-sm text-gray-600 line-clamp-3">{tutor.bio}</p>
              )}

              <Link to={`/tutors/${tutor._id}`}>
                <Button className="w-full">View Profile</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
