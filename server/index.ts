import express from 'express';
import cors from 'cors';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { initDatabase } from './db.js';

import restaurantRouter from './routes/restaurant.js';
import hoursRouter from './routes/hours.js';
import menuRouter from './routes/menu.js';
import galleryRouter from './routes/gallery.js';
import enquiriesRouter from './routes/enquiries.js';
import statsRouter from './routes/stats.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize SQLite database
initDatabase();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/restaurant', restaurantRouter);
app.use('/api/hours', hoursRouter);
app.use('/api/menu', menuRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/enquiries', enquiriesRouter);
app.use('/api/stats', statsRouter);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    restaurant: 'Valarmathi Mess',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Production: Serve built frontend from client/dist if present
const clientDistPath = path.resolve(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  console.log(`Serving client production build from ${clientDistPath}`);
  app.use(express.static(clientDistPath));
  app.use((_req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🍛 Valarmathi Mess Server running at http://localhost:${PORT}`);
  console.log(`   API Base: http://localhost:${PORT}/api`);
  console.log(`   SQLite DB: valarmathi.db (local)`);
  console.log(`==================================================\n`);
});
