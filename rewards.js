@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: light;
}

html,
body,
#root {
  height: 100%;
}

body {
  margin: 0;
  font-family: 'Nunito', system-ui, sans-serif;
  color: #3c3a36;
  -webkit-tap-highlight-color: transparent;
  background-color: #d9f2ff;
  background-image:
    radial-gradient(circle at 18% 12%, rgba(255, 255, 255, 0.85) 0 4px, transparent 5px),
    radial-gradient(circle at 80% 22%, rgba(255, 255, 255, 0.7) 0 6px, transparent 7px),
    radial-gradient(circle at 65% 70%, rgba(255, 255, 255, 0.6) 0 5px, transparent 6px),
    radial-gradient(circle at 30% 85%, rgba(255, 255, 255, 0.7) 0 4px, transparent 5px),
    linear-gradient(180deg, #bfe9ff 0%, #d9f2ff 40%, #eafff0 100%);
  background-attachment: fixed;
}

@layer components {
  .font-display {
    font-family: 'Baloo 2', system-ui, sans-serif;
  }

  /* Chunky Duolingo-style button: solid colour with a darker bottom edge that
     presses down when tapped. Colour is set per-button via the --b vars. */
  .btn3d {
    @apply font-display font-extrabold rounded-2xl px-5 py-3 text-white select-none;
    background: var(--bg, #58cc02);
    box-shadow: 0 5px 0 var(--edge, #46a302);
    transition: transform 0.06s ease, box-shadow 0.06s ease, filter 0.15s ease;
    border: none;
    cursor: pointer;
  }
  .btn3d:active {
    transform: translateY(4px);
    box-shadow: 0 1px 0 var(--edge, #46a302);
  }
  .btn3d:disabled {
    filter: grayscale(0.5) opacity(0.55);
    cursor: not-allowed;
  }

  .btn-ghost {
    @apply font-display font-bold rounded-2xl px-5 py-3 select-none bg-white text-ink;
    box-shadow: 0 4px 0 rgba(0, 0, 0, 0.12);
    border: 2px solid rgba(0, 0, 0, 0.06);
    transition: transform 0.06s ease, box-shadow 0.06s ease;
    cursor: pointer;
  }
  .btn-ghost:active {
    transform: translateY(3px);
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.12);
  }

  .card {
    @apply bg-white rounded-3xl;
    box-shadow: 0 8px 0 rgba(0, 0, 0, 0.06), 0 14px 30px rgba(0, 0, 0, 0.08);
    border: 3px solid #fff;
  }

  .chip {
    @apply rounded-2xl px-3 py-2 font-display font-bold text-sm select-none cursor-pointer transition;
    border: 3px solid rgba(0, 0, 0, 0.06);
    background: #fff;
  }
  .chip-on {
    border-color: #1cb0f6;
    box-shadow: 0 0 0 3px rgba(28, 176, 246, 0.25);
  }
}

.animate-pop {
  animation: pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}
.animate-floaty {
  animation: floaty 3s ease-in-out infinite;
}

/* Confetti */
.confetti-piece {
  position: absolute;
  width: 10px;
  height: 14px;
  border-radius: 2px;
  top: -20px;
  animation: confettiFall linear forwards;
}

/* hide number input spinners */
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
