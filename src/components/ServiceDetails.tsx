import { X, Star, Clock, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

type Service = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  type: string;
  rating?: number;
  totalRatings?: number;
  duration?: string;
  location?: string;
  distance?: string;
  availability?: string[];
};

type Props = {
  service: Service;
  onBack: () => void;
  onBook: () => void;
};

export default function ServiceDetails({ service, onBack, onBook }: Props) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const mockAvailability = service.availability || [
    'Today, 14:00',
    'Today, 16:00',
    'Today, 18:00',
    'Tomorrow, 10:00',
    'Tomorrow, 14:00',
  ];

  const mockRating = service.rating || 4.8;
  const mockTotalRatings = service.totalRatings || 47;

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white/95 px-5 py-4 backdrop-blur-lg">
        <button
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200 active:scale-95"
        >
          <X size={20} />
        </button>
        <h1 className="flex-1 px-4 text-center text-lg text-gray-900">Service Details</h1>
        <div className="w-10" />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Image Banner */}
        <div className="aspect-[4/3] bg-gray-100">
          <ImageWithFallback
            src={service.image}
            alt={service.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Service Info */}
        <div className="border-b border-gray-100 p-5">
          <div className="mb-3 flex items-start justify-between">
            <div className="flex-1">
              <h2 className="mb-2 text-2xl text-gray-900">{service.name}</h2>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                  {service.type}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl text-blue-600">{service.price}</div>
              {service.duration && (
                <div className="text-sm text-gray-600">{service.duration}</div>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.floor(mockRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {mockRating} ({mockTotalRatings} ratings)
            </span>
          </div>
        </div>

        {/* Location */}
        {(service.location || service.distance) && (
          <div className="border-b border-gray-100 p-5">
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin size={18} className="text-blue-600" />
              <span>{service.location || 'On-site'} {service.distance && `• ${service.distance}`}</span>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="border-b border-gray-100 p-5">
          <h3 className="mb-3 text-lg text-gray-900">About this service</h3>
          <p className="text-gray-700 leading-relaxed">{service.description}</p>
        </div>

        {/* Availability Schedule */}
        <div className="border-b border-gray-100 p-5">
          <h3 className="mb-3 text-lg text-gray-900">Available Times</h3>
          <div className="flex flex-wrap gap-2">
            {mockAvailability.map((time, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTime(time)}
                className={`rounded-full border-2 px-4 py-2 text-sm transition-all ${
                  selectedTime === time
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="p-5">
          <h3 className="mb-3 text-lg text-gray-900">Recent Reviews</h3>
          <div className="space-y-3">
            {[
              { author: 'Sarah M.', rating: 5, comment: 'Excellent service, highly recommend!' },
              { author: 'Mike L.', rating: 5, comment: 'Great experience, very professional.' },
              { author: 'Emma K.', rating: 4, comment: 'Good value for money.' },
            ].map((review, idx) => (
              <div key={idx} className="rounded-2xl bg-gray-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-sm text-gray-900">{review.author}</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="border-t border-gray-200 bg-white p-4">
        <button
          onClick={onBook}
          disabled={!selectedTime}
          className={`w-full rounded-2xl px-6 py-4 text-white transition-all ${
            selectedTime
              ? 'bg-blue-600 hover:bg-blue-700 active:scale-98'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {selectedTime ? `Book for ${selectedTime}` : 'Select a time to book'}
        </button>
      </div>
    </div>
  );
}
