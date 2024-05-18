/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "base": "#000814",
        "primary": {
          400: "#001D3D",
          200: "#003566"
        },
        "secondary": {
          400: "#FFC300",
          200: "#FFD60A"
        },
        "unselect-gray": "#515151",
      },
      fontFamily: {
        default: ['Inter', 'sans-serif'],
        'title': ['Montserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}

