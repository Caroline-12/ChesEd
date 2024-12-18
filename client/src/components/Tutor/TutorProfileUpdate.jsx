import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import useAuth from "@/hooks/useAuth";
import axios from "@/api/axios";
import { toast } from "sonner";
import Spinner from "../Spinner";
import TutorProfilePreview from "./TutorProfilePreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { getProfilePhotoUrl, handleImageError, getInitials, getApiUrl } from "@/utils/profileUtils";

export default function TutorProfileUpdate() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLocalFile, setIsLocalFile] = useState(false);

  const [formData, setFormData] = useState({
    username: auth.username || "",
    email: auth.email || "",
    firstName: auth.firstName || "",
    lastName: auth.lastName || "",
    bio: auth.bio || "",
    specialization: auth.specialization || [],
    profilePhoto: null,
    calendlyProfile: auth.calendlyProfile || "",
    balance: auth.balance || 0,
  });

  useEffect(() => {
    // Set initial profile photo preview if it exists
    if (auth.profilePhoto && !isLocalFile) {
      setPreviewUrl(getProfilePhotoUrl(auth));
    }
  }, [auth.profilePhoto, isLocalFile]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'profilePhoto' && files?.[0]) {
      const file = files[0];
      setIsLocalFile(true);
      setPreviewUrl(URL.createObjectURL(file));
      setFormData(prev => ({
        ...prev,
        profilePhoto: file
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSpecializationChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      specialization: value.split(",").map(item => item.trim()).filter(Boolean),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const updatedData = new FormData();
    
    // Add user ID
    updatedData.append('id', auth.ID);
    
    // Add other form data
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'specialization') {
        updatedData.append('specialization', JSON.stringify(value));
      } else if (key === 'profilePhoto' && value instanceof File) {
        updatedData.append('profilePhoto', value);
      } else if (value !== null && value !== undefined && key !== 'balance') {
        updatedData.append(key, value);
      }
    });

    try {
      const apiUrl = getApiUrl();

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.accessToken}`,
        },
        withCredentials: true
      };
      
      const response = await axios.put(`${apiUrl}/users`, updatedData, config);
      const data = response.data;
      
      // Update auth context with new user data, keeping profilePhoto as a path
      setAuth(prev => ({
        ...prev,
        ...data,
        profilePhoto: data.profilePhoto // Store just the path, not the full URL
      }));
      
      setIsLocalFile(false); // Reset local file flag
      toast.success("Profile updated successfully!");
      navigate('/tutor-dashboard'); // Redirect to profile page after successful update
    } catch (error) {
      console.error('Update error:', error);
      console.error('Response:', error.response);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Tabs defaultValue="edit" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit">Edit Profile</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="edit">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={previewUrl}
                  alt={formData.username}
                  onError={handleImageError}
                />
                <AvatarFallback>{getInitials(formData.username)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Input
                  type="file"
                  name="profilePhoto"
                  onChange={handleInputChange}
                  accept="image/*"
                  className="w-full"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Supported formats: JPG, JPEG, PNG, GIF
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label>First Name</label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label>Last Name</label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label>Email</label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label>Specializations (comma-separated)</label>
              <Input
                name="specialization"
                value={formData.specialization.join(", ")}
                onChange={handleSpecializationChange}
                placeholder="Math, Physics, Chemistry"
              />
            </div>

            <div className="space-y-2">
              <label>Bio</label>
              <Textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <label>Calendly Profile URL</label>
              <Input
                name="calendlyProfile"
                value={formData.calendlyProfile}
                onChange={handleInputChange}
                placeholder="https://calendly.com/your-profile"
              />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : "Save Changes"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="preview">
          <TutorProfilePreview profile={formData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
