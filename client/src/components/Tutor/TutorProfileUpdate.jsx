import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import useAuth from "@/hooks/useAuth";
import axios from "@/api/axios";
import { toast } from "sonner";
import Spinner from "../Spinner";

export default function TutorProfileUpdate() {
  const { auth } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const updatedData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      updatedData.append(key, value);
    });

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };
      const { data } = await axios.put(
        `/users`,
        { ...formData, id: auth.ID },
        config
      );
      toast.success("Profile updated successfully");
      setIsSubmitting(false);
    } catch (err) {
      toast.error("Failed to update profile.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {isSubmitting && <Spinner />}
      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Update Profile
        </h1>

        {/* Personal Information */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700">Personal Information</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled
              placeholder="First Name"
            />
            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled
              placeholder="Last Name"
            />
            <Input
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              disabled
              placeholder="Username"
            />
            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled
              placeholder="Email"
            />
            <Input
              label="Calendly Profile"
              name="calendlyProfile"
              value={formData.calendlyProfile}
              onChange={handleInputChange}
              placeholder="https://calendly.com/your-profile"
            />
          </div>
        </section>

        {/* Profile Photo */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700">Profile Photo</h2>
          <div className="mt-4 flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={formData.profilePhoto} />
              <AvatarFallback>
                {formData.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <input
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="file-input"
            />
          </div>
        </section>

        {/* Specialization */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-700">Specialization</h2>
          <div className="mt-4 space-y-2">
            {formData.specialization.length > 0 ? (
              formData.specialization.map((specialty, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-2 rounded-lg shadow-md"
                >
                  {specialty}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No specializations added yet.</p>
            )}
          </div>
        </section>

        {/* About You */}
        <section>
  <h2 className="text-2xl font-semibold text-gray-700">About You</h2>
  <div className="mt-4">
    <Textarea
      name="bio"
      value={formData.bio}
      onChange={(e) => {
        const words = e.target.value.trim().split(/\s+/); // Split text into words
        if (words.length <= 300) {
          handleInputChange(e); // Update the value only if within limit
        } else {
          toast.error("Maximum word count of 300 reached.");
        }
      }}
      placeholder="Write a short bio (max 300 words)..."
      className="mt-4"
    />
    <p className="text-sm text-gray-500 mt-2">
      {formData.bio.trim().split(/\s+/).length} / 300 words
    </p>
  </div>
</section>


        <Button
          type="submit"
          className=" font-semibold py-3 rounded-lg"
        >
          Update Profile
        </Button>
      </form>
    </div>
  );
}
