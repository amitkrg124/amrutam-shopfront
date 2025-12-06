import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, MapPin, CreditCard, Package } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CartDrawer } from '@/components/CartDrawer';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/api/products';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const steps = [
  { id: 'address', label: 'Address', icon: MapPin },
  { id: 'review', label: 'Review', icon: Package },
  { id: 'confirmation', label: 'Confirmation', icon: Check },
];

const sampleAddress = {
  name: 'John Doe',
  line1: '123 Main Street',
  line2: 'Apartment 4B',
  city: 'Mumbai',
  state: 'Maharashtra',
  postalCode: '400001',
  country: 'India',
  phone: '+91 9876543210',
};

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState<'address' | 'review' | 'confirmation'>('address');
  const [address, setAddress] = useState(sampleAddress);

  if (items.length === 0 && currentStep !== 'confirmation') {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <Link to="/shop" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setCurrentStep('confirmation');
    clearCart();
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your order. You will receive a confirmation email shortly.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartDrawer />

      <main className="flex-1 container-main py-8">
        <Breadcrumbs items={[{ label: 'Cart', href: '/cart' }, { label: 'Checkout' }]} />

        {/* Steps */}
        <div className="flex items-center justify-center gap-4 my-8">
          {steps.map((step, index) => {
            const isActive = step.id === currentStep;
            const isPast =
              steps.findIndex((s) => s.id === currentStep) > index;

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : isPast
                      ? "bg-primary/20 text-primary"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  <step.icon className="h-4 w-4" />
                  <span className="text-sm font-medium hidden sm:inline">{step.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-8 lg:w-16 h-0.5 mx-2",
                      isPast ? "bg-primary" : "bg-border"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="max-w-3xl mx-auto">
          {currentStep === 'address' && (
            <div className="bg-card rounded-xl p-6 shadow-card animate-fade-in">
              <h2 className="font-heading text-xl font-semibold mb-6">
                Shipping Address
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setCurrentStep('review');
                }}
                className="space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      value={address.name}
                      onChange={(e) => setAddress({ ...address, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Address Line 1</label>
                  <input
                    type="text"
                    value={address.line1}
                    onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Address Line 2</label>
                  <input
                    type="text"
                    value={address.line2}
                    onChange={(e) => setAddress({ ...address, line2: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State</label>
                    <input
                      type="text"
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Postal Code</label>
                    <input
                      type="text"
                      value={address.postalCode}
                      onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <Link to="/cart" className="btn-secondary">
                    Back to Cart
                  </Link>
                  <button type="submit" className="btn-primary">
                    Continue to Review
                  </button>
                </div>
              </form>
            </div>
          )}

          {currentStep === 'review' && (
            <div className="space-y-6 animate-fade-in">
              {/* Address Review */}
              <div className="bg-card rounded-xl p-6 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-heading text-lg font-semibold">Shipping To</h2>
                  <button
                    onClick={() => setCurrentStep('address')}
                    className="text-sm text-primary hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-foreground">{address.name}</p>
                <p className="text-muted-foreground text-sm">
                  {address.line1}, {address.line2}
                </p>
                <p className="text-muted-foreground text-sm">
                  {address.city}, {address.state} {address.postalCode}
                </p>
                <p className="text-muted-foreground text-sm">{address.phone}</p>
              </div>

              {/* Order Review */}
              <div className="bg-card rounded-xl p-6 shadow-card">
                <h2 className="font-heading text-lg font-semibold mb-4">Order Items</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-cream flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.product.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} {item.variant && `• ${item.variant}`}
                        </p>
                      </div>
                      <p className="font-semibold">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                <hr className="my-4 border-border" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentStep('address')}
                  className="btn-secondary"
                >
                  Back
                </button>
                <button onClick={handlePlaceOrder} className="btn-primary">
                  Place Order
                </button>
              </div>
            </div>
          )}

          {currentStep === 'confirmation' && (
            <div className="bg-card rounded-xl p-8 shadow-card text-center animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-primary" />
              </div>
              <h2 className="font-heading text-2xl font-bold mb-4">
                Thank You For Your Order!
              </h2>
              <p className="text-muted-foreground mb-6">
                Your order has been placed successfully. You will receive a confirmation
                email with your order details shortly.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Order ID: #AMR{Math.random().toString(36).substring(2, 10).toUpperCase()}
              </p>
              <Link to="/shop" className="btn-primary">
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
