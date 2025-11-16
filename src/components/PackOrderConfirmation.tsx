import { Check } from 'lucide-react';
import { useEffect } from 'react';
import type { WoltPack } from './PackDetailsSheet';

type LocalService = {
  id: string;
  name: string;
  price: string;
  description: string;
  distance: string;
  image: string;
};

type Props = {
  pack: WoltPack;
  orderType: 'pickup' | 'delivery';
  selectedServices: LocalService[];
  onClose: () => void;
};

export default function PackOrderConfirmation({ pack, orderType, selectedServices, onClose }: Props) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Confirmation Card */}
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <Check size={40} className="text-green-600" strokeWidth={3} />
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-2 text-center text-2xl text-gray-900">Order Placed!</h2>
        
        <p className="mb-6 text-center text-gray-600">
          Order placed for {orderType === 'pickup' ? 'pickup' : 'delivery'} at <span className="text-gray-900">{pack.merchantName}</span>
        </p>

        {/* Order Details */}
        <div className="mb-6 space-y-2 rounded-2xl bg-gray-50 p-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Pack</span>
            <span className="text-gray-900">{pack.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Price</span>
            <span className="text-gray-900">{pack.price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">ETA</span>
            <span className="text-gray-900">{pack.pickupTiming}</span>
          </div>
          {orderType === 'delivery' && pack.deliveryDropPoint && (
            <div className="flex justify-between">
              <span className="text-gray-600">Drop-off</span>
              <span className="text-gray-900">{pack.deliveryDropPoint}</span>
            </div>
          )}
          {selectedServices.length > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Services</span>
              <span className="text-gray-900">{selectedServices.map(s => s.name).join(', ')}</span>
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full rounded-2xl bg-blue-600 px-4 py-4 text-white transition-all hover:bg-blue-700 active:scale-98"
        >
          Got it
        </button>
      </div>
    </div>
  );
}