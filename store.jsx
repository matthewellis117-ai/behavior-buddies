// Behaviour categories. Each happy/sad face is tagged with one of these so you
// can see WHY a point was given, and so the weekly summary can break it down.
// Points are intentionally simple: most things are worth 1, the bigger stuff 2.

export const POSITIVE = [
  { id: 'kind',      label: 'Kind & caring',     emoji: '\u{1F970}', points: 2, blurb: 'Looked after someone or did something thoughtful' },
  { id: 'listen',    label: 'Good listening',    emoji: '\u{1F442}', points: 1, blurb: 'Listened and did as asked first time' },
  { id: 'tidy',      label: 'Tidied up',         emoji: '\u{1F9F9}', points: 1, blurb: 'Put toys or things away nicely' },
  { id: 'school',    label: 'Great schoolwork',  emoji: '\u{1F4DA}', points: 2, blurb: 'Tried hard at homework, reading or school' },
  { id: 'helped',    label: 'Helped out',        emoji: '\u{1F91D}', points: 1, blurb: 'Helped with a job around the house' },
  { id: 'manners',   label: 'Lovely manners',    emoji: '\u{1F60A}', points: 1, blurb: 'Said please, thank you, and was polite' },
  { id: 'ready',     label: 'Got ready nicely',  emoji: '\u{1FAA5}', points: 1, blurb: 'Teeth, getting dressed or bedtime with no fuss' },
  { id: 'brave',     label: 'Brave & tried',     emoji: '\u{1F981}', points: 2, blurb: 'Tried something new or had a go at something hard' },
  { id: 'shared',    label: 'Shared nicely',     emoji: '\u{1F9F8}', points: 1, blurb: 'Took turns or shared without being asked' },
  { id: 'calm',      label: 'Stayed calm',       emoji: '\u{1F9D8}', points: 1, blurb: 'Kept calm when things were tricky' },
]

export const NEGATIVE = [
  { id: 'nolisten',  label: "Didn't listen",     emoji: '\u{1F648}', points: -1, blurb: 'Ignored what was asked' },
  { id: 'tantrum',   label: 'Shouting / tantrum',emoji: '\u{1F62D}', points: -2, blurb: 'Big upset, shouting or screaming' },
  { id: 'hurt',      label: 'Hurt someone',      emoji: '\u{1F915}', points: -2, blurb: 'Hit, kicked or hurt another person' },
  { id: 'untidy',    label: "Didn't tidy up",    emoji: '\u{1F4A5}', points: -1, blurb: 'Left a big mess and would not clear it' },
  { id: 'cheeky',    label: 'Cheeky / rude',     emoji: '\u{1F61D}', points: -1, blurb: 'Answered back or was rude' },
  { id: 'noready',   label: "Wouldn't get ready",emoji: '\u{1F634}', points: -1, blurb: 'Refused teeth, dressing or bedtime' },
  { id: 'fib',       label: 'Told a fib',        emoji: '\u{1F92F}', points: -2, blurb: 'Did not tell the truth' },
  { id: 'mean',      label: 'Mean to sibling',   emoji: '\u{1F620}', points: -2, blurb: 'Unkind to a brother or sister' },
]

export const ALL_BEHAVIOURS = [...POSITIVE, ...NEGATIVE]

export function behaviourById(id) {
  return ALL_BEHAVIOURS.find((b) => b.id === id)
}
