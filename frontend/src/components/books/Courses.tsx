



import React, { useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import BookCard from './BookCard';
import bgImage from '../../assets/logo/dash.avif';

const courses = [
  { title: "Project Management", file: "/book/Project_Management.pdf" },
  { title: "Advanced Embedded Systems", file: "/book/Advanced-Embedded-Systems.pdf" },
  { title: "CYBER SECURITY", file: "/book/CYBER SECURITY.pdf" },
  { title: "Applied Mathematics III", file: "/book/M-III.pdf" },
  { title: "English III", file: "/book/Essential-English.pdf" },
  { title: "DevOps", file: "/book/Learning DevOps.pdf" },
  { title: "Applied Physics III", file: "/book/Applied Physics.pdf" },
  { title: "Network Security", file: "book/ComputerAnd_Network_Security.pdf" },
];

const Books: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // When user clicks a book, open it
  const openBook = (file: string) => {
    setSelectedFile(file);
  };

  // Exit book view
  const exitBook = () => {
    setSelectedFile(null);
  };

  return (
    <div
      className="flex h-screen font-poppins bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Sidebar />
      <div className="flex-1 bg-white bg-opacity-70">
        <Navbar />
        <div className="p-8">
          <h1 className="text-xl text-blue-700 font-bold mb-4">Favorite books</h1>

          {!selectedFile && (
            <div>
              <h3 className="text-xl mb-2 text-blue-700">Recommended book</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {courses.map((course, index) => (
                  <div
                    key={index}
                    onClick={() => openBook(course.file)}
                    className="cursor-pointer"
                  >
                    <BookCard title={course.title} file={course.file} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedFile && (
            <div className="mt-8">
              <button
                onClick={exitBook}
                className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Exit Book
              </button>
              <iframe
                src={selectedFile}
                width="100%"
                height="600px"
                title="Book Reader"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;
