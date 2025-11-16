import { X, Calendar, MapPin, Star, Package, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type PlannedItem = {
  id: string;
  title: string;
  subtitle: string;
  type: 'sub-activity' | 'booked-service' | 'booked-product';
  scheduledDateTime: Date;
  location: string;
  isCompleted: boolean;
  description?: string;
  provider?: string;
  addOns?: string[];
};

type Props = {
  item: PlannedItem | null;
  onClose: () => void;
};

export default function BookingConfirmationModal({ item, onClose }: Props) {
  if (!item) return null;

  // Mock provider reviews
  const providerRating = 4.7;
  const providerReviewCount = 234;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center">
      <div className="relative w-full max-w-lg rounded-t-3xl bg-background sm:rounded-3xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-secondary/80"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="px-6 py-8">
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/20">
              <CheckCircle2 size={40} className="text-green-600 dark:text-green-400" />
            </div>
          </div>

          {/* Title */}
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-2xl text-foreground">Booking Confirmed!</h2>
            <p className="text-sm text-muted-foreground">
              Your booking has been confirmed. Details below.
            </p>
          </div>

          {/* Item Details */}
          <div className="mb-6 rounded-2xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">
                {item.subtitle}
              </span>
            </div>
            <h3 className="mb-2 text-lg text-foreground">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>

          {/* Details Grid */}
          <div className="mb-6 space-y-4">
            {/* Provider */}
            {item.provider && (
              <div className="flex items-start gap-3 rounded-xl bg-secondary p-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
                  <Package size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Provider</p>
                  <p className="mb-1 text-foreground">{item.provider}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-foreground">{providerRating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({providerReviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Date & Time */}
            <div className="flex items-start gap-3 rounded-xl bg-secondary p-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date & Time</p>
                <p className="text-foreground">
                  {item.scheduledDateTime.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-sm text-foreground">
                  {item.scheduledDateTime.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3 rounded-xl bg-secondary p-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="text-foreground">{item.location}</p>
              </div>
            </div>
          </div>

          {/* Add-ons */}
          {item.addOns && item.addOns.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-3 text-sm text-foreground">Included Add-ons</h3>
              <div className="space-y-2">
                {item.addOns.map((addOn, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2"
                  >
                    <CheckCircle2 size={16} className="text-green-600 dark:text-green-400" />
                    <span className="text-sm text-foreground">{addOn}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Provider Reviews Summary */}
          <div className="mb-6 rounded-2xl border border-border bg-card p-4">
            <h3 className="mb-3 text-foreground">What people say about {item.provider}</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                  <ImageWithFallback
                    src="https://i.pravatar.cc/150?u=reviewer1"
                    alt="Reviewer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <p className="text-sm text-foreground">Alex Martinez</p>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    "Excellent service! Very professional and reliable."
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                  <ImageWithFallback
                    src="https://i.pravatar.cc/150?u=reviewer2"
                    alt="Reviewer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <p className="text-sm text-foreground">Jamie Lee</p>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    "Great quality and good value for money."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Manage Booking Button */}
          <button className="w-full rounded-full bg-blue-600 py-3.5 text-white transition-colors hover:bg-blue-700 active:scale-95">
            Manage Booking
          </button>
        </div>
      </div>
    </div>
  );
}
