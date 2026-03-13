import { Globe, BookOpen, Users } from 'lucide-react'

const cards = [
  {
    icon: Globe,
    title: 'Continent-Wide Reach',
    description:
      'A pan-African program designed to reach every corner of the continent, crossing language barriers and borders to multiply knowledge.',
  },
  {
    icon: BookOpen,
    title: 'Deep Technical Knowledge',
    description:
      'Bitcoin fundamentals, Computer Science, open-source tools, cryptography, coding, economics, and AI—all in one structured curriculum.',
  },
  {
    icon: Users,
    title: 'Community Growth',
    description:
      'Transform from learner to educator. Build a lasting legacy in your community by becoming the local Bitcoin knowledge hub.',
  },
]

export default function What() {
  return (
    <section id="about" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="text-center mb-4">
          <span className="text-[#F7931A] text-sm font-semibold uppercase tracking-widest">
            What We're Building
          </span>
        </div>

        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="section-heading text-black mb-6">
            Africa's Language-First Bitcoin Education Network
          </h2>
          <p className="section-subheading">
            Libreria de Satoshi is Africa's premier Bitcoin education and ambassador program.
            We're building a self-sustaining network of young African leaders who master
            Bitcoin and blockchain technology—and multiply that knowledge across their communities.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-[#F7931A]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#F7931A] transition-colors">
                <Icon size={22} className="text-[#F7931A] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-black mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* Secondary text */}
        <div className="mt-16 bg-black rounded-3xl p-8 md:p-12 text-center">
          <p className="text-white text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            "Through cohort-based learning, hands-on training, and mentorship, we transform
            ambitious learners into confident educators and community leaders."
          </p>
          <div className="mt-6 w-16 h-1 bg-[#F7931A] mx-auto rounded-full" />
        </div>
      </div>
    </section>
  )
}
