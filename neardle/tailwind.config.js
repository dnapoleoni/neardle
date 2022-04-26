module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      'fancy': ['Niramit', 'Helvetica', 'Arial', 'sans-serif']
    }
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}