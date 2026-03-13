import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('hero')}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#F7931A] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">₿</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Libreria <span className="text-[#F7931A]">de Satoshi</span>
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollTo('about')}
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollTo('program')}
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              Program
            </button>
            <button
              onClick={() => scrollTo('benefits')}
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              Benefits
            </button>
            <button
              onClick={() => scrollTo('enroll')}
              className="btn-primary text-sm py-2 px-6"
            >
              Apply Now
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          <button onClick={() => scrollTo('about')} className="text-gray-300 text-left text-sm font-medium hover:text-white">About</button>
          <button onClick={() => scrollTo('program')} className="text-gray-300 text-left text-sm font-medium hover:text-white">Program</button>
          <button onClick={() => scrollTo('benefits')} className="text-gray-300 text-left text-sm font-medium hover:text-white">Benefits</button>
          <button onClick={() => scrollTo('enroll')} className="btn-primary text-sm w-full justify-center">Apply Now</button>
        </div>
      )}
    </header>
  )
}
