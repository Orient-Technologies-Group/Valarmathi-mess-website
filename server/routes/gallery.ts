import { Router, Request, Response } from 'express';
import { db } from '../db.js';

const router = Router();

// GET /api/gallery
router.get('/', (_req: Request, res: Response) => {
  try {
    const items = db.prepare(`
      SELECT * FROM gallery_items
      ORDER BY display_order ASC, id ASC
    `).all();
    res.json(items);
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/gallery
router.post('/', (req: Request, res: Response) => {
  try {
    const { title, tamil_title, description, category, image_url, is_featured, display_order } = req.body;
    if (!title || !image_url) {
      return res.status(400).json({ error: 'Title and image_url are required' });
    }

    const stmt = db.prepare(`
      INSERT INTO gallery_items (title, tamil_title, description, category, image_url, is_featured, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      title,
      tamil_title || null,
      description || null,
      category || 'Food',
      image_url,
      is_featured ? 1 : 0,
      display_order || 0
    );

    const created = db.prepare('SELECT * FROM gallery_items WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(created);
  } catch (error) {
    console.error('Error creating gallery item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/gallery/:id
router.put('/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, tamil_title, description, category, image_url, is_featured, display_order } = req.body;

    const stmt = db.prepare(`
      UPDATE gallery_items
      SET title = ?, tamil_title = ?, description = ?, category = ?,
          image_url = ?, is_featured = ?, display_order = ?
      WHERE id = ?
    `);

    stmt.run(
      title,
      tamil_title || null,
      description || null,
      category || 'Food',
      image_url,
      is_featured ? 1 : 0,
      display_order || 0,
      id
    );

    const updated = db.prepare('SELECT * FROM gallery_items WHERE id = ?').get(id);
    if (!updated) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }
    res.json(updated);
  } catch (error) {
    console.error('Error updating gallery item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /api/gallery/:id/featured
router.patch('/:id/featured', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { is_featured } = req.body;

    const stmt = db.prepare('UPDATE gallery_items SET is_featured = ? WHERE id = ?');
    stmt.run(is_featured ? 1 : 0, id);

    const updated = db.prepare('SELECT id, is_featured FROM gallery_items WHERE id = ?').get(id);
    res.json(updated);
  } catch (error) {
    console.error('Error updating gallery featured state:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/gallery/:id
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    db.prepare('DELETE FROM gallery_items WHERE id = ?').run(id);
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Error deleting gallery item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
