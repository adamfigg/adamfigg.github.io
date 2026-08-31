# Adam Figgat, Portfolio

A single-page portfolio site built with **React + Vite + Tailwind CSS**.

---

## Running it locally

```bash
npm install
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

```bash
npm run build     # production build into dist/
npm run preview   # preview that production build locally
```

---

## Editing the content

**Almost everything you would want to change lives in one file: `src/data/content.js`.**

| What you want to change | Where |
| --- | --- |
| Name, title, tagline, email, LinkedIn, GitHub, location | `profile` |
| The three stats under the hero | `stats` |
| The "about me" paragraphs | `profile.summary` |
| Skill groups and tags | `skills` |
| Job history timeline | `experience` |
| The full-width project blocks | `featuredProjects` |
| Optional small project cards (currently empty) | `projects` |
| Degrees and bootcamp | `education` |
| Nav menu items | `navLinks` |

### The featured projects

`featuredProjects` is an array. Each entry renders its own full-width block in the
Projects section, in order: a write-up, a "What I owned" list, a tech stack, and a
screenshot gallery. Selecting any screenshot opens a full-screen viewer, where the
arrow keys navigate and `Esc` closes.

Add or swap screenshots by dropping files in `public/projects/` and listing them:

```js
gallery: [
  { src: '/projects/my-screen.webp', alt: 'Short description for screen readers.', caption: 'Caption shown under the image.' },
  { src: '/projects/tall-screen.webp', alt: '...', caption: '...', fit: 'contain' },
],
galleryNote: 'Optional fine print under the screenshots.',
```

Tiles are a 16:10 frame. Wide screenshots fill it. Add `fit: 'contain'` to any image
whose shape is far off that, such as a tall mobile screenshot, so it gets letterboxed
instead of cropped.

Reorder the array to reorder the blocks. Set it to `[]` to hide them entirely.

Screenshots are `.webp` at up to 1440px wide, which keeps them sharp on retina
displays while staying well under 100 KB each.

### The small project cards

`projects` is empty on purpose, so the card grid and its heading are hidden. If you
ever want a row of smaller projects below the featured blocks, add entries in the
shape shown in the comment above that array. The `live` and `repo` links hide
themselves when left as empty strings, and a card with no `image` gets a generated
gradient placeholder rather than a broken frame.

### Adding your GitHub

Set `profile.github` to your profile URL. The GitHub icon and button then appear
automatically in the hero and the contact section. Leave it as `''` and they stay
hidden.

### Swapping the resume

Replace `public/Adam_Figgat_Software_Engineer_8.31.pdf` with an updated file of the
same name, or point `profile.resume` at the new filename.

### Changing the accent color

`tailwind.config.js`, under `theme.extend.colors.accent`. The default is teal
(`#5eead4`). Change those three values and the whole site follows.

---

## Deploying to GitHub Pages

This repo ships with a GitHub Actions workflow at `.github/workflows/deploy.yml`.
Push to `main` and it builds and publishes the site. There is no manual deploy step.

### One-time setup

1. Create a GitHub repo. **Name it `<your-username>.github.io`** to get the site at
   `https://<your-username>.github.io/`. Any other name puts it at
   `https://<your-username>.github.io/<repo-name>/`, which also works: set `base` in
   `vite.config.js` to `'/<repo-name>/'`.

2. Push this folder:

   ```bash
   git init -b main
   git add .
   git commit -m "Initial commit: portfolio site"
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

3. On GitHub, go to **Settings > Pages**. Under **Build and deployment**, set
   **Source** to **GitHub Actions**. There is nothing to pick after that.

4. Open the **Actions** tab. The first run starts on its own and takes a minute or
   two. When it goes green, the site is live.

From then on, every push to `main` redeploys automatically.

### About paths and `base`

All `/public` asset paths (screenshots, the resume PDF) run through the helper in
`src/lib/asset.js`, which prefixes them with Vite's `base`. Changing `base` in
`vite.config.js` is therefore the only edit needed to move the site between a root
URL and a subpath. Nothing in `content.js` has to change.

### Custom domain

Buy a domain, then under **Settings > Pages > Custom domain** enter it and follow the
DNS records GitHub shows you. Add a `public/CNAME` file containing just the domain so
the setting survives redeploys, and set `base` back to `'/'`.

### Other hosts

The build output is a plain static `dist/` folder, so Vercel, Netlify, and Cloudflare
Pages all work with no config. Import the repo, and if the host asks, the build
command is `npm run build` and the output directory is `dist`.

---

## Project structure

```
.github/workflows/
  deploy.yml         builds and publishes to GitHub Pages on every push to main
src/
  components/        Nav, Hero, About, Skills, Experience, Projects,
                     FeaturedProject, Contact, Footer, Icons, Section
  data/
    content.js       all site content
  hooks/
    useReveal.js     scroll-into-view animations
  lib/
    asset.js         applies Vite's base path to /public assets
  index.css          Tailwind layers plus a few custom classes
  App.jsx            section order
public/
  Adam_Figgat_Software_Engineer_8.31.pdf
  favicon.svg
  projects/          screenshot gallery images
```
