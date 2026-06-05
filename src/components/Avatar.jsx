import { hairColorHex, shirtHex } from '../data/avatar.js'
import { SKIN_TONES } from '../data/avatar.js'

function skinHex(id) {
  return SKIN_TONES.find((s) => s.id === id)?.hex || SKIN_TONES[1].hex
}

// A gentle darker shade for shading hair / shirts.
function shade(hex, amt = 0.16) {
  const n = parseInt(hex.slice(1), 16)
  let r = (n >> 16) & 255
  let g = (n >> 8) & 255
  let b = n & 255
  r = Math.round(r * (1 - amt))
  g = Math.round(g * (1 - amt))
  b = Math.round(b * (1 - amt))
  return `rgb(${r},${g},${b})`
}

const OUTLINE = 'rgba(60,58,54,0.16)'

/* ---------------- HAIR ---------------- */
function HairBack({ style, c }) {
  const d = shade(c, 0.18)
  switch (style) {
    case 'long':
      return <path d="M58 96 C46 130 50 188 64 214 L176 214 C190 188 194 130 182 96 Z" fill={c} stroke={OUTLINE} strokeWidth="2" />
    case 'bob':
      return <path d="M56 92 C48 120 52 158 64 172 L176 172 C188 158 192 120 184 92 Z" fill={c} stroke={OUTLINE} strokeWidth="2" />
    case 'ponytail':
      return <path d="M168 96 C204 104 206 150 188 176 C182 150 176 128 160 120 Z" fill={d} stroke={OUTLINE} strokeWidth="2" />
    case 'afro':
      return <circle cx="120" cy="96" r="80" fill={c} stroke={OUTLINE} strokeWidth="2" />
    default:
      return null
  }
}

function HairFront({ style, c }) {
  if (style === 'bald') return null
  const d = shade(c, 0.16)
  const common = { fill: c, stroke: OUTLINE, strokeWidth: 2 }
  switch (style) {
    case 'buzz':
      return <path d="M60 96 C66 56 174 56 180 96 C168 80 72 80 60 96 Z" {...common} />
    case 'short':
      return <path d="M58 104 C58 50 182 50 182 104 C168 78 150 70 120 70 C90 70 72 78 58 104 Z" {...common} />
    case 'swoosh':
      return (
        <g>
          <path d="M58 102 C58 50 182 50 182 100 C176 80 150 72 120 72 C112 72 60 70 58 102 Z" {...common} />
          <path d="M118 70 C150 66 178 78 180 100 C150 78 120 96 96 96 C108 78 110 72 118 70 Z" fill={d} />
        </g>
      )
    case 'bob':
      return <path d="M56 100 C56 52 184 52 184 100 C168 78 150 70 120 70 C90 70 72 78 56 100 Z" {...common} />
    case 'ponytail':
      return <path d="M58 100 C58 52 182 52 182 100 C168 76 150 70 120 70 C90 70 72 78 58 100 Z" {...common} />
    case 'curly':
      return (
        <g {...common}>
          <circle cx="72" cy="86" r="20" /><circle cx="98" cy="70" r="22" />
          <circle cx="120" cy="64" r="22" /><circle cx="144" cy="70" r="22" />
          <circle cx="168" cy="86" r="20" /><circle cx="60" cy="104" r="16" />
          <circle cx="180" cy="104" r="16" />
        </g>
      )
    case 'afro':
      return null
    case 'bun':
      return (
        <g>
          <circle cx="120" cy="46" r="20" {...common} />
          <path d="M58 100 C58 54 182 54 182 100 C168 78 150 72 120 72 C90 72 72 78 58 100 Z" {...common} />
        </g>
      )
    case 'long':
      return <path d="M56 102 C56 50 184 50 184 102 C168 78 150 70 120 70 C90 70 72 78 56 102 Z" {...common} />
    case 'spiky':
      return (
        <path
          d="M58 100 L74 56 L92 90 L108 50 L122 90 L138 50 L154 92 L172 58 L182 100 C168 80 150 74 120 74 C90 74 72 80 58 100 Z"
          {...common}
        />
      )
    default:
      return null
  }
}

