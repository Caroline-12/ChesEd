import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";

const CATEGORIES_URL = "/categories";

const Step2 = ({ formData, onChange, nextStep, prevStep }) => {
  const { auth } = useAuth();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(CATEGORIES_URL, {
          headers: { Authorization: `Bearer ${auth?.accessToken}` },
          withCredentials: true,
        });
        setCategories(response.data);
      } catch (error) {
        toast.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, [auth]);

  const handleSpecializationChange = (category) => {
    const newSpecialization = formData.specialization.includes(category)
      ? formData.specialization.filter((item) => item !== category)
      : [...formData.specialization, category];
    onChange("specialization", newSpecialization);
  };

  return (
    <div className="space-y-4">
      <Label>Specialization</Label>
      <div className="grid grid-cols-2 gap-2">
        {categories.map((category) => (
          <div key={category._id} className="flex items-center space-x-2">
            <Checkbox
              id={category._id}
              checked={formData.specialization.includes(category.name)}
              onCheckedChange={() => handleSpecializationChange(category.name)}
            />
            <label
              htmlFor={category._id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {category.name}
            </label>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Label htmlFor="teachingExperience">
          Describe your teaching and tutoring experience
        </Label>
        <Textarea
          id="teachingExperience"
          value={formData.teachingExperience}
          onChange={(e) => onChange("teachingExperience", e.target.value)}
          placeholder="Enter your teaching and tutoring experience"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="interests">
          Tell us about yourself. What are your interests outside of school?
        </Label>
        <Textarea
          id="interests"
          value={formData.interests}
          onChange={(e) => onChange("interests", e.target.value)}
          placeholder="Enter your interests"
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

export default Step2;
