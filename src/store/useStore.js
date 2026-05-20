import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'ielts-quest-progress'

const defaultProgress = {
  completedLevels: [],
  taskStatus: {},
  xp: 0,
  gems: 30,
  hearts: 5,
  streak: 0,
  maxStreak: 0,
  lastActiveDate: null,
  dailyLogs: {},
  badges: [],
  inventory: [],
  speakCount: 0,
  rewriteCount: 0,
  logStreak: 0,
  subjectCount: { listening: 0, reading: 0, writing: 0, speaking: 0 },
  doubleXpNext: false,
}

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return { ...defaultProgress, ...JSON.parse(saved) }
  } catch (e) { /* ignore */ }
  return { ...defaultProgress }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

export function useStore() {
  const [progress, setProgress] = useState(loadProgress)

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const update = useCallback((fn) => {
    setProgress(prev => {
      const next = fn({ ...prev })
      return next
    })
  }, [])

  const checkStreak = useCallback(() => {
    const today = new Date().toISOString().split('T')[0]
    update(p => {
      if (p.lastActiveDate === today) return p
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().split('T')[0]
      if (p.lastActiveDate === yesterdayStr) {
        return p
      } else if (p.lastActiveDate && p.lastActiveDate !== today) {
        const hasFreeze = p.inventory.includes('freeze')
        if (hasFreeze) {
          return { ...p, inventory: p.inventory.filter((_, i) => i !== p.inventory.indexOf('freeze')) }
        }
        return { ...p, streak: 0 }
      }
      return p
    })
  }, [update])

  const completeTask = useCallback((levelId, taskId) => {
    update(p => {
      const key = `${levelId}-${taskId}`
      const newStatus = { ...p.taskStatus, [key]: true }
      return { ...p, taskStatus: newStatus }
    })
  }, [update])

  const uncompleteTask = useCallback((levelId, taskId) => {
    update(p => {
      const key = `${levelId}-${taskId}`
      const newStatus = { ...p.taskStatus }
      delete newStatus[key]
      return { ...p, taskStatus: newStatus }
    })
  }, [update])

  const completeLevel = useCallback((level) => {
    update(p => {
      if (p.completedLevels.includes(level.id)) return p
      const today = new Date().toISOString().split('T')[0]
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().split('T')[0]

      let newStreak = p.streak
      if (p.lastActiveDate !== today) {
        newStreak = (p.lastActiveDate === yesterdayStr || !p.lastActiveDate) ? p.streak + 1 : 1
      }

      const xpGain = p.doubleXpNext ? level.xpReward * 2 : level.xpReward
      const subjects = level.subject.split('+')
      const newSubjectCount = { ...p.subjectCount }
      subjects.forEach(s => { newSubjectCount[s] = (newSubjectCount[s] || 0) + 1 })

      return {
        ...p,
        completedLevels: [...p.completedLevels, level.id],
        xp: p.xp + xpGain,
        gems: p.gems + level.gemReward,
        streak: newStreak,
        maxStreak: Math.max(p.maxStreak, newStreak),
        lastActiveDate: today,
        subjectCount: newSubjectCount,
        doubleXpNext: false,
      }
    })
  }, [update])

  const loseHeart = useCallback(() => {
    update(p => ({ ...p, hearts: Math.max(0, p.hearts - 1) }))
  }, [update])

  const saveDailyLog = useCallback((date, log) => {
    update(p => {
      const newLogs = { ...p.dailyLogs, [date]: log }
      const logDates = Object.keys(newLogs).sort()
      let logStreak = 1
      for (let i = logDates.length - 1; i > 0; i--) {
        const curr = new Date(logDates[i])
        const prev = new Date(logDates[i - 1])
        const diff = (curr - prev) / (1000 * 60 * 60 * 24)
        if (diff === 1) logStreak++
        else break
      }
      return { ...p, dailyLogs: newLogs, logStreak }
    })
  }, [update])

  const buyItem = useCallback((item) => {
    update(p => {
      if (p.gems < item.price) return p
      let newState = { ...p, gems: p.gems - item.price }
      if (item.id === 'double_xp') {
        newState.doubleXpNext = true
      } else {
        newState.inventory = [...p.inventory, item.id]
      }
      return newState
    })
  }, [update])

  const earnBadge = useCallback((badgeId) => {
    update(p => {
      if (p.badges.includes(badgeId)) return p
      return { ...p, badges: [...p.badges, badgeId], gems: p.gems + 10 }
    })
  }, [update])

  const incrementSpeak = useCallback(() => {
    update(p => ({ ...p, speakCount: p.speakCount + 1 }))
  }, [update])

  const incrementRewrite = useCallback(() => {
    update(p => ({ ...p, rewriteCount: p.rewriteCount + 1 }))
  }, [update])

  return {
    progress,
    checkStreak,
    completeTask,
    uncompleteTask,
    completeLevel,
    loseHeart,
    saveDailyLog,
    buyItem,
    earnBadge,
    incrementSpeak,
    incrementRewrite,
  }
}
