import { Router, Request, Response } from 'express';
import { db } from '../db.js';

const router = Router();

// GET /api/hours
router.get('/', (_req: Request, res: Response) => {
  try {
    const rows = db.prepare('SELECT * FROM opening_hours ORDER BY day_of_week ASC').all();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching opening hours:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/hours/:id
router.put('/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { lunch_open, lunch_close, dinner_open, dinner_close, is_closed, notes } = req.body;

    const stmt = db.prepare(`
      UPDATE opening_hours
      SET lunch_open = ?, lunch_close = ?, dinner_open = ?, dinner_close = ?,
          is_closed = ?, notes = ?
      WHERE id = ?
    `);

    stmt.run(lunch_open, lunch_close, dinner_open, dinner_close, is_closed ? 1 : 0, notes || null, id);

    const updated = db.prepare('SELECT * FROM opening_hours WHERE id = ?').get(id);
    if (!updated) {
      return res.status(404).json({ error: 'Opening hour entry not found' });
    }
    res.json(updated);
  } catch (error) {
    console.error('Error updating opening hour:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
