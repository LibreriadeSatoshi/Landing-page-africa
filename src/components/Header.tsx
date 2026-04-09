import { useState } from 'react'
import { Menu, X } from 'lucide-react'

type HeaderProps = {
  applicationMode?: boolean
  onCloseApplication?: () => void
  onOpenApplication?: () => void
}

export default function Header({
  applicationMode,
  onCloseApplication,
  onOpenApplication,
}: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const openApply = () => {
    setMenuOpen(false)
    onOpenApplication?.()
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => (applicationMode ? onCloseApplication?.() : scrollTo('hero'))}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#F7931A] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">₿</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Africa <span className="text-[#F7931A]">Bitcoin Education</span>
              </span>
            </div>
          </div>

          {applicationMode ? (
            <button
              type="button"
              onClick={() => onCloseApplication?.()}
              className="btn-outline-orange text-sm py-2 px-5"
            >
              Back to site
            </button>
          ) : (
            <>
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
                  type="button"
                  onClick={() => onOpenApplication?.()}
                  className="btn-primary text-sm py-2 px-6"
                >
                  Apply Now
                </button>
              </nav>

              <button
                className="md:hidden text-white p-2"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </>
          )}
        </div>
      </div>

      {!applicationMode && menuOpen && (
        <div className="md:hidden bg-black border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          <button
            onClick={() => scrollTo('about')}
            className="text-gray-300 text-left text-sm font-medium hover:text-white"
          >
            About
          </button>
          <button
            onClick={() => scrollTo('program')}
            className="text-gray-300 text-left text-sm font-medium hover:text-white"
          >
            Program
          </button>
          <button
            onClick={() => scrollTo('benefits')}
            className="text-gray-300 text-left text-sm font-medium hover:text-white"
          >
            Benefits
          </button>
          <button type="button" onClick={openApply} className="btn-primary text-sm w-full justify-center">
            Apply Now
          </button>
        </div>
      )}
    </header>
  )
}
