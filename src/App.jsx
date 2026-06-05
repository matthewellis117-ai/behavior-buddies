import { useState } from 'react'
import { useStore } from './lib/store.jsx'
import Avatar from './components/Avatar.jsx'
import Dashboard from './components/Dashboard.jsx'
import SetupChild from './components/SetupChild.jsx'
import ChildHome from './components/ChildHome.jsx'
import Shop from './components/Shop.jsx'
import Summary from './components/Summary.jsx'
import DressUp from './components/DressUp.jsx'
import ParentArea from './components/ParentArea.jsx'
import { randomAvatar } from './data/avatar.js'
import { btnVars } from './components/ui.jsx'

function Welcome({ onStart }) {
  const demo = [
    { skin: 'tan', hair: 'ponytail', hairColor: 'ginger', eyes: 'sparkle', mouth: 'grin', shirt: 'bubble', hat: 'crown' },
    { skin: 'brown', hair: 'afro', hairColor: 'black', eyes: 'happy', mouth: 'laugh', shirt: 'grass', glasses: 'round' },
    { skin: 'fair', hair: 'swoosh', hairColor: 'brown', eyes: 'wide', mouth: 'smile', shirt: 'sky', hat: 'cap' },
  ]
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 text-center">
      <div className="flex -space-x-6 mb-6">
        {demo.map((d, i) => (
          <div key={i} className="bg-cream rounded-full p-1 animate-floaty" style={{ animationDelay: i * 0.4 + 's', boxShadow: '0 8px 0 rgba(0,0,0,0.06)' }}>
            <Avatar config={d} size={110} ring />
          </div>
        ))}
      </div>
      <h1 className="font-display text-5xl font-extrabold text-white drop-shadow-md">Behaviour Buddies</h1>
      <p className="font-display font-bold text-white/90 text-lg max-w-md mt-3 drop-shadow">
        Reward great behaviour with happy faces, turn them into coins, and spend them in the weekly shop. Build a cartoon buddy and dress it up with what you earn.
      </p>
      <button className="btn3d text-xl mt-8 px-10 py-4" style={btnVars('grass')} onClick={onStart}>
        Get started {'\u2728'}
      </button>
      <p className="text-white/70 font-bold text-sm mt-6">Everything stays private on this device.</p>
    </div>
  )
}

export default function App() {
  const { state, addChild, setAvatar } = useStore()
  const [view, setView] = useState({ name: 'home' })
  const children = state.children
  const child = children.find((c) => c.id === view.id)

  const go = (name, id) => setView({ name, id })

  if (children.length === 0 && view.name !== 'setup') {
    return <Welcome onStart={() => setView({ name: 'setup' })} />
  }

  switch (view.name) {
    case 'setup':
      return (
        <SetupChild
          title={children.length === 0 ? 'Make your first buddy' : 'Add a buddy'}
          initialAvatar={randomAvatar()}
          onCancel={children.length === 0 ? null : () => setView({ name: 'home' })}
          onSave={(name, avatar) => {
            const id = addChild(name, avatar)
            setView({ name: 'child', id })
          }}
        />
      )

    case 'child':
      if (!child) return <Dashboard children={children} onOpen={(id) => go('child', id)} onAdd={() => setView({ name: 'setup' })} />
      return (
        <ChildHome
          child={child}
          onBack={() => setView({ name: 'home' })}
          onShop={() => go('shop', child.id)}
          onSummary={() => go('summary', child.id)}
          onDressUp={() => go('dressup', child.id)}
          onParent={() => go('parent', child.id)}
        />
      )

    case 'shop':
      return <ShopRoute child={child} onBack={() => go('child', child.id)} />

    case 'summary':
      return child ? <Summary child={child} onBack={() => go('child', child.id)} /> : null

    case 'dressup':
      return child ? (
        <DressUp
          child={child}
          onCancel={() => go('child', child.id)}
          onSave={(avatar) => {
            setAvatar(child.id, avatar)
            go('child', child.id)
          }}
        />
      ) : null

    case 'parent':
      return (
        <ParentArea
          child={child}
          onBack={() => (child ? go('child', child.id) : setView({ name: 'home' }))}
          onDeleted={() => setView({ name: 'home' })}
        />
      )

    default:
      return <Dashboard children={children} onOpen={(id) => go('child', id)} onAdd={() => setView({ name: 'setup' })} />
  }
}

// Small wrapper so Shop can use the live buy action and re-read coins each render.
function ShopRoute({ child, onBack }) {
  const { buy, state } = useStore()
  const fresh = state.children.find((c) => c.id === child?.id)
  if (!fresh) return null
  return <Shop child={fresh} onBuy={(id) => buy(fresh.id, id)} onBack={onBack} />
}
