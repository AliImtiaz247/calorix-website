import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Keep large runtime dependencies out of the application entry chunk.
// Vite 8 uses Rolldown for production builds, so codeSplitting is configured
// through build.rolldownOptions rather than the deprecated Rollup manualChunks API.
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'three-vendor',
              test: /node_modules[\\/](@react-three|three)[\\/]/,
              priority: 30,
            },
            {
              name: 'motion-vendor',
              test: /node_modules[\\/]framer-motion[\\/]/,
              priority: 20,
            },
            {
              name: 'react-vendor',
              test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 15,
            },
            {
              name: 'vendor',
              test: /node_modules[\\/]/,
              priority: 5,
              minSize: 20000,
            },
          ],
        },
      },
    },
  },
})
