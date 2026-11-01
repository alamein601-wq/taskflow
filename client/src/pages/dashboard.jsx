import React, { useState } from 'react';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState('');
  
  const [lang, setLang] = useState('bn');

  const content = {
    en: {
      tagline: 'Find Work. Grow Your Life.',
      dashboard: 'Dashboard',
      findJobs: 'Find Jobs',
      remoteWork: 'Remote Work',
      freelance: 'Freelance Market',
      myCv: 'My CV & Profile',
      careerPlanner: 'Career Planner',
      hiring: 'Hiring & Recruiters',
      trustedSites: 'Trusted Sites',
      premiumBtn: 'Premium Experience',
      placeholder: 'Search jobs worldwide...',
      welcome: 'WELCOME, ALAMIN',
      bannerBadge: 'Welcome Workspace',
      bannerHeading: 'Your Dream Job is Just a',
      bannerHighlight: 'Click Away!',
      platformTitle: 'Trusted Global Job Platforms:',
      ecosystemTitle: 'Explore TaskFlow Ecosystem',
      allServices: 'All Services',
      openModule: 'Open Module',
      footerWarning: 'External job links - verify before applying',
      footerSlogan: 'A Smarter Way to Find Work',
      speechErr: 'Could not understand. Try again.'
    },
    bn: {
      tagline: 'কাজ খুঁজুন। জীবনকে গড়ুন।',
      dashboard: 'ড্যাশবোর্ড',
      findJobs: 'চাকরি খুঁজুন',
      remoteWork: 'রিমোট ওয়ার্ক',
      freelance: 'ফ্রিল্যান্স মার্কেট',
      myCv: 'আমার সিভি ও প্রোফাইল',
      careerPlanner: 'ক্যারিয়ার প্ল্যানার',
      hiring: 'নিয়োগ ও রিক্রুটার',
      trustedSites: 'বিশ্বস্ত সাইটসমূহ',
      premiumBtn: 'প্রিমিয়াম অভিজ্ঞতা',
      placeholder: 'বিশ্বব্যাপী চাকরি খুঁজুন (বলুন বা লিখুন)...',
      welcome: 'স্বাগতম, আলামিন',
      bannerBadge: 'ওয়েলকাম ওয়ার্কস্পেস',
      bannerHeading: 'আপনার স্বপ্নের চাকরি মাত্র একটি',
      bannerHighlight: 'ক্লিকের দূরত্বে!',
      platformTitle: 'বিশ্বস্ত বৈশ্বিক চাকরি প্ল্যাটফর্ম:',
      ecosystemTitle: 'টাস্কফ্লো ইকোসিস্টেম অন্বেষণ করুন',
      allServices: 'সব সেবা সমূহ',
      openModule: 'মডিউল ওপেন করুন',
      footerWarning: 'বাহ্যিক চাকরির লিঙ্ক - যাচাই করে আবেদন করুন',
      footerSlogan: 'কাজ খোঁজার একটি SMART উপায়',
      speechErr: 'বুঝতে পারিনি। আবার চেষ্টা করুন।'
    }
  };

  const services = [
    { id: 1, title: lang === 'bn' ? 'বিশ্বব্যাপী চাকরি খুঁজুন' : 'Find Jobs Worldwide', icon: 'JOB', description: lang === 'bn' ? 'গ্লোবাল সুযোগ অন্বেষণ করুন' : 'Explore global opportunities', bg: 'from-blue-600 to-cyan-500', link: '/find-jobs' },
    { id: 2, title: lang === 'bn' ? 'অনলাইন রিমোট ওয়ার্ক' : 'Remote Work Online', icon: 'WEB', description: lang === 'bn' ? 'যেকোনো জায়গা থেকে কাজ করুন' : 'Work from anywhere', bg: 'from-indigo-600 to-purple-500', link: '/remote-work' },
    { id: 3, title: lang === 'bn' ? 'ফ্রিল্যান্স মার্কেটপ্লেস' : 'Freelance Marketplace', icon: 'DEV', description: lang === 'bn' ? 'আপনার দক্ষতা বিক্রি করুন' : 'Sell your expert skills', bg: 'from-emerald-600 to-teal-500', link: '/freelance' },
    { id: 4, title: lang === 'bn' ? 'সিভি ও রেজুমি তৈরি' : 'Create CV & Resume', icon: 'DOC', description: lang === 'bn' ? 'প্রফেশনাল প্রোফাইল গড়ুন' : 'Build your professional profile', bg: 'from-amber-500 to-orange-500', link: '/create-cv' },
    { id: 5, title: lang === 'bn' ? 'এআই ক্যারিয়ার অ্যাসিস্ট্যান্ট' : 'AI Career Assistant', icon: 'BOT', description: lang === 'bn' ? 'স্মার্ট চ্যাট ও টাস্ক সেটআপ' : 'Smart chat & task setup', bg: 'from-pink-600 to-rose-500', link: '/ai-assistant' },
    { id: 6, title: lang === 'bn' ? 'নিয়োগ ও নিয়োগকর্তা' : 'Hiring & Recruitment', icon: 'TEAM', description: lang === 'bn' ? 'সঠিক ট্যালেন্ট খুঁজে নিন' : 'Find the right talent', bg: 'from-violet-600 to-fuchsia-500', link: '/hiring' },
    { id: 7, title: lang === 'bn' ? 'ক্যারিয়ার গ্রোথ প্ল্যানার' : 'Career Growth Planner', icon: 'PLAN', description: lang === 'bn' ? 'ধাপে ধাপে লক্ষ্যে পৌঁছান' : 'Reach your goals step-by-step', bg: 'from-cyan-600 to-blue-500', link: '/career-growth' },
    { id: 8, title: lang === 'bn' ? 'যাচাইকৃত চাকরি ওয়েবসাইট' : 'Verified Job Websites', icon: 'SAFE', description: lang === 'bn' ? 'নিরাপদ ও বিশ্বস্ত লিঙ্ক' : 'Safe & trusted career links', bg: 'from-teal-600 to-emerald-500', link: '/verified-sites' },
    { id: 9, title: lang === 'bn' ? 'পিন্টারেস্ট ইন্সপিরেশন গ্যালারি' : 'Pinterest Gallery', icon: 'IMG', description: lang === 'bn' ? 'ডিজাইন ও কাজ আবিষ্কার' : 'Visual design & work discovery', bg: 'from-purple-600 to-pink-500', link: '/inspiration-gallery' },
    { id: 10, title: lang === 'bn' ? 'এআই IMAGE ও ব্যানার ক্রিয়েটর' : 'AI Image Creator', icon: 'ART', description: lang === 'bn' ? 'হাই-কোয়ালিটি ভিজ্যুয়াল তৈরি' : 'Generate high-quality visuals', bg: 'from-sky-500 to-blue-600', link: '/ai-banner-creator' },
    { id: 11, title: lang === 'bn' ? 'লোগো মেকার' : 'Logo Maker', icon: 'LOGO', description: lang === 'bn' ? 'ডাইনামিক সার্ভিস লোগো' : 'Create dynamic service logos', bg: 'from-orange-600 to-red-500', link: '/logo-maker' },
    { id: 12, title: lang === 'bn' ? 'অনলাইন স্কিল ও লার্নিং' : 'Skills & Learning', icon: 'EDU', description: lang === 'bn' ? 'জ্ঞান ও দক্ষতা বৃদ্ধি করুন' : 'Upgrade your knowledge pool', bg: 'from-indigo-500 to-blue-700', link: '/skills-learning' },
    { id: 13, title: lang === 'bn' ? 'আমার আবেদনসমূহ' : 'My Applications', icon: 'APP', description: lang === 'bn' ? 'আবেদনের স্ট্যাটাস ট্র্যাক করুন' : 'Track submitted job responses', bg: 'from-slate-600 to-slate-800', link: '/my-applications' },
    { id: 14, title: lang === 'bn' ? 'সংরক্ষিত চাকরি' : 'My Saved Jobs', icon: 'SAVE', description: lang === 'bn' ? 'পছন্দের তালিকায় দ্রুত অ্যাক্সেস' : 'Quick access to curated listings', bg: 'from-yellow-600 to-amber-500', link: '/saved-jobs' },
    { id: 15, title: lang === 'bn' ? 'আমার প্রোফাইল ও পোর্টফোলিও' : 'My Profile & Portfolio', icon: 'USER', description: lang === 'bn' ? 'অ্যাকাউন্ট ও রেজুমি পরিচালনা' : 'Manage accounts & resumes', bg: 'from-zinc-700 to-neutral-900', link: '/profile-portfolio' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    window.location.href = `/find-jobs?query=${encodeURIComponent(searchQuery)}&category=${selectedCategory}&lang=${lang}`;
  };

  const handleGlobalVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = lang === 'bn' ? 'bn-BD' : 'en-US';

    if (!isListening) {
      recognition.start();
      setIsListening(true);
      setSpeechError('');
    } else {
      recognition.stop();
      setIsListening(false);
    }

    recognition.onresult = (event) => {
      setSearchQuery(event.results.transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setSpeechError(content[lang].speechErr);
      setIsListening(false);
    };
  };

  return (
    <div className="flex h-screen bg-[#030712] text-white font-sans overflow-hidden">
      
      {/* Sidebar - hidden on mobile */}
      <div className="hidden lg:flex flex-col w-64 bg-[#090f24] border-r border-[#1e293b]/40 flex-shrink-0">
        <div className="p-5 flex items-center space-x-3 border-b border-[#1e293b]/40">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black">TF</div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-wider">TaskFlow AI</span>
            <span className="text-[10px] text-slate-400">{content[lang].tagline}</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <button className="w-full flex items-center space-x-3 bg-[#22c55e] text-black font-bold px-4 py-2 rounded-xl shadow-md">
            <span>Dashboard</span>
          </button>
        </nav>
      </div>

      {/* Main Body */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto bg-[#030712] pb-16 lg:pb-0">
        
        {/* Top Navbar */}
        <div className="px-4 py-3 bg-[#090f24]/80 backdrop-blur-md border-b border-[#1e293b]/40 flex flex-col sm:flex-row items-center justify-between gap-3 sticky top-0 z-50 w-full">
          <div className="w-full sm:flex-1 max-w-xl flex flex-col space-y-1">
            <form onSubmit={handleSearchSubmit} className="bg-[#0f172a] border border-[#1e293b] rounded-full px-4 py-1 flex items-center space-x-2 focus-within:border-[#22c55e] transition-all">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={content[lang].placeholder}
                className="flex-1 bg-transparent border-none outline-none text-white text-xs py-1.5"
              />
              <button
                type="button"
                onClick={handleGlobalVoiceInput}
                className={`p-1 rounded-full ${isListening ? 'text-red-500' : 'text-slate-400'}`}
              >
                MIC
              </button>
            </form>
          </div>

          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
            <div className="flex bg-[#0f172a] border border-[#1e293b] p-0.5 rounded-xl shadow-md">
              <button onClick={() => setLang('en')} className={`px-3 py-1 text-[11px] font-black rounded-lg ${lang === 'en' ? 'bg-[#22c55e] text-black' : 'text-slate-400'}`}>EN</button>
              <button onClick={() => setLang('bn')} className={`px-3 py-1 text-[11px] font-black rounded-lg ${lang === 'bn' ? 'bg-[#22c55e] text-black' : 'text-slate-400'}`}>বাংলা</button>
            </div>
            
            <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
