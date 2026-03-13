import { Users, Wrench, MessageCircle, Share2, CheckCircle } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Users,
    title: 'Cohort-Based Learning',
    description:
      'Join a cohort of peers from across Africa. Learn together, support each other, and progress through structured modules with expert guidance.',
  },
  {
    number: '02',
    icon: Wrench,
    title: 'Hands-On Technical Training',
    description:
      'Practice with real Bitcoin tools and open-source software. Build actual skills—not just theory—through guided labs and projects.',
  },
  {
    number: '03',
    icon: MessageCircle,
    title: 'Leadership & Localization',
    description:
      'Develop communication and facilitation skills. Learn to adapt Bitcoin concepts to your culture, language, and community context.',
  },
  {
    number: '04',
    icon: Share2,
    title: 'Knowledge Sharing',
    description:
      'Organize local workshops, online sessions, and community meetups. Multiply your learning by teaching others in your network.',
  },
  {
    number: '05',
    icon: CheckCircle,
    title: 'Proof of Work Funnel',
    description:
      'Document your impact. Complete milestones, earn recognition, and build a track record that proves your leadership and expertise.',
  },
]

export default function How() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <span className="text-[#F7931A] text-sm font-semibold uppercase tracking-widest">
            How It Works
          </span>
        </div>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-heading text-black mb-6">
            Your Path from{' '}
            <span className="text-[#F7931A]">Learner to Leader</span>
          </h2>
          <p className="section-subheading">
            A structured, step-by-step program designed to take you from Bitcoin beginner
            to community educator in a matter of months.
          </p>
        </div>

        {/* Timeline / Steps */}
        <div className="relative">
          {/* Vertical line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, idx) => {
              const Icon = step.icon
              const isLeft = idx % 2 === 0
              return (
                <div
                  key={step.number}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${isLeft ? '' : 'lg:flex-row-reverse'}`}
                >
                  {/* Card */}
                  <div className="lg:w-5/12">
                    <div className="card hover:shadow-lg transition-shadow group">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#F7931A] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <Icon size={22} className="text-white" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 font-semibold mb-1">Step {step.number}</div>
                          <h3 className="text-lg font-bold text-black mb-2">{step.title}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center dot (desktop) */}
                  <div className="hidden lg:flex lg:w-2/12 justify-center">
                    <div className="w-10 h-10 bg-black border-4 border-[#F7931A] rounded-full flex items-center justify-center z-10">
                      <span className="text-white text-xs font-bold">{idx + 1}</span>
                    </div>
                  </div>

                  {/* Empty space for the other side */}
                  <div className="hidden lg:block lg:w-5/12" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
