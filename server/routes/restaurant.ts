import { Router, Request, Response } from 'express';
import { db } from '../db.js';

const router = Router();

// GET /api/restaurant
router.get('/', (_req: Request, res: Response) => {
  try {
    const row = db.prepare('SELECT * FROM restaurant_info LIMIT 1').get();
    if (!row) {
      return res.status(404).json({ error: 'Restaurant info not found' });
    }
    res.json(row);
  } catch (error) {
    console.error('Error fetching restaurant info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/restaurant
router.put('/', (req: Request, res: Response) => {
  try {
    const {
      name,
      tamil_name,
      tagline,
      description,
      address,
      landmark,
      city,
      state,
      postal_code,
      phone,
      email,
      hero_headline,
      hero_subheadline,
      announcement,
      google_maps_url,
    } = req.body;

    const stmt = db.prepare(`
      UPDATE restaurant_info
      SET name = ?, tamil_name = ?, tagline = ?, description = ?, address = ?,
          landmark = ?, city = ?, state = ?, postal_code = ?, phone = ?,
          email = ?, hero_headline = ?, hero_subheadline = ?, announcement = ?,
          google_maps_url = ?
      WHERE id = 1
    `);

    stmt.run(
      name,
      tamil_name,
      tagline,
      description,
      address,
      landmark,
      city,
      state,
      postal_code,
      phone,
      email,
      hero_headline,
      hero_subheadline,
      announcement,
      google_maps_url
    );

    const updated = db.prepare('SELECT * FROM restaurant_info WHERE id = 1').get();
    res.json(updated);
  } catch (error) {
    console.error('Error updating restaurant info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
