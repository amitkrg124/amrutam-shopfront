import { Link } from 'react-router-dom';
import { User, Package, Heart, Settings, LogIn } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CartDrawer } from '@/components/CartDrawer';

const accountLinks = [
  {
    icon: Package,
    title: 'My Orders',
    description: 'Track your orders and view order history',
    href: '#',
  },
  {
    icon: Heart,
    title: 'Wishlist',
    description: 'View your saved products',
    href: '#',
  },
  {
    icon: User,
    title: 'Profile',
    description: 'Manage your personal information',
    href: '#',
  },
  {
    icon: Settings,
    title: 'Settings',
    description: 'Manage your account settings',
    href: '#',
  },
];

export default function Account() {
  // This is a stub page - user is not logged in
  const isLoggedIn = false;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartDrawer />

      <main className="flex-1 container-main py-8">
        <Breadcrumbs items={[{ label: 'Account' }]} />

        {!isLoggedIn ? (
          <div className="max-w-md mx-auto text-center py-16">
            <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
              <User className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="font-heading text-2xl font-bold mb-4">
              Welcome to Amrutam
            </h1>
            <p className="text-muted-foreground mb-8">
              Sign in to your account to track orders, manage your wishlist, and more.
            </p>
            <div className="space-y-4">
              <button className="w-full btn-primary flex items-center justify-center gap-2">
                <LogIn className="h-5 w-5" />
                Sign In
              </button>
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <button className="text-primary hover:underline">
                  Create one
                </button>
              </p>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground mb-8 mt-4">
              My Account
            </h1>

            <div className="grid sm:grid-cols-2 gap-4">
              {accountLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.href}
                  className="flex items-center gap-4 p-6 bg-card rounded-xl shadow-card hover:shadow-hover transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <link.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{link.title}</h3>
                    <p className="text-sm text-muted-foreground">{link.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
