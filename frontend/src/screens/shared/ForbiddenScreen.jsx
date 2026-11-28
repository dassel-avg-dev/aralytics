import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BrandLogo from '../../components/BrandLogo'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import { getSession, logout } from '../../api/client'

const CURRENT_YEAR = new Date().getFullYear()

function formatRoleLabel(role) {
  if (role === 'TEACHER') return 'Teacher / Educator'
  if (role === 'STUDENT') return 'Student'
  return 'Guest'
}

export default function ForbiddenScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const [switching, setSwitching] = useState(false)

  const session = getSession()
  const currentRole = location.state?.currentRole || session?.user?.role || null
  const requiredRole = location.state?.requiredRole || null
  const requestedPath = location.state?.from || null

  const isSignedIn = Boolean(session?.token)
  const dashboardPath = currentRole === 'TEACHER' ? '/teacher/dashboard' : '/student/dashboard'

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate(isSignedIn ? dashboardPath : '/', { replace: true })
    }
  }

  const handleSwitchAccount = async () => {
    if (switching) return
    setSwitching(true)
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-dvh flex flex-col justify-between antialiased selection:bg-primary-fixed selection:text-on-primary-fixed overflow-x-hidden">
      <header className="w-full bg-surface/90 backdrop-blur-xl border-b border-outline-variant/50 shrink-0">
        <div className="max-w-[1120px] mx-auto px-4 md:px-6 h-16 flex items-center">
          <BrandLogo to="/" />
        </div>
      </header>

      <main className="flex-1 min-h-0 w-full max-w-[1120px] mx-auto px-4 md:px-6 py-6 flex items-center justify-center">
        <div className="w-full max-w-[520px]">
          <Card variant="elevated" className="px-5 py-7 sm:px-8 sm:py-9 flex flex-col items-center text-center gap-4">
            <div
              aria-hidden="true"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-danger-tint text-error border border-error/20 flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[28px] sm:text-[32px]">gpp_bad</span>
            </div>

            <Badge tone="help">403 · Access Denied</Badge>

            <div className="flex flex-col items-center gap-2">
              <h1
                className="font-display-lg text-[24px] sm:text-[32px] leading-[1.2] font-extrabold tracking-tight text-on-surface text-balance"
                id="forbidden-title"
              >
                You don&apos;t have access to this page
              </h1>
              <p className="font-body-md text-[14px] sm:text-[15px] leading-relaxed text-on-surface-variant max-w-[410px]">
                {requiredRole ? (
                  <>
                    Your current account (<strong>{formatRoleLabel(currentRole)}</strong>) does not have
                    permission to open this area. It requires a{' '}
                    <strong>{formatRoleLabel(requiredRole)}</strong> role.
                  </>
                ) : (
                  'Your current account does not have permission to view this page.'
                )}
              </p>
            </div>

            {(requestedPath || requiredRole) && (
              <div
                aria-label="Access details"
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-2xl px-4 py-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-left"
              >
                <div className="min-w-0">
                  <span className="block font-label-sm text-[11px] font-semibold tracking-wider uppercase text-outline mb-0.5">
                    Requested Route
                  </span>
                  <strong className="block font-label-md text-[13px] font-semibold text-on-surface truncate">
                    {requestedPath || '/forbidden'}
                  </strong>
                </div>
                <div className="min-w-0">
                  <span className="block font-label-sm text-[11px] font-semibold tracking-wider uppercase text-outline mb-0.5">
                    Your Role
                  </span>
                  <strong className="block font-label-md text-[13px] font-semibold text-on-surface truncate">
                    {currentRole || 'GUEST'}
                  </strong>
                </div>
                <div className="min-w-0">
                  <span className="block font-label-sm text-[11px] font-semibold tracking-wider uppercase text-outline mb-0.5">
                    Required Role
                  </span>
                  <strong className="block font-label-md text-[13px] font-semibold text-on-surface truncate">
                    {requiredRole || 'AUTHORIZED'}
                  </strong>
                </div>
              </div>
            )}

            <div className="w-full flex flex-col gap-2.5 mt-1">
              <Button className="w-full" size="lg" to={isSignedIn ? dashboardPath : '/login'} variant="primary">
                <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                  {isSignedIn ? 'dashboard' : 'login'}
                </span>
                <span>{isSignedIn ? 'Go to My Dashboard' : 'Sign In'}</span>
              </Button>

              <div className="w-full flex flex-col sm:flex-row gap-2.5">
                <Button className="flex-1" onClick={handleGoBack} variant="secondary">
                  <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                    arrow_back
                  </span>
                  <span>Go Back</span>
                </Button>

                {isSignedIn ? (
                  <Button
                    className="flex-1"
                    disabled={switching}
                    onClick={handleSwitchAccount}
                    variant="ghost"
                  >
                    <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                      swap_horiz
                    </span>
                    <span>{switching ? 'Signing out...' : 'Switch Account'}</span>
                  </Button>
                ) : (
                  <Button className="flex-1" to="/" variant="ghost">
                    <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
                      home
                    </span>
                    <span>Back to Home</span>
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </main>

      <footer className="w-full bg-surface-container-low/60 border-t border-outline-variant/40 py-3.5 px-4 shrink-0">
        <div className="max-w-[1120px] mx-auto flex items-center justify-center text-center">
          <span className="font-body-md text-[13px] leading-snug text-on-surface-variant">
            &copy; {CURRENT_YEAR} Aralytics Platform. Role-Based Access Control Active.
          </span>
        </div>
      </footer>
    </div>
  )
}
