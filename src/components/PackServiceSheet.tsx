import { X, Star, Plus, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useEffect, useState } from 'react';

type AddOn = {
  id: string;
  name: string;
  price: string;
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

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative max-h-[80vh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white/95 px-5 py-4 backdrop-blur-lg">
          <h2 className="flex-1 text-xl text-gray-900">{data.name}</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Image */}
          <div className="mb-4 aspect-video overflow-hidden rounded-2xl bg-gray-100">
            <ImageWithFallback
              src={data.image}
              alt={data.name}
              className="h-full w-full object-cover"
            />
          </div>

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

          {/* Description */}
          <div className="mb-4">
            <p className="text-gray-700">{data.description || data.content}</p>
          </div>

          {/* Time Selection (for services) */}
          {data.isService && data.availableTimes && data.availableTimes.length > 0 && (
            <div className="mb-4">
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

          {/* Add-ons */}
          {data.addOns && data.addOns.length > 0 && (
            <div className="mb-4">
              <h4 className="mb-3 text-gray-900">Add extras</h4>
              <div className="space-y-2">
                {data.addOns.map((addOn) => {
                  const isSelected = selectedAddOns.find(a => a.id === addOn.id);
                  return (
                    <button
                      key={addOn.id}
                      onClick={() => toggleAddOn(addOn)}
                      className={`flex w-full items-center justify-between rounded-xl border-2 p-3 text-left transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                            isSelected
                              ? 'border-blue-600 bg-blue-600'
                              : 'border-gray-300 bg-white'
                          }`}
                        >
                          {isSelected && <Check size={12} className="text-white" />}
                        </div>
                        <span className={isSelected ? 'text-blue-900' : 'text-gray-900'}>
                          {addOn.name}
                        </span>
                      </div>
                      <span className={isSelected ? 'text-blue-700' : 'text-gray-600'}>
                        {addOn.price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Order/Book Button */}
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
              : 'Order Now'}
          </button>
        </div>
      </div>
    </div>
  );
}