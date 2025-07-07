import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  build: {
    // Ensure the output directory is 'dist' (default for Vite)
    outDir: 'dist',
    // Set the base public path for the assets.
    // This is CRUCIAL for deployment when serving from the root of a web server.
    // If your app is served from a subdirectory (e.g., example.com/my-app/),
    // you would set this to '/my-app/'. For root, it's '/'.
    base: '/',
  },
  server: {
    // Proxy API requests during local development (only applies locally, not on Render)
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Your local Django backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Keep /api prefix
      },
      '/ws': { // For WebSocket connections (Django Channels)
        target: 'ws://localhost:8000', // Your local Django backend WebSocket port
        ws: true,
        changeOrigin: true,
      },
    },
  },
});
