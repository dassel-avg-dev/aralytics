import { Link, NavLink } from 'react-router-dom'
import BrandLogo from '../BrandLogo'
import Avatar from '../ui/Avatar'
import { getStoredUser, logout } from '../../api/client'

const NAV_ITEMS = [
  { path: '/teacher/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { path: '/teacher/students', icon: 'group', label: 'Students' },
  { path: '/teacher/activities', icon: 'assignment', label: 'Activities' },
  { path: '/teacher/reports', icon: 'insights', label: 'Reports' },
  { path: '/teacher/settings', icon: 'settings', label: 'Settings' },
]

export default function Sidebar({ open = false, onClose }) {
  const user = getStoredUser()
  const displayName = user?.fullName || 'Teacher'

  const handleLogout = async (event) => {
    event.preventDefault()
    await logout()
    window.location.assign('/login')
  }

  return (
    <aside
      className={`${
        open ? 'flex' : 'hidden'
      } lg:flex fixed left-0 top-0 h-screen w-[250px] max-w-[85vw] bg-surface-container-lowest border-r border-outline-variant/60 z-50 flex-col justify-between transition-transform duration-300`}
    >
      <div className="flex flex-col">
        <div className="h-[72px] flex items-center justify-between px-space-lg gap-space-sm">
          <BrandLogo to="/teacher/dashboard" />
          {onClose && (
            <button
              aria-label="Close navigation"
              className="lg:hidden min-w-[44px] min-h-[44px] -mr-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer"
              onClick={onClose}
              title="Close navigation"
              type="button"
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                close
              </span>
            </button>
          )}
        </div>
        <nav aria-label="Teacher navigation" className="flex flex-col gap-space-xs px-space-md mt-space-sm">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              className={({ isActive }) =>
                `flex items-center gap-space-sm min-h-[44px] px-space-md py-space-sm rounded-xl font-label-lg text-label-lg transition-all ${
                  isActive
                    ? 'bg-primary-container text-on-primary font-bold shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`
              }
              to={item.path}
              onClick={onClose}
            >
              <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="p-space-sm m-space-md rounded-2xl bg-surface-container-low border border-outline-variant/60 flex items-center justify-between gap-space-xs">
        <Link
          className="flex items-center gap-space-sm min-w-0 min-h-[44px] pl-1 rounded-xl"
          title="View profile"
          to="/profile"
        >
          <Avatar name={displayName} size="sm" />
          <div className="flex flex-col min-w-0">
            <span className="font-label-md text-label-md text-on-surface truncate">
              {displayName}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
              Instructor
            </span>
          </div>
        </Link>
        <Link
          aria-label="Sign out"
          className="min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-on-surface-variant hover:text-error hover:bg-danger-tint transition-colors shrink-0"
          onClick={handleLogout}
          title="Sign out"
          to="/login"
        >
          <span aria-hidden="true" className="material-symbols-outlined text-[20px]">
            logout
          </span>
        </Link>
      </div>
    </aside>
  )
}
