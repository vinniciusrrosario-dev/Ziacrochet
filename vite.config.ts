// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Adicione esta linha no projeto correto
  base: "/ziacrochet/",
  
  plugins: [react()],
  
  // ... (o resto do seu arquivo)
});