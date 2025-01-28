import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';

export default defineConfig({
  plugins: [
    react(),
    commonjs(), // Handles CommonJS modules
  ],
  optimizeDeps: {
    include: ['react-quilljs', 'quill'], // Pre-bundle these dependencies
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/], // Include all node_modules for CommonJS transformation
      transformMixedEsModules: true, // Ensure mixed ESM/CommonJS modules are properly handled
    },
  },
  resolve: {
    alias: {
      quill: 'quill/dist/quill.min.js', // Ensure Vite uses the ESM version of Quill
    },
  },
});
