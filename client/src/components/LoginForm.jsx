import { Link, useNavigate, useLocation } from "react-router-dom";
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
import { toast, Toaster } from "sonner";
import useAuth from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import axios from "../api/axios";
const LOGIN_URL = "/auth";
import emailjs from "@emailjs/browser";

export function LoginForm() {
  const { auth, setAuth, persist, setPersist, setIsLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
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

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsPasswordValid(validatePassword(newPassword));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isEmailValid) {
      toast.error("Invalid email", { color: "red" });
      return;
    } else if (!isPasswordValid) {
      toast.error("Invalid password");
      return;
    }

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, pwd: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data);
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      // console.log("roles", roles);
      const username = response?.data?.username;
      const ID = response?.data?.ID;
      const specialization = response?.data?.specialization;
      const tutorStatus = response?.data?.tutorStatus;
      const firstName = response?.data?.firstName;
      const lastName = response?.data?.lastName;
      const bio = response?.data?.bio;
      const profilePhoto = response?.data?.profilePhoto;
      const calendlyProfile = response?.data?.calendlyProfile;
      setAuth({
        ID,
        username,
        email,
        password,
        roles,
        accessToken,
        specialization,
        tutorStatus,
        firstName,
        lastName,
        bio,
        profilePhoto,
        calendlyProfile,
      });
      setIsLoggedIn(true);
      // console.log("Login successful", response?.data);
      toast.success("Login successful");
      localStorage.setItem("auth", JSON.stringify(auth));
      setEmail("");
      setPassword("");

      emailjs
        .sendForm(
          "service_n321785",
          "template_0niexsd",
          {
            user_email: "fidelotieno11@gmail.com",
            user_name: "Fideltodayy",
            message: "You have successfully logged in",
          },
          "dxYmFVX6N945DEO9m"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        )
        .finally(() => {
          console.log("Email sent");
        });

      // include logic to check if tutor is approved if not redirect to waiting lobby
      if (roles.includes(1984)) {
        if (tutorStatus === "pending") {
          navigate("/waiting-lobby", { replace: true });
        } else if (tutorStatus === "approved") {
          navigate("/tutor-dashboard", { replace: true });
        }
      } else if (roles.includes(5150)) {
        navigate("/admin-dashboard", { replace: true });
      } else {
        navigate("/student-dashboard", { replace: true });
      }
    } catch (error) {
      // Handle the error here
      toast.error("Login failed", error);
      // toast.error(
      //   "Login failed: ",
      //   error.response.data.message || "Unknown error"
      // );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  console.log(auth);
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 
        className="text-4xl font-bold mb-8 text-orange-600 cursor-pointer hover:text-orange-700" 
        onClick={() => navigate('/')}
      > 
        ChesEd
      </h1>
      <Card className="mx-auto max-w-sm">
        <Toaster />
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email and password below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4"
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={handleEmailChange}
              />
              {!isEmailValid && (
                <div className="text-red-500">Invalid email</div>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={handlePasswordChange}
              />
              {!isPasswordValid && (
                <div className="text-red-500">Invalid password</div>
              )}
            </div>
            <div className="">
              <input
                type="checkbox"
                id="persist"
                onChange={togglePersist}
                checked={persist}
              />
              <label htmlFor="persist">Trust This Device</label>
            </div>
            <Button type="submit" className="w-full " onClick={handleSubmit}>
              Login
            </Button>
            {/* <Button variant="outline" className="w-full">
            Login with Google
          </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
