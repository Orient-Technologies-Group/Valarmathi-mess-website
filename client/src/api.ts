import {
  RestaurantInfo,
  OpeningHour,
  MenuCategory,
  MenuItem,
  GalleryItem,
  Enquiry,
  DashboardStats,
} from '../../shared/types.js';

const API_BASE = '/api';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || `API error: ${res.statusText}`);
  }
  return res.json();
}

// Restaurant Info
export async function getRestaurantInfo(): Promise<RestaurantInfo> {
  const res = await fetch(`${API_BASE}/restaurant`);
  return handleResponse<RestaurantInfo>(res);
}

export async function updateRestaurantInfo(info: Partial<RestaurantInfo>): Promise<RestaurantInfo> {
  const res = await fetch(`${API_BASE}/restaurant`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(info),
  });
  return handleResponse<RestaurantInfo>(res);
}

// Opening Hours
export async function getOpeningHours(): Promise<OpeningHour[]> {
  const res = await fetch(`${API_BASE}/hours`);
  return handleResponse<OpeningHour[]>(res);
}

export async function updateOpeningHour(id: number, data: Partial<OpeningHour>): Promise<OpeningHour> {
  const res = await fetch(`${API_BASE}/hours/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<OpeningHour>(res);
}

// Menu Categories
export async function getCategories(): Promise<MenuCategory[]> {
  const res = await fetch(`${API_BASE}/menu/categories`);
  return handleResponse<MenuCategory[]>(res);
}

export async function createCategory(data: Partial<MenuCategory>): Promise<MenuCategory> {
  const res = await fetch(`${API_BASE}/menu/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<MenuCategory>(res);
}

export async function updateCategory(id: number, data: Partial<MenuCategory>): Promise<MenuCategory> {
  const res = await fetch(`${API_BASE}/menu/categories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<MenuCategory>(res);
}

export async function deleteCategory(id: number): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/menu/categories/${id}`, {
    method: 'DELETE',
  });
  return handleResponse<{ message: string }>(res);
}

// Menu Items
export interface FetchItemsParams {
  category?: string;
  search?: string;
  featured?: boolean;
  available?: boolean;
}

export async function getMenuItems(params?: FetchItemsParams): Promise<MenuItem[]> {
  const query = new URLSearchParams();
  if (params?.category) query.set('category', params.category);
  if (params?.search) query.set('search', params.search);
  if (params?.featured) query.set('featured', 'true');
  if (params?.available) query.set('available', 'true');

  const queryString = query.toString();
  const res = await fetch(`${API_BASE}/menu/items${queryString ? `?${queryString}` : ''}`);
  return handleResponse<MenuItem[]>(res);
}

export async function createMenuItem(data: Partial<MenuItem>): Promise<MenuItem> {
  const res = await fetch(`${API_BASE}/menu/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<MenuItem>(res);
}

export async function updateMenuItem(id: number, data: Partial<MenuItem>): Promise<MenuItem> {
  const res = await fetch(`${API_BASE}/menu/items/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<MenuItem>(res);
}

export async function deleteMenuItem(id: number): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/menu/items/${id}`, {
    method: 'DELETE',
  });
  return handleResponse<{ message: string }>(res);
}

export async function toggleItemAvailability(id: number, is_available_today: boolean): Promise<{ id: number; is_available_today: number }> {
  const res = await fetch(`${API_BASE}/menu/items/${id}/availability`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ is_available_today }),
  });
  return handleResponse<{ id: number; is_available_today: number }>(res);
}

export async function toggleItemFeatured(id: number, is_featured: boolean): Promise<{ id: number; is_featured: number }> {
  const res = await fetch(`${API_BASE}/menu/items/${id}/featured`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ is_featured }),
  });
  return handleResponse<{ id: number; is_featured: number }>(res);
}

// Gallery
export async function getGallery(): Promise<GalleryItem[]> {
  const res = await fetch(`${API_BASE}/gallery`);
  return handleResponse<GalleryItem[]>(res);
}

export async function createGalleryItem(data: Partial<GalleryItem>): Promise<GalleryItem> {
  const res = await fetch(`${API_BASE}/gallery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<GalleryItem>(res);
}

export async function updateGalleryItem(id: number, data: Partial<GalleryItem>): Promise<GalleryItem> {
  const res = await fetch(`${API_BASE}/gallery/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<GalleryItem>(res);
}

export async function deleteGalleryItem(id: number): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/gallery/${id}`, {
    method: 'DELETE',
  });
  return handleResponse<{ message: string }>(res);
}

export async function toggleGalleryFeatured(id: number, is_featured: boolean): Promise<GalleryItem> {
  const res = await fetch(`${API_BASE}/gallery/${id}/featured`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ is_featured }),
  });
  return handleResponse<GalleryItem>(res);
}

// Enquiries / Reservations
export interface NewEnquiryPayload {
  name: string;
  phone: string;
  email?: string;
  date: string;
  time_slot: string;
  guests: number;
  message?: string;
}

export async function submitEnquiry(payload: NewEnquiryPayload): Promise<{ success: boolean; message: string; enquiry: Enquiry }> {
  const res = await fetch(`${API_BASE}/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse<{ success: boolean; message: string; enquiry: Enquiry }>(res);
}

export async function getEnquiries(): Promise<Enquiry[]> {
  const res = await fetch(`${API_BASE}/enquiries`);
  return handleResponse<Enquiry[]>(res);
}

export async function updateEnquiryStatus(id: number, status: 'pending' | 'contacted' | 'completed'): Promise<Enquiry> {
  const res = await fetch(`${API_BASE}/enquiries/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  return handleResponse<Enquiry>(res);
}

export async function deleteEnquiry(id: number): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/enquiries/${id}`, {
    method: 'DELETE',
  });
  return handleResponse<{ message: string }>(res);
}

// Stats
export async function getStats(): Promise<DashboardStats> {
  const res = await fetch(`${API_BASE}/stats`);
  return handleResponse<DashboardStats>(res);
}
