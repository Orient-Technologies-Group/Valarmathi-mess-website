import { Router, Request, Response } from 'express';
import { db } from '../db.js';

const router = Router();

// GET /api/stats
router.get('/', (_req: Request, res: Response) => {
  try {
    const totalMenuItems = (db.prepare('SELECT COUNT(*) as count FROM menu_items').get() as { count: number })?.count || 0;
    const availableItems = (db.prepare('SELECT COUNT(*) as count FROM menu_items WHERE is_available_today = 1').get() as { count: number })?.count || 0;
    const featuredItems = (db.prepare('SELECT COUNT(*) as count FROM menu_items WHERE is_featured = 1').get() as { count: number })?.count || 0;
    const categoriesCount = (db.prepare('SELECT COUNT(*) as count FROM menu_categories').get() as { count: number })?.count || 0;
    const galleryCount = (db.prepare('SELECT COUNT(*) as count FROM gallery_items').get() as { count: number })?.count || 0;
    const pendingEnquiries = (db.prepare("SELECT COUNT(*) as count FROM enquiries WHERE status = 'pending'").get() as { count: number })?.count || 0;
    const totalEnquiries = (db.prepare('SELECT COUNT(*) as count FROM enquiries').get() as { count: number })?.count || 0;

    res.json({
      totalMenuItems,
      availableItems,
      featuredItems,
      categoriesCount,
      galleryCount,
      pendingEnquiries,
      totalEnquiries,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
