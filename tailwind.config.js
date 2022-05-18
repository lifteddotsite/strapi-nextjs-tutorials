module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        liftedgreen: {
          50: '#acd8cc',
          100: '#98cec0',
          200: '#83c4b3',
          300: '#6ebaa6',
          400: '#59b199',
          500: '#45a78d',
          600: '#309d80',
          700: '#2b8d73',
          800: '#267e66',
          900: '#226e5a',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
