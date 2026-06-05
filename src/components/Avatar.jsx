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
      return <path d="M54 92 C40 132 46 196 64 220 L176 220 C194 196 200 132 186 92 Z" fill={c} stroke={OUTLINE} strokeWidth="2" />
    case 'bob':
      return <path d="M56 94 C48 124 52 162 66 178 L174 178 C188 162 192 124 184 94 Z" fill={c} stroke={OUTLINE} strokeWidth="2" />
    case 'ponytail':
      return (
        <g>
          <path d="M168 98 C208 106 212 158 190 188 C186 158 176 132 156 122 Z" fill={d} stroke={OUTLINE} strokeWidth="2" />
          <ellipse cx="176" cy="102" rx="13" ry="11" fill={c} stroke={OUTLINE} strokeWidth="2" />
        </g>
      )
    case 'afro':
      return <circle cx="120" cy="104" r="84" fill={c} stroke={OUTLINE} strokeWidth="2" />
    default:
      return null
  }
}

function HairFront({ style, c }) {
  if (style === 'bald') return null
  const d = shade(c, 0.16)
  const common = { fill: c, stroke: OUTLINE, strokeWidth: 2 }
  // A SOLID cap: outer edge sweeps right over the top of the head (crown at y46,
  // above the head top at y50) and the inner edge is the hairline across the
  // forehead. The area between is filled, so the whole crown is covered.
  const CAP = 'M52 118 C48 62 92 46 120 46 C148 46 192 62 188 118 C176 102 150 94 120 94 C90 94 64 102 52 118 Z'
  switch (style) {
    case 'buzz':
      // Tighter to the scalp, but still covers the crown.
      return <path d="M56 114 C54 72 92 58 120 58 C148 58 186 72 184 114 C172 100 150 92 120 92 C90 92 68 100 56 114 Z" {...common} />
    case 'short':
      return <path d={CAP} {...common} />
    case 'swoosh':
      return (
        <g>
          <path d={CAP} {...common} />
          <path d="M120 94 C152 86 184 92 188 112 C150 90 120 108 90 104 C102 96 110 95 120 94 Z" fill={d} />
        </g>
      )
    case 'bob':
      return <path d={CAP} {...common} />
    case 'ponytail':
      return <path d={CAP} {...common} />
    case 'curly':
      return (
        <g {...common}>
          <circle cx="70" cy="90" r="24" /><circle cx="96" cy="70" r="26" />
          <circle cx="120" cy="62" r="26" /><circle cx="144" cy="70" r="26" />
          <circle cx="170" cy="90" r="24" /><circle cx="58" cy="106" r="18" />
          <circle cx="182" cy="106" r="18" />
          <circle cx="120" cy="96" r="26" />
        </g>
      )
    case 'afro':
      return <path d="M50 118 C44 50 196 50 190 118 C178 96 150 88 120 88 C90 88 62 96 50 118 Z" {...common} />
    case 'bun':
      return (
        <g>
          <circle cx="120" cy="44" r="18" {...common} />
          <path d={CAP} {...common} />
        </g>
      )
    case 'long':
      return <path d={CAP} {...common} />
    case 'spiky':
      return (
        <g {...common}>
          <path d={CAP} />
          <path d="M62 58 L78 28 L94 56 L108 24 L122 56 L136 24 L150 56 L166 28 L180 58 Z" />
        </g>
      )
    default:
      return <path d={CAP} {...common} />
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
    <g stroke={OUTLINE} strokeWidth="1.5">
      <circle cx="61" cy="135" r="5" fill="#ffd23f" />
      <circle cx="179" cy="135" r="5" fill="#ffd23f" />
      <circle cx="61" cy="134" r="2" fill="#fff7cf" stroke="none" />
      <circle cx="179" cy="134" r="2" fill="#fff7cf" stroke="none" />
    </g>
  )
}

