import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductGrid } from '@/components/ProductGrid';
import { CategoryFilters } from '@/components/CategoryFilters';
import { SearchBar } from '@/components/SearchBar';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CartDrawer } from '@/components/CartDrawer';
import { getProducts, getCategories } from '@/api/products';
import { useDebounce } from '@/hooks/useAsync';

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const debouncedSearch = useDebounce(searchQuery, 300);

  const categories = getCategories();

  const products = useMemo(() => {
    return getProducts({
      category: activeCategory === 'all' ? undefined : activeCategory,
      search: debouncedSearch || undefined,
    });
  }, [activeCategory, debouncedSearch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartDrawer />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-forest-light to-background py-12 lg:py-16 overflow-hidden">
        {/* Decorative leaves */}
        <div className="absolute top-0 left-0 w-32 h-32 opacity-20">
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-primary">
            <path d="M50 0 C60 30, 80 40, 100 50 C80 60, 60 70, 50 100 C40 70, 20 60, 0 50 C20 40, 40 30, 50 0" />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-48 h-48 opacity-20 transform rotate-45">
          <svg viewBox="0 0 100 100" fill="currentColor" className="text-primary">
            <path d="M50 0 C60 30, 80 40, 100 50 C80 60, 60 70, 50 100 C40 70, 20 60, 0 50 C20 40, 40 30, 50 0" />
          </svg>
        </div>

        <div className="container-main relative">
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground text-center mb-8">
            Store
          </h1>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search for Kuntal Care"
            className="max-w-xl mx-auto"
          />
        </div>
      </div>

      <main className="flex-1 container-main py-8">
        <Breadcrumbs
          items={[
            { label: 'Shop' },
          ]}
        />

        {/* Category Filters */}
        <div className="flex justify-center mb-8 mt-4">
          <CategoryFilters
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            {products.length} products found
          </p>
          <select className="px-4 py-2 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Highest Rated</option>
          </select>
        </div>

        {/* Products Grid */}
        <ProductGrid products={products} />

        {/* Load More */}
        {products.length > 0 && (
          <div className="text-center mt-12">
            <button className="btn-secondary">
              Load More Products
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
