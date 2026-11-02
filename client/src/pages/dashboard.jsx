import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const initialTasks = [
  { id: 1, title: 'Complete React Dashboard Design', status: 'In Progress', category: 'Development' },
  { id: 2, title: 'Apply for jobs on LinkedIn and Indeed', status: 'Pending', category: 'Job Search' },
  { id: 3, title: 'Update Resume and Portfolio', status: 'Completed', category: 'Career' }
];

const cardsData = [
  { title: 'Find Jobs Worldwide', category: 'GLOBAL JOBS', icon: '🌐', desc: 'Explore jobs around the world', link: 'https://www.linkedin.com/jobs', color: 'from-blue-950 to-slate-900', border: 'border-blue-500/40' },
  { title: 'Remote Work Online', category: 'REMOTE', icon: '💻', desc: 'Work from anywhere', link: 'https://www.upwork.com', color: 'from-emerald-950 to-slate-900', border: 'border-emerald-500/40' },
  { title: 'Freelance Marketplace', category: 'FREELANCE', icon: '🤝', desc: 'Find freelance opportunities', link: 'https://www.fiverr.com', color: 'from-indigo-950 to-slate-900', border: 'border-indigo-500/40' },
  { title: 'Create CV & Resume', category: 'CV BUILDER', icon: '📝', desc: 'Build your professional CV', link: 'https://www.canva.com/resumes/', color: 'from-teal-950 to-slate-900', border: 'border-teal-500/40' },
  { title: 'Hiring & Recruitment', category: 'RECRUITMENT', icon: '🔍', desc: 'Discover recruitment platforms', link: 'https://www.indeed.com', color: 'from-green-950 to-slate-900', border: 'border-green-500/40' },
  { title: 'Career Growth', category: 'LEARNING', icon: '📊', desc: 'Learn skills and grow your career', link: 'https://www.coursera.org', color: 'from-blue-950 to-slate-900', border: 'border-blue-400/40' },
  { title: 'Verified Job Sites', category: 'JOB SEARCH', icon: '🛡️', desc: 'Explore trusted job resources', link: 'https://www.google.com/search?q=Google+Jobs', color: 'from-lime-950 to-slate-900', border: 'border-lime-500/40' },
  { title: 'TaskFlow AI', category: 'AI ECOSYSTEM', icon: '⚡', desc: 'Find Work. Grow Your Life.', link: '', color: 'from-cyan-950 to-slate-900', border: 'border-cyan-500/40' }
];

const sidebarItems = [
  { name: 'Dashboard', icon: '⌂' },
  { name: 'Find Jobs', icon: '🔎' },
  { name: 'Remote Work', icon: '💻' },
  { name: 'Freelance Market', icon: '🤝' },
  { name: 'Create CV & Resume', icon: '📄' },
  { name: 'Career Planner', icon: '📈' },
  { name: 'Hiring & Recruitment', icon: '👥' },
  { name: 'Trusted Sites', icon: '🛡️' }
];

