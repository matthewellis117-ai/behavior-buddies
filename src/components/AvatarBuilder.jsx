import { useState } from 'react'
import Avatar from './Avatar.jsx'
import {
  SKIN_TONES,
  HAIR_STYLES,
  BASIC_HAIR_COLORS,
  FUN_HAIR_COLORS,
  EYE_STYLES,
  MOUTH_STYLES,
  SHIRT_COLORS,
  randomAvatar,
} from '../data/avatar.js'
import { REWARDS } from '../data/rewards.js'
import { btnVars } from './ui.jsx'

const FACE_TABS = [
  { id: 'skin', label: 'Skin' },
  { id: 'hair', label: 'Hair' },
  { id: 'colour', label: 'Colour' },
  { id: 'eyes', label: 'Eyes' },
  { id: 'mouth', label: 'Mouth' },
  { id: 'cheeks', label: 'Cheeks' },
  { id: 'shirt', label: 'Top' },
]

function Swatch({ hex, on, onClick, locked }) {
  return (
    <button
      onClick={onClick}
      disabled={locked}
      className={`w-11 h-11 rounded-2xl border-4 transition ${on ? 'border-sky scale-110' : 'border-white'} ${
        locked ? 'opacity-40' : ''
      }`}
      style={{ background: hex, boxShadow: '0 3px 0 rgba(0,0,0,0.12)' }}
      aria-label="colour"
    >
      {locked && '\u{1F512}'}
    </button>
  )
}

function Chip({ label, on, onClick }) {
  return (
    <button onClick={onClick} className={`chip ${on ? 'chip-on' : ''}`}>
      {label}
    </button>
  )
}

export default function AvatarBuilder({ value, onChange, owned = [], showItems = true }) {
  const [tab, setTab] = useState('skin')
  const [section, setSection] = useState('face') // 'face' | 'items'
  const set = (patch) => onChange({ ...value, ...patch })

  const ownsFunHair = owned.includes('haircolour')
  const ownedItems = REWARDS.filter((r) => r.type === 'avatar' && owned.includes(r.id))
  const slots = ['hat', 'glasses', 'accessory', 'earrings', 'necklace']
  const slotItems = (slot) => ownedItems.filter((r) => r.field === slot)
  const hasItems = ownedItems.some((r) => slots.includes(r.field))

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="bg-cream rounded-full p-2 animate-floaty" style={{ boxShadow: '0 8px 0 rgba(0,0,0,0.06)' }}>
          <Avatar config={value} size={180} ring />
        </div>
        <button className="btn-ghost mt-3 text-sm" onClick={() => onChange({ ...randomAvatar(), ...pickItems(value) })}>
          🎲 Surprise me
        </button>
      </div>

      {showItems && (
        <div className="flex justify-center gap-2 mt-4">
          <button className={`chip ${section === 'face' ? 'chip-on' : ''}`} onClick={() => setSection('face')}>
            Face
          </button>
          <button className={`chip ${section === 'items' ? 'chip-on' : ''}`} onClick={() => setSection('items')}>
            Items {hasItems ? '' : '\u{1F512}'}
          </button>
        </div>
      )}

      {section === 'face' ? (
        <>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {FACE_TABS.map((t) => (
              <Chip key={t.id} label={t.label} on={tab === t.id} onClick={() => setTab(t.id)} />
            ))}
          </div>

          <div className="mt-4 min-h-[96px] flex flex-wrap gap-2 justify-center items-center">
            {tab === 'skin' &&
              SKIN_TONES.map((s) => <Swatch key={s.id} hex={s.hex} on={value.skin === s.id} onClick={() => set({ skin: s.id })} />)}

            {tab === 'hair' &&
              HAIR_STYLES.map((h) => <Chip key={h.id} label={h.name} on={value.hair === h.id} onClick={() => set({ hair: h.id })} />)}

            {tab === 'colour' && (
              <>
                {BASIC_HAIR_COLORS.map((c) => (
                  <Swatch key={c.id} hex={c.hex} on={value.hairColor === c.id} onClick={() => set({ hairColor: c.id })} />
                ))}
                {FUN_HAIR_COLORS.map((c) => (
                  <Swatch
                    key={c.id}
                    hex={c.hex}
                    on={value.hairColor === c.id}
                    locked={!ownsFunHair}
                    onClick={() => ownsFunHair && set({ hairColor: c.id })}
                  />
                ))}
                {!ownsFunHair && <p className="w-full text-center text-xs text-ink/50 font-bold">Unlock fun colours in the shop</p>}
              </>
            )}

            {tab === 'eyes' &&
              EYE_STYLES.map((e) => <Chip key={e.id} label={e.name} on={value.eyes === e.id} onClick={() => set({ eyes: e.id })} />)}

            {tab === 'mouth' &&
              MOUTH_STYLES.map((m) => <Chip key={m.id} label={m.name} on={value.mouth === m.id} onClick={() => set({ mouth: m.id })} />)}

            {tab === 'cheeks' && (
              <>
                <Chip label="Rosy cheeks" on={value.cheeks !== false} onClick={() => set({ cheeks: true })} />
                <Chip label="No cheeks" on={value.cheeks === false} onClick={() => set({ cheeks: false })} />
              </>
            )}

            {tab === 'shirt' &&
              SHIRT_COLORS.map((c) => <Swatch key={c.id} hex={c.hex} on={value.shirt === c.id} onClick={() => set({ shirt: c.id })} />)}
          </div>
        </>
      ) : (
        <div className="mt-4 space-y-3">
          {!hasItems && (
            <p className="text-center text-ink/50 font-bold py-6">No items yet. Earn coins, then buy hats, crowns and jewellery in the shop!</p>
          )}
          {slots.map((slot) => {
            const items = slotItems(slot)
            if (!items.length) return null
            const label = { hat: 'Hats', glasses: 'Glasses', accessory: 'Hair bow', earrings: 'Earrings', necklace: 'Necklaces' }[slot]
            return (
              <div key={slot}>
                <div className="font-display font-bold text-ink/60 text-sm mb-1">{label}</div>
                <div className="flex flex-wrap gap-2">
                  <button className={`chip ${!value[slot] ? 'chip-on' : ''}`} onClick={() => set({ [slot]: null })}>
                    None
                  </button>
                  {items.map((r) => (
                    <button
                      key={r.id}
                      className={`chip ${value[slot] === r.unlocks ? 'chip-on' : ''}`}
                      onClick={() => set({ [slot]: r.unlocks })}
                    >
                      {r.emoji} {r.name}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// keep equipped items when shuffling the face
function pickItems(v) {
  return { hat: v.hat, glasses: v.glasses, accessory: v.accessory, earrings: v.earrings, necklace: v.necklace, shirt: v.shirt, cheeks: v.cheeks }
}
