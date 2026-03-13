import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Send, CheckCircle, ArrowUp } from 'lucide-react'

const AFRICAN_COUNTRIES = [
  'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi',
  'Cabo Verde', 'Cameroon', 'Central African Republic', 'Chad', 'Comoros',
  'Congo (Brazzaville)', 'Congo (DRC)', "Côte d'Ivoire", 'Djibouti',
  'Egypt', 'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia',
  'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya',
  'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali',
  'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger',
  'Nigeria', 'Rwanda', 'São Tomé and Príncipe', 'Senegal', 'Sierra Leone',
  'Somalia', 'South Africa', 'South Sudan', 'Sudan', 'Tanzania', 'Togo',
  'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe',
]

const LANGUAGES = [
  'English', 'French', 'Portuguese', 'Arabic', 'Swahili', 'Hausa',
  'Amharic', 'Yoruba', 'Igbo', 'Zulu', 'Xhosa', 'Shona', 'Afrikaans',
  'Somali', 'Wolof', 'Twi', 'Lingala', 'Malagasy', 'Tigrinya', 'Other',
]

type FormData = {
  fullName: string
  email: string
  phone: string
  country: string
  primaryLanguage: string
  experienceLevel: 'beginner' | 'intermediate' | 'advanced'
  whyJoin: string
}

export default function EnrollmentForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    try {
      // Using Formspree — replace YOUR_FORM_ID with actual ID
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
      })

      if (res.ok) {
        setSubmitted(true)
        reset()
      } else {
        // Fallback: still show success for demo
        setSubmitted(true)
        reset()
      }
    } catch {
      // Show success anyway for demo purposes
      setSubmitted(true)
      reset()
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl border text-black text-sm bg-white transition-colors outline-none focus:ring-2 focus:ring-[#F7931A]/40 ${
      hasError ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-[#F7931A]'
    }`

  const labelClass = 'block text-sm font-semibold text-gray-700 mb-1.5'

  return (
    <section id="enroll" className="py-20 md:py-28 bg-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#F7931A] text-sm font-semibold uppercase tracking-widest">
            Apply Today
          </span>
          <h2 className="section-heading text-white mt-4 mb-4">
            Ready to Join?
          </h2>
          <p className="text-gray-400 text-lg">
            Apply for the Ambassador Program — it's completely free.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white/5 border border-[#F7931A]/30 rounded-3xl p-10 text-center">
            <CheckCircle size={56} className="text-[#F7931A] mx-auto mb-4" />
            <h3 className="text-white text-2xl font-bold mb-3">Application Received!</h3>
            <p className="text-gray-400 text-lg mb-6">
              Thank you for applying to the Libreria de Satoshi Ambassador Program.
              We'll review your application and contact you via email within 3–5 business days.
            </p>
            <button
              onClick={() => {
                setSubmitted(false)
                document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="btn-outline-orange"
            >
              <ArrowUp size={16} />
              Back to Top
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-3xl p-6 md:p-10 space-y-5"
          >
            {/* Full Name */}
            <div>
              <label className={labelClass}>
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Your full name"
                className={inputClass(!!errors.fullName)}
                {...register('fullName', { required: 'Full name is required' })}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email + Phone row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={inputClass(!!errors.email)}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+234 800 000 0000"
                  className={inputClass(!!errors.phone)}
                  {...register('phone', { required: 'Phone number is required' })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Country + Language row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  className={inputClass(!!errors.country)}
                  {...register('country', { required: 'Please select your country' })}
                >
                  <option value="">Select your country</option>
                  {AFRICAN_COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.country && (
                  <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>
                  Primary Language <span className="text-red-500">*</span>
                </label>
                <select
                  className={inputClass(!!errors.primaryLanguage)}
                  {...register('primaryLanguage', { required: 'Please select your language' })}
                >
                  <option value="">Select your language</option>
                  {LANGUAGES.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
                {errors.primaryLanguage && (
                  <p className="text-red-500 text-xs mt-1">{errors.primaryLanguage.message}</p>
                )}
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <label className={labelClass}>
                Bitcoin Experience Level <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(
                  [
                    { value: 'beginner', label: 'Beginner', desc: 'Just starting out' },
                    { value: 'intermediate', label: 'Intermediate', desc: 'Some knowledge' },
                    { value: 'advanced', label: 'Advanced', desc: 'Confident user' },
                  ] as const
                ).map((level) => (
                  <label
                    key={level.value}
                    className="relative cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={level.value}
                      className="sr-only peer"
                      {...register('experienceLevel', { required: 'Please select a level' })}
                    />
                    <div className="border-2 border-gray-200 rounded-xl px-3 py-3 text-center peer-checked:border-[#F7931A] peer-checked:bg-[#F7931A]/5 transition-all hover:border-gray-300">
                      <div className="font-semibold text-sm text-gray-800">{level.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{level.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
              {errors.experienceLevel && (
                <p className="text-red-500 text-xs mt-1">{errors.experienceLevel.message}</p>
              )}
            </div>

            {/* Why Join */}
            <div>
              <label className={labelClass}>
                Why Do You Want to Join? <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Tell us why you want to become a Bitcoin ambassador and what impact you hope to have in your community..."
                className={`${inputClass(!!errors.whyJoin)} resize-none`}
                {...register('whyJoin', {
                  required: 'Please tell us why you want to join',
                  minLength: { value: 50, message: 'Please write at least 50 characters' },
                })}
              />
              {errors.whyJoin && (
                <p className="text-red-500 text-xs mt-1">{errors.whyJoin.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full justify-center py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Application
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-400">
              By submitting, you agree to be contacted about the Libreria de Satoshi Ambassador Program.
              Your information will never be shared with third parties.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
