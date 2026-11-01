import React, { useState, useEffect } from 'react';

const FindJobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobType, setJobType] = useState('All');
  const [isListening, setIsListening] = useState(false);
  const [lang, setLang] = useState('bn');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const initialJobs = [
    {
      id: 1,
      title: 'Remote Hotel Caretaker & Cleaner',
      company: 'Global Hospitality Inc.',
      location: 'Maldives / Remote',
      type: 'Full-time',
      source: 'LinkedIn',
      verified: true,
      link: 'https://www.linkedin.com/jobs'
    },
    {
      id: 2,
      title: 'Housekeeping & Maintenance Staff',
      company: 'Ocean Cruise Lines',
      location: 'Worldwide (Cruise)',
      type: 'Contract',
      source: 'Indeed',
      verified: true,
      link: 'https://www.indeed.com'
    },
    {
      id: 3,
      title: 'Frontend React Developer (Remote)',
      company: 'TaskFlow Tech',
      location: 'Remote (Global)',
      type: 'Full-time',
      source: 'Glassdoor',
      verified: true,
      link: 'https://www.glassdoor.com'
    }
  ];

  useEffect(() => {
    setJobs(initialJobs);
  }, []);

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('আপনার মোবাইলের ব্রাউজারে ভয়েস সার্চ সমর্থিত নয়। অনুগ্রহ করে Google Chrome ব্যবহার করুন।');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = lang === 'bn' ? 'bn-BD' : 'en-US';

    if (!isListening) {
      recognition.start();
      setIsListening(true);
    } else {
      recognition.stop();
      setIsListening(false);
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setIsListening(false);
      handleSearch(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };
  };

  const handleSearch = (queryToSearch) => {
    const query = queryToSearch !== undefined ? queryToSearch : searchQuery;
    setLoading(true);
    setTimeout(() => {
      const filtered = initialJobs.filter(job => 
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.location.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase())
      );
      setJobs(filtered);
      setLoading(false);
    }, 400);
  };

  const handlebKashRedirect = () => {
    const bKashAppUrl = "bkash://payment?merchant=01700000000&amount=500";
    const webFallback = "https://www.bkash.com";

    window.location.href = bKashAppUrl;

    setTimeout(() => {
      window.location.href = webFallback;
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white pb-24 font-sans">
      
      {/* টপ হেডার */}
      <div className="sticky top-0 z-40 bg-[#090f24]/90 backdrop-blur-md px-4 py-3 border-b border-[#1e293b]/50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xl">🔍</span>
          <h1 className="font-bold text-lg text-[#22c55e]">
            {lang === 'bn' ? 'গ্লোবাল জব সার্চ' : 'Global Job Search'}
          </h1>
        </div>
        <button 
          onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
          className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-xs font-semibold text-slate-300"
        >
          {lang === 'bn' ? 'EN' : 'বাংলা'}
        </button>
      </div>

      <div className="p-4 space-y-4 max-w-3xl mx-auto">
        
        {/* ভয়েস সার্চ ও টেক্সট সার্চ বক্স */}
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'bn' ? 'চাকরির পদ বা দেশ লিখুন...' : 'Search title, company, country...'}
            className="w-full bg-[#0f172a] border border-[#1e293b] rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#22c55e] text-white placeholder-slate-500 pr-24"
          />
          <div className="absolute right-2 flex items-center space-x-1">
            <button
              onClick={handleVoiceInput}
              className={`p-2 rounded-xl transition-all ${isListening ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-slate-800 text-slate-300'}`}
              title="Speak to Search"
            >
              🎤
            </button>
            <button
              onClick={() => handleSearch()}
              className="bg-[#22c55e] text-black px-3 py-2 rounded-xl font-bold text-xs"
            >
              {lang === 'bn' ? 'খুঁজুন' : 'Search'}
            </button>
          </div>
        </div>

        {/* ফিল্টার কুইক চিপস */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          {['All', 'Remote', 'Full-time', 'Contract', 'Hospitality'].map((type) => (
            <button
              key={type}
              onClick={() => setJobType(type)}
              className={`px-3 py-1.5 rounded-full border whitespace-nowrap font-medium ${
                jobType === type 
                  ? 'bg-[#22c55e] border-[#22c55e] text-black font-bold' 
                  : 'bg-[#0f172a] border-[#1e293b] text-slate-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* বিকাশ প্রিমিয়াম মেম্বারশিপ ব্যানার */}
        <div className="bg-gradient-to-r from-pink-950/60 to-rose-900/40 border border-pink-500/30 rounded-2xl p-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="bg-pink-500/20 text-pink-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              bKash Direct Pay
            </span>
            <h3 className="text-sm font-bold">
              {lang === 'bn' ? 'প্রিমিয়াম জব অ্যালার্ট আনলক করুন' : 'Unlock Premium Job Alerts'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'bn' ? 'সরাসরি বিকাশ অ্যাপ দিয়ে পেমেন্ট করুন' : 'Pay seamlessly via official bKash App'}
            </p>
          </div>
          <button
            onClick={handlebKashRedirect}
            className="bg-[#e2136e] hover:bg-[#c2105e] text-white px-3 py-2 rounded-xl font-bold text-xs flex items-center space-x-1 shadow-lg shrink-0"
          >
            <span>📱 বিকাশ</span>
          </button>
        </div>

        {/* চাকরির তালিকা */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            {lang === 'bn' ? 'উপলব্ধ চাকরির বিজ্ঞাপনসমূহ' : 'Available Job Vacancies'} ({jobs.length})
          </h2>

          {loading ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              {lang === 'bn' ? 'গুগল সোর্স থেকে তথ্য খোঁজা হচ্ছে...' : 'Fetching Google-powered job listings...'}
            </div>
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-4 space-y-3 hover:border-[#22c55e]/50 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-base text-white">{job.title}</h3>
                    <p className="text-xs text-slate-400">{job.company} • {job.location}</p>
                  </div>
                  {job.verified && (
                    <span className="bg-emerald-500/10 text-[#22c55e] border border-[#22c55e]/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      ✓ Verified
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-[#1e293b]/50">
                  <span className="bg-slate-800 px-2 py-1 rounded-md text-[11px]">
                    📍 Source: {job.source}
                  </span>
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#22c55e]/10 text-[#22c55e] hover:bg-[#22c55e] hover:text-black font-bold px-3 py-1.5 rounded-xl transition-all flex items-center space-x-1"
                  >
                    <span>{lang === 'bn' ? 'আবেদন করুন' : 'Apply Now'}</span>
                    <span>➔</span>
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-500 text-sm">
              {lang === 'bn' ? 'কোনো চাকরি পাওয়া যায়নি' : 'No job matching your search'}
            </div>
          )}
        </div>
      </div>

      {/* মোবাইল বটম ক্যাপসুল নেভিগেশন বার */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 bg-[#090f24]/95 border border-[#1e293b] backdrop-blur-lg px-6 py-2.5 rounded-full shadow-2xl flex items-center space-x-8 z-50">
        <a href="/dashboard" className="flex flex-col items-center text-slate-400 hover:text-white">
          <span className="text-lg">🏠</span>
          <span className="text-[10px] font-medium">{lang === 'bn' ? 'ড্যাশবোর্ড' : 'Home'}</span>
        </a>
        <a href="/find-jobs" className="flex flex-col items-center text-[#22c55e]">
          <span className="text-lg">💼</span>
          <span className="text-[10px] font-bold">{lang === 'bn' ? 'চাকরি' : 'Jobs'}</span>
        </a>
        <a href="/saved" className="flex flex-col items-center text-slate-400 hover:text-white">
          <span className="text-lg">🔖</span>
          <span className="text-[10px] font-medium">{lang === 'bn' ? 'সংরক্ষিত' : 'Saved'}</span>
        </a>
        <a href="/profile" className="flex flex-col items-center text-slate-400 hover:text-white">
          <span className="text-lg">👤</span>
          <span className="text-[10px] font-medium">{lang === 'bn' ? 'প্রোফাইল' : 'Profile'}</span>
        </a>
      </div>

    </div>
  );
};

export default FindJobs;
