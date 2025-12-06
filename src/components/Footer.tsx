import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import logoImage from '@/assets/logo.png';

const footerLinks = {
  information: [
    { name: 'About Us', href: '#' },
    { name: 'Terms and Conditions', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Privacy Policy for Mobile Apps', href: '#' },
    { name: 'Shipping, return and cancellation Policy', href: '#' },
    { name: 'International Delivery', href: '#' },
    { name: 'For Businesses, Hotels, and Resorts', href: '#' },
  ],
  social: [
    { name: 'Facebook', href: '#', icon: 'facebook' },
    { name: 'Instagram', href: '#', icon: 'instagram' },
    { name: 'YouTube', href: '#', icon: 'youtube' },
    { name: 'Twitter', href: '#', icon: 'twitter' },
    { name: 'LinkedIn', href: '#', icon: 'linkedin' },
    { name: 'Pinterest', href: '#', icon: 'pinterest' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-cream-dark border-t border-border">
      <div className="container-main py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-6">
              Get in touch
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <a
                href="mailto:support@amrutam.global"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                support@amrutam.global
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <address className="not-italic">
                  Amrutam Pharmaceuticals Pvt Ltd.,<br />
                  chitragupt ganj, Nai Sadak, Lashkar,<br />
                  Gwalior - 474001
                </address>
              </div>
              <a
                href="tel:+919713171999"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <Phone className="h-4 w-4" />
                +91 9713171999
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              {footerLinks.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Information Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-6">
              Information
            </h3>
            <ul className="space-y-3">
              {footerLinks.information.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-heading text-lg font-semibold text-foreground mb-6">
              Subscribe to our Newsletter and join<br />
              Amrutam Family today!
            </h3>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your Email Address"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/">
            <img src={logoImage} alt="Amrutam" className="h-8" />
          </Link>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Amrutam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z" />
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.27.2-6.78,2.71-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.27,2.71,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.27-.2,6.78-2.71,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.27-2.71-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z" />
      </svg>
    ),
    youtube: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.5,6.19a3.02,3.02,0,0,0-2.12-2.14C19.5,3.5,12,3.5,12,3.5s-7.5,0-9.38.55A3.02,3.02,0,0,0,.5,6.19,31.56,31.56,0,0,0,0,12a31.56,31.56,0,0,0,.5,5.81,3.02,3.02,0,0,0,2.12,2.14c1.88.55,9.38.55,9.38.55s7.5,0,9.38-.55a3.02,3.02,0,0,0,2.12-2.14A31.56,31.56,0,0,0,24,12,31.56,31.56,0,0,0,23.5,6.19ZM9.55,15.57V8.43L15.82,12Z" />
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.45,20.45H16.9V14.88c0-1.33,0-3-1.85-3s-2.13,1.45-2.13,2.94v5.66H9.37V9h3.41v1.56h.05a3.74,3.74,0,0,1,3.37-1.85c3.6,0,4.27,2.37,4.27,5.46v6.28ZM5.34,7.43A2.07,2.07,0,1,1,7.41,5.36,2.07,2.07,0,0,1,5.34,7.43ZM7.12,20.45H3.57V9H7.12ZM22.23,0H1.77A1.75,1.75,0,0,0,0,1.73V22.27A1.75,1.75,0,0,0,1.77,24H22.23A1.76,1.76,0,0,0,24,22.27V1.73A1.76,1.76,0,0,0,22.23,0Z" />
      </svg>
    ),
    pinterest: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12,0A12,12,0,0,0,7.52,23.11c-.09-.78-.17-2,.04-2.85l1.22-5.18s-.31-.62-.31-1.54c0-1.45.84-2.53,1.88-2.53.89,0,1.31.67,1.31,1.46,0,.89-.57,2.22-.86,3.46-.24,1.03.52,1.87,1.53,1.87,1.84,0,3.25-1.94,3.25-4.73,0-2.47-1.78-4.2-4.32-4.2a4.47,4.47,0,0,0-4.67,4.48,2.72,2.72,0,0,0,.52,1.6.42.42,0,0,1,.1.4l-.19.8c-.03.13-.11.16-.25.1-1.39-.65-2.26-2.67-2.26-4.3,0-3.5,2.54-6.71,7.34-6.71,3.85,0,6.85,2.75,6.85,6.42,0,3.83-2.42,6.91-5.77,6.91a2.95,2.95,0,0,1-2.54-1.27l-.69,2.64a11.88,11.88,0,0,1-1.4,2.93A12,12,0,1,0,12,0Z" />
      </svg>
    ),
  };

  return icons[name] || null;
}
