import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Step4 = ({ formData, onFileChange, nextStep, prevStep }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="governmentId">
          Take a photograph of yourself holding your government-issued
          identification
        </Label>
        <Input
          id="governmentId"
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

export default Step4;
