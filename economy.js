// Everything the avatar builder offers. Faces are fully free to customise
// (like Duolingo). Accessories and the "fun" hair colours are unlocked in the shop.

export const SKIN_TONES = [
  { id: 'porcelain', hex: '#ffe0bd' },
  { id: 'fair',      hex: '#ffcd94' },
  { id: 'tan',       hex: '#eab38a' },
  { id: 'olive',     hex: '#d49a6a' },
  { id: 'brown',     hex: '#a9744f' },
  { id: 'deep',      hex: '#6b4423' },
]

export const HAIR_STYLES = [
  { id: 'bald',     name: 'None' },
  { id: 'buzz',     name: 'Buzz' },
  { id: 'short',    name: 'Short' },
  { id: 'swoosh',   name: 'Swoosh' },
  { id: 'bob',      name: 'Bob' },
  { id: 'ponytail', name: 'Ponytail' },
  { id: 'curly',    name: 'Curly' },
  { id: 'afro',     name: 'Afro' },
  { id: 'bun',      name: 'Bun' },
  { id: 'long',     name: 'Long' },
  { id: 'spiky',    name: 'Spiky' },
]

export const BASIC_HAIR_COLORS = [
  { id: 'black',     hex: '#2b2b2f' },
  { id: 'darkbrown', hex: '#4a2f1b' },
  { id: 'brown',     hex: '#7a4a23' },
  { id: 'ginger',    hex: '#c1440e' },
  { id: 'blonde',    hex: '#e6b94e' },
  { id: 'white',     hex: '#e8e8ee' },
]

export const FUN_HAIR_COLORS = [
  { id: 'pink',   hex: '#ff7ec8' },
  { id: 'blue',   hex: '#3aa7ff' },
  { id: 'mint',   hex: '#3fd6a8' },
  { id: 'purple', hex: '#b06bff' },
]

export function hairColorHex(id) {
  return (
    [...BASIC_HAIR_COLORS, ...FUN_HAIR_COLORS].find((c) => c.id === id)?.hex ||
    BASIC_HAIR_COLORS[2].hex
  )
}

export const EYE_STYLES = [
  { id: 'round',   name: 'Round' },
  { id: 'happy',   name: 'Happy' },
  { id: 'wide',    name: 'Wide' },
  { id: 'sleepy',  name: 'Sleepy' },
  { id: 'sparkle', name: 'Sparkle' },
  { id: 'wink',    name: 'Wink' },
]

export const MOUTH_STYLES = [
  { id: 'smile',    name: 'Smile' },
  { id: 'grin',     name: 'Grin' },
  { id: 'small',    name: 'Small' },
  { id: 'laugh',    name: 'Laugh' },
  { id: 'neutral',  name: 'Neutral' },
  { id: 'surprise', name: 'Surprised' },
]

export const SHIRT_COLORS = [
  { id: 'grass',  hex: '#58cc02' },
  { id: 'sky',    hex: '#1cb0f6' },
  { id: 'coral',  hex: '#ff4b4b' },
  { id: 'grape',  hex: '#ce82ff' },
  { id: 'sunny',  hex: '#ffc800' },
  { id: 'bubble', hex: '#ff86d0' },
]

export function shirtHex(id) {
  return SHIRT_COLORS.find((c) => c.id === id)?.hex || SHIRT_COLORS[0].hex
}

export function defaultAvatar() {
  return {
    skin: 'fair',
    hair: 'swoosh',
    hairColor: 'brown',
    eyes: 'happy',
    mouth: 'smile',
    shirt: 'sky',
    cheeks: true,
    hat: null,
    glasses: null,
    earrings: null,
    necklace: null,
  }
}

// A random buddy so the "surprise me" button has something to do.
export function randomAvatar() {
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)].id
  return {
    skin: pick(SKIN_TONES),
    hair: pick(HAIR_STYLES.filter((h) => h.id !== 'bald')),
    hairColor: pick(BASIC_HAIR_COLORS),
    eyes: pick(EYE_STYLES),
    mouth: pick(MOUTH_STYLES),
    shirt: pick(SHIRT_COLORS),
    cheeks: true,
    hat: null,
    glasses: null,
    earrings: null,
    necklace: null,
  }
}
