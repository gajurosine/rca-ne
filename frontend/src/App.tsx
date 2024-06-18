import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../src/pages/Login';
import SignUp from "../src/pages/SignUp";
import Dashboard from './pages/Dashboard';
import Books from "./components/books/Courses";
import { Toaster } from "react-hot-toast";

// Main App component to define the routes and structure of the application
function App() {
  return (
    <div className='font-poppins text-sm'>
      {/* BrowserRouter to enable routing in the application */}
      <BrowserRouter>
        <Toaster /> {/* Toaster component to show toast notifications */}
        {/* Routes to define the different routes and their corresponding components */}
        <Routes>
          <Route path="/" element={<Login />} /> {/* Route for the login page */}
          <Route path="/dashboard" element={<Dashboard />} /> {/* Route for the dashboard page */}
          <Route path="/books" element={<Books />} /> {/* Route for the books page */}
          <Route path="/SignUp" element={<SignUp />} /> {/* Route for the sign-up page */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;