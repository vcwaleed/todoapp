import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterTodos } from './todo/ToDoSlice';
import { FaLinkedin, FaCopyright } from 'react-icons/fa';

function VerticalNavbar() {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.todos.filter);

  const handleFilterChange = (newFilter) => {
    dispatch(filterTodos(newFilter));
  };

  return (
    <div className="flex flex-col h-full w-64 bg-gray-800 text-white">
      {/* Logo Section */}
      <div className='flex flex-row'>
        <div className="flex items-center justify-center h-16 w-16">
          <img src="logo2.png" alt="Your Logo" className="w-full h-full object-cover" />
        </div>
        <div className='mt-6'>
          Talha Waleed
        </div>
      </div>

      {/* Filter Options */}
      <div className="flex-grow mt-8">
        <button
          className={`block w-full text-left px-4 py-2 text-sm ${filter === 'ALL' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}
          onClick={() => handleFilterChange('ALL')}
        >
          All
        </button>
        <button
          className={`block w-full text-left px-4 py-2 text-sm ${filter === 'COMPLETED' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}
          onClick={() => handleFilterChange('COMPLETED')}
        >
          Completed
        </button>
        <button
          className={`block w-full text-left px-4 py-2 text-sm ${filter === 'INCOMPLETE' ? 'bg-blue-500' : 'hover:bg-gray-700'}`}
          onClick={() => handleFilterChange('INCOMPLETE')}
        >
          Incomplete
        </button>
      </div>

      {/* Copyright Icon */}
      <div className="flex items-center justify-center h-16 bg-gray-900 space-x-3">
        <FaCopyright className="text-xl" />
        <a
          href="https://www.linkedin.com/in/talha-waleed-6a379b210/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-white"
        >
          <FaLinkedin className="text-xl mr-2" />
          
        </a>
      </div>
    </div>
  );
}

export default VerticalNavbar;
