const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from root (no subfolders)
app.use(express.static(__dirname));

// Health check for Railway
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'eclosion' });
});

// SPA fallback: serve index.html for any non-file route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Éclosion server running on port ${PORT}`);
});