function Accessory({ style }) {
  if (style !== 'bow') return null
  const px = 150
  const py = 74
  return (
    <g stroke={OUTLINE} strokeWidth="2">
      <path d={`M${px} ${py} L${px - 18} ${py - 12} L${px - 18} ${py + 12} Z`} fill="#ff86d0" />
      <path d={`M${px} ${py} L${px + 18} ${py - 12} L${px + 18} ${py + 12} Z`} fill="#ff86d0" />
      <circle cx={px} cy={py} r="6" fill="#ff5fbf" />
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
    case 'headband':
      return (
        <g stroke={OUTLINE} strokeWidth="2">
          <path d="M56 100 C60 76 180 76 184 100 C184 90 176 88 120 88 C64 88 56 90 56 100 Z" fill="#3fd6a8" />
          <circle cx="120" cy="83" r="6" fill="#28b48a" />
        </g>
      )
    case 'cap':
      return (
        <g stroke={OUTLINE} strokeWidth="2">
          <path d="M62 90 C62 48 178 48 178 90 C150 80 90 80 62 90 Z" fill="#ff4b4b" />
          <path d="M60 90 C34 88 26 100 32 106 C72 96 112 96 126 92 L126 84 Z" fill="#e23a3a" />
          <circle cx="120" cy="50" r="5" fill="#e23a3a" />
        </g>
      )
    case 'beanie':
      return (
        <g stroke={OUTLINE} strokeWidth="2">
          <path d="M60 88 C60 46 180 46 180 88 Z" fill="#1cb0f6" />
          <path d="M56 82 C80 92 160 92 184 82 L184 86 C160 102 80 102 56 86 Z" fill="#1899d6" />
          <circle cx="120" cy="42" r="8" fill="#e8f4ff" />
        </g>
      )
    case 'party':
      return (
        <g stroke={OUTLINE} strokeWidth="2">
          <path d="M120 14 L152 90 L88 90 Z" fill="#ce82ff" />
          <circle cx="120" cy="14" r="7" fill="#ffc800" />
          <circle cx="108" cy="62" r="4" fill="#fff" /><circle cx="134" cy="52" r="4" fill="#fff" />
        </g>
      )
    case 'wizard':
      return (
        <g stroke={OUTLINE} strokeWidth="2">
          <path d="M120 6 C108 40 96 80 88 92 L152 92 C144 80 132 40 120 6 Z" fill="#6b4fbb" />
          <path d="M66 92 L174 92 L174 102 L66 102 Z" fill="#5a3fa0" />
          <path d="M118 38 l4 8 8 2 -8 4 -2 8 -4 -8 -8 -2 8 -4 Z" fill="#ffd23f" />
        </g>
      )
    case 'flowers':
      return (
        <g stroke={OUTLINE} strokeWidth="1.5">
          {[60, 88, 120, 152, 180].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy={82 - (i % 2) * 6} r="10" fill={['#ff86d0', '#ffc800', '#ff7a7a', '#ce82ff', '#58cc02'][i]} />
              <circle cx={x} cy={82 - (i % 2) * 6} r="3.5" fill="#fff" />
            </g>
          ))}
        </g>
      )
    case 'crown':
      return (
        <g stroke={OUTLINE} strokeWidth="2">
          <path d="M68 90 L68 54 L92 72 L120 46 L148 72 L172 54 L172 90 Z" fill="#ffc800" />
          <circle cx="120" cy="60" r="5" fill="#ff4b4b" />
          <circle cx="86" cy="68" r="4" fill="#1cb0f6" /><circle cx="154" cy="68" r="4" fill="#1cb0f6" />
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

      {/* head */}
      <ellipse cx="120" cy="116" rx="64" ry="66" fill={skin} stroke={OUTLINE} strokeWidth="2" />

      {/* cheeks */}
      {config.cheeks !== false && (
        <g>
          <circle cx="82" cy="138" r="9" fill="#ff9aa2" opacity="0.5" />
          <circle cx="158" cy="138" r="9" fill="#ff9aa2" opacity="0.5" />
        </g>
      )}

      {/* face */}
      <Eyes style={config.eyes || 'happy'} />
      <path d="M118 130 Q120 138 124 134" fill="none" stroke={shade(skin, 0.22)} strokeWidth="3" strokeLinecap="round" />
      <Mouth style={config.mouth || 'smile'} />
      <Glasses style={config.glasses} />

      {/* earrings sit on the lobes, on top of the head */}
      <Earrings style={config.earrings} />

      {/* hair in front + bow + hat on top */}
      <HairFront style={hairStyle} c={hair} />
      <Accessory style={config.accessory} />
      <Hat style={config.hat} />

      {/* necklace sits over the shirt */}
      <Necklace style={config.necklace} />
    </svg>
  )
}
