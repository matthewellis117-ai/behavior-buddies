import { useMemo, useState } from 'react'
import Avatar from './Avatar.jsx'
import { ALL_BEHAVIOURS, behaviourById } from '../data/behaviours.js'
import { tallyWeek, coinsFromWeek, weekKey, weekLabel, prevWeekKey } from '../lib/economy.js'
import { Coin } from './ui.jsx'

function verdict(t) {
  if (t.count === 0) return { face: '\u{1F642}', text: 'A quiet week, nothing logged yet.' }
  if (t.sad === 0 && t.happy >= 5) return { face: '\u{1F31F}', text: 'A superstar week! Not a single sad face.' }
  if (t.points >= 12) return { face: '\u{1F600}', text: 'A brilliant week, loads of lovely behaviour.' }
  if (t.points >= 4) return { face: '\u{1F642}', text: 'A good week overall, well done.' }
  if (t.points >= 0) return { face: '\u{1F610}', text: 'A bit of a mixed week, ups and downs.' }
  return { face: '\u{1F614}', text: 'A tricky week. Tomorrow is a fresh start.' }
}

export default function Summary({ child, onBack }) {
  const weeks = useMemo(() => {
    const present = [...new Set((child.events || []).map((e) => e.week))].sort().reverse()
    const cur = weekKey()
    if (!present.includes(cur)) present.unshift(cur)
    return present
  }, [child.events])

  const [wk, setWk] = useState(weeks[0])
  const t = tallyWeek(child.events, wk)
  const coins = coinsFromWeek(child.events, wk)
  const v = verdict(t)
  const isCurrent = wk === weekKey()

  const sorted = Object.entries(t.byCategory)
    .map(([id, n]) => ({ b: behaviourById(id), n }))
    .filter((x) => x.b)
    .sort((a, b) => b.n - a.n)
  const positives = sorted.filter((x) => x.b.points >= 0)
  const negatives = sorted.filter((x) => x.b.points < 0)

  const idx = weeks.indexOf(wk)

  return (
    <div className="max-w-xl mx-auto px-4 py-5">
      <div className="flex items-center justify-between mb-4">
        <button className="btn-ghost py-2 px-4" onClick={onBack}>
          {'\u2190'} Back
        </button>
        <h1 className="font-display text-2xl font-extrabold text-white drop-shadow">{child.name}'s week</h1>
        <span className="w-16" />
      </div>

      <div className="card p-4 mb-4">
        <div className="flex items-center justify-between">
          <button
            className="btn-ghost py-1 px-3 disabled:opacity-30"
            disabled={idx >= weeks.length - 1}
            onClick={() => setWk(weeks[idx + 1])}
          >
            {'\u2190'}
          </button>
          <div className="text-center">
            <div className="font-display font-extrabold">{weekLabel(wk)}</div>
            <div className="text-xs font-bold text-ink/50">{isCurrent ? 'This week so far' : 'Finished week'}</div>
          </div>
          <button className="btn-ghost py-1 px-3 disabled:opacity-30" disabled={idx <= 0} onClick={() => setWk(weeks[idx - 1])}>
            {'\u2192'}
          </button>
        </div>
      </div>

      <div className="card p-5 mb-4 text-center">
        <div className="flex justify-center mb-2">
          <Avatar config={child.avatar} size={120} ring />
        </div>
        <div className="text-5xl mb-1">{v.face}</div>
        <p className="font-display font-extrabold text-lg">{v.text}</p>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <Stat label="Happy" value={t.happy} colour="text-grassDark" emoji="😀" />
          <Stat label="Sad" value={t.sad} colour="text-coral" emoji="😞" />
          <Stat label={isCurrent ? 'Coins if paid now' : 'Coins earned'} value={coins} colour="text-sunnyDark" coin />
        </div>
      </div>

      <Breakdown title={`Lovely things \u{1F31F}`} rows={positives} positive />
      <Breakdown title={`Things to work on \u{1F4AA}`} rows={negatives} />
      {t.count === 0 && <p className="text-center text-white font-bold drop-shadow">Nothing logged for this week yet.</p>}
    </div>
  )
}

function Stat({ label, value, colour, emoji, coin }) {
  return (
    <div className="bg-cream rounded-2xl py-3">
      <div className={`font-display text-3xl font-extrabold ${colour} flex items-center justify-center gap-1`}>
        {coin && <Coin size={22} />}
        {value}
      </div>
      <div className="text-xs font-bold text-ink/50">{label}</div>
    </div>
  )
}

function Breakdown({ title, rows, positive }) {
  if (!rows.length) return null
  return (
    <div className="card p-4 mb-3">
      <h3 className="font-display font-extrabold mb-2">{title}</h3>
      <div className="space-y-1.5">
        {rows.map(({ b, n }) => (
          <div key={b.id} className="flex items-center gap-2">
            <span className="text-xl">{b.emoji}</span>
            <span className="font-bold flex-1">{b.label}</span>
            <span className={`font-display font-extrabold ${positive ? 'text-grassDark' : 'text-coral'}`}>{'\u00D7'}{n}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
