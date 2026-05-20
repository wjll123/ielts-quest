export const BADGES = [
  { id: 'first', name: '初心者', icon: '🔥', desc: '完成第1关', condition: (p) => p.completedLevels.length >= 1 },
  { id: 'streak3', name: '三连击', icon: '⚡', desc: '连续3天打卡', condition: (p) => p.streak >= 3 },
  { id: 'week', name: '周循环', icon: '🎯', desc: '完成一整周7关', condition: (p) => p.completedLevels.length >= 7 },
  { id: 'reflect5', name: '反思者', icon: '📝', desc: '连续5天填写记录', condition: (p) => p.logStreak >= 5 },
  { id: 'rewrite', name: '迭代王', icon: '🔄', desc: '写作重写3次', condition: (p) => p.rewriteCount >= 3 },
  { id: 'listen10', name: '精听达人', icon: '👂', desc: '完成10次听力', condition: (p) => p.subjectCount.listening >= 10 },
  { id: 'speak10', name: '开口说', icon: '🗣️', desc: '累计录音10次', condition: (p) => p.speakCount >= 10 },
  { id: 'phase', name: '阶段通关', icon: '🏆', desc: '完成一个阶段', condition: (p) => p.completedPhases >= 1 },
  { id: 'streak14', name: '全勤', icon: '💎', desc: '连续14天不断', condition: (p) => p.streak >= 14 },
  { id: 'all', name: '终极挑战', icon: '🎓', desc: '完成全部40关', condition: (p) => p.completedLevels.length >= 40 },
]

export const SHOP_ITEMS = [
  { id: 'freeze', name: '冻结保护', icon: '🧊', desc: '保护1天连续记录不断', price: 20 },
  { id: 'skip_review', name: '跳过回顾', icon: '⏭️', desc: '跳过一次开头回顾（不扣心）', price: 15 },
  { id: 'double_xp', name: '双倍经验', icon: '✨', desc: '下一关XP翻倍', price: 30 },
]
