import React, { useEffect, useState } from "react";
import Button from "../components/button/button";
import Navbar from "../components/navbar/Navbar";
import Pagination from "../components/pagination/Pagination";
import Sidebar from "../components/sidebar/Sidebar";
import { axios } from "../utils/axios.config";
import bgImage from "../assets/logo/dash.avif"; // Adjust the path as necessary

// Define the Book interface
export interface Book {
  id: string;
  name: string;
  author: string;
  publisher: string;
  publicationYear: string;
  subject: string;
}

const Dashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]); // State to store all books
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]); // State to store filtered books
  const [currentPage, setCurrentPage] = useState(1); // State to store current page number
  const [totalPages, setTotalPages] = useState(1); // State to store total number of pages
  const [currentBooks, setCurrentBooks] = useState<Book[]>([]); // State to store books on the current page
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term
  const booksPerPage = 5; // Number of books per page

  // Handle search functionality
  const handleSearch = () => {
    if (searchTerm) {
      // Filter books based on search term
      const filtered = books.filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredBooks(filtered);
      setCurrentPage(1);
      setTotalPages(Math.ceil(filtered.length / booksPerPage));
    } else {
      setFilteredBooks(books);
      setTotalPages(Math.ceil(books.length / booksPerPage));
    }
  };

  // Update currentBooks when currentPage or filteredBooks changes
  useEffect(() => {
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    setCurrentBooks(filteredBooks.slice(indexOfFirstBook, indexOfLastBook));
  }, [currentPage, filteredBooks]);

  // Fetch books from the API when the component mounts
  useEffect(() => {
    (async () => {
      const res = await axios.get("/books/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setBooks(res.data.data);
      setFilteredBooks(res.data.data);
      setTotalPages(Math.ceil(res.data.data.length / booksPerPage));
    })();
  }, []);

  return (
    <div
      className="flex h-screen font-poppins bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Sidebar />
      <div className="flex-1 bg-white bg-opacity-70">
        <Navbar />
        <div className="md:flex p-5 items-center justify-between">
          <span className="text-blue-700 font-poppins font-black mb-4">
            RCA Library Management
          </span>
          <div className="flex items-center space-x-4">
            {/* Search input */}
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-4 py-2 rounded"
            />
            <Button onClick={handleSearch} className="bg-gray-900">
              Search
            </Button>
          </div>
        </div>
        <div className="mx-10 mt-6 border border-slate-100 rounded-lg overflow-hidden">
          <table className="w-full text-[12px] md:text-md lg:text-lg">
            <thead className="bg-slate-50">
              <tr>
                <th className="py-5 px-4 text-left">ID</th>
                <th className="py-5 px-2 text-left">Name</th>
                <th className="py-5 px-2 text-left">Author</th>
                <th className="py-5 text-left">Publisher</th>
                <th className="py-5 px-2 text-left">Publication Year</th>
                <th className="py-5 px-2 text-left">Subject</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through currentBooks and display each book */}
              {currentBooks.map((book) => (
                <tr key={book.id} className="text-gray-800 border-b">
                  <td className="py-5 px-4">{book.id}</td>
                  <td className="py-5 px-2">{book.name}</td>
                  <td className="py-5 px-2">{book.author}</td>
                  <td className="py-5">{book.publisher}</td>
                  <td className="py-5 px-2">{book.publicationYear}</td>
                  <td className="py-5 px-2">{book.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
