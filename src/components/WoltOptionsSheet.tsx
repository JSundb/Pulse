import { X, MapPin, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useEffect } from 'react';

type LocalService = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  type: string;
};

type WoltPack = {
  id: string;
  name: string;
  merchantName: string;
  distance: string;
  price: string;
  pickupTiming: string;
  deliveryDropPoint?: string;
  deliveryTime?: string;
};

type Props = {
  pack: WoltPack;
  addOnServices: LocalService[];
  onClose: () => void;
  onChoosePickup: () => void;
  onChooseDelivery: () => void;
  onSelectService: (service: LocalService) => void;
};

export default function WoltOptionsSheet({
  pack,
  addOnServices,
  onClose,
  onChoosePickup,
  onChooseDelivery,
  onSelectService,
}: Props) {
  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative max-h-[85vh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white/95 px-5 py-4 backdrop-blur-lg">
          <h2 className="text-xl text-gray-900">Wolt Options</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Pickup Option */}
          <div className="mb-4 rounded-2xl border-2 border-gray-200 bg-white p-4">
            <h3 className="mb-2 text-lg text-gray-900">Pickup at nearby merchant</h3>
            <div className="mb-3 space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <MapPin size={16} className="text-blue-600" />
                <span>{pack.merchantName} • {pack.distance} away</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Clock size={16} className="text-blue-600" />
                <span>{pack.pickupTiming}</span>
              </div>
            </div>
            <button
              onClick={onChoosePickup}
              className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-white transition-all hover:bg-blue-700 active:scale-98"
            >
              Choose Pickup
            </button>
          </div>

          {/* Delivery Option */}
          {pack.deliveryDropPoint && (
            <div className="mb-4 rounded-2xl border-2 border-gray-200 bg-white p-4">
              <h3 className="mb-2 text-lg text-gray-900">Deliver to nearest accessible point</h3>
              <p className="mb-3 text-sm text-gray-600">
                Couriers cannot deliver inside trails or parks. Items will be delivered to the closest safe point.
              </p>
              
              {/* Map Preview Placeholder */}
              <div className="mb-3 aspect-video overflow-hidden rounded-xl bg-gray-100">
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                  <div className="text-center">
                    <MapPin size={32} className="mx-auto mb-2 text-blue-600" />
                    <p className="text-sm text-gray-700">{pack.deliveryDropPoint}</p>
                    <p className="text-xs text-gray-600">{pack.deliveryTime}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={onChooseDelivery}
                className="w-full rounded-2xl border-2 border-blue-600 bg-white px-4 py-3 text-blue-600 transition-all hover:bg-blue-50 active:scale-98"
              >
                Deliver Here
              </button>
            </div>
          )}

          {/* Add-On Services */}
          {addOnServices.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-lg text-gray-900">Enhance Your Experience</h3>
              <div className="space-y-3">
                {addOnServices.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => onSelectService(service)}
                    className="w-full rounded-2xl border-2 border-gray-200 bg-white p-3 text-left transition-all hover:shadow-md active:scale-98"
                  >
                    <div className="flex gap-3">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                        <ImageWithFallback
                          src={service.image}
                          alt={service.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="mb-1 text-gray-900">{service.name}</h4>
                        <p className="mb-1 text-xs text-gray-600">{service.description}</p>
                        <p className="text-sm text-blue-600">{service.price}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
