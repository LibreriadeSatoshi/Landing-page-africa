import { AlertTriangle, Globe, Heart } from 'lucide-react'

const reasons = [
  {
    icon: AlertTriangle,
    title: 'The Gap Is Real',
    description:
      'Bitcoin adoption in Africa is growing fast, but deep technical education lags behind. Most content is in English and inaccessible to millions of young Africans.',
  },
  {
    icon: Globe,
    title: 'Local Languages Matter',
    description:
      'Education should live within communities, in the languages people think in. Knowledge taught in your mother tongue sticks, grows, and spreads.',
  },
  {
    icon: Heart,
    title: 'Africa Needs Teachers',
    description:
      'Your communities need leaders who understand blockchain deeply. The most powerful thing you can do is become a teacher—and Africa needs you now.',
  },
]

export default function Why() {
  return (
    <section className="py-20 md:py-28 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="text-center mb-4">
          <span className="text-[#F7931A] text-sm font-semibold uppercase tracking-widest">
            Why This Matters
          </span>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-heading text-white mb-6">
            Africa Needs You to{' '}
            <span className="text-[#F7931A]">Become a Teacher</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Bitcoin education in Africa is growing—but it's not enough.
            Your communities need leaders who understand blockchain deeply.
            Build the future on the continent.
          </p>
        </div>

        {/* Reasons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {reasons.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="border border-white/10 rounded-2xl p-6 hover:border-[#F7931A]/40 transition-colors group"
            >
              <div className="w-12 h-12 bg-[#F7931A]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#F7931A]/20 transition-colors">
                <Icon size={22} className="text-[#F7931A]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* Big quote */}
        <div className="text-center border-t border-white/10 pt-16">
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white max-w-4xl mx-auto leading-tight">
            "Knowledge that stays in one language stays in one place.{' '}
            <span className="text-[#F7931A]">We're changing that.</span>"
          </p>
          <p className="text-gray-500 mt-4">— Libreria de Satoshi</p>
        </div>
      </div>
    </section>
  )
}
