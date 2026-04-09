import { useEffect, useRef, useState } from 'react'
import { Globe, Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'sw', label: 'Kiswahili' },
] as const

type LangCode = (typeof LANGUAGES)[number]['code']

type HeaderProps = {
  applicationMode?: boolean
  onCloseApplication?: () => void
  onOpenApplication?: () => void
}

export default function Header({
  applicationMode,
  onCloseApplication,
  onOpenApplication,
}: Readonly<HeaderProps>) {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const langRef = useRef<HTMLDivElement>(null)
  const navItems = [
    { label: t('header.about'), id: 'about' },
    { label: t('header.program'), id: 'program' },
    { label: t('header.benefits'), id: 'benefits' },
  ]

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const openApply = () => {
    setMenuOpen(false)
    onOpenApplication?.()
  }

  const changeLanguage = (language: LangCode) => {
    void i18n.changeLanguage(language)
    localStorage.setItem('language', language)
    setLangOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: '-20% 0px -55% 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [navItems])

  const currentLang = LANGUAGES.find((l) => l.code === i18n.resolvedLanguage) ?? LANGUAGES[0]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand — left */}
          <button
            type="button"
            className="flex items-center gap-2 cursor-pointer flex-shrink-0 bg-transparent border-none p-0"
            onClick={() => (applicationMode ? onCloseApplication?.() : scrollTo('hero'))}
          >
            <div className="w-8 h-8 bg-[#F7931A] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">₿</span>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              {t('brand.prefix')} <span className="text-[#F7931A]">{t('brand.highlight')}</span>
            </span>
          </button>

          {applicationMode ? (
            <button
              type="button"
              onClick={() => onCloseApplication?.()}
              className="btn-outline-orange text-sm py-2 px-5"
            >
              {t('header.backToSite')}
            </button>
          ) : (
            <>
              <div className="hidden md:flex items-center justify-between flex-1 ml-8">
                {/* Nav links — center (desktop) */}
                <nav className="flex items-center gap-2">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className={`relative text-sm font-semibold transition-colors px-3 py-2 ${
                          isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                        }`}
                      >
                        {item.label}
                        <span
                          className={`absolute left-2 right-2 -bottom-[10px] h-0.5 rounded-full bg-[#F7931A] transition-opacity ${
                            isActive ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      </button>
                    )
                  })}
                </nav>

                {/* Right actions — language + CTA (desktop) */}
                <div className="flex items-center gap-3">
                {/* Language dropdown */}
                  <div ref={langRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setLangOpen((prev) => !prev)}
                      className="flex items-center gap-1.5 text-gray-300 hover:text-white text-sm transition-colors px-2.5 py-1.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10"
                    >
                      <Globe size={15} className="text-gray-400" />
                      <span className="uppercase text-xs font-semibold tracking-wide">
                        {currentLang.code}
                      </span>
                    </button>

                    {langOpen && (
                      <div className="absolute right-0 mt-2 w-40 bg-gray-950 border border-white/10 rounded-xl shadow-2xl py-1 animate-in fade-in slide-in-from-top-1 duration-150">
                        {LANGUAGES.map((lang) => (
                          <button
                            key={lang.code}
                            type="button"
                            onClick={() => changeLanguage(lang.code)}
                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                              i18n.resolvedLanguage === lang.code
                                ? 'text-[#F7931A] bg-[#F7931A]/5'
                                : 'text-gray-300 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            <span>{lang.label}</span>
                            <span className="text-[11px] uppercase tracking-wider text-gray-500">
                              {lang.code}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenApplication?.()}
                    className="btn-primary text-sm py-2 px-6"
                  >
                    {t('header.applyNow')}
                  </button>
                </div>
              </div>

              {/* Hamburger — mobile */}
              <button
                className="md:hidden text-white p-2"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={t('header.toggleMenu')}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {!applicationMode && menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm border-t border-white/10 px-4 py-4 flex flex-col gap-1">
          {[
            { label: t('header.about'), id: 'about' },
            { label: t('header.program'), id: 'program' },
            { label: t('header.benefits'), id: 'benefits' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-gray-300 text-left text-sm font-medium hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              {item.label}
            </button>
          ))}

          {/* Language selector — mobile (inline pills) */}
          <div className="flex items-center gap-2 px-3 py-3 border-t border-white/10 mt-2 pt-4">
            <Globe size={14} className="text-gray-500 flex-shrink-0" />
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => changeLanguage(lang.code)}
                className={`text-xs uppercase tracking-wide px-3 py-1.5 rounded-full border transition-colors ${
                  i18n.resolvedLanguage === lang.code
                    ? 'border-[#F7931A] text-[#F7931A] bg-[#F7931A]/10'
                    : 'border-white/15 text-gray-400 hover:text-white hover:border-white/30'
                }`}
              >
                {lang.code}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={openApply}
            className="btn-primary text-sm w-full justify-center mt-2"
          >
            {t('header.applyNow')}
          </button>
        </div>
      )}
    </header>
  )
}
