import { Twitter, Github, MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#F7931A] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">₿</span>
              </div>
              <span className="text-white font-bold text-lg">
                {t('brand.prefix')} <span className="text-[#F7931A]">{t('brand.highlight')}</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              {t('footer.description')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">{t('footer.navigation')}</h4>
            <ul className="space-y-2">
              {[
                { label: t('footer.links.home'), id: 'hero' },
                { label: t('footer.links.about'), id: 'about' },
                { label: t('footer.links.program'), id: 'program' },
                { label: t('footer.links.benefits'), id: 'benefits' },
                { label: t('footer.links.apply'), id: 'enroll' },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="text-gray-400 hover:text-[#F7931A] text-sm transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">{t('footer.connect')}</h4>
            <p className="text-gray-400 text-sm mb-4">
              {t('footer.poweredBy')}{' '}
              <span className="text-[#F7931A] font-semibold">Bitcoin Without Borders</span>
              {' '}/ Ubuntu
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-white/5 hover:bg-[#F7931A] rounded-lg flex items-center justify-center transition-colors group"
                aria-label={t('footer.social.twitter')}
              >
                <Twitter size={16} className="text-gray-400 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/5 hover:bg-[#F7931A] rounded-lg flex items-center justify-center transition-colors group"
                aria-label={t('footer.social.telegram')}
              >
                <MessageCircle size={16} className="text-gray-400 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/5 hover:bg-[#F7931A] rounded-lg flex items-center justify-center transition-colors group"
                aria-label={t('footer.social.github')}
              >
                <Github size={16} className="text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs text-center sm:text-left">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">{t('footer.legal.privacy')}</a>
            <a href="#" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">{t('footer.legal.terms')}</a>
            <a href="mailto:contact@libreriadesatoshi.com" className="text-gray-600 hover:text-[#F7931A] text-xs transition-colors">{t('footer.legal.contact')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
