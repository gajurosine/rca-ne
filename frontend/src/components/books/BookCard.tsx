interface BookCardProps {
  title: string;
  file: string;
  onClick?: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ title, onClick }) => {
  return (
    <div
      className="bg-white p-4 rounded shadow hover:bg-blue-100 cursor-pointer transition-all"
      onClick={onClick}
    >
      <h3 className="text-md font-semibold text-blue-900">{title}</h3>
    </div>
  );
};

export default BookCard;
