import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; 

const PublicNavbar = () => {
  return (
    <div className="w-full flex items-center justify-between p-4 bg-white border-b shadow-sm">
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-12 w-auto scale-300 origin-left mt-4" />
        <span className="text-xl text-gray-800 font-bold ml-20 tracking-wide">SmartEmail</span>
      </Link>
      
      <div className="flex gap-6 items-center">
        <Link to="/login" className="font-semibold text-gray-600 hover:text-blue-600 transition-colors">
          Log In
        </Link>
        <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition-all shadow-sm">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default PublicNavbar;