import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import TopBar from './components/layout/TopBar'
import LandingPage from './screens/LandingPage'
import HomeScreen from './screens/HomeScreen'
import TeacherDashboard from './screens/TeacherDashboard'
import StudentsMasteryRoster from './screens/StudentsMasteryRoster'
import ActivitiesQuizManagement from './screens/ActivitiesQuizManagement'
import ClassReportsLearningAnalytics from './screens/ClassReportsLearningAnalytics'
import TeacherClassroomSettings from './screens/TeacherClassroomSettings'

const TEACHER_PATHS = ['/dashboard', '/students', '/activities', '/reports', '/settings']

function AppShell({ children }) {
  const [navOpen, setNavOpen] = useState(false)
  const { pathname } = useLocation()
  const inTeacherApp = TEACHER_PATHS.includes(pathname)

  if (!inTeacherApp) return children

  return (
    <>
      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />
      {navOpen && (
        <div
          className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setNavOpen(false)}
        ></div>
      )}
      <div className="lg:pl-[250px]">
        <TopBar onMenu={() => setNavOpen(true)} />
        <main className="relative pt-[72px] bg-surface min-h-screen">{children}</main>
      </div>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          {/* Standalone screens (own header, no app shell) */}
          <Route element={<LandingPage />} index path="/" />
          <Route element={<HomeScreen />} path="/home" />
          {/* Teacher app (sidebar + topbar shell) */}
          <Route element={<TeacherDashboard />} path="/dashboard" />
          <Route element={<StudentsMasteryRoster />} path="/students" />
          <Route element={<ActivitiesQuizManagement />} path="/activities" />
          <Route element={<ClassReportsLearningAnalytics />} path="/reports" />
          <Route element={<TeacherClassroomSettings />} path="/settings" />
          <Route element={<Navigate replace to="/" />} path="*" />
        </Routes>
      </AppShell>
    </BrowserRouter>
  )
}
