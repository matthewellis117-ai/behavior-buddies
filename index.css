import { useState } from 'react'
import AvatarBuilder from './AvatarBuilder.jsx'
import { btnVars } from './ui.jsx'

export default function DressUp({ child, onSave, onCancel }) {
  const [avatar, setAvatar] = useState(child.avatar)
  return (
    <div className="max-w-lg mx-auto px-4 py-5">
      <h1 className="font-display text-3xl font-extrabold text-center text-white drop-shadow mb-4">Dress up {child.name}</h1>
      <div className="card p-5">
        <AvatarBuilder value={avatar} onChange={setAvatar} owned={child.owned} showItems />
        <div className="flex gap-2 mt-6">
          <button className="btn-ghost flex-1" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn3d flex-1 text-lg" style={btnVars('grass')} onClick={() => onSave(avatar)}>
            Save look
          </button>
        </div>
      </div>
    </div>
  )
}
