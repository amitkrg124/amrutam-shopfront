import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewsCount?: number;
  className?: string;
}

export function Rating({
  value,
  max = 5,
  size = 'md',
  showValue = false,
  reviewsCount,
  className,
}: RatingProps) {
  const sizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex" role="img" aria-label={`${value} out of ${max} stars`}>
        {[...Array(max)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              sizes[size],
              i < Math.floor(value)
                ? "text-gold fill-gold"
                : i < value
                ? "text-gold fill-gold/50"
                : "text-muted-foreground/30"
            )}
          />
        ))}
      </div>
      {showValue && (
        <span className={cn("font-medium text-foreground", textSizes[size])}>
          {value.toFixed(1)}
        </span>
      )}
      {reviewsCount !== undefined && (
        <span className={cn("text-muted-foreground", textSizes[size])}>
          ({reviewsCount})
        </span>
      )}
    </div>
  );
}
