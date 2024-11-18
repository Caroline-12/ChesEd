import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast, Toaster } from "sonner";
import useAuth from "@/hooks/useAuth";
import axios from "@/api/axios";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step3and4 from "./Step3and4";
import RegistrationProgress from "./RegistrationProgress";

const TUTOR_REGISTER_URL = "/register/tutor";

const TutorRegistrationForm = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
    specialization: [],
    teachingExperience: "",
    interests: "",
    strongestSubjects: [],
    documents: [],
    profilePhoto: null,
    governmentId: null,
    englishProficiency: "",
    roles: { Tutor: 1984 },
    tutorStatus: "pending",
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (name, file) => {
    setFormData({ ...formData, [name]: file });
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const onSubmit = async () => {
    try {

      const formDataToSend = new FormData();

      // Append all text fields
      Object.keys(formData).forEach((key) => {
        if (
          key !== "documents" &&
          key !== "file" &&
          key !== "governmentId" &&
          key !== "profilePhoto"
        ) {
          if (typeof formData[key] === "string") {
            formDataToSend.append(key, formData[key]);
          } else if (Array.isArray(formData[key])) {
            formData[key].forEach((item) => {
              formDataToSend.append(key, item);
            });
          } else if (
            typeof formData[key] === "object" &&
            formData[key] !== null
          ) {
            if (key === "roles") {
              // Stringify the roles object before appending
              formDataToSend.append(key, JSON.stringify(formData[key]));
            } else {
              formDataToSend.append(key, JSON.stringify(formData[key]));
            }
          }
        }
      });

      // Append file fields
      if (formData.profilePhoto) {
        formDataToSend.append("profilePhoto", formData.profilePhoto);
      }
      if (formData.governmentId) {
        formDataToSend.append("governmentId", formData.governmentId);
      }
      formData.documents.forEach((doc) => {
        if (doc) {
          formDataToSend.append("documents", doc);
        }
      });

      console.log("Sending form data: ", formDataToSend);

      const response = await axios.post(TUTOR_REGISTER_URL, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      console.log(response);
      toast.success("Registration successful!");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error in onSubmit:", error);
      toast.error(
        "Registration failed: " + error.response?.data?.message || error.message
      );
    }
  };

  // const onSubmit = async () => {
  //   try {
  //     // const formDataToSend = new FormData();

  //     // // Append all text fields
  //     // Object.keys(formData).forEach((key) => {
  //     //   if (
  //     //     typeof formData[key] === "string" ||
  //     //     formData[key] instanceof Blob
  //     //   ) {
  //     //     formDataToSend.append(key, formData[key]);
  //     //   } else if (Array.isArray(formData[key])) {
  //     //     formData[key].forEach((item, index) => {
  //     //       formDataToSend.append(`${key}[${index}]`, item);
  //     //     });
  //     //   }
  //     // });

  //     // // Append file fields
  //     // formData.documents.forEach((doc, index) => {
  //     //   formDataToSend.append(`documents[${index}]`, doc);
  //     // });
  //     // if (formData.file) {
  //     //   formDataToSend.append("file", formData.file);
  //     // }
  //     // // if (formData.governmentId) {
  //     // //   formDataToSend.append("governmentId", formData.governmentId);
  //     // // }
  //     // formDataToSend.append("roles", JSON.stringify({ Tutor: 1984 }));

  //     console.log("Sending form data: ", formData);

  //     const response = await axios.post(TUTOR_REGISTER_URL, formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //       withCredentials: true,
  //     });

  //     console.log(response);
  //     toast.success("Registration successful!");
  //     navigate("/login", { replace: true });
  //   } catch (error) {
  //     toast.error(
  //       "Registration failed: " + error.response?.data?.message || error.message
  //     );
  //   }
  // };

  const steps = [
    <Step1
      formData={formData}
      onChange={handleChange}
      nextStep={nextStep}
      key={currentStep}
    />,
    <Step2
      formData={formData}
      onChange={handleChange}
      nextStep={nextStep}
      prevStep={prevStep}
      key={currentStep}
    />,
    <Step3and4
      formData={formData}
      onChange={handleChange}
      onFileChange={handleFileChange}
      nextStep={nextStep}
      prevStep={prevStep}
      key={currentStep}
    />,
    <Step5
      formData={formData}
      onChange={handleChange}
      onFileChange={handleFileChange}
      prevStep={prevStep}
      onSubmit={onSubmit}
      key={currentStep}
    />,
  ];

  return (
    <div className="flex justify-center items-center min-h-screen flex-col p-4">
      <h1 className="text-4xl font-bold mb-8 text-orange-600">ChesEd</h1>
      <Card className="w-full max-w-md">
        <Toaster />
        <CardHeader>
          <CardTitle className="text-xl">Tutor Registration</CardTitle>
        </CardHeader>
        <div className="max-w-2xl mx-auto p-4">
          <RegistrationProgress
            currentStep={currentStep}
            totalSteps={steps.length}
          />
          <div className="mt-4">{steps[currentStep - 1]}</div>
        </div>
      </Card>
    </div>
  );
};

export default TutorRegistrationForm;
