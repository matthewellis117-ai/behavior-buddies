import Avatar from './Avatar.jsx'
import { Coin } from './ui.jsx'

export default function Dashboard({ children, onOpen, onAdd, onPeekShop }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <h1 className="font-display text-4xl font-extrabold text-white drop-shadow-md">Behaviour Buddies</h1>
        <p className="font-display font-bold text-white/85 drop-shadow">Tap a buddy to give faces and shop</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {children.map((c) => (
          <button key={c.id} onClick={() => onOpen(c.id)} className="card p-4 flex flex-col items-center hover:scale-[1.03] active:scale-95 transition">
            <Avatar config={c.avatar} size={120} ring />
            <div className="font-display text-xl font-extrabold mt-2">{c.name}</div>
            <div className="inline-flex items-center gap-1 font-display font-extrabold text-sunnyDark">
              <Coin size={20} />
              {c.coins}
            </div>
          </button>
        ))}

        <button
          onClick={onAdd}
          className="card p-4 flex flex-col items-center justify-center text-grassDark border-dashed hover:scale-[1.03] active:scale-95 transition min-h-[190px]"
          style={{ borderColor: '#bdebac' }}
        >
          <div className="text-6xl leading-none">{'\u2795'}</div>
          <div className="font-display text-lg font-extrabold mt-2">Add a buddy</div>
        </button>
      </div>

      <button
        onClick={onPeekShop}
        className="card w-full mt-4 p-4 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition"
      >
        <span className="text-3xl">{'\u{1F6D2}'}</span>
        <span className="text-left">
          <span className="block font-display text-lg font-extrabold leading-tight">Peek at the shop</span>
          <span className="block text-sm text-ink/55 font-semibold leading-tight">See all the treats and items you can win</span>
        </span>
      </button>
    </div>
  )
}
