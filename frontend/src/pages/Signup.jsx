import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import API from '../api';

const Signup = () => {
  const [user_name, setUser_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); 
    setMessage(''); 
    
    try {
      const response = await API.post('/signup', {
        name: user_name,
        email: email,
        password: password
      });
      
      setIsError(false);
      setMessage('Signup successful! Taking you to login...');
      setTimeout(() => navigate('/login'), 2000);
      
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.detail || 'Something went wrong');
    }
  };

  return (
    // 1. The clean background with NO invisible walls
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      {/* 2. The Navbar stretching across the top */}
      <PublicNavbar />
      
      {/* 3. The inner box that pushes your form to the middle */}
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 w-full max-w-md">
          <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-800">Create an Account</h2>
          <p className="text-gray-500 text-center mb-8">Join SmartEmail today.</p>
          
          <form onSubmit={handleSignup} className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                value={user_name}
                onChange={(e) => setUser_name(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600 mb-1">Email Address</label>
              <input 
                type="email" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600 mb-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                required
              />
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition-all mt-2">
              Sign Up
            </button>
          </form>
          
          {message && (
            <div className={`mt-6 p-3 rounded-lg text-center font-semibold ${isError ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
              {message}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Signup;