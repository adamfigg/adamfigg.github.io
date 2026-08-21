import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ---------------------------------------------------------------------------
// `base` must match the path your site is served from.
//
//   Repo named  adamfiggat.github.io   ->  served at  https://adamfiggat.github.io/
//                                          base = '/'            (current setting)
//
//   Repo named  portfolio              ->  served at  https://adamfiggat.github.io/portfolio/
//                                          base = '/portfolio/'
//
// If you use a project repo, change base below to '/<your-repo-name>/'.
// Nothing else needs to change: all /public asset paths run through the
// asset() helper in src/lib/asset.js, which applies this base automatically.
// ---------------------------------------------------------------------------
export default defineConfig({
  base: '/',
  plugins: [react()],
})
