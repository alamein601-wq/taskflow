
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/landing-page';
import { LoginPage } from './pages/login-page';
import { SignupPage } from './pages/signup-page';
import Dashboard from './pages/dashboard.jsx';
import AboutPage from './pages/about-page.jsx';
import AIChat from './components/AIChat';
import './App.css';
import { useEffect } from 'react';
import Navbar from './components/layout/navbar.jsx';
import Footer from './components/layout/footer.jsx';
import PrivacyPage from './pages/privacy-page';
import TermsPage from './pages/terms-page';
import NotFound from './pages/not-found';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

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

        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
