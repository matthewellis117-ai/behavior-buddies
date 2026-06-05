import { useState } from 'react'
import AvatarBuilder from './AvatarBuilder.jsx'
import { defaultAvatar } from '../data/avatar.js'
import { btnVars } from './ui.jsx'

export default function SetupChild({ onSave, onCancel, initialName = '', initialAvatar = null, title = 'Add a buddy' }) {
  const [name, setName] = useState(initialName)
  const [avatar, setAvatar] = useState(initialAvatar || defaultAvatar())

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <h1 className="font-display text-3xl font-extrabold text-center text-white drop-shadow mb-4">{title}</h1>
      <div className="card p-5">
        <label className="font-display font-bold text-ink/70">Their name</label>
        <input
          autoFocus
          value={name}
          maxLength={16}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Ava"
          className="w-full mt-1 mb-4 text-xl font-display font-bold rounded-2xl py-3 px-4 border-4 border-sky/40 outline-none focus:border-sky"
        />
        <AvatarBuilder value={avatar} onChange={setAvatar} owned={[]} showItems={false} />
        <div className="flex gap-2 mt-6">
          {onCancel && (
            <button className="btn-ghost flex-1" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button
            className="btn3d flex-1 text-lg"
            style={btnVars('grass')}
            disabled={!name.trim()}
            onClick={() => onSave(name, avatar)}
          >
            {initialName ? 'Save' : 'Create buddy \u2728'}
          </button>
        </div>
      </div>
    </div>
  )
}
