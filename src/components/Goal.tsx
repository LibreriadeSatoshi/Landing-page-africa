import { Target, TrendingUp, Shield, Code2, Brain, Calculator } from 'lucide-react'

const subjects = [
  { icon: Target, label: 'Blockchain & Bitcoin' },
  { icon: Code2, label: 'Computer Science' },
  { icon: Calculator, label: 'Economics & Math' },
  { icon: Shield, label: 'Cryptography' },
  { icon: TrendingUp, label: 'Coding Skills' },
  { icon: Brain, label: 'Artificial Intelligence' },
]

export default function Goal() {
  return (
    <section id="program" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <span className="text-[#F7931A] text-sm font-semibold uppercase tracking-widest">
              Our Goal
            </span>
            <h2 className="section-heading text-black mt-4 mb-6">
              A Self-Sustaining<br />
              <span className="text-[#F7931A]">Ambassador Network</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Empower a generation of African Bitcoin ambassadors who understand blockchain
              technology deeply, lead their communities with confidence, and shape the future
              of finance on the continent.
            </p>
            <p className="text-gray-700 font-medium mb-6">
              Our ambassadors learn and teach across six core pillars:
            </p>

            {/* Subject grid */}
            <div className="grid grid-cols-2 gap-3">
              {subjects.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm"
                >
                  <div className="w-8 h-8 bg-[#F7931A]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[#F7931A]" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: visual */}
          <div className="relative">
            <div className="bg-black rounded-3xl p-8 md:p-10">
              <div className="text-center mb-8">
                <div className="text-6xl font-black text-[#F7931A]">₿</div>
                <div className="text-white text-xl font-bold mt-2">Ambassador Network</div>
                <div className="text-gray-400 text-sm mt-1">Pan-African · Multilingual · Open Source</div>
              </div>

              {/* Network visual */}
              <div className="space-y-3">
                {[
                  { level: 'Learner', count: '∞', color: 'bg-gray-700' },
                  { level: 'Ambassador', count: '100+', color: 'bg-[#F7931A]/30' },
                  { level: 'Educator', count: '50+', color: 'bg-[#F7931A]/60' },
                  { level: 'Leader', count: '10+', color: 'bg-[#F7931A]' },
                ].map((tier) => (
                  <div key={tier.level} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
                    <span className="text-gray-300 text-sm font-medium">{tier.level}</span>
                    <div className="flex items-center gap-3">
                      <div className={`h-2 rounded-full ${tier.color}`} style={{ width: '80px' }} />
                      <span className="text-[#F7931A] text-sm font-bold w-12 text-right">{tier.count}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-gray-500 text-xs">
                  Knowledge multiplies across borders and languages
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