export default function Dashboard() {
  const { i18n } = useTranslation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showLogo, setShowLogo] = useState(true);

  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('taskflow_dashboard_tasks');
      return saved ? JSON.parse(saved) : initialTasks;
    } catch {
      return initialTasks;
    }
  });

  useEffect(() => {
    localStorage.setItem('taskflow_dashboard_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const isBangla = i18n.language?.startsWith('bn');
  const text = (en, bn) => (isBangla ? bn : en);

  const openModule = (name) => {
    setActiveModal(name);
    setSidebarOpen(false);
  };

  const closeModal = () => setActiveModal(null);

  const handleAddTask = (event) => {
    event.preventDefault();
    const title = newTaskTitle.trim();
    if (!title) return;

    setTasks((previous) => [
      { id: Date.now(), title, status: 'Pending', category: 'General' },
      ...previous
    ]);
    setNewTaskTitle('');
  };

  const toggleTask = (id) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? { ...task, status: task.status === 'Completed' ? 'Pending' : 'Completed' }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((previous) => previous.filter((task) => task.id !== id));
  };

  const toggleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      window.alert(
        text(
          'Voice search is not supported in this browser. Try Google Chrome.',
          'এই ব্রাউজারে ভয়েস সার্চ কাজ করছে না। Google Chrome ব্যবহার করুন।'
        )
      );
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = isBangla ? 'bn-BD' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setIsListening(true);
    recognition.onresult = (event) => {
      setSearchQuery(event.results[0][0].transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    try {
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const filteredCards = cardsData.filter((card) =>
    `${card.title} ${card.desc} ${card.category}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const completedTasks = tasks.filter((task) => task.status === 'Completed').length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <div className="flex h-screen overflow-hidden bg-[#030712] font-sans text-white">
      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col justify-between border-r border-slate-800 bg-[#070c1e] transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between border-b border-slate-800 p-5">
            <div className="flex items-center gap-3">
              {showLogo ? (
                <img
                  src="/taskflow-logo.png"
                  alt="TaskFlow AI Logo"
                  onError={() => setShowLogo(false)}
                  className="h-12 w-12 rounded-xl border border-green-500/40 object-contain"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-green-500/40 bg-slate-900 text-2xl text-green-400">
                  ⚡
                </div>
              )}
              <div>
                <div className="text-xl font-black">
                  TaskFlow <span className="text-green-400">AI</span>
                </div>
                <p className="text-[10px] text-slate-400">Find Work. Grow Your Life.</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-xl text-slate-400 lg:hidden"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>
          <nav className="space-y-1 p-3">
            {sidebarItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => (index === 0 ? setSidebarOpen(false) : openModule(item.name))}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  index === 0
                    ? 'bg-green-500 text-black'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className="w-6 text-center text-lg">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </nav>
        </div>
        <div className="space-y-2 border-t border-slate-800 p-4">
          <button
            onClick={() => openModule('bKash Payment')}
            className="w-full rounded-xl bg-[#e2136e] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-pink-700"
          >
            ৳ bKash Pay / Donate
          </button>
          <button
            onClick={() => openModule('Premium Experience')}
            className="w-full rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm font-bold text-green-400 transition hover:bg-green-500/20"
          >
            👑 Premium Experience
          </button>
        </div>
      </aside>

      {/* MOBILE BACKDROP */}
      {sidebarOpen && (
        <button
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* MAIN AREA */}
      <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        {/* HEADER */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-slate-800 bg-[#070c1e]/95 px-4 py-3 backdrop-blur lg:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-lg lg:hidden"
              aria-label="Open menu"
            >
              ☰
            </button>
            <div className="relative w-full max-w-2xl">
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={text(
                  'Search jobs, skills or companies...',
                  'চাকরি, দক্ষতা বা কোম্পানি খুঁজুন...'
                )}
                className="w-full rounded-full border border-slate-700 bg-[#0d1630] py-3 pl-4 pr-12 text-sm text-white outline-none transition focus:border-green-500"
              />
              <button
                onClick={toggleVoiceSearch}
                title="Voice search"
                className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                  isListening ? 'animate-pulse text-red-500' : 'text-slate-400 hover:text-green-400'
                }`}
              >
                🎙️
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <select
              value={i18n.language?.startsWith('bn') ? 'bn' : 'en'}
              onChange={(event) => i18n.changeLanguage(event.target.value)}
              className="max-w-[105px] rounded-full border border-slate-700 bg-[#0d1630] px-2 py-2 text-xs text-white outline-none sm:px-3"
              aria-label="Select language"
            >
              <option value="en">English</option>
              <option value="bn">বাংলা</option>
            </select>
            <button onClick={() => openModule('User Profile')} className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-green-500 bg-slate-800 font-bold text-green-400">
                A
              </div>
              <span className="hidden text-sm font-bold sm:inline">My Account</span>
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="mx-auto w-full max-w-[1600px] flex-1 space-y-6 p-4 lg:p-7">
          {/* HERO */}
          <section className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-[#061838] via-[#092248] to-[#041126] p-6 shadow-xl md:p-9">
            <div className="pointer-events-none absolute -right-10 -top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-green-500/15 blur-3xl" />
            <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row">
              <div className="max-w-2xl text-center lg:text-left">
                <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-xs font-bold text-cyan-300">
                  🌐 GLOBAL CAREER AI ECOSYSTEM
                </span>
                <h1 className="mt-5 text-3xl font-black leading-tight md:text-5xl">
                  {text('Your Dream Job', 'আপনার স্বপ্নের চাকরি')}{' '}
                  <br />
                  {text('is Just a', 'এখন আপনার হাতের কাছে')}{' '}
                  <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                    {text('Click Away!', 'এক ক্লিক দূরে!')}
                  </span>
                </h1>
                <p className="mt-4 text-sm text-slate-300 md:text-base">
                  {text(
                    'Find global jobs, remote work, freelance projects and career resources in one place.',
                    'এক জায়গায় খুঁজুন আন্তর্জাতিক চাকরি, রিমোট কাজ, ফ্রিল্যান্স কাজ ও ক্যারিয়ার রিসোর্স।'
                  )}
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start">
                  {['✓ Find Jobs', '✓ Work Online', '✓ Grow Your Career'].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-green-500/30 bg-black/30 px-3 py-2 text-xs font-semibold text-green-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full max-w-xs rounded-2xl border border-cyan-400/30 bg-slate-950/50 p-5 shadow-2xl">
                <div className="text-xs font-bold tracking-widest text-cyan-300">
                  SMART TASKS • BETTER LIFE
                </div>
                <div className="mt-2 text-2xl font-black">TaskFlow AI</div>
                <p className="mt-2 text-xs text-slate-400">
                  Your career and productivity workspace
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-xs font-semibold text-green-400">● Dashboard</span>
                  <button
                    onClick={() => openModule('AI Career Assistant')}
                    className="rounded-lg bg-green-500 px-4 py-2 text-xs font-extrabold text-black hover:bg-green-400"
                  >
                    Explore →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* TASK SUMMARY */}
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-[#070c1e] p-4">
              <p className="text-xs text-slate-400">{text('Total Tasks', 'মোট কাজ')}</p>
              <p className="mt-2 text-3xl font-black">{tasks.length}</p>
            </div>
            <div className="rounded-xl border border-green-500/20 bg-[#070c1e] p-4">
              <p className="text-xs text-slate-400">{text('Completed', 'সম্পন্ন')}</p>
              <p className="mt-2 text-3xl font-black text-green-400">{completedTasks}</p>
            </div>
            <div className="rounded-xl border border-amber-500/20 bg-[#070c1e] p-4">
              <p className="text-xs text-slate-400">{text('Pending', 'বাকি আছে')}</p>
              <p className="mt-2 text-3xl font-black text-amber-400">{pendingTasks}</p>
            </div>
          </section>

          {/* QUICK CATEGORIES */}
          <section>
            <h2 className="mb-3 text-lg font-extrabold">
              {text('Explore Categories', 'বিভাগসমূহ')}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {[
                ['🌐', 'Find Jobs'],
                ['💻', 'Remote Work'],
                ['🤝', 'Freelance'],
                ['📄', 'Create CV'],
                ['📈', 'Career Growth'],
                ['🛡️', 'Trusted Sites']
              ].map(([icon, name]) => (
                <button
                  key={name}
                  onClick={() => openModule(name)}
                  className="rounded-xl border border-slate-800 bg-white p-4 text-left text-slate-900 shadow transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="text-2xl">{icon}</span>
                  <p className="mt-3 text-xs font-extrabold">{name}</p>
                </button>
              ))}
            </div>
          </section>

          {/* TRUSTED LINKS */}
          <section className="rounded-xl border border-slate-800 bg-[#0b132b] p-4">
            <div className="mb-3 text-xs font-black uppercase tracking-wider text-green-400">
              {text('Explore Job Platforms', 'চাকরির ওয়েবসাইট')}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm font-bold">
              {[
                ['LinkedIn', 'https://www.linkedin.com/jobs'],
                ['Indeed', 'https://www.indeed.com'],
                ['Upwork', 'https://www.upwork.com'],
                ['Google Jobs', 'https://www.google.com/search?q=Google+Jobs'],
                ['Toptal', 'https://www.toptal.com']
              ].map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-200 hover:text-green-400"
                >
                  {name} ↗
                </a>
              ))}
            </div>
          </section>

          {/* TASK MANAGER */}
          <section className="rounded-2xl border border-slate-800 bg-[#070c1e] p-5 shadow-xl">
            <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <div>
                <h2 className="text-lg font-extrabold">
                  ⚡ {text('Task Management', 'কাজের তালিকা')}
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  {text('Add and manage your daily tasks.', 'আপনার প্রতিদিনের কাজ যোগ ও পরিচালনা করুন।')}
                </p>
              </div>
              <form onSubmit={handleAddTask} className="flex w-full gap-2 md:w-auto">
                <input
                  value={newTaskTitle}
                  onChange={(event) => setNewTaskTitle(event.target.value)}
                  placeholder={text('Write a new task...', 'নতুন কাজ লিখুন...')}
                  className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-[#0d1630] px-3 py-2.5 text-sm outline-none focus:border-green-500 md:w-64"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-green-500 px-4 py-2 text-sm font-extrabold text-black hover:bg-green-400"
                >
                  + {text('Add', 'যোগ')}
                </button>
              </form>
            </div>
            <div className="space-y-2">
              {tasks.length === 0 ? (
                <p className="rounded-xl border border-dashed border-slate-700 p-5 text-center text-sm text-slate-400">
                  {text('No tasks yet. Add your first task above.', 'এখনো কোনো কাজ নেই। উপরে নতুন কাজ যোগ করুন।')}
                </p>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-[#0d1630] p-3"
                  >
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    >
                      <span
                        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border text-xs ${
                          task.status === 'Completed'
                            ? 'border-green-500 bg-green-500 text-black'
                            : 'border-slate-500'
                        }`}
                      >
                        {task.status === 'Completed' ? '✓' : ''}
                      </span>
                      <span
                        className={`break-words text-sm font-semibold ${
                          task.status === 'Completed'
                            ? 'text-slate-500 line-through'
                            : 'text-white'
                        }`}
                      >
                        {task.title}
                      </span>
                    </button>
                    <div className="flex flex-shrink-0 items-center gap-2">
                      <span
                        className={`hidden rounded-full px-2 py-1 text-[10px] sm:inline ${
                          task.status === 'Completed'
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-amber-500/10 text-amber-400'
                        }`}
                      >
                        {task.status}
                      </span>
                      <button
                        onClick={() => deleteTask(task.id)}
                        title="Delete task"
                        className="rounded-lg px-2 py-1 text-slate-400 hover:bg-red-500/10 hover:text-red-400"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* FEATURE CARDS */}
          <section>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-extrabold">
                {text('Discover Your Opportunities', 'আপনার সুযোগগুলো খুঁজুন')}
              </h2>
              <span className="text-xs text-slate-400">
                {filteredCards.length} {text('results', 'টি ফলাফল')}
              </span>
            </div>
            {filteredCards.length === 0 ? (
              <p className="rounded-xl border border-slate-800 p-6 text-center text-sm text-slate-400">
                {text('No matching cards found.', 'কোনো মিল পাওয়া যায়নি।')}
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {filteredCards.map((card) => (
                  <div
                    key={card.title}
                    className={`relative flex min-h-44 flex-col justify-between overflow-hidden rounded-2xl border bg-gradient-to-br ${card.color} ${card.border} p-5 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-3xl">
                        {card.icon}
                      </span>
                      <span className="rounded-full border border-white/10 bg-black/20 px-2 py-1 text-[9px] font-bold text-slate-300">
                        {card.category}
                      </span>
                    </div>
                    <div className="relative z-10 mt-5">
                      <h3 className="text-lg font-black">{card.title}</h3>
                      <p className="mt-1 text-xs text-slate-300">{card.desc}</p>
                      {card.link ? (
                        <a
                          href={card.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block rounded-lg bg-green-500 px-3 py-2 text-xs font-extrabold text-black hover:bg-green-400"
                        >
                          {text('Visit Website', 'ওয়েবসাইটে যান')} ↗
                        </a>
                      ) : (
                        <button
                          onClick={() => openModule('TaskFlow AI')}
                          className="mt-4 rounded-lg bg-green-500 px-3 py-2 text-xs font-extrabold text-black hover:bg-green-400"
                        >
                          Explore →
                        </button>
                      )}
                    </div>
                    <div className="pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-white/5 blur-2xl" />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* SAFETY NOTE */}
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs leading-relaxed text-amber-200">
            ⚠️{' '}
            {text(
              'External job websites are independent services. Always verify each vacancy and never pay an unknown recruiter to get a job.',
              'বাইরের চাকরির ওয়েবসাইটগুলো আলাদা সেবা। চাকরির বিজ্ঞপ্তি যাচাই করুন এবং অচেনা কোনো নিয়োগকর্তাকে চাকরির জন্য টাকা দেবেন না।'
            )}
          </div>
        </div>

        {/* FOOTER */}
        <footer className="border-t border-slate-800 bg-[#050a17] px-4 py-4 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} TaskFlow AI. Smart Tasks • Better Life.
        </footer>
      </main>

      {/* MODAL */}
      {activeModal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-green-500/40 bg-[#090f24] p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-black text-white">{activeModal}</h3>
              <button onClick={closeModal} className="text-2xl text-slate-400 hover:text-white">
                ×
              </button>
            </div>
            {activeModal === 'bKash Payment' ? (
              <div className="space-y-3">
                <p className="text-sm leading-relaxed text-slate-300">
                  {text(
                    'The bKash payment gateway is not connected yet. Do not send money to any number shown in a demo. An official merchant payment integration must be configured before accepting payments.',
                    'bKash পেমেন্ট গেটওয়ে এখনো সংযুক্ত করা হয়নি। ডেমোতে দেখানো কোনো নম্বরে টাকা পাঠাবেন না। পেমেন্ট নেওয়ার আগে অফিসিয়াল মার্চেন্ট ইন্টিগ্রেশন প্রয়োজন।'
                  )}
                </p>
                <span className="inline-block rounded-lg bg-pink-500/10 px-3 py-2 text-xs font-bold text-pink-300">
                  bKash integration: Not connected
                </span>
              </div>
            ) : (
              <p className="text-sm leading-relaxed text-slate-300">
                {text(
                  `You selected ${activeModal}. This section is a dashboard entry point. Its full service needs to be connected separately.`,
                  `আপনি ${activeModal} নির্বাচন করেছেন। এটি ড্যাশবোর্ডের একটি প্রবেশপথ। সম্পূর্ণ সেবা চালু করতে আলাদা সংযোগ প্রয়োজন।`
                )}
              </p>
            )}
            <button
              onClick={closeModal}
              className="mt-6 w-full rounded-xl bg-green-500 px-4 py-3 text-sm font-extrabold text-black hover:bg-green-400"
            >
              {text('Close', 'বন্ধ করুন')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
