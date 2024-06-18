import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/Input';
import Button from '../components/button/button';
import { axios } from '../utils/axios.config';
import toast from 'react-hot-toast';
import bgImage from "../assets/logo/back.avif"; // Adjust the path as necessary

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState(''); // State for first name input
  const [lastName, setLastName] = useState(''); // State for last name input
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [error, setError] = useState(''); // State for error message
  const navigate = useNavigate(); // Hook to navigate to different routes
  const [loading, setLoading] = useState(false); // State for loading indicator

  // Handle sign-up form submission
  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!firstName || !lastName || !email || !password) {
        setError('Please fill in all fields.');
        return;
      }
      // Send sign-up request to the server
      const response = await axios.post("/auth/createUser", { firstName, lastName, email, password });
      if (response.status !== 200) {
        console.log(response);
        setError(response.data.message);
      }
      toast.success("Student registered successfully!")
      navigate('/'); // Navigate to the home page
    } catch (err: any) {
      if (err.name === "AxiosError") {
        setError(err.response.data.message || "Something went wrong");
        toast.error("Internal server error")
      } else {
        setError(err.message);
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
        <div className='flex flex-col items-start'>
          <h1 className="text-2xl font-bold text-center w-full">Sign Up here</h1>
          <p className="text-sm text-gray-600 mb-8 text-center w-full">Create account</p>
        </div>
        <form onSubmit={handleSignUp} className="space-y-6">
          {/* First Name input field */}
          <Input
            _controller={{
              value: firstName,
              setValue: setFirstName,
              initialValue: ''
            }}
            label='First Name'
            type='text'
            placeholder='Enter your first name'
          />
          {/* Last Name input field */}
          <Input
            _controller={{
              value: lastName,
              setValue: setLastName,
              initialValue: ''
            }}
            label='Last Name'
            type='text'
            placeholder='Enter your last name'
          />
          {/* Email input field */}
          <Input
            _controller={{
              value: email,
              setValue: setEmail,
              initialValue: ''
            }}
            label='Email'
            type='text'
            placeholder='Email address'
          />
          {/* Password input field */}
          <Input
            _controller={{
              value: password,
              setValue: setPassword,
              initialValue: ''
            }}
            label='Password'
            type='password'
            placeholder='Enter password'
          />
          {/* Display error message if any */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="mt-4">
            <p className="text-sm text-gray-600">Already have an account? <Link to="/" className="text-blue-900 underline hover:text-gray-900">Login</Link></p>
          </div>
          {/* Sign-Up button */}
          <Button disabled={loading} className="bg-gray-900 h-12 mb-2 w-36">{loading ? "Loading..." : "Sign up"}</Button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
