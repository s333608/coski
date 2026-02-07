import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This tells Vite where your site is hosted on GitHub Pages
  base: '/YOUR_REPO_NAME/', 
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
