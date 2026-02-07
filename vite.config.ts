import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // This MUST match your repo name exactly
  base: '/coski/', 
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
