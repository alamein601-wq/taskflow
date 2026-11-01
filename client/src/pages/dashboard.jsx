<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TaskFlow AI - Smart Tasks • Better Life</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Font: Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'sans-serif'],
          },
          colors: {
            brand: {
              green: '#22c55e',
              neon: '#00ff66',
              dark: '#030712',
              card: '#090f24',
              border: '#1e293b',
              blue: '#0ea5e9'
            }
          }
        }
      }
    }
  </script>
  
  <style>
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #030712;
    }
    ::-webkit-scrollbar-thumb {
      background: #1e293b;
      border-radius: 9999px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #22c55e;
    }
    .glow-green {
      box-shadow: 0 0 20px rgba(34, 197, 94, 0.35);
    }
    .card-hover {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .card-hover:hover {
      transform: translateY(-5px) scale(1.015);
      box-shadow: 0 14px 35px -10px rgba(34, 197, 94, 0.4);
    }
    /* Google Translate Widget Styling */
    .goog-te-banner-frame.skiptranslate { display: none !important; }
    body { top: 0px !important; }
    #google_translate_element select {
      background-color: #0d1630;
      color: white;
      border: 1px solid #1e293b;
      padding: 6px 12px;
      border-radius: 9999px;
      font-size: 12px;
      outline: none;
      cursor: pointer;
    }
  </style>
