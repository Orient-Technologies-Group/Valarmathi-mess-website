import { Router, Request, Response } from 'express';
import { db } from '../db.js';

const router = Router();

// ================= CATEGORIES =================

// GET /api/menu/categories
router.get('/categories', (_req: Request, res: Response) => {
  try {
    const categories = db.prepare(`
      SELECT * FROM menu_categories
      ORDER BY display_order ASC, id ASC
    `).all();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/menu/categories
router.post('/categories', (req: Request, res: Response) => {
  try {
    const { name, tamil_name, slug, description, display_order, is_active } = req.body;
    if (!name || !slug) {
      return res.status(400).json({ error: 'Name and slug are required' });
    }

    const stmt = db.prepare(`
      INSERT INTO menu_categories (name, tamil_name, slug, description, display_order, is_active)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      name,
      tamil_name || null,
      slug.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description || null,
      display_order || 0,
      is_active !== undefined ? (is_active ? 1 : 0) : 1
    );

    const created = db.prepare('SELECT * FROM menu_categories WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(created);
  } catch (error: any) {
    console.error('Error creating category:', error);
    if (error.message?.includes('UNIQUE constraint failed')) {
      return res.status(409).json({ error: 'A category with this slug already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/menu/categories/:id
router.put('/categories/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, tamil_name, slug, description, display_order, is_active } = req.body;

    const stmt = db.prepare(`
      UPDATE menu_categories
      SET name = ?, tamil_name = ?, slug = ?, description = ?, display_order = ?, is_active = ?
      WHERE id = ?
    `);

    stmt.run(
      name,
      tamil_name || null,
      slug.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description || null,
      display_order || 0,
      is_active ? 1 : 0,
      id
    );

    const updated = db.prepare('SELECT * FROM menu_categories WHERE id = ?').get(id);
    if (!updated) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(updated);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/menu/categories/:id
router.delete('/categories/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    db.prepare('DELETE FROM menu_categories WHERE id = ?').run(id);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ================= MENU ITEMS =================

// GET /api/menu/items
router.get('/items', (req: Request, res: Response) => {
  try {
    const { category, search, featured, available } = req.query;

    let query = `
      SELECT 
        m.*,
        c.name as category_name,
        c.slug as category_slug
      FROM menu_items m
      JOIN menu_categories c ON m.category_id = c.id
      WHERE 1=1
    `;
    const params: (string | number)[] = [];

    if (category && category !== 'all') {
      query += ' AND (c.slug = ? OR c.id = ?)';
      params.push(String(category), Number(category) || 0);
    }

    if (featured === 'true' || featured === '1') {
      query += ' AND m.is_featured = 1';
    }

    if (available === 'true' || available === '1') {
      query += ' AND m.is_available_today = 1';
    }

    if (search && typeof search === 'string' && search.trim().length > 0) {
      query += ' AND (m.name LIKE ? OR m.tamil_name LIKE ? OR m.description LIKE ?)';
      const term = `%${search.trim()}%`;
      params.push(term, term, term);
    }

    query += ' ORDER BY c.display_order ASC, m.display_order ASC, m.id ASC';

    const items = db.prepare(query).all(...params);
    res.json(items);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/menu/items
router.post('/items', (req: Request, res: Response) => {
  try {
    const {
      category_id,
      name,
      tamil_name,
      description,
      price,
      is_veg,
      is_spicy,
      spice_level,
      is_featured,
      is_available_today,
      display_order,
      image_url,
      portion_detail,
    } = req.body;

    if (!category_id || !name || price === undefined) {
      return res.status(400).json({ error: 'Category ID, name, and price are required' });
    }

    const stmt = db.prepare(`
      INSERT INTO menu_items (
        category_id, name, tamil_name, description, price, is_veg, is_spicy,
        spice_level, is_featured, is_available_today, display_order, image_url, portion_detail
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      category_id,
      name,
      tamil_name || null,
      description || '',
      parseFloat(price),
      is_veg ? 1 : 0,
      is_spicy ? 1 : 0,
      spice_level || 1,
      is_featured ? 1 : 0,
      is_available_today !== undefined ? (is_available_today ? 1 : 0) : 1,
      display_order || 0,
      image_url || null,
      portion_detail || null
    );

    const created = db.prepare(`
      SELECT m.*, c.name as category_name, c.slug as category_slug
      FROM menu_items m
      JOIN menu_categories c ON m.category_id = c.id
      WHERE m.id = ?
    `).get(result.lastInsertRowid);

    res.status(201).json(created);
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/menu/items/:id
router.put('/items/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const {
      category_id,
      name,
      tamil_name,
      description,
      price,
      is_veg,
      is_spicy,
      spice_level,
      is_featured,
      is_available_today,
      display_order,
      image_url,
      portion_detail,
    } = req.body;

    const stmt = db.prepare(`
      UPDATE menu_items
      SET category_id = ?, name = ?, tamil_name = ?, description = ?, price = ?,
          is_veg = ?, is_spicy = ?, spice_level = ?, is_featured = ?,
          is_available_today = ?, display_order = ?, image_url = ?, portion_detail = ?
      WHERE id = ?
    `);

    stmt.run(
      category_id,
      name,
      tamil_name || null,
      description || '',
      parseFloat(price),
      is_veg ? 1 : 0,
      is_spicy ? 1 : 0,
      spice_level || 1,
      is_featured ? 1 : 0,
      is_available_today ? 1 : 0,
      display_order || 0,
      image_url || null,
      portion_detail || null,
      id
    );

    const updated = db.prepare(`
      SELECT m.*, c.name as category_name, c.slug as category_slug
      FROM menu_items m
      JOIN menu_categories c ON m.category_id = c.id
      WHERE m.id = ?
    `).get(id);

    if (!updated) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json(updated);
  } catch (error) {
    console.error('Error updating menu item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /api/menu/items/:id/availability
router.patch('/items/:id/availability', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { is_available_today } = req.body;

    const stmt = db.prepare('UPDATE menu_items SET is_available_today = ? WHERE id = ?');
    stmt.run(is_available_today ? 1 : 0, id);

    const updated = db.prepare('SELECT id, is_available_today FROM menu_items WHERE id = ?').get(id);
    res.json(updated);
  } catch (error) {
    console.error('Error updating item availability:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /api/menu/items/:id/featured
router.patch('/items/:id/featured', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { is_featured } = req.body;

    const stmt = db.prepare('UPDATE menu_items SET is_featured = ? WHERE id = ?');
    stmt.run(is_featured ? 1 : 0, id);

    const updated = db.prepare('SELECT id, is_featured FROM menu_items WHERE id = ?').get(id);
    res.json(updated);
  } catch (error) {
    console.error('Error updating item featured status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/menu/items/:id
router.delete('/items/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    db.prepare('DELETE FROM menu_items WHERE id = ?').run(id);
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
