import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@context': path.resolve(__dirname, './src/context'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion', '@lottiefiles/dotlottie-react'],
        },
      },
    },
  },

  // ===== Tambahan untuk produksi via Vite preview =====
  preview: {
    host: true,                        // bind 0.0.0.0 agar bisa diakses dari luar container
    port: 1281,                        // konsisten dengan Docker/Caddy
    allowedHosts: ['ruangtamu.putuwistika.com'], // izinkan host dari reverse proxy
    strictPort: true,                  // jangan pindah ke port lain kalau 1281 dipakai
  },
})
