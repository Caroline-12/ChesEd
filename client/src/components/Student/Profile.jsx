import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { updateTutorProfile } from "@/api/tutor"; // Assume an API function for updating
import useAuth from "@/hooks/useAuth";
import axios from "@/api/axios";

export default function Profile() {
  const { auth } = useAuth();

  const [formData, setFormData] = useState({
    username: auth.username || "",
    email: auth.email || "",
    firstName: auth.firstName || "",
    lastName: auth.lastName || "",
    profilePhoto: auth.profilePhoto || "",
  });

  console.log("formData", formData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    // Assume a function to handle file uploads
    // uploadFile(file).then(url => setFormData(prev => ({...prev, profilePhoto: url })));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };
      const { data } = await axios.put(
        `/users`,
        { ...formData, id: auth.ID },
        config
      );
      alert("Profile updated successfully");
      console.log("Updated data:", data);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold">Personal Information</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled
            />
            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled
            />
            <Input
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              disabled
            />
            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled
            />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Profile Photo</h2>
          <div className="mt-4 flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={formData.profilePhoto} />
              <AvatarFallback>{formData.username}</AvatarFallback>
            </Avatar>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePhotoChange}
            />
          </div>
        </section>

        <Button type="submit">Update Profile</Button>
      </form>
    </div>
  );
}
