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
export function LoginForm() {
  const { setAuth, persist, setPersist } = useAuth();
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
        JSON.stringify({ user: email, pwd: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ email, password, roles, accessToken });
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (error) {
      // Handle the error here
      // console.error("Login failed", error);
      toast.error(
        "Login failed: ",
        error.response.data.message || "Unknown error"
      );
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="text-4xl font-bold mb-8 text-orange-600"> ChesEd</h1>
      <Card className="mx-auto max-w-sm">
        <Toaster />
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email and password below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
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
            <Link to="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
