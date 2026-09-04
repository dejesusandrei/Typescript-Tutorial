import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Lahat ng request na nagsisimula sa /api ay ie-forward sa backend server
      '/api': {
        target: 'http://localhost:5000', // Palitan ito ayon sa PORT ng iyong backend server
        changeOrigin: true,
      },
    },
  }
})
