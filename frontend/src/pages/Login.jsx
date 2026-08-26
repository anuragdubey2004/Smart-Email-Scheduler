import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import API from '../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false); 
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    
    try {
      const formData = new URLSearchParams();
      formData.append('username', email); 
      formData.append('password', password);

      const response = await API.post('/login', formData, {
        withCredentials: true 
      });
      
      setIsError(false);
      setMessage('Login successful! Welcome back.');
      setTimeout(() => navigate('/dashboard'), 2000);
      
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.detail || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      <PublicNavbar />
      
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 w-full max-w-md">
          <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 text-center mb-8">Please enter your details to sign in.</p>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
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
              Log In
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

export default Login;