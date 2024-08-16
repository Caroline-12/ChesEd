import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const Step3 = ({ formData, onChange, onFileChange, nextStep, prevStep }) => {
  const handleStrongestSubjectsChange = (subject) => {
    const newStrongestSubjects = formData.strongestSubjects.includes(subject)
      ? formData.strongestSubjects.filter((item) => item !== subject)
      : [...formData.strongestSubjects, subject];
    onChange("strongestSubjects", newStrongestSubjects);
  };

  return (
    <div className="space-y-4">
      <Label>Which subjects are your strongest?</Label>
      <div className="grid grid-cols-2 gap-2">
        {formData.specialization.map((subject) => (
          <div key={subject} className="flex items-center space-x-2">
            <Checkbox
              id={subject}
              checked={formData.strongestSubjects.includes(subject)}
              onCheckedChange={() => handleStrongestSubjectsChange(subject)}
            />
            <label
              htmlFor={subject}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {subject}
            </label>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Label htmlFor="profilePhoto">Profile Photo</Label>
        <Input
          id="profilePhoto"
          type="file"
          onChange={(e) => onFileChange("profilePhoto", e.target.files[0])}
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

export default Step3;
