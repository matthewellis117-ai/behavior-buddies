# Behaviour Buddies

A cartoon kids behaviour-tracking web app, in the spirit of Thumbsters. Parents give
happy or sad faces tagged with a reason, points convert to coins at the end of each
week, and a weekly shop opens so children can spend coins on treats and avatar items.

Everything runs in the browser. There is no account, no server and no database. All
data is stored locally on the device using `localStorage`, so it works offline once
loaded and costs nothing to host.

## What it does

- Set up one buddy per child with a name and a Duolingo-style avatar (one base model,
  swap skin, hair, eyes, mouth and shirt).
- Give a happy face (positive points) or sad face (negative points). Every face must
  have a reason chosen from a category list.
- Points convert to coins automatically each Monday for the week just finished. A
  parent can also force a payout from the grown-up area.
- A weekly shop sells real-life treats (cheap to expensive) and avatar accessories
  (hats, glasses, jewellery, fun hair colours).
- A weekly summary per child shows how the week went, happy vs sad counts, coins
  earned and a breakdown by reason. You can step back through previous weeks.
- Optional 4-digit grown-up PIN to stop children awarding their own faces.

## Run locally

You need Node 18 or newer.

```
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173).

## Deploy to Vercel (free)

**Option A: GitHub (recommended)**

1. Create a new repo on GitHub and push this folder to it.
2. Go to vercel.com, sign in, and click **Add New > Project**.
3. Import the repo. Vercel detects Vite automatically:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**. You get a free `*.vercel.app` URL.

**Option B: drag and drop**

1. Run `npm install` then `npm run build` locally.
2. At vercel.com, drag the generated `dist` folder onto the dashboard.

The included `vercel.json` rewrites all routes to `index.html` so a page refresh never
returns a 404.

## Notes

- Data lives on the single device and browser it was created in. Clearing browser data
  or using a different device starts fresh. This keeps it free and private with no
  sign-in.
- To reset everything, use **Reset all** in the grown-up area.

## Stack

Vite, React 18, Tailwind CSS. Avatars are hand-built inline SVG, so they scale cleanly
and need no image files.
