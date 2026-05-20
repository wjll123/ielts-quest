import { useState } from 'react'

export default function DailyLogPage({ store }) {
  const today = new Date().toISOString().split('T')[0]
  const existingLog = store.progress.dailyLogs[today] || { errors: '', why: '', tomorrow: '' }
  const [log, setLog] = useState(existingLog)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    if (!log.errors.trim() && !log.why.trim() && !log.tomorrow.trim()) return
    store.saveDailyLog(today, log)
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  const pastDates = Object.keys(store.progress.dailyLogs).sort().reverse()

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold text-gray-800 mb-1">每日记录</h1>
      <p className="text-xs text-gray-500 mb-4">每天3条，替代所有笔记本</p>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
        <div className="text-sm font-semibold text-blue-800 mb-3">📅 {today}</div>

        <div className="mb-3">
          <label className="text-xs text-gray-600 font-medium">今天错了什么？（具体到题号/词/句）</label>
          <textarea
            value={log.errors}
            onChange={e => setLog({ ...log, errors: e.target.value })}
            className="w-full mt-1 p-2 border border-gray-200 rounded-lg text-sm resize-none h-20 focus:outline-none focus:border-blue-400"
            placeholder="例：剑桥16-T1-S2第3题，没听出 'adjacent to'"
          />
        </div>

        <div className="mb-3">
          <label className="text-xs text-gray-600 font-medium">为什么错？（一句话）</label>
          <textarea
            value={log.why}
            onChange={e => setLog({ ...log, why: e.target.value })}
            className="w-full mt-1 p-2 border border-gray-200 rounded-lg text-sm resize-none h-16 focus:outline-none focus:border-blue-400"
            placeholder="例：连读没听出来，adjacent这个词本身认识"
          />
        </div>

        <div className="mb-3">
          <label className="text-xs text-gray-600 font-medium">明天要重做什么？</label>
          <textarea
            value={log.tomorrow}
            onChange={e => setLog({ ...log, tomorrow: e.target.value })}
            className="w-full mt-1 p-2 border border-gray-200 rounded-lg text-sm resize-none h-16 focus:outline-none focus:border-blue-400"
            placeholder="例：重听S2第3题那段，注意adjacent to的连读"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full py-2.5 bg-blue-500 text-white rounded-lg font-medium text-sm hover:bg-blue-600 transition-colors"
        >
          {saved ? '✓ 已保存' : '保存记录 (+5 XP)'}
        </button>
      </div>

      {pastDates.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-2">历史记录</h2>
          <div className="space-y-2">
            {pastDates.slice(0, 7).map(date => {
              const entry = store.progress.dailyLogs[date]
              return (
                <div key={date} className="bg-gray-50 rounded-lg p-3 text-xs">
                  <div className="font-medium text-gray-700 mb-1">{date}</div>
                  {entry.errors && <p className="text-gray-600">❌ {entry.errors}</p>}
                  {entry.why && <p className="text-gray-500">💡 {entry.why}</p>}
                  {entry.tomorrow && <p className="text-blue-600">📌 {entry.tomorrow}</p>}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
