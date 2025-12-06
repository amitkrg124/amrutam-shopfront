import { Product, Ingredient, Category } from '@/types';
import productsData from '@/data/products.json';
import ingredientsData from '@/data/ingredients.json';
import categoriesData from '@/data/categories.json';

// Import product images
import productHairSpa from '@/assets/product-hair-spa.png';
import productShampoo from '@/assets/product-shampoo.png';
import productMalt from '@/assets/product-malt.png';

// Image mapping
const productImages: Record<string, string> = {
  'product-hair-spa': productHairSpa,
  'product-shampoo': productShampoo,
  'product-malt': productMalt,
};

// Helper to get product image
function getProductImage(imageKey: string): string {
  return productImages[imageKey] || productHairSpa;
}

// Map products with proper image paths
const products: Product[] = (productsData as any[]).map(p => ({
  ...p,
  images: [getProductImage(p.image)]
}));

const ingredients = ingredientsData as Ingredient[];
const categories = categoriesData as Category[];

/**
 * Get all products with optional filtering
 */
export const getProducts = (filters?: {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}): Product[] => {
  let filtered = [...products];

  if (filters?.category && filters.category !== 'all') {
    filtered = filtered.filter((p) => p.category === filters.category);
  }

  if (filters?.search) {
    const query = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }

  if (filters?.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters?.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
  }

  if (filters?.inStock) {
    filtered = filtered.filter((p) => p.inStock);
  }

  return filtered;
};

/**
 * Get a single product by ID or slug
 */
export const getProduct = (idOrSlug: string): Product | undefined => {
  return products.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
};

/**
 * Get products by category
 */
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((p) => p.category === category);
};

/**
 * Get related products (same category, excluding current)
 */
export const getRelatedProducts = (
  productId: string,
  limit = 4
): Product[] => {
  const product = getProduct(productId);
  if (!product) return [];

  return products
    .filter((p) => p.id !== productId && p.category === product.category)
    .slice(0, limit);
};

/**
 * Get all ingredients with optional filtering
 */
export const getIngredients = (filters?: {
  search?: string;
  prakriti?: 'vata' | 'pitta' | 'kapha';
  prakritiEffect?: 'balanced' | 'unbalanced';
}): Ingredient[] => {
  let filtered = [...ingredients];

  if (filters?.search) {
    const query = filters.search.toLowerCase();
    filtered = filtered.filter(
      (i) =>
        i.name.toLowerCase().includes(query) ||
        i.description.toLowerCase().includes(query) ||
        i.latin?.toLowerCase().includes(query) ||
        i.sanskrit?.toLowerCase().includes(query)
    );
  }

  if (filters?.prakriti && filters?.prakritiEffect) {
    filtered = filtered.filter(
      (i) => i.prakritiImpact[filters.prakriti!] === filters.prakritiEffect
    );
  }

  return filtered;
};

/**
 * Get a single ingredient by ID or slug
 */
export const getIngredient = (idOrSlug: string): Ingredient | undefined => {
  return ingredients.find((i) => i.id === idOrSlug || i.slug === idOrSlug);
};

/**
 * Get products containing a specific ingredient
 */
export const getProductsByIngredient = (ingredientId: string): Product[] => {
  return products.filter((p) => p.ingredients.includes(ingredientId));
};

/**
 * Get ingredients for a product
 */
export const getIngredientsForProduct = (productId: string): Ingredient[] => {
  const product = getProduct(productId);
  if (!product) return [];

  return product.ingredients
    .map((id) => ingredients.find((i) => i.id === id))
    .filter(Boolean) as Ingredient[];
};

/**
 * Get all categories
 */
export const getCategories = (): Category[] => {
  return categories;
};

/**
 * Format price with currency
 */
export const formatPrice = (price: number, currency = 'INR'): string => {
  if (currency === 'INR') {
    return `₹ ${price.toLocaleString('en-IN')}`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);
};
