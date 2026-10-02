import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import {
  initialRestaurantInfo,
  initialOpeningHours,
  initialCategories,
  initialMenuItems,
  initialGalleryItems,
} from './seedData.js';

// Resolve database path in the project root directory
const dbPath = path.resolve(process.cwd(), 'valarmathi.db');

export const db = new DatabaseSync(dbPath);

// Enable WAL mode and foreign keys for high performance and integrity
try {
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec('PRAGMA foreign_keys = ON;');
} catch (e) {
  console.warn('SQLite PRAGMA setup warning:', e);
}

export function initDatabase() {
  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS restaurant_info (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      tamil_name TEXT,
      tagline TEXT,
      description TEXT,
      address TEXT NOT NULL,
      landmark TEXT,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      postal_code TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      founded_year INTEGER NOT NULL DEFAULT 1986,
      hero_headline TEXT,
      hero_subheadline TEXT,
      announcement TEXT,
      google_maps_url TEXT
    );

    CREATE TABLE IF NOT EXISTS opening_hours (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      day_of_week INTEGER NOT NULL,
      day_name TEXT NOT NULL,
      lunch_open TEXT NOT NULL,
      lunch_close TEXT NOT NULL,
      dinner_open TEXT NOT NULL,
      dinner_close TEXT NOT NULL,
      is_closed INTEGER NOT NULL DEFAULT 0,
      notes TEXT
    );

    CREATE TABLE IF NOT EXISTS menu_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      tamil_name TEXT,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      display_order INTEGER NOT NULL DEFAULT 0,
      is_active INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      tamil_name TEXT,
      description TEXT,
      price REAL NOT NULL,
      is_veg INTEGER NOT NULL DEFAULT 0,
      is_spicy INTEGER NOT NULL DEFAULT 0,
      spice_level INTEGER NOT NULL DEFAULT 1,
      is_featured INTEGER NOT NULL DEFAULT 0,
      is_available_today INTEGER NOT NULL DEFAULT 1,
      display_order INTEGER NOT NULL DEFAULT 0,
      image_url TEXT,
      portion_detail TEXT,
      FOREIGN KEY (category_id) REFERENCES menu_categories(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS gallery_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      tamil_title TEXT,
      description TEXT,
      category TEXT NOT NULL,
      image_url TEXT NOT NULL,
      is_featured INTEGER NOT NULL DEFAULT 0,
      display_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      date TEXT NOT NULL,
      time_slot TEXT NOT NULL,
      guests INTEGER NOT NULL DEFAULT 2,
      message TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
    );
  `);

  // Check if restaurant_info has records; if not, seed database
  const infoRow = db.prepare('SELECT COUNT(*) as count FROM restaurant_info').get() as { count: number };
  if (!infoRow || infoRow.count === 0) {
    console.log('🌱 Seeding Valarmathi Mess database with verified heritage and menu records...');
    seedDatabase();
  }
}

function seedDatabase() {
  // 1. Restaurant Info
  const insertInfo = db.prepare(`
    INSERT INTO restaurant_info (
      name, tamil_name, tagline, description, address, landmark, city, state, postal_code,
      phone, email, founded_year, hero_headline, hero_subheadline, announcement, google_maps_url
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertInfo.run(
    initialRestaurantInfo.name,
    initialRestaurantInfo.tamil_name,
    initialRestaurantInfo.tagline,
    initialRestaurantInfo.description,
    initialRestaurantInfo.address,
    initialRestaurantInfo.landmark,
    initialRestaurantInfo.city,
    initialRestaurantInfo.state,
    initialRestaurantInfo.postal_code,
    initialRestaurantInfo.phone,
    initialRestaurantInfo.email,
    initialRestaurantInfo.founded_year,
    initialRestaurantInfo.hero_headline,
    initialRestaurantInfo.hero_subheadline,
    initialRestaurantInfo.announcement,
    initialRestaurantInfo.google_maps_url
  );

  // 2. Opening Hours
  const insertHours = db.prepare(`
    INSERT INTO opening_hours (
      day_of_week, day_name, lunch_open, lunch_close, dinner_open, dinner_close, is_closed, notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const h of initialOpeningHours) {
    insertHours.run(h.day_of_week, h.day_name, h.lunch_open, h.lunch_close, h.dinner_open, h.dinner_close, h.is_closed, h.notes);
  }

  // 3. Menu Categories
  const insertCat = db.prepare(`
    INSERT INTO menu_categories (
      name, tamil_name, slug, description, display_order, is_active
    ) VALUES (?, ?, ?, ?, ?, ?)
  `);
  for (const c of initialCategories) {
    insertCat.run(c.name, c.tamil_name, c.slug, c.description, c.display_order, c.is_active);
  }

  // 4. Menu Items
  const insertItem = db.prepare(`
    INSERT INTO menu_items (
      category_id, name, tamil_name, description, price, is_veg, is_spicy, spice_level,
      is_featured, is_available_today, display_order, image_url, portion_detail
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  for (const item of initialMenuItems) {
    insertItem.run(
      item.category_id,
      item.name,
      item.tamil_name,
      item.description,
      item.price,
      item.is_veg,
      item.is_spicy,
      item.spice_level,
      item.is_featured,
      item.is_available_today,
      item.display_order,
      item.image_url,
      item.portion_detail
    );
  }

  // 5. Gallery Items
  const insertGallery = db.prepare(`
    INSERT INTO gallery_items (
      title, tamil_title, description, category, image_url, is_featured, display_order
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  for (const g of initialGalleryItems) {
    insertGallery.run(g.title, g.tamil_title, g.description, g.category, g.image_url, g.is_featured, g.display_order);
  }

  // 6. Seed a sample enquiry to verify enquiries workflow
  const insertEnquiry = db.prepare(`
    INSERT INTO enquiries (name, phone, email, date, time_slot, guests, message, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertEnquiry.run(
    'Ramesh Kumar',
    '+91 98421 54321',
    'ramesh@example.com',
    new Date(Date.now() + 86400000).toISOString().split('T')[0],
    'Lunch (1:00 PM)',
    4,
    'Family lunch. Table on ground floor preferred for elderly parent.',
    'pending'
  );

  console.log('✅ Valarmathi Mess database seeded successfully.');
}

export function reseedDatabase() {
  console.log('🔄 Reseeding Valarmathi Mess database with verified real pricing and hours...');
  db.exec(`
    DELETE FROM menu_items;
    DELETE FROM menu_categories;
    DELETE FROM opening_hours;
    DELETE FROM gallery_items;
    DELETE FROM restaurant_info;
    DELETE FROM sqlite_sequence WHERE name IN ('menu_categories', 'menu_items', 'opening_hours', 'gallery_items', 'restaurant_info');
  `);
  seedDatabase();
}

// Automatically initialize tables and seed data
initDatabase();

