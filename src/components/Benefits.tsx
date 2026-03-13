import { Star, BookOpen, Users, Award, Network, Zap } from 'lucide-react'

const benefits = [
  {
    icon: BookOpen,
    title: 'Free Structured Training',
    description: 'Access premium Bitcoin education at zero cost—structured curriculum from industry experts.',
  },
  {
    icon: Zap,
    title: 'Real-World Skills',
    description: 'Bitcoin philosophy, cryptography, coding, and blockchain fundamentals that you can apply immediately.',
  },
  {
    icon: Users,
    title: 'Mentorship Access',
    description: 'Learn from experienced ambassadors and technical leaders in the Bitcoin ecosystem.',
  },
  {
    icon: Award,
    title: 'Certified Educator Path',
    description: 'Clear pathway to becoming a certified Bitcoin educator recognized in your community.',
  },
  {
    icon: Network,
    title: 'Pan-African Network',
    description: 'Connect with African Bitcoin leaders, builders, and educators across 54 countries.',
  },
  {
    icon: Star,
    title: 'Exclusive Opportunities',
    description: 'Access to the growing Bitcoin ecosystem—jobs, projects, and collaborations across Africa.',
  },
]

const subjects = [
  'Philosophy of Bitcoin and Blockchain',
  'Computer Science basics',
  'Economics and Mathematics',
  'Cryptography',
  'Coding fundamentals',
  'Introduction to AI',
]

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <span className="text-[#F7931A] text-sm font-semibold uppercase tracking-widest">
            What You Get
          </span>
        </div>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-heading text-black mb-6">
            Benefits of Joining{' '}
            <span className="text-[#F7931A]">the Program</span>
          </h2>
          <p className="section-subheading">
            Everything you need to become a confident Bitcoin educator—at no cost to you.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-[#F7931A]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#F7931A] transition-colors">
                <Icon size={20} className="text-[#F7931A] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-bold text-black mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* What you'll learn */}
        <div className="bg-black rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-[#F7931A] text-sm font-semibold uppercase tracking-widest">
                Curriculum
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mt-3 mb-4">
                What You'll Learn
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Our curriculum covers everything a modern Bitcoin ambassador needs—from first
                principles to hands-on technical skills. All taught in your language, at your pace.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {subjects.map((subject) => (
                <div
                  key={subject}
                  className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
                >
                  <div className="w-2 h-2 bg-[#F7931A] rounded-full flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{subject}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
