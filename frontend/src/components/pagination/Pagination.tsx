import React from 'react';

interface PaginationProps {
  currentPage: number; // Current active page
  totalPages: number; // Total number of pages
  onPageChange: (page: number) => void; // Function to handle page change
}

// Pagination component to display pagination controls
const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  // Generate an array of page numbers
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-end px-10 mt-4">
      {/* Previous page button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-slate-50 text-text py-2 px-4 rounded-l disabled:bg-transparent disabled:text-gray-900"
      >
        Prev
      </button>

      {/* Page number buttons */}
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`py-2 px-4 rounded-lg ${currentPage === number ? 'bg-black border border-button hover:border hover:border-button hover:text-button hover:bg-white text-white' : 'bg-white text-black'}`}
        >
          {number}
        </button> 
      ))}

      {/* Next page button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-slate-50 text-black py-2 px-4 rounded-r"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
