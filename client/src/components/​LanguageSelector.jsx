import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    const selectedLang = e.target.value;
    i18n.changeLanguage(selectedLang);
    localStorage.setItem('i18nextLng', selectedLang);
  };

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-[#0EA5E9]" />
      <select 
        onChange={changeLanguage}
        value={i18n.language}
        className="bg-[#030712] border border-[#1E293B] rounded-xl px-3 py-1.5 text-sm text-slate-300 focus:outline-none focus:border-[#22C55E] cursor-pointer"
      >
        <option value="en">English</option>
        <option value="bn">বাংলা</option>
      </select>
    </div>
  );
}
