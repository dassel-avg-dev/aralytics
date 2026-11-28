import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import BrandLogo from '../../components/BrandLogo'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import { api } from '../../api/client'
import { describeApiError } from '../../components/DataState'

const CURRENT_YEAR = new Date().getFullYear()
const PASSWORD_RULE = /^(?=.*\d).{8,72}$/

const INPUT_CLASS =
  'w-full bg-surface-container-low text-on-surface placeholder:text-outline/70 border border-outline-variant/50 pl-11 pr-12 py-3.5 rounded-xl font-body-lg text-[15px] transition-all focus:bg-surface-container-lowest focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'

export default function ResetPasswordScreen() {
  const [params] = useSearchParams()
  const token = params.get('token') || ''
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword
  const passwordValid = PASSWORD_RULE.test(password)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status !== 'idle') return
    setError(null)
    if (!passwordValid) {
      setError(new Error('Password must be 8-72 characters and contain at least one number.'))
      return
    }
    if (!passwordsMatch) {
      setError(new Error('Passwords do not match. Re-enter both passwords.'))
      return
    }
    setStatus('saving')
    try {
      await api.auth.resetPassword({ token, newPassword: password })
      setStatus('done')
    } catch (err) {
      setError(err)
      setStatus('idle')
    }
  }

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen flex flex-col justify-between antialiased selection:bg-primary-fixed selection:text-on-primary-fixed overflow-x-hidden">
      <header className="w-full bg-surface/90 backdrop-blur-xl border-b border-outline-variant/50">
        <div className="max-w-[1120px] mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <BrandLogo to="/" />
          <Link
            className="inline-flex items-center gap-1.5 min-h-[44px] px-2 font-label-lg text-[15px] font-medium text-on-surface-variant hover:text-primary transition-colors"
            to="/login"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            <span>Back to sign in</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1120px] mx-auto px-4 md:px-6 py-8 flex items-center justify-center">
        <div className="w-full max-w-[480px]">
          <Card variant="elevated" className="p-6 sm:p-8 flex flex-col gap-6">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[26px]">password</span>
              </div>
              <Badge dot={false} tone="on-track">Password Reset</Badge>
              <h1 className="font-display-lg text-[28px] leading-[1.2] font-extrabold tracking-tight text-on-surface mt-1 text-balance">
                Set a new password
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[380px]">
                Choose a password with at least 8 characters and one number.
              </p>
            </div>

            {!token && (
              <div className="rounded-2xl bg-danger-tint border border-error/20 p-4 flex items-start gap-3" role="alert">
                <span className="material-symbols-outlined text-[22px] text-error shrink-0">link_off</span>
                <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
                  This reset link is missing its token. Request a new link from the{' '}
                  <Link className="text-primary font-semibold hover:underline" to="/forgot-password">
                    forgot password
                  </Link>{' '}
                  page.
                </p>
              </div>
            )}

            {error && (
              <div className="rounded-2xl border bg-danger-tint border-error/20 p-4 flex items-start gap-3" role="alert">
                <span className="material-symbols-outlined text-[22px] text-error shrink-0">
                  {describeApiError(error)?.icon || 'error'}
                </span>
                <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
                  {describeApiError(error)?.message}
                </p>
              </div>
            )}

            {status === 'done' ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl bg-status-ok-tint border border-secondary/20 p-4 flex items-start gap-3" role="status">
                  <span className="material-symbols-outlined text-[22px] text-secondary shrink-0">check_circle</span>
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                    Your password has been updated. Sign in with your new password.
                  </p>
                </div>
                <Button className="w-full" size="lg" to="/login" variant="primary">
                  Go to sign in
                </Button>
              </div>
            ) : (
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-lg text-[15px] font-semibold text-on-surface" htmlFor="new-password">
                    New Password
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined text-outline absolute left-3.5 pointer-events-none text-[22px]">lock</span>
                    <input
                      autoComplete="new-password"
                      className={INPUT_CLASS}
                      id="new-password"
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="••••••••"
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                    />
                    <button
                      aria-label="Toggle password visibility"
                      className="absolute right-1 text-outline hover:text-on-surface min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-colors cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[22px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-lg text-[15px] font-semibold text-on-surface" htmlFor="confirm-new-password">
                    Confirm New Password
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined text-outline absolute left-3.5 pointer-events-none text-[22px]">lock_reset</span>
                    <input
                      autoComplete="new-password"
                      className={INPUT_CLASS}
                      id="confirm-new-password"
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      placeholder="••••••••"
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-on-surface-variant font-label-md text-label-md">
                  <span className={`flex items-center gap-1.5 ${passwordValid ? 'text-secondary font-semibold' : ''}`}>
                    <span className="material-symbols-outlined text-[16px]">
                      {passwordValid ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                    8+ characters &amp; 1 number
                  </span>
                  <span className={`flex items-center gap-1.5 ${passwordsMatch ? 'text-secondary font-semibold' : ''}`}>
                    <span className="material-symbols-outlined text-[16px]">
                      {passwordsMatch ? 'check_circle' : 'radio_button_unchecked'}
                    </span>
                    Passwords match
                  </span>
                </div>

                <Button
                  className="w-full mt-1"
                  disabled={status !== 'idle' || !token}
                  size="lg"
                  type="submit"
                  variant="primary"
                >
                  {status === 'saving' ? (
                    <>
                      <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                      <span>Saving…</span>
                    </>
                  ) : (
                    <>
                      <span>Update password</span>
                      <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </>
                  )}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </main>

      <footer className="w-full bg-surface-container-low/60 border-t border-outline-variant/40 py-5">
        <div className="max-w-[1120px] mx-auto px-4 md:px-6 text-center">
          <span className="font-body-md text-[13.5px] text-on-surface-variant">
            © {CURRENT_YEAR} Aralytics Platform. Empowering learners and educators nationwide.
          </span>
        </div>
      </footer>
    </div>
  )
}
