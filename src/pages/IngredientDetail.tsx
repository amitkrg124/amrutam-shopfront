import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Check } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductGrid } from '@/components/ProductGrid';
import { CartDrawer } from '@/components/CartDrawer';
import { getIngredient, getProductsByIngredient } from '@/api/products';
import { cn } from '@/lib/utils';

export default function IngredientDetail() {
  const { slug } = useParams<{ slug: string }>();
  const ingredient = getIngredient(slug || '');

  if (!ingredient) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Ingredient not found</h1>
            <Link to="/ingredients" className="btn-primary">
              Back to Ingredients
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedProducts = getProductsByIngredient(ingredient.id);

  const prakritiColors = {
    vata: { bg: 'bg-blue-100', text: 'text-blue-600', icon: '🌬️' },
    pitta: { bg: 'bg-red-100', text: 'text-red-500', icon: '🔥' },
    kapha: { bg: 'bg-green-100', text: 'text-primary', icon: '💧' },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartDrawer />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-forest-light to-background py-8 overflow-hidden">
        <div className="container-main">
          <h1 className="font-heading text-2xl lg:text-3xl font-bold text-foreground text-center">
            Shop
          </h1>
        </div>
      </div>

      <main className="flex-1 container-main py-8 font-ingredient">
        <Breadcrumbs
          items={[
            { label: 'Ingredients', href: '/ingredients' },
            { label: ingredient.name },
          ]}
        />

        {/* Back Link */}
        <Link
          to="/ingredients"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="aspect-square rounded-2xl overflow-hidden bg-cream">
            <img
              src={ingredient.image}
              alt={ingredient.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-2">
              {ingredient.name} - {ingredient.latin}
            </h1>
            {ingredient.sanskrit && (
              <p className="text-xl text-muted-foreground mb-6">
                (Sanskrit - {ingredient.sanskrit})
              </p>
            )}

            <p className="text-muted-foreground mb-8">{ingredient.description}</p>

            {/* Why This Ingredient */}
            <div className="mb-8">
              <h3 className="font-heading text-lg font-semibold mb-4">
                Why {ingredient.name}?
              </h3>
              <ul className="space-y-2">
                {ingredient.benefits.slice(0, 3).map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prakriti Impact */}
            <div className="mb-8">
              <h3 className="font-heading text-lg font-semibold mb-4">
                Prakriti Impact
              </h3>
              <div className="flex gap-6">
                {(Object.entries(ingredient.prakritiImpact) as [
                  'vata' | 'pitta' | 'kapha',
                  'balanced' | 'unbalanced' | 'neutral'
                ][]).map(([dosha, status]) => (
                  <div key={dosha} className="text-center">
                    <div
                      className={cn(
                        "w-20 h-20 rounded-full flex flex-col items-center justify-center mb-2",
                        prakritiColors[dosha].bg
                      )}
                    >
                      <span className="text-2xl">{prakritiColors[dosha].icon}</span>
                    </div>
                    <p className="font-semibold capitalize">{dosha}</p>
                    <p
                      className={cn(
                        "text-sm capitalize",
                        status === 'balanced'
                          ? 'text-primary'
                          : status === 'unbalanced'
                          ? 'text-terracotta'
                          : 'text-muted-foreground'
                      )}
                    >
                      {status}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-8">
              <h3 className="font-heading text-lg font-semibold mb-4">Benefits</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {ingredient.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-3 bg-secondary/30 rounded-lg"
                  >
                    <span className="text-lg">
                      {['💆', '❤️', '🩸', '🌿', '🔥', '✨', '🩹', '🌱'][index % 8]}
                    </span>
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ayurvedic Properties */}
            {ingredient.ayurvedicProperties && (
              <div className="mb-8">
                <h3 className="font-heading text-lg font-semibold mb-4">
                  Ayurvedic Properties
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {ingredient.ayurvedicProperties.map((prop, index) => (
                    <div key={index} className="text-center p-3 bg-secondary/30 rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-primary/10 mx-auto mb-2 flex items-center justify-center">
                        <span className="text-xl">🪷</span>
                      </div>
                      <p className="font-semibold text-sm">{prop.name}</p>
                      {prop.sanskrit && (
                        <p className="text-xs text-muted-foreground">{prop.sanskrit}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Therapeutic Uses */}
            {ingredient.therapeuticUses && (
              <div className="mb-8">
                <h3 className="font-heading text-lg font-semibold mb-4">
                  Therapeutic Uses
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ingredient.therapeuticUses.map((use, index) => (
                    <span key={index} className="badge-benefit">
                      {use}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Best Combined With */}
            {ingredient.bestCombinedWith && (
              <div className="mb-8">
                <h3 className="font-heading text-lg font-semibold mb-4">
                  Best Combined With
                </h3>
                <p className="text-muted-foreground">
                  {ingredient.bestCombinedWith.join(', ')}
                </p>
              </div>
            )}

            {/* Geographical Location */}
            {ingredient.geographicalLocations && (
              <div className="mb-8">
                <h3 className="font-heading text-lg font-semibold mb-4">
                  Geographical Locations
                </h3>
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-muted-foreground">{ingredient.geographicalLocations}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 lg:mt-24">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
              Products with "{ingredient.name}" as primary ingredient
            </h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
