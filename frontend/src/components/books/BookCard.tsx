import React from 'react';

interface BookCardProps {
  title: string;
}

// BookCard component to display the title of the book
const BookCard: React.FC<BookCardProps> = ({ title }) => {
  return (
    <div className="bg-gray-900 text-white font-bold p-4 rounded-lg transform transition-transform duration-300 ease-in-out shadow-md hover:shadow-lg hover:scale-105">
      {title}
    </div>
  );
};

export default BookCard;
