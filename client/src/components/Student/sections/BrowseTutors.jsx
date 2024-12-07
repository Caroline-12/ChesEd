import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getProfilePhotoUrl, handleImageError, getInitials } from "@/utils/profileUtils";
import { toast } from "sonner";

export default function BrowseTutors() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTutors();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredTutors(tutors);
    } else {
      const filtered = tutors.filter((tutor) => {
        const fullName = `${tutor.firstName} ${tutor.lastName}`.toLowerCase();
        const specializations = tutor.specialization?.join(" ").toLowerCase() || "";
        const query = searchQuery.toLowerCase();
        return fullName.includes(query) || specializations.includes(query);
      });
      setFilteredTutors(filtered);
    }
  }, [searchQuery, tutors]);

  const fetchTutors = async () => {
    try {
      const response = await axios.get("/users/tutors", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      setTutors(response.data);
      setFilteredTutors(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tutors:", error);
      toast.error("Failed to load tutors. Please try again later.");
      setLoading(false);
    }
  };

  const handleTutorClick = (tutorId) => {
    navigate(`/tutors/${tutorId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Browse Tutors</h2>
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tutors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutors.map((tutor) => (
          <Card
            key={tutor._id}
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleTutorClick(tutor._id)}
          >
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage
                  src={getProfilePhotoUrl(tutor)}
                  alt={`${tutor.firstName}'s profile`}
                  onError={(e) => handleImageError(e, tutor)}
                />
                <AvatarFallback>{getInitials(tutor)}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold mb-2">
                {tutor.firstName} {tutor.lastName}
              </h3>
              {tutor.specialization?.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {tutor.specialization.map((spec, index) => (
                    <Badge key={index} variant="secondary">
                      {spec}
                    </Badge>
                  ))}
                </div>
              )}
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {tutor.bio || "No bio available"}
              </p>
              <Button variant="outline" className="w-full">
                View Profile
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredTutors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No tutors found matching your search.</p>
        </div>
      )}
    </div>
  );
}
