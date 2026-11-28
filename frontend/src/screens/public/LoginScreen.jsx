import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import BrandLogo from '../../components/BrandLogo'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import { api, saveSession } from '../../api/client'
import { describeApiError } from '../../components/DataState'

const CURRENT_YEAR = new Date().getFullYear()
const IS_PROD = import.meta.env.PROD || import.meta.env.VITE_APP_ENV === 'production'

const DEFAULT_CREDENTIALS = IS_PROD
  ? null
  : {
      student: {
        identifier: 'miguel@school.edu.ph',
        password: 'student123',
      },
      teacher: {
        identifier: 'maria.santos@university.edu.ph',
        password: 'teacher123',
      },
    }

const INPUT_CLASS =
  'w-full bg-surface-container-low text-on-surface placeholder:text-outline/70 border border-outline-variant/50 pl-10 pr-4 py-2.5 sm:py-3 rounded-xl font-body-lg text-[14.5px] transition-all focus:bg-surface-container-lowest focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'

export default function LoginScreen() {
  const navigate = useNavigate()
  const [role, setRole] = useState('student')
  const [identifier, setIdentifier] = useState(DEFAULT_CREDENTIALS?.student.identifier ?? '')
  const [password, setPassword] = useState(DEFAULT_CREDENTIALS?.student.password ?? '')
  const [showPassword, setShowPassword] = useState(false)
  const [authState, setAuthState] = useState('idle')
  const [error, setError] = useState(null)

  const handleRoleChange = (nextRole) => {
    setRole(nextRole)
    if (DEFAULT_CREDENTIALS) {
      setIdentifier(DEFAULT_CREDENTIALS[nextRole].identifier)
      setPassword(DEFAULT_CREDENTIALS[nextRole].password)
    }
    setError(null)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (authState !== 'idle') return
    setAuthState('authenticating')
    setError(null)

    try {
      const auth = await api.auth.login({
        identifier: identifier.trim(),
        password,
      })
      saveSession(auth)
      setAuthState('authenticated')
      // Trust the role returned by the backend, not the selected tab.
      navigate(auth.user?.role === 'TEACHER' ? '/teacher/dashboard' : '/student/dashboard', {
        replace: true,
      })
    } catch (err) {
      setError(err)
      setAuthState('idle')
    }
  }

  const isStudent = role === 'student'
  const errorInfo = describeApiError(error)
  const loginErrorMessage =
    error?.status === 401
      ? 'Incorrect email, ID, or password. Check your credentials and try again.'
      : errorInfo?.message

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-dvh flex flex-col justify-between antialiased selection:bg-primary-fixed selection:text-on-primary-fixed overflow-x-hidden">
      <header className="w-full bg-surface/90 backdrop-blur-xl border-b border-outline-variant/50 shrink-0">
        <div className="max-w-[1120px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <BrandLogo to="/" />
          <Link
            className="inline-flex items-center gap-1.5 min-h-[44px] px-2 font-label-lg text-[14px] font-medium text-on-surface-variant hover:text-primary transition-colors"
            data-path="support"
            to="/#pilot-signup"
          >
            <span className="material-symbols-outlined text-[18px]">help</span>
            <span>Help &amp; Support</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 min-h-0 w-full max-w-[1120px] mx-auto px-4 md:px-6 py-6 flex items-center justify-center">
        <div className="flex flex-col w-full items-center justify-center">
          <div className="w-full max-w-[460px] relative">
            <Card variant="elevated" className="relative p-5 sm:p-7 flex flex-col gap-4">
              <div className="flex flex-col items-center text-center gap-1">
                <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">terminal</span>
                </div>
                <h1 className="font-display-lg text-[26px] sm:text-[28px] leading-[1.18] font-extrabold tracking-tight text-on-surface mt-1 text-balance">
                  Welcome to Aralytics
                </h1>
                <p className="font-body-md text-[14px] text-on-surface-variant max-w-[360px]">
                  AI-Powered Coding Diagnostics &amp; Feedback
                </p>
              </div>

              <div
                aria-label="Account role"
                className="bg-surface-container-low border border-outline-variant/50 p-1 rounded-xl flex items-center gap-1"
                role="tablist"
              >
                <button
                  aria-selected={isStudent}
                  className={
                    isStudent
                      ? 'flex-1 min-h-[44px] py-2 px-3 rounded-lg font-label-lg text-[15px] font-semibold transition-all flex items-center justify-center gap-1.5 bg-surface-container-lowest text-primary shadow-sm cursor-pointer'
                      : 'flex-1 min-h-[44px] py-2 px-3 rounded-lg font-label-lg text-[15px] font-medium transition-all flex items-center justify-center gap-1.5 text-on-surface-variant hover:text-on-surface cursor-pointer'
                  }
                  id="btn-role-student"
                  onClick={() => handleRoleChange('student')}
                  role="tab"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">school</span>
                  <span>Student</span>
                </button>
                <button
                  aria-selected={!isStudent}
                  className={
                    !isStudent
                      ? 'flex-1 min-h-[44px] py-2 px-3 rounded-lg font-label-lg text-[15px] font-semibold transition-all flex items-center justify-center gap-1.5 bg-surface-container-lowest text-primary shadow-sm cursor-pointer'
                      : 'flex-1 min-h-[44px] py-2 px-3 rounded-lg font-label-lg text-[15px] font-medium transition-all flex items-center justify-center gap-1.5 text-on-surface-variant hover:text-on-surface cursor-pointer'
                  }
                  id="btn-role-teacher"
                  onClick={() => handleRoleChange('teacher')}
                  role="tab"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">person_check</span>
                  <span>Teacher / Educator</span>
                </button>
              </div>

              {error && (
                <div
                  className={`rounded-2xl border p-4 flex items-start gap-3 ${
                    errorInfo?.tone === 'warning'
                      ? 'bg-warn-tint border-warn/20'
                      : 'bg-danger-tint border-error/20'
                  }`}
                  role="alert"
                >
                  <span
                    className={`material-symbols-outlined text-[22px] shrink-0 ${
                      errorInfo?.tone === 'warning' ? 'text-warn' : 'text-error'
                    }`}
                  >
                    {errorInfo?.icon || 'error'}
                  </span>
                  <div className="min-w-0">
                    <p
                      className={`font-label-lg text-[15px] font-bold ${
                        errorInfo?.tone === 'warning' ? 'text-warn' : 'text-error'
                      }`}
                    >
                      {error?.status === 401 ? 'Sign-in failed' : errorInfo?.title}
                    </p>
                    <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
                      {loginErrorMessage}
                    </p>
                    {error?.isOffline && (
                      <p className="font-body-sm text-[12px] text-outline mt-1">
                        Run the backend on port 8080 or set VITE_API_BASE_URL, then retry.
                      </p>
                    )}
                  </div>
                </div>
              )}

              <form className="flex flex-col gap-3.5" id="login-form" onSubmit={handleLogin}>
                <div className="flex flex-col gap-1">
                  <label
                    className="font-label-lg text-[14px] font-semibold text-on-surface flex items-center justify-between gap-2"
                    htmlFor="identifier-input"
                    id="identifier-label"
                  >
                    <span>{isStudent ? 'Student ID or Institutional Email' : 'School Email or Teacher ID'}</span>
                    <Badge dot={false} id="role-badge" tone={isStudent ? 'on-track' : 'mastered'}>
                      {isStudent ? 'Student Access' : 'Faculty & Staff'}
                    </Badge>
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined text-outline absolute left-3.5 pointer-events-none text-[20px]">
                      badge
                    </span>
                    <input
                      autoComplete="username"
                      className={INPUT_CLASS}
                      id="identifier-input"
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder={
                        IS_PROD
                          ? isStudent
                            ? 'Student ID or you@school.edu.ph'
                            : 'Teacher ID or you@school.edu.ph'
                          : isStudent
                            ? 'e.g. s2024-9102 or miguel@school.edu.ph'
                            : 'e.g. maria.santos@university.edu.ph'
                      }
                      required
                      type="text"
                      value={identifier}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <label className="font-label-lg text-[14px] font-semibold text-on-surface" htmlFor="password-input">
                      Password
                    </label>
                    <Link
                      className="font-label-md text-[12.5px] text-primary hover:text-on-primary-fixed-variant transition-colors font-semibold"
                      to="/forgot-password"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined text-outline absolute left-3.5 pointer-events-none text-[20px]">
                      lock
                    </span>
                    <input
                      autoComplete="current-password"
                      className={`${INPUT_CLASS} pr-12`}
                      id="password-input"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your security password"
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                    />
                    <button
                      aria-label="Toggle password visibility"
                      className="absolute right-1 text-outline hover:text-on-surface flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg transition-colors cursor-pointer"
                      id="toggle-password"
                      onClick={() => setShowPassword((prev) => !prev)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]" id="password-visibility-icon">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer select-none group min-h-[44px]">
                    <div className="relative flex items-center">
                      <input className="peer sr-only" id="remember-me" type="checkbox" />
                      <div className="w-4.5 h-4.5 rounded-md bg-surface-container-low border border-outline-variant/60 peer-checked:bg-primary peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 transition-all flex items-center justify-center shadow-xs peer-checked:[&>span]:opacity-100">
                        <span className="material-symbols-outlined text-on-primary text-[14px] opacity-0 transition-opacity">
                          check
                        </span>
                      </div>
                    </div>
                    <span className="font-body-md text-[14px] text-on-surface-variant group-hover:text-on-surface transition-colors font-medium">
                      Remember this device
                    </span>
                  </label>
                  <Badge tone="mastered">AI Engine Active</Badge>
                </div>

                <Button
                  className="w-full mt-1"
                  disabled={authState !== 'idle'}
                  id="btn-submit"
                  size="lg"
                  type="submit"
                  variant="primary"
                >
                  {authState === 'authenticating' && (
                    <>
                      <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                      <span>Authenticating...</span>
                    </>
                  )}
                  {authState === 'authenticated' && (
                    <>
                      <span className="material-symbols-outlined text-[20px]">check_circle</span>
                      <span>Authenticated</span>
                    </>
                  )}
                  {authState === 'idle' && (
                    <>
                      <span>Sign In to Aralytics</span>
                      <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </>
                  )}
                </Button>
              </form>

              <div className="bg-surface-container-low border border-outline-variant/40 rounded-2xl p-3.5 flex flex-col gap-1.5">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
                    verified_user
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-label-lg text-[14px] font-semibold text-on-surface">
                      Institutional Credentials
                    </span>
                    <p className="font-body-md text-[12.5px] leading-snug text-on-surface-variant">
                      Aralytics accounts are issued by your school administrator or teacher. Need access? Activate an
                      issued access key.
                    </p>
                  </div>
                </div>
                <div className="flex justify-end pt-0.5">
                  <Link
                    className="font-label-md text-[13px] text-primary hover:text-on-primary-fixed-variant flex items-center gap-1 transition-colors font-semibold"
                    to="/register"
                  >
                    <span>Activate issued account / key</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
                  </Link>
                </div>
              </div>
            </Card>

            <div className="flex flex-col items-center text-center gap-1 mt-3">
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-secondary">shield</span>
                <span className="font-label-md text-[12px] font-medium">
                  Compliant with Philippine Data Privacy Act of 2012 (RA 10173)
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full bg-surface-container-low/60 border-t border-outline-variant/40 py-3.5 shrink-0">
        <div className="max-w-[1120px] mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-body-md text-[13.5px] text-on-surface-variant">
            © {CURRENT_YEAR} Aralytics Platform. Empowering learners and educators nationwide.
          </span>
          <div className="flex items-center gap-5">
            <Link className="font-label-md text-[13.5px] font-medium text-on-surface-variant hover:text-primary transition-colors" to="/#pilot-signup">
              Request Pilot
            </Link>
            <Link className="font-label-md text-[13.5px] font-medium text-on-surface-variant hover:text-primary transition-colors" to="/register">
              Activate Key
            </Link>
            <Link className="font-label-md text-[13.5px] font-medium text-on-surface-variant hover:text-primary transition-colors" to="/">
              Home
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
