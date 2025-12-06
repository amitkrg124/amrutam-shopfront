import { Link } from 'react-router-dom';
import { Phone, Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';
import logoImage from '@/assets/logo.png';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Find Doctors', href: '#' },
  { name: 'Lab Tests', href: '#' },
  { name: 'Shop', href: '/shop' },
  { name: 'Forum', href: '#' },
  { name: 'About Us', href: '#' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { getTotalItems, openCart } = useCartStore();
  const cartCount = getTotalItems();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top banner */}
      <div className="bg-primary text-primary-foreground py-2 text-center text-sm">
        <span className="hidden sm:inline">Your first 5 minutes instant call is free.</span>
        <span className="sm:hidden">5 mins free call!</span>
        <Link
          to="#"
          className="ml-2 inline-flex items-center gap-1 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-medium hover:bg-primary-foreground/20 transition-colors"
        >
          <Phone className="h-3 w-3" />
          Try Instant Free Call Now
        </Link>
      </div>

      {/* Main header */}
      <div className="bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container-main">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Phone CTA (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 text-primary" />
              <span>+91 9826352321</span>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 -ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={logoImage}
                alt="Amrutam"
                className="h-8 lg:h-10 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors link-underline",
                    link.name === 'Shop'
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Cart */}
              <button
                onClick={openCart}
                className="relative p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User */}
              <Link
                to="/account"
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Link>

              {/* More dropdown (Desktop) */}
              <button className="hidden lg:flex items-center gap-1 p-2 rounded-full hover:bg-secondary transition-colors">
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="py-4 animate-fade-in">
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search for products, ingredients..."
                  className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background border-b border-border animate-fade-in">
          <nav className="container-main py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 px-4 rounded-lg text-foreground hover:bg-secondary transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border mt-4">
              <a
                href="tel:+919826352321"
                className="flex items-center gap-2 py-3 px-4 text-primary"
              >
                <Phone className="h-4 w-4" />
                +91 9826352321
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
