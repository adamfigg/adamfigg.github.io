/**
 * Prefixes a path from /public with Vite's configured `base`.
 *
 * Vite rewrites asset URLs it can see (imports, index.html), but it cannot
 * rewrite plain strings like '/projects/screen.webp' that live in our data
 * file. Without this helper, every image and the resume PDF would 404 as soon
 * as the site is served from a subpath, which is exactly what GitHub Pages
 * does for a project repo (username.github.io/repo-name/).
 *
 * Absolute URLs and data URIs are passed through untouched.
 */
export default function asset(path) {
  if (!path) return path
  if (/^(https?:)?\/\//i.test(path) || path.startsWith('data:') || path.startsWith('mailto:')) {
    return path
  }
  const base = import.meta.env.BASE_URL || '/'
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}
