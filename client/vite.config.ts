import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  optimizeDeps: {
    exclude: ['quill'], // Ensure these libraries are optimized by Vite
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules:true// Include react-quilljs in the commonjs handling
    },
  },
})
