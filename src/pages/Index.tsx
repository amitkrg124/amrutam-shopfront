import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CategoryFilters } from '@/components/CategoryFilters';
import { AppDownloadCTA } from '@/components/AppDownloadCTA';
import { CartDrawer } from '@/components/CartDrawer';
import { ProductCarousel } from '@/components/ProductCarousel';
import { getProducts, getCategories } from '@/api/products';
import { useState, useMemo } from 'react';
import heroBg from '@/assets/hero-bg.png';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = getCategories();
  
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') {
      return getProducts();
    }
    return getProducts({ category: activeCategory });
  }, [activeCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <CartDrawer />

      <main className="flex-1">
        {/* Hero Section with Store Title */}
        <section 
          className="relative py-8 lg:py-12"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="container-main text-center">
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Store
            </h1>
            
            {/* Search Bar */}
            <div className="max-w-lg mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search for Kuntal Care"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 rounded-lg border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
              />
              <button 
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-secondary rounded transition-colors"
                aria-label="Search"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-muted-foreground">
                  <rect x="3" y="6" width="18" height="2" rx="1" fill="currentColor"/>
                  <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor"/>
                  <rect x="3" y="16" width="18" height="2" rx="1" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8">
          <div className="container-main">
            <div className="flex justify-center">
              <CategoryFilters
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>
          </div>
        </section>

        {/* Summer Collection Carousels */}
        <section className="pb-8">
          <div className="container-main space-y-12">
            <ProductCarousel 
              title="Summer Collection" 
              products={filteredProducts.slice(0, 6)} 
            />
            
            <ProductCarousel 
              title="Summer Collection" 
              products={filteredProducts.slice(0, 6)} 
            />
          </div>
        </section>

        {/* App Download CTA */}
        <AppDownloadCTA />
      </main>

      <Footer />
    </div>
  );
}
