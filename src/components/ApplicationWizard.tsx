import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, CheckCircle, Send } from 'lucide-react';
import {
  ADDITIONAL_LANGUAGES_OPTIONS,
  AFRICAN_COUNTRIES,
  HEAR_ABOUT_OPTIONS,
  HOURS_PER_WEEK_OPTIONS,
  PRIMARY_LANGUAGE_OPTIONS,
  STORAGE_KEY,
  TIMEZONES,
} from '../constants/ambassadorForm';

export type AmbassadorFormValues = {
  // Section 1
  fullName: string;
  email: string;
  between16and35: 'yes' | 'no' | '';
  age: string;
  gender: string;
  country: string;
  city: string;
  timezone: string;
  primaryLanguage: string;
  additionalLanguages: string;
  readWriteLanguages: 'yes' | 'no' | '';
  readWriteLanguagesDetail: string;
  hearAbout: string;
  // Section 2
  isAdult: 'yes' | 'no' | '';
  guardianConsentAccepted: boolean;
  guardianName: string;
  guardianRelationship: string;
  guardianEmail: string;
  guardianPhone: string;
  // Section 3
  hoursPerWeek: string;
  commitThreeMonths: 'yes' | 'no' | '';
  hopeToLearn: string;
  helpCommunity: string;
  hasLaptop: 'yes' | 'no' | '';
  internetSpeed: string;
  videoConferencing: 'yes' | 'no' | '';
  // Section 4
  bitcoinKnowledge: string;
  usedBitcoin: 'yes' | 'no' | '';
  uniqueOptional: string;
  questionsForUs: string;
  teachingExperience: string;
  programmingExperience: string;
  anythingElse: string;
  consentAccepted: boolean;
};

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
  readWriteLanguagesDetail: '',
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
};

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
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
  'readWriteLanguagesDetail',
  'hearAbout',
];

const STEP3_FIELDS: (keyof AmbassadorFormValues)[] = [
  'hoursPerWeek',
  'commitThreeMonths',
  'hopeToLearn',
  'helpCommunity',
  'hasLaptop',
  'internetSpeed',
  'videoConferencing',
];

type ApplicationWizardProps = {
  onClose: () => void;
};

