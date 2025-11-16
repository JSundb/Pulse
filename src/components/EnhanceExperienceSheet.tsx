import { X, MapPin, Clock, Share2, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useEffect, useState } from 'react';

type EnhanceOption = {
  id: string;
  name: string;
  providerName: string;
  price: string;
  eta: string;
  content: string;
  aiNote: string;
  image: string;
  type: 'food' | 'drink' | 'guide' | 'equipment' | 'workshop' | 'experience';
  isService?: boolean;
  availableTimes?: string[];
  meetingPoint?: string;
};

type Props = {
  option: EnhanceOption;
  onClose: () => void;
  onOrderBook: (selectedTime?: string) => void;
  onShare: () => void;
};

export default function EnhanceExperienceSheet({ option, onClose, onOrderBook, onShare }: Props) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleConfirm = () => {
    if (option.isService && !selectedTime) {
      return; // Don't allow booking without time selection
    }
    onOrderBook(selectedTime || undefined);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative max-h-[85vh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white/95 px-5 py-4 backdrop-blur-lg">
          <h2 className="text-xl text-gray-900">Details</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Large Image */}
          <div className="mb-4 aspect-video overflow-hidden rounded-2xl bg-gray-100">
            <ImageWithFallback
              src={option.image}
              alt={option.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Title & Provider */}
          <div className="mb-4">
            <h3 className="mb-1 text-2xl text-gray-900">{option.name}</h3>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={16} className="text-blue-600" />
              <span>{option.providerName}</span>
            </div>
          </div>

          {/* Price & ETA */}
          <div className="mb-4 flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-2xl text-blue-600">{option.price}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Clock size={16} className="text-blue-600" />
              <span>{option.eta}</span>
            </div>
          </div>

          {/* Content Description */}
          <div className="mb-4 rounded-2xl bg-gray-50 p-4">
            <h4 className="mb-1 text-sm text-gray-900">What's included</h4>
            <p className="text-gray-700">{option.content}</p>
          </div>

          {/* AI Recommendation */}
          <div className="mb-4 rounded-2xl bg-blue-50 p-4">
            <p className="text-sm text-blue-700">
              <span className="text-blue-900">AI:</span> {option.aiNote}
            </p>
          </div>

          {/* Time Selection (for services) */}
          {option.isService && option.availableTimes && option.availableTimes.length > 0 && (
            <div className="mb-4">
              <h4 className="mb-3 flex items-center gap-2 text-gray-900">
                <Calendar size={16} className="text-blue-600" />
                <span>Choose a time</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {option.availableTimes.map((time, idx) => (
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
          )}

          {/* Meeting Point (for services) */}
          {option.isService && option.meetingPoint && (
            <div className="mb-4 rounded-2xl border-2 border-gray-200 bg-white p-4">
              <h4 className="mb-1 text-sm text-gray-900">Meeting point</h4>
              <p className="text-sm text-gray-700">{option.meetingPoint}</p>
            </div>
          )}

          {/* Action Buttons */}
          <button
            onClick={handleConfirm}
            disabled={option.isService && !selectedTime}
            className={`mb-3 w-full rounded-2xl px-6 py-4 text-white transition-all ${
              option.isService && !selectedTime
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-98'
            }`}
          >
            {option.isService
              ? selectedTime
                ? `Book for ${selectedTime}`
                : 'Select a time to book'
              : 'Order Now'}
          </button>

          <button
            onClick={onShare}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-gray-200 bg-white px-6 py-3 text-gray-700 transition-all hover:bg-gray-50 active:scale-98"
          >
            <Share2 size={18} />
            <span>Share with friends</span>
          </button>
        </div>
      </div>
    </div>
  );
}
