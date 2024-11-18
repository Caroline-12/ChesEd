import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";

const CATEGORIES_URL = "/categories";

const MAX_WORDS = 300; // Maximum allowed words

const Step2 = ({ formData, onChange, nextStep, prevStep }) => {
  const { auth } = useAuth();
  const [categories, setCategories] = useState([]);
  const [teachingExperienceWordCount, setTeachingExperienceWordCount] = useState(0);
  const [interestsWordCount, setInterestsWordCount] = useState(0);

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

  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  const handleTextChange = (field, value, setWordCount) => {
    const words = value.trim().split(/\s+/).filter(Boolean); // Split by whitespace and filter out empty strings
    const wordCount = words.length;
  
    if (wordCount <= MAX_WORDS) {
      setWordCount(wordCount);
      onChange(field, value);
    } else {
      toast.error(`Maximum word limit reached (${MAX_WORDS})`);
      // Allow users to delete text if the limit is reached
      const trimmedValue = words.slice(0, MAX_WORDS).join(" ");
      setWordCount(MAX_WORDS);
      onChange(field, trimmedValue);
    }
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
    onChange={(e) =>
      handleTextChange("teachingExperience", e.target.value, setTeachingExperienceWordCount)
    }
    placeholder="Enter your teaching and tutoring experience"
  />
  <p className="text-sm text-gray-500">
    {teachingExperienceWordCount}/{MAX_WORDS} words
  </p>
</div>

<div className="space-y-2">
  <Label htmlFor="interests">
    Tell us about yourself. What are your interests outside of school?
  </Label>
  <Textarea
    id="interests"
    value={formData.interests}
    onChange={(e) =>
      handleTextChange("interests", e.target.value, setInterestsWordCount)
    }
    placeholder="Enter your interests"
  />
  <p className="text-sm text-gray-500">
    {interestsWordCount}/{MAX_WORDS} words
  </p>
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
