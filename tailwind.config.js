module.exports = {
  purge: [
    './components/**/*.{vue,js,jsx,tsx}',
    './layouts/**/*.{vue,js,jsx,tsx}',
    './pages/**/*.{vue,js,jsx,tsx}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
