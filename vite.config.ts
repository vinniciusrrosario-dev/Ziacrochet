import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // ⭐️ LINHA CRUCIAL ADICIONADA:
  base: "/ziacrochet/",
  
  plugins: [react()],
  
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});