import { Link } from 'react-router-dom';
import logo from './assets/logo.png';

const Navbar = () => {
  return (
    <nav className="bg-gray-500 p-4 text-white flex justify-between items-center">
      <div>
        <Link to="/">
          <img src={logo} alt="App Logo" className="h-12 w-auto scale-280 origin-left" />
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        <Link to="/login" className="hover:text-blue-300">Login</Link>
        <Link to="/signup" className="hover:text-blue-300">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;