import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // React Three Fiber relies on a shared React/fiber context. Explicitly
  // dedupe these packages so production builds cannot load duplicate module
  // instances and trigger "Hooks can only be used within the Canvas" errors.
  resolve: {
    dedupe: [
      'react',
      'react-dom',
      '@react-three/fiber',
      'three',
    ],
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@react-three/fiber',
      '@react-three/drei',
      'three',
    ],
  },
})
