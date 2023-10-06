import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite';


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {  
      '/api': {
        target: 'https://mailnest-ts4x.onrender.com/',
        secure: false,
      },
    },
  },

  plugins: [react()],
});
