import { useState } from 'react'
import { Link } from 'react-router-dom'
import BrandLogo from '../../components/BrandLogo'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Card from '../../components/ui/Card'
import { api } from '../../api/client'
import { describeApiError } from '../../components/DataState'

const CURRENT_YEAR = new Date().getFullYear()

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status !== 'idle') return
    setError(null)
    setStatus('sending')
    try {
      await api.auth.forgotPassword({ email: email.trim() })
      setStatus('sent')
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
                <span className="material-symbols-outlined text-[26px]">lock_reset</span>
              </div>
              <Badge dot={false} tone="on-track">Account Recovery</Badge>
              <h1 className="font-display-lg text-[28px] leading-[1.2] font-extrabold tracking-tight text-on-surface mt-1 text-balance">
                Forgot your password?
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[380px]">
                Enter the email on your account and we will send a reset link that expires in 15 minutes.
              </p>
            </div>

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

            {status === 'sent' ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl bg-status-ok-tint border border-secondary/20 p-4 flex items-start gap-3" role="status">
                  <span className="material-symbols-outlined text-[22px] text-secondary shrink-0">mark_email_read</span>
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                    If an account exists for <span className="font-semibold">{email.trim()}</span>, a
                    reset link is on its way. Check your inbox and spam folder.
                  </p>
                </div>
                <Button className="w-full" size="lg" to="/login" variant="primary">
                  Back to sign in
                </Button>
              </div>
            ) : (
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-lg text-[15px] font-semibold text-on-surface" htmlFor="reset-email">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined text-outline absolute left-3.5 pointer-events-none text-[22px]">mail</span>
                    <input
                      autoComplete="email"
                      className="w-full bg-surface-container-low text-on-surface placeholder:text-outline/70 border border-outline-variant/50 pl-11 pr-4 py-3.5 rounded-xl font-body-lg text-[15px] transition-all focus:bg-surface-container-lowest focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      id="reset-email"
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@school.edu.ph"
                      required
                      type="email"
                      value={email}
                    />
                  </div>
                </div>
                <Button
                  className="w-full mt-1"
                  disabled={status !== 'idle'}
                  size="lg"
                  type="submit"
                  variant="primary"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                      <span>Sending…</span>
                    </>
                  ) : (
                    <>
                      <span>Send reset link</span>
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
