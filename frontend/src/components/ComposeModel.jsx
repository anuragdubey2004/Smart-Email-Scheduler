import { useState } from 'react';
import axios from 'axios';

const ComposeModal = ({ isOpen, onClose, refreshEmails }) => {
  const [toEmail, setToEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sendTime, setSendTime] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  if (!isOpen) return null;

  const handleSchedule = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      const utcTime = new Date(sendTime).toISOString();
      await axios.post('http://localhost:8000/schedule', {
        to_email: toEmail,
        subject: subject,
        body: body,
        send_time: utcTime
      }, { withCredentials: true });

      setIsError(false);
      setMessage('Email successfully scheduled!');
      
      refreshEmails();

      setTimeout(() => {
        onClose();
        setToEmail(''); setSubject(''); setBody(''); setSendTime(''); setMessage('');
      }, 1500);

    } catch (error) {
      setIsError(true);
      const errorDetail = error.response?.data?.detail;
      setMessage(Array.isArray(errorDetail) ? errorDetail[0].msg : (errorDetail || 'Failed to schedule.'));
    }
  };

  return (
    <div className="absolute bottom-0 right-0 w-[50vw] h-[80vh] bg-white rounded-tl-xl shadow-2xl border-t border-l border-gray-300 flex flex-col z-50">
      
      <div className="bg-gray-800 text-white p-3 rounded-tl-xl flex justify-between items-center">
        <span className="text-sm font-semibold">New Message</span>
        <button onClick={onClose} className="hover:bg-gray-600 px-2 rounded">✕</button>
      </div>
      
      <form onSubmit={handleSchedule} className="flex flex-col p-4 gap-3 h-full">
        <input type="email" placeholder="Recipients" value={toEmail} onChange={(e) => setToEmail(e.target.value)} className="border-b outline-none pb-1 text-sm" required />
        <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="border-b outline-none pb-1 text-sm font-semibold" required />
        
        <textarea placeholder="Message body..." value={body} onChange={(e) => setBody(e.target.value)} className="outline-none flex-1 resize-none text-sm mt-2" required />
        
        <div className="flex flex-col border-t pt-2 mt-2">
          <label className="text-xs text-gray-500 mb-1">Schedule Time:</label>
          <input type="datetime-local" value={sendTime} onChange={(e) => setSendTime(e.target.value)} className="border p-1 rounded text-sm w-full" required />
        </div>

        <div className="flex items-center gap-4 mt-2 mb-2">
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 text-sm">Schedule Send</button>
          {message && <span className={`text-xs font-bold ${isError ? 'text-red-500' : 'text-green-500'}`}>{message}</span>}
        </div>
      </form>
    </div>
  );
};

export default ComposeModal;