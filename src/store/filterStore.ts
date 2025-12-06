import { create } from 'zustand';
import { FilterState } from '@/types';

interface FilterStore extends FilterState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setCategories: (categories: string[]) => void;
  toggleCategory: (category: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setRating: (rating: number | null) => void;
  setInStock: (inStock: boolean) => void;
  setSortBy: (sortBy: FilterState['sortBy']) => void;
  resetFilters: () => void;
}

const initialState: FilterState & { searchQuery: string } = {
  searchQuery: '',
  categories: [],
  priceRange: [0, 10000],
  rating: null,
  inStock: false,
  sortBy: 'featured',
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialState,

  setSearchQuery: (query) => set({ searchQuery: query }),

  setCategories: (categories) => set({ categories }),

  toggleCategory: (category) =>
    set((state) => ({
      categories: state.categories.includes(category)
        ? state.categories.filter((c) => c !== category)
        : [...state.categories, category],
    })),

  setPriceRange: (range) => set({ priceRange: range }),

  setRating: (rating) => set({ rating }),

  setInStock: (inStock) => set({ inStock }),

  setSortBy: (sortBy) => set({ sortBy }),

  resetFilters: () => set(initialState),
}));
