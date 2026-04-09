import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Send,
} from 'lucide-react'
import {
  ADDITIONAL_LANGUAGES_OPTIONS,
  AFRICAN_COUNTRIES,
  BITCOIN_KNOWLEDGE_OPTIONS,
  HEAR_ABOUT_OPTIONS,
  HOURS_PER_WEEK_OPTIONS,
  PRIMARY_LANGUAGE_OPTIONS,
  STORAGE_KEY,
  TIMEZONES,
} from '../constants/ambassadorForm'

export type AmbassadorFormValues = {
  // Section 1
  fullName: string
  email: string
  between16and35: 'yes' | 'no' | ''
  age: string
  gender: string
  country: string
  city: string
  timezone: string
  primaryLanguage: string
  additionalLanguages: string
  readWriteLanguages: 'yes' | 'no' | ''
  hearAbout: string
  // Section 2
  isAdult: 'yes' | 'no' | ''
  guardianConsentAccepted: boolean
  guardianName: string
  guardianRelationship: string
  guardianEmail: string
  guardianPhone: string
  // Section 3
  hoursPerWeek: string
  commitThreeMonths: 'yes' | 'no' | ''
  hopeToLearn: string
  helpCommunity: string
  hasLaptop: 'yes' | 'no' | ''
  internetSpeed: string
  videoConferencing: 'yes' | 'no' | ''
  // Section 4
  bitcoinKnowledge: string
  usedBitcoin: 'yes' | 'no' | ''
  uniqueOptional: string
  questionsForUs: string
  teachingExperience: string
  programmingExperience: string
  anythingElse: string
  consentAccepted: boolean
}

