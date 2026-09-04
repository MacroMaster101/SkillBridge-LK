/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#d7e6e0',
          100: '#c2dcd7',
          500: '#0f6357',
          600: '#0d4f47',
          700: '#0a3a36',
          900: '#052924',
        },
        petrol: {
          light: '#d7e6e0',
          DEFAULT: '#0f6357',
          dark: '#052924',
        },
        marigold: '#e9a227',
        madder: '#c2462c',
        ink: {
          DEFAULT: '#14202e',
          2: '#1e2e42',
          soft: '#5a6b80',
        },
        paper: {
          DEFAULT: '#edefe8',
          2: '#e3e7dd',
        },
      },
      fontFamily: {
        display: ["'Bricolage Grotesque'", "'Segoe UI'", 'system-ui', 'sans-serif'],
        body: ["'Instrument Sans'", "'Segoe UI'", 'system-ui', 'sans-serif'],
        mono: ["'Martian Mono'", 'ui-monospace', "'Cascadia Mono'", 'monospace'],
      },
    },
  },
  plugins: [],
};
