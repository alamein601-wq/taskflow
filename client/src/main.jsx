import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './lib/i18n'; // <-- এটি ঠিক আছে (কমেন্ট বাদ দিয়ে শুধু ইম্পোর্ট রাখুন)
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
