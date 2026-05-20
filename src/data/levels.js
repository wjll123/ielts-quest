const SUBJECTS = {
  listening: { name: '听力', icon: '🎧', color: '#A855F7' },
  reading: { name: '阅读', icon: '📖', color: '#3B82F6' },
  writing: { name: '写作', icon: '✍️', color: '#F59E0B' },
  speaking: { name: '口语', icon: '🗣️', color: '#10B981' },
}

const WEEK_CYCLE = ['listening', 'reading', 'writing', 'speaking', 'listening', 'reading', 'writing+speaking']

function generateLevels() {
  const levels = []
  const startDate = new Date('2026-05-20')

  // Phase 1: Days 1-14
  const phase1Tasks = {
    listening: [
      { main: '何琼网课第三节：地图题', sub: '整理方位词和地理词汇' },
      { main: '剑桥14-Test1 Section2 精听', sub: '记录没听出的连读和词汇' },
      { main: '何琼网课第四节：配对题', sub: '跟着课做真题练习' },
      { main: '剑桥14-Test2 精听', sub: '对比上次错题是否改善' },
    ],
    reading: [
      { main: '阅读真经总纲第5-6回', sub: '538同义词10个+默写昨天的' },
      { main: '剑桥14-Test1 Passage精读', sub: '错题回原文定位答案句' },
      { main: '阅读真经总纲第7回', sub: '538同义词10个+默写昨天的' },
      { main: '剑桥14-Test2 Passage精读', sub: '分析错因：定位/同义替换/时间' },
    ],
    writing: [
      { main: 'Simon Task1 Lesson 03-04', sub: '写一篇小作文（计时20min）' },
      { main: '重写上次小作文（修复批改问题）', sub: '对照批改逐条改进' },
      { main: 'Simon Task2 Lesson 01-02', sub: '写一篇大作文（计时40min）' },
      { main: '重写上次大作文', sub: '词伙整理：只整理自己用错的表达' },
    ],
    speaking: [
      { main: 'Tara第1节课', sub: '选1个Part2话题录音2分钟' },
      { main: '回听昨天录音+重说卡顿处3遍', sub: '同一话题说到流畅' },
      { main: 'Tara第2节课', sub: '选1个新Part2话题录音' },
      { main: '回听+重说+记录改进点', sub: '对比第一次录音的进步' },
    ],
  }

  // Phase 2: Days 15-28
  const phase2Tasks = {
    listening: [
      { main: '剑桥16-Test1 精听', sub: '王陆语料库第三章test1-2' },
      { main: '剑桥16-Test2 精听', sub: '王陆语料库第三章test3-4' },
      { main: '剑桥17-Test1 精听', sub: '王陆语料库第五章test1-2' },
      { main: '剑桥17-Test2 精听', sub: '王陆语料库第五章test3-4' },
    ],
    reading: [
      { main: '剑桥16-Test1 精读', sub: '538同义词10个+默写' },
      { main: '剑桥16-Test2 精读', sub: '538同义词10个+默写' },
      { main: '剑桥17-Test1 精读', sub: '538同义词10个+默写' },
      { main: '剑桥17-Test2 精读', sub: '538同义词10个+默写' },
    ],
    writing: [
      { main: '计时写作Task2（40min）', sub: '找人批改/对照Simon范文' },
      { main: '重写上次作文（逐条修复）', sub: '词伙整理：自己用错的表达' },
      { main: '计时写作Task1（20min）', sub: '找人批改' },
      { main: '重写上次作文', sub: '顾家北范文对照分析' },
    ],
    speaking: [
      { main: '当季题库Part2录音', sub: '1个话题说到流畅不卡' },
      { main: '回听+重说3遍+换新话题', sub: '记录常卡的表达' },
      { main: '当季题库Part2录音', sub: '挑战不看提示直接说' },
      { main: 'Part1快问快答4个话题', sub: '每个控制在30秒内' },
    ],
  }

  // Phase 3: Days 29-40
  const phase3Tasks = {
    listening: [
      { main: '剑桥19-Test1 全套模考', sub: '严格计时+精听错题段' },
      { main: '剑桥19-Test2 全套模考', sub: '对比上次错误类型是否减少' },
      { main: '剑桥20-Test1 全套模考', sub: '冲刺精听' },
      { main: '错题总回顾', sub: '归类所有听力错因' },
    ],
    reading: [
      { main: '剑桥19-Test1 全套模考', sub: '严格计时60min' },
      { main: '剑桥19-Test2 全套模考', sub: '分析时间分配问题' },
      { main: '剑桥20-Test1 全套模考', sub: '冲刺' },
      { main: '错题总回顾', sub: '归类所有阅读错因' },
    ],
    writing: [
      { main: '计时写作完整套（Task1+2）', sub: '模拟考试条件' },
      { main: '重写薄弱题型', sub: '考前定型：固定开头结尾模板' },
      { main: '计时写作完整套', sub: '最后一次完整模拟' },
      { main: '回顾所有批改意见', sub: '列出考场必须避免的3个错误' },
    ],
    speaking: [
      { main: 'Part2每天录3个话题', sub: '练到不卡为止' },
      { main: 'Part1+Part3模拟', sub: '计时回答，练反应速度' },
      { main: '全套口语模考', sub: '录音回听打分' },
      { main: '考前话题最终过一遍', sub: '只说不看稿' },
    ],
  }

  const phases = [
    { id: 1, name: '技巧补完', desc: '建立节奏，学习方法', tasks: phase1Tasks, days: 14 },
    { id: 2, name: '刷题迭代', desc: '真题训练，反复修正', tasks: phase2Tasks, days: 14 },
    { id: 3, name: '模考冲刺', desc: '全真模拟，查漏补缺', tasks: phase3Tasks, days: 12 },
  ]

  let dayCount = 0
  const subjectCounters = {}

  phases.forEach(phase => {
    for (let i = 0; i < phase.days; i++) {
      dayCount++
      const weekDay = i % 7
      const subjectKey = WEEK_CYCLE[weekDay]
      const isCombined = subjectKey === 'writing+speaking'
      const subjects = isCombined ? ['writing', 'speaking'] : [subjectKey]

      const date = new Date(startDate)
      date.setDate(date.getDate() + dayCount - 1)

      const subTasks = []

      subTasks.push({
        id: `${dayCount}-review`,
        description: '回顾昨天的错误（重做昨天记录的题/词/句）',
        type: 'review',
        required: true,
      })

      subjects.forEach(subj => {
        if (!subjectCounters[subj]) subjectCounters[subj] = 0
        const taskIndex = subjectCounters[subj] % phase.tasks[subj].length
        const task = phase.tasks[subj][taskIndex]
        subjectCounters[subj]++

        subTasks.push({
          id: `${dayCount}-main-${subj}`,
          description: task.main,
          type: 'main',
          required: true,
        })
        subTasks.push({
          id: `${dayCount}-sub-${subj}`,
          description: task.sub,
          type: 'main',
          required: false,
        })
      })

      subTasks.push({
        id: `${dayCount}-log`,
        description: '填写今日记录（错了什么/为什么/明天重做什么）',
        type: 'record',
        required: true,
      })

      levels.push({
        id: dayCount,
        phase: phase.id,
        phaseName: phase.name,
        day: dayCount,
        date: date.toISOString().split('T')[0],
        subject: isCombined ? 'writing+speaking' : subjectKey,
        subjectName: isCombined
          ? '写作+口语'
          : SUBJECTS[subjectKey].name,
        icon: isCombined ? '✍️🗣️' : SUBJECTS[subjectKey].icon,
        color: isCombined ? '#F59E0B' : SUBJECTS[subjectKey].color,
        subTasks,
        xpReward: 20,
        gemReward: isCombined ? 8 : 5,
      })
    }
  })

  return levels
}

export const LEVELS = generateLevels()
export { SUBJECTS }
