import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    // The SSR pass writes to dist-ssr; keep it from wiping the client build.
    emptyOutDir: !isSsrBuild,
  },
  ssr: {
    // These only run during the prerender pass in Node.
    noExternal: ['react-router', 'react-router-dom'],
  },
}))
