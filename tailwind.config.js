/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Baloo 2"', 'system-ui', 'sans-serif'],
        body: ['Nunito', 'system-ui', 'sans-serif'],
      },
      colors: {
        grass: '#58cc02',
        grassDark: '#46a302',
        sky: '#1cb0f6',
        skyDark: '#1899d6',
        sunny: '#ffc800',
        sunnyDark: '#e6a900',
        bubblegum: '#ff86d0',
        coral: '#ff4b4b',
        coralDark: '#e23a3a',
        grape: '#ce82ff',
        cream: '#fff7e6',
        ink: '#3c3a36',
      },
      boxShadow: {
        chunk: '0 4px 0 rgba(0,0,0,0.18)',
        chunklg: '0 6px 0 rgba(0,0,0,0.18)',
      },
      keyframes: {
        pop: { '0%': { transform: 'scale(0.6)', opacity: '0' }, '70%': { transform: 'scale(1.08)' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        wiggle: { '0%,100%': { transform: 'rotate(-3deg)' }, '50%': { transform: 'rotate(3deg)' } },
        coinspin: { '0%': { transform: 'rotateY(0)' }, '100%': { transform: 'rotateY(360deg)' } },
        confettiFall: { '0%': { transform: 'translateY(-20px) rotate(0)', opacity: '1' }, '100%': { transform: 'translateY(420px) rotate(540deg)', opacity: '0' } },
      },
      animation: {
        pop: 'pop 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
        floaty: 'floaty 3s ease-in-out infinite',
        wiggle: 'wiggle 0.4s ease-in-out',
        coinspin: 'coinspin 1.2s linear infinite',
      },
    },
  },
  plugins: [],
}
