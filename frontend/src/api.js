import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://smart-email-backend-jv5o.onrender.com';

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
});

export default API;