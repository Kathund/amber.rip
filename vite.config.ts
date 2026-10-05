import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { cloudflare } from '@cloudflare/vite-plugin';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  preview: { allowedHosts: ['.trycloudflare.com'] },
  plugins: [react(), tailwindcss(), cloudflare()],
  server: { host: true, port: 44461 }
});
