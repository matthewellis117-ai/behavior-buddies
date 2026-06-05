import { useState } from 'react'
import Avatar from './Avatar.jsx'
import AwardModal from './AwardModal.jsx'
import { useStore, DEFAULT_CONSEQUENCE } from '../lib/store.jsx'
import { behaviourById } from '../data/behaviours.js'
import { rewardById } from '../data/rewards.js'
import { liveTotals, coinsFromWeek, weekKey } from '../lib/economy.js'
import { Coin, CoinPill, Confetti, btnVars, PinGate } from './ui.jsx'

export default function ChildHome({ child, onBack, onShop, onSummary, onDressUp, onParent }) {
  const { award, undoLast, redeem, state } = useStore()
  const [showAward, setShowAward] = useState(false)
  const [gate, setGate] = useState(false)
  const [confetti, setConfetti] = useState(false)

  const t = liveTotals(child)
  const previewCoins = coinsFromWeek(child.events, weekKey())
  const recent = [...child.events].sort((a, b) => b.at - a.at).slice(0, 5)
  const pending = child.purchases.filter((p) => !p.redeemed)

  const doAward = (behaviourId) => {
    award(child.id, behaviourId)
    setShowAward(false)
    const b = behaviourById(behaviourId)
    if (b && b.points > 0) {
      setConfetti(true)
      setTimeout(() => setConfetti(false), 1400)
    }
  }

  const askAward = () => {
    if (state.settings.pin) setGate(true)
    else setShowAward(true)
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-5">
      <Confetti run={confetti} />
      <div className="flex items-center justify-between mb-3">
        <button className="btn-ghost py-2 px-4" onClick={onBack}>
          {'\u2190'} Home
        </button>
        <CoinPill amount={child.coins} />
      </div>

      {t.points < 0 && (
        <div className="card p-4 mb-4" style={{ background: '#fff1f0', border: '2px solid #ffd0cb' }}>
          <div className="flex items-start gap-3">
            <span className="text-3xl leading-none">{'\u26A0\uFE0F'}</span>
            <div>
              <h3 className="font-display font-extrabold text-coral leading-tight">Uh oh, a tricky week so far</h3>
              <p className="text-sm font-semibold text-ink/70 mt-1">
                There have been more sad faces than happy ones. If the week stays like this, {state.settings.consequence || DEFAULT_CONSEQUENCE}. You can still turn it around. Earn some happy faces to get back to the good side!
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="card p-5 text-center mb-4">
        <div className="flex justify-center mb-2">
          <Avatar config={child.avatar} size={170} ring className="animate-floaty" />
        </div>
        <h1 className="font-display text-3xl font-extrabold">{child.name}</h1>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <Mini label="Happy" value={t.happy} emoji={'\u{1F600}'} colour="text-grassDark" />
          <Mini label="Sad" value={t.sad} emoji={'\u{1F61E}'} colour="text-coral" />
          <Mini label="Coins at payday" value={previewCoins} coin colour="text-sunnyDark" />
        </div>

        <button className="btn3d w-full mt-5 text-xl py-4" style={btnVars('grass')} onClick={askAward}>
          {'\u2728'} Give a face
        </button>
        <div className="grid grid-cols-3 gap-2 mt-2">
          <button className="btn3d py-3" style={btnVars('sunny')} onClick={onShop}>
            {'\u{1F6D2}'} Shop
          </button>
          <button className="btn3d py-3" style={btnVars('grape')} onClick={onDressUp}>
            {'\u{1F457}'} Dress up
          </button>
          <button className="btn3d py-3" style={btnVars('sky')} onClick={onSummary}>
            {'\u{1F4CA}'} Week
          </button>
        </div>
      </div>

      {pending.length > 0 && (
        <div className="card p-4 mb-4">
          <h3 className="font-display font-extrabold mb-2">{'\u{1F381}'} Treats to enjoy</h3>
          <div className="space-y-2">
            {pending.map((p) => {
              const r = rewardById(p.reward)
              return (
                <div key={p.id} className="flex items-center gap-2 bg-cream rounded-2xl p-2">
                  <span className="text-2xl">{r?.emoji}</span>
                  <span className="font-bold flex-1">{r?.name}</span>
                  <button className="btn-ghost py-1 px-3 text-sm" onClick={() => redeem(child.id, p.id)}>
                    Mark as given
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {recent.length > 0 && (
        <div className="card p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-display font-extrabold">Latest faces</h3>
            <button className="btn-ghost py-1 px-3 text-sm" onClick={() => undoLast(child.id)}>
              {'\u21A9'} Undo last
            </button>
          </div>
          <div className="space-y-1.5">
            {recent.map((e) => {
              const b = behaviourById(e.behaviour)
              if (!b) return null
              return (
                <div key={e.id} className="flex items-center gap-2">
                  <span className="text-xl">{b.emoji}</span>
                  <span className="font-bold flex-1">{b.label}</span>
                  <span className={`font-display font-extrabold ${b.points >= 0 ? 'text-grassDark' : 'text-coral'}`}>
                    {b.points > 0 ? `+${b.points}` : b.points}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <button className="btn-ghost w-full text-sm" onClick={onParent}>
        {'\u2699\uFE0F'} Grown-up settings
      </button>

      {showAward && <AwardModal childName={child.name} onAward={doAward} onClose={() => setShowAward(false)} />}
      {gate && (
        <PinGate
          pin={state.settings.pin}
          onPass={() => {
            setGate(false)
            setShowAward(true)
          }}
          onClose={() => setGate(false)}
        />
      )}
    </div>
  )
}

function Mini({ label, value, emoji, coin, colour }) {
  return (
    <div className="bg-cream rounded-2xl py-3">
      <div className={`font-display text-2xl font-extrabold ${colour} flex items-center justify-center gap-1`}>
        {coin ? <Coin size={20} /> : <span className="text-xl">{emoji}</span>}
        {value}
      </div>
      <div className="text-[11px] font-bold text-ink/50 leading-tight px-1">{label}</div>
    </div>
  )
}
