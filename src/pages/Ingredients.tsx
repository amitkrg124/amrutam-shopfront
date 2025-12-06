import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchBar } from '@/components/SearchBar';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { IngredientCard, IngredientCardSkeleton } from '@/components/IngredientCard';
import { CartDrawer } from '@/components/CartDrawer';
import { getIngredients } from '@/api/products';
import { useDebounce } from '@/hooks/useAsync';
import { cn } from '@/lib/utils';

const prakritiFilters = [
  { id: 'all', label: 'All' },
  { id: 'vata-balanced', label: 'Vata Balanced', prakriti: 'vata' as const, effect: 'balanced' as const },
  { id: 'pitta-balanced', label: 'Pitta Balanced', prakriti: 'pitta' as const, effect: 'balanced' as const },
  { id: 'kapha-balanced', label: 'Kapha Balanced', prakriti: 'kapha' as const, effect: 'balanced' as const },
];

export default function Ingredients() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const debouncedSearch = useDebounce(searchQuery, 300);

  const ingredients = useMemo(() => {
    const filter = prakritiFilters.find((f) => f.id === activeFilter);
    return getIngredients({
      search: debouncedSearch || undefined,
      prakriti: filter?.prakriti,
      prakritiEffect: filter?.effect,
    });
  }, [activeFilter, debouncedSearch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartDrawer />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-forest-light to-background py-12 lg:py-16 overflow-hidden">
        <div className="container-main relative">
          <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground text-center mb-4">
            Ayurvedic Ingredients
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover the powerful herbs and natural ingredients that form the foundation of Ayurvedic medicine.
          </p>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search for ingredients..."
            className="max-w-xl mx-auto"
          />
        </div>
      </div>

      <main className="flex-1 container-main py-8 font-ingredient">
        <Breadcrumbs
          items={[
            { label: 'Ingredients' },
          ]}
        />

        {/* Prakriti Filters */}
        <div className="flex flex-wrap justify-center gap-3 my-8">
          {prakritiFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "chip",
                activeFilter === filter.id && "active"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-6">
          {ingredients.length} ingredients found
        </p>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ingredients.map((ingredient, index) => (
            <div
              key={ingredient.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <IngredientCard ingredient={ingredient} />
            </div>
          ))}
        </div>

        {ingredients.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No ingredients found matching your search.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
