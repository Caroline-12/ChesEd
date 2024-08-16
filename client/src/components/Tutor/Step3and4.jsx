// Step3and4.js
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const Step3and4 = ({
  formData,
  onChange,
  onFileChange,
  nextStep,
  prevStep,
}) => {
  const [profilePreview, setProfilePreview] = useState(null);

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePreview(URL.createObjectURL(file));
    onFileChange("profilePhoto", file);
  };

  const handleStrongestSubjectsChange = (subject) => {
    const newStrongestSubjects = formData.strongestSubjects.includes(subject)
      ? formData.strongestSubjects.filter((item) => item !== subject)
      : [...formData.strongestSubjects, subject];
    onChange("strongestSubjects", newStrongestSubjects);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="profilePhoto">Profile Photo</Label>
        <div className="flex items-center space-x-4">
          <Input
            id="file"
            name="file"
            type="file"
            onChange={handleProfilePhotoChange}
            accept="image/*"
          />
          {profilePreview && (
            <img
              src={profilePreview}
              alt="Profile Preview"
              className="w-20 h-20 object-cover rounded-full"
            />
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="governmentId">
          Take a photograph of yourself holding your government-issued
          identification
        </Label>
        <Input
          id="governmentId"
          name="governmentId"
          type="file"
          onChange={(e) => onFileChange("governmentId", e.target.files[0])}
          accept="image/*"
        />
      </div>
      <div className="flex justify-between">
        <Button onClick={prevStep} variant="outline">
          Back
        </Button>
        <Button onClick={nextStep}>Next</Button>
      </div>
    </div>
  );
};

export default Step3and4;
