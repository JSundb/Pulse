import { X, MapPin, Check } from 'lucide-react';
import { useEffect } from 'react';

type Props = {
  deliveryPoint: string;
  deliveryTime: string;
  packName: string;
  onConfirm: () => void;
  onBack: () => void;
};

export default function DeliveryConfirmation({
  deliveryPoint,
  deliveryTime,
  packName,
  onConfirm,
  onBack,
}: Props) {
  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative m-4 w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-xl text-gray-900">Confirm Delivery Location</h2>
          <button
            onClick={onBack}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Map Preview */}
          <div className="mb-4 aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center">
                  <div className="absolute inset-0 animate-ping rounded-full bg-blue-600 opacity-20"></div>
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 shadow-lg">
                    <MapPin size={24} className="text-white" />
                  </div>
                </div>
                <h3 className="mb-1 text-lg text-gray-900">{deliveryPoint}</h3>
                <p className="text-sm text-gray-600">{deliveryTime}</p>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="mb-4 rounded-2xl bg-blue-50 p-4">
            <h4 className="mb-1 text-sm text-blue-900">Nearest Accessible Point</h4>
            <p className="text-sm text-blue-700">
              Your courier will deliver your order to {deliveryPoint}, the closest accessible location to your activity area.
            </p>
          </div>

          {/* Order Summary */}
          <div className="mb-4 rounded-2xl bg-gray-50 p-4">
            <h4 className="mb-2 text-sm text-gray-900">Order Summary</h4>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Pack</span>
              <span className="text-gray-900">{packName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Delivery to</span>
              <span className="text-gray-900">{deliveryPoint}</span>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            onClick={onConfirm}
            className="w-full rounded-2xl bg-blue-600 px-6 py-4 text-white transition-all hover:bg-blue-700 active:scale-98"
          >
            <div className="flex items-center justify-center gap-2">
              <Check size={20} />
              <span>Confirm Delivery</span>
            </div>
          </button>

          <button
            onClick={onBack}
            className="mt-2 w-full rounded-2xl border-2 border-gray-200 bg-white px-6 py-3 text-gray-700 transition-all hover:bg-gray-50 active:scale-98"
          >
            Back to Options
          </button>
        </div>
      </div>
    </div>
  );
}
