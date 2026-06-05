// THE SHOP CATALOGUE
// ------------------
// Two kinds of reward:
//   'treat'  = a real-life reward (you grant it in the real world)
//   'avatar' = an item the child equips on their buddy (hats, jewellery, etc.)
//
// Prices are in COINS. Coins are earned from positive points (see economy.js).
// A typical good week nets roughly 15-25 coins, so:
//   - cheap avatar bits are affordable most weeks
//   - small treats take a week
//   - the big stuff needs saving across several weeks
//
// `unlocks` on an avatar item is the key the avatar system understands.
// `field` says which slot it goes in (accessory layer / hairColor / etc).

export const REWARDS = [
  // ---------- AVATAR ITEMS (cheaper) ----------
  { id: 'bow',         name: 'Hair bow',          emoji: '\u{1F380}', type: 'avatar', tier: 'Avatar',  price: 8,  field: 'accessory', unlocks: 'bow',         desc: 'A cute bow for your buddy' },
  { id: 'haircolour',  name: 'New hair colour',   emoji: '\u{1F3A8}', type: 'avatar', tier: 'Avatar',  price: 8,  field: 'hairColorPack', unlocks: 'fun',     desc: 'Unlock pink, blue, mint & purple hair' },
  { id: 'roundglass',  name: 'Round glasses',     emoji: '\u{1F453}', type: 'avatar', tier: 'Avatar',  price: 10, field: 'glasses',   unlocks: 'round',       desc: 'Smart little round specs' },
  { id: 'beanie',      name: 'Cosy beanie',       emoji: '\u{1F9E2}', type: 'avatar', tier: 'Avatar',  price: 10, field: 'hat',       unlocks: 'beanie',      desc: 'A warm woolly hat' },
  { id: 'cap',         name: 'Baseball cap',      emoji: '\u{1F9E2}', type: 'avatar', tier: 'Avatar',  price: 10, field: 'hat',       unlocks: 'cap',         desc: 'Cool cap, worn forwards' },
  { id: 'sunnies',     name: 'Cool sunglasses',   emoji: '\u{1F576}', type: 'avatar', tier: 'Avatar',  price: 12, field: 'glasses',   unlocks: 'sunnies',     desc: 'Look extra cool in the sun' },
  { id: 'partyhat',    name: 'Party hat',         emoji: '\u{1F389}', type: 'avatar', tier: 'Avatar',  price: 12, field: 'hat',       unlocks: 'party',       desc: 'For a celebration!' },
  { id: 'earrings',    name: 'Sparkle earrings',  emoji: '\u{1F48E}', type: 'avatar', tier: 'Avatar',  price: 12, field: 'earrings',  unlocks: 'studs',       desc: 'Twinkly little earrings' },
  { id: 'necklace',    name: 'Bead necklace',     emoji: '\u{1F4FF}', type: 'avatar', tier: 'Avatar',  price: 14, field: 'necklace',  unlocks: 'beads',       desc: 'A string of pretty beads' },
  { id: 'flowercrown', name: 'Flower crown',      emoji: '\u{1F33C}', type: 'avatar', tier: 'Avatar',  price: 18, field: 'hat',       unlocks: 'flowers',     desc: 'A ring of flowers for your hair' },
  { id: 'wizardhat',   name: 'Wizard hat',        emoji: '\u{1FA84}', type: 'avatar', tier: 'Avatar',  price: 20, field: 'hat',       unlocks: 'wizard',      desc: 'Magical and pointy' },
  { id: 'crown',       name: 'Golden crown',      emoji: '\u{1F451}', type: 'avatar', tier: 'Avatar',  price: 30, field: 'hat',       unlocks: 'crown',       desc: 'Rule the kingdom in style' },
  { id: 'jewelneck',   name: 'Jewelled necklace', emoji: '\u{1F48D}', type: 'avatar', tier: 'Avatar',  price: 35, field: 'necklace',  unlocks: 'jewel',       desc: 'The fanciest necklace going' },
  { id: 'halo',        name: 'Golden halo',       emoji: '\u{1F607}', type: 'avatar', tier: 'Avatar',  price: 40, field: 'hat',       unlocks: 'halo',        desc: 'For a truly angelic week' },

  // ---------- SMALL TREATS ----------
  { id: 'music',       name: 'Pick the car music', emoji: '\u{1F3B5}', type: 'treat', tier: 'Small',   price: 12, desc: 'Choose what we listen to in the car' },
  { id: 'choc',        name: 'Chocolate snack',    emoji: '\u{1F36B}', type: 'treat', tier: 'Small',   price: 15, desc: 'A chocolatey treat after tea' },
  { id: 'film',        name: "Choose tonight's film", emoji: '\u{1F37F}', type: 'treat', tier: 'Small', price: 18, desc: 'You pick the family film' },
  { id: 'icecream',    name: 'Ice cream for pudding', emoji: '\u{1F368}', type: 'treat', tier: 'Small', price: 20, desc: 'Ice cream for dessert tonight' },
  { id: 'screen',      name: '15 mins extra screen', emoji: '\u{1F4F1}', type: 'treat', tier: 'Small',  price: 20, desc: 'A bonus 15 minutes of screen time' },

  // ---------- MEDIUM TREATS ----------
  { id: 'boardgame',   name: 'Board game night',   emoji: '\u{1F3B2}', type: 'treat', tier: 'Medium',  price: 25, desc: 'You choose the game for game night' },
  { id: 'bake',        name: 'Bake together',      emoji: '\u{1F9C1}', type: 'treat', tier: 'Medium',  price: 30, desc: 'We bake something yummy together' },
  { id: 'dinner',      name: 'Pick the dinner',    emoji: '\u{1F35D}', type: 'treat', tier: 'Medium',  price: 35, desc: 'Choose what the family has for tea' },
  { id: 'latestay15',  name: 'Stay up 15 mins late', emoji: '\u{1F319}', type: 'treat', tier: 'Medium', price: 40, desc: 'Bedtime pushed back 15 minutes' },
  { id: 'friend',      name: 'Friend over to play', emoji: '\u{1F46B}', type: 'treat', tier: 'Medium',  price: 45, desc: 'Invite a friend round to play' },

  // ---------- BIG TREATS ----------
  { id: 'latestay30',  name: 'Stay up 30 mins late', emoji: '\u{1F31F}', type: 'treat', tier: 'Big',    price: 70, desc: 'A proper late night, 30 minutes extra' },
  { id: 'pocket',      name: 'Pocket money bonus',  emoji: '\u{1F4B0}', type: 'treat', tier: 'Big',     price: 80, desc: 'A little extra pocket money this week' },
  { id: 'cinema',      name: 'Trip to the cinema',  emoji: '\u{1F3AC}', type: 'treat', tier: 'Big',     price: 90, desc: 'A film at the big screen' },
  { id: 'toy',         name: 'Choose a small toy',  emoji: '\u{1F9F8}', type: 'treat', tier: 'Big',     price: 100, desc: 'Pick a small toy (set your own budget)' },
  { id: 'sleepover',   name: 'Sleepover',           emoji: '\u{26FA}', type: 'treat', tier: 'Big',     price: 110, desc: 'Have a friend stay the night' },
  { id: 'dayout',      name: 'Pick a day out',      emoji: '\u{1F3A1}', type: 'treat', tier: 'Big',     price: 120, desc: 'Choose a family day out' },
]

export const TIER_ORDER = ['Avatar', 'Small', 'Medium', 'Big']

export const TIER_META = {
  Avatar: { label: 'Avatar shop',   blurb: 'Dress up your buddy',         colour: 'grape' },
  Small:  { label: 'Little treats', blurb: 'Treat yourself this week',    colour: 'sky' },
  Medium: { label: 'Big treats',    blurb: 'Worth saving a week or two',  colour: 'sunny' },
  Big:    { label: 'Mega treats',   blurb: 'Save up for something epic',  colour: 'coral' },
}

export function rewardById(id) {
  return REWARDS.find((r) => r.id === id)
}
