import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174, // Para no conflictuar con el frontend principal (5173)
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
