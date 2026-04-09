import { Twitter, Github, MessageCircle } from 'lucide-react'

export default function Footer() {
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
                Africa <span className="text-[#F7931A]">Bitcoin Education</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Building Africa's language-first, learner-to-educator Bitcoin network.
              Knowledge that multiplies across borders.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', id: 'hero' },
                { label: 'About', id: 'about' },
                { label: 'Program', id: 'program' },
                { label: 'Benefits', id: 'benefits' },
                { label: 'Apply Now', id: 'enroll' },
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
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">Connect</h4>
            <p className="text-gray-400 text-sm mb-4">
              Powered by{' '}
              <span className="text-[#F7931A] font-semibold">Bitcoin Without Borders</span>
              {' '}/ Ubuntu
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-white/5 hover:bg-[#F7931A] rounded-lg flex items-center justify-center transition-colors group"
                aria-label="Twitter"
              >
                <Twitter size={16} className="text-gray-400 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/5 hover:bg-[#F7931A] rounded-lg flex items-center justify-center transition-colors group"
                aria-label="Telegram"
              >
                <MessageCircle size={16} className="text-gray-400 group-hover:text-white" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-white/5 hover:bg-[#F7931A] rounded-lg flex items-center justify-center transition-colors group"
                aria-label="GitHub"
              >
                <Github size={16} className="text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Africa Bitcoin Education. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Terms of Use</a>
            <a href="mailto:contact@libreriadesatoshi.com" className="text-gray-600 hover:text-[#F7931A] text-xs transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
