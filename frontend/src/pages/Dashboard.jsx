import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ComposeModel from '../components/ComposeModel';
import DashboardNavbar from '../components/DashboardNavbar';
import EmailDetailModel from '../components/EmailDetailModel'; 
import API from '../api';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const [userName, setUserName] = useState('User');
  const [emails, setEmails] = useState([]);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('inbox'); 
  
  const [selectedEmail, setSelectedEmail] = useState(null);

  const fetchEmails = async (tabToFetch) => {
    try {
      const endpoint = tabToFetch === 'inbox' ? '/inbox' : '/scheduled';
      const response = await API.get(endpoint);
      setEmails(response.data);
    } catch (error) {
      console.error("Could not fetch emails", error);
    }
  };

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const userRes = await API.get('/verify-session', { withCredentials: true });
        setUserName(userRes.data.name);
      } catch (error) {
        navigate('/login');
      }
    };
    fetchSessionData();
  }, [navigate]);

  useEffect(() => {
    fetchEmails(activeTab);
    setSelectedEmail(null); 
  }, [activeTab]);

  const handleLogout = async () => {
    try {
      await API.post('/logout', {}, { withCredentials: true });
      navigate('/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const displayedEmails = emails.filter((email) => {
    const isSent = new Date(email.send_time + 'Z') <= new Date();
    if (activeTab === 'inbox') {
      return isSent; 
    }
    return true; 
  });

  return (
    <div className="h-screen w-full flex flex-col bg-white font-sans relative overflow-hidden text-gray-800">
      <DashboardNavbar userName={userName} onLogout={handleLogout} />

      <div className="flex flex-1 overflow-hidden pt-2">
    
        <div className="w-64 pr-4 flex flex-col gap-2">
          <div className="px-2 mb-4">
            <button 
              onClick={() => setIsComposeOpen(true)}
              className="bg-[#c2e7ff] text-[#001d35] font-medium py-4 px-6 rounded-2xl w-36 hover:shadow-md transition-all flex items-center justify-center gap-2 ml-2"
            >
              <span className="text-xl">✎</span> Compose
            </button>
          </div>
          
          <div onClick={() => setActiveTab('inbox')} className={`pl-6 py-1.5 rounded-r-full font-bold cursor-pointer text-sm flex justify-between items-center ${activeTab === 'inbox' ? 'bg-[#d3e3fd] text-[#041e49]' : 'text-gray-600 hover:bg-gray-100'}`}>
            <span>Inbox</span>
          </div>

          <div onClick={() => setActiveTab('scheduled')} className={`pl-6 py-1.5 rounded-r-full font-bold cursor-pointer text-sm flex justify-between items-center ${activeTab === 'scheduled' ? 'bg-[#d3e3fd] text-[#041e49]' : 'text-gray-600 hover:bg-gray-100'}`}>
            <span>Scheduled Mail</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-white rounded-2xl mr-4 mt-2">
          <div className="flex flex-col">
            {displayedEmails.length === 0 ? (
              <p className="p-8 text-center text-gray-500 mt-10">Nothing to see here!</p>
            ) : (
              displayedEmails.map((email) => {
                const isSent = new Date(email.send_time + 'Z') <= new Date();

                return (
                  <div 
                    key={email.id} 
                    onClick={() => setSelectedEmail(email)}
                    className="flex items-center border-b border-gray-100 py-2.5 px-4 hover:shadow-md cursor-pointer text-sm group bg-[#f2f6fc]/50"
                  >
                    <div className="flex items-center gap-4 w-[250px]">
                      {activeTab === 'scheduled' && (
                        isSent ? (
                          <span className="text-green-500 font-bold text-xl shadow-sm bg-white rounded">☑</span>
                        ) : (
                          <span className="text-red-500 font-bold text-2xl mt-[-4px] shadow-sm bg-white rounded">☐</span>
                        )
                      )}
                      <span className="text-gray-300 text-lg cursor-pointer hover:text-gray-500" onClick={(e) => e.stopPropagation()}>☆</span>
                      <span className="font-bold truncate text-gray-900">
                        {activeTab === 'scheduled' ? `To: ${email.to_email}` : email.from_email}
                      </span>
                    </div>

                    <div className="flex-1 truncate text-gray-500 px-4">
                      <span className="font-bold text-gray-800">{email.subject}</span>
                      <span className="mx-2">-</span>
                      {email.body}
                    </div>

                    <div className="w-24 text-right text-xs font-bold text-gray-900">
                      {new Date(email.send_time + 'Z').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <ComposeModel 
        isOpen={isComposeOpen} 
        onClose={() => setIsComposeOpen(false)} 
        refreshEmails={() => fetchEmails(activeTab)} 
      />
      
      <EmailDetailModel 
        email={selectedEmail} 
        onClose={() => setSelectedEmail(null)} 
        activeTab={activeTab}
      />
      
    </div>
  );
};

export default Dashboard;