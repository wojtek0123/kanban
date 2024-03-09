/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'darker-gray': '#101213',
        'dark-gray': '#1d1f20',
        'light-gray': '#aaa',
        primary: '#e8fe93',
      },
    },
  },
  plugins: [],
};
