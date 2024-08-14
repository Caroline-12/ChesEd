import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Users from "../Users";
import Navbar from "../Navbar";
import { CreateCourse } from "./CreateCourse";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const Admin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleRedirectToCreateCourse = () => {
    navigate("/create-course");
  };

  return (
    <>
      <Navbar />
      <section className="flex flex-col justify-center items-center p-4">
        <h1 className="text-2xl font-bold mb-4">Admins Page</h1>
        <Button onClick={handleRedirectToCreateCourse} variant="outline">
          Create Course
        </Button>
        <div className="my-4">
          <Users />
        </div>

        <div className="mt-4">
          <Button
            onClick={navigate("/")}
            className="text-blue-500 hover:underline"
          >
            Home
          </Button>
        </div>
      </section>
    </>
  );
};

export default Admin;
