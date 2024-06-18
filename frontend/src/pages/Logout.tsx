import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Logout component to handle user logout
export const Logout = () => {

  const navigate = useNavigate(); // Hook to navigate to different routes

  useEffect(() => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Navigate to the login page
    navigate("/login");
  }, [navigate]); // Dependency array to ensure useEffect runs once

};
