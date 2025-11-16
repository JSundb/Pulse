import { X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useEffect, useState } from 'react';

type PackTag = {
  text: string;
  emoji: string;
  bgColor: string;
  textColor: string;
};

type LocalService = {
  id: string;
  name: string;
  price: string;
  description: string;
  distance: string;
  image: string;
};

export type WoltPack = {
  id: string;
  name: string;
  merchantName: string;
  distance: string;
  price: string;
  description: string;
  pickupTiming: string;
  aiExplanation: string;
  image: string;
  tag: PackTag;
  deliveryAvailable?: boolean;
  deliveryDropPoint?: string;
  deliveryTime?: string;
  localServices?: LocalService[];
};

type Props = {
  pack: WoltPack;
  onClose: () => void;
  onOrder: (pack: WoltPack, orderType: 'pickup' | 'delivery', selectedServices: LocalService[]) => void;
};

export default function PackDetailsSheet({ pack, onClose, onOrder }: Props) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [selectedServices, setSelectedServices] = useState<LocalService[]>([]);

  const handleServiceSelection = (service: LocalService) => {
    if (selectedServices.some(s => s.id === service.id)) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div className="relative w-full max-w-lg rounded-t-3xl bg-white shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200 active:scale-95"
        >
          <X size={18} />
        </button>

        {/* Content */}
        <div className="max-h-[85vh] overflow-y-auto p-6 pb-8">
          {/* Tag */}
          <div className="mb-3 flex items-center gap-1">
            <span className={`rounded-full ${pack.tag.bgColor} px-2 py-0.5 text-xs ${pack.tag.textColor}`}>
              {pack.tag.emoji} {pack.tag.text}
            </span>
          </div>

          {/* Image */}
          <div className="mb-4 aspect-video w-full overflow-hidden rounded-2xl bg-gray-100">
            <ImageWithFallback
              src={pack.image}
              alt={pack.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Pack Info */}
          <h2 className="mb-2 text-2xl text-gray-900">{pack.name}</h2>
          
          <div className="mb-1 flex items-center gap-2 text-gray-600">
            <span>{pack.merchantName}</span>
            <span>·</span>
            <span>{pack.distance} away</span>
          </div>

          <div className="mb-4 text-xl text-gray-900">{pack.price}</div>

          {/* Description */}
          <div className="mb-4 rounded-2xl bg-gray-50 p-4">
            <p className="text-sm text-gray-900">{pack.description}</p>
          </div>

          {/* Pickup Timing */}
          <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
            <span>⏱️</span>
            <span>{pack.pickupTiming}</span>
          </div>

          {/* AI Explanation */}
          <div className="mb-6 rounded-2xl bg-blue-50 p-4">
            <p className="text-sm text-blue-700">
              <span className="text-blue-900">AI:</span> {pack.aiExplanation}
            </p>
          </div>

          {/* Order Options */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg text-gray-900">Order Options</h3>

            {/* Pickup Option */}
            <button
              onClick={() => setOrderType('pickup')}
              className={`mb-3 w-full rounded-2xl border-2 p-4 text-left transition-all ${
                orderType === 'pickup'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
              }`}
            >
              <div className="mb-1 text-gray-900">Pickup at {pack.merchantName}</div>
              <div className="text-sm text-gray-600">{pack.pickupTiming}</div>
            </button>

            {/* Delivery Option (conditional) */}
            {pack.deliveryAvailable && (
              <button
                onClick={() => setOrderType('delivery')}
                className={`w-full rounded-2xl border-2 p-4 text-left transition-all ${
                  orderType === 'delivery'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="mb-1 text-gray-900">Deliver to nearest accessible point</div>
                <div className="text-sm text-gray-600">
                  Drop-off at {pack.deliveryDropPoint} ({pack.deliveryTime})
                </div>
              </button>
            )}
          </div>

          {/* Local Services */}
          {pack.localServices && pack.localServices.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-3 text-lg text-gray-900">Add Services to Your Outing</h3>
              
              <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {pack.localServices.map((service) => {
                  const isSelected = selectedServices.some(s => s.id === service.id);
                  return (
                    <button
                      key={service.id}
                      onClick={() => handleServiceSelection(service)}
                      className={`flex-shrink-0 w-56 rounded-2xl border-2 p-3 text-left transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 bg-white hover:shadow-md'
                      }`}
                    >
                      <div className="mb-2 aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
                        <ImageWithFallback
                          src={service.image}
                          alt={service.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h4 className="mb-1 text-sm text-gray-900">{service.name}</h4>
                      <p className="mb-1 text-xs text-gray-600">{service.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-900">{service.price}</span>
                        <span className="text-gray-600">{service.distance}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Selected Pack Label */}
          <p className="mb-2 text-xs text-gray-500">Selected Pack</p>

          {/* Action Buttons */}
          <button
            onClick={() => onOrder(pack, orderType, selectedServices)}
            className="mb-2 w-full rounded-2xl bg-blue-600 px-4 py-4 text-white transition-all hover:bg-blue-700 active:scale-98"
          >
            Confirm Order
          </button>

          {/* Dynamic Summary */}
          <p className="mb-3 text-center text-sm text-gray-600">
            {orderType === 'pickup' ? 'Pickup' : `Delivery to ${pack.deliveryDropPoint}`}
            {selectedServices.length > 0 && ` + ${selectedServices.map(s => s.name).join(', ')}`}
          </p>

          <button
            onClick={onClose}
            className="w-full text-center text-sm text-gray-500 underline hover:text-gray-700"
          >
            See more from this place
          </button>
        </div>
      </div>
    </div>
  );
}