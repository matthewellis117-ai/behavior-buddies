import { useState } from 'react'
import { POSITIVE, NEGATIVE } from '../data/behaviours.js'
import { Modal, btnVars } from './ui.jsx'

export default function AwardModal({ childName, onAward, onClose }) {
  const [mood, setMood] = useState(null) // 'happy' | 'sad'
  const list = mood === 'happy' ? POSITIVE : NEGATIVE

  return (
    <Modal onClose={onClose} wide>
      {!mood ? (
        <div className="text-center">
          <h3 className="font-display text-2xl font-extrabold mb-1">How was {childName}?</h3>
          <p className="text-ink/60 font-semibold mb-5">Give a happy face or a sad face</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMood('happy')}
              className="btn3d py-8 text-2xl flex flex-col items-center gap-2"
              style={btnVars('grass')}
            >
              <span className="text-5xl">{'\u{1F600}'}</span>
              Happy face
            </button>
            <button
              onClick={() => setMood('sad')}
              className="btn3d py-8 text-2xl flex flex-col items-center gap-2"
              style={btnVars('coral')}
            >
              <span className="text-5xl">{'\u{1F61E}'}</span>
              Sad face
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-3">
            <button className="btn-ghost py-2 px-3 text-sm" onClick={() => setMood(null)}>
              {'\u2190'} Back
            </button>
            <h3 className="font-display text-xl font-extrabold">{mood === 'happy' ? 'What was great?' : 'What happened?'}</h3>
            <span className="w-16" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {list.map((b) => (
              <button
                key={b.id}
                onClick={() => onAward(b.id)}
                className="card p-3 text-left hover:scale-[1.03] transition active:scale-95"
                style={{ borderColor: mood === 'happy' ? '#d6f5c0' : '#ffd6d6' }}
              >
                <div className="text-3xl mb-1">{b.emoji}</div>
                <div className="font-display font-extrabold leading-tight">{b.label}</div>
                <div className={`font-display font-extrabold text-sm ${b.points >= 0 ? 'text-grassDark' : 'text-coral'}`}>
                  {b.points > 0 ? `+${b.points}` : b.points} {Math.abs(b.points) === 1 ? 'point' : 'points'}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </Modal>
  )
}
