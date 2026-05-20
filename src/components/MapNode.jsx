import { Link } from 'react-router-dom'

export default function MapNode({ level, completed, isCurrent, locked, offset }) {
  const baseClasses = 'w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold transition-all relative'

  let nodeClasses = baseClasses
  if (completed) {
    nodeClasses += ' bg-green-500 text-white shadow-md'
  } else if (isCurrent) {
    nodeClasses += ' bg-blue-500 text-white shadow-lg pulse-current'
  } else {
    nodeClasses += ' bg-gray-200 text-gray-400'
  }

  const marginLeft = offset * 24

  const content = (
    <div className="flex flex-col items-center py-1" style={{ marginLeft: `${marginLeft}px` }}>
      <div className={nodeClasses}>
        {completed ? '✓' : level.icon}
        {isCurrent && (
          <div className="absolute -top-2 -right-2 bg-yellow-400 text-[10px] text-white w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {level.day}
          </div>
        )}
      </div>
      <span className={`text-[10px] mt-0.5 ${completed ? 'text-green-600' : isCurrent ? 'text-blue-600' : 'text-gray-400'}`}>
        {level.subjectName}
      </span>
    </div>
  )

  if (locked) {
    return <div className="opacity-50 cursor-not-allowed">{content}</div>
  }

  return (
    <Link to={`/level/${level.id}`} className="no-underline">
      {content}
    </Link>
  )
}
