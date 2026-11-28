import { Link } from 'react-router-dom'
import NotificationBell from '../NotificationBell'
import Avatar from '../ui/Avatar'
import { getStoredClasses, getStoredUser } from '../../api/client'

export default function TopBar({ onMenu }) {
  const user = getStoredUser()
  const classes = getStoredClasses()
  const className = classes[0]?.name || 'Your class'

  return (
    <header className="fixed top-0 left-0 lg:left-[250px] right-0 h-[72px] bg-surface-container-lowest/95 backdrop-blur-xl border-b border-outline-variant/60 z-40">
      <div className="h-[72px] px-space-lg flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-md min-w-0">
          <button
            aria-label="Open navigation"
            className="lg:hidden min-w-[44px] min-h-[44px] -ml-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer shrink-0"
            title="Open navigation"
            type="button"
            onClick={onMenu}
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[22px]">
              menu
            </span>
          </button>
          <div className="inline-flex items-center gap-space-xs bg-surface-container border border-outline-variant/60 px-space-md py-1.5 rounded-full min-w-0">
            <span aria-hidden="true" className="material-symbols-outlined text-[16px] text-primary shrink-0">
              terminal
            </span>
            <span className="font-label-md text-label-md text-on-surface truncate">
              {className}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-space-sm shrink-0">
          <NotificationBell
            role="teacher"
            buttonClassName="relative min-w-[44px] min-h-[44px] rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer"
          />
          <Link
            className="inline-flex items-center gap-space-xs min-h-[44px] bg-primary-container text-on-primary px-space-md py-2 rounded-xl font-label-md text-label-md hover:bg-primary transition-colors shadow-sm"
            to="/teacher/activities"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-[18px]">
              add
            </span>
            <span className="hidden md:inline">New Activity</span>
            <span className="md:hidden">Add</span>
          </Link>
          <Link
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
            title="View profile"
            to="/profile"
          >
            <Avatar name={user?.fullName || 'Teacher'} size="sm" />
          </Link>
        </div>
      </div>
    </header>
  )
}
