import { behaviourById } from '../data/behaviours.js'

// ---- Week handling -------------------------------------------------
// A "week" runs Monday to Sunday. We key each week by the date of its Monday
// (YYYY-MM-DD) so all events and totals can be grouped per week.

export function startOfWeek(date = new Date()) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  const day = (d.getDay() + 6) % 7 // 0 = Monday
  d.setDate(d.getDate() - day)
  return d
}

export function weekKey(date = new Date()) {
  const d = startOfWeek(date)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function prevWeekKey(key) {
  const d = new Date(key)
  d.setDate(d.getDate() - 7)
  return weekKey(d)
}

export function weekLabel(key) {
  const start = new Date(key)
  const end = new Date(key)
  end.setDate(end.getDate() + 6)
  const fmt = (dt) =>
    dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
  return `${fmt(start)} \u2013 ${fmt(end)}`
}

// ---- Points & coins ------------------------------------------------
// 1 net positive point = 1 coin. Negative weeks earn 0 coins (but never
// take coins already banked). A perfect week (no sad faces, 5+ happy) gets
// a small bonus to keep it exciting.

export function eventsForWeek(events, wk) {
  return events.filter((e) => e.week === wk)
}

export function tallyWeek(events, wk) {
  const list = eventsForWeek(events, wk)
  let happy = 0
  let sad = 0
  let points = 0
  const byCategory = {}
  for (const e of list) {
    const b = behaviourById(e.behaviour)
    const pts = b ? b.points : 0
    points += pts
    if (pts >= 0) happy += 1
    else sad += 1
    byCategory[e.behaviour] = (byCategory[e.behaviour] || 0) + 1
  }
  return { happy, sad, points, count: list.length, byCategory }
}

export function coinsFromWeek(events, wk) {
  const { points, happy, sad } = tallyWeek(events, wk)
  let coins = Math.max(0, points)
  if (sad === 0 && happy >= 5) coins += 5 // perfect-week bonus
  return coins
}

// Live (current week) points so the dashboard can show progress before payout.
export function liveTotals(child) {
  const wk = weekKey()
  return tallyWeek(child.events || [], wk)
}

export function makeEvent(behaviourId) {
  return {
    id: Math.random().toString(36).slice(2),
    behaviour: behaviourId,
    at: Date.now(),
    week: weekKey(),
  }
}
