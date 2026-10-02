export interface RestaurantInfo {
  id: number;
  name: string;
  tamil_name: string;
  tagline: string;
  description: string;
  address: string;
  landmark: string;
  city: string;
  state: string;
  postal_code: string;
  phone: string;
  email: string;
  founded_year: number;
  hero_headline: string;
  hero_subheadline: string;
  announcement: string | null;
  google_maps_url: string;
}

export interface OpeningHour {
  id: number;
  day_of_week: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  day_name: string;
  lunch_open: string;
  lunch_close: string;
  dinner_open: string;
  dinner_close: string;
  is_closed: number; // 0 or 1
  notes: string | null;
}

export interface MenuCategory {
  id: number;
  name: string;
  tamil_name: string;
  slug: string;
  description: string | null;
  display_order: number;
  is_active: number;
}

export interface MenuItem {
  id: number;
  category_id: number;
  category_name?: string;
  category_slug?: string;
  name: string;
  tamil_name: string | null;
  description: string;
  price: number;
  is_veg: number; // 0 = non-veg, 1 = veg
  is_spicy: number; // 0 = mild, 1 = spicy
  spice_level: number; // 1 to 3
  is_featured: number; // 0 or 1
  is_available_today: number; // 0 or 1
  display_order: number;
  image_url: string | null;
  portion_detail: string | null;
}

export interface GalleryItem {
  id: number;
  title: string;
  tamil_title: string | null;
  description: string | null;
  category: 'Food' | 'Ambiance' | 'Heritage' | 'Kitchen';
  image_url: string;
  is_featured: number;
  display_order: number;
}

export interface Enquiry {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  date: string;
  time_slot: string;
  guests: number;
  message: string | null;
  status: 'pending' | 'contacted' | 'completed';
  created_at: string;
}

export interface ReviewPlaceholder {
  id: number;
  author_name: string;
  city: string;
  rating: number;
  dish_mentioned: string;
  review_text: string;
  date: string;
  source?: string;
  reviewer_badge?: string;
}


export interface DashboardStats {
  totalMenuItems: number;
  availableItems: number;
  featuredItems: number;
  categoriesCount: number;
  galleryCount: number;
  pendingEnquiries: number;
  totalEnquiries: number;
}
