import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      dashboard: "Dashboard",
      findJobs: "Find Jobs",
      remoteWork: "Remote Work",
      freelanceMarket: "Freelance Market",
      cvProfile: "My CV & Profile",
      hiringRecruiters: "Hiring & Recruiters",
      trustedSites: "Trusted Sites",
      careerPlanner: "Career Planner",
      myTasks: "My Tasks",
      aiAssistant: "AI Career Assistant",
      savedJobs: "Saved Jobs",
      applicationTracker: "Application Tracker",
      notifications: "Notifications",
      settings: "Settings",
      helpSupport: "Help & Support",
      premiumExperience: "TaskFlow AI Premium Experience",
      welcomeBack: "Welcome back",
      tagline: "Find Work. Grow Your Life.",
      searchPlaceholder: "Search jobs, skills or companies...",
      currentTasks: "Current Tasks",
      savedJobsCount: "Saved Jobs",
      careerProgress: "Career Progress",
      networkConnections: "Network Connections",
      exploreJobs: "Explore Jobs",
      open: "open",
      opportunities: "Opportunities",
      active: "Active"
    }
  },
  bn: {
    translation: {
      dashboard: "ড্যাশবোর্ড",
      findJobs: "চাকরি খুঁজুন",
      remoteWork: "রিমোট কাজ",
      freelanceMarket: "ফ্রিল্যান্স মার্কেট",
      cvProfile: "সিভি ও প্রোফাইল",
      hiringRecruiters: "নিয়োগকর্তা ও রিক্রুটার",
      trustedSites: "বিশ্বস্ত সাইটসমূহ",
      careerPlanner: "ক্যারিয়ার প্ল্যানার",
      myTasks: "আমার টাস্কসমূহ",
      aiAssistant: "এআই ক্যারিয়ার অ্যাসিস্ট্যান্ট",
      savedJobs: "সংরক্ষিত চাকরি",
      applicationTracker: "আবেদন ট্র্যাকার",
      notifications: "নোটিফিকেশন",
      settings: "সেটিংস",
      helpSupport: "সহায়তা ও সমর্থন",
      premiumExperience: "টাস্কফ্লো এআই প্রিমিয়াম অভিজ্ঞতা",
      welcomeBack: "স্বাগতম ফিরে আসার জন্য",
      tagline: "কাজ খুঁজুন। জীবনকে এগিয়ে নিন।",
      searchPlaceholder: "চাকরি, দক্ষতা বা কোম্পানি খুঁজুন...",
      currentTasks: "চলমান টাস্ক",
      savedJobsCount: "সংরক্ষিত চাকরি",
      careerProgress: "ক্যারিয়ার অগ্রগতি",
      networkConnections: "নেটওয়ার্ক সংযোগ",
      exploreJobs: "চাকরি অন্বেষণ করুন",
      open: "চলমান",
      opportunities: "টি সুযোগ",
      active: "সক্রিয়"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('i18nextLng') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
