import { Link } from 'react-router-dom';
import { Plus, Star } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/api/products';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    openCart();
  };

  return (
    <Link
      to={`/product/${product.slug}`}
      className={cn("card-product group block", className)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-cream">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-terracotta text-white text-xs font-medium rounded-full">
            Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-product text-sm font-medium text-foreground line-clamp-2 min-h-[40px] mb-2">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="font-heading text-base font-semibold text-foreground">
            {formatPrice(product.price, product.currency)}
          </span>
          {product.volume && (
            <span className="text-xs text-muted-foreground">• {product.volume}</span>
          )}
        </div>

        {/* Rating & Add button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < Math.floor(product.rating)
                      ? "text-gold fill-gold"
                      : "text-muted-foreground/30"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviewsCount})
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="btn-icon w-8 h-8"
            aria-label="Add to cart"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="card-product">
      <div className="aspect-square skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-10 skeleton" />
        <div className="h-5 w-24 skeleton" />
        <div className="flex items-center justify-between">
          <div className="h-4 w-20 skeleton" />
          <div className="h-8 w-8 rounded-full skeleton" />
        </div>
      </div>
    </div>
  );
}
