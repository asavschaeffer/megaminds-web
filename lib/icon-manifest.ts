import 'server-only'
import fs from 'fs'
import path from 'path'

export type ManifestIcon = {
  slug: string
  parent?: string | null
  variants: Record<string, string>
}

type IconManifest = {
  icons?: ManifestIcon[]
}

let cachedManifest: IconManifest | null = null

export function getIconManifest(): IconManifest {
  if (cachedManifest) {
    return cachedManifest
  }

  const manifestPath = path.join(process.cwd(), 'public', 'icons', 'manifest.json')
  const raw = fs.readFileSync(manifestPath, 'utf8')
  cachedManifest = JSON.parse(raw) as IconManifest
  return cachedManifest
}
