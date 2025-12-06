import { Category } from '@/types';
import { cn } from '@/lib/utils';
import { 
  LayoutGrid, 
  Sparkles, 
  Heart, 
  Leaf, 
  Shield, 
  Zap,
  ChevronRight 
} from 'lucide-react';

interface CategoryFiltersProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  grid: <LayoutGrid className="h-5 w-5" />,
  sparkles: <Sparkles className="h-5 w-5" />,
  heart: <Heart className="h-5 w-5" />,
  leaf: <Leaf className="h-5 w-5" />,
  shield: <Shield className="h-5 w-5" />,
  zap: <Zap className="h-5 w-5" />,
};

export function CategoryFilters({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFiltersProps) {
  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.slug)}
          className={cn(
            "flex flex-col items-center gap-2 min-w-[72px] group transition-all",
          )}
        >
          <div
            className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 border-2",
              activeCategory === category.slug
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary text-secondary-foreground border-transparent hover:border-primary/30"
            )}
          >
            {categoryIcons[category.icon] || <LayoutGrid className="h-5 w-5" />}
          </div>
          <span
            className={cn(
              "text-xs font-medium transition-colors",
              activeCategory === category.slug
                ? "text-primary"
                : "text-muted-foreground group-hover:text-foreground"
            )}
          >
            {category.name}
          </span>
        </button>
      ))}
      <button
        className="flex flex-col items-center gap-2 min-w-[72px] group"
        aria-label="More categories"
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-secondary text-secondary-foreground border-2 border-transparent hover:border-primary/30 transition-all">
          <ChevronRight className="h-5 w-5" />
        </div>
        <span className="text-xs font-medium text-muted-foreground">More</span>
      </button>
    </div>
  );
}
