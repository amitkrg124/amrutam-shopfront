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
      className={cn("group block", className)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary mb-3">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="font-product text-sm text-foreground line-clamp-2 leading-snug">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="font-heading text-sm font-medium text-foreground">
            {formatPrice(product.price, product.currency)}
          </span>
          {product.volume && (
            <span className="text-xs text-muted-foreground">• {product.volume}</span>
          )}
        </div>

        {/* Rating & Add button */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3",
                    i < Math.floor(product.rating)
                      ? "text-gold fill-gold"
                      : "text-muted-foreground/30"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-primary">
              ({product.reviewsCount})
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-7 h-7 rounded-md bg-primary text-primary-foreground flex items-center justify-center transition-all duration-200 hover:scale-105"
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
    <div className="space-y-3">
      <div className="aspect-square skeleton rounded-xl" />
      <div className="space-y-2">
        <div className="h-10 skeleton rounded" />
        <div className="h-4 w-24 skeleton rounded" />
        <div className="flex items-center justify-between">
          <div className="h-4 w-20 skeleton rounded" />
          <div className="h-7 w-7 rounded-md skeleton" />
        </div>
      </div>
    </div>
  );
}
