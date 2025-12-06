/**
 * Core TypeScript interfaces for the Amrutam e-commerce application
 */

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  volume?: string;
  rating: number;
  reviewsCount: number;
  category: string;
  ingredients: string[]; // ingredient ids
  highlights: string[];
  howToUse?: string;
  faqs?: FAQ[];
  inStock: boolean;
}

export interface Ingredient {
  id: string;
  name: string;
  slug: string;
  latin?: string;
  sanskrit?: string;
  description: string;
  benefits: string[];
  prakritiImpact: PrakritiImpact;
  image: string;
  ayurvedicProperties?: AyurvedicProperty[];
  therapeuticUses?: string[];
  plantParts?: PlantPart[];
  geographicalLocations?: string;
  bestCombinedWith?: string[];
  importantFormulations?: string[];
}

export interface PrakritiImpact {
  vata: 'balanced' | 'unbalanced' | 'neutral';
  pitta: 'balanced' | 'unbalanced' | 'neutral';
  kapha: 'balanced' | 'unbalanced' | 'neutral';
}

export interface AyurvedicProperty {
  name: string;
  sanskrit?: string;
  description: string;
  icon?: string;
}

export interface PlantPart {
  name: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title?: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  variant?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description?: string;
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  rating: number | null;
  inStock: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  addresses?: Address[];
}

export interface Address {
  id: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface CheckoutState {
  step: 'address' | 'review' | 'confirmation';
  selectedAddress?: Address;
  orderNotes?: string;
}
