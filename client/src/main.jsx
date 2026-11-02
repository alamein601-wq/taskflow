import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './lib/i18n'; // <-- রেন্ডারের আগে i18n অবশ্যই ইম্পোর্ট থাকতে হবে
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

