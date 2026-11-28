import { useState } from 'react'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import { api } from '../../api/client'
import { useApiResource } from '../../api/useApiResource'
import { DataError, LoadingBlock } from '../../components/DataState'

const FIELD =
  'w-full px-4 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/50 font-body-md text-body-md text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all'

function Notice({ notice }) {
  if (!notice) return null
  const error = notice.tone === 'error'
  return (
    <div
      className={`rounded-xl px-4 py-3 font-label-md text-label-md font-semibold flex items-center gap-2 ${
        error
          ? 'bg-danger-tint text-error border border-error/20'
          : 'bg-status-ok-tint text-secondary border border-secondary/20'
      }`}
      role={error ? 'alert' : 'status'}
    >
      <span className="material-symbols-outlined text-[18px] shrink-0">
        {error ? 'error' : 'check_circle'}
      </span>
      <span>{notice.text}</span>
    </div>
  )
}

export default function ProfileScreen() {
  const profile = useApiResource(() => api.auth.profile(), [])
  const user = profile.data?.user

  const [fullNameDraft, setFullNameDraft] = useState(null)
  const [usernameDraft, setUsernameDraft] = useState(null)
  const [savingProfile, setSavingProfile] = useState(false)
  const [profileNotice, setProfileNotice] = useState(null)

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)
  const [passwordNotice, setPasswordNotice] = useState(null)

  const fullName = fullNameDraft ?? user?.fullName ?? ''
  const username = usernameDraft ?? user?.username ?? ''

  async function saveProfile(event) {
    event.preventDefault()
    setProfileNotice(null)
    setSavingProfile(true)
    try {
      await api.auth.updateProfile({ fullName, username })
      setFullNameDraft(null)
      setUsernameDraft(null)
      setProfileNotice({ tone: 'success', text: 'Profile updated.' })
      profile.reload()
    } catch (error) {
      setProfileNotice({ tone: 'error', text: error.message })
    } finally {
      setSavingProfile(false)
    }
  }

  async function savePassword(event) {
    event.preventDefault()
    setPasswordNotice(null)
    if (newPassword !== confirmPassword) {
      setPasswordNotice({ tone: 'error', text: 'New passwords do not match.' })
      return
    }
    setSavingPassword(true)
    try {
      await api.auth.changePassword({ currentPassword, newPassword })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setPasswordNotice({ tone: 'success', text: 'Password changed.' })
    } catch (error) {
      setPasswordNotice({ tone: 'error', text: error.message })
    } finally {
      setSavingPassword(false)
    }
  }

  return (
    <div className="max-w-[1120px] mx-auto px-4 lg:px-8 py-6 flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-headline-lg text-headline-lg text-on-surface">My Profile</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          View your account details and keep your sign-in information up to date.
        </p>
      </div>

      {profile.loading && <LoadingBlock label="Loading your profile…" />}
      {profile.error && <DataError error={profile.error} onRetry={profile.reload} />}

      {user && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <Card variant="elevated" className="xl:col-span-7 p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-outline-variant/40">
              <div className="flex items-center gap-3.5 min-w-0">
                <Avatar name={user.fullName || user.username} size="lg" />
                <div className="min-w-0">
                  <h2 className="font-headline-sm text-headline-sm text-on-surface truncate">
                    {user.fullName || user.username}
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <Badge tone={user.role === 'TEACHER' ? 'mastered' : 'on-track'}>
                {user.role === 'TEACHER' ? 'Teacher' : 'Student'}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                ['Email', user.email],
                ['Role', user.role === 'TEACHER' ? 'Teacher' : 'Student'],
                ['School', user.schoolName || '—'],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-0.5 rounded-xl bg-surface-container-low px-4 py-3">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">
                    {label}
                  </span>
                  <span className="font-body-md text-body-md text-on-surface font-medium break-words">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <form className="flex flex-col gap-4 pt-2 border-t border-outline-variant/40" onSubmit={saveProfile}>
              <label className="flex flex-col gap-1">
                <span className="font-label-md text-label-md font-semibold text-on-surface">Full Name</span>
                <input
                  autoComplete="name"
                  className={FIELD}
                  maxLength={160}
                  onChange={(event) => {
                    setFullNameDraft(event.target.value)
                    if (profileNotice) setProfileNotice(null)
                  }}
                  required
                  value={fullName}
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-label-md text-label-md font-semibold text-on-surface">Username</span>
                <input
                  autoComplete="username"
                  className={FIELD}
                  maxLength={64}
                  onChange={(event) => {
                    setUsernameDraft(event.target.value)
                    if (profileNotice) setProfileNotice(null)
                  }}
                  required
                  value={username}
                />
              </label>
              <Notice notice={profileNotice} />
              <Button className="self-start" disabled={savingProfile} type="submit" variant="primary">
                <span className="material-symbols-outlined text-[20px]">save</span>
                {savingProfile ? 'Saving…' : 'Save Profile'}
              </Button>
            </form>
          </Card>

          <Card variant="elevated" className="xl:col-span-5 p-6 flex flex-col gap-5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Change Password</h2>
              <Button
                aria-pressed={showPasswords}
                onClick={() => setShowPasswords((prev) => !prev)}
                size="sm"
                variant="ghost"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPasswords ? 'visibility_off' : 'visibility'}
                </span>
                <span>{showPasswords ? 'Hide' : 'Show'}</span>
              </Button>
            </div>
            <form className="flex flex-col gap-4" onSubmit={savePassword}>
              <label className="flex flex-col gap-1">
                <span className="font-label-md text-label-md font-semibold text-on-surface">
                  Current Password
                </span>
                <input
                  autoComplete="current-password"
                  className={FIELD}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  required
                  type={showPasswords ? 'text' : 'password'}
                  value={currentPassword}
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-label-md text-label-md font-semibold text-on-surface">New Password</span>
                <input
                  autoComplete="new-password"
                  className={FIELD}
                  maxLength={72}
                  minLength={8}
                  onChange={(event) => setNewPassword(event.target.value)}
                  required
                  type={showPasswords ? 'text' : 'password'}
                  value={newPassword}
                />
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  8–72 characters with at least one number.
                </span>
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-label-md text-label-md font-semibold text-on-surface">
                  Confirm New Password
                </span>
                <input
                  autoComplete="new-password"
                  className={FIELD}
                  maxLength={72}
                  minLength={8}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                  type={showPasswords ? 'text' : 'password'}
                  value={confirmPassword}
                />
              </label>
              <Notice notice={passwordNotice} />
              <Button className="self-start" disabled={savingPassword} type="submit" variant="primary">
                <span className="material-symbols-outlined text-[20px]">lock_reset</span>
                {savingPassword ? 'Updating…' : 'Update Password'}
              </Button>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}
