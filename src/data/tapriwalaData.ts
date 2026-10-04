export interface MenuItem {
  id: string;
  name: string;
  category: 'Chai & Hot Brews' | 'Cold Sips' | 'Street Food & Chaat' | 'Sandwiches & Wraps' | 'Maggi';
  price: string;
  numericPrice: number;
  description: string;
  tasteNotes?: string;
  flavorProfile?: {
    sweetness?: number; // 1-5
    spice?: number;     // 1-5
    warmth?: number;    // 1-5
    richness?: number;  // 1-5
  };
  bestPairedWith?: string;
  image?: string;
  isSignature?: boolean;
  isJainAvailable?: boolean;
  tags?: string[];
  priceNote?: string;
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
  amenities: string[];
  callWriteup?: string;
}

export interface GoogleReview {
  id: string;
  author: string;
  outlet: string;
  rating: number;
  date: string;
  comment: string;
  highlight: string;
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
    numericPrice: 40,
    description: 'Fresh pudina, crushed ginger, and elaichi in our signature house brew, served piping hot in an authentic clay kulhad.',
    tasteNotes: 'Cardamom-forward aroma, fiery warmth of freshly grated ginger, cooling hint of garden mint on the finish.',
    flavorProfile: { spice: 3, sweetness: 3, warmth: 5, richness: 4 },
    bestPairedWith: 'Bombay Masala Toast or Mumbai Vada Pav',
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
    numericPrice: 108,
    description: 'An ultra-thick, rich chilled chocolate favourite straight from Gujarat street culture, crowned with shaved dark chocolate curls.',
    tasteNotes: 'Decadent dark chocolate ganache texture, ice-cold velvet consistency, bitter-sweet artisan shavings.',
    flavorProfile: { spice: 1, sweetness: 5, warmth: 1, richness: 5 },
    bestPairedWith: 'Classic Mumbai Vada Pav for the ultimate sweet-spicy contrast',
    image: '/images/cold-cocoa.jpg',
    isSignature: true,
    isJainAvailable: true,
    tags: ['Decadent Chilled', 'Fan Favourite']
  },
  {
    id: 'vada-pav',
    name: 'Classic Mumbai Vada Pav',
    category: 'Street Food & Chaat',
    price: '₹55',
    numericPrice: 55,
    description: 'Authentic Bombay comfort featuring a golden spiced potato batata vada, fiery green coriander chutney, and dry garlic thecha in a soft pav.',
    tasteNotes: 'Crunchy golden besan crust, mustard-seed tempered potatoes, zesty mint punch, and smoky roasted garlic chili heat.',
    flavorProfile: { spice: 4, sweetness: 1, warmth: 4, richness: 3 },
    bestPairedWith: 'Hot Tapriwala Special Chai or Sulaimani',
    image: '/images/real/real_vada_pav.jpg',
    isSignature: true,
    isJainAvailable: false,
    tags: ['Bombay Classic', 'Spicy']
  },
  {
    id: 'paneer-sandwich',
    name: 'Paneer Cheese Burst Sandwich',
    category: 'Sandwiches & Wraps',
    price: '₹140',
    numericPrice: 140,
    description: 'Crisp golden grilled artisanal bread packed with succulent marinated cottage cheese cubes, chopped bell peppers, and gooey melted cheese.',
    tasteNotes: 'Toasted buttery grill crust, molten mozzarella pull, spiced tikka-style soft paneer, and spicy mint dip.',
    flavorProfile: { spice: 2, sweetness: 1, warmth: 4, richness: 5 },
    bestPairedWith: 'Adrak Chai or Iced Peach Tea',
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
    numericPrice: 40,
    description: 'Fresh pudina, crushed ginger, and elaichi in our signature house brew served in a traditional clay kulhad.',
    tasteNotes: 'Rich Assam black tea, bruised green cardamom, mountain ginger, and fresh spearmint leaves.',
    flavorProfile: { spice: 3, sweetness: 3, warmth: 5, richness: 4 },
    bestPairedWith: 'Bombay Masala Toast',
    image: '/images/kulhad-chai.jpg',
    isSignature: true,
    isJainAvailable: true,
    tags: ['Signature', 'Clay Kulhad']
  },
  {
    id: 'adrak-chai',
    name: 'Adrak Chai',
    category: 'Chai & Hot Brews',
    price: '₹40',
    numericPrice: 40,
    description: 'Freshly pounded ginger roots simmered with strong Assam tea leaves and wholesome milk for a warming kick.',
    tasteNotes: 'Robust peppery heat, soothing throat warmth, bold kadak brew.',
    flavorProfile: { spice: 4, sweetness: 2, warmth: 5, richness: 3 },
    bestPairedWith: 'Bun Chutney Maska',
    image: '/images/real/real_adrak_chai.png',
    isJainAvailable: false,
    tags: ['Kadak', 'Immunity']
  },
  {
    id: 'elaichi-chai',
    name: 'Elaichi Chai',
    category: 'Chai & Hot Brews',
    price: '₹40',
    numericPrice: 40,
    description: 'Fragrant green cardamom pods gently bruised and infused into slow-steeped sweet milk chai.',
    tasteNotes: 'Sweet herbal floral notes, silky smooth body, delicate spice finish.',
    flavorProfile: { spice: 2, sweetness: 3, warmth: 4, richness: 4 },
    bestPairedWith: 'Grilled Chutney Cheese Sandwich',
    image: '/images/real/real_elaichi_chai.png',
    isJainAvailable: true,
    tags: ['Aromatic', 'Mild']
  },
  {
    id: 'masala-chai',
    name: 'Masala Chai',
    category: 'Chai & Hot Brews',
    price: '₹40',
    numericPrice: 40,
    description: 'A comforting blend of clove, black pepper, cinnamon, ginger, and cardamom blended with rich tea.',
    tasteNotes: 'Complex warming spice symphony, deep tea body, lingering cinnamon warmth.',
    flavorProfile: { spice: 4, sweetness: 3, warmth: 5, richness: 4 },
    bestPairedWith: 'Samosa Chaat',
    image: '/images/real/real_masala_chai.png',
    isJainAvailable: true,
    tags: ['Traditional Spice']
  },
  {
    id: 'sulaimani-chai',
    name: 'Sulaimani Chai',
    category: 'Chai & Hot Brews',
    price: '₹30',
    numericPrice: 30,
    description: 'Clear golden spiced black tea infused with fresh mint leaves, lemon twist, and sweet warming spices.',
    tasteNotes: 'Bright citrus tang, fragrant mint freshness, zero dairy, light digestive brew.',
    flavorProfile: { spice: 2, sweetness: 2, warmth: 4, richness: 1 },
    bestPairedWith: 'Mumbai Pav Bhaji',
    image: '/images/real/real_sulaimani_chai.png',
    isJainAvailable: true,
    tags: ['Black Tea', 'Digestive']
  },
  {
    id: 'kashmiri-kahwa',
    name: 'Kashmiri Kahwa',
    category: 'Chai & Hot Brews',
    price: '₹60',
    numericPrice: 60,
    description: 'Kashmiri saffron green tea brewed with whole green cardamom, cinnamon, and crunchy slivered almonds.',
    tasteNotes: 'Royally aromatic saffron aroma, toasted nutty crunch, gentle herbal soothing.',
    flavorProfile: { spice: 2, sweetness: 3, warmth: 4, richness: 3 },
    bestPairedWith: 'Light tea-time biscuits',
    image: '/images/real/real_elaichi_chai.png',
    isJainAvailable: true,
    tags: ['Saffron', 'Nutty']
  },
  {
    id: 'filter-coffee',
    name: 'South Indian Filter Coffee',
    category: 'Chai & Hot Brews',
    price: '₹45',
    numericPrice: 45,
    description: 'Traditional slow-dripped chicory-coffee decoction frothed vigorously with creamy boiled milk in a dabara set.',
    tasteNotes: 'Bold roasted aroma, frothy milk crown, bittersweet dark roast body.',
    flavorProfile: { spice: 1, sweetness: 3, warmth: 5, richness: 4 },
    bestPairedWith: 'Bun Butter Jam',
    image: '/images/real/real_masala_chai.png',
    isJainAvailable: true,
    tags: ['Coimbatore Special']
  },
  {
    id: 'hot-chocolate',
    name: 'Hot Chocolate',
    category: 'Chai & Hot Brews',
    price: '₹90',
    numericPrice: 90,
    description: 'Velvety dark chocolate melted smoothly with rich steamed milk, served warm for cozy evenings.',
    tasteNotes: 'Melted cocoa silk, deep chocolate warmth, lightly sweet comforting cup.',
    flavorProfile: { spice: 1, sweetness: 4, warmth: 4, richness: 5 },
    bestPairedWith: 'Chilli Cheese Toast',
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
    numericPrice: 108,
    description: 'An ultra-thick, rich chilled chocolate favourite straight from Gujarat street culture with chocolate curls.',
    tasteNotes: 'Custard-thick decadent cocoa, ice-cold chill, artisan dark chocolate shavings.',
    flavorProfile: { spice: 1, sweetness: 5, warmth: 1, richness: 5 },
    bestPairedWith: 'Classic Mumbai Vada Pav',
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
    numericPrice: 80,
    description: 'Childhood nostalgia blended icy cold with malted milk sweetness and a chocolate malt crown.',
    tasteNotes: 'Rich malted grain sweetness, creamy frothy milk, nostalgic comfort.',
    flavorProfile: { spice: 1, sweetness: 4, warmth: 1, richness: 4 },
    bestPairedWith: 'Cheese Vada Pav',
    image: '/images/cold-cocoa.jpg',
    isJainAvailable: true,
    tags: ['Nostalgic', 'Chilled']
  },
  {
    id: 'lemon-iced-tea',
    name: 'Lemon Iced Tea',
    category: 'Cold Sips',
    price: '₹80',
    numericPrice: 80,
    description: 'Freshly brewed black tea infused with real lemon citrus and fresh mint, served over crystal ice cubes.',
    tasteNotes: 'Tart lemon splash, tannic tea backbone, cooling mint aroma.',
    flavorProfile: { spice: 1, sweetness: 3, warmth: 1, richness: 1 },
    bestPairedWith: 'Peri-Peri Cheese Maggi',
    image: '/images/real/real_sulaimani_chai.png',
    isJainAvailable: true,
    tags: ['Refreshing', 'Citrus']
  },
  {
    id: 'peach-iced-tea',
    name: 'Peach Iced Tea',
    category: 'Cold Sips',
    price: '₹90',
    numericPrice: 90,
    description: 'Sweet orchard peach infusion blended with cold Assam tea and topped with crushed ice.',
    tasteNotes: 'Ripe fruit sweetness, crisp floral notes, thirst-quenching chill.',
    flavorProfile: { spice: 1, sweetness: 4, warmth: 1, richness: 1 },
    bestPairedWith: 'Paneer Cheese Burst Sandwich',
    image: '/images/real/real_sulaimani_chai.png',
    isJainAvailable: true,
    tags: ['Fruity', 'Chilled']
  },
  {
    id: 'mint-mojito',
    name: 'Mint Mojito',
    category: 'Cold Sips',
    price: '₹85',
    numericPrice: 85,
    description: 'Hand-muddled fresh garden mint and lime wedges with sparkling soda and chilled sweetness.',
    tasteNotes: 'Bubbly effervescence, crushed spearmint zing, lime acidity.',
    flavorProfile: { spice: 1, sweetness: 3, warmth: 1, richness: 1 },
    bestPairedWith: 'Schezwan Vada Pav',
    image: '/images/real/real_adrak_chai.png',
    isJainAvailable: true,
    tags: ['Sparkling', 'Cooling']
  },
  {
    id: 'green-apple-mojito',
    name: 'Green Apple Mojito',
    category: 'Cold Sips',
    price: '₹85',
    numericPrice: 85,
    description: 'Crisp green apple syrup with fresh lime sprigs, effervescent fizz, and cracked ice.',
    tasteNotes: 'Sour apple punch, tingling soda bubbles, revitalizing finish.',
    flavorProfile: { spice: 1, sweetness: 3, warmth: 1, richness: 1 },
    bestPairedWith: 'Chana Jor Garam',
    image: '/images/real/real_adrak_chai.png',
    isJainAvailable: true,
    tags: ['Tart & Sweet']
  },
  {
    id: 'cold-coffee',
    name: 'Classic Cold Coffee',
    category: 'Cold Sips',
    price: '₹95',
    numericPrice: 95,
    description: 'Creamy, thick, and well-balanced cafe cold coffee blended with rich espresso and chilled milk.',
    tasteNotes: 'Velvety espresso roast, vanilla undertones, creamy frothy froth.',
    flavorProfile: { spice: 1, sweetness: 4, warmth: 1, richness: 4 },
    bestPairedWith: 'Bombay Masala Toast',
    image: '/images/cold-cocoa.jpg',
    isJainAvailable: true,
    tags: ['Cafe Staple']
  },

  // Street Food & Chaat
  {
    id: 'classic-vada-pav',
    name: 'Classic Mumbai Vada Pav',
    category: 'Street Food & Chaat',
    price: '₹55',
    numericPrice: 55,
    description: 'Bombay street favourite with a spiced potato fritter, fiery mint-coriander chutney, and roasted garlic thecha.',
    tasteNotes: 'Crunchy golden exterior, fluffy buttered pav, red garlic crunch, salted green chili.',
    flavorProfile: { spice: 4, sweetness: 1, warmth: 4, richness: 3 },
    bestPairedWith: 'Special Kulhad Chai',
    image: '/images/real/real_vada_pav.jpg',
    isSignature: true,
    isJainAvailable: false,
    tags: ['Street Food', 'Mumbai']
  },
  {
    id: 'schezwan-vada-pav',
    name: 'Schezwan Vada Pav',
    category: 'Street Food & Chaat',
    price: '₹65',
    numericPrice: 65,
    description: 'Crispy batata vada tossed in punchy Indo-Chinese schezwan sauce and tucked inside butter-toasted pav.',
    tasteNotes: 'Garlic-red chili glaze, tangy soy-schezwan kick, soft warm bun.',
    flavorProfile: { spice: 5, sweetness: 1, warmth: 4, richness: 3 },
    bestPairedWith: 'Cold Cocoa or Mint Mojito',
    image: '/images/real/real_vada_pav.jpg',
    isJainAvailable: false,
    tags: ['Fusion', 'Spicy']
  },
  {
    id: 'cheese-vada-pav',
    name: 'Cheese Vada Pav',
    category: 'Street Food & Chaat',
    price: '₹75',
    numericPrice: 75,
    description: 'Warm batata vada blanketed in gooey melted processed cheese, sweet chutney, and spicy dry garlic sprinkle.',
    tasteNotes: 'Creamy melted cheese layer mellowing the thecha spice, decadent comfort bite.',
    flavorProfile: { spice: 3, sweetness: 1, warmth: 4, richness: 5 },
    bestPairedWith: 'Adrak Chai',
    image: '/images/vada-pav.jpg',
    isJainAvailable: false,
    tags: ['Cheesy']
  },
  {
    id: 'chana-jor-garam',
    name: 'Chana Jor Garam',
    category: 'Street Food & Chaat',
    price: '₹126',
    numericPrice: 126,
    description: 'Crispy pressed spiced black chickpeas tossed with chopped red onions, tomatoes, green chilies, and lime juice.',
    tasteNotes: 'Extreme crunch, tangy chaat masala, fresh onion-tomato bite, lemon juice zing.',
    flavorProfile: { spice: 3, sweetness: 1, warmth: 2, richness: 2 },
    bestPairedWith: 'Sulaimani Chai',
    image: '/images/bombay-toast.jpg',
    isJainAvailable: true,
    tags: ['Desi Crunch', 'High Protein']
  },
  {
    id: 'mumbai-pav-bhaji',
    name: 'Mumbai Pav Bhaji',
    category: 'Street Food & Chaat',
    price: '₹120',
    numericPrice: 120,
    description: 'A steaming mash of cauliflower, green peas, potatoes, and tomatoes cooked with fragrant bhaji masala and Amul butter.',
    tasteNotes: 'Slow-simmered rich red bhaji, melted butter sheen, toasted pav buns, raw onion & lemon squeeze.',
    flavorProfile: { spice: 3, sweetness: 1, warmth: 5, richness: 5 },
    bestPairedWith: 'Sulaimani Chai',
    image: '/images/real/real_pav_bhaji.jpg',
    isJainAvailable: true,
    tags: ['Butter Pav', 'Comfort']
  },
  {
    id: 'cheese-pav-bhaji',
    name: 'Cheese Pav Bhaji',
    category: 'Street Food & Chaat',
    price: '₹150',
    numericPrice: 150,
    description: 'Signature Mumbai bhaji generously loaded with grated cheese, served alongside hot golden toasted pavs.',
    tasteNotes: 'Melted cheese strands blended into hot butter bhaji, rich restaurant indulgence.',
    flavorProfile: { spice: 3, sweetness: 1, warmth: 5, richness: 5 },
    bestPairedWith: 'Lemon Iced Tea',
    image: '/images/pav-bhaji.jpg',
    isJainAvailable: true,
    tags: ['Cheesy Indulgence']
  },
  {
    id: 'dahi-papdi-chaat',
    name: 'Dahi Papdi Chaat',
    category: 'Street Food & Chaat',
    price: '₹95',
    numericPrice: 95,
    description: 'Crisp handmade papdis topped with seasoned potatoes, creamy chilled yogurt, date-tamarind chutney, and roasted cumin.',
    tasteNotes: 'Crisp biscuit shatter, sweet creamy dahi, tangy tamarind drizzle, sev dusting.',
    flavorProfile: { spice: 2, sweetness: 4, warmth: 1, richness: 3 },
    bestPairedWith: 'Tapri Special Chai',
    image: '/images/bombay-toast.jpg',
    isJainAvailable: true,
    tags: ['Sweet & Tangy', 'Cooling']
  },
  {
    id: 'sev-puri',
    name: 'Sev Puri',
    category: 'Street Food & Chaat',
    price: '₹85',
    numericPrice: 85,
    description: 'Crisp puris loaded with diced potatoes, raw onions, fiery red garlic paste, tangy chutneys, and a mound of nylon sev.',
    tasteNotes: 'Multi-layer explosion: crunchy puri, spicy thecha garlic, tangy imli, yellow sev blanket.',
    flavorProfile: { spice: 4, sweetness: 2, warmth: 1, richness: 2 },
    bestPairedWith: 'Cold Horlicks',
    image: '/images/bombay-toast.jpg',
    isJainAvailable: true,
    tags: ['Chaat Staple']
  },
  {
    id: 'bhel-puri',
    name: 'Bhel Puri',
    category: 'Street Food & Chaat',
    price: '₹85',
    numericPrice: 85,
    description: 'Light puffed rice tossed fresh with roasted peanuts, crushed papdi, spicy chutney, and fresh coriander leaves.',
    tasteNotes: 'Airy puffed rice, roasted peanut crunch, sweet and pungent chutneys, light snack.',
    flavorProfile: { spice: 3, sweetness: 2, warmth: 1, richness: 2 },
    bestPairedWith: 'Masala Chai',
    image: '/images/bombay-toast.jpg',
    isJainAvailable: true,
    tags: ['Light Crunch']
  },
  {
    id: 'samosa-chaat',
    name: 'Samosa Chaat',
    category: 'Street Food & Chaat',
    price: '₹100',
    numericPrice: 100,
    description: 'Golden Punjabi samosa crushed and layered with spiced chole gravy, whipped sweet yogurt, and sev.',
    tasteNotes: 'Warm flaky samosa crust, spiced chickpea curry, cool yogurt contrast, vibrant herbs.',
    flavorProfile: { spice: 4, sweetness: 2, warmth: 4, richness: 4 },
    bestPairedWith: 'Elaichi Chai',
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
    numericPrice: 140,
    description: 'Grilled artisanal bread, marinated spiced paneer, melted cheese, and emerald green mint chutney.',
    tasteNotes: 'Stretchy melted cheese pull, tender marinated paneer, crisp butter grill, herb kick.',
    flavorProfile: { spice: 2, sweetness: 1, warmth: 4, richness: 5 },
    bestPairedWith: 'Tapriwala Special Chai',
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
    numericPrice: 90,
    description: 'Triple-decker toasted bread filled with spiced potato masala, crisp cucumber, beetroot, and mint chutney.',
    tasteNotes: 'Earthy turmeric potato mash, crunchy beetroot & cucumber, green chutney zing, crunchy sev.',
    flavorProfile: { spice: 3, sweetness: 1, warmth: 4, richness: 3 },
    bestPairedWith: 'Tapriwala Special Chai',
    image: '/images/bombay-toast.jpg',
    isJainAvailable: false,
    tags: ['Street Icon']
  },
  {
    id: 'cheesy-paneer-wrap',
    name: 'Cheesy Paneer Wrap',
    category: 'Sandwiches & Wraps',
    price: '₹120',
    numericPrice: 120,
    description: 'Warm wholewheat roll stuffed with spiced paneer tikka chunks, crunchy cabbage, and melted cheese sauce.',
    tasteNotes: 'Tandoori-style spiced cottage cheese, creamy dressing, wrapped warm and toasted.',
    flavorProfile: { spice: 3, sweetness: 1, warmth: 4, richness: 4 },
    bestPairedWith: 'Mint Mojito',
    image: '/images/real/real_tapri_sandwich.jpg',
    isJainAvailable: true,
    tags: ['Grab & Go']
  },
  {
    id: 'bun-chutney-maska',
    name: 'Bun Chutney Maska',
    category: 'Sandwiches & Wraps',
    price: '₹70',
    numericPrice: 70,
    description: 'Pillow-soft bakery bun thickly spread with salted butter and house-made green coriander-mint chutney.',
    tasteNotes: 'Soft sweet brioche-style bun, cold salted butter layer, spicy herb chutney punch.',
    flavorProfile: { spice: 2, sweetness: 2, warmth: 3, richness: 4 },
    bestPairedWith: 'Adrak Chai for dunking',
    image: '/images/real/real_chutney_sandwich.jpg',
    isJainAvailable: true,
    tags: ['Tea Companion']
  },
  {
    id: 'grilled-chutney-cheese',
    name: 'Grilled Chutney Cheese Sandwich',
    category: 'Sandwiches & Wraps',
    price: '₹110',
    numericPrice: 110,
    description: 'Crisp grilled bread layered with homemade coriander chutney and bubbling melted cheddar.',
    tasteNotes: 'Crisp golden brown triangle slices, melted sharp cheese, fresh green chutney.',
    flavorProfile: { spice: 2, sweetness: 1, warmth: 4, richness: 4 },
    bestPairedWith: 'Kashmiri Kahwa',
    image: '/images/real/real_chutney_sandwich.jpg',
    isJainAvailable: true,
    tags: ['Crispy Grill']
  },
  {
    id: 'chilli-cheese-toast',
    name: 'Chilli Cheese Toast',
    category: 'Sandwiches & Wraps',
    price: '₹105',
    numericPrice: 105,
    description: 'Golden toast topped with finely diced green chilies, bell peppers, and broiled bubbly cheese.',
    tasteNotes: 'Broiled cheese crust, sharp green chili heat, crunchy toast base.',
    flavorProfile: { spice: 4, sweetness: 1, warmth: 4, richness: 4 },
    bestPairedWith: 'Filter Coffee',
    image: '/images/real/real_cheese_toast.png',
    isJainAvailable: true,
    tags: ['Spicy Crunch']
  },

  // Maggi
  {
    id: 'plain-butter-maggi',
    name: 'Plain Butter Maggi',
    category: 'Maggi',
    price: '₹70',
    numericPrice: 70,
    description: 'Comforting piping-hot 2-minute noodles cooked to perfection with an extra dollop of salted golden butter.',
    tasteNotes: 'Classic masala seasoning, saucy soupy noodles, melted golden butter sheen.',
    flavorProfile: { spice: 2, sweetness: 1, warmth: 5, richness: 4 },
    bestPairedWith: 'Elaichi Chai',
    image: '/images/real/real_classic_maggi.png',
    isJainAvailable: true,
    tags: ['Classic Desi']
  },
  {
    id: 'vegetable-maggi',
    name: 'Vegetable Maggi',
    category: 'Maggi',
    price: '₹80',
    numericPrice: 80,
    description: 'Noodles tossed with sauteed bell peppers, sweet corn, green peas, carrots, and house special spice mix.',
    tasteNotes: 'Sauteed veggie crunch, spiced masala noodles, comforting warmth.',
    flavorProfile: { spice: 3, sweetness: 1, warmth: 5, richness: 3 },
    bestPairedWith: 'Lemon Iced Tea',
    image: '/images/real/real_special_maggi.png',
    isJainAvailable: true,
    tags: ['Veg Loaded']
  },
  {
    id: 'peri-peri-cheese-maggi',
    name: 'Peri-Peri Cheese Maggi',
    category: 'Maggi',
    price: '₹95',
    numericPrice: 95,
    description: 'Fiery peri-peri seasoned Maggi noodles crowned with a generous blanket of melted processed cheese.',
    tasteNotes: 'Smoky peri-peri burn tamed by creamy molten cheese, addictively punchy.',
    flavorProfile: { spice: 5, sweetness: 1, warmth: 5, richness: 5 },
    bestPairedWith: 'Surat Cold Cocoa',
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
    snackPrice: '₹55',
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
    name: 'R.S. Puram - Flagship Cafe',
    type: 'Dine-in Cafe & Lounge',
    address: '551-B Lokamanya Street (West), Diwan Bahadur (DB) Road Corner, R.S. Puram, Coimbatore, Tamil Nadu - 641002',
    phone: '+91 80565 44622',
    hours: 'Monday - Sunday: 11:00 AM - 10:30 PM',
    detail: 'Our premier flagship outlet. Featuring cozy indoor seating, warm incandescent pendant lights, exposed brick aesthetics, and a dedicated library of board games (Jenga, Scrabble, Uno, Monopoly) on every table.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tapriwala+the+contemporary+tea+cafe+551-B+Lokamanya+Street+West+RS+Puram+Coimbatore+641002',
    image: '/images/swiggy_rspuram.jpg',
    featuredPill: 'Flagship Outlet · Board Games',
    amenities: ['Board Games (Free)', 'Dine-in Seating', 'Air Conditioned', 'Jain Menu Available', 'Swiggy / Zomato Pickup'],
    callWriteup: 'Planning a visit with friends or family? Feel free to call our R.S. Puram flagship lounge for table reservations, board game bookings (Jenga, Uno, Monopoly), Jain food preparations, or fresh takeaway orders.'
  },
  {
    id: 'saibaba-colony',
    name: 'Saibaba Colony',
    type: 'Neighborhood Cafe',
    address: '32, Alagesan Road, Saibaba Colony, Coimbatore, Tamil Nadu - 641011',
    phone: '+91 80565 41119',
    hours: 'Monday - Sunday: 11:00 AM - 10:30 PM',
    detail: 'A beloved neighborhood hangout for students and families in Saibaba Colony. Quick seating, warm acoustic cafe music, evening street chaat, and steaming hot kulhad sips.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tapriwala+32+Alagesan+Road+Saibaba+Colony+Coimbatore+641011',
    image: '/images/swiggy_saibaba.jpg',
    featuredPill: 'Neighborhood Favorite',
    amenities: ['Cozy Indoor Seating', 'Quick Service', 'Pure Vegetarian', 'Takeaway Counter'],
    callWriteup: 'Dropping by our neighborhood cafe? Call our Saibaba Colony front desk for seating availability, fresh evening chaat specials, hot kulhad chai flasks, or directions.'
  },
  {
    id: 'peelamedu',
    name: 'Peelamedu',
    type: 'Student & Tech Hub',
    address: '415, Sowripalayam Road, Peelamedu, Coimbatore, Tamil Nadu - 641004 (Opp. PSG Hospitals Back Gate)',
    phone: '+91 80565 44622',
    hours: 'Monday - Sunday: 11:00 AM - 10:30 PM',
    detail: 'Located in Coimbatore’s student and IT corridor near PSG Tech and PSG Hospitals. Buzzing with energy, quick bites, Mumbai grilled sandwiches, thick cold cocoa, and hot cutting chai.',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Tapriwala+Peelamedu+415+Sowripalayam+Road+Coimbatore+641004',
    image: '/images/swiggy_peelamedu.jpg',
    featuredPill: 'Student Hub · Near PSG Tech',
    amenities: ['Dine-in Seating', 'Quick Counter Service', 'Pure Vegetarian', 'Swiggy / Zomato Delivery'],
    callWriteup: 'Heading to our Peelamedu branch or want food packed for college or work? Call our desk directly for quick takeaway prep, chai flasks, or seating queries.'
  }
];

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'rev-1',
    author: 'Karthik S.',
    outlet: 'R.S. Puram Flagship',
    rating: 5,
    date: 'Reviewed on Google Maps',
    comment: 'The Surat Cold Cocoa here is ridiculously thick and rich—easily the best chocolate drink in Coimbatore! We sat for over an hour playing Jenga while sipping on their Special Kulhad Chai. Amazing vibe and totally pocket friendly.',
    highlight: 'Surat Cold Cocoa & Board Games'
  },
  {
    id: 'rev-2',
    author: 'Deepika Raman',
    outlet: 'R.S. Puram Flagship',
    rating: 5,
    date: 'Reviewed on Google Maps',
    comment: 'Finally a place in Coimbatore that gets Mumbai Vada Pav right! The dry red garlic chutney (thecha) has that authentic kick. The staff even accommodated our Jain food requests with zero hesitation. 10/10 recommend!',
    highlight: 'Authentic Mumbai Vada Pav & Jain Food'
  },
  {
    id: 'rev-3',
    author: 'Arun Sundaram',
    outlet: 'Saibaba Colony',
    rating: 5,
    date: 'Reviewed on Google Maps',
    comment: 'Their Special Chai with mint and ginger served in a clay kulhad is pure bliss in the evening. The Paneer Cheese Burst sandwich was loaded with filling and grilled golden. Great hangout spot for students and friends.',
    highlight: 'Kulhad Chai & Paneer Cheese Sandwich'
  },
  {
    id: 'rev-4',
    author: 'Pooja Mehta',
    outlet: 'R.S. Puram Flagship',
    rating: 5,
    date: 'Reviewed on Google Maps',
    comment: 'Super warm atmosphere with lovely lighting. Pav Bhaji with generous butter pavs tasted just like street food in Bombay. Clean vegetarian kitchen, friendly hospitality, and very fair pricing.',
    highlight: 'Butter Pav Bhaji & Clean Kitchen'
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
    title: 'Unhurried Hospitality',
    description: 'High-quality cafe experience rooted in street warmth—generous portions, thoughtful craft, and no rush to leave.',
    badge: 'Warm & Welcoming'
  }
];
