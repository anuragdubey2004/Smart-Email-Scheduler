const EmailDetailModel = ({ email, onClose, activeTab }) => {
  if (!email) return null;

  const displayEmail = activeTab === 'scheduled' ? email.to_email : email.from_email;
  
  const displayName = displayEmail.split('@')[0];
  
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
      
      <div className="bg-white w-[70vw] h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
        
        <div className="flex items-center gap-6 p-3 px-5 border-b border-gray-100 text-gray-600">
          <button 
            onClick={onClose} 
            className="hover:bg-gray-100 p-2 rounded-full text-xl font-bold" 
            title="Go back"
          >
            ←
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 lg:px-16">
          <h2 className="text-2xl font-normal text-gray-900 mb-8">
            {email.subject}
          </h2>

          <div className="flex justify-between items-start mb-8">
            <div className="flex gap-4 items-center">
              
              <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
                {avatarLetter}
              </div>
              
              <div className="flex flex-col">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-gray-900 text-sm">{displayName}</span>
                  <span className="text-xs text-gray-500">&lt;{displayEmail}&gt;</span>
                </div>
                <span className="text-xs text-gray-500 mt-0.5">
                  {activeTab === 'scheduled' ? `To: ${email.to_email}` : 'to me'}
                </span>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 font-medium mt-1">
              {new Date(email.send_time).toLocaleString()}
            </div>
          </div>

          <div className="text-gray-800 text-sm whitespace-pre-wrap leading-relaxed mt-4">
            {email.body}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDetailModel;