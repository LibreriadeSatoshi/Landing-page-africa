import { useEffect, useRef, useState } from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'en' as const, label: 'English' },
  { code: 'fr' as const, label: 'Français' },
  { code: 'sw' as const, label: 'Kiswahili' },
] as const;

export type LangCode = (typeof LANGUAGES)[number]['code'];

type LanguageSwitcherProps = {
  className?: string;
};

/** Language dropdown for the landing page sticky nav (light background). */
export default function LanguageSwitcher({ className = '' }: Readonly<LanguageSwitcherProps>) {
  const { i18n } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (language: LangCode) => {
    void i18n.changeLanguage(language);
    localStorage.setItem('language', language);
    setLangOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === i18n.resolvedLanguage) ?? LANGUAGES[0];

  return (
    <div ref={langRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setLangOpen((prev) => !prev)}
        className="flex items-center gap-1.5 text-gray-600 hover:text-black text-sm transition-colors px-2.5 py-1.5 rounded-lg hover:bg-black/5 border border-transparent hover:border-black/10"
        aria-haspopup="listbox"
        aria-expanded={langOpen}
        aria-label="Language"
      >
        <Globe size={15} className="text-gray-500" aria-hidden />
        <span className="uppercase text-xs font-semibold tracking-wide">{currentLang.code}</span>
      </button>

      {langOpen && (
        <div
          className="absolute right-0 mt-2 w-40 bg-white border border-black/10 rounded-xl shadow-2xl py-1 z-[200]"
          role="listbox"
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              role="option"
              aria-selected={i18n.resolvedLanguage === lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                i18n.resolvedLanguage === lang.code
                  ? 'text-[#F7931A] bg-[#F7931A]/5'
                  : 'text-gray-700 hover:bg-black/5'
              }`}
            >
              <span>{lang.label}</span>
              <span className="text-[11px] uppercase tracking-wider text-gray-400">
                {lang.code}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
