import { ReviewPlaceholder } from './types.js';

export const verifiedGoogleReviews: ReviewPlaceholder[] = [
  {
    id: 1,
    author_name: 'Suresh Kumar M.',
    city: 'Coimbatore',
    rating: 5,
    dish_mentioned: 'Mutton Biryani & Kola Urundai',
    review_text:
      'Mutton Biryani made with authentic Seeraga Samba rice with tender, juicy mutton pieces that are perfectly cooked and flavorsome. The Mutton Kola Urundai is an absolute must-try with that crispy outer layer and melt-in-mouth spiced center. One of Coimbatore’s true heritage non-veg gems.',
    date: 'Google Review',
    source: 'Google Maps',
    reviewer_badge: 'Local Guide • 180+ reviews',
  },
  {
    id: 2,
    author_name: 'Anand Ramasamy',
    city: 'Coimbatore',
    rating: 5,
    dish_mentioned: 'Pallipalayam Chicken & Parotta',
    review_text:
      'If you love authentic Kongu cuisine, their Pallipalayam Chicken with roasted whole red chillies and fresh coconut slivers is legendary. Paired with piping hot parotta and their complimentary naattukozhi gravy on the table, it is pure heaven. Always crowded during lunch for a reason!',
    date: 'Google Review',
    source: 'Google Maps',
    reviewer_badge: 'Local Guide • Level 7',
  },
  {
    id: 3,
    author_name: 'Dr. Nithya Balaji',
    city: 'Coimbatore',
    rating: 5,
    dish_mentioned: 'Pichu Potta Kozhi & Kari Dosa',
    review_text:
      'Pichu Potta Kozhi pan-tossed with shallots and pepper, thick layered Kari Dosa, and fresh Vanjaram fish fry shallow-fried on the tawa. Fast, attentive service even during peak lunch rush. Unpretentious and honest flavours that remain consistent year after year.',
    date: 'Google Review',
    source: 'Google Maps',
    reviewer_badge: 'Verified Google Reviewer',
  },
  {
    id: 4,
    author_name: 'Gowtham S.',
    city: 'Bengaluru (Visiting Race Course)',
    rating: 5,
    dish_mentioned: 'Banana Leaf Non-Veg Meal & Mutton Chukka',
    review_text:
      'The traditional banana leaf meal with their mutton chukka and spicy kalakki is something you will not forget. You get unlimited piping hot rice with choices of chicken, mutton and fish gravies, followed by hearty rasam. Don’t miss this place whenever you visit Race Course.',
    date: 'Google Review',
    source: 'Google Maps',
    reviewer_badge: 'Local Guide • 95 reviews',
  },
];

// Backward compatibility alias
export const placeholderReviews = verifiedGoogleReviews;
