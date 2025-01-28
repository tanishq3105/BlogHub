import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from 'vite-plugin-commonjs'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    commonjs(), // Ensures CommonJS compatibility
  ],
  optimizeDeps: {
    include: ['react-quilljs', 'quill'], // Pre-bundle these dependencies
    exclude: ['@types/react'], // Ensure no conflicts
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/], // Includes all node_modules in CommonJS handling
      transformMixedEsModules: true, // Enables proper handling of mixed ESM and CommonJS modules
    },
  },
  resolve: {
    alias: {
      // Optional: Alias Quill to ensure it points to the ESM version
      quill: 'quill/dist/quill.js',
    },
  },
})
