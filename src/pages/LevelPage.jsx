import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function LevelPage({ store, levels }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const level = levels.find(l => l.id === parseInt(id))
  const { progress } = store
  const [showComplete, setShowComplete] = useState(false)

  if (!level) return <div className="p-4">关卡不存在</div>

  const isCompleted = progress.completedLevels.includes(level.id)
  const currentLevel = levels.find(l => !progress.completedLevels.includes(l.id))?.id || levels.length + 1
  const isLocked = level.id > currentLevel

  if (isLocked) {
    return (
      <div className="p-6 text-center">
        <div className="text-6xl mb-4">🔒</div>
        <p className="text-gray-500">完成前面的关卡才能解锁</p>
        <button onClick={() => navigate('/')} className="mt-4 text-blue-500 underline">返回地图</button>
      </div>
    )
  }

  const getTaskStatus = (taskId) => progress.taskStatus[`${level.id}-${taskId}`] || false

  const allRequiredDone = level.subTasks
    .filter(t => t.required)
    .every(t => getTaskStatus(t.id))

  const handleToggle = (task) => {
    if (isCompleted) return
    if (getTaskStatus(task.id)) {
      store.uncompleteTask(level.id, task.id)
    } else {
      store.completeTask(level.id, task.id)
    }
  }

  const handleComplete = () => {
    if (!allRequiredDone) return
    const reviewTask = level.subTasks.find(t => t.type === 'review')
    if (reviewTask && !getTaskStatus(reviewTask.id) && progress.hearts > 0) {
      store.loseHeart()
    }
    store.completeLevel(level)
    setShowComplete(true)
    setTimeout(() => setShowComplete(false), 2000)
  }

  const sections = [
    { title: '🔄 回顾（10分钟）', type: 'review', desc: '先回头看昨天的错' },
    { title: '📚 主任务（80分钟）', type: 'main', desc: '今天的核心学习' },
    { title: '📝 记录（10分钟）', type: 'record', desc: '写下今天的收获' },
  ]

  return (
    <div className="p-4">
      <button onClick={() => navigate('/')} className="text-gray-500 text-sm mb-3 flex items-center gap-1">
        ← 返回地图
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ background: level.color + '20' }}>
          {level.icon}
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-800">Day {level.day} · {level.subjectName}</h1>
          <p className="text-xs text-gray-500">{level.phaseName} · {level.date}</p>
        </div>
        {isCompleted && <span className="ml-auto text-green-500 text-2xl">✓</span>}
      </div>

      <div className="flex gap-2 mb-4 text-sm">
        <span className="bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded">+{level.xpReward} XP</span>
        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded">+{level.gemReward} 💎</span>
        <span className="ml-auto text-red-400">{'❤️'.repeat(progress.hearts)}{'🖤'.repeat(5 - progress.hearts)}</span>
      </div>

      {sections.map(section => {
        const tasks = level.subTasks.filter(t => t.type === section.type)
        if (tasks.length === 0) return null
        return (
          <div key={section.type} className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-sm font-semibold text-gray-700">{section.title}</h2>
              <span className="text-[10px] text-gray-400">{section.desc}</span>
            </div>
            <div className="space-y-2">
              {tasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => handleToggle(task)}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    getTaskStatus(task.id)
                      ? 'bg-green-50 border-green-200'
                      : 'bg-white border-gray-200 hover:border-blue-300'
                  } ${isCompleted ? 'opacity-60 cursor-default' : ''}`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    getTaskStatus(task.id) ? 'bg-green-500 border-green-500' : 'border-gray-300'
                  }`}>
                    {getTaskStatus(task.id) && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className={`text-sm ${getTaskStatus(task.id) ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                    {task.description}
                  </span>
                  {task.required && !getTaskStatus(task.id) && (
                    <span className="ml-auto text-[10px] text-red-400 bg-red-50 px-1.5 py-0.5 rounded">必做</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {!isCompleted && (
        <button
          onClick={handleComplete}
          disabled={!allRequiredDone}
          className={`w-full py-3 rounded-xl font-bold text-white text-base mt-4 transition-all ${
            allRequiredDone
              ? 'bg-green-500 hover:bg-green-600 shadow-lg shadow-green-200'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {allRequiredDone ? '🎉 完成关卡' : '完成所有必做任务后解锁'}
        </button>
      )}

      {showComplete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center bounce-in">
            <div className="text-5xl mb-3">🎉</div>
            <h2 className="text-xl font-bold text-gray-800">关卡完成!</h2>
            <p className="text-sm text-gray-500 mt-1">+{level.xpReward} XP · +{level.gemReward} 💎</p>
          </div>
        </div>
      )}
    </div>
  )
}
