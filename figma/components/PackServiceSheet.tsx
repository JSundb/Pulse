import { X, Star, Plus, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useEffect, useState } from 'react';

type AddOn = {
  id: string;
  name: string;
  price: string;
  description?: string;
};

type Review = {
  id: string;
  author: string;
  rating: number;
  comment: string;
};

type PackService = {
  id: string;
  name: string;
  providerName: string;
  price: string;
  description?: string;
  content?: string;
  image: string;
  rating?: number;
  totalReviews?: number;
  addOns?: AddOn[];
  isService?: boolean;
  availableTimes?: string[];
  reviews?: Review[];
  vatRate?: number; // Default to 24%
};

type Props = {
  item?: PackService;
  option?: any;
  onClose: () => void;
  onOrderBook: (selectedAddOns: AddOn[], selectedTime?: string) => void;
  onShare?: () => void;
};

export default function PackServiceSheet({ item, option, onClose, onOrderBook, onShare }: Props) {
  // Support both item and option props for backwards compatibility
  const data = item || option;
  
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const toggleAddOn = (addOn: AddOn) => {
    if (selectedAddOns.find(a => a.id === addOn.id)) {
      setSelectedAddOns(selectedAddOns.filter(a => a.id !== addOn.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addOn]);
    }
  };

  const handleConfirm = () => {
    if (data.isService && !selectedTime) {
      return;
    }
    onOrderBook(selectedAddOns, selectedTime || undefined);
  };

  // Price calculation
  const parsePrice = (priceString: string): number => {
    // Extract number from price string like "€12.50" or "$12.50"
    const match = priceString.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  };

  const basePrice = parsePrice(data.price);
  const extrasTotal = selectedAddOns.reduce((sum, addOn) => sum + parsePrice(addOn.price), 0);
  const subtotal = basePrice + extrasTotal;
  const vatRate = data.vatRate || 24; // Default 24%
  const vatAmount = (subtotal * vatRate) / 100;
  const totalPrice = subtotal + vatAmount;

  // Mock reviews if not provided
  const reviews = data.reviews || [
    {
      id: '1',
      author: 'Emma S.',
      rating: 5,
      comment: 'Great guide, super friendly and knowledgeable!',
    },
    {
      id: '2',
      author: 'Michael R.',
      rating: 4,
      comment: 'Perfect for the hike, everything was as described.',
    },
    {
      id: '3',
      author: 'Sarah L.',
      rating: 5,
      comment: 'Snacks were worth it, arrived on time.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="relative flex max-h-[85vh] w-full flex-col rounded-t-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
          <h2 className="flex-1 text-xl text-gray-900">Experience Details</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-5">
          {/* Image */}
          <div className="mb-4 aspect-video overflow-hidden rounded-2xl bg-gray-100">
            <ImageWithFallback
              src={data.image}
              alt={data.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Title */}
          <h3 className="mb-2 text-xl text-gray-900">{data.name}</h3>

          {/* Provider & Rating */}
          <div className="mb-4">
            <p className="mb-2 text-sm text-gray-600">{data.providerName}</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(data.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {data.rating} ({data.totalReviews} reviews)
              </span>
            </div>
          </div>

          {/* Base Price */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">Base price</p>
            <p className="text-2xl text-gray-900">{data.price}</p>
          </div>

          {/* Description */}
          <div className="mb-4">
            <p className="text-sm text-gray-700">{data.description || data.content}</p>
          </div>

          {/* Time Selection (for services) */}
          {data.isService && data.availableTimes && data.availableTimes.length > 0 && (
            <div className="mb-5">
              <h4 className="mb-3 text-gray-900">Available Times</h4>
              <div className="flex flex-wrap gap-2">
                {data.availableTimes.map((time, idx) => (
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

          {/* Add-ons & Extras */}
          {data.addOns && data.addOns.length > 0 && (
            <div className="mb-5">
              <h4 className="mb-3 text-gray-900">Add-ons & extras</h4>
              <div className="space-y-2">
                {data.addOns.map((addOn) => {
                  const isSelected = selectedAddOns.find(a => a.id === addOn.id);
                  return (
                    <button
                      key={addOn.id}
                      onClick={() => toggleAddOn(addOn)}
                      className={`flex w-full items-start justify-between gap-3 rounded-xl border-2 p-3 text-left transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <div
                          className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all mt-0.5 ${
                            isSelected
                              ? 'border-blue-600 bg-blue-600'
                              : 'border-gray-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check size={12} className="text-white" />}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                            {addOn.name}
                          </p>
                          {addOn.description && (
                            <p className="text-xs text-gray-500 line-clamp-1">{addOn.description}</p>
                          )}
                        </div>
                      </div>
                      <span className={`text-sm flex-shrink-0 ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
                        + {addOn.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Reviews Section */}
          <div className="mb-5">
            <h4 className="mb-3 text-gray-900">Reviews</h4>
            <div className="space-y-3">
              {reviews.slice(0, 3).map((review) => (
                <div key={review.id} className="rounded-xl bg-gray-50 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-sm text-gray-900">{review.author}</span>
                    <div className="flex items-center gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
            {data.totalReviews && data.totalReviews > 3 && (
              <button className="mt-3 text-sm text-blue-600 hover:underline">
                View all {data.totalReviews} reviews
              </button>
            )}
          </div>
        </div>

        {/* Fixed Bottom: Price Summary + CTA */}
        <div className="flex-shrink-0 border-t border-gray-200 bg-white p-5">
          {/* Price Summary */}
          <div className="mb-4 space-y-2 rounded-xl bg-gray-50 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Base price:</span>
              <span className="text-gray-900">€{basePrice.toFixed(2)}</span>
            </div>
            
            {extrasTotal > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Extras:</span>
                <span className="text-gray-900">€{extrasTotal.toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">VAT ({vatRate}%):</span>
              <span className="text-gray-600">€{vatAmount.toFixed(2)}</span>
            </div>
            
            <div className="flex items-center justify-between border-t border-gray-200 pt-2">
              <span className="text-gray-900">Total:</span>
              <span className="text-xl text-gray-900">€{totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleConfirm}
            disabled={data.isService && !selectedTime}
            className={`w-full rounded-2xl px-6 py-4 text-white transition-all ${
              data.isService && !selectedTime
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-98'
            }`}
          >
            {data.isService
              ? selectedTime
                ? `Book for ${selectedTime}`
                : 'Select a time to book'
              : 'Order for pickup'}
          </button>
        </div>
      </div>
    </div>
  );
}