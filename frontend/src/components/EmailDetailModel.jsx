const EmailDetailModel = ({ email, onClose, activeTab }) => {
  // If no email is selected, do not show the modal
  if (!email) return null;

  // Decide which email address to show based on the tab
  const displayEmail = activeTab === 'scheduled' ? email.to_email : email.from_email;
  
  // Make a display name by taking everything before the '@' symbol
  const displayName = displayEmail.split('@')[0];
  
  // Take the first letter of the name for the colored avatar circle
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    // The dark see-through background
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
      
      {/* The big white email box */}
      <div className="bg-white w-[70vw] h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Top Toolbar (Back arrow) */}
        <div className="flex items-center gap-6 p-3 px-5 border-b border-gray-100 text-gray-600">
          <button 
            onClick={onClose} 
            className="hover:bg-gray-100 p-2 rounded-full text-xl font-bold" 
            title="Go back"
          >
            ←
          </button>
        </div>

        {/* Email Content Area */}
        <div className="flex-1 overflow-y-auto p-8 lg:px-16">
          {/* Subject */}
          <h2 className="text-2xl font-normal text-gray-900 mb-8">
            {email.subject}
          </h2>

          {/* Sender Info Row */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex gap-4 items-center">
              
              {/* Circular Avatar */}
              <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
                {avatarLetter}
              </div>
              
              {/* Names and Emails */}
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
            
            {/* Date and Time on the right */}
            <div className="text-xs text-gray-500 font-medium mt-1">
              {new Date(email.send_time).toLocaleString()}
            </div>
          </div>

          {/* Email Body */}
          <div className="text-gray-800 text-sm whitespace-pre-wrap leading-relaxed mt-4">
            {email.body}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailDetailModel;