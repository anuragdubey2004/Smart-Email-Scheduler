import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      
      <PublicNavbar />
      
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        
        <div className="bg-white p-12 rounded-2xl shadow-xl flex flex-col items-center max-w-2xl text-center border border-gray-100">
          <img src={logo} alt="App Logo" className="w-48 mb-8 rounded-2xl shadow-md" />
          
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Welcome to Smart Email</h1>
          <p className="text-lg text-gray-500 mb-10">Schedule emails effortlessly with secure background processing and real-time tracking</p>
          
          <div className="flex gap-4">
            <Link to="/login" className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-8 py-3 rounded-lg shadow-sm transition-all border border-gray-200">
              Log In
            </Link>
            <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg shadow-md transition-all">
              Create Account
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;