import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useAuth from "@/hooks/useAuth";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getProfilePhotoUrl, handleImageError, getInitials, getApiUrl } from "@/utils/profileUtils";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export default function TutorsCarousel() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const apiUrl = getApiUrl();

  const fetchCategories = async () => {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    if (auth?.accessToken) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }
    const response = await fetch(`${apiUrl}/categories`, config);
    return response.json();
  };

  const fetchTutors = async () => {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    if (auth?.accessToken) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }
    const response = await fetch(`${apiUrl}/tutors`, config);
    return response.json();
  };

  useEffect(() => {
    async function fetchData() {
      const categoriesData = await fetchCategories();
      const tutorsData = await fetchTutors();

      setCategories(categoriesData);
      setTutors(tutorsData);
      setFilteredTutors(tutorsData); // Initially show all tutors
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const filtered = tutors.filter((tutor) =>
        tutor.specialization.includes(selectedCategory)
      );
      setFilteredTutors(filtered);
    } else {
      setFilteredTutors(tutors);
    }
  }, [selectedCategory, tutors]);

  const handleViewProfile = (tutorId) => {
    navigate(`/tutors/${tutorId}`);
  };

  console.log(tutors)
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Tutors</h2>
          <Link 
            to="/student-dashboard/tutors"
            className="text-primary hover:text-primary/80 flex items-center gap-2"
          >
            View All Tutors
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mx-auto lg:max-w-6xl px-3">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex justify-center items-center">
            <span className="border-t border-yellow-500 w-16 mr-2"></span>
            Our Tutors
            <span className="border-t border-yellow-500 w-16 ml-2"></span>
          </h2>

          {/* Category Filter Panel */}
          <div className="mb-8">
            <Carousel
              opts={{
                loop: true,
                align: "center",
              }}
            >
              <CarouselContent className="flex justify-center space-x-4">
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`p-2 rounded-lg shadow-md hover:bg-gradient-to-tr from-orange-300 to-red-300  hover:text-white bg-orange-50 transition-transform transform hover:scale-105  border-2 ${
                      selectedCategory === category.name
                        ? "bg-orange-500 text-white"
                        : ""
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`mx-2 px-4 py-2 rounded-md ${
                    !selectedCategory
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  All
                </button>
              </CarouselContent>
            </Carousel>
          </div>

          <Carousel
            opts={{
              loop: true,
              align: "start",
            }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
          >
            <CarouselContent className="relative">
              {filteredTutors.map((tutor, index) => (
                <CarouselItem
                  key={tutor._id || index}
                  className="md:basis-1/2 lg:basis-1/3 p-4"
                >
                  <Card className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src={getProfilePhotoUrl(tutor)}
                        alt={`${tutor.firstName}'s profile`}
                        onError={(e) => handleImageError(e, tutor)}
                        className="object-cover"
                      />
                      <AvatarFallback>{getInitials(tutor)}</AvatarFallback>
                    </Avatar>
                    <p className="font-bold text-gray-800 text-lg mt-4">
                      {tutor.firstName} {tutor.lastName}
                    </p>
                    <Badge className="text-gray-600 mb-2">
                      {Array.isArray(tutor.specialization) 
                        ? tutor.specialization.join(", ")
                        : tutor.specialization}
                    </Badge>
                    <p className="text-gray-600 mb-4">{tutor.email}</p>
                    <button
                      onClick={() => handleViewProfile(tutor._id)}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      View Profile
                    </button>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 fill-black" />
            <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 fill-black" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
