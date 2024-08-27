import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.REACT_APP_DB_URL': JSON.stringify(env.REACT_APP_DB_URL)
    },
    plugins: [react()],

    optimizeDeps:{
      include: ['@basicdev04/common-app'],

    }
  }
})