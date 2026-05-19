# anjali-aditya

A cinematic love-letter web experience built with React, TypeScript, Vite, Framer Motion, and Howler.js.

## Local development

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

**Requires Node.js 20+** (Vite 8).

## Build

```bash
npm run build
npm run preview
```

## Deploy on Render

1. Push this repo to GitHub.
2. In [Render](https://render.com), create a **Static Site**.
3. Connect the `Aarth-Web/anjali-aditya` repository.
4. Use these settings (or import `render.yaml`):

| Setting | Value |
|--------|--------|
| **Build Command** | `npm ci && npm run build` |
| **Publish Directory** | `dist` |
| **Node Version** | `20` |

5. Deploy. Render will serve the built files from `dist`.

## Assets

Replace placeholder images under `src/assets/chapter1/`, `chapter2/`, and `chapter3/`, and add your sound files under `src/assets/sounds/` (`warning.mp3`, `typing.mp3`, `chapter2.mp3`).
