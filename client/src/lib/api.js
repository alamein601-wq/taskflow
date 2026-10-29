import axios from 'axios';

const api = axios.create({
  baseURL: 'https://taskflow-ai-backend-be18.onrender.com/api', // আপনার রিয়েল ব্যাকএন্ড লিংক
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

