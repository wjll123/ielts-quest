import { Link } from 'react-router-dom'
import MapNode from '../components/MapNode'

export default function MapPage({ store, levels }) {
  const { progress } = store
  const currentLevel = levels.find(l => !progress.completedLevels.includes(l.id))?.id || levels.length

  const phases = [
    { id: 1, name: '第一阶段：技巧补完', range: [1, 14] },
    { id: 2, name: '第二阶段：刷题迭代', range: [15, 28] },
    { id: 3, name: '第三阶段：模考冲刺', range: [29, 40] },
  ]

  return (
    <div className="px-4 pt-4 pb-8">
      <header className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-lg font-bold text-gray-800">雅思闯关</h1>
          <p className="text-xs text-gray-500">40天冲刺计划</p>
        </div>
        <div className="flex gap-3 items-center text-sm">
          <span title="经验值">⭐ {progress.xp}</span>
          <span title="宝石">💎 {progress.gems}</span>
          <span title="红心">❤️ {progress.hearts}</span>
        </div>
      </header>

      {phases.map(phase => (
        <div key={phase.id} className="mb-6">
          <div className="text-center mb-3">
            <span className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full">
              {phase.name}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            {levels
              .filter(l => l.id >= phase.range[0] && l.id <= phase.range[1])
              .map((level, idx) => {
                const completed = progress.completedLevels.includes(level.id)
                const isCurrent = level.id === currentLevel
                const locked = level.id > currentLevel
                const offset = (idx % 5) - 2

                return (
                  <MapNode
                    key={level.id}
                    level={level}
                    completed={completed}
                    isCurrent={isCurrent}
                    locked={locked}
                    offset={offset}
                  />
                )
              })}
          </div>
        </div>
      ))}
    </div>
  )
}
