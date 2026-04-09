import { ArrowRight, ClipboardList } from 'lucide-react'

type EnrollmentFormProps = {
  onOpenApplication: () => void
}

export default function EnrollmentForm({ onOpenApplication }: EnrollmentFormProps) {
  return (
    <section id="enroll" className="py-20 md:py-28 bg-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-[#F7931A] text-sm font-semibold uppercase tracking-widest">
            Apply Today
          </span>
          <h2 className="section-heading text-white mt-4 mb-4">
            Ready to Join?
          </h2>
          <p className="text-gray-400 text-lg">
            Start the ambassador application — it takes about 5–15 minutes. Your progress is saved
            automatically on this device.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 text-center shadow-xl border border-gray-100">
          <div className="w-14 h-14 bg-[#F7931A]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ClipboardList className="text-[#F7931A]" size={28} />
          </div>
          <h3 className="text-xl font-bold text-black mb-3">
            Full application in four short steps
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-md mx-auto">
            Personal details, guardian consent if you are under 18, your availability and commitment,
            and your Bitcoin experience. Answer in your own words — authenticity matters.
          </p>
          <button
            type="button"
            onClick={onOpenApplication}
            className="btn-primary text-base px-10 py-4 w-full sm:w-auto justify-center"
            data-testid="open-application-wizard"
          >
            Start application
            <ArrowRight size={18} />
          </button>
          <p className="text-xs text-gray-400 mt-6">
            Questions? Email{' '}
            <a
              href="mailto:ambassadors@africabitcoineducation.org?subject=Ambassador%20Question"
              className="text-[#F7931A] hover:underline"
            >
              ambassadors@africabitcoineducation.org
            </a>
            {' '}
            with &quot;Ambassador Question&quot; in the subject line.
          </p>
        </div>
      </div>
    </section>
  )
}
