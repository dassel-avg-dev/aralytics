import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BrandLogo from '../../components/BrandLogo'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import { api, saveSession } from '../../api/client'
import { DataError } from '../../components/DataState'

const CURRENT_YEAR = new Date().getFullYear()
const IS_PROD = import.meta.env.PROD || import.meta.env.VITE_APP_ENV === 'production'

const KEY_PLACEHOLDERS = IS_PROD
  ? { school: 'SCHOOL-CODE-2025', student: 'ACCESS-KEY', educator: 'FACULTY-PIN' }
  : { school: 'e.g. STJUDE-MNL-2025', student: 'KEY-8821-PY', educator: 'FAC-2025-DEPED' }

const INPUT_CLASS =
  'w-full pl-11 pr-4 py-3.5 bg-surface-container-low text-on-surface border border-outline-variant/50 font-body-lg text-[15px] rounded-xl placeholder:text-outline/70 focus:bg-surface-container-lowest focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all'

export default function AccountActivationScreen() {
  const navigate = useNavigate()
  const [role, setRole] = useState('student')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [institutionCode, setInstitutionCode] = useState('')
  const [accessKey, setAccessKey] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [verified, setVerified] = useState(null)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  const hasLength = password.length >= 8
  const hasNumber = /\d/.test(password)
  const hasSpecialOrUpper = /[A-Z!@#$%^&*(),.?":{}|<>]/.test(password)
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword

  let score = 0
  if (password.length > 0) score++
  if (hasLength) score++
  if (hasLength && hasNumber) score++
  if (hasLength && hasNumber && hasSpecialOrUpper) score++

  let strengthLabelText = 'Minimum 8 chars & 1 number'
  let strengthLabelClass = 'font-label-md text-label-md text-on-surface-variant'
  const barColors = [
    'bg-outline-variant',
    'bg-outline-variant',
    'bg-outline-variant',
    'bg-outline-variant',
  ]

  if (score === 1) {
    barColors[0] = 'bg-error'
    strengthLabelText = 'Too weak'
    strengthLabelClass = 'font-label-sm text-label-sm text-error font-semibold'
  } else if (score === 2) {
    barColors[0] = 'bg-accent-yellow'
    barColors[1] = 'bg-accent-yellow'
    strengthLabelText = 'Moderate'
    strengthLabelClass = 'font-label-sm text-label-sm text-warn font-semibold'
  } else if (score >= 3) {
    barColors[0] = 'bg-secondary'
    barColors[1] = 'bg-secondary'
    barColors[2] = 'bg-secondary'
    if (score === 4) {
      barColors[3] = 'bg-secondary'
      strengthLabelText = 'Strong & Secure'
    } else {
      strengthLabelText = 'Good'
    }
    strengthLabelClass = 'font-label-sm text-label-sm text-secondary font-semibold'
  }

  const isStudent = role === 'student'
  const step = verified ? 2 : 1

  const handleVerifyKey = async (e) => {
    e.preventDefault()
    if (status !== 'idle') return
    setError(null)
    setStatus('validating')
    try {
      const res = await api.auth.verifyKey({
        institutionCode: institutionCode.trim(),
        accessKey: accessKey.trim(),
        role: isStudent ? 'STUDENT' : 'TEACHER',
      })
      setVerified(res)
      setStatus('idle')
    } catch (err) {
      setError(err)
      setStatus('idle')
    }
  }

  const handleActivation = async (e) => {
    e.preventDefault()
    if (status !== 'idle' || !verified) return
    setError(null)

    if (!passwordsMatch) {
      setError(new Error('Passwords do not match. Re-enter both passwords.'))
      return
    }
    if (!acceptedTerms) {
      setError(new Error('Please accept the Terms of Service and Data Privacy Act notice.'))
      return
    }

    setStatus('validating')
    try {
      const auth = await api.auth.activate({
        activationToken: verified.activationToken,
        fullName: fullName.trim(),
        email: email.trim(),
        password,
      })
      saveSession(auth)
      setStatus('verified')
      navigate(auth.user?.role === 'TEACHER' ? '/teacher/dashboard' : '/student/dashboard', {
        replace: true,
      })
    } catch (err) {
      if (err?.status === 401 || err?.isUnauthorized) {
        setVerified(null)
        setError(new Error(err.message || 'Your activation key session expired. Please re-verify your key.'))
      } else {
        setError(err)
      }
      setStatus('idle')
    }
  }

  const handleRoleChange = (nextRole) => {
    setRole(nextRole)
    setError(null)
  }

  const handleChangeKey = () => {
    setVerified(null)
    setError(null)
    setStatus('idle')
  }

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen flex flex-col justify-between antialiased selection:bg-primary-fixed selection:text-on-primary-fixed overflow-x-hidden">
      <header className="w-full bg-surface/90 backdrop-blur-xl border-b border-outline-variant/50">
        <div className="max-w-[1120px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <BrandLogo to="/" />
          <Link
            className="inline-flex items-center gap-1.5 min-h-[44px] px-2 font-label-lg text-[14px] text-on-surface-variant hover:text-primary transition-colors font-medium"
            data-path="support"
            to="/#pilot-signup"
          >
            <span className="material-symbols-outlined text-[20px]">help</span>
            <span>Help &amp; Support</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1120px] mx-auto px-4 md:px-6 py-8 flex items-center justify-center">
        <div className="flex flex-col w-full items-center justify-center">
          <div className="relative w-full max-w-[620px]">
            <Card variant="elevated" className="w-full px-5 sm:px-8 py-6 sm:py-8">
              <div className="flex flex-col items-center text-center">
                <Badge className="mb-3" dot={false} tone="on-track">
                  Institutional Onboarding
                </Badge>
                <h1 className="font-display-lg text-[28px] leading-[1.2] sm:text-display-lg text-on-surface tracking-tight mb-2 text-balance">
                  Activate Your Account
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[500px] text-center mb-5 leading-relaxed">
                  Enter your school-issued registration key or credentials to link your academic profile with Aralytics.
                </p>

                <div aria-label="Activation steps" className="w-full max-w-[440px] grid grid-cols-2 gap-2 mb-5">
                  <div
                    className={`px-3 py-2 rounded-xl border text-center font-label-md text-[13px] font-semibold transition-colors ${
                      step === 1
                        ? 'bg-primary-fixed/70 border-primary/40 text-primary'
                        : 'bg-status-ok-tint/70 border-secondary/30 text-secondary'
                    }`}
                  >
                    1. Verify Key
                  </div>
                  <div
                    className={`px-3 py-2 rounded-xl border text-center font-label-md text-[13px] font-semibold transition-colors ${
                      step === 2
                        ? 'bg-primary-fixed/70 border-primary/40 text-primary'
                        : 'bg-surface-container-low border-outline-variant/50 text-on-surface-variant'
                    }`}
                  >
                    2. Set Credentials
                  </div>
                </div>

                {step === 1 && (
                  <div
                    aria-label="Account role"
                    className="w-full max-w-[440px] p-1 bg-surface-container-low border border-outline-variant/50 rounded-xl flex items-center mb-6"
                    role="tablist"
                  >
                    <button
                      aria-selected={isStudent}
                      className={
                        isStudent
                          ? 'flex-1 min-h-[44px] py-2 px-3 rounded-lg font-label-lg text-[14px] sm:text-[15px] font-semibold transition-all flex items-center justify-center gap-1.5 bg-surface-container-lowest text-primary shadow-sm cursor-pointer'
                          : 'flex-1 min-h-[44px] py-2 px-3 rounded-lg font-label-lg text-[14px] sm:text-[15px] font-medium transition-all flex items-center justify-center gap-1.5 text-on-surface-variant hover:text-on-surface cursor-pointer'
                      }
                      id="role-student"
                      onClick={() => handleRoleChange('student')}
                      role="tab"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">school</span>
                      <span>Student Activation</span>
                    </button>
                    <button
                      aria-selected={!isStudent}
                      className={
                        !isStudent
                          ? 'flex-1 min-h-[44px] py-2 px-3 rounded-lg font-label-lg text-[14px] sm:text-[15px] font-semibold transition-all flex items-center justify-center gap-1.5 bg-surface-container-lowest text-primary shadow-sm cursor-pointer'
                          : 'flex-1 min-h-[44px] py-2 px-3 rounded-lg font-label-lg text-[14px] sm:text-[15px] font-medium transition-all flex items-center justify-center gap-1.5 text-on-surface-variant hover:text-on-surface cursor-pointer'
                      }
                      id="role-educator"
                      onClick={() => handleRoleChange('educator')}
                      role="tab"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">co_present</span>
                      <span>Teacher / School Setup</span>
                    </button>
                  </div>
                )}
              </div>

              {step === 1 ? (
                <form className="space-y-4" id="verify-key-form" onSubmit={handleVerifyKey}>
                  {error && <DataError error={error} />}

                  {!IS_PROD && (
                    <div className="p-3 bg-surface-container-low border border-outline-variant/50 rounded-xl flex items-center justify-between gap-3">
                      <span className="font-label-md text-[13px] text-on-surface-variant">
                        Demo environment: prefill a valid {isStudent ? 'student' : 'faculty'} key.
                      </span>
                      <button
                        className="shrink-0 px-3 py-1.5 min-h-[36px] rounded-lg bg-surface-container-lowest border border-outline-variant/60 font-label-md text-[13px] font-semibold text-primary hover:bg-primary-fixed/40 transition-colors cursor-pointer"
                        onClick={() => {
                          setInstitutionCode('STJUDE-MNL-2025')
                          setAccessKey(isStudent ? 'KEY-8821-PY' : 'FAC-2025-DEPED')
                          setError(null)
                        }}
                        type="button"
                      >
                        Fill Demo Key
                      </button>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-label-lg text-[15px] font-semibold text-on-surface" htmlFor="institution-code">
                        School or Institution Code
                      </label>
                      {!IS_PROD && (
                        <span className="font-label-md text-label-md text-on-surface-variant">e.g. STJUDE-MNL-2025</span>
                      )}
                    </div>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-outline text-[22px] pointer-events-none">domain</span>
                      <input
                        autoComplete="organization"
                        className={`${INPUT_CLASS} uppercase tracking-wider`}
                        id="institution-code"
                        onChange={(e) => setInstitutionCode(e.target.value)}
                        placeholder={KEY_PLACEHOLDERS.school}
                        required
                        type="text"
                        value={institutionCode}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <label className="font-label-lg text-[15px] font-semibold text-on-surface" htmlFor="access-key" id="key-label">
                        {isStudent ? 'Access Key or Student ID' : 'Faculty Registration PIN'}
                      </label>
                      <span className="font-label-md text-label-md text-on-surface-variant" id="key-hint">
                        {isStudent ? 'Issued by Teacher/Adviser' : 'Issued by School Admin'}
                      </span>
                    </div>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-outline text-[22px] pointer-events-none">key</span>
                      <input
                        autoComplete="off"
                        className={`${INPUT_CLASS} uppercase tracking-wider`}
                        id="access-key"
                        onChange={(e) => setAccessKey(e.target.value)}
                        placeholder={isStudent ? KEY_PLACEHOLDERS.student : KEY_PLACEHOLDERS.educator}
                        required
                        type="text"
                        value={accessKey}
                      />
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    disabled={status !== 'idle'}
                    id="verify-btn"
                    size="lg"
                    type="submit"
                    variant="primary"
                  >
                    {status === 'validating' ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                        <span>Verifying Institutional Key...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[22px]">verified_user</span>
                        <span>Verify Key &amp; Continue</span>
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <form className="space-y-4" id="activation-form" onSubmit={handleActivation}>
                  {error && <DataError error={error} />}

                  <div className="p-3.5 bg-status-ok-tint/60 border border-secondary/30 rounded-xl flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="material-symbols-outlined text-secondary text-[22px] shrink-0">verified</span>
                      <div className="min-w-0">
                        <p className="font-label-lg text-[14px] font-semibold text-on-surface truncate">
                          {verified.schoolName || verified.institutionCode}
                        </p>
                        <p className="font-mono text-[12px] text-secondary font-medium">
                          {verified.institutionCode}
                        </p>
                      </div>
                    </div>
                    <button
                      className="shrink-0 px-3 py-1.5 min-h-[36px] rounded-lg bg-surface-container-lowest border border-outline-variant/60 font-label-md text-[13px] font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                      onClick={handleChangeKey}
                      type="button"
                    >
                      Change key
                    </button>
                  </div>

                  {!IS_PROD && (
                    <div className="p-3 bg-surface-container-low border border-outline-variant/50 rounded-xl flex items-center justify-between gap-3">
                      <span className="font-label-md text-[13px] text-on-surface-variant">
                        Demo environment: prefill profile &amp; credentials.
                      </span>
                      <button
                        className="shrink-0 px-3 py-1.5 min-h-[36px] rounded-lg bg-surface-container-lowest border border-outline-variant/60 font-label-md text-[13px] font-semibold text-primary hover:bg-primary-fixed/40 transition-colors cursor-pointer"
                        onClick={() => {
                          const digits = String(Math.floor(1000 + Math.random() * 9000))
                          const demoTeacher = verified?.role === 'TEACHER' || !isStudent
                          setFullName(demoTeacher ? 'Elena Santos' : 'Juan Dela Cruz')
                          setEmail(
                            demoTeacher
                              ? `elena.demo.${digits}@university.edu.ph`
                              : `juan.demo.${digits}@school.edu.ph`
                          )
                          setPassword('DemoPass123!')
                          setConfirmPassword('DemoPass123!')
                          setAcceptedTerms(true)
                          setError(null)
                        }}
                        type="button"
                      >
                        Fill Demo Profile
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-label-lg text-[15px] font-semibold text-on-surface mb-1.5" htmlFor="full-name">
                        Full Name
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3.5 text-outline text-[22px] pointer-events-none">badge</span>
                        <input
                          autoComplete="name"
                          className={INPUT_CLASS}
                          id="full-name"
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Juan Dela Cruz"
                          required
                          type="text"
                          value={fullName}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-label-lg text-[15px] font-semibold text-on-surface mb-1.5" htmlFor="email">
                        Email Address
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3.5 text-outline text-[22px] pointer-events-none">mail</span>
                        <input
                          autoComplete="email"
                          className={INPUT_CLASS}
                          id="email"
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@school.edu.ph"
                          required
                          type="email"
                          value={email}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="block font-label-lg text-[15px] font-semibold text-on-surface mb-1.5" htmlFor="password">
                        Set Your Password
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3.5 text-outline text-[22px] pointer-events-none">lock</span>
                        <input
                          autoComplete="new-password"
                          className={`${INPUT_CLASS} pr-12`}
                          id="password"
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                        />
                        <button
                          aria-label="Toggle password visibility"
                          className="absolute right-1 text-outline hover:text-on-surface transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg cursor-pointer"
                          onClick={() => setShowPassword((prev) => !prev)}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[20px]" id="toggle-icon-1">
                            {showPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block font-label-lg text-[15px] font-semibold text-on-surface mb-1.5" htmlFor="confirm-password">
                        Confirm Password
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3.5 text-outline text-[22px] pointer-events-none">lock_reset</span>
                        <input
                          autoComplete="new-password"
                          className={`${INPUT_CLASS} pr-12`}
                          id="confirm-password"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                        />
                        <button
                          aria-label="Toggle confirm password visibility"
                          className="absolute right-1 text-outline hover:text-on-surface transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg cursor-pointer"
                          onClick={() => setShowConfirmPassword((prev) => !prev)}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[20px]" id="toggle-icon-2">
                            {showConfirmPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface-container-low border border-outline-variant/40 rounded-xl p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md text-label-lg text-on-surface-variant flex items-center gap-1.5 font-medium">
                        <span className="material-symbols-outlined text-[16px]">shield</span>
                        Password Requirements:
                      </span>
                      <span className={strengthLabelClass} id="strength-label">
                        {strengthLabelText}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
                      <div className={`rounded-full h-full transition-colors duration-300 ${barColors[0]}`} id="bar-1"></div>
                      <div className={`rounded-full h-full transition-colors duration-300 ${barColors[1]}`} id="bar-2"></div>
                      <div className={`rounded-full h-full transition-colors duration-300 ${barColors[2]}`} id="bar-3"></div>
                      <div className={`rounded-full h-full transition-colors duration-300 ${barColors[3]}`} id="bar-4"></div>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-on-surface-variant font-label-md text-label-md pt-0.5">
                      <span className={`flex items-center gap-1.5 ${hasLength ? 'text-secondary font-semibold' : 'text-on-surface-variant'}`} id="req-length">
                        <span className={`material-symbols-outlined text-[16px] ${hasLength ? 'text-secondary' : 'text-outline'}`}>
                          {hasLength ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        8+ Characters
                      </span>
                      <span className={`flex items-center gap-1.5 ${hasNumber ? 'text-secondary font-semibold' : 'text-on-surface-variant'}`} id="req-number">
                        <span className={`material-symbols-outlined text-[16px] ${hasNumber ? 'text-secondary' : 'text-outline'}`}>
                          {hasNumber ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        At least 1 Number
                      </span>
                      <span className={`flex items-center gap-1.5 ${passwordsMatch ? 'text-secondary font-semibold' : 'text-on-surface-variant'}`} id="req-match">
                        <span className={`material-symbols-outlined text-[16px] ${passwordsMatch ? 'text-secondary' : 'text-outline'}`}>
                          {passwordsMatch ? 'check_circle' : 'radio_button_unchecked'}
                        </span>
                        Passwords match
                      </span>
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        checked={acceptedTerms}
                        className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary focus:ring-offset-0 transition cursor-pointer accent-primary"
                        id="privacy-consent"
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        required
                        type="checkbox"
                      />
                      <span className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        I agree to the{' '}
                        <Link className="text-primary font-semibold hover:underline" data-path="terms" to="/#pilot-signup">
                          Terms of Service
                        </Link>{' '}
                        and acknowledge institutional data processing under the{' '}
                        <span className="text-on-surface font-medium">Philippine Data Privacy Act of 2012 (RA 10173)</span>.
                      </span>
                    </label>
                  </div>

                  <Button
                    className="w-full"
                    disabled={status !== 'idle'}
                    id="submit-btn"
                    size="lg"
                    type="submit"
                    variant="primary"
                  >
                    {status === 'validating' && (
                      <>
                        <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                        <span>Activating Account...</span>
                      </>
                    )}
                    {status === 'verified' && (
                      <>
                        <span className="material-symbols-outlined text-[20px]">check_circle</span>
                        <span>Account Activated! Redirecting...</span>
                      </>
                    )}
                    {status === 'idle' && (
                      <>
                        <span className="material-symbols-outlined text-[22px]">how_to_reg</span>
                        <span id="btn-text">
                          {isStudent ? 'Complete Registration & Sign In' : 'Set Up Faculty Account'}
                        </span>
                      </>
                    )}
                  </Button>
                </form>
              )}

              <div className="mt-6 p-3.5 bg-surface-container rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-status-ok-tint text-secondary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">corporate_fare</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-lg text-body-md text-on-surface font-semibold">
                      Representing a School or Division?
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Deploy diagnostic AI models across your faculty.
                    </span>
                  </div>
                </div>
                <Link
                  className="shrink-0 font-label-lg text-body-md text-primary hover:text-on-primary-fixed-variant font-semibold flex items-center gap-0.5 min-h-[44px]"
                  data-path="pilot-inquiry"
                  to="/#pilot-signup"
                >
                  <span>Inquire</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>

              <div className="mt-5 pt-4 border-t border-outline-variant/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div className="font-body-md text-body-md text-on-surface-variant">
                  Already activated your profile?{' '}
                  <Link className="text-primary font-semibold hover:underline inline-flex items-center gap-0.5 ml-1" data-path="login" to="/login">
                    <span>Sign in</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
                <Link
                  className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors inline-flex items-center gap-1 font-medium min-h-[44px]"
                  data-path="activation-assistance"
                  to="/#pilot-signup"
                >
                  <span className="material-symbols-outlined text-[18px]">contact_support</span>
                  <span>Lost Registration Key?</span>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <footer className="w-full bg-surface-container-low/60 border-t border-outline-variant/40 py-5">
        <div className="max-w-[1120px] mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-body-md text-body-md text-on-surface-variant">
            © {CURRENT_YEAR} Aralytics Platform. Empowering learners and educators nationwide.
          </span>
          <div className="flex items-center gap-5">
            <Link className="font-label-md text-body-md text-on-surface-variant hover:text-primary transition-colors" to="/#pilot-signup">
              Request Pilot
            </Link>
            <Link className="font-label-md text-body-md text-on-surface-variant hover:text-primary transition-colors" to="/login">
              Sign In
            </Link>
            <Link className="font-label-md text-body-md text-on-surface-variant hover:text-primary transition-colors" to="/">
              Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