export default function ApplicationWizard({ onClose }: Readonly<ApplicationWizardProps>) {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<AmbassadorFormValues>({
    defaultValues,
    mode: 'onTouched',
  });

  const isAdult = watch('isAdult');
  const readWriteLanguagesChoice = watch('readWriteLanguages');

  useEffect(() => {
    if (readWriteLanguagesChoice === 'no') {
      setValue('readWriteLanguagesDetail', '');
    }
  }, [readWriteLanguagesChoice, setValue]);

  // Restore draft
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { values?: AmbassadorFormValues; step?: number };
      if (parsed.values) reset({ ...defaultValues, ...parsed.values });
      if (typeof parsed.step === 'number' && parsed.step >= 0 && parsed.step <= 3) {
        setStep(parsed.step);
      }
    } catch {
      /* ignore */
    }
  }, [reset]);

  const formSnapshot = watch();
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ values: getValues(), step }));
    } catch {
      /* ignore */
    }
  }, [formSnapshot, step, getValues]);

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl border text-black text-sm bg-white transition-colors outline-none focus:ring-2 focus:ring-[#F7931A]/40 ${
      hasError ? 'border-red-400 focus:border-red-400' : 'border-gray-200 focus:border-[#F7931A]'
    }`;

  const labelClass = 'block text-sm font-semibold text-gray-700 mb-1.5';

  const validateStep1 = async () => {
    const ok = await trigger(STEP1_FIELDS);
    if (!ok) return false;
    const v = getValues();
    const n = Number.parseInt(v.age, 10);
    if (Number.isNaN(n) || n < 16 || n > 35) {
      await trigger('age');
      return false;
    }
    if (v.between16and35 === 'no') {
      return false;
    }
    return true;
  };

  const validateStep2 = async () => {
    const ok = await trigger(['isAdult']);
    if (!ok) return false;
    if (isAdult === 'yes') return true;
    if (isAdult !== 'no') return false;
    const fields: (keyof AmbassadorFormValues)[] = [
      'guardianConsentAccepted',
      'guardianName',
      'guardianRelationship',
      'guardianEmail',
      'guardianPhone',
    ];
    return trigger(fields);
  };

  const validateStep3 = async () => {
    const v = getValues();
    if (wordCount(v.hopeToLearn) > 200) {
      await trigger('hopeToLearn');
      return false;
    }
    return trigger(STEP3_FIELDS);
  };

  const goNext = async () => {
    if (step === 0) {
      const valid = await validateStep1();
      if (valid) setStep(1);
      return;
    }
    if (step === 1) {
      const valid = await validateStep2();
      if (valid) setStep(2);
      return;
    }
    if (step === 2) {
      const valid = await validateStep3();
      if (valid) setStep(3);
    }
  };

  const goBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const onFinalSubmit = async (data: AmbassadorFormValues) => {
    setSubmitting(true);
    try {
      await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: 'Africa Bitcoin Education — Ambassador Application',
          ...data,
          timestamp: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      reset(defaultValues);
    } catch {
      setSubmitted(true);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      reset(defaultValues);
    } finally {
      setSubmitting(false);
    }
  };

  const bitcoinKnowledgeOptions = [
    { value: 'beginner', label: t('application.bitcoinOptions.beginner') },
    { value: 'intermediate', label: t('application.bitcoinOptions.intermediate') },
    { value: 'advanced', label: t('application.bitcoinOptions.advanced') },
    { value: 'expert', label: t('application.bitcoinOptions.expert') },
  ];

  if (submitted) {
    return (
      <div
        className="min-h-screen bg-black flex items-center justify-center px-4 py-24 pt-28"
        data-testid="application-success"
      >
        <div className="max-w-lg w-full bg-white/5 border border-[#F7931A]/30 rounded-3xl p-10 text-center">
          <CheckCircle size={56} className="text-[#F7931A] mx-auto mb-4" />
          <h1 className="text-white text-2xl font-bold mb-3">{t('application.success.title')}</h1>
          <p className="text-gray-400 text-lg mb-8">{t('application.success.description')}</p>
          <button
            type="button"
            onClick={onClose}
            className="btn-outline-orange w-full justify-center"
          >
            {t('application.backHome')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16 pt-24" data-testid="application-wizard">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-medium text-gray-600 hover:text-[#F7931A] inline-flex items-center gap-2 mb-4"
          >
            <ArrowLeft size={18} />
            {t('application.backHome')}
          </button>
          <p className="text-[#F7931A] text-sm font-semibold uppercase tracking-widest">
            {t('application.label')}
          </p>
          <h1 className="section-heading text-black mt-2 mb-2">{t('application.title')}</h1>
          <p className="text-gray-600 text-sm leading-relaxed">{t('application.description')}</p>
          <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <progress
              className="h-full w-full [appearance:none] [&::-webkit-progress-bar]:bg-transparent [&::-webkit-progress-value]:bg-[#F7931A] [&::-moz-progress-bar]:bg-[#F7931A]"
              value={step + 1}
              max={4}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {t('application.stepOf', { current: step + 1, total: 4 })}
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
                {t('application.sections.one')}
              </h2>

              <div>
                <label className={labelClass}>
                  {t('application.fields.fullName')} <span className="text-red-500">*</span>
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
                  {t('application.fields.email')} <span className="text-red-500">*</span>
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

              {/* <div>
                <span className={labelClass}>
                  {t('application.fields.between16and35')} <span className="text-red-500">*</span>
                </span>
                <div className="flex gap-6">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="yes"
                      {...register('between16and35', { required: 'Please select' })}
                    />
                    <span className="text-sm text-gray-800">{t('common.yes')}</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="no"
                      {...register('between16and35', { required: 'Please select' })}
                    />
                    <span className="text-sm text-gray-800">{t('common.no')}</span>
                  </label>
                </div>
                {watch('between16and35') === 'no' && (
                  <p className="text-amber-700 text-xs mt-2">
                    {t('application.validation.ageRangeWarning')}
                  </p>
                )}
                {errors.between16and35 && (
                  <p className="text-red-500 text-xs mt-1">{errors.between16and35.message}</p>
                )}
              </div> */}

              <div>
                <label className={labelClass}>
                  {t('application.fields.age')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={16}
                  max={35}
                  className={inputClass(!!errors.age)}
                  {...register('age', {
                    required: 'Required',
                    validate: (v) => {
                      const n = Number.parseInt(v, 10);
                      if (Number.isNaN(n) || n < 16 || n > 35)
                        return 'Age must be between 16 and 35';
                      return true;
                    },
                  })}
                />
                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
              </div>

              <div>
                <label className={labelClass}>
                  {t('application.fields.gender')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={t('application.placeholders.gender')}
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
                    {t('application.fields.country')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={inputClass(!!errors.country)}
                    {...register('country', { required: 'Required' })}
                  >
                    <option value="">{t('application.select.country')}</option>
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
                    {t('application.fields.city')} <span className="text-red-500">*</span>
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
                  {t('application.fields.timezone')} <span className="text-red-500">*</span>
                </label>
                <select
                  className={inputClass(!!errors.timezone)}
                  {...register('timezone', { required: 'Required' })}
                >
                  <option value="">{t('application.select.timezone')}</option>
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
                  {t('application.fields.primaryLanguage')} <span className="text-red-500">*</span>
                </label>
                <select
                  className={inputClass(!!errors.primaryLanguage)}
                  {...register('primaryLanguage', { required: 'Required' })}
                >
                  <option value="">{t('application.select.language')}</option>
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
                  {t('application.fields.additionalLanguages')}{' '}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  className={inputClass(!!errors.additionalLanguages)}
                  {...register('additionalLanguages', { required: 'Required' })}
                >
                  <option value="">{t('application.select.generic')}</option>
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
                  {t('application.fields.readWriteLanguages')}{' '}
                  <span className="text-red-500">*</span>
                </span>
                <div className="flex flex-wrap gap-6">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="yes"
                      {...register('readWriteLanguages', { required: 'Please select' })}
                    />
                    <span className="text-sm text-gray-800">{t('common.yes')}</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="no"
                      {...register('readWriteLanguages', { required: 'Please select' })}
                    />
                    <span className="text-sm text-gray-800">{t('common.no')}</span>
                  </label>
                </div>
                {readWriteLanguagesChoice === 'yes' && (
                  <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50/80 p-4">
                    <label className={labelClass} htmlFor="readWriteLanguagesDetail">
                      {t('application.fields.readWriteLanguagesDetail')}{' '}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="readWriteLanguagesDetail"
                      type="text"
                      autoComplete="off"
                      placeholder={t('application.placeholders.readWriteLanguagesDetail')}
                      className={inputClass(!!errors.readWriteLanguagesDetail)}
                      {...register('readWriteLanguagesDetail', {
                        validate: (value, formValues) =>
                          formValues.readWriteLanguages !== 'yes' ||
                          value.trim().length > 0 ||
                          'Required',
                      })}
                    />
                    {errors.readWriteLanguagesDetail && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.readWriteLanguagesDetail.message}
                      </p>
                    )}
                  </div>
                )}
                {errors.readWriteLanguages && (
                  <p className="text-red-500 text-xs mt-1">{errors.readWriteLanguages.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  {t('application.fields.hearAbout')} <span className="text-red-500">*</span>
                </label>
                <select
                  className={inputClass(!!errors.hearAbout)}
                  {...register('hearAbout', { required: 'Required' })}
                >
                  <option value="">{t('application.select.generic')}</option>
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
                {t('application.sections.two')}
              </h2>
              <p className="text-sm text-gray-600">{t('application.sections.twoDescription')}</p>

              <div>
                <span className={labelClass}>
                  {t('application.fields.isAdult')} <span className="text-red-500">*</span>
                </span>
                <div className="flex flex-col gap-3">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="yes"
                      {...register('isAdult', { required: 'Please select' })}
                    />
                    <span className="text-sm">{t('application.options.adultYes')}</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="no"
                      {...register('isAdult', { required: 'Please select' })}
                    />
                    <span className="text-sm">{t('application.options.adultNo')}</span>
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
                      {t('application.fields.guardianConsent')}{' '}
                      <span className="text-red-500">*</span>
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
                        {t('application.fields.guardianConsentText')}
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
                        {t('application.fields.guardianName')}{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className={inputClass(!!errors.guardianName)}
                        {...register('guardianName', {
                          validate: (v) => {
                            if (isAdult !== 'no') return true;
                            return v?.trim() ? true : 'Required';
                          },
                        })}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        {t('application.fields.guardianRelationship')}{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder={t('application.placeholders.guardianRelationship')}
                        className={inputClass(!!errors.guardianRelationship)}
                        {...register('guardianRelationship', {
                          validate: (v) => {
                            if (isAdult !== 'no') return true;
                            return v?.trim() ? true : 'Required';
                          },
                        })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>
                        {t('application.fields.guardianEmail')}{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        className={inputClass(!!errors.guardianEmail)}
                        {...register('guardianEmail', {
                          validate: (v) => {
                            if (isAdult !== 'no') return true;
                            if (!v?.trim()) return 'Required';
                            return /^\S+@\S+\.\S+$/.test(v) ? true : 'Enter a valid email';
                          },
                        })}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        {t('application.fields.guardianPhone')}{' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        className={inputClass(!!errors.guardianPhone)}
                        {...register('guardianPhone', {
                          validate: (v) => {
                            if (isAdult !== 'no') return true;
                            return v?.trim() ? true : 'Required';
                          },
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
                {t('application.sections.three')}
              </h2>

              <div>
                <label className={labelClass}>
                  {t('application.fields.hoursPerWeek')} <span className="text-red-500">*</span>
                </label>
                <select
                  className={inputClass(!!errors.hoursPerWeek)}
                  {...register('hoursPerWeek', { required: 'Required' })}
                >
                  <option value="">{t('application.select.generic')}</option>
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
                  {t('application.fields.commitThreeMonths')}{' '}
                  <span className="text-red-500">*</span>
                </span>
                <div className="flex gap-6">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="yes"
                      {...register('commitThreeMonths', { required: 'Please select' })}
                    />
                    <span className="text-sm">{t('common.yes')}</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="no"
                      {...register('commitThreeMonths', { required: 'Please select' })}
                    />
                    <span className="text-sm">{t('common.no')}</span>
                  </label>
                </div>
                {errors.commitThreeMonths && (
                  <p className="text-red-500 text-xs mt-1">{errors.commitThreeMonths.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  {t('application.fields.hopeToLearn')} <span className="text-red-500">*</span>
                  <span className="font-normal text-gray-500"> {t('application.maxWords')}</span>
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
                  {t('application.wordsCount', {
                    current: wordCount(watch('hopeToLearn')),
                    max: 200,
                  })}
                </p>
                {errors.hopeToLearn && (
                  <p className="text-red-500 text-xs mt-1">{errors.hopeToLearn.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  {t('application.fields.helpCommunity')} <span className="text-red-500">*</span>
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
                  {t('application.fields.hasLaptop')} <span className="text-red-500">*</span>
                </span>
                <div className="flex gap-6">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="yes"
                      {...register('hasLaptop', { required: 'Please select' })}
                    />
                    <span className="text-sm">{t('common.yes')}</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="no"
                      {...register('hasLaptop', { required: 'Please select' })}
                    />
                    <span className="text-sm">{t('common.no')}</span>
                  </label>
                </div>
                {errors.hasLaptop && (
                  <p className="text-red-500 text-xs mt-1">{errors.hasLaptop.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  {t('application.fields.internetSpeedPrefix')}{' '}
                  <a
                    href="https://fast.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F7931A] underline"
                  >
                    fast.com
                  </a>
                  {t('application.fields.internetSpeedSuffix')}{' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder={t('application.placeholders.internetSpeed')}
                  className={inputClass(!!errors.internetSpeed)}
                  {...register('internetSpeed', { required: 'Required' })}
                />
                {errors.internetSpeed && (
                  <p className="text-red-500 text-xs mt-1">{errors.internetSpeed.message}</p>
                )}
              </div>

              <div>
                <span className={labelClass}>
                  {t('application.fields.videoConferencing')}{' '}
                  <span className="text-red-500">*</span>
                </span>
                <div className="flex gap-6">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="yes"
                      {...register('videoConferencing', { required: 'Please select' })}
                    />
                    <span className="text-sm">{t('common.yes')}</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="no"
                      {...register('videoConferencing', { required: 'Please select' })}
                    />
                    <span className="text-sm">{t('common.no')}</span>
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
                {t('application.sections.four')}
              </h2>

              <div>
                <label className={labelClass}>
                  {t('application.fields.bitcoinKnowledge')} <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {bitcoinKnowledgeOptions.map((opt) => (
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
                  {t('application.fields.usedBitcoin')} <span className="text-red-500">*</span>
                </span>
                <div className="flex gap-6">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="yes"
                      {...register('usedBitcoin', { required: 'Please select' })}
                    />
                    <span className="text-sm">{t('common.yes')}</span>
                  </label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="no"
                      {...register('usedBitcoin', { required: 'Please select' })}
                    />
                    <span className="text-sm">{t('common.no')}</span>
                  </label>
                </div>
                {errors.usedBitcoin && (
                  <p className="text-red-500 text-xs mt-1">{errors.usedBitcoin.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>{t('application.fields.uniqueOptional')}</label>
                <textarea
                  rows={3}
                  className={`${inputClass(false)} resize-y`}
                  {...register('uniqueOptional')}
                />
              </div>

              <div>
                <label className={labelClass}>{t('application.fields.questionsForUs')}</label>
                <textarea
                  rows={3}
                  className={`${inputClass(false)} resize-y`}
                  {...register('questionsForUs')}
                />
              </div>

              <div>
                <label className={labelClass}>
                  {t('application.fields.teachingExperience')}{' '}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder={t('application.placeholders.teaching')}
                  className={`${inputClass(!!errors.teachingExperience)} resize-y`}
                  {...register('teachingExperience', { required: 'Required' })}
                />
                {errors.teachingExperience && (
                  <p className="text-red-500 text-xs mt-1">{errors.teachingExperience.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  {t('application.fields.programmingExperience')}{' '}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder={t('application.placeholders.programming')}
                  className={`${inputClass(!!errors.programmingExperience)} resize-y`}
                  {...register('programmingExperience', { required: 'Required' })}
                />
                {errors.programmingExperience && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.programmingExperience.message}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>{t('application.fields.anythingElse')}</label>
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
                    {t('application.fields.submitConsent')}
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
                {t('application.back')}
              </button>
            )}
            {step < 3 && (
              <button type="button" onClick={goNext} className="btn-primary justify-center flex-1">
                {t('application.continue')}
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
                    {t('application.submitting')}
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    {t('application.submit')}
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