/* ---------------- EYES ---------------- */
function Eye({ x, style, winkClosed }) {
  const white = '#ffffff'
  const ink = '#3c3a36'
  if (style === 'happy')
    return <path d={`M${x - 13} 116 Q${x} 102 ${x + 13} 116`} fill="none" stroke={ink} strokeWidth="6" strokeLinecap="round" />
  if (style === 'sleepy')
    return <path d={`M${x - 13} 114 Q${x} 122 ${x + 13} 114`} fill="none" stroke={ink} strokeWidth="6" strokeLinecap="round" />
  if (style === 'wink' && winkClosed)
    return <path d={`M${x - 13} 114 Q${x} 122 ${x + 13} 114`} fill="none" stroke={ink} strokeWidth="6" strokeLinecap="round" />
  const r = style === 'wide' ? 15 : 12
  const pr = style === 'wide' ? 8 : 7
  return (
    <g>
      <circle cx={x} cy={114} r={r} fill={white} stroke={OUTLINE} strokeWidth="2" />
      <circle cx={x + 1} cy={116} r={pr} fill={ink} />
      <circle cx={x + 4} cy={112} r={style === 'sparkle' ? 4 : 2.6} fill="#fff" />
      {style === 'sparkle' && <circle cx={x - 3} cy={118} r={2} fill="#fff" />}
    </g>
  )
}

function Eyes({ style }) {
  return (
    <g>
      <Eye x={98} style={style} />
      <Eye x={142} style={style} winkClosed={style === 'wink'} />
    </g>
  )
}

/* ---------------- MOUTH ---------------- */
function Mouth({ style }) {
  const ink = '#3c3a36'
  switch (style) {
    case 'grin':
      return (
        <g>
          <path d="M96 146 Q120 176 144 146 Z" fill={ink} />
          <path d="M100 150 Q120 158 140 150 Z" fill="#fff" />
        </g>
      )
    case 'small':
      return <path d="M110 152 Q120 160 130 152" fill="none" stroke={ink} strokeWidth="5" strokeLinecap="round" />
    case 'laugh':
      return (
        <g>
          <path d="M94 144 Q120 184 146 144 Z" fill={ink} />
          <path d="M110 168 Q120 176 130 168 Z" fill="#ff7a7a" />
        </g>
      )
    case 'neutral':
      return <line x1="104" y1="154" x2="136" y2="154" stroke={ink} strokeWidth="5" strokeLinecap="round" />
    case 'surprise':
      return <ellipse cx="120" cy="154" rx="11" ry="14" fill={ink} />
    default: // smile
      return <path d="M100 146 Q120 168 140 146" fill="none" stroke={ink} strokeWidth="6" strokeLinecap="round" />
  }
}

/* ---------------- ACCESSORIES ---------------- */
function Glasses({ style }) {
  if (!style) return null
  if (style === 'sunnies')
    return (
      <g stroke="#2b2b2f" strokeWidth="4" fill="#3c3a36">
        <rect x="78" y="102" width="38" height="26" rx="10" />
        <rect x="124" y="102" width="38" height="26" rx="10" />
        <line x1="116" y1="110" x2="124" y2="110" />
      </g>
    )
  return (
    <g stroke="#3c3a36" strokeWidth="4" fill="none">
      <circle cx="98" cy="114" r="18" />
      <circle cx="142" cy="114" r="18" />
      <line x1="116" y1="114" x2="124" y2="114" />
    </g>
  )
}

function Earrings({ style }) {
  if (!style) return null
  return (
    <g>
      <circle cx="58" cy="138" r="5" fill="#ffd23f" stroke={OUTLINE} strokeWidth="1.5" />
      <circle cx="182" cy="138" r="5" fill="#ffd23f" stroke={OUTLINE} strokeWidth="1.5" />
    </g>
  )
}

function Necklace({ style }) {
  if (!style) return null
  const gem = style === 'jewel'
  return (
    <g>
      <path d="M96 196 Q120 214 144 196" fill="none" stroke={gem ? '#ffd23f' : '#7ec8ff'} strokeWidth="4" />
      {gem ? (
        <path d="M120 206 l8 8 -8 10 -8 -10 Z" fill="#7ec8ff" stroke="#fff" strokeWidth="1.5" />
      ) : (
        <circle cx="120" cy="210" r="5" fill="#ff86d0" stroke={OUTLINE} strokeWidth="1.5" />
      )}
    </g>
  )
}

