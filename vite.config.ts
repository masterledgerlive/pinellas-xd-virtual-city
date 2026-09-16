import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'

function copyMaplibreWorkers(): Plugin {
  const copy = () => {
    const srcDir = path.resolve(import.meta.dirname, 'node_modules/maplibre-gl/dist')
    const destDir = path.resolve(import.meta.dirname, 'public/maplibre')
    fs.mkdirSync(destDir, { recursive: true })
    for (const file of ['maplibre-gl-worker.mjs', 'maplibre-gl-shared.mjs']) {
      fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file))
    }
  }
  return {
    name: 'copy-maplibre-workers',
    buildStart: copy,
    configureServer: copy,
  }
}

export default defineConfig({
  plugins: [copyMaplibreWorkers(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['maplibre-gl'],
  },
  server: {
    host: '0.0.0.0',
    port: 4321,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: 4321,
    strictPort: true,
  },
})
