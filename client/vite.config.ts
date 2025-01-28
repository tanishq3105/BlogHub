import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from 'vite-plugin-commonjs'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    commonjs() // Added to handle CommonJS modules
  ],
  optimizeDeps: {
    include: ['react-quilljs', 'quill'], // Ensure these libraries are optimized by Vite
  },
  build: {
    commonjsOptions: {
      include: [/react-quilljs/, /node_modules/], // Include react-quilljs in the commonjs handling
    },
  },
})