const defaultValues: AmbassadorFormValues = {
  fullName: '',
  email: '',
  between16and35: '',
  age: '',
  gender: '',
  country: '',
  city: '',
  timezone: '',
  primaryLanguage: '',
  additionalLanguages: '',
  readWriteLanguages: '',
  hearAbout: '',
  isAdult: '',
  guardianConsentAccepted: false,
  guardianName: '',
  guardianRelationship: '',
  guardianEmail: '',
  guardianPhone: '',
  hoursPerWeek: '',
  commitThreeMonths: '',
  hopeToLearn: '',
  helpCommunity: '',
  hasLaptop: '',
  internetSpeed: '',
  videoConferencing: '',
  bitcoinKnowledge: '',
  usedBitcoin: '',
  uniqueOptional: '',
  questionsForUs: '',
  teachingExperience: '',
  programmingExperience: '',
  anythingElse: '',
  consentAccepted: false,
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

const STEP1_FIELDS: (keyof AmbassadorFormValues)[] = [
  'fullName',
  'email',
  'between16and35',
  'age',
  'gender',
  'country',
  'city',
  'timezone',
  'primaryLanguage',
  'additionalLanguages',
  'readWriteLanguages',
  'hearAbout',
]

const STEP3_FIELDS: (keyof AmbassadorFormValues)[] = [
  'hoursPerWeek',
  'commitThreeMonths',
  'hopeToLearn',
  'helpCommunity',
  'hasLaptop',
  'internetSpeed',
  'videoConferencing',
]

type ApplicationWizardProps = {
  onClose: () => void
}

export default function ApplicationWizard({ onClose }: ApplicationWizardProps) {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    reset,
    getValues,
    formState: { errors },
  } = useForm<AmbassadorFormValues>({
    defaultValues,
    mode: 'onTouched',
  })

  const isAdult = watch('isAdult')

  // Restore draft
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as { values?: AmbassadorFormValues; step?: number }
      if (parsed.values) reset({ ...defaultValues, ...parsed.values })
      if (typeof parsed.step === 'number' && parsed.step >= 0 && parsed.step <= 3) {
        setStep(parsed.step)
      }
    } catch {
      /* ignore */
    }
  }, [reset])

  const formSnapshot = watch()
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ values: getValues(), step }),
      )
    } catch {
      /* ignore */
    }
  }, [formSnapshot, step, getValues])

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl border text-black text-sm bg-white transition-colors outline-none focus:ring-2 focus:ring-[#F7931A]/40 ${
      hasError ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-[#F7931A]'
    }`

  const labelClass = 'block text-sm font-semibold text-gray-700 mb-1.5'

  const validateStep1 = async () => {
    const ok = await trigger(STEP1_FIELDS)
    if (!ok) return false
    const v = getValues()
    const n = parseInt(v.age, 10)
    if (Number.isNaN(n) || n < 16 || n > 35) {
      await trigger('age')
      return false
    }
    if (v.between16and35 === 'no') {
      return false
    }
    return true
  }

  const validateStep2 = async () => {
    const ok = await trigger(['isAdult'])
    if (!ok) return false
    if (isAdult === 'yes') return true
    if (isAdult !== 'no') return false
    const fields: (keyof AmbassadorFormValues)[] = [
      'guardianConsentAccepted',
      'guardianName',
      'guardianRelationship',
      'guardianEmail',
      'guardianPhone',
    ]
    return trigger(fields)
  }

  const validateStep3 = async () => {
    const v = getValues()
    if (wordCount(v.hopeToLearn) > 200) {
      await trigger('hopeToLearn')
      return false
    }
    return trigger(STEP3_FIELDS)
  }

  const goNext = async () => {
    if (step === 0) {
      const valid = await validateStep1()
      if (valid) setStep(1)
      return
    }
    if (step === 1) {
      const valid = await validateStep2()
      if (valid) setStep(2)
      return
    }
    if (step === 2) {
      const valid = await validateStep3()
      if (valid) setStep(3)
    }
  }

  const goBack = () => {
    if (step > 0) setStep((s) => s - 1)
  }

  const onFinalSubmit = async (data: AmbassadorFormValues) => {
    setSubmitting(true)
    try {
      await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: 'Africa Bitcoin Education — Ambassador Application',
          ...data,
          timestamp: new Date().toISOString(),
        }),
      })
      setSubmitted(true)
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch {
        /* ignore */
      }
      reset(defaultValues)
    } catch {
      setSubmitted(true)
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch {
        /* ignore */
      }
      reset(defaultValues)
    } finally {
      setSubmitting(false)
    }
  }

  const progress = useMemo(() => ((step + 1) / 4) * 100, [step])

  if (submitted) {
    return (
      <div
        className="min-h-screen bg-black flex items-center justify-center px-4 py-24 pt-28"
        data-testid="application-success"
      >
        <div className="max-w-lg w-full bg-white/5 border border-[#F7931A]/30 rounded-3xl p-10 text-center">
          <CheckCircle size={56} className="text-[#F7931A] mx-auto mb-4" />
          <h1 className="text-white text-2xl font-bold mb-3">Application received</h1>
          <p className="text-gray-400 text-lg mb-8">
            Thank you for applying to become an Africa Bitcoin Education Ambassador. We will
            review your submission and contact you within 5–7 business days. Please check your
            email (including spam).
          </p>
          <button type="button" onClick={onClose} className="btn-outline-orange w-full justify-center">
            Back to home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-gray-50 pb-16 pt-24"
      data-testid="application-wizard"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-medium text-gray-600 hover:text-[#F7931A] inline-flex items-center gap-2 mb-4"
          >
            <ArrowLeft size={18} />
            Back to home
          </button>
          <p className="text-[#F7931A] text-sm font-semibold uppercase tracking-widest">
            Ambassador application
          </p>
          <h1 className="section-heading text-black mt-2 mb-2">
            Africa Bitcoin Education
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Complete all required fields. This takes about 5–15 minutes. Do not use AI tools to
            answer — we want your authentic voice.
          </p>
          <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#F7931A] transition-all duration-300"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={step + 1}
              aria-valuemin={1}
              aria-valuemax={4}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Step {step + 1} of 4
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onFinalSubmit)}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-10 space-y-6"
        >
          {/* Step 1: Personal */}
          {step === 0 && (
            <div className="space-y-5" data-testid="wizard-step-1">
              <h2 className="text-lg font-bold text-black border-b border-gray-100 pb-2">
                Section 1 — Eligibility & personal information
              </h2>

              <div>
                <label className={labelClass}>
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={inputClass(!!errors.fullName)}
                  {...register('fullName', { required: 'Required' })}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className={inputClass(!!errors.email)}
                  {...register('email', {
                    required: 'Required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <span className={labelClass}>
                  Are you between the ages of 16 and 35? <span className="text-red-500">*</span>
                </span>
                <div className="flex gap-6">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="yes"
                      {...register('between16and35', { required: 'Please select' })}
                    />
                    <span className="text-sm text-gray-800">Yes</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="no"
                      {...register('between16and35', { required: 'Please select' })}
                    />
                    <span className="text-sm text-gray-800">No</span>
                  </label>
                </div>
                {watch('between16and35') === 'no' && (
                  <p className="text-amber-700 text-xs mt-2">
                    You must be between 16 and 35 to apply.
                  </p>
                )}
                {errors.between16and35 && (
                  <p className="text-red-500 text-xs mt-1">{errors.between16and35.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={16}
                  max={35}
                  className={inputClass(!!errors.age)}
                  {...register('age', {
                    required: 'Required',
                    validate: (v) => {
                      const n = parseInt(v, 10)
                      if (Number.isNaN(n) || n < 16 || n > 35) return 'Age must be between 16 and 35'
                      return true
                    },
                  })}
                />
                {errors.age && (
                  <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  Gender <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="How you identify"
                  className={inputClass(!!errors.gender)}
                  {...register('gender', { required: 'Required' })}
                />
                {errors.gender && (
                  <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={inputClass(!!errors.country)}
                    {...register('country', { required: 'Required' })}
                  >
                    <option value="">Select country</option>
                    {AFRICAN_COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.country && (
                    <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>
                    City of residence <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={inputClass(!!errors.city)}
                    {...register('city', { required: 'Required' })}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Time zone <span className="text-red-500">*</span>
                </label>
                <select
                  className={inputClass(!!errors.timezone)}
                  {...register('timezone', { required: 'Required' })}
                >
                  <option value="">Select time zone</option>
                  {TIMEZONES.map((tz) => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
                {errors.timezone && (
                  <p className="text-red-500 text-xs mt-1">{errors.timezone.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  Primary language <span className="text-red-500">*</span>
                </label>
                <select
                  className={inputClass(!!errors.primaryLanguage)}
                  {...register('primaryLanguage', { required: 'Required' })}
                >
                  <option value="">Select language</option>
                  {PRIMARY_LANGUAGE_OPTIONS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
                {errors.primaryLanguage && (
                  <p className="text-red-500 text-xs mt-1">{errors.primaryLanguage.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  Do you speak any additional languages? <span className="text-red-500">*</span>
                </label>
                <select
                  className={inputClass(!!errors.additionalLanguages)}
                  {...register('additionalLanguages', { required: 'Required' })}
                >
                  <option value="">Select</option>
                  {ADDITIONAL_LANGUAGES_OPTIONS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
                {errors.additionalLanguages && (
                  <p className="text-red-500 text-xs mt-1">{errors.additionalLanguages.message}</p>
                )}
              </div>

              <div>
                <span className={labelClass}>
                  Can you read and write in the languages specified above?{' '}
                  <span className="text-red-500">*</span>
                </span>
                <div className="flex gap-6">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="yes"
                      {...register('readWriteLanguages', { required: 'Please select' })}
                    />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="no"
                      {...register('readWriteLanguages', { required: 'Please select' })}
                    />
                    <span className="text-sm">No</span>
                  </label>
                </div>
                {errors.readWriteLanguages && (
                  <p className="text-red-500 text-xs mt-1">{errors.readWriteLanguages.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  How did you hear about the Africa Bitcoin Education Ambassador Program?{' '}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  className={inputClass(!!errors.hearAbout)}
                  {...register('hearAbout', { required: 'Required' })}
                >
                  <option value="">Select</option>
                  {HEAR_ABOUT_OPTIONS.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
                {errors.hearAbout && (
                  <p className="text-red-500 text-xs mt-1">{errors.hearAbout.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Guardian */}
          {step === 1 && (
            <div className="space-y-5" data-testid="wizard-step-2">
              <h2 className="text-lg font-bold text-black border-b border-gray-100 pb-2">
                Section 2 — Guardian / parent (under 18)
              </h2>
              <p className="text-sm text-gray-600">
                If you are under 18, a parent or guardian must provide consent. If you are 18 or
                older, select that option and continue.
              </p>

              <div>
                <span className={labelClass}>
                  Are you 18 years or older? <span className="text-red-500">*</span>
                </span>
                <div className="flex flex-col gap-3">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="yes"
                      {...register('isAdult', { required: 'Please select' })}
                    />
                    <span className="text-sm">Yes, I am 18 or older</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="no"
                      {...register('isAdult', { required: 'Please select' })}
                    />
                    <span className="text-sm">No, I am under 18</span>
                  </label>
                </div>
                {errors.isAdult && (
                  <p className="text-red-500 text-xs mt-1">{errors.isAdult.message}</p>
                )}
              </div>

              {isAdult === 'no' && (
                <>
                  <div>
                    <span className={labelClass}>
                      Parental / guardian consent <span className="text-red-500">*</span>
                    </span>
                    <label className="flex items-start gap-3 cursor-pointer mt-2">
                      <input
                        type="checkbox"
                        className="mt-1 rounded border-gray-300"
                        {...register('guardianConsentAccepted', {
                          validate: (v, formValues) =>
                            formValues.isAdult === 'no'
                              ? v === true || 'Consent is required'
                              : true,
                        })}
                      />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        I am the parent/guardian, and I give consent for the applicant to
                        participate. I understand they will promote Bitcoin education, create
                        content, engage on social media, and represent the organization.
                      </span>
                    </label>
                    {errors.guardianConsentAccepted && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.guardianConsentAccepted.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>
                        Guardian / parent full name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className={inputClass(!!errors.guardianName)}
                        {...register('guardianName', {
                          validate: (v) =>
                            isAdult === 'no' ? (v?.trim() ? true : 'Required') : true,
                        })}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Relationship <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mother, Father"
                        className={inputClass(!!errors.guardianRelationship)}
                        {...register('guardianRelationship', {
                          validate: (v) =>
                            isAdult === 'no' ? (v?.trim() ? true : 'Required') : true,
                        })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>
                        Guardian email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        className={inputClass(!!errors.guardianEmail)}
                        {...register('guardianEmail', {
                          validate: (v) => {
                            if (isAdult !== 'no') return true
                            if (!v?.trim()) return 'Required'
                            return /^\S+@\S+\.\S+$/.test(v) ? true : 'Enter a valid email'
                          },
                        })}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Guardian phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        className={inputClass(!!errors.guardianPhone)}
                        {...register('guardianPhone', {
                          validate: (v) =>
                            isAdult === 'no' ? (v?.trim() ? true : 'Required') : true,
                        })}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 3: Commitment */}
          {step === 2 && (
            <div className="space-y-5" data-testid="wizard-step-3">
              <h2 className="text-lg font-bold text-black border-b border-gray-100 pb-2">
                Section 3 — Availability & commitment
              </h2>

              <div>
                <label className={labelClass}>
                  How many hours per week can you commit? <span className="text-red-500">*</span>
                </label>
                <select
                  className={inputClass(!!errors.hoursPerWeek)}
                  {...register('hoursPerWeek', { required: 'Required' })}
                >
                  <option value="">Select</option>
                  {HOURS_PER_WEEK_OPTIONS.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
                {errors.hoursPerWeek && (
                  <p className="text-red-500 text-xs mt-1">{errors.hoursPerWeek.message}</p>
                )}
              </div>

              <div>
                <span className={labelClass}>
                  Can you commit to a minimum of 3 months? <span className="text-red-500">*</span>
                </span>
                <div className="flex gap-6">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="yes"
                      {...register('commitThreeMonths', { required: 'Please select' })}
                    />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="no"
                      {...register('commitThreeMonths', { required: 'Please select' })}
                    />
                    <span className="text-sm">No</span>
                  </label>
                </div>
                {errors.commitThreeMonths && (
                  <p className="text-red-500 text-xs mt-1">{errors.commitThreeMonths.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  What do you hope to learn and achieve as an Africa Bitcoin Education Ambassador?{' '}
                  <span className="text-red-500">*</span>
                  <span className="font-normal text-gray-500"> (max 200 words)</span>
                </label>
                <textarea
                  rows={6}
                  className={`${inputClass(!!errors.hopeToLearn)} resize-y min-h-[120px]`}
                  {...register('hopeToLearn', {
                    required: 'Required',
                    validate: (v) =>
                      wordCount(v) <= 200 || `Maximum 200 words (currently ${wordCount(v)})`,
                  })}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {wordCount(watch('hopeToLearn'))} / 200 words
                </p>
                {errors.hopeToLearn && (
                  <p className="text-red-500 text-xs mt-1">{errors.hopeToLearn.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  How can you help your community as an Ambassador through this program?{' '}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  className={`${inputClass(!!errors.helpCommunity)} resize-y min-h-[100px]`}
                  {...register('helpCommunity', { required: 'Required' })}
                />
                {errors.helpCommunity && (
                  <p className="text-red-500 text-xs mt-1">{errors.helpCommunity.message}</p>
                )}
              </div>

              <div>
                <span className={labelClass}>
                  Do you have a reliable computer or laptop? <span className="text-red-500">*</span>
                </span>
                <div className="flex gap-6">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="yes"
                      {...register('hasLaptop', { required: 'Please select' })}
                    />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="no"
                      {...register('hasLaptop', { required: 'Please select' })}
                    />
                    <span className="text-sm">No</span>
                  </label>
                </div>
                {errors.hasLaptop && (
                  <p className="text-red-500 text-xs mt-1">{errors.hasLaptop.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  Average internet speed (run a test at{' '}
                  <a
                    href="https://fast.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F7931A] underline"
                  >
                    fast.com
                  </a>
                  ) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 25 Mbps download"
                  className={inputClass(!!errors.internetSpeed)}
                  {...register('internetSpeed', { required: 'Required' })}
                />
                {errors.internetSpeed && (
                  <p className="text-red-500 text-xs mt-1">{errors.internetSpeed.message}</p>
                )}
              </div>

              <div>
                <span className={labelClass}>
                  Familiar with video conferencing tools? <span className="text-red-500">*</span>
                </span>
                <div className="flex gap-6">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="yes"
                      {...register('videoConferencing', { required: 'Please select' })}
                    />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="no"
                      {...register('videoConferencing', { required: 'Please select' })}
                    />
                    <span className="text-sm">No</span>
                  </label>
                </div>
                {errors.videoConferencing && (
                  <p className="text-red-500 text-xs mt-1">{errors.videoConferencing.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Bitcoin + submit */}
          {step === 3 && (
            <div className="space-y-5" data-testid="wizard-step-4">
              <h2 className="text-lg font-bold text-black border-b border-gray-100 pb-2">
                Section 4 — Bitcoin knowledge & experience
              </h2>

              <div>
                <label className={labelClass}>
                  How would you rate your Bitcoin knowledge? <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {BITCOIN_KNOWLEDGE_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-start gap-3 cursor-pointer rounded-xl border border-gray-200 p-3 has-[:checked]:border-[#F7931A] has-[:checked]:bg-[#F7931A]/5"
                    >
                      <input
                        type="radio"
                        value={opt.value}
                        className="mt-1"
                        {...register('bitcoinKnowledge', { required: 'Please select' })}
                      />
                      <span className="text-sm text-gray-800">{opt.label}</span>
                    </label>
                  ))}
                </div>
                {errors.bitcoinKnowledge && (
                  <p className="text-red-500 text-xs mt-1">{errors.bitcoinKnowledge.message}</p>
                )}
              </div>

              <div>
                <span className={labelClass}>
                  Have you ever used Bitcoin? <span className="text-red-500">*</span>
                </span>
                <div className="flex gap-6">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="yes"
                      {...register('usedBitcoin', { required: 'Please select' })}
                    />
                    <span className="text-sm">Yes</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="no"
                      {...register('usedBitcoin', { required: 'Please select' })}
                    />
                    <span className="text-sm">No</span>
                  </label>
                </div>
                {errors.usedBitcoin && (
                  <p className="text-red-500 text-xs mt-1">{errors.usedBitcoin.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>What makes you unique? (optional)</label>
                <textarea
                  rows={3}
                  className={`${inputClass(false)} resize-y`}
                  {...register('uniqueOptional')}
                />
              </div>

              <div>
                <label className={labelClass}>Do you have any questions for us? (optional)</label>
                <textarea
                  rows={3}
                  className={`${inputClass(false)} resize-y`}
                  {...register('questionsForUs')}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Experience in teaching <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe any teaching, tutoring, or facilitation experience"
                  className={`${inputClass(!!errors.teachingExperience)} resize-y`}
                  {...register('teachingExperience', { required: 'Required' })}
                />
                {errors.teachingExperience && (
                  <p className="text-red-500 text-xs mt-1">{errors.teachingExperience.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  Programming experience <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe any coding or technical experience (none is OK)"
                  className={`${inputClass(!!errors.programmingExperience)} resize-y`}
                  {...register('programmingExperience', { required: 'Required' })}
                />
                {errors.programmingExperience && (
                  <p className="text-red-500 text-xs mt-1">{errors.programmingExperience.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>Anything else you would like to tell us? (optional)</label>
                <textarea
                  rows={3}
                  className={`${inputClass(false)} resize-y`}
                  {...register('anythingElse')}
                />
              </div>

              <div className="rounded-xl border border-gray-200 p-4 bg-gray-50">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-1 rounded border-gray-300"
                    {...register('consentAccepted', {
                      validate: (v) => v === true || 'You must confirm to submit',
                    })}
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    By submitting this application, I confirm that the information I have provided is
                    true and accurate. I consent to the collection and use of my information only for
                    program administration and communication purposes, and I agree to receive updates
                    related to the ambassador program.
                  </span>
                </label>
                {errors.consentAccepted && (
                  <p className="text-red-500 text-xs mt-2">{errors.consentAccepted.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Nav */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 border-t border-gray-100">
            {step > 0 && (
              <button
                type="button"
                onClick={goBack}
                className="btn-outline-orange justify-center flex-1 sm:flex-none"
              >
                <ArrowLeft size={18} />
                Back
              </button>
            )}
            {step < 3 && (
              <button
                type="button"
                onClick={goNext}
                className="btn-primary justify-center flex-1"
              >
                Continue
                <ArrowRight size={18} />
              </button>
            )}
            {step === 3 && (
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary justify-center flex-1 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit application
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
