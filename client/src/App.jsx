import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Pages Import
import { LandingPage } from './pages/landing-page';
import LoginPage from './pages/login-page';
import SignupPage from './pages/signup-page';
import Dashboard from './pages/dashboard.jsx';
import AboutPage from './pages/about-page.jsx';
import PrivacyPage from './pages/privacy-page';
import TermsPage from './pages/terms-page';
import NotFound from './pages/not-found';

// Components Import
import AIChat from './components/AIChat';
import ShopDeals from './components/ShopDeals';
import Navbar from './components/layout/navbar.jsx';
import Footer from './components/layout/footer.jsx'; // 👈 Footer path corrected

import './App.css';

// ১. সুরক্ষিত রাউট (Protected Route Component)
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// ২. নেভবার ও ফুটার কন্ট্রোল লেআউট
function LayoutWrapper({ children }) {
  const location = useLocation();
  
  // ড্যাশবোর্ড ও এআই চ্যাট পেজে গ্লোবাল নেভবার/ফুটার হাইড রাখার জন্য
  const hideHeaderFooter = ['/dashboard', '/ai-chat'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white">
      {!hideHeaderFooter && <Navbar />}
      <main className="flex-1">{children}</main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  // ডার্ক থিম ডিফাইন করা
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Routes>
          {/* পাবলীক রাউটসমূহ */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/deals" element={<ShopDeals />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* প্রটেক্টেড বা সুরক্ষিত রাউটসমূহ */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ai-chat"
            element={
              <ProtectedRoute>
                <AIChat />
              </ProtectedRoute>
            }
          />

          {/* ৪০৪ নট ফাউন্ড রাউট */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
}

export default App;
