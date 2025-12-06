import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Minus, Plus, ShoppingCart, Check, ChevronDown, ChevronUp, Leaf } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ImageCarousel } from '@/components/ImageCarousel';
import { Rating } from '@/components/Rating';
import { ProductGrid } from '@/components/ProductGrid';
import { CartDrawer } from '@/components/CartDrawer';
import { AppDownloadCTA } from '@/components/AppDownloadCTA';
import { getProduct, getRelatedProducts, getIngredientsForProduct, formatPrice } from '@/api/products';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';

const volumeOptions = ['100 ml', '200 ml', '500 ml'];

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const product = getProduct(id || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedVolume, setSelectedVolume] = useState(product?.volume || volumeOptions[1]);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const { addItem, openCart } = useCartStore();

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Link to="/shop" className="btn-primary">
              Back to Shop
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product.id);
  const ingredients = getIngredientsForProduct(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVolume);
    openCart();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartDrawer />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-forest-light to-background py-8 overflow-hidden">
        <div className="container-main">
          <h1 className="font-heading text-2xl lg:text-3xl font-bold text-foreground text-center">
            Store
          </h1>
        </div>
      </div>

      <main className="flex-1 container-main py-8">
        <Breadcrumbs
          items={[
            { label: 'Shop', href: '/shop' },
            { label: product.title },
          ]}
        />

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mt-8">
          {/* Images */}
          <ImageCarousel images={product.images} alt={product.title} />

          {/* Info */}
          <div className="font-product">
            <h1 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <Rating
                value={product.rating}
                showValue
                reviewsCount={product.reviewsCount}
                size="md"
              />
            </div>

            {/* Volume Selection */}
            <div className="mb-6">
              <p className="text-sm font-medium text-foreground mb-3">Select Volume:</p>
              <div className="flex flex-wrap gap-2">
                {volumeOptions.map((vol) => (
                  <button
                    key={vol}
                    onClick={() => setSelectedVolume(vol)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all border",
                      selectedVolume === vol
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-foreground border-border hover:border-primary"
                    )}
                  >
                    {vol}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-foreground">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="px-2 py-1 bg-terracotta/10 text-terracotta text-sm font-medium rounded">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-secondary transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-secondary transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-8">{product.description}</p>

            {/* Highlights */}
            <div className="mb-8">
              <h3 className="flex items-center gap-2 font-heading text-lg font-semibold mb-4">
                <span className="text-2xl">✨</span> Product Highlights
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {product.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg"
                  >
                    <Check className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Ingredients */}
            {ingredients.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="flex items-center gap-2 font-heading text-lg font-semibold">
                    <Leaf className="h-5 w-5 text-primary" /> Key Ingredients
                  </h3>
                  <Link
                    to="/ingredients"
                    className="text-sm text-primary hover:underline"
                  >
                    View all ingredients
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {ingredients.slice(0, 4).map((ing) => (
                    <Link
                      key={ing.id}
                      to={`/ingredients/${ing.slug}`}
                      className="text-center p-3 rounded-xl bg-secondary/30 hover:bg-secondary transition-colors"
                    >
                      <div className="w-16 h-16 rounded-full bg-cream mx-auto mb-2 overflow-hidden">
                        <img
                          src={ing.image}
                          alt={ing.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm font-medium">{ing.name}</p>
                      {ing.sanskrit && (
                        <p className="text-xs text-muted-foreground">{ing.sanskrit}</p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* How to Use */}
            {product.howToUse && (
              <div className="mb-8">
                <h3 className="font-heading text-lg font-semibold mb-3">How to Use</h3>
                <p className="text-muted-foreground text-sm">{product.howToUse}</p>
              </div>
            )}

            {/* FAQs */}
            {product.faqs && product.faqs.length > 0 && (
              <div className="mb-8">
                <h3 className="font-heading text-lg font-semibold mb-4">
                  Commonly Asked Questions
                </h3>
                <div className="space-y-3">
                  {product.faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-border rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setExpandedFaq(expandedFaq === index ? null : index)
                        }
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-secondary/30 transition-colors"
                      >
                        <span className="font-medium text-sm">{faq.question}</span>
                        {expandedFaq === index ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                      {expandedFaq === index && (
                        <div className="px-4 pb-4">
                          <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 lg:mt-24">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-8">
              People also bought
            </h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </main>

      <AppDownloadCTA />
      <Footer />
    </div>
  );
}
