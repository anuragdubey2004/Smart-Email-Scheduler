import logo from '../assets/logo.png';

const DashboardNavbar = ({ userName, onLogout }) => {
  return (
    <div className="w-full flex items-center justify-between p-4 bg-white border-b shadow-sm">
      
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-12 w-auto scale-300 origin-left mt-4" />
        <span className="text-xl text-gray-800 font-bold ml-20 tracking-wide">SmartEmail</span>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm font-medium">Welcome,</span>
          <span className="font-bold text-gray-800 text-lg">{userName}</span>
        </div>
        
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