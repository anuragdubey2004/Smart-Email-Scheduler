import logo from '../assets/logo.png';

const DashboardNavbar = ({ userName, onLogout }) => {
  return (
    // Added w-full and shadow-sm to match your PublicNavbar perfectly
    <div className="w-full flex items-center justify-between p-4 bg-white border-b shadow-sm">
      
      {/* Left side: Logo and Title */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-12 w-auto scale-300 origin-left mt-4" />
        {/* Updated text colors and tracking to match the professional style */}
        <span className="text-xl text-gray-800 font-bold ml-20 tracking-wide">SmartEmail</span>
      </div>
      
      {/* Right side: User Info and Logout Button */}
      <div className="flex items-center gap-6">
        {/* Added a friendly "Welcome," text to make it feel personalized */}
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm font-medium">Welcome,</span>
          <span className="font-bold text-gray-800 text-lg">{userName}</span>
        </div>
        
        {/* Upgraded from plain text to a beautiful, soft-red button */}
        <button 
          onClick={onLogout} 
          className="bg-red-50 hover:bg-red-100 text-red-600 px-5 py-2 rounded-lg font-semibold transition-all border border-red-100 shadow-sm"
        >
          Logout
        </button>
      </div>
      
    </div>
  );
};

export default DashboardNavbar;