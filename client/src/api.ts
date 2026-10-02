import {
  RestaurantInfo,
  OpeningHour,
  MenuCategory,
  MenuItem,
  GalleryItem,
  Enquiry,
  DashboardStats,
} from '../../shared/types.js';
import {
  initialRestaurantInfo,
  initialOpeningHours,
  initialCategories,
  initialMenuItems,
  initialGalleryItems,
} from '../../shared/seedData.js';

const API_BASE = '/api';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || `API error: ${res.statusText}`);
  }
  return res.json();
}

// ================= RESTAURANT INFO =================
export async function getRestaurantInfo(): Promise<RestaurantInfo> {
  try {
    const res = await fetch(`${API_BASE}/restaurant`);
    return await handleResponse<RestaurantInfo>(res);
  } catch {
    // Fallback for static hosting (e.g. Render Static Site)
    return initialRestaurantInfo;
  }
}

export async function updateRestaurantInfo(info: Partial<RestaurantInfo>): Promise<RestaurantInfo> {
  const res = await fetch(`${API_BASE}/restaurant`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(info),
  });
  return handleResponse<RestaurantInfo>(res);
}

// ================= OPENING HOURS =================
export async function getOpeningHours(): Promise<OpeningHour[]> {
  try {
    const res = await fetch(`${API_BASE}/hours`);
    return await handleResponse<OpeningHour[]>(res);
  } catch {
    return initialOpeningHours;
  }
}

export async function updateOpeningHour(id: number, data: Partial<OpeningHour>): Promise<OpeningHour> {
  const res = await fetch(`${API_BASE}/hours/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<OpeningHour>(res);
}

// ================= MENU CATEGORIES =================
export async function getCategories(): Promise<MenuCategory[]> {
  try {
    const res = await fetch(`${API_BASE}/menu/categories`);
    return await handleResponse<MenuCategory[]>(res);
  } catch {
    return initialCategories;
  }
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

// ================= MENU ITEMS =================
export interface FetchItemsParams {
  category?: string;
  search?: string;
  featured?: boolean;
  available?: boolean;
}

export async function getMenuItems(params?: FetchItemsParams): Promise<MenuItem[]> {
  try {
    const query = new URLSearchParams();
    if (params?.category) query.set('category', params.category);
    if (params?.search) query.set('search', params.search);
    if (params?.featured) query.set('featured', 'true');
    if (params?.available) query.set('available', 'true');

    const queryString = query.toString();
    const res = await fetch(`${API_BASE}/menu/items${queryString ? `?${queryString}` : ''}`);
    return await handleResponse<MenuItem[]>(res);
  } catch {
    // Static fallback filtering
    let items = [...initialMenuItems];
    if (params?.category && params.category !== 'all') {
      items = items.filter(
        (i) => i.category_slug === params.category || String(i.category_id) === params.category
      );
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          (i.tamil_name && i.tamil_name.includes(q)) ||
          (i.description && i.description.toLowerCase().includes(q))
      );
    }
    if (params?.featured) {
      items = items.filter((i) => i.is_featured === 1);
    }
    if (params?.available) {
      items = items.filter((i) => i.is_available_today === 1);
    }
    return items;
  }
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

// ================= GALLERY =================
export async function getGallery(): Promise<GalleryItem[]> {
  try {
    const res = await fetch(`${API_BASE}/gallery`);
    return await handleResponse<GalleryItem[]>(res);
  } catch {
    return initialGalleryItems;
  }
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

// ================= ENQUIRIES / RESERVATIONS =================
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
  try {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await handleResponse<{ success: boolean; message: string; enquiry: Enquiry }>(res);
  } catch {
    // Store in browser localStorage when running on a static site host
    const mockEnquiry: Enquiry = {
      id: Date.now(),
      name: payload.name,
      phone: payload.phone,
      email: payload.email || null,
      date: payload.date,
      time_slot: payload.time_slot,
      guests: payload.guests,
      message: payload.message || null,
      status: 'pending',
      created_at: new Date().toISOString(),
    };
    try {
      const existing = JSON.parse(localStorage.getItem('valarmathi_enquiries') || '[]');
      existing.unshift(mockEnquiry);
      localStorage.setItem('valarmathi_enquiries', JSON.stringify(existing));
    } catch {}

    return {
      success: true,
      message: 'Your table reservation request has been received. Our mess team looks forward to welcoming you!',
      enquiry: mockEnquiry,
    };
  }
}

export async function getEnquiries(): Promise<Enquiry[]> {
  try {
    const res = await fetch(`${API_BASE}/enquiries`);
    return await handleResponse<Enquiry[]>(res);
  } catch {
    try {
      return JSON.parse(localStorage.getItem('valarmathi_enquiries') || '[]');
    } catch {
      return [];
    }
  }
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

// ================= STATS =================
export async function getStats(): Promise<DashboardStats> {
  try {
    const res = await fetch(`${API_BASE}/stats`);
    return await handleResponse<DashboardStats>(res);
  } catch {
    return {
      totalMenuItems: initialMenuItems.length,
      availableItems: initialMenuItems.filter((i) => i.is_available_today === 1).length,
      featuredItems: initialMenuItems.filter((i) => i.is_featured === 1).length,
      categoriesCount: initialCategories.length,
      galleryCount: initialGalleryItems.length,
      pendingEnquiries: 1,
      totalEnquiries: 1,
    };
  }
}
