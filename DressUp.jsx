import { useState } from 'react'
import { REWARDS, TIER_ORDER, TIER_META } from '../data/rewards.js'
import { Coin, CoinPill, Confetti, btnVars } from './ui.jsx'

export default function Shop({ child, onBuy, onBack, preview = false }) {
  const [flash, setFlash] = useState(null)
  const [confetti, setConfetti] = useState(false)

  const buy = (r) => {
    const ok = onBuy(r.id)
    if (ok) {
      setFlash(r.id)
      setConfetti(true)
      setTimeout(() => setConfetti(false), 1600)
      setTimeout(() => setFlash(null), 900)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-5">
      <Confetti run={confetti} />
      <div className="flex items-center justify-between mb-4">
        <button className="btn-ghost py-2 px-4" onClick={onBack}>
          {'\u2190'} Back
        </button>
        <h1 className="font-display text-3xl font-extrabold text-white drop-shadow">{'\u{1F6D2}'} Shop</h1>
        {preview ? <span className="w-16" /> : <CoinPill amount={child.coins} />}
      </div>

      {preview && (
        <div className="card p-4 mb-5 text-center">
          <p className="font-display font-extrabold text-lg">Here's everything you could win! {'\u2728'}</p>
          <p className="text-sm text-ink/60 font-semibold">Earn happy faces, turn them into coins, then come back to spend them.</p>
        </div>
      )}

      {TIER_ORDER.map((tier) => {
        const meta = TIER_META[tier]
        const items = REWARDS.filter((r) => r.tier === tier && !r.starter)
        if (!items.length) return null
        return (
          <section key={tier} className="mb-6">
            <div className="flex items-baseline gap-2 mb-2 px-1">
              <h2 className="font-display text-xl font-extrabold text-white drop-shadow">{meta.label}</h2>
              <span className="text-white/80 font-bold text-sm">{meta.blurb}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {items.map((r) => {
                const owned = !preview && r.type === 'avatar' && child.owned.includes(r.id)
                const affordable = !preview && child.coins >= r.price
                const justBought = flash === r.id
                return (
                  <div key={r.id} className={`card p-3 flex flex-col ${justBought ? 'animate-pop ring-4 ring-grass' : ''}`}>
                    <div className="text-4xl text-center mt-1 mb-1">{r.emoji}</div>
                    <div className="font-display font-extrabold text-center leading-tight">{r.name}</div>
                    <div className="text-xs text-ink/55 font-semibold text-center mb-2 flex-1">{r.desc}</div>
                    {preview ? (
                      <div
                        className="text-center py-2 text-sm font-display font-extrabold rounded-2xl flex items-center justify-center gap-1"
                        style={{ background: '#fff6d6', color: '#b97f00' }}
                      >
                        <Coin size={18} /> {r.price}
                      </div>
                    ) : owned ? (
                      <div className="btn-ghost text-center py-2 text-sm text-grassDark">{'\u2713'} Owned</div>
                    ) : (
                      <button
                        className="btn3d py-2 text-sm flex items-center justify-center gap-1"
                        style={btnVars(affordable ? meta.colour : 'grass')}
                        disabled={!affordable}
                        onClick={() => buy(r)}
                      >
                        <Coin size={18} /> {r.price}
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
