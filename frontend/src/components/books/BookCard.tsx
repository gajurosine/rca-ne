interface BookCardProps {
  title: string;
  file: string; // path to PDF or book file
}

const BookCard: React.FC<BookCardProps> = ({ title, file }) => {

  
  return (
    <a href={file} target="_blank" rel="noopener noreferrer">
      <div className="bg-white p-4 rounded shadow hover:bg-blue-100 cursor-pointer transition-all">
        <h3 className="text-md font-semibold text-blue-900">{title}</h3>
      </div>
    </a>
  );
};

export default BookCard;
