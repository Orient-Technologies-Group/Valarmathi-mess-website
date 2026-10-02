import React, { useState, useEffect } from 'react';
import {
  RestaurantInfo,
  OpeningHour,
  MenuCategory,
  MenuItem,
  GalleryItem,
  Enquiry,
  DashboardStats,
} from '../../../shared/types.js';
import {
  getStats,
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleItemAvailability,
  toggleItemFeatured,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getOpeningHours,
  updateOpeningHour,
  getRestaurantInfo,
  updateRestaurantInfo,
  getGallery,
  createGalleryItem,
  deleteGalleryItem,
  toggleGalleryFeatured,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} from '../api.js';
import { formatPrice } from '../utils/helpers.js';
import {
  ShieldAlert,
  LayoutDashboard,
  UtensilsCrossed,
  Layers,
  Clock,
  Store,
  Image,
  Inbox,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Star,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Search,
  ExternalLink,
} from 'lucide-react';

interface AdminPageProps {
  onRefreshData: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onRefreshData }) => {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'menu' | 'categories' | 'hours' | 'info' | 'gallery' | 'enquiries'
  >('dashboard');

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [hours, setHours] = useState<OpeningHour[]>([]);
  const [info, setInfo] = useState<RestaurantInfo | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [menuSearch, setMenuSearch] = useState<string>('');
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<string>('all');

  // Modals & editing states
  const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Partial<MenuCategory> | null>(null);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [newGalleryItem, setNewGalleryItem] = useState({
    title: '',
    tamil_title: '',
    category: 'Food' as 'Food' | 'Ambiance' | 'Heritage' | 'Kitchen',
    image_url: '',
    description: '',
  });

  const loadAllAdminData = async () => {
    try {
      setLoading(true);
      const [s, m, c, h, i, g, e] = await Promise.all([
        getStats(),
        getMenuItems(),
        getCategories(),
        getOpeningHours(),
        getRestaurantInfo(),
        getGallery(),
        getEnquiries(),
      ]);
      setStats(s);
      setMenuItems(m);
      setCategories(c);
      setHours(h);
      setInfo(i);
      setGallery(g);
      setEnquiries(e);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllAdminData();
  }, []);

  const triggerFeedback = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  // ================= MENU ACTIONS =================
  const handleToggleAvailability = async (id: number, current: number) => {
    try {
      await toggleItemAvailability(id, current === 0);
      setMenuItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, is_available_today: current === 0 ? 1 : 0 } : item))
      );
      triggerFeedback('Availability updated');
      onRefreshData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleFeatured = async (id: number, current: number) => {
    try {
      await toggleItemFeatured(id, current === 0);
      setMenuItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, is_featured: current === 0 ? 1 : 0 } : item))
      );
      triggerFeedback('Featured status updated');
      onRefreshData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteItem = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this menu dish?')) return;
    try {
      await deleteMenuItem(id);
      setMenuItems((prev) => prev.filter((item) => item.id !== id));
      triggerFeedback('Dish deleted');
      onRefreshData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.name || !editingItem.category_id || editingItem.price === undefined) {
      alert('Please fill out dish name, category, and price.');
      return;
    }

    try {
      if (editingItem.id) {
        await updateMenuItem(editingItem.id, editingItem);
        triggerFeedback('Dish updated successfully');
      } else {
        await createMenuItem(editingItem);
        triggerFeedback('New dish added successfully');
      }
      setIsItemModalOpen(false);
      setEditingItem(null);
      await loadAllAdminData();
      onRefreshData();
    } catch (err: any) {
      alert(err.message || 'Failed to save menu dish');
    }
  };

  // ================= RESTAURANT INFO ACTIONS =================
  const handleSaveInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!info) return;
    try {
      await updateRestaurantInfo(info);
      triggerFeedback('Restaurant details saved to SQLite');
      onRefreshData();
    } catch (err: any) {
      alert(err.message || 'Failed to update restaurant info');
    }
  };

  // ================= OPENING HOURS ACTIONS =================
  const handleUpdateHour = async (h: OpeningHour) => {
    try {
      await updateOpeningHour(h.id, h);
      triggerFeedback(`Updated hours for ${h.day_name}`);
      onRefreshData();
    } catch (err: any) {
      alert(err.message || 'Failed to update hours');
    }
  };

  // ================= ENQUIRIES ACTIONS =================
  const handleEnquiryStatus = async (id: number, status: 'pending' | 'contacted' | 'completed') => {
    try {
      await updateEnquiryStatus(id, status);
      setEnquiries((prev) => prev.map((enq) => (enq.id === id ? { ...enq, status } : enq)));
      triggerFeedback(`Status changed to ${status}`);
      loadAllAdminData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteEnquiry = async (id: number) => {
    if (!window.confirm('Delete this reservation enquiry?')) return;
    try {
      await deleteEnquiry(id);
      setEnquiries((prev) => prev.filter((enq) => enq.id !== id));
      triggerFeedback('Enquiry deleted');
      loadAllAdminData();
    } catch (e) {
      console.error(e);
    }
  };

  // ================= GALLERY ACTIONS =================
  const handleAddGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryItem.title || !newGalleryItem.image_url) {
      alert('Title and Image URL are required');
      return;
    }
    try {
      await createGalleryItem(newGalleryItem);
      setIsGalleryModalOpen(false);
      setNewGalleryItem({
        title: '',
        tamil_title: '',
        category: 'Food',
        image_url: '',
        description: '',
      });
      triggerFeedback('Image added to gallery');
      loadAllAdminData();
      onRefreshData();
    } catch (err: any) {
      alert(err.message || 'Failed to add image');
    }
  };

  const handleDeleteGallery = async (id: number) => {
    if (!window.confirm('Delete this gallery photo?')) return;
    try {
      await deleteGalleryItem(id);
      setGallery((prev) => prev.filter((g) => g.id !== id));
      triggerFeedback('Photo removed');
      onRefreshData();
    } catch (e) {
      console.error(e);
    }
  };

  const filteredMenuItems = menuItems.filter((i) => {
    if (selectedMenuCategory !== 'all' && String(i.category_id) !== selectedMenuCategory) return false;
    if (menuSearch.trim()) {
      const q = menuSearch.toLowerCase();
      return (
        i.name.toLowerCase().includes(q) ||
        (i.tamil_name && i.tamil_name.includes(q)) ||
        i.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="py-8 lg:py-12 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Prominent Local Demo Security Warning */}
        <div className="mb-8 p-4 rounded bg-amber-50 border border-amber-300 text-amber-900 flex items-start space-x-3 shadow-sm">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <strong className="font-semibold block text-amber-950">
              Notice: Local Demonstration Admin Dashboard
            </strong>
            This administrative control panel operates directly against your local SQLite database (
            <code className="bg-amber-100 px-1 py-0.5 rounded text-[11px]">valarmathi.db</code>
            ). All additions, price adjustments, and reservation changes persist locally. For public hosting, secure
            password-based authentication and sessions should be configured.
          </div>
        </div>

        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#6B1D28]/15 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#C8861B]">
              Valarmathi Mess Administration
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#4F131C]">
              Restaurant Content Management
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            {saveStatus && (
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded animate-fadeIn flex items-center space-x-1">
                <Check className="w-3.5 h-3.5" />
                <span>{saveStatus}</span>
              </span>
            )}
            <button
              onClick={loadAllAdminData}
              className="p-2 rounded bg-[#F4EFE7] hover:bg-[#EFE8DD] text-[#4F131C] text-xs font-medium flex items-center space-x-1 transition-colors"
              title="Refresh database records"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh DB</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-4 border-b border-[#6B1D28]/10 text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3.5 py-2 rounded font-medium flex items-center space-x-2 whitespace-nowrap transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-[#4F131C] text-white shadow'
                : 'text-[#554E48] hover:bg-[#F3EDE2]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`px-3.5 py-2 rounded font-medium flex items-center space-x-2 whitespace-nowrap transition-colors ${
              activeTab === 'menu'
                ? 'bg-[#4F131C] text-white shadow'
                : 'text-[#554E48] hover:bg-[#F3EDE2]'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Menu Dishes ({menuItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`px-3.5 py-2 rounded font-medium flex items-center space-x-2 whitespace-nowrap transition-colors ${
              activeTab === 'categories'
                ? 'bg-[#4F131C] text-white shadow'
                : 'text-[#554E48] hover:bg-[#F3EDE2]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Categories ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('hours')}
            className={`px-3.5 py-2 rounded font-medium flex items-center space-x-2 whitespace-nowrap transition-colors ${
              activeTab === 'hours'
                ? 'bg-[#4F131C] text-white shadow'
                : 'text-[#554E48] hover:bg-[#F3EDE2]'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Opening Hours</span>
          </button>

          <button
            onClick={() => setActiveTab('info')}
            className={`px-3.5 py-2 rounded font-medium flex items-center space-x-2 whitespace-nowrap transition-colors ${
              activeTab === 'info'
                ? 'bg-[#4F131C] text-white shadow'
                : 'text-[#554E48] hover:bg-[#F3EDE2]'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Restaurant Info</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-3.5 py-2 rounded font-medium flex items-center space-x-2 whitespace-nowrap transition-colors ${
              activeTab === 'gallery'
                ? 'bg-[#4F131C] text-white shadow'
                : 'text-[#554E48] hover:bg-[#F3EDE2]'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>Gallery ({gallery.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-3.5 py-2 rounded font-medium flex items-center space-x-2 whitespace-nowrap transition-colors ${
              activeTab === 'enquiries'
                ? 'bg-[#4F131C] text-white shadow'
                : 'text-[#554E48] hover:bg-[#F3EDE2]'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Enquiries ({enquiries.length})</span>
          </button>
        </div>

        {/* Tab 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && stats && (
          <div className="py-6 space-y-8 animate-fadeIn">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-[#FAF7F2] p-4 rounded border border-[#6B1D28]/15 shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A736C]">Total Dishes</span>
                <div className="font-serif text-3xl font-bold text-[#4F131C] mt-1">{stats.totalMenuItems}</div>
                <span className="text-[10px] text-[#242220]">In SQLite database</span>
              </div>

              <div className="bg-[#FAF7F2] p-4 rounded border border-[#6B1D28]/15 shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A736C]">Available Today</span>
                <div className="font-serif text-3xl font-bold text-emerald-700 mt-1">{stats.availableItems}</div>
                <span className="text-[10px] text-emerald-800">Ready to serve</span>
              </div>

              <div className="bg-[#FAF7F2] p-4 rounded border border-[#6B1D28]/15 shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A736C]">Signature Items</span>
                <div className="font-serif text-3xl font-bold text-[#C8861B] mt-1">{stats.featuredItems}</div>
                <span className="text-[10px] text-[#C8861B]">Featured on home</span>
              </div>

              <div className="bg-[#FAF7F2] p-4 rounded border border-[#6B1D28]/15 shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A736C]">Categories</span>
                <div className="font-serif text-3xl font-bold text-[#4F131C] mt-1">{stats.categoriesCount}</div>
                <span className="text-[10px] text-[#242220]">Menu sections</span>
              </div>

              <div className="bg-[#FAF7F2] p-4 rounded border border-[#6B1D28]/15 shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A736C]">Pending Bookings</span>
                <div className="font-serif text-3xl font-bold text-amber-600 mt-1">{stats.pendingEnquiries}</div>
                <span className="text-[10px] text-amber-700">Requires response</span>
              </div>

              <div className="bg-[#FAF7F2] p-4 rounded border border-[#6B1D28]/15 shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A736C]">Total Enquiries</span>
                <div className="font-serif text-3xl font-bold text-[#4F131C] mt-1">{stats.totalEnquiries}</div>
                <span className="text-[10px] text-[#242220]">Lifetime logged</span>
              </div>
            </div>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#FAF7F2] p-6 rounded border border-[#6B1D28]/15 shadow-sm space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#4F131C]">
                  Quick Kitchen Management
                </h3>
                <p className="text-xs text-[#554E48] font-light">
                  Direct shortcuts to configure the day's service without modifying code or restarting the server.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={() => {
                      setEditingItem({
                        name: '',
                        tamil_name: '',
                        category_id: categories[0]?.id || 1,
                        price: 200,
                        is_veg: 0,
                        is_spicy: 1,
                        spice_level: 2,
                        is_featured: 0,
                        is_available_today: 1,
                        description: '',
                        display_order: 10,
                      });
                      setIsItemModalOpen(true);
                    }}
                    className="px-3.5 py-2 bg-[#4F131C] text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#6B1D28] flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#E09E2B]" />
                    <span>Add New Dish</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('menu')}
                    className="px-3.5 py-2 bg-[#F4EFE7] border border-[#6B1D28]/20 text-[#4F131C] rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#EFE8DD]"
                  >
                    Manage Daily Availability
                  </button>

                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="px-3.5 py-2 bg-[#F4EFE7] border border-[#6B1D28]/20 text-[#4F131C] rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#EFE8DD]"
                  >
                    Review Recent Reservations
                  </button>
                </div>
              </div>

              {/* Verified Details Card */}
              <div className="bg-[#FAF7F2] p-6 rounded border border-[#6B1D28]/15 shadow-sm space-y-3 text-xs text-[#554E48]">
                <h3 className="font-serif text-xl font-bold text-[#4F131C]">
                  Verified Operating Details
                </h3>
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between">
                    <span className="text-[#7A736C]">Institution Name:</span>
                    <strong className="text-[#242220]">Valarmathi Mess (வளர்மதி மெஸ்)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A736C]">Founded:</span>
                    <strong className="text-[#242220]">1986 (Verified heritage)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A736C]">Location:</span>
                    <strong className="text-[#242220]">CSI Compound, 207/A, Race Course, Coimbatore</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A736C]">Telephone:</span>
                    <strong className="text-[#242220]">+91 422 427 1190</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A736C]">Cuisine:</span>
                    <strong className="text-[#242220]">Authentic Kongu Regional South Indian</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: MENU ITEMS */}
        {activeTab === 'menu' && (
          <div className="py-6 space-y-6 animate-fadeIn">
            {/* Top Bar: Search, Category Filter & Add Dish */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#FAF7F2] p-4 rounded border border-[#6B1D28]/15">
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-[#7A736C] absolute left-3 top-3" />
                  <input
                    type="text"
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                    placeholder="Search dishes..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#6B1D28]/20 rounded focus:outline-none"
                  />
                </div>

                <select
                  value={selectedMenuCategory}
                  onChange={(e) => setSelectedMenuCategory(e.target.value)}
                  className="px-3 py-2 text-xs bg-white border border-[#6B1D28]/20 rounded focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={String(c.id)}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setEditingItem({
                    name: '',
                    tamil_name: '',
                    category_id: categories[0]?.id || 1,
                    price: 200,
                    is_veg: 0,
                    is_spicy: 1,
                    spice_level: 2,
                    is_featured: 0,
                    is_available_today: 1,
                    description: '',
                    display_order: 10,
                  });
                  setIsItemModalOpen(true);
                }}
                className="px-4 py-2 bg-[#4F131C] text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#6B1D28] flex items-center space-x-1 whitespace-nowrap shadow"
              >
                <Plus className="w-4 h-4 text-[#E09E2B]" />
                <span>Add Dish</span>
              </button>
            </div>

            {/* Menu Items Table */}
            <div className="bg-[#FAF7F2] rounded border border-[#6B1D28]/15 overflow-x-auto shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F4EFE7] border-b border-[#6B1D28]/10 text-[#4F131C] uppercase font-bold tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Dish</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Price</th>
                    <th className="py-3 px-3">Diet & Spice</th>
                    <th className="py-3 px-3 text-center">Available Today</th>
                    <th className="py-3 px-3 text-center">Featured</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#6B1D28]/10 text-[#554E48]">
                  {filteredMenuItems.map((item) => (
                    <tr key={item.id} className="hover:bg-[#F3EDE2]/50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <span className={item.is_veg ? 'veg-badge shrink-0' : 'nonveg-badge shrink-0'} />
                          <div>
                            <span className="font-serif text-base font-bold text-[#4F131C] block">
                              {item.name}
                            </span>
                            {item.tamil_name && (
                              <span className="font-tamil text-xs text-[#C8861B]">
                                {item.tamil_name}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-medium text-[#242220]">
                        {item.category_name}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-serif text-sm font-bold text-[#4F131C]">
                        {formatPrice(item.price)}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className="text-[11px] text-[#7A736C]">
                          {item.is_veg ? 'Pure Veg' : 'Non-Veg'} • {item.is_spicy ? `🌶️ Level ${item.spice_level}` : 'Mild'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => handleToggleAvailability(item.id, item.is_available_today)}
                          className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-colors ${
                            item.is_available_today === 1
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}
                        >
                          {item.is_available_today === 1 ? 'Available' : 'Sold Out'}
                        </button>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => handleToggleFeatured(item.id, item.is_featured)}
                          className={`p-1.5 rounded transition-colors ${
                            item.is_featured === 1 ? 'text-[#C8861B]' : 'text-stone-300 hover:text-stone-400'
                          }`}
                          title="Toggle Signature Dish"
                        >
                          <Star className={`w-4 h-4 ${item.is_featured === 1 ? 'fill-[#C8861B]' : ''}`} />
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => {
                              setEditingItem(item);
                              setIsItemModalOpen(true);
                            }}
                            className="p-1.5 text-stone-600 hover:text-[#4F131C] rounded hover:bg-[#EFE8DD]"
                            title="Edit dish"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-1.5 text-rose-600 hover:text-rose-800 rounded hover:bg-rose-50"
                            title="Delete dish"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: CATEGORIES */}
        {activeTab === 'categories' && (
          <div className="py-6 space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <p className="text-xs text-[#6B6661]">
                Menu sections and category display order.
              </p>
              <button
                onClick={() => {
                  setEditingCategory({
                    name: '',
                    tamil_name: '',
                    slug: '',
                    description: '',
                    display_order: categories.length + 1,
                    is_active: 1,
                  });
                  setIsCategoryModalOpen(true);
                }}
                className="px-4 py-2 bg-[#4F131C] text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#6B1D28] flex items-center space-x-1 shadow"
              >
                <Plus className="w-3.5 h-3.5 text-[#E09E2B]" />
                <span>New Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((c) => (
                <div
                  key={c.id}
                  className="bg-[#FAF7F2] p-5 rounded border border-[#6B1D28]/15 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif text-xl font-bold text-[#4F131C]">{c.name}</h3>
                        {c.tamil_name && (
                          <span className="font-tamil text-xs text-[#C8861B] font-semibold">{c.tamil_name}</span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#7A736C] bg-[#F4EFE7] px-2 py-0.5 rounded">
                        Order #{c.display_order}
                      </span>
                    </div>
                    {c.description && (
                      <p className="text-xs text-[#554E48] font-light mt-2">{c.description}</p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#6B1D28]/10 flex justify-end space-x-2">
                    <button
                      onClick={() => {
                        setEditingCategory(c);
                        setIsCategoryModalOpen(true);
                      }}
                      className="px-2.5 py-1 text-xs text-[#4F131C] hover:bg-[#EFE8DD] rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        if (!window.confirm(`Delete category "${c.name}" and its associated items?`)) return;
                        await deleteCategory(c.id);
                        triggerFeedback('Category deleted');
                        loadAllAdminData();
                        onRefreshData();
                      }}
                      className="px-2.5 py-1 text-xs text-rose-700 hover:bg-rose-50 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: OPENING HOURS */}
        {activeTab === 'hours' && (
          <div className="py-6 space-y-6 animate-fadeIn">
            <p className="text-xs text-[#6B6661]">
              Manage daily operating hours for lunch and dinner. Changes reflect immediately on the website banner and
              visit page.
            </p>

            <div className="bg-[#FAF7F2] rounded border border-[#6B1D28]/15 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F4EFE7] border-b border-[#6B1D28]/10 text-[#4F131C] uppercase font-bold tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Day</th>
                    <th className="py-3 px-3">Lunch Hours</th>
                    <th className="py-3 px-3">Dinner Hours</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#6B1D28]/10 text-[#554E48]">
                  {hours.map((h) => (
                    <tr key={h.id} className="hover:bg-[#F3EDE2]/50">
                      <td className="py-3 px-4 font-bold text-[#4F131C]">
                        {h.day_name}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={h.lunch_open}
                            onChange={(e) =>
                              setHours((prev) =>
                                prev.map((item) => (item.id === h.id ? { ...item, lunch_open: e.target.value } : item))
                              )
                            }
                            className="w-24 px-2 py-1 bg-white border border-[#6B1D28]/20 rounded text-xs"
                          />
                          <span>to</span>
                          <input
                            type="text"
                            value={h.lunch_close}
                            onChange={(e) =>
                              setHours((prev) =>
                                prev.map((item) => (item.id === h.id ? { ...item, lunch_close: e.target.value } : item))
                              )
                            }
                            className="w-24 px-2 py-1 bg-white border border-[#6B1D28]/20 rounded text-xs"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={h.dinner_open}
                            onChange={(e) =>
                              setHours((prev) =>
                                prev.map((item) => (item.id === h.id ? { ...item, dinner_open: e.target.value } : item))
                              )
                            }
                            className="w-24 px-2 py-1 bg-white border border-[#6B1D28]/20 rounded text-xs"
                          />
                          <span>to</span>
                          <input
                            type="text"
                            value={h.dinner_close}
                            onChange={(e) =>
                              setHours((prev) =>
                                prev.map((item) => (item.id === h.id ? { ...item, dinner_close: e.target.value } : item))
                              )
                            }
                            className="w-24 px-2 py-1 bg-white border border-[#6B1D28]/20 rounded text-xs"
                          />
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={h.is_closed === 1}
                            onChange={(e) =>
                              setHours((prev) =>
                                prev.map((item) =>
                                  item.id === h.id ? { ...item, is_closed: e.target.checked ? 1 : 0 } : item
                                )
                              )
                            }
                          />
                          <span>Closed All Day</span>
                        </label>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleUpdateHour(h)}
                          className="px-3 py-1 bg-[#4F131C] text-white rounded text-xs hover:bg-[#6B1D28]"
                        >
                          Save Day
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: RESTAURANT INFO */}
        {activeTab === 'info' && info && (
          <div className="py-6 max-w-3xl animate-fadeIn">
            <form onSubmit={handleSaveInfo} className="bg-[#FAF7F2] p-6 rounded border border-[#6B1D28]/15 shadow-sm space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    value={info.name}
                    onChange={(e) => setInfo({ ...info, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#6B1D28]/20 rounded text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                    Tamil Name
                  </label>
                  <input
                    type="text"
                    value={info.tamil_name}
                    onChange={(e) => setInfo({ ...info, tamil_name: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#6B1D28]/20 rounded text-sm font-tamil"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={info.tagline}
                  onChange={(e) => setInfo({ ...info, tagline: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#6B1D28]/20 rounded text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                  About Description
                </label>
                <textarea
                  rows={3}
                  value={info.description}
                  onChange={(e) => setInfo({ ...info, description: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#6B1D28]/20 rounded text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={info.address}
                    onChange={(e) => setInfo({ ...info, address: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#6B1D28]/20 rounded text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                    Landmark
                  </label>
                  <input
                    type="text"
                    value={info.landmark || ''}
                    onChange={(e) => setInfo({ ...info, landmark: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#6B1D28]/20 rounded text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                    Official Phone
                  </label>
                  <input
                    type="text"
                    value={info.phone}
                    onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#6B1D28]/20 rounded text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                    Hero Headline
                  </label>
                  <input
                    type="text"
                    value={info.hero_headline}
                    onChange={(e) => setInfo({ ...info, hero_headline: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#6B1D28]/20 rounded text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                  Hero Subheadline
                </label>
                <textarea
                  rows={2}
                  value={info.hero_subheadline}
                  onChange={(e) => setInfo({ ...info, hero_subheadline: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#6B1D28]/20 rounded text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                  Top Announcement Strip
                </label>
                <input
                  type="text"
                  value={info.announcement || ''}
                  onChange={(e) => setInfo({ ...info, announcement: e.target.value })}
                  placeholder="e.g. Lunch 12 PM - 4 PM. Special Nattu Kozhi roast on weekends."
                  className="w-full px-3 py-2 bg-white border border-[#6B1D28]/20 rounded text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#4F131C] text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#6B1D28] shadow transition-colors"
                >
                  Save Restaurant Information
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 6: GALLERY */}
        {activeTab === 'gallery' && (
          <div className="py-6 space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
              <p className="text-xs text-[#6B6661]">
                Photo gallery items for home and gallery pages.
              </p>
              <button
                onClick={() => setIsGalleryModalOpen(true)}
                className="px-4 py-2 bg-[#4F131C] text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-[#6B1D28] flex items-center space-x-1 shadow"
              >
                <Plus className="w-3.5 h-3.5 text-[#E09E2B]" />
                <span>Add Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((g) => (
                <div
                  key={g.id}
                  className="bg-[#FAF7F2] rounded border border-[#6B1D28]/15 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div className="h-44 bg-stone-200 relative">
                    <img src={g.image_url} alt={g.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white px-2 py-0.5 rounded">
                      {g.category}
                    </span>
                  </div>

                  <div className="p-3">
                    <h4 className="font-serif text-base font-bold text-[#4F131C]">{g.title}</h4>
                    {g.tamil_title && (
                      <span className="font-tamil text-xs text-[#C8861B] block">{g.tamil_title}</span>
                    )}

                    <div className="mt-3 pt-2 border-t border-[#6B1D28]/10 flex justify-between items-center text-xs">
                      <button
                        onClick={async () => {
                          await toggleGalleryFeatured(g.id, g.is_featured === 0);
                          loadAllAdminData();
                          onRefreshData();
                        }}
                        className={`text-[11px] font-semibold flex items-center space-x-1 ${
                          g.is_featured ? 'text-[#C8861B]' : 'text-stone-400 hover:text-stone-600'
                        }`}
                      >
                        <Star className={`w-3.5 h-3.5 ${g.is_featured ? 'fill-[#C8861B]' : ''}`} />
                        <span>{g.is_featured ? 'Featured' : 'Standard'}</span>
                      </button>

                      <button
                        onClick={() => handleDeleteGallery(g.id)}
                        className="text-rose-600 hover:text-rose-800 p-1"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 7: ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="py-6 space-y-6 animate-fadeIn">
            <p className="text-xs text-[#6B6661]">
              Table reservation and dining enquiries submitted by guests via the website. Stored in SQLite database.
            </p>

            <div className="bg-[#FAF7F2] rounded border border-[#6B1D28]/15 overflow-x-auto shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F4EFE7] border-b border-[#6B1D28]/10 text-[#4F131C] uppercase font-bold tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Ref</th>
                    <th className="py-3 px-3">Guest</th>
                    <th className="py-3 px-3">Contact</th>
                    <th className="py-3 px-3">Date & Slot</th>
                    <th className="py-3 px-3">Guests</th>
                    <th className="py-3 px-3">Message</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#6B1D28]/10 text-[#554E48]">
                  {enquiries.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-[#7A736C]">
                        No enquiries registered yet.
                      </td>
                    </tr>
                  ) : (
                    enquiries.map((enq) => (
                      <tr key={enq.id} className="hover:bg-[#F3EDE2]/50">
                        <td className="py-3 px-4 font-mono font-bold text-[#4F131C]">
                          #VM-{enq.id}
                        </td>
                        <td className="py-3 px-3 font-semibold text-[#242220]">
                          {enq.name}
                        </td>
                        <td className="py-3 px-3">
                          <a href={`tel:${enq.phone}`} className="font-semibold text-[#4F131C] hover:underline">
                            {enq.phone}
                          </a>
                          {enq.email && <span className="block text-[11px] text-[#7A736C]">{enq.email}</span>}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className="font-semibold block">{enq.date}</span>
                          <span className="text-[11px] text-[#7A736C]">{enq.time_slot}</span>
                        </td>
                        <td className="py-3 px-3 font-bold text-[#4F131C]">
                          {enq.guests} Pax
                        </td>
                        <td className="py-3 px-3 max-w-xs truncate" title={enq.message || ''}>
                          {enq.message || '—'}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              enq.status === 'pending'
                                ? 'bg-amber-100 text-amber-800'
                                : enq.status === 'contacted'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {enq.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end space-x-1">
                            {enq.status !== 'contacted' && (
                              <button
                                onClick={() => handleEnquiryStatus(enq.id, 'contacted')}
                                className="px-2 py-0.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-[10px]"
                              >
                                Contacted
                              </button>
                            )}
                            {enq.status !== 'completed' && (
                              <button
                                onClick={() => handleEnquiryStatus(enq.id, 'completed')}
                                className="px-2 py-0.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-[10px]"
                              >
                                Completed
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteEnquiry(enq.id)}
                              className="p-1 text-rose-600 hover:text-rose-800 ml-1"
                              title="Delete enquiry"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT DISH */}
        {isItemModalOpen && editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn">
            <div className="bg-[#FAF7F2] rounded border border-[#6B1D28]/30 max-w-lg w-full overflow-hidden shadow-2xl my-8">
              <div className="bg-[#4F131C] text-white p-4 flex justify-between items-center">
                <h3 className="font-serif text-xl font-bold">
                  {editingItem.id ? 'Edit Dish' : 'Add New Menu Dish'}
                </h3>
                <button
                  onClick={() => setIsItemModalOpen(false)}
                  className="p-1 rounded text-white/80 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveItem} className="p-5 space-y-3 text-xs">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                    Dish Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingItem.name || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-[#6B1D28]/20 rounded text-sm"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                    Tamil Name
                  </label>
                  <input
                    type="text"
                    value={editingItem.tamil_name || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, tamil_name: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-[#6B1D28]/20 rounded text-sm font-tamil"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                      Category *
                    </label>
                    <select
                      value={editingItem.category_id || categories[0]?.id}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, category_id: parseInt(e.target.value, 10) })
                      }
                      className="w-full px-2 py-1.5 bg-white border border-[#6B1D28]/20 rounded text-xs"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="1"
                      value={editingItem.price !== undefined ? editingItem.price : 200}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, price: parseFloat(e.target.value) || 0 })
                      }
                      className="w-full px-3 py-1.5 bg-white border border-[#6B1D28]/20 rounded text-sm font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={editingItem.description || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-[#6B1D28]/20 rounded text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                      Portion Detail
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 4 pieces, 250g, 1 plate"
                      value={editingItem.portion_detail || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, portion_detail: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-[#6B1D28]/20 rounded text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                      Image URL (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={editingItem.image_url || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, image_url: e.target.value })}
                      className="w-full px-3 py-1.5 bg-white border border-[#6B1D28]/20 rounded text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#6B1D28]/10">
                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingItem.is_veg === 1}
                      onChange={(e) => setEditingItem({ ...editingItem, is_veg: e.target.checked ? 1 : 0 })}
                    />
                    <span>Pure Veg</span>
                  </label>

                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingItem.is_spicy === 1}
                      onChange={(e) => setEditingItem({ ...editingItem, is_spicy: e.target.checked ? 1 : 0 })}
                    />
                    <span>Spicy</span>
                  </label>

                  <label className="flex items-center space-x-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingItem.is_featured === 1}
                      onChange={(e) => setEditingItem({ ...editingItem, is_featured: e.target.checked ? 1 : 0 })}
                    />
                    <span>Signature</span>
                  </label>
                </div>

                <div className="pt-3 flex justify-end space-x-2 border-t border-[#6B1D28]/10">
                  <button
                    type="button"
                    onClick={() => setIsItemModalOpen(false)}
                    className="px-4 py-2 border border-[#6B1D28]/20 text-[#554E48] rounded hover:bg-[#EFE8DD]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#4F131C] text-white rounded font-semibold uppercase tracking-wider hover:bg-[#6B1D28]"
                  >
                    Save Dish
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT CATEGORY */}
        {isCategoryModalOpen && editingCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn">
            <div className="bg-[#FAF7F2] rounded border border-[#6B1D28]/30 max-w-md w-full overflow-hidden shadow-2xl">
              <div className="bg-[#4F131C] text-white p-4 flex justify-between items-center">
                <h3 className="font-serif text-xl font-bold">
                  {editingCategory.id ? 'Edit Category' : 'Add Category'}
                </h3>
                <button
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="p-1 rounded text-white/80 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!editingCategory.name) return;
                  const slug =
                    editingCategory.slug ||
                    editingCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  try {
                    if (editingCategory.id) {
                      await updateCategory(editingCategory.id, { ...editingCategory, slug });
                      triggerFeedback('Category updated');
                    } else {
                      await createCategory({ ...editingCategory, slug });
                      triggerFeedback('Category created');
                    }
                    setIsCategoryModalOpen(false);
                    loadAllAdminData();
                    onRefreshData();
                  } catch (err: any) {
                    alert(err.message || 'Failed to save category');
                  }
                }}
                className="p-5 space-y-3 text-xs"
              >
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                    Category Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingCategory.name || ''}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-[#6B1D28]/20 rounded"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                    Tamil Title
                  </label>
                  <input
                    type="text"
                    value={editingCategory.tamil_name || ''}
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, tamil_name: e.target.value })
                    }
                    className="w-full px-3 py-1.5 bg-white border border-[#6B1D28]/20 rounded font-tamil"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={editingCategory.description || ''}
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, description: e.target.value })
                    }
                    className="w-full px-3 py-1.5 bg-white border border-[#6B1D28]/20 rounded"
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsCategoryModalOpen(false)}
                    className="px-4 py-2 border border-[#6B1D28]/20 text-[#554E48] rounded hover:bg-[#EFE8DD]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#4F131C] text-white rounded font-semibold uppercase tracking-wider hover:bg-[#6B1D28]"
                  >
                    Save Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD GALLERY PHOTO */}
        {isGalleryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn">
            <div className="bg-[#FAF7F2] rounded border border-[#6B1D28]/30 max-w-md w-full overflow-hidden shadow-2xl">
              <div className="bg-[#4F131C] text-white p-4 flex justify-between items-center">
                <h3 className="font-serif text-xl font-bold">Add Photo to Gallery</h3>
                <button
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="p-1 rounded text-white/80 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddGalleryItem} className="p-5 space-y-3 text-xs">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                    Photo Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newGalleryItem.title}
                    onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-[#6B1D28]/20 rounded"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                    Tamil Title
                  </label>
                  <input
                    type="text"
                    value={newGalleryItem.tamil_title}
                    onChange={(e) =>
                      setNewGalleryItem({ ...newGalleryItem, tamil_title: e.target.value })
                    }
                    className="w-full px-3 py-1.5 bg-white border border-[#6B1D28]/20 rounded font-tamil"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                    Category *
                  </label>
                  <select
                    value={newGalleryItem.category}
                    onChange={(e: any) =>
                      setNewGalleryItem({ ...newGalleryItem, category: e.target.value })
                    }
                    className="w-full px-2 py-1.5 bg-white border border-[#6B1D28]/20 rounded"
                  >
                    <option value="Food">Food</option>
                    <option value="Ambiance">Ambiance</option>
                    <option value="Kitchen">Kitchen</option>
                    <option value="Heritage">Heritage</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={newGalleryItem.image_url}
                    onChange={(e) =>
                      setNewGalleryItem({ ...newGalleryItem, image_url: e.target.value })
                    }
                    className="w-full px-3 py-1.5 bg-white border border-[#6B1D28]/20 rounded"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-[#4F131C] mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={newGalleryItem.description}
                    onChange={(e) =>
                      setNewGalleryItem({ ...newGalleryItem, description: e.target.value })
                    }
                    className="w-full px-3 py-1.5 bg-white border border-[#6B1D28]/20 rounded"
                  />
                </div>

                <div className="pt-2 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsGalleryModalOpen(false)}
                    className="px-4 py-2 border border-[#6B1D28]/20 text-[#554E48] rounded hover:bg-[#EFE8DD]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#4F131C] text-white rounded font-semibold uppercase tracking-wider hover:bg-[#6B1D28]"
                  >
                    Add Photo
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
