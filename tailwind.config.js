/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        circle: 'circle-animation 4s linear infinite',
        "dot-flash": 'dot-flash 3s steps(3, end) infinite',
      },
      keyframes: {
        'circle-animation': {
          '0%': {
            transform: 'translate(-50%, -50%) rotate(0deg) translate(40px) rotate(0deg)',
          },
          '100%': {
            transform: 'translate(-50%, -50%) rotate(360deg) translate(40px) rotate(-360deg)',
          },
        },
        'dot-flash': {
          '0%, 100%': { content: "''" },
          '33%': { content: "'.'" },
          '66%': { content: "'..'" },
          '99%': { content: "'...'" },
        },
      },
    },
    fontFamily: {
      mono: 'monospace',
      segoe:'segoe UI'
    },
  },
  plugins: [],
}

