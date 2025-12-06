import appMockupImage from '@/assets/app-mockup.png';
import { MessageCircle, Calendar, Activity, Bell } from 'lucide-react';

const features = [
  {
    icon: MessageCircle,
    title: 'Access To',
    subtitle: 'Prescriptions',
  },
  {
    icon: Activity,
    title: 'Track Health',
    subtitle: 'Efficiently',
  },
  {
    icon: MessageCircle,
    title: 'Direct Chat With',
    subtitle: 'Doctors',
  },
  {
    icon: Bell,
    title: 'In-App Reminders',
    subtitle: 'For Consultations',
  },
];

export function AppDownloadCTA() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-4">
              Download Amrutam Ayurveda<br />
              App Now
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              The Amrutam Ayurveda App is your one-stop app for all things Ayurveda! 
              Apart from mimicking the website, the app has added benefits
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:shadow-soft transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {feature.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {feature.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* App Store Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-3 px-6 py-3 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
              >
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.5 6.747c0-.847.542-1.561 1.316-1.788a.944.944 0 0 1 .24-.053c.178-.013.35.019.509.085l9.48 4.508c.536.255.891.788.891 1.378s-.355 1.123-.891 1.378l-9.48 4.508a1.136 1.136 0 0 1-.749.032c-.774-.227-1.316-.941-1.316-1.788V6.747z"/>
                </svg>
                <div>
                  <p className="text-[10px] uppercase tracking-wider">Get it on</p>
                  <p className="text-lg font-semibold -mt-1">Google Play</p>
                </div>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 px-6 py-3 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
              >
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <p className="text-[10px] uppercase tracking-wider">Download on the</p>
                  <p className="text-lg font-semibold -mt-1">App Store</p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Engagement Card */}
            <div className="absolute left-0 lg:left-8 top-1/4 bg-primary text-primary-foreground rounded-2xl p-4 shadow-lg z-10 animate-float">
              <p className="text-sm opacity-80">Engagement Time</p>
              <p className="text-2xl font-bold">6m 33s</p>
              <svg className="w-24 h-8 mt-2 opacity-60" viewBox="0 0 100 30">
                <path
                  d="M0 25 Q25 20 50 15 T100 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Phone */}
            <div className="relative">
              <div className="w-64 lg:w-72 rounded-[3rem] overflow-hidden shadow-2xl">
                <img
                  src={appMockupImage}
                  alt="Amrutam App"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Downloads Badge */}
            <div className="absolute right-0 lg:right-12 bottom-8 bg-card rounded-2xl p-4 shadow-lg z-10" style={{ animationDelay: '0.5s' }}>
              <div className="flex -space-x-2 mb-2">
                <div className="w-10 h-10 rounded-full bg-terracotta/20 border-2 border-card" />
                <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-card" />
              </div>
              <p className="text-2xl font-bold text-foreground">10K+</p>
              <p className="text-sm text-muted-foreground">Downloads</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
