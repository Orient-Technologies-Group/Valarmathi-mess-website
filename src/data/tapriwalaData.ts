export interface MenuItem {
  id: string;
  name: string;
  category: 'Chai & Hot Brews' | 'Cold Sips' | 'Street Food & Chaat' | 'Sandwiches & Wraps' | 'Maggi';
  price: string;
  priceNote?: string;
  description: string;
  image?: string;
  isSignature?: boolean;
  isJainAvailable?: boolean;
  tags?: string[];
}

export interface Outlet {
  id: string;
  name: string;
  type: string;
  address: string;
  phone?: string;
  hours?: string;
  detail: string;
  mapsUrl: string;
  image: string;
  featuredPill: string;
}

export interface ChaiPairing {
  id: string;
  mood: string;
  drinkName: string;
  drinkPrice: string;
  drinkDesc: string;
  drinkImage: string;
  snackName: string;
  snackPrice: string;
  snackDesc: string;
  snackImage: string;
  whyItWorks: string;
  menuItemIds: string[];
}

export const SIGNATURE_DISHES: MenuItem[] = [
  {
    id: 'special-chai',
    name: 'Tapriwala Special Chai',
    category: 'Chai & Hot Brews',
    price: '₹40',
    description: 'Fresh pudina, crushed ginger, and elaichi in our signature house brew, served piping hot in an authentic clay kulhad.',
    image: '/images/kulhad-chai.jpg',
    isSignature: true,
    isJainAvailable: true,
    tags: ['House Signature', 'Clay Kulhad', 'Pure Veg']
  },
  {
    id: 'cold-cocoa',
    name: 'Surat Special Cold Cocoa',
    category: 'Cold Sips',
    price: '₹108',
    description: 'An ultra-thick, rich chilled chocolate favourite straight from Gujarat street culture, crowned with shaved dark chocolate curls.',
    image: '/images/cold-cocoa.jpg',
    isSignature: true,
    isJainAvailable: true,
    tags: ['Decadent Chilled', 'Fan Favourite']
  },
  {
    id: 'vada-pav',
    name: 'Mumbai Vada Pav',
    category: 'Street Food & Chaat',
    price: '₹50–₹75',
    priceNote: 'Available variants: Classic ₹50, Schezwan ₹65, Cheese ₹75',
    description: 'Authentic Bombay comfort featuring a golden spiced potato batata vada, fiery green coriander chutney, and dry garlic thecha in a soft pav.',
    image: '/images/vada-pav.jpg',
    isSignature: true,
    isJainAvailable: false,
    tags: ['Bombay Classic', 'Spicy']
  },
  {
    id: 'paneer-sandwich',
    name: 'Paneer Cheese Burst Sandwich',
    category: 'Sandwiches & Wraps',
    price: '₹140',
    description: 'Crisp golden grilled artisanal bread packed with succulent marinated cottage cheese cubes, chopped bell peppers, and gooey melted cheese.',
    image: '/images/paneer-sandwich.jpg',
    isSignature: true,
    isJainAvailable: true,
    tags: ['Chef Recommendation', 'Loaded Cheese']
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // Chai & Hot Brews
  {
    id: 'special-chai-menu',
    name: 'Tapriwala Special Chai',
    category: 'Chai & Hot Brews',
    price: '₹40',
    description: 'Fresh pudina, crushed ginger, and elaichi in our signature house brew served in a traditional clay kulhad.',
    image: '/images/kulhad-chai.jpg',
    isSignature: true,
    isJainAvailable: true,
    tags: ['Signature', 'Kulhad']
  },
  {
    id: 'adrak-chai',
    name: 'Adrak Chai',
    category: 'Chai & Hot Brews',
    price: '₹30–₹35',
    description: 'Freshly pounded ginger roots simmered with strong Assam tea leaves and wholesome milk for a warming kick.',
    image: '/images/real/real_adrak_chai.png',
    isJainAvailable: false,
    tags: ['Kadak', 'Immunity']
  },
  {
    id: 'elaichi-chai',
    name: 'Elaichi Chai',
    category: 'Chai & Hot Brews',
    price: '₹30–₹35',
    description: 'Fragrant green cardamom pods gently bruised and infused into slow-steeped sweet milk chai.',
    image: '/images/real/real_elaichi_chai.png',
    isJainAvailable: true,
    tags: ['Aromatic', 'Mild']
  },
  {
    id: 'masala-chai',
    name: 'Masala Chai',
    category: 'Chai & Hot Brews',
    price: '₹30–₹35',
    description: 'A comforting blend of clove, black pepper, cinnamon, ginger, and cardamom blended with rich tea.',
    image: '/images/real/real_masala_chai.png',
    isJainAvailable: true,
    tags: ['Traditional Spice']
  },
  {
    id: 'sulaimani-chai',
    name: 'Sulaimani Chai',
    category: 'Chai & Hot Brews',
    price: '₹30',
    description: 'Clear golden spiced black tea infused with fresh mint leaves, lemon twist, and sweet warming spices.',
    image: '/images/real/real_sulaimani_chai.png',
    isJainAvailable: true,
    tags: ['Black Tea', 'Digestive']
  },
  {
    id: 'kashmiri-kahwa',
    name: 'Kashmiri Kahwa',
    category: 'Chai & Hot Brews',
    price: '₹60',
    description: 'Kashmiri saffron green tea brewed with whole green cardamom, cinnamon, and crunchy slivered almonds.',
    image: '/images/real/real_elaichi_chai.png',
    isJainAvailable: true,
    tags: ['Saffron', 'Nutty']
  },
  {
    id: 'filter-coffee',
    name: 'South Indian Filter Coffee',
    category: 'Chai & Hot Brews',
    price: 'Ask in store',
    description: 'Traditional slow-dripped chicory-coffee decoction frothed vigorously with creamy boiled milk in a dabara set.',
    image: '/images/real/real_masala_chai.png',
    isJainAvailable: true,
    tags: ['Coimbatore Special']
  },
  {
    id: 'hot-chocolate',
    name: 'Hot Chocolate',
    category: 'Chai & Hot Brews',
    price: 'Ask in store',
    description: 'Velvety dark chocolate melted smoothly with rich steamed milk, served warm for cozy evenings.',
    image: '/images/cold-cocoa.jpg',
    isJainAvailable: true,
    tags: ['Comfort']
  },

  // Cold Sips
  {
    id: 'cold-cocoa-menu',
    name: 'Surat Special Cold Cocoa',
    category: 'Cold Sips',
    price: '₹108',
    description: 'An ultra-thick, rich chilled chocolate favourite straight from Gujarat street culture with chocolate curls.',
    image: '/images/cold-cocoa.jpg',
    isSignature: true,
    isJainAvailable: true,
    tags: ['Ultra Thick', 'Surat Original']
  },
  {
    id: 'cold-horlicks',
    name: 'Cold Horlicks',
    category: 'Cold Sips',
    price: '₹80',
    description: 'Childhood nostalgia blended icy cold with malted milk sweetness and a chocolate malt crown.',
    image: '/images/cold-cocoa.jpg',
    isJainAvailable: true,
    tags: ['Nostalgic', 'Chilled']
  },
  {
    id: 'lemon-iced-tea',
    name: 'Lemon Iced Tea',
    category: 'Cold Sips',
    price: '₹70–₹90',
    description: 'Freshly brewed black tea infused with real lemon citrus and fresh mint, served over crystal ice cubes.',
    image: '/images/real/real_sulaimani_chai.png',
    isJainAvailable: true,
    tags: ['Refreshing', 'Citrus']
  },
  {
    id: 'peach-iced-tea',
    name: 'Peach Iced Tea',
    category: 'Cold Sips',
    price: '₹70–₹90',
    description: 'Sweet orchard peach infusion blended with cold Assam tea and topped with crushed ice.',
    image: '/images/real/real_sulaimani_chai.png',
    isJainAvailable: true,
    tags: ['Fruity', 'Chilled']
  },
  {
    id: 'mint-mojito',
    name: 'Mint Mojito',
    category: 'Cold Sips',
    price: '₹70–₹90',
    description: 'Hand-muddled fresh garden mint and lime wedges with sparkling soda and chilled sweetness.',
    image: '/images/real/real_adrak_chai.png',
    isJainAvailable: true,
    tags: ['Sparkling', 'Cooling']
  },
  {
    id: 'green-apple-mojito',
    name: 'Green Apple Mojito',
    category: 'Cold Sips',
    price: '₹70–₹90',
    description: 'Crisp green apple syrup with fresh lime sprigs, effervescent fizz, and cracked ice.',
    image: '/images/real/real_adrak_chai.png',
    isJainAvailable: true,
    tags: ['Tart & Sweet']
  },
  {
    id: 'cold-coffee',
    name: 'Classic Cold Coffee',
    category: 'Cold Sips',
    price: 'Ask in store',
    description: 'Creamy, thick, and well-balanced cafe cold coffee blended with rich espresso and chilled milk.',
    image: '/images/cold-cocoa.jpg',
    isJainAvailable: true,
    tags: ['Cafe Staple']
  },

  // Street Food & Chaat
  {
    id: 'classic-vada-pav',
    name: 'Classic Mumbai Vada Pav',
    category: 'Street Food & Chaat',
    price: '₹50–₹75',
    description: 'Bombay street favourite with a spiced potato fritter, fiery mint-coriander chutney, and roasted garlic thecha.',
    image: '/images/real/real_vada_pav.jpg',
    isSignature: true,
    isJainAvailable: false,
    tags: ['Street Food', 'Mumbai']
  },
  {
    id: 'schezwan-vada-pav',
    name: 'Schezwan Vada Pav',
    category: 'Street Food & Chaat',
    price: '₹50–₹75',
    description: 'Crispy batata vada tossed in punchy Indo-Chinese schezwan sauce and tucked inside butter-toasted pav.',
    image: '/images/real/real_vada_pav.jpg',
    isJainAvailable: false,
    tags: ['Fusion', 'Spicy']
  },
  {
    id: 'cheese-vada-pav',
    name: 'Cheese Vada Pav',
    category: 'Street Food & Chaat',
    price: '₹50–₹75',
    description: 'Warm batata vada blanketed in gooey melted processed cheese, sweet chutney, and spicy dry garlic sprinkle.',
    image: '/images/vada-pav.jpg',
    isJainAvailable: false,
    tags: ['Cheesy']
  },
  {
    id: 'chana-jor-garam',
    name: 'Chana Jor Garam',
    category: 'Street Food & Chaat',
    price: '₹126',
    description: 'Crispy pressed spiced black chickpeas tossed with chopped red onions, tomatoes, green chilies, and lime juice.',
    image: '/images/bombay-toast.jpg',
    isJainAvailable: true,
    tags: ['Desi Crunch', 'High Protein']
  },
  {
    id: 'mumbai-pav-bhaji',
    name: 'Mumbai Pav Bhaji',
    category: 'Street Food & Chaat',
    price: '₹120',
    description: 'A steaming mash of cauliflower, green peas, potatoes, and tomatoes cooked with fragrant bhaji masala and Amul butter.',
    image: '/images/real/real_pav_bhaji.jpg',
    isJainAvailable: true,
    tags: ['Butter Pav', 'Comfort']
  },
  {
    id: 'cheese-pav-bhaji',
    name: 'Cheese Pav Bhaji',
    category: 'Street Food & Chaat',
    price: 'Ask in store',
    description: 'Signature Mumbai bhaji generously loaded with grated cheese, served alongside hot golden toasted pavs.',
    image: '/images/pav-bhaji.jpg',
    isJainAvailable: true,
    tags: ['Cheesy Indulgence']
  },
  {
    id: 'dahi-papdi-chaat',
    name: 'Dahi Papdi Chaat',
    category: 'Street Food & Chaat',
    price: '₹80–₹110',
    description: 'Crisp handmade papdis topped with seasoned potatoes, creamy chilled yogurt, date-tamarind chutney, and roasted cumin.',
    image: '/images/bombay-toast.jpg',
    isJainAvailable: true,
    tags: ['Sweet & Tangy', 'Cooling']
  },
  {
    id: 'sev-puri',
    name: 'Sev Puri',
    category: 'Street Food & Chaat',
    price: '₹80–₹110',
    description: 'Crisp puris loaded with diced potatoes, raw onions, fiery red garlic paste, tangy chutneys, and a mound of nylon sev.',
    image: '/images/bombay-toast.jpg',
    isJainAvailable: true,
    tags: ['Chaat Staple']
  },
  {
    id: 'bhel-puri',
    name: 'Bhel Puri',
    category: 'Street Food & Chaat',
    price: '₹80–₹110',
    description: 'Light puffed rice tossed fresh with roasted peanuts, crushed papdi, spicy chutney, and fresh coriander leaves.',
    image: '/images/bombay-toast.jpg',
    isJainAvailable: true,
    tags: ['Light Crunch']
  },
  {
    id: 'samosa-chaat',
    name: 'Samosa Chaat',
    category: 'Street Food & Chaat',
    price: '₹80–₹110',
    description: 'Golden Punjabi samosa crushed and layered with spiced chole gravy, whipped sweet yogurt, and sev.',
    image: '/images/bombay-toast.jpg',
    isJainAvailable: false,
    tags: ['Warm & Hearty']
  },

  // Sandwiches & Wraps
  {
    id: 'paneer-sandwich-menu',
    name: 'Paneer Cheese Burst Sandwich',
    category: 'Sandwiches & Wraps',
    price: '₹140',
    description: 'Grilled artisanal bread, marinated spiced paneer, melted cheese, and emerald green mint chutney.',
    image: '/images/paneer-sandwich.jpg',
    isSignature: true,
    isJainAvailable: true,
    tags: ['House Signature', 'Cheese Burst']
  },
  {
    id: 'bombay-masala-toast',
    name: 'Bombay Masala Toast',
    category: 'Sandwiches & Wraps',
    price: '₹90',
    description: 'Triple-decker toasted bread filled with spiced potato masala, crisp cucumber, beetroot, and mint chutney.',
    image: '/images/bombay-toast.jpg',
    isJainAvailable: false,
    tags: ['Street Icon']
  },
  {
    id: 'cheesy-paneer-wrap',
    name: 'Cheesy Paneer Wrap',
    category: 'Sandwiches & Wraps',
    price: '₹120',
    description: 'Warm wholewheat roll stuffed with spiced paneer tikka chunks, crunchy cabbage, and melted cheese sauce.',
    image: '/images/real/real_tapri_sandwich.jpg',
    isJainAvailable: true,
    tags: ['Grab & Go']
  },
  {
    id: 'bun-chutney-maska',
    name: 'Bun Chutney Maska',
    category: 'Sandwiches & Wraps',
    price: '₹60–₹80',
    description: 'Pillow-soft bakery bun thickly spread with salted butter and house-made green coriander-mint chutney.',
    image: '/images/real/real_chutney_sandwich.jpg',
    isJainAvailable: true,
    tags: ['Tea Companion']
  },
  {
    id: 'grilled-chutney-cheese',
    name: 'Grilled Chutney Cheese Sandwich',
    category: 'Sandwiches & Wraps',
    price: '₹100–₹120',
    description: 'Crisp grilled bread layered with homemade coriander chutney and bubbling melted cheddar.',
    image: '/images/real/real_chutney_sandwich.jpg',
    isJainAvailable: true,
    tags: ['Crispy Grill']
  },
  {
    id: 'chilli-cheese-toast',
    name: 'Chilli Cheese Toast',
    category: 'Sandwiches & Wraps',
    price: 'Ask in store',
    description: 'Golden toast topped with finely diced green chilies, bell peppers, and broiled bubbly cheese.',
    image: '/images/real/real_cheese_toast.png',
    isJainAvailable: true,
    tags: ['Spicy Crunch']
  },

  // Maggi
  {
    id: 'plain-butter-maggi',
    name: 'Plain Butter Maggi',
    category: 'Maggi',
    price: '₹60–₹85',
    description: 'Comforting piping-hot 2-minute noodles cooked to perfection with an extra dollop of salted golden butter.',
    image: '/images/real/real_classic_maggi.png',
    isJainAvailable: true,
    tags: ['Classic Desi']
  },
  {
    id: 'vegetable-maggi',
    name: 'Vegetable Maggi',
    category: 'Maggi',
    price: '₹60–₹85',
    description: 'Noodles tossed with sauteed bell peppers, sweet corn, green peas, carrots, and house special spice mix.',
    image: '/images/real/real_special_maggi.png',
    isJainAvailable: true,
    tags: ['Veg Loaded']
  },
  {
    id: 'peri-peri-cheese-maggi',
    name: 'Peri-Peri Cheese Maggi',
    category: 'Maggi',
    price: '₹60–₹85',
    description: 'Fiery peri-peri seasoned Maggi noodles crowned with a generous blanket of melted processed cheese.',
    image: '/images/real/real_special_maggi.png',
    isJainAvailable: true,
    tags: ['Fiery Cheese']
  }
];

export const CHAI_PAIRINGS: ChaiPairing[] = [
  {
    id: 'quick-chai-break',
    mood: 'A quick chai break',
    drinkName: 'Tapriwala Special Chai',
    drinkPrice: '₹40',
    drinkDesc: 'Pudina, ginger & elaichi house brew in clay kulhad',
    drinkImage: '/images/kulhad-chai.jpg',
    snackName: 'Bombay Masala Toast',
    snackPrice: '₹90',
    snackDesc: 'Toasted spiced potato & chutney sandwich with sev',
    snackImage: '/images/bombay-toast.jpg',
    whyItWorks: 'The earthy warmth of ginger and elaichi cuts through the crisp, buttery spiced potatoes like a dream.',
    menuItemIds: ['special-chai-menu', 'bombay-masala-toast']
  },
  {
    id: 'something-chocolatey',
    mood: 'Something chocolatey',
    drinkName: 'Surat Special Cold Cocoa',
    drinkPrice: '₹108',
    drinkDesc: 'Ultra-thick chilled chocolate with dark shavings',
    drinkImage: '/images/cold-cocoa.jpg',
    snackName: 'Classic Mumbai Vada Pav',
    snackPrice: '₹50–₹75',
    snackDesc: 'Spicy batata vada with garlic thecha and chutneys',
    snackImage: '/images/real/real_vada_pav.jpg',
    whyItWorks: 'The ultimate contrast: intensely spicy garlic thecha balanced by decadent, velvety thick cold cocoa.',
    menuItemIds: ['cold-cocoa-menu', 'classic-vada-pav']
  },
  {
    id: 'proper-desi-comfort',
    mood: 'Proper desi comfort',
    drinkName: 'Sulaimani Chai',
    drinkPrice: '₹30',
    drinkDesc: 'Golden black tea with lemon, mint & whole spices',
    drinkImage: '/images/real/real_sulaimani_chai.png',
    snackName: 'Mumbai Pav Bhaji',
    snackPrice: '₹120',
    snackDesc: 'Rich spiced vegetable mash with hot butter pav',
    snackImage: '/images/real/real_pav_bhaji.jpg',
    whyItWorks: 'A heavy, rich, buttery plate of pav bhaji is followed naturally by the light, citrusy digestion of warm Sulaimani.',
    menuItemIds: ['sulaimani-chai', 'mumbai-pav-bhaji']
  },
  {
    id: 'cheesy-craving',
    mood: 'A cheesy craving',
    drinkName: 'Tapriwala Special Chai',
    drinkPrice: '₹40',
    drinkDesc: 'Fresh pudina, ginger & elaichi house brew',
    drinkImage: '/images/kulhad-chai.jpg',
    snackName: 'Paneer Cheese Burst Sandwich',
    snackPrice: '₹140',
    snackDesc: 'Grilled artisanal bread with spiced paneer & mozzarella',
    snackImage: '/images/paneer-sandwich.jpg',
    whyItWorks: 'Melted cheese pull and marinated paneer goodness paired with our hot, spiced kadak tea.',
    menuItemIds: ['special-chai-menu', 'paneer-sandwich-menu']
  }
];

export const OUTLETS: Outlet[] = [
  {
    id: 'rs-puram',
    name: 'R.S. Puram — Flagship Cafe',
    type: 'Dine-in Cafe & Lounge',
    address: '551-B Lokamanya Street (West), Diwan Bahadur (DB) Road Corner, R.S. Puram, Coimbatore, Tamil Nadu – 641002',
    phone: '+91 80565 44622',
    hours: 'Monday – Sunday: 11:00 AM – 10:30 PM',
    detail: 'Cozy indoor seating, board games on the tables (Jenga, Scrabble, Uno), warm lighting, and relaxed conversations.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tapriwala+The+Contemporary+Tea+Cafe+551-B+Lokamanya+Street+West+DB+Road+Corner+RS+Puram+Coimbatore+641002',
    image: '/images/swiggy_rspuram.jpg',
    featuredPill: 'Flagship Outlet · Board Games'
  },
  {
    id: 'saibaba-colony',
    name: 'Saibaba Colony',
    type: 'Neighborhood Cafe',
    address: '32, Alagesan Road, Saibaba Colony, Coimbatore, Tamil Nadu – 641011',
    phone: '+91 80565 41119',
    hours: 'Monday – Sunday: 11:00 AM – 10:30 PM',
    detail: 'Warm neighborhood spot ideal for after-work chai breaks, evening street chaat, and quick gatherings with friends.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tapriwala+32+Alagesan+Road+Saibaba+Colony+Coimbatore+641011',
    image: '/images/swiggy_saibaba.jpg',
    featuredPill: 'Neighborhood Favorite'
  },
  {
    id: 'express-kiosk',
    name: 'Tapriwala Express',
    type: 'Grab-and-Go Kiosk',
    address: '130, Venkatasamy Road West, R.S. Puram, Coimbatore, Tamil Nadu – 641002',
    phone: undefined,
    hours: undefined,
    detail: 'A quick grab-and-go kiosk for wraps, burgers, quick snacks, and steaming beverages on the move.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tapriwala+Express+130+Venkatasamy+Road+West+RS+Puram+Coimbatore+641002',
    image: '/images/swiggy_peelamedu.jpg',
    featuredPill: 'Quick Kiosk · Fast Service'
  }
];

export const BRAND_PROMISES = [
  {
    id: 'pure-veg',
    title: '100% Pure Vegetarian',
    description: 'Every single brew, snack, chaat, and toast prepared in a strictly vegetarian kitchen.',
    badge: 'Pure Vegetarian'
  },
  {
    id: 'jain-options',
    title: 'Jain Options On Request',
    description: 'Thoughtfully prepared root-free variants available across chai, chaats, sandwiches, and Maggi.',
    badge: 'Jain Friendly'
  },
  {
    id: 'no-preservatives',
    title: 'Zero Artificial Colours',
    description: 'Pure spices, fresh herbs, real ginger, and no packet chemical preservatives in our food.',
    badge: 'Natural & Fresh'
  },
  {
    id: 'pocket-friendly',
    title: 'Pocket-Friendly Prices',
    description: 'High-quality cafe experience rooted in street hospitality—an easy chai break for two at ₹200–₹400.',
    badge: 'Honest Value'
  }
];
