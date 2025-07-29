/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'calm-blue': '#E3F2FD',
        'soft-purple': '#F3E5F5',
        'gentle-green': '#E8F5E8',
        'warm-orange': '#FFF3E0',
        'muted-gray': '#F5F5F5',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 