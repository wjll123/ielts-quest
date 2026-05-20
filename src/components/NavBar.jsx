import { Link, useLocation } from 'react-router-dom'

const tabs = [
  { path: '/', icon: '🗺️', label: '地图' },
  { path: '/log', icon: '📝', label: '记录' },
  { path: '/profile', icon: '👤', label: '我的' },
]

export default function NavBar({ progress }) {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-200 flex justify-around items-center h-14 z-50">
      {tabs.map(tab => {
        const active = location.pathname === tab.path
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex flex-col items-center gap-0.5 text-xs no-underline transition-colors ${active ? 'text-green-500' : 'text-gray-400'}`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </Link>
        )
      })}
      <div className="absolute top-0 right-4 -translate-y-1/2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
        🔥 {progress.streak}
      </div>
    </nav>
  )
}
