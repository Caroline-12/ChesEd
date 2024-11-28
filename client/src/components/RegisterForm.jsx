import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import useAuth from "@/hooks/useAuth";
import axios from "../api/axios";
const REGISTER_URL = "/register";

export function RegisterForm() {
  const { setAuth } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Regular expression for password validation (at least 8 characters)
    const passwordRegex = /^.{8,}$/;
    return passwordRegex.test(password);
  };

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    setIsUsernameValid(newUsername !== "");
  };

  const handleFirstNameChange = (e) => {
    const newFirstName = e.target.value;
    setFirstName(newFirstName);
    setIsFirstNameValid(newFirstName !== ""); //  validation for empty field
  };

  const handleLastNameChange = (e) => {
    const newLastName = e.target.value;
    setLastName(newLastName);
    setIsLastNameValid(newLastName !== "");
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsPasswordValid(validatePassword(newPassword));
    setIsConfirmPasswordValid(newPassword === confirmPassword); // Re-validate confirm password
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setIsConfirmPasswordValid(newConfirmPassword === password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFirstNameValid) {
      toast.error("Please enter your first name", { color: "red" });
      return;
    } else if (!isLastNameValid) {
      toast.error("Please enter your last name", { color: "red" });
      return;
    } else if (!isEmailValid) {
      toast.error("Invalid email", { color: "red" });
      return;
    } else if (!isPasswordValid) {
      toast.error("Invalid password");
      return;
    } else if (!isConfirmPasswordValid) {
      toast.error("Passwords do not match");
      return;
    } else if (!isUsernameValid) {
      toast.error("Invalid username");
      return;
    }

    console.log(
      `Registering user... ${email} ${password} ${username} ${firstName} ${lastName}  `
    );

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          email,
          pwd: password,
          username,
          firstName,
          lastName,
          roles: { User: 2001 },
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));

      setEmail("");
      setPassword("");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error("Registration failed: " + error.response.data.message);
    }
  };

  // console.log(user);
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="text-4xl font-bold mb-8 text-orange-600"> ChesEd</h1>
      <Card className="mx-auto max-w-sm">
        <Toaster />
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={handleUsernameChange}
                required
              />
              {!isUsernameValid && (
                <div className="text-red-500">Invalid username</div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  required
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
                {!isFirstNameValid && (
                  <div className="text-red-500">
                    Please enter your first name
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  id="last-name"
                  required
                  value={lastName}
                  onChange={handleLastNameChange}
                />
                {!isLastNameValid && (
                  <div className="text-red-500">
                    Please enter your last name
                  </div>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {!isEmailValid && (
                <div className="text-red-500">Invalid email</div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={handlePasswordChange}
              />
              {!isPasswordValid && (
                <div className="text-red-500">Invalid Password</div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                {!isConfirmPasswordValid && (
                  <div className="text-red-500">Passwords do not match</div>
                )}
              </div>
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Create an account
            </Button>
            {/* <Button variant="outline" className="w-full">
              Sign up with GitHub
            </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to={"/login"} className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
