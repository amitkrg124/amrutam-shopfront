import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, Star, Truck } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductGrid } from '@/components/ProductGrid';
import { CategoryFilters } from '@/components/CategoryFilters';
import { AppDownloadCTA } from '@/components/AppDownloadCTA';
import { CartDrawer } from '@/components/CartDrawer';
import { getProducts, getCategories } from '@/api/products';
import { useState, useMemo } from 'react';
import productHairSpa from '@/assets/product-hair-spa.png';

const highlights = [
  {
    icon: Leaf,
    title: '100% Natural',
    description: 'Pure Ayurvedic ingredients',
  },
  {
    icon: ShieldCheck,
    title: 'Clinically Tested',
    description: 'Safe and effective formulas',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders above ₹500',
  },
  {
    icon: Star,
    title: '10K+ Reviews',
    description: 'Trusted by thousands',
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const categories = getCategories();
  
  const featuredProducts = useMemo(() => {
    if (activeCategory === 'all') {
      return getProducts().slice(0, 6);
    }
    return getProducts({ category: activeCategory }).slice(0, 6);
  }, [activeCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartDrawer />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-forest-light via-background to-background">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/3 translate-y-1/3" />
          
          <div className="container-main py-16 lg:py-24 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="animate-fade-in">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Leaf className="h-4 w-4" />
                  100% Ayurvedic Products
                </span>
                <h1 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight">
                  Discover the Power of{' '}
                  <span className="text-primary">Ancient Ayurveda</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                  Experience holistic wellness with our range of authentic Ayurvedic products, 
                  crafted with ancient wisdom and modern science.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/shop" className="btn-primary inline-flex items-center gap-2">
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to="/ingredients" className="btn-secondary">
                    Explore Ingredients
                  </Link>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={productHairSpa}
                    alt="Amrutam Ayurvedic Products"
                    className="w-full h-auto"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl p-4 shadow-lg z-20 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Star className="h-6 w-6 text-gold fill-gold" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">4.8</p>
                      <p className="text-sm text-muted-foreground">Customer Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mt-16">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm animate-fade-in"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <highlight.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      {highlight.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Store Section */}
        <section className="py-16 lg:py-24">
          <div className="container-main">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Our Store
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our collection of authentic Ayurvedic products for hair, skin, 
                digestion, and overall wellness.
              </p>
            </div>

            {/* Category Filters */}
            <div className="flex justify-center mb-12">
              <CategoryFilters
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>

            {/* Products Grid */}
            <ProductGrid products={featuredProducts} />

            {/* View All Link */}
            <div className="text-center mt-12">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
              >
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* App Download CTA */}
        <AppDownloadCTA />
      </main>

      <Footer />
    </div>
  );
}
