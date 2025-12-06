import { Link } from 'react-router-dom';
import { Ingredient } from '@/types';
import { cn } from '@/lib/utils';

interface IngredientCardProps {
  ingredient: Ingredient;
  className?: string;
}

export function IngredientCard({ ingredient, className }: IngredientCardProps) {
  return (
    <Link
      to={`/ingredients/${ingredient.slug}`}
      className={cn(
        "card-product group block font-ingredient",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-cream rounded-t-xl">
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-1">
          {ingredient.name}
        </h3>
        {ingredient.sanskrit && (
          <p className="text-sm text-muted-foreground mb-3">
            {ingredient.sanskrit}
          </p>
        )}

        {/* Prakriti Impact */}
        <div className="flex items-center gap-4 mb-3">
          <PrakritiGauge
            label="Vata"
            status={ingredient.prakritiImpact.vata}
            color="blue"
          />
          <PrakritiGauge
            label="Pitta"
            status={ingredient.prakritiImpact.pitta}
            color="red"
          />
          <PrakritiGauge
            label="Kapha"
            status={ingredient.prakritiImpact.kapha}
            color="green"
          />
        </div>

        {/* Benefits */}
        <div className="flex flex-wrap gap-1.5">
          {ingredient.benefits.slice(0, 2).map((benefit, index) => (
            <span
              key={index}
              className="badge-benefit text-[10px]"
            >
              {benefit.split(' ').slice(0, 3).join(' ')}...
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

interface PrakritiGaugeProps {
  label: string;
  status: 'balanced' | 'unbalanced' | 'neutral';
  color: 'blue' | 'red' | 'green';
}

function PrakritiGauge({ label, status, color }: PrakritiGaugeProps) {
  const colorClasses = {
    blue: 'text-blue-500',
    red: 'text-red-500',
    green: 'text-primary',
  };

  const bgColors = {
    balanced: 'bg-forest-light',
    unbalanced: 'bg-terracotta/20',
    neutral: 'bg-muted',
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium",
          bgColors[status],
          colorClasses[color]
        )}
      >
        {status === 'balanced' ? '↑' : status === 'unbalanced' ? '↓' : '–'}
      </div>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}

export function IngredientCardSkeleton() {
  return (
    <div className="card-product">
      <div className="aspect-square skeleton rounded-t-xl" />
      <div className="p-4 space-y-3">
        <div className="h-5 w-24 skeleton" />
        <div className="h-4 w-16 skeleton" />
        <div className="flex gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full skeleton" />
              <div className="h-2 w-6 skeleton" />
            </div>
          ))}
        </div>
        <div className="flex gap-1.5">
          <div className="h-5 w-16 rounded-full skeleton" />
          <div className="h-5 w-20 rounded-full skeleton" />
        </div>
      </div>
    </div>
  );
}
