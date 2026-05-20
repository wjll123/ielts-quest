import { BADGES, SHOP_ITEMS } from '../data/badges'

export default function ProfilePage({ store }) {
  const { progress } = store

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold text-gray-800 mb-4">我的</h1>

      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 text-white mb-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-2xl font-bold">{progress.xp} XP</div>
            <div className="text-xs opacity-80">累计经验</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">🔥 {progress.streak}</div>
            <div className="text-xs opacity-80">连续天数</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">💎 {progress.gems}</div>
            <div className="text-xs opacity-80">宝石</div>
          </div>
        </div>
        <div className="mt-3 flex justify-between text-xs opacity-80">
          <span>已完成 {progress.completedLevels.length}/40 关</span>
          <span>最长连续 {progress.maxStreak} 天</span>
        </div>
      </div>

      <div className="flex gap-3 mb-4 text-center">
        <div className="flex-1 bg-purple-50 rounded-lg p-2">
          <div className="text-lg">🎧</div>
          <div className="text-xs text-gray-600">{progress.subjectCount.listening || 0}次</div>
        </div>
        <div className="flex-1 bg-blue-50 rounded-lg p-2">
          <div className="text-lg">📖</div>
          <div className="text-xs text-gray-600">{progress.subjectCount.reading || 0}次</div>
        </div>
        <div className="flex-1 bg-yellow-50 rounded-lg p-2">
          <div className="text-lg">✍️</div>
          <div className="text-xs text-gray-600">{progress.subjectCount.writing || 0}次</div>
        </div>
        <div className="flex-1 bg-green-50 rounded-lg p-2">
          <div className="text-lg">🗣️</div>
          <div className="text-xs text-gray-600">{progress.subjectCount.speaking || 0}次</div>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">🏅 徽章墙</h2>
        <div className="grid grid-cols-5 gap-2">
          {BADGES.map(badge => {
            const earned = progress.badges.includes(badge.id)
            return (
              <div key={badge.id} className={`flex flex-col items-center p-2 rounded-lg ${earned ? 'bg-yellow-50' : 'bg-gray-50 opacity-40'}`}>
                <span className="text-2xl">{badge.icon}</span>
                <span className="text-[9px] text-gray-600 mt-0.5 text-center">{badge.name}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">🛒 商店</h2>
        <div className="space-y-2">
          {SHOP_ITEMS.map(item => (
            <div key={item.id} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800">{item.name}</div>
                <div className="text-[11px] text-gray-500">{item.desc}</div>
              </div>
              <button
                onClick={() => store.buyItem(item)}
                disabled={progress.gems < item.price}
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  progress.gems >= item.price
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                💎 {item.price}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">🎒 道具栏</h2>
        {progress.inventory.length === 0 && !progress.doubleXpNext ? (
          <p className="text-xs text-gray-400">还没有道具，去商店看看吧</p>
        ) : (
          <div className="flex gap-2 flex-wrap">
            {progress.inventory.map((itemId, i) => {
              const item = SHOP_ITEMS.find(s => s.id === itemId)
              return item ? (
                <span key={i} className="bg-blue-50 text-xs px-2 py-1 rounded">{item.icon} {item.name}</span>
              ) : null
            })}
            {progress.doubleXpNext && (
              <span className="bg-yellow-50 text-xs px-2 py-1 rounded">✨ 双倍XP（下一关生效）</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