function Hat({ style }) {
  if (!style) return null
  switch (style) {
    case 'cap':
      return (
        <g stroke={OUTLINE} strokeWidth="2">
          <path d="M60 84 C66 50 174 50 180 84 L60 84 Z" fill="#ff4b4b" />
          <path d="M58 84 C40 84 36 98 40 102 L120 96 L120 84 Z" fill="#e23a3a" />
          <circle cx="120" cy="52" r="5" fill="#e23a3a" />
        </g>
      )
    case 'beanie':
      return (
        <g stroke={OUTLINE} strokeWidth="2">
          <path d="M58 90 C58 48 182 48 182 90 Z" fill="#1cb0f6" />
          <rect x="56" y="84" width="128" height="14" rx="7" fill="#1899d6" />
          <circle cx="120" cy="40" r="8" fill="#e8f4ff" />
        </g>
      )
    case 'party':
      return (
        <g stroke={OUTLINE} strokeWidth="2">
          <path d="M120 18 L150 86 L90 86 Z" fill="#ce82ff" />
          <circle cx="120" cy="18" r="7" fill="#ffc800" />
          <circle cx="106" cy="60" r="4" fill="#fff" /><circle cx="132" cy="52" r="4" fill="#fff" />
        </g>
      )
    case 'wizard':
      return (
        <g stroke={OUTLINE} strokeWidth="2">
          <path d="M120 8 C108 40 96 78 90 90 L150 90 C144 78 132 40 120 8 Z" fill="#6b4fbb" />
          <path d="M70 90 L170 90 L170 100 L70 100 Z" fill="#5a3fa0" />
          <path d="M118 36 l4 8 8 2 -8 4 -2 8 -4 -8 -8 -2 8 -4 Z" fill="#ffd23f" />
        </g>
      )
    case 'flowers':
      return (
        <g stroke={OUTLINE} strokeWidth="1.5">
          {[64, 90, 120, 150, 176].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy={76 - (i % 2) * 6} r="9" fill={['#ff86d0', '#ffc800', '#ff7a7a', '#ce82ff', '#58cc02'][i]} />
              <circle cx={x} cy={76 - (i % 2) * 6} r="3.5" fill="#fff" />
            </g>
          ))}
        </g>
      )
    case 'crown':
      return (
        <g stroke={OUTLINE} strokeWidth="2">
          <path d="M70 86 L70 52 L92 70 L120 44 L148 70 L170 52 L170 86 Z" fill="#ffc800" />
          <circle cx="120" cy="58" r="5" fill="#ff4b4b" />
          <circle cx="86" cy="66" r="4" fill="#1cb0f6" /><circle cx="154" cy="66" r="4" fill="#1cb0f6" />
        </g>
      )
    case 'halo':
      return (
        <g>
          <ellipse cx="120" cy="40" rx="46" ry="12" fill="none" stroke="#ffd23f" strokeWidth="7" />
          <ellipse cx="120" cy="40" rx="46" ry="12" fill="none" stroke="#fff3c4" strokeWidth="2" />
        </g>
      )
    default:
      return null
  }
}

/* ---------------- AVATAR ---------------- */
export default function Avatar({ config = {}, size = 200, ring = false, className = '' }) {
  const skin = skinHex(config.skin)
  const hair = hairColorHex(config.hairColor)
  const shirt = shirtHex(config.shirt)
  const hairStyle = config.hair || 'swoosh'

  return (
    <svg
      viewBox="0 0 240 240"
      width={size}
      height={size}
      className={className}
      style={{ display: 'block' }}
      role="img"
      aria-label="buddy avatar"
    >
      {ring && <circle cx="120" cy="120" r="118" fill="#fff" stroke="rgba(0,0,0,0.06)" strokeWidth="3" />}

      {/* body / shoulders */}
      <path d="M52 240 C52 196 86 178 120 178 C154 178 188 196 188 240 Z" fill={shirt} stroke={OUTLINE} strokeWidth="2" />
      <path d="M120 178 C100 178 84 184 72 196 C92 190 148 190 168 196 C156 184 140 178 120 178 Z" fill={shade(shirt, 0.12)} />

      {/* neck */}
      <rect x="106" y="158" width="28" height="30" rx="12" fill={shade(skin, 0.08)} />

      {/* hair behind head */}
      <HairBack style={hairStyle} c={hair} />

      {/* ears */}
      <circle cx="60" cy="120" r="13" fill={skin} stroke={OUTLINE} strokeWidth="2" />
      <circle cx="180" cy="120" r="13" fill={skin} stroke={OUTLINE} strokeWidth="2" />
      <Earrings style={config.earrings} />

      {/* head */}
      <ellipse cx="120" cy="116" rx="64" ry="66" fill={skin} stroke={OUTLINE} strokeWidth="2" />

      {/* cheeks */}
      <circle cx="82" cy="138" r="9" fill="#ff9aa2" opacity="0.5" />
      <circle cx="158" cy="138" r="9" fill="#ff9aa2" opacity="0.5" />

      {/* face */}
      <Eyes style={config.eyes || 'happy'} />
      <path d="M118 130 Q120 138 124 134" fill="none" stroke={shade(skin, 0.22)} strokeWidth="3" strokeLinecap="round" />
      <Mouth style={config.mouth || 'smile'} />
      <Glasses style={config.glasses} />

      {/* hair in front + hat on top */}
      <HairFront style={hairStyle} c={hair} />
      <Hat style={config.hat} />

      {/* necklace sits over the shirt */}
      <Necklace style={config.necklace} />
    </svg>
  )
}
