import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Step5 = ({ formData, onChange, onFileChange, prevStep, onSubmit }) => {
  const handleDocumentChange = (index, file) => {
    const newDocuments = [...formData.documents];
    newDocuments[index] = file;
    onChange("documents", newDocuments);
  };

  return (
    <div className="space-y-4">
      <Label>Verify your qualifications</Label>
      <div className="space-y-2">
        {formData.documents.map((doc, index) => (
          <Input
            key={index}
            type="file"
            name="documents"
            onChange={(e) => handleDocumentChange(index, e.target.files[0])}
          />
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => onChange("documents", [...formData.documents, null])}
        >
          Add Document
        </Button>
      </div>
      <div className="space-y-2">
        <Label>English proficiency</Label>
        <RadioGroup
          value={formData.englishProficiency}
          onValueChange={(value) => onChange("englishProficiency", value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="native" id="native" />
            <Label htmlFor="native">Native/Bilingual Proficiency</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="working" id="working" />
            <Label htmlFor="working">Working Proficiency</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="limited" id="limited" />
            <Label htmlFor="limited">Limited Proficiency</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex justify-between">
        <Button onClick={prevStep} variant="outline">
          Back
        </Button>
        <Button onClick={onSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default Step5;
