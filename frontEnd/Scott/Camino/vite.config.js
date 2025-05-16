import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // ← 這才是正確的後端 port
        changeOrigin: true,
        secure: false,
      },
    },
  },
})