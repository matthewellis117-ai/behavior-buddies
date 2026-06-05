import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { defaultAvatar } from '../data/avatar.js'
import { rewardById, STARTER_ITEMS } from '../data/rewards.js'
import { coinsFromWeek, makeEvent, weekKey } from './economy.js'

const KEY = 'behaviour-buddies-v1'

// Shown to a child when a week goes net-negative. The grown-up can reword it.
export const DEFAULT_CONSEQUENCE = 'you might lose a toy or some screen time'

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
    owned: [...STARTER_ITEMS],
    purchases: [],
    paidByWeek: {},
  }
}

// Bring older saved buddies up to date with newer features.
function migrateChild(c) {
  c.owned = c.owned || []
  for (const id of STARTER_ITEMS) if (!c.owned.includes(id)) c.owned.push(id)
  if (!c.paidByWeek) {
    c.paidByWeek = {}
    for (const wk of c.paidWeeks || []) c.paidByWeek[wk] = coinsFromWeek(c.events || [], wk)
    delete c.paidWeeks
  }
  if (c.avatar && c.avatar.cheeks === undefined) c.avatar.cheeks = true
  return c
}

// Bank coins for any finished week (earlier than the current week). Pays only
// the part not already paid out, so it is safe to run repeatedly. Returns true
// if anything changed.
function runPayouts(child) {
  const current = weekKey()
  const paid = { ...(child.paidByWeek || {}) }
  const weeks = [...new Set((child.events || []).map((e) => e.week))]
  let changed = false
  for (const wk of weeks) {
    if (wk < current) {
      const owed = coinsFromWeek(child.events, wk) - (paid[wk] || 0)
      if (owed > 0) {
        child.coins += owed
        paid[wk] = (paid[wk] || 0) + owed
        changed = true
      }
    }
  }
  if (changed) child.paidByWeek = paid
  return changed
}

const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, setState] = useState(() => {
    const s = load()
    s.children = (s.children || []).map(migrateChild)
    s.settings = { pin: null, consequence: DEFAULT_CONSEQUENCE, ...(s.settings || {}) }
    for (const c of s.children) runPayouts(c)
    save(s)
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
      // Pay out this week's coins now. Pays only what has not already been paid,
      // so a grown-up can pay out as often as they like (even twice in a day) and
      // each child only ever banks the coins they have newly earned. Returns the
      // number of coins added (computed up front so the caller always gets it).
      endWeekNow(id) {
        const c = find(id)
        if (!c) return 0
        const wk = weekKey()
        const owed = coinsFromWeek(c.events, wk) - ((c.paidByWeek || {})[wk] || 0)
        if (owed <= 0) return 0
        update((s) => {
          const ch = s.children.find((x) => x.id === id)
          if (!ch) return
          const paid = { ...(ch.paidByWeek || {}) }
          paid[wk] = (paid[wk] || 0) + owed
          ch.paidByWeek = paid
          ch.coins += owed
        })
        return owed
      },
      setPin(pin) {
        update((s) => {
          s.settings = { ...s.settings, pin: pin || null }
        })
      },
      setConsequence(text) {
        update((s) => {
          s.settings = { ...s.settings, consequence: text }
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
