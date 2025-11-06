import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 5174, // Para no conflictuar con el frontend principal (5173)
    open: true
  },
  build: {
    outDir: 'dist',
    // Solo generar sourcemaps en desarrollo, no en producción (seguridad)
    sourcemap: mode === 'development',

    // Optimizaciones de build
    minify: 'terser', // Minificación con terser (mejor compresión que esbuild)
    terserOptions: {
      compress: {
        drop_console: mode === 'production', // Eliminar console.log en producción
        drop_debugger: true, // Eliminar debugger statements
        pure_funcs: mode === 'production' ? ['console.log', 'console.debug'] : [] // Eliminar funciones específicas
      }
    },

    // Configuración de chunks para mejor caching
    rollupOptions: {
      output: {
        // Separar vendors en chunks individuales para mejor caching
        manualChunks: {
          // React y React DOM en un chunk separado
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],

          // Librerías de formularios
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],

          // Librerías de UI/Toast
          'ui-vendor': ['react-toastify', 'react-hot-toast'],

          // Markdown y sanitización
          'markdown-vendor': ['react-markdown', 'remark-gfm', 'rehype-raw', 'rehype-sanitize'],

          // Otras librerías
          'utils-vendor': ['axios', 'html2canvas', 'jspdf']
        },

        // Nombres de archivos con hash para cache busting
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },

    // Aumentar el límite de advertencia de tamaño de chunk a 1MB
    chunkSizeWarningLimit: 1000,

    // Habilitar compresión CSS
    cssCodeSplit: true,
    cssMinify: true,

    // Configurar target para navegadores modernos
    target: 'es2015',

    // Optimizar assets
    assetsInlineLimit: 4096 // Inline assets menores a 4kb como base64
  },

  // Optimizaciones de dependencias
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
}))
