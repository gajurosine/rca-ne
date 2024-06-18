import { UserCircleIcon } from '@heroicons/react/24/outline';
import logo from "../../assets/logo/rcalogo.jpeg"; // Adjust the path as necessary

// Navbar component to display a navigation bar
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-6 bg-white border-b border-text/20 mb-6">
      {/* Centered Logo */}
      <div className="flex-1 flex justify-center">
        <img src={logo} alt="Logo" className="h-10" /> {/* Adjust height as necessary */}
      </div>
      <div className="flex items-center">
        {/* Display the user's name from localStorage */}
        <span className="mr-4 text-text">{localStorage.getItem("name")}</span>
        {/* Display a user icon */}
        <UserCircleIcon width={26} className="text-text stroke-text" />
      </div>
    </nav>
  );
}
