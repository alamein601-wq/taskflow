import React, { useEffect, useState } from "react";
import api from "@/lib/api";

export default function Navbar() {
  const navigate = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
  const loggedIn = !!token;
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
  
  useEffect(() => {
    if (token) {
      api.get('/auth/profile', axiosConfig)
        .then(res => setUser(res.data.data.user))
        .catch(err => console.error('Error fetching profile:', err));
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const profileInitials = user && user.name 
    ? user.name.split(" ").map(name => name.charAt(0).toUpperCase()).join("") 
    : "S";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          
          {/* Logo Section */}
          <div className="flex items-center flex-1 min-w-0 mr-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center focus:outline-none group transition-all duration-300 hover:scale-105"
              aria-label="Go to home"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-[#22c55e] to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 overflow-hidden border border-emerald-500/30 mr-3">
                <img 
                  src="https://i.ibb.co/68zW895/logo.png" 
                  alt="TaskFlow AI Logo" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.currentTarget.parentElement.innerText = '⚡';
                  }}
                />
              </div>
              <span className="text-xl sm:text-2xl font-bold cursor-pointer bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-blue-300 transition-all duration-300 truncate">
                TaskFlow AI
              </span>
            </button>
          </div>

          {/* Right side - Auth buttons or User menu */}
          <div className="flex items-center space-x-2 sm:space-x-4 relative">
            {loggedIn && user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="relative w-8 h-8 sm:w-10 sm:h-10 cursor-pointer bg-blue-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold text-white transition-all duration-300 hover:scale-110 hover:bg-blue-700 focus:scale-110 focus:ring-4 focus:ring-blue-500/30 shadow-lg hover:shadow-xl"
                  aria-label="Open profile menu"
                >
                  <span className="relative z-10">{profileInitials}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-xl border border-gray-800/50 text-white shadow-2xl rounded-2xl py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-700/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          {profileInitials}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <p className="text-sm font-semibold leading-none text-white truncate">{user?.name}</p>
                          <p className="text-xs leading-none text-gray-400 mt-1 truncate">{user?.email}</p>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => { setDropdownOpen(false); navigate('/dashboard'); }} 
                      className="w-full flex items-center px-4 py-3 text-sm hover:bg-blue-600/20 hover:text-blue-300 font-medium transition-all text-left"
                    >
                      <span className="mr-3 text-blue-400">📊</span>
                      <span>Dashboard</span>
                    </button>

                    <div className="border-t border-gray-700/50 my-1"></div>

                    <button 
                      onClick={() => { setDropdownOpen(false); handleLogout(); }} 
                      className="w-full flex items-center px-4 py-3 text-sm text-red-400 hover:bg-red-500/20 hover:text-red-300 font-semibold transition-all text-left"
                    >
                      <span className="mr-3">🚪</span>
                      <span>Log out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <button 
                  onClick={() => navigate('/login')} 
                  className="text-gray-300 hover:text-white hover:bg-gray-800/50 px-3 sm:px-6 py-2 rounded-xl transition-all duration-300 font-medium text-sm sm:text-base"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => navigate('/signup')} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold hover:scale-105 text-sm sm:text-base"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
