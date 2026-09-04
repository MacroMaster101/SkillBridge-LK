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
          DEFAULT: '#F5F5F0',
          light: '#FDF0E0',
          2: '#e3e7dd',
        },
        card: '#fbfcf9',
        'chip-lavender': '#cfd0ee',
        'chip-peach': '#f4cfb5',
        'chip-lime': '#d8e5a8',
        'chip-blue': '#bfd7e8',
        'chip-pink': '#f0cdd4',
        'chip-sand': '#e4dcc4',
      },
      fontFamily: {
        display: ["'Bricolage Grotesque'", "'Segoe UI'", 'system-ui', 'sans-serif'],
        body: ["'Instrument Sans'", "'Segoe UI'", 'system-ui', 'sans-serif'],
        mono: ["'Martian Mono'", 'ui-monospace', "'Cascadia Mono'", 'monospace'],
      },
      backgroundColor: {
        page: '#F5F5F0',
        button: '#FDF0E0',
      },
    },
  },
  plugins: [],
};
