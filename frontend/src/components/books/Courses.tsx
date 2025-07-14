import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import BookCard from './BookCard';
import bgImage from '../../assets/logo/rcalogo.jpeg'; // Adjust the path as necessary

// Array of course titles to be displayed as book cards
const courses = [
  { title: "Project Management", file: "/books" },
  { title: "Advanced Embedded Systems", file: "/books/embedded_systems.pdf" },
  { title: "Software Engineering II", file: "/books/software_eng.pdf" },
  { title: "Applied Mathematics III", file: "/books/math3.pdf" },
  { title: "English III", file: "/books/english3.pdf" },
  { title: "DevOps", file: "frontend/src/components/books/Engineering-DevOps.pdf" },
  { title: "Applied Physics III", file: "frontend/src/components/books/Engineering-DevOps.pdf" },
  { title: "Network Security", file: "/books/network_security.pdf" },
];

const Books: React.FC = () => {   
  return (
    <div
      className="flex h-screen font-poppins bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Sidebar component */}
      <Sidebar />
      <div className="flex-1 bg-white bg-opacity-70">
        {/* Navbar component */}
        <Navbar />
        <div className="p-8">
          {/* Page title */}
          <h1 className="text-xl text-blue-700 font-bold mb-4">Favorite books</h1>
          
          <div>
            {/* Section title */}
            <h3 className="text-xl mb-2 text-blue-700">Recommended book</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Map through the courses array and render a BookCard for each course */}
              {courses.slice(0, 8).map((course, index) => (
                <BookCard key={index} title={course} />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Books;
