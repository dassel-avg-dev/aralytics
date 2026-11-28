import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import BrandLogo from '../BrandLogo'
import NotificationBell from '../NotificationBell'
import Avatar from '../ui/Avatar'
import { getStoredUser, logout } from '../../api/client'

const STUDENT_NAV = [
  { label: 'Home', path: '/student/dashboard' },
  { label: 'Activities', path: '/student/activities' },
  { label: 'Quiz', path: '/student/quiz' },
  { label: 'Feedback', path: '/student/feedback' },
  { label: 'Progress', path: '/student/progress' },
]

export default function StudentShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const user = getStoredUser()
  const displayName = user?.fullName || 'Student'

  useEffect(() => {
    if (!menuOpen) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  const handleLogout = async () => {
    await logout()
    window.location.assign('/login')
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-50 h-[72px] bg-surface/95 backdrop-blur-xl border-b border-outline-variant/60">
        <div className="h-full max-w-7xl mx-auto px-gutter flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            <button
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="lg:hidden min-w-[44px] min-h-[44px] -ml-2 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors shrink-0 cursor-pointer"
              onClick={() => setMenuOpen((prev) => !prev)}
              title="Menu"
              type="button"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[22px]">
                {menuOpen ? 'close' : 'menu'}
              </span>
            </button>
            <BrandLogo to="/student/dashboard" />
            <nav
              aria-label="Student navigation"
              className="hidden lg:flex items-center gap-1 bg-surface-container-low p-1 rounded-2xl border border-outline-variant/60"
            >
              {STUDENT_NAV.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-xl font-label-lg text-label-lg transition-all ${
                      isActive
                        ? 'bg-surface-container-high text-primary font-bold'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-space-sm">
            <NotificationBell
              role="student"
              buttonClassName="relative min-w-[44px] min-h-[44px] rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            />
            <Link
              className="flex items-center gap-2.5 bg-surface-container-low border border-outline-variant/60 min-h-[44px] py-1 pl-1.5 pr-2 sm:pr-3.5 rounded-full hover:bg-surface-container transition-colors"
              title="View profile"
              to="/profile"
            >
              <Avatar name={displayName} size="sm" />
              <div className="hidden md:flex flex-col text-left">
                <span className="font-label-md text-label-md text-on-surface leading-tight font-semibold">
                  {displayName}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant leading-none">
                  Student
                </span>
              </div>
            </Link>
            <button
              aria-label="Sign out"
              className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-danger-tint transition-colors cursor-pointer"
              onClick={handleLogout}
              title="Sign out"
              type="button"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                logout
              </span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <>
            <div
              aria-hidden="true"
              className="fixed inset-0 top-[72px] bg-inverse-surface/30 backdrop-blur-xs z-40 lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <nav
              aria-label="Mobile student navigation"
              className="relative z-50 lg:hidden border-b border-outline-variant/60 bg-surface-container-lowest px-gutter py-space-md flex flex-col gap-1 shadow-lg"
            >
              {STUDENT_NAV.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center min-h-[44px] px-3.5 py-2.5 rounded-xl font-label-lg text-label-lg transition-colors ${
                      isActive
                        ? 'bg-surface-container-high text-primary font-bold'
                        : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </>
        )}
      </header>
      <main className="w-full pt-[72px] bg-surface min-h-screen">{children}</main>
    </>
  )
}