</head>
<body class="bg-[#030712] text-white font-sans antialiased min-h-screen overflow-x-hidden selection:bg-[#22c55e] selection:text-black">

  <div id="app" class="flex h-screen overflow-hidden">

    <!-- ==================== SIDEBAR (Desktop & Mobile Drawer) ==================== -->
    <aside id="sidebar" class="fixed lg:static inset-y-0 left-0 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 flex flex-col w-[260px] bg-[#070c1e] border-r border-[#1e293b]/70 flex-shrink-0 z-50 justify-between select-none">
      <div>
        <!-- Brand Logo Header -->
        <div class="p-5 border-b border-[#1e293b]/60 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="relative w-11 h-11 bg-gradient-to-br from-black to-[#09182b] rounded-xl border border-[#22c55e]/40 flex items-center justify-center shadow-lg group overflow-hidden">
              <div class="absolute inset-0 bg-[#22c55e]/20 blur-md group-hover:bg-[#22c55e]/40 transition-all"></div>
              <svg class="w-8 h-8 relative z-10 text-[#22c55e]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 25H85V38H58V85H42V38H15V25Z" fill="#22c55e"/>
                <path d="M55 25L75 45H60L40 25H55Z" fill="#0ea5e9"/>
                <path d="M35 55L65 85H50L20 55H35Z" fill="#22c55e"/>
                <circle cx="50" cy="50" r="8" fill="#ffffff"/>
              </svg>
            </div>
            <div class="flex flex-col">
              <span class="text-xl font-extrabold tracking-tight text-white flex items-center">
                TaskFlow <span class="text-[#22c55e] ml-1">AI</span>
              </span>
              <span class="text-[10px] text-slate-400 font-medium tracking-tight">Find Work. Grow Your Life.</span>
            </div>
          </div>
          <!-- Close button for mobile -->
          <button onclick="toggleSidebar()" class="lg:hidden text-slate-400 hover:text-white text-lg">✕</button>
        </div>

        <!-- Sidebar Links -->
        <nav class="p-3 space-y-1.5 font-semibold text-sm">
          <a href="#" class="flex items-center space-x-3 bg-[#22c55e] text-black font-bold px-4 py-3 rounded-xl shadow-lg glow-green transition-all duration-200">
            <svg class="w-5 h-5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            <span>Dashboard</span>
          </a>

          <a href="javascript:void(0)" onclick="openModule('Find Jobs Worldwide')" class="flex items-center space-x-3 text-slate-300 hover:bg-[#101935] hover:text-white px-4 py-2.5 rounded-xl transition-all group">
            <svg class="w-5 h-5 text-slate-400 group-hover:text-[#22c55e] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <span>Find Jobs</span>
          </a>

          <a href="javascript:void(0)" onclick="openModule('Remote Work Online')" class="flex items-center space-x-3 text-slate-300 hover:bg-[#101935] hover:text-white px-4 py-2.5 rounded-xl transition-all group">
            <svg class="w-5 h-5 text-slate-400 group-hover:text-[#22c55e] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span>Remote Work</span>
          </a>

          <a href="javascript:void(0)" onclick="openModule('Freelance Marketplace')" class="flex items-center space-x-3 text-slate-300 hover:bg-[#101935] hover:text-white px-4 py-2.5 rounded-xl transition-all group">
            <svg class="w-5 h-5 text-slate-400 group-hover:text-[#22c55e] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/>
            </svg>
            <span>Freelance Market</span>
          </a>

          <a href="javascript:void(0)" onclick="openModule('Create CV & Resume')" class="flex items-center space-x-3 text-slate-300 hover:bg-[#101935] hover:text-white px-4 py-2.5 rounded-xl transition-all group">
            <svg class="w-5 h-5 text-slate-400 group-hover:text-[#22c55e] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            <span>My CV & Profile</span>
          </a>

          <a href="javascript:void(0)" onclick="openModule('Career Growth Planner')" class="flex items-center space-x-3 text-slate-300 hover:bg-[#101935] hover:text-white px-4 py-2.5 rounded-xl transition-all group">
            <svg class="w-5 h-5 text-slate-400 group-hover:text-[#22c55e] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
            <span>Career Planner</span>
          </a>

          <a href="javascript:void(0)" onclick="openModule('Hiring & Recruitment')" class="flex items-center space-x-3 text-slate-300 hover:bg-[#101935] hover:text-white px-4 py-2.5 rounded-xl transition-all group">
            <svg class="w-5 h-5 text-slate-400 group-hover:text-[#22c55e] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            <span>Hiring & Recruiters</span>
          </a>

          <a href="javascript:void(0)" onclick="openModule('Verified Job Sites')" class="flex items-center space-x-3 text-slate-300 hover:bg-[#101935] hover:text-white px-4 py-2.5 rounded-xl transition-all group">
            <svg class="w-5 h-5 text-slate-400 group-hover:text-[#22c55e] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <span>Trusted Sites</span>
          </a>
        </nav>
      </div>

      <!-- Bottom Premium Button -->
      <div class="p-4 border-t border-[#1e293b]/60">
        <button onclick="openModule('Premium Experience')" class="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500/20 via-[#22c55e]/20 to-emerald-500/20 hover:from-amber-500/30 hover:to-emerald-500/30 border border-[#22c55e]/40 text-[#22c55e] font-bold px-4 py-3 rounded-xl transition-all shadow-md group">
          <span class="text-base group-hover:scale-125 transition-transform">👑</span>
          <span class="text-xs uppercase tracking-wider font-extrabold text-white">Premium Experience</span>
        </button>
      </div>
    </aside>

    <!-- Sidebar Backdrop for mobile -->
    <div id="sidebarBackdrop" onclick="toggleSidebar()" class="fixed inset-0 bg-black/50 z-40 hidden lg:hidden"></div>


    <!-- ==================== MAIN CONTENT ==================== -->
    <main class="flex-1 flex flex-col h-full overflow-y-auto bg-[#030712] relative">

      <!-- TOP STICKY HEADER -->
      <header class="px-4 lg:px-8 py-3.5 bg-[#070c1e]/90 backdrop-blur-md border-b border-[#1e293b]/60 flex items-center justify-between sticky top-0 z-30 gap-4">
        
        <div class="flex items-center space-x-3 flex-1 max-w-2xl">
          <!-- Mobile Menu Toggle Button -->
          <button onclick="toggleSidebar()" class="lg:hidden p-2 rounded-xl bg-[#0d1630] border border-[#1e293b] text-slate-300 hover:text-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

          <!-- Global Search Bar -->
          <div class="relative w-full">
            <div class="relative flex items-center">
              <span class="absolute left-4 text-slate-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </span>
              <input 
                id="searchInput"
                type="text" 
                placeholder="Search jobs, skills or companies..." 
                class="w-full bg-[#0d1630] border border-[#1e293b] hover:border-slate-600 focus:border-[#22c55e] text-sm text-white placeholder-slate-400 rounded-full pl-11 pr-12 py-2.5 transition-all outline-none"
              />
              <button onclick="toggleVoiceSearch()" id="micBtn" class="absolute right-4 text-slate-400 hover:text-[#22c55e] transition-colors" title="Voice Search">
                🎙️
              </button>
            </div>
          </div>
        </div>

        <!-- Controls: Language Selector, Notifications & User Profile -->
        <div class="flex items-center space-x-3 sm:space-x-4">
          
          <!-- Google Auto Language Translator Widget -->
          <div id="google_translate_element" title="Change Language"></div>

          <button class="relative p-2.5 rounded-full bg-[#0d1630] border border-[#1e293b] hover:border-[#22c55e] transition-all text-slate-300 hover:text-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#070c1e]">2</span>
          </button>

          <!-- User Avatar & Profile Bar -->
          <div class="flex items-center space-x-3 pl-2 border-l border-[#1e293b]/80 cursor-pointer group" onclick="openModule('User Profile & Account')">
            <div class="relative w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#22c55e] to-cyan-500">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
                alt="Md Alamin" 
                class="w-full h-full object-cover rounded-full border border-black"
              />
              <span class="absolute bottom-0 right-0 w-3 h-3 bg-[#22c55e] rounded-full border-2 border-[#070c1e]"></span>
            </div>
            <div class="hidden sm:flex flex-col">
              <span class="text-sm font-bold text-white group-hover:text-[#22c55e] transition-colors flex items-center gap-1">
                Md Alamin
                <svg class="w-4 h-4 text-slate-400 group-hover:text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </header>


      <!-- MAIN CONTAINER -->
      <div class="p-4 lg:p-6 space-y-5 max-w-[1600px] mx-auto w-full">

        <!-- 1. HERO BANNER SECTION -->
        <div class="relative bg-gradient-to-r from-[#061838] via-[#092248] to-[#041126] border border-[#0ea5e9]/40 rounded-2xl p-6 md:p-8 overflow-hidden shadow-2xl">
          <div class="absolute -right-10 -top-20 w-96 h-96 bg-[#0ea5e9]/20 rounded-full blur-3xl pointer-events-none"></div>
          <div class="absolute left-1/3 -bottom-20 w-80 h-80 bg-[#22c55e]/15 rounded-full blur-3xl pointer-events-none"></div>
          
          <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div class="space-y-4 max-w-2xl text-center lg:text-left">
              <div class="inline-flex items-center space-x-2 bg-[#0ea5e9]/20 border border-[#0ea5e9]/40 text-[#0ea5e9] text-xs font-bold px-3.5 py-1.5 rounded-full">
                <span class="w-2 h-2 rounded-full bg-[#0ea5e9] animate-ping"></span>
                <span>GLOBAL CAREER AI ECOSYSTEM</span>
              </div>
              
              <h1 class="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                TaskFlow <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#22c55e] via-cyan-400 to-[#0ea5e9]">AI</span> 
                <span class="text-slate-300 font-light mx-2">|</span> 
                Your Dream Job is Just a <span class="text-[#22c55e] underline underline-offset-4 decoration-wavy">Click</span> Away!
              </h1>

              <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <div class="flex items-center space-x-1.5 bg-[#070c1e]/80 border border-[#22c55e]/30 px-3 py-1.5 rounded-full text-xs font-semibold text-white">
                  <span class="text-[#22c55e]">✓</span> <span>Find Jobs</span>
                </div>
                <div class="flex items-center space-x-1.5 bg-[#070c1e]/80 border border-[#22c55e]/30 px-3 py-1.5 rounded-full text-xs font-semibold text-white">
                  <span class="text-[#22c55e]">✓</span> <span>Work Online</span>
                </div>
                <div class="flex items-center space-x-1.5 bg-[#070c1e]/80 border border-[#22c55e]/30 px-3 py-1.5 rounded-full text-xs font-semibold text-white">
                  <span class="text-[#22c55e]">✓</span> <span>Grow Your Career</span>
                </div>
              </div>
            </div>

            <!-- Hero Illustration Card -->
            <div class="relative w-full max-w-sm flex justify-center lg:justify-end">
              <div class="relative w-64 h-40 rounded-2xl bg-gradient-to-tr from-[#0b2447]/90 to-[#193a6f]/90 border border-[#0ea5e9]/40 p-4 shadow-2xl flex flex-col justify-between overflow-hidden">
                <div class="flex justify-between items-start">
                  <div>
                    <span class="text-[10px] text-cyan-300 font-bold tracking-widest uppercase">AI MATCHING ENGINE</span>
                    <h4 class="text-base font-extrabold text-white">Remote Specialist</h4>
                  </div>
                  <span class="bg-[#22c55e]/20 text-[#22c55e] text-[10px] font-black px-2 py-1 rounded">98% Match</span>
                </div>

                <div class="flex items-center justify-between pt-4">
                  <div class="flex -space-x-2">
                    <span class="w-7 h-7 rounded-full bg-blue-500 border-2 border-[#070c1e] flex items-center justify-center text-[10px] font-bold">US</span>
                    <span class="w-7 h-7 rounded-full bg-purple-500 border-2 border-[#070c1e] flex items-center justify-center text-[10px] font-bold">UK</span>
                    <span class="w-7 h-7 rounded-full bg-emerald-500 border-2 border-[#070c1e] flex items-center justify-center text-[10px] font-bold">EU</span>
                  </div>
                  <button onclick="openModule('AI Job Matcher')" class="bg-[#22c55e] hover:bg-[#1eb155] text-black font-extrabold text-xs px-3.5 py-2 rounded-lg shadow transition-all">
                    Apply Now ➔
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>


        <!-- 2. QUICK CATEGORY PILLS (7 White Cards) -->
        <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          
          <div onclick="openModule('Find Jobs Worldwide')" class="bg-white text-slate-900 rounded-xl p-3 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group">
            <div class="flex items-center justify-between mb-2">
              <span class="text-2xl p-1.5 bg-blue-50 rounded-lg">💼</span>
              <span class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs group-hover:scale-110 transition-transform">➔</span>
            </div>
            <span class="text-xs font-bold leading-snug group-hover:text-blue-600 transition-colors">Find Jobs Worldwide</span>
          </div>

          <div onclick="openModule('Remote Online Work')" class="bg-white text-slate-900 rounded-xl p-3 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group">
            <div class="flex items-center justify-between mb-2">
              <span class="text-2xl p-1.5 bg-cyan-50 rounded-lg">💻</span>
              <span class="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center text-xs group-hover:scale-110 transition-transform">➔</span>
            </div>
            <span class="text-xs font-bold leading-snug group-hover:text-cyan-600 transition-colors">Remote Online Work</span>
          </div>

          <div onclick="openModule('Freelance Marketplace')" class="bg-white text-slate-900 rounded-xl p-3 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group">
            <div class="flex items-center justify-between mb-2">
              <span class="text-2xl p-1.5 bg-emerald-50 rounded-lg">🤝</span>
              <span class="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs group-hover:scale-110 transition-transform">➔</span>
            </div>
            <span class="text-xs font-bold leading-snug group-hover:text-emerald-600 transition-colors">Freelance Marketplace</span>
          </div>

          <div onclick="openModule('Create CV & Profile')" class="bg-white text-slate-900 rounded-xl p-3 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group">
            <div class="flex items-center justify-between mb-2">
              <span class="text-2xl p-1.5 bg-indigo-50 rounded-lg">📄</span>
              <span class="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs group-hover:scale-110 transition-transform">➔</span>
            </div>
            <span class="text-xs font-bold leading-snug group-hover:text-indigo-600 transition-colors">Create CV & Profile</span>
          </div>

          <div onclick="openModule('Career Planner')" class="bg-white text-slate-900 rounded-xl p-3 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group">
            <div class="flex items-center justify-between mb-2">
              <span class="text-2xl p-1.5 bg-violet-50 rounded-lg">📈</span>
              <span class="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs group-hover:scale-110 transition-transform">➔</span>
            </div>
            <span class="text-xs font-bold leading-snug group-hover:text-violet-600 transition-colors">Career Planner</span>
          </div>

          <div onclick="openModule('Hiring & Recruiters')" class="bg-white text-slate-900 rounded-xl p-3 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group">
            <div class="flex items-center justify-between mb-2">
              <span class="text-2xl p-1.5 bg-pink-50 rounded-lg">👥</span>
              <span class="w-6 h-6 rounded-full bg-pink-600 text-white flex items-center justify-center text-xs group-hover:scale-110 transition-transform">➔</span>
            </div>
            <span class="text-xs font-bold leading-snug group-hover:text-pink-600 transition-colors">Hiring & Recruiters</span>
          </div>

          <div onclick="openModule('Trusted Job Sites')" class="bg-white text-slate-900 rounded-xl p-3 shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between group col-span-2 sm:col-span-1">
            <div class="flex items-center justify-between mb-2">
              <span class="text-2xl p-1.5 bg-emerald-50 rounded-lg">🛡️</span>
              <span class="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs group-hover:scale-110 transition-transform">➔</span>
            </div>
            <span class="text-xs font-bold leading-snug group-hover:text-emerald-600 transition-colors">Trusted Job Sites</span>
          </div>

        </div>


        <!-- 3. TRUSTED GLOBAL JOB PLATFORMS BANNER -->
        <div class="bg-[#0b132b] border border-[#1e293b] rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-lg">
          <div class="flex items-center space-x-2 text-[#22c55e] font-black text-xs sm:text-sm">
            <span class="w-5 h-5 rounded-full bg-[#22c55e]/20 border border-[#22c55e] flex items-center justify-center text-[10px]">✓</span>
            <span class="uppercase tracking-wider">Trusted Global Job Platforms:</span>
          </div>

          <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-slate-300">
            <a href="https://linkedin.com" target="_blank" class="hover:text-[#22c55e] transition-colors">LinkedIn Jobs</a>
            <span class="text-slate-600">|</span>
            <a href="https://indeed.com" target="_blank" class="hover:text-[#22c55e] transition-colors">Indeed</a>
            <span class="text-slate-600">|</span>
            <a href="https://google.com/jobs" target="_blank" class="hover:text-[#22c55e] transition-colors">Google Jobs</a>
            <span class="text-slate-600">|</span>
            <a href="https://upwork.com" target="_blank" class="hover:text-[#22c55e] transition-colors">Upwork</a>
            <span class="text-slate-600">|</span>
            <a href="https://fiverr.com" target="_blank" class="hover:text-[#22c55e] transition-colors">Fiverr</a>
            <span class="text-slate-600">|</span>
            <a href="https://freelancer.com" target="_blank" class="hover:text-[#22c55e] transition-colors">Freelancer</a>
            <span class="text-slate-600">|</span>
            <a href="https://remoteok.com" target="_blank" class="hover:text-[#22c55e] transition-colors">Remote OK</a>
            <span class="text-slate-600">|</span>
            <a href="https://weworkremotely.com" target="_blank" class="hover:text-[#22c55e] transition-colors">We Work Remotely</a>
          </div>
        </div>


        <!-- 4. DYNAMIC GRAPHIC FEATURE CARDS (2x4 Grid) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" id="cardsGrid">

          <!-- Card 1 -->
          <div onclick="openModule('Find Jobs Worldwide')" class="card-hover bg-gradient-to-br from-[#061e47] via-[#0b2b63] to-[#04122d] border border-[#0ea5e9]/50 rounded-2xl p-5 relative overflow-hidden shadow-xl flex flex-col justify-between h-44 cursor-pointer">
            <div class="flex justify-between items-start z-10">
              <div class="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-3xl shadow-inner">🌐</div>
              <span class="text-[10px] font-bold text-cyan-300 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-500/30">GLOBAL</span>
            </div>
            <div class="z-10 mt-2">
              <h3 class="text-xl font-black text-white leading-tight">Find Jobs Worldwide</h3>
              <p class="text-xs text-cyan-200/80 font-medium">Explore Global Opportunities</p>
            </div>
            <div class="absolute -right-6 -bottom-6 w-28 h-28 bg-cyan-500/10 rounded-full blur-xl pointer-events-none"></div>
          </div>

          <!-- Card 2 -->
          <div onclick="openModule('Remote Work Online')" class="card-hover bg-gradient-to-br from-[#042820] via-[#094738] to-[#031c16] border border-[#22c55e]/50 rounded-2xl p-5 relative overflow-hidden shadow-xl flex flex-col justify-between h-44 cursor-pointer">
            <div class="flex justify-between items-start z-10">
              <div class="w-14 h-14 rounded-2xl bg-[#22c55e]/20 border border-[#22c55e]/40 flex items-center justify-center text-3xl shadow-inner">💻</div>
              <span class="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">REMOTE</span>
            </div>
            <div class="z-10 mt-2">
              <h3 class="text-xl font-black text-white leading-tight">Remote Work Online</h3>
              <p class="text-xs text-emerald-200/80 font-medium">Work From Anywhere</p>
            </div>
            <div class="absolute -right-6 -bottom-6 w-28 h-28 bg-[#22c55e]/10 rounded-full blur-xl pointer-events-none"></div>
          </div>

          <!-- Card 3 -->
          <div onclick="openModule('Freelance Marketplace')" class="card-hover bg-gradient-to-br from-[#091538] via-[#122863] to-[#060e26] border border-indigo-500/50 rounded-2xl p-5 relative overflow-hidden shadow-xl flex flex-col justify-between h-44 cursor-pointer">
            <div class="flex justify-between items-start z-10">
              <div class="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-3xl shadow-inner">🤝</div>
              <span class="text-[10px] font-bold text-indigo-300 bg-indigo-950/80 px-2.5 py-1 rounded-full border border-indigo-500/30">FREELANCE</span>
            </div>
            <div class="z-10 mt-2">
              <h3 class="text-xl font-black text-white leading-tight">Freelance Marketplace</h3>
              <p class="text-xs text-indigo-200/80 font-medium">Sell Your Skills</p>
            </div>
            <div class="absolute -right-6 -bottom-6 w-28 h-28 bg-indigo-500/10 rounded-full blur-xl pointer-events-none"></div>
          </div>

          <!-- Card 4 -->
          <div onclick="openModule('Create CV & Resume')" class="card-hover bg-gradient-to-br from-[#06242b] via-[#0d4654] to-[#041a20] border border-teal-400/50 rounded-2xl p-5 relative overflow-hidden shadow-xl flex flex-col justify-between h-44 cursor-pointer">
            <div class="flex justify-between items-start z-10">
              <div class="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-3xl shadow-inner">📝</div>
              <span class="text-[10px] font-bold text-teal-300 bg-teal-950/80 px-2.5 py-1 rounded-full border border-teal-500/30">CV BUILDER</span>
            </div>
            <div class="z-10 mt-2">
              <h3 class="text-xl font-black text-white leading-tight">Create CV & Resume</h3>
              <p class="text-xs text-teal-200/80 font-medium">Build Your Professional Profile</p>
            </div>
            <div class="absolute -right-6 -bottom-6 w-28 h-28 bg-teal-500/10 rounded-full blur-xl pointer-events-none"></div>
          </div>

          <!-- Card 5 -->
          <div onclick="openModule('Hiring & Recruitment')" class="card-hover bg-gradient-to-br from-[#08201a] via-[#104237] to-[#051713] border border-emerald-500/50 rounded-2xl p-5 relative overflow-hidden shadow-xl flex flex-col justify-between h-44 cursor-pointer">
            <div class="flex justify-between items-start z-10">
              <div class="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-3xl shadow-inner">🔍</div>
              <span class="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">RECRUITMENT</span>
            </div>
            <div class="z-10 mt-2">
              <h3 class="text-xl font-black text-white leading-tight">Hiring & Recruitment</h3>
              <p class="text-xs text-emerald-200/80 font-medium">Find the Right Talent</p>
            </div>
            <div class="absolute -right-6 -bottom-6 w-28 h-28 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"></div>
          </div>

          <!-- Card 6 -->
          <div onclick="openModule('Career Growth')" class="card-hover bg-gradient-to-br from-[#0a1845] via-[#122b7a] to-[#061030] border border-blue-500/50 rounded-2xl p-5 relative overflow-hidden shadow-xl flex flex-col justify-between h-44 cursor-pointer">
            <div class="flex justify-between items-start z-10">
              <div class="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-3xl shadow-inner">📊</div>
              <span class="text-[10px] font-bold text-blue-300 bg-blue-950/80 px-2.5 py-1 rounded-full border border-blue-500/30">GROWTH</span>
            </div>
            <div class="z-10 mt-2">
              <h3 class="text-xl font-black text-white leading-tight">Career Growth</h3>
              <p class="text-xs text-blue-200/80 font-medium">Reach Your Goals</p>
            </div>
            <div class="absolute -right-6 -bottom-6 w-28 h-28 bg-blue-500/10 rounded-full blur-xl pointer-events-none"></div>
          </div>

          <!-- Card 7 -->
          <div onclick="openModule('Verified Job Sites')" class="card-hover bg-gradient-to-br from-[#062612] via-[#0c4e25] to-[#041a0c] border border-[#22c55e]/50 rounded-2xl p-5 relative overflow-hidden shadow-xl flex flex-col justify-between h-44 cursor-pointer">
            <div class="flex justify-between items-start z-10">
              <div class="w-14 h-14 rounded-2xl bg-[#22c55e]/20 border border-[#22c55e]/40 flex items-center justify-center text-3xl shadow-inner">🛡️</div>
              <span class="text-[10px] font-bold text-green-300 bg-green-950/80 px-2.5 py-1 rounded-full border border-green-500/30">VERIFIED</span>
            </div>
            <div class="z-10 mt-2">
              <h3 class="text-xl font-black text-white leading-tight">Verified Job Sites</h3>
              <p class="text-xs text-green-200/80 font-medium">Safe & Trusted Links</p>
            </div>
            <div class="absolute -right-6 -bottom-6 w-28 h-28 bg-[#22c55e]/10 rounded-full blur-xl pointer-events-none"></div>
          </div>

          <!-- Card 8 -->
          <div onclick="openModule('TaskFlow Ecosystem')" class="card-hover bg-gradient-to-br from-[#04162e] via-[#092b59] to-[#020d1c] border border-cyan-500/50 rounded-2xl p-5 relative overflow-hidden shadow-xl flex flex-col justify-between h-44 cursor-pointer">
            <div class="flex justify-between items-start z-10">
              <div class="w-14 h-14 rounded-2xl bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center text-3xl shadow-inner">⚡</div>
              <span class="text-[10px] font-bold text-cyan-300 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-500/30">AI POWERED</span>
            </div>
            <div class="z-10 mt-2">
              <h3 class="text-xl font-black text-white leading-tight flex items-center">
                TaskFlow <span class="text-[#22c55e] ml-1">AI</span>
              </h3>
              <p class="text-xs text-cyan-200/80 font-medium">Find Work. Grow Your Life.</p>
            </div>
            <div class="absolute -right-6 -bottom-6 w-28 h-28 bg-cyan-400/10 rounded-full blur-xl pointer-events-none"></div>
          </div>

        </div>

      </div>

      <!-- 5. BOTTOM FOOTER WARNING BAR -->
      <footer class="mt-8 px-4 lg:px-8 py-3 bg-[#050a17] border-t border-[#1e293b]/80 flex flex-col md:flex-row items-center justify-between gap-4 sticky bottom-0 z-20">
        <div class="hidden sm:flex items-end space-x-1 h-5 opacity-70">
          <div class="w-1.5 h-3 bg-[#22c55e]/40 rounded-t-sm"></div>
          <div class="w-2 h-5 bg-[#22c55e]/80 rounded-t-sm"></div>
          <div class="w-1.5 h-2 bg-[#22c55e]/40 rounded-t-sm"></div>
          <div class="w-2.5 h-4 bg-[#22c55e]/60 rounded-t-sm"></div>
          <div class="w-2 h-6 bg-[#22c55e] rounded-t-sm"></div>
          <div class="w-1.5 h-3 bg-[#22c55e]/50 rounded-t-sm"></div>
        </div>

        <div class="flex items-center space-x-2 text-slate-300 text-xs font-semibold text-center">
          <span class="w-5 h-5 rounded-full bg-lime-500/20 text-lime-400 flex items-center justify-center text-xs font-bold">ⓘ</span>
          <span>External job links — verify each vacancy before applying</span>
        </div>

        <button onclick="openModule('Find Jobs')" class="inline-flex items-center space-x-2 bg-[#22c55e] hover:bg-[#1eb155] text-black font-extrabold text-xs px-4 py-2 rounded-full shadow-lg glow-green transition-all">
          <span>A Smarter Way to Find Work</span>
          <span class="text-sm">➔</span>
        </button>
      </footer>

    </main>

  </div>

  <!-- INTERACTIVE MODAL DIALOGUE -->
  <div id="moduleModal" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
    <div class="bg-[#090f24] border border-[#22c55e]/50 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
      <h3 id="modalTitle" class="text-xl font-bold text-white mb-2">Module Title</h3>
      <p id="modalDesc" class="text-sm text-slate-300 mb-6">TaskFlow AI Module loading sequence initiated...</p>
      <div class="flex justify-end space-x-3">
        <button onclick="closeModal()" class="px-4 py-2 rounded-xl bg-[#1e293b] text-white text-xs font-bold hover:bg-slate-700">Close</button>
        <button onclick="closeModal()" class="px-4 py-2 rounded-xl bg-[#22c55e] text-black text-xs font-bold hover:bg-[#1eb155]">Launch Module</button>
      </div>
    </div>
  </div>

  <!-- GOOGLE TRANSLATE SCRIPT -->
  <script type="text/javascript">
    function googleTranslateElementInit() {
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'bn,en,ar,es,hi,zh-CN,fr,de,ja,ru',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false
      }, 'google_translate_element');
    }
  </script>
  <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>

  <!-- JAVASCRIPT INTERACTION LOGIC -->
  <script>
    // Sidebar Toggle for Mobile View
    function toggleSidebar() {
      const sidebar = document.getElementById('sidebar');
      const backdrop = document.getElementById('sidebarBackdrop');
      sidebar.classList.toggle('-translate-x-full');
      backdrop.classList.toggle('hidden');
    }

    // Search Interactivity Fix
    const searchInput = document.getElementById('searchInput');
    const cardsGrid = document.getElementById('cardsGrid');

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const cards = cardsGrid.children;
      Array.from(cards).forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });

    // Modal Interaction
    function openModule(name) {
      document.getElementById('modalTitle').innerText = name;
      document.getElementById('modalDesc').innerText = `Opening dynamic TaskFlow AI module: ${name}. All AI tools and sub-modules are ready!`;
      document.getElementById('moduleModal').classList.remove('hidden');
    }

    function closeModal() {
      document.getElementById('moduleModal').classList.add('hidden');
    }

    // Voice Input Toggle Simulation
    function toggleVoiceSearch() {
      const micBtn = document.getElementById('micBtn');
      micBtn.classList.add('text-red-500', 'animate-pulse');
      searchInput.placeholder = "Listening... Speak now";
      setTimeout(() => {
        micBtn.classList.remove('text-red-500', 'animate-pulse');
        searchInput.placeholder = "Search jobs, skills or companies...";
        searchInput.value = "Remote Frontend Developer";
        searchInput.dispatchEvent(new Event('input'));
      }, 2500);
    }
  </script>
</body>
</html>
