import { ChevronRight } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { useRef, useState } from 'react';

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

export function ProductCarousel({ title, products }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  return (
    <div className="relative">
      <h2 className="font-heading text-xl font-semibold text-foreground mb-6">
        {title}
      </h2>
      
      <div className="relative">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[280px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        {canScrollRight && products.length > 3 && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-full bg-card shadow-lg flex items-center justify-center hover:bg-secondary transition-colors z-10"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>
        )}
      </div>
    </div>
  );
}
