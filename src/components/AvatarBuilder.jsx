import { useEffect, useState } from 'react'

const COLOURS = {
  grass: ['#58cc02', '#46a302'],
  sky: ['#1cb0f6', '#1899d6'],
  sunny: ['#ffc800', '#e6a900'],
  coral: ['#ff4b4b', '#e23a3a'],
  grape: ['#ce82ff', '#a85fd0'],
  bubble: ['#ff86d0', '#e068b3'],
}

export function btnVars(colour = 'grass') {
  const [bg, edge] = COLOURS[colour] || COLOURS.grass
  return { '--bg': bg, '--edge': edge }
}

export function Coin({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <circle cx="20" cy="20" r="18" fill="#ffd23f" stroke="#e6a900" strokeWidth="3" />
      <circle cx="20" cy="20" r="12" fill="#ffe488" stroke="#e6a900" strokeWidth="2" />
      <text x="20" y="27" textAnchor="middle" fontSize="16" fontWeight="800" fill="#b97f00" fontFamily="Baloo 2, sans-serif">
        ★
      </text>
    </svg>
  )
}

export function CoinPill({ amount, size = 26 }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-white rounded-full pl-1 pr-3 py-1 font-display font-extrabold text-ink shadow">
      <Coin size={size} />
      {amount}
    </span>
  )
}

export function Modal({ children, onClose, wide = false }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 bg-black/40" onClick={onClose}>
      <div
        className={`card w-full ${wide ? 'max-w-2xl' : 'max-w-md'} max-h-[92vh] overflow-y-auto p-5 animate-pop`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}

export function Confetti({ run }) {
  const [pieces] = useState(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      dur: 1.4 + Math.random() * 1.4,
      colour: ['#58cc02', '#1cb0f6', '#ffc800', '#ff4b4b', '#ce82ff', '#ff86d0'][i % 6],
      rot: Math.random() * 360,
    }))
  )
  if (!run) return null
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left + '%',
            background: p.colour,
            animationDuration: p.dur + 's',
            animationDelay: p.delay + 's',
            transform: `rotate(${p.rot}deg)`,
          }}
        />
      ))}
    </div>
  )
}

// Grown-up PIN gate. If a PIN is set, the protected action asks for it first.
export function PinGate({ pin, onPass, onClose, title = 'Grown-ups only' }) {
  const [entry, setEntry] = useState('')
  const [err, setErr] = useState(false)
  if (!pin) {
    onPass()
    return null
  }
  const submit = () => {
    if (entry === pin) onPass()
    else {
      setErr(true)
      setEntry('')
    }
  }
  return (
    <Modal onClose={onClose}>
      <h3 className="font-display text-2xl font-extrabold text-center mb-1">{title}</h3>
      <p className="text-center text-ink/60 mb-4 font-semibold">Enter the 4-digit PIN</p>
      <input
        autoFocus
        inputMode="numeric"
        value={entry}
        maxLength={4}
        onChange={(e) => {
          setErr(false)
          setEntry(e.target.value.replace(/\D/g, ''))
        }}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        className={`w-full text-center text-3xl tracking-[0.5em] font-display font-extrabold rounded-2xl py-3 border-4 ${
          err ? 'border-coral' : 'border-sky/40'
        } outline-none`}
        placeholder="••••"
      />
      {err && <p className="text-coral text-center font-bold mt-2">Not quite, try again</p>}
      <div className="flex gap-2 mt-4">
        <button className="btn-ghost flex-1" onClick={onClose}>
          Cancel
        </button>
        <button className="btn3d flex-1" style={btnVars('grass')} onClick={submit}>
          Unlock
        </button>
      </div>
    </Modal>
  )
}
