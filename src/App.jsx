import { HashRouter, Routes, Route } from 'react-router-dom'
import { useStore } from './store/useStore'
import { LEVELS } from './data/levels'
import { BADGES } from './data/badges'
import MapPage from './pages/MapPage'
import LevelPage from './pages/LevelPage'
import ProfilePage from './pages/ProfilePage'
import DailyLogPage from './pages/DailyLogPage'
import NavBar from './components/NavBar'
import { useEffect } from 'react'

export default function App() {
  const store = useStore()

  useEffect(() => {
    store.checkStreak()
  }, [])

  useEffect(() => {
    BADGES.forEach(badge => {
      if (!store.progress.badges.includes(badge.id)) {
        const stats = {
          ...store.progress,
          completedPhases: [1, 2, 3].filter(p =>
            LEVELS.filter(l => l.phase === p).every(l =>
              store.progress.completedLevels.includes(l.id)
            )
          ).length,
        }
        if (badge.condition(stats)) {
          store.earnBadge(badge.id)
        }
      }
    })
  }, [store.progress.completedLevels, store.progress.streak])

  return (
    <HashRouter>
      <div className="pb-16">
        <Routes>
          <Route path="/" element={<MapPage store={store} levels={LEVELS} />} />
          <Route path="/level/:id" element={<LevelPage store={store} levels={LEVELS} />} />
          <Route path="/log" element={<DailyLogPage store={store} />} />
          <Route path="/profile" element={<ProfilePage store={store} />} />
        </Routes>
      </div>
      <NavBar progress={store.progress} />
    </HashRouter>
  )
}
