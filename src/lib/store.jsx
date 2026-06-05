import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { defaultAvatar } from '../data/avatar.js'
import { rewardById } from '../data/rewards.js'
import { coinsFromWeek, makeEvent, weekKey } from './economy.js'

const KEY = 'behaviour-buddies-v1'

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    /* ignore */
  }
  return { version: 1, children: [], settings: { pin: null } }
}

function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch (e) {
    /* ignore */
  }
}

function newChild(name, avatar) {
  return {
    id: Math.random().toString(36).slice(2),
    name: name.trim() || 'Buddy',
    avatar: avatar || defaultAvatar(),
    coins: 0,
    events: [],
    owned: [],
    purchases: [],
    paidWeeks: [],
  }
}

// Convert any fully-finished week (earlier than the current week) into coins,
// once. Returns true if anything changed.
function runPayouts(child) {
  const current = weekKey()
  const seen = new Set(child.paidWeeks || [])
  const weeks = [...new Set((child.events || []).map((e) => e.week))]
  let changed = false
  for (const wk of weeks) {
    if (wk < current && !seen.has(wk)) {
      child.coins += coinsFromWeek(child.events, wk)
      seen.add(wk)
      changed = true
    }
  }
  if (changed) child.paidWeeks = [...seen]
  return changed
}

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, setState] = useState(() => {
    const s = load()
    let changed = false
    for (const c of s.children) if (runPayouts(c)) changed = true
    if (changed) save(s)
    return s
  })

  const ref = useRef(state)
  ref.current = state

  useEffect(() => {
    save(state)
  }, [state])

  // Re-run payouts if the app is left open across a week boundary.
  useEffect(() => {
    const tick = () => {
      setState((s) => {
        let changed = false
        const next = { ...s, children: s.children.map((c) => ({ ...c })) }
        for (const c of next.children) if (runPayouts(c)) changed = true
        return changed ? next : s
      })
    }
    const t = setInterval(tick, 60 * 1000)
    return () => clearInterval(t)
  }, [])

  const api = useMemo(() => {
    const update = (fn) =>
      setState((s) => {
        const next = { ...s, children: s.children.map((c) => ({ ...c })) }
        fn(next)
        return next
      })

    const find = (id) => ref.current.children.find((c) => c.id === id)

    return {
      addChild(name, avatar) {
        let id = null
        update((s) => {
          const c = newChild(name, avatar)
          id = c.id
          s.children.push(c)
        })
        return id
      },
      removeChild(id) {
        update((s) => {
          s.children = s.children.filter((c) => c.id !== id)
        })
      },
      renameChild(id, name) {
        update((s) => {
          const c = s.children.find((x) => x.id === id)
          if (c) c.name = name.trim() || c.name
        })
      },
      setAvatar(id, avatar) {
        update((s) => {
          const c = s.children.find((x) => x.id === id)
          if (c) c.avatar = avatar
        })
      },
      award(id, behaviourId) {
        update((s) => {
          const c = s.children.find((x) => x.id === id)
          if (c) c.events = [...c.events, makeEvent(behaviourId)]
        })
      },
      undoLast(id) {
        update((s) => {
          const c = s.children.find((x) => x.id === id)
          if (c && c.events.length) {
            const sorted = [...c.events].sort((a, b) => b.at - a.at)
            const lastId = sorted[0].id
            c.events = c.events.filter((e) => e.id !== lastId)
          }
        })
      },
      buy(id, rewardId) {
        const r = rewardById(rewardId)
        if (!r) return false
        const c = find(id)
        if (!c || c.coins < r.price) return false
        update((s) => {
          const ch = s.children.find((x) => x.id === id)
          ch.coins -= r.price
          if (r.type === 'avatar') {
            if (!ch.owned.includes(rewardId)) ch.owned.push(rewardId)
          } else {
            ch.purchases = [
              ...ch.purchases,
              { id: Math.random().toString(36).slice(2), reward: rewardId, at: Date.now(), week: weekKey(), redeemed: false },
            ]
          }
        })
        return true
      },
      redeem(id, purchaseId) {
        update((s) => {
          const c = s.children.find((x) => x.id === id)
          const p = c?.purchases.find((x) => x.id === purchaseId)
          if (p) p.redeemed = true
        })
      },
      // Force the current week to pay out now (the "End the week" button).
      endWeekNow(id) {
        update((s) => {
          const c = s.children.find((x) => x.id === id)
          if (!c) return
          const wk = weekKey()
          if (!(c.paidWeeks || []).includes(wk)) {
            c.coins += coinsFromWeek(c.events, wk)
            c.paidWeeks = [...(c.paidWeeks || []), wk]
          }
        })
      },
      setPin(pin) {
        update((s) => {
          s.settings = { ...s.settings, pin: pin || null }
        })
      },
      resetAll() {
        setState({ version: 1, children: [], settings: { pin: null } })
      },
    }
  }, [])

  return <StoreContext.Provider value={{ state, ...api }}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
