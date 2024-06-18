import { ArrowLeftStartOnRectangleIcon, BookOpenIcon, UserIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Link } from 'react-router-dom';

// Sidebar component to display the navigation menu
const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-900 border-r border-text/10 flex flex-col justify-between h-screen">
      <div>
        <ul className="space-y-2 p-4">
          
          {/* Dashboard link */}
          <li>
            <Link to="/dashboard" className="flex items-center space-x-2 p-2 text-text rounded-md hover:bg-gray-100">
              <UserIcon width={20} className='stroke-text' />
              <span>Books</span> 
            </Link>
          </li>

          {/* Books link */}
          <li>
            <Link to="/books" className="flex items-center space-x-2 p-2 text-text rounded-md hover:bg-gray-100">
              <BookOpenIcon width={20} className='stroke-text' />
              <span>Subject</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Logout link */}
      <div className="p-4">
        <Link to="/" className="flex items-center text-text-red space-x-2 p-2 rounded-md hover:bg-gray-100">
          <ArrowLeftStartOnRectangleIcon width={20} className='stroke-text-red' />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
