/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'mtn-yellow': '#FFCB05',
        'mtn-black': '#000000',
        'bg': '#F7F7F7',
        'card': '#FFFFFF',
        'text-primary': '#1A1A1A',
        'text-secondary': '#666666',
        'border': '#E5E5E5',
        'success': '#00A86B',
        'warning': '#FF6B35',
        'error': '#E74C3C',
      }
    },
  },
  plugins: [],
}