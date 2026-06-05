import { useState } from 'react'
import { useStore, DEFAULT_CONSEQUENCE } from '../lib/store.jsx'
import { coinsFromWeek, weekKey } from '../lib/economy.js'
import { Coin, btnVars } from './ui.jsx'

export default function ParentArea({ child, onBack, onDeleted }) {
  const { state, setPin, setConsequence, endWeekNow, renameChild, removeChild, resetAll } = useStore()
  const [pinInput, setPinInput] = useState(state.settings.pin || '')
  const [name, setName] = useState(child?.name || '')
  const [warn, setWarn] = useState(state.settings.consequence ?? DEFAULT_CONSEQUENCE)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const [paidNote, setPaidNote] = useState(0)

  const wk = weekKey()
  const earned = child ? coinsFromWeek(child.events, wk) : 0
  const paidSoFar = child ? (child.paidByWeek || {})[wk] || 0 : 0
  const unpaid = Math.max(0, earned - paidSoFar)

  return (
    <div className="max-w-lg mx-auto px-4 py-5">
      <div className="flex items-center justify-between mb-4">
        <button className="btn-ghost py-2 px-4" onClick={onBack}>
          {'\u2190'} Back
        </button>
        <h1 className="font-display text-2xl font-extrabold text-white drop-shadow">Grown-up settings</h1>
        <span className="w-16" />
      </div>

      {child && (
        <div className="card p-4 mb-4">
          <h3 className="font-display font-extrabold mb-2">{child.name}</h3>
          <label className="font-bold text-ink/60 text-sm">Name</label>
          <input
            value={name}
            maxLength={16}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => renameChild(child.id, name)}
            className="w-full mt-1 mb-3 font-display font-bold rounded-2xl py-2 px-3 border-4 border-sky/30 outline-none focus:border-sky"
          />

          <div className="bg-cream rounded-2xl p-3 mb-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-display font-extrabold">Pay out coins</div>
                <div className="text-xs text-ink/55 font-semibold">
                  {unpaid > 0 ? (
                    <span>
                      Bank this week's new points{' '}
                      <span className="inline-flex items-center gap-0.5 font-extrabold text-sunnyDark">
                        (<Coin size={14} />
                        {unpaid})
                      </span>
                    </span>
                  ) : (
                    <span>Nothing new to pay out right now</span>
                  )}
                </div>
              </div>
              <button
                className="btn3d py-2 px-4 text-sm"
                style={btnVars('sunny')}
                disabled={unpaid === 0}
                onClick={() => {
                  const added = endWeekNow(child.id)
                  if (added > 0) {
                    setPaidNote(added)
                    setTimeout(() => setPaidNote(0), 2500)
                  }
                }}
              >
                Pay out
              </button>
            </div>
            {paidNote > 0 && (
              <p className="text-grassDark font-bold text-sm mt-2">
                Added {paidNote} {paidNote === 1 ? 'coin' : 'coins'}! 🎉
              </p>
            )}
            <p className="text-[11px] text-ink/45 font-semibold mt-2">
              Coins also bank on their own every Monday. You can pay out as often as you like, even more than once a day. Each buddy only ever banks coins they have newly earned.
            </p>
          </div>

          {!confirmDelete ? (
            <button className="btn-ghost w-full text-coral text-sm" onClick={() => setConfirmDelete(true)}>
              Delete {child.name}
            </button>
          ) : (
            <div className="flex gap-2">
              <button className="btn-ghost flex-1 text-sm" onClick={() => setConfirmDelete(false)}>
                Keep
              </button>
              <button
                className="btn3d flex-1 text-sm"
                style={btnVars('coral')}
                onClick={() => {
                  removeChild(child.id)
                  onDeleted()
                }}
              >
                Yes, delete
              </button>
            </div>
          )}
        </div>
      )}

      <div className="card p-4 mb-4">
        <h3 className="font-display font-extrabold mb-1">Grown-up PIN</h3>
        <p className="text-xs text-ink/55 font-semibold mb-2">
          Optional. When set, giving faces asks for this 4-digit PIN so children can't award their own.
        </p>
        <div className="flex gap-2">
          <input
            inputMode="numeric"
            value={pinInput}
            maxLength={4}
            placeholder="No PIN set"
            onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
            className="flex-1 text-center text-xl tracking-[0.4em] font-display font-extrabold rounded-2xl py-2 border-4 border-sky/30 outline-none focus:border-sky"
          />
          <button
            className="btn3d px-4 text-sm"
            style={btnVars('grass')}
            onClick={() => setPin(pinInput.length === 4 ? pinInput : null)}
          >
            Save
          </button>
          {state.settings.pin && (
            <button
              className="btn-ghost px-4 text-sm"
              onClick={() => {
                setPin(null)
                setPinInput('')
              }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="card p-4 mb-4">
        <h3 className="font-display font-extrabold mb-1">Warning message</h3>
        <p className="text-xs text-ink/55 font-semibold mb-2">
          Shown to a child when a week has more sad faces than happy ones. Put the consequence in your own words. This should be rare.
        </p>
        <input
          value={warn}
          maxLength={80}
          onChange={(e) => setWarn(e.target.value)}
          onBlur={() => setConsequence(warn.trim() || DEFAULT_CONSEQUENCE)}
          className="w-full font-bold rounded-2xl py-2 px-3 border-4 border-sky/30 outline-none focus:border-sky"
        />
        <p className="text-[11px] text-ink/45 font-semibold mt-2">
          The child will read: "If the week stays like this, {warn.trim() || DEFAULT_CONSEQUENCE}."
        </p>
      </div>

      <div className="card p-4">
        <h3 className="font-display font-extrabold mb-1">Reset everything</h3>
        <p className="text-xs text-ink/55 font-semibold mb-2">Removes all buddies, coins and history from this device.</p>
        {!confirmReset ? (
          <button className="btn-ghost w-full text-coral text-sm" onClick={() => setConfirmReset(true)}>
            Reset app
          </button>
        ) : (
          <div className="flex gap-2">
            <button className="btn-ghost flex-1 text-sm" onClick={() => setConfirmReset(false)}>
              Cancel
            </button>
            <button
              className="btn3d flex-1 text-sm"
              style={btnVars('coral')}
              onClick={() => {
                resetAll()
                onDeleted()
              }}
            >
              Wipe it all
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
