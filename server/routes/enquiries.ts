import { Router, Request, Response } from 'express';
import { db } from '../db.js';

const router = Router();

// GET /api/enquiries
router.get('/', (_req: Request, res: Response) => {
  try {
    const enquiries = db.prepare(`
      SELECT * FROM enquiries
      ORDER BY datetime(created_at) DESC, id DESC
    `).all();
    res.json(enquiries);
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/enquiries (Strict validation)
router.post('/', (req: Request, res: Response) => {
  try {
    const { name, phone, email, date, time_slot, guests, message } = req.body;

    const errors: Record<string, string> = {};

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.name = 'Please provide a valid name (minimum 2 characters)';
    }

    // Phone validation for Indian mobile/landline numbers or standard phone formats
    const cleanedPhone = phone ? String(phone).replace(/[\s\-()]/g, '') : '';
    if (!cleanedPhone || cleanedPhone.length < 8 || !/^\+?[0-9]{8,15}$/.test(cleanedPhone)) {
      errors.phone = 'Please provide a valid phone number (e.g., +91 98421 54321 or 0422 427 1190)';
    }

    if (!date || typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      errors.date = 'Please select a valid reservation date (YYYY-MM-DD)';
    }

    if (!time_slot || typeof time_slot !== 'string' || time_slot.trim().length === 0) {
      errors.time_slot = 'Please select a preferred dining time slot';
    }

    const guestsNum = parseInt(String(guests), 10);
    if (isNaN(guestsNum) || guestsNum < 1 || guestsNum > 100) {
      errors.guests = 'Number of guests must be between 1 and 100';
    }

    if (email && typeof email === 'string' && email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errors.email = 'Please provide a valid email address';
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors,
      });
    }

    const stmt = db.prepare(`
      INSERT INTO enquiries (name, phone, email, date, time_slot, guests, message, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
    `);

    const result = stmt.run(
      name.trim(),
      phone.trim(),
      email ? email.trim() : null,
      date.trim(),
      time_slot.trim(),
      guestsNum,
      message ? message.trim() : null
    );

    const created = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({
      success: true,
      message: 'Your table reservation enquiry has been received. Our team will contact you shortly to confirm.',
      enquiry: created,
    });
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    res.status(500).json({ error: 'Internal server error while saving reservation enquiry' });
  }
});

// PATCH /api/enquiries/:id/status
router.patch('/:id/status', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { status } = req.body;

    if (!['pending', 'contacted', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Status must be pending, contacted, or completed' });
    }

    const stmt = db.prepare('UPDATE enquiries SET status = ? WHERE id = ?');
    stmt.run(status, id);

    const updated = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(id);
    if (!updated) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }
    res.json(updated);
  } catch (error) {
    console.error('Error updating enquiry status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/enquiries/:id
router.delete('/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    db.prepare('DELETE FROM enquiries WHERE id = ?').run(id);
    res.json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
