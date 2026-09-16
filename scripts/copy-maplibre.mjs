import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const srcDir = path.join(root, 'node_modules/maplibre-gl/dist')
const destDir = path.join(root, 'public/maplibre')

fs.mkdirSync(destDir, { recursive: true })
for (const file of ['maplibre-gl-worker.mjs', 'maplibre-gl-shared.mjs']) {
  fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file))
}
