import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    VITE_NAME: process.env.VITE_NAME,
    VITE_API_KEY: process.env.VITE_API_KEY,
    VITE_API_URL: process.env.VITE_API_URL,
    VITE_IMAGE_URL: process.env.VITE_IMAGE_URL,
  }
})
