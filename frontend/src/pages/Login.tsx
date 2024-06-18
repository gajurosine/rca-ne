import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../components/Input";
import Button from "../components/button/button";
import { axios } from "../utils/axios.config";
import toast from "react-hot-toast";
import logo from "../assets/logo/rcalogo.jpeg"; // Adjust the path as necessary
import bgImage from "../assets/logo/backlib.jpg"; // Adjust the path as necessary

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(""); // State for error message
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate(); // Hook to navigate to different routes

  // Handle login form submission
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (!email || !password) {
        throw new Error("Please fill in all fields.");
      }

      // Send login request to the server
      const response = await axios.post("/auth/login", { email, password });
      if (response.status !== 200) {
        console.log(response);
        setError(response.data.message);
      }

      // Store token and user name in localStorage
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("name", response.data.data.user.firstName);
      toast.success("Login successful!");

      navigate("/dashboard"); // Navigate to the dashboard page

    } catch (error: any) {
      if (error.name === "AxiosError") {
        toast.error("Internal server error");
        setError(error.response.data.message || "Something went wrong");
      } else {
        toast.error("Internal server error");
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Logo" className="h-16 mb-12" /> {/* Logo Image */}
          <h1 className="text-2xl font-bold text-center">Login</h1>
          <p className="text-sm text-gray-900 text-center">Hello, Welcome back!</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email input field */}
          <Input
            _controller={{
              value: email,
              setValue: setEmail,
              initialValue: "",
            }}
            label="Email"
            type="text"
            placeholder="Email address"
          />
          {/* Password input field */}
          <Input
            _controller={{
              value: password,
              setValue: setPassword,
              initialValue: "",
            }}
            label="Password"
            type="password"
            placeholder="Enter password"
          />
          {/* Display error message if any */}
          {error && <p className="text-blue-900 text-sm">{error}</p>}
          <div className="mt-4">
            <p className="text-sm text-gray-900">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-900 underline hover:text-gray-900 "
              >
                Sign Up
              </Link>
            </p>
          </div>
          {/* Login button */}
          <Button className="bg-gray-900 h-12 mb-2 w-36">{loading ? "Loading..." : "Login"}</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
