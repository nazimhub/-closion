# Éclosion (Flat — No Folders)

All files at root level. No subdirectories.

## Files

| File | Purpose |
|------|---------|
| `server.js` | Express server (Railway-ready) |
| `package.json` | Dependencies & start script |
| `index.html` | Main SPA |
| `style.css` | All styles |
| `app.js` | All frontend logic |
| `.gitignore` | Ignore node_modules |

## Deploy to Railway

1. Upload all 6 files to your GitHub repo root
2. Railway detects Node.js automatically
3. Runs `npm start` → `node server.js`
4. Health check: `/health`

## Local dev

```bash
npm install
npm run dev
```

Open http://localhost:3000
