import { X, ArrowLeft, ArrowRight, ArrowUp, Hand } from 'lucide-react';

type Props = {
  onDismiss: () => void;
};

export default function SwipeInstructions({ onDismiss }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl text-gray-900">How to Swipe</h2>
          <button
            onClick={onDismiss}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200 active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Swipe Left */}
          <div className="flex items-center gap-4 rounded-2xl bg-red-50 p-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-500 text-white">
              <ArrowLeft size={24} />
            </div>
            <div>
              <h3 className="text-gray-900">Swipe Left</h3>
              <p className="text-sm text-gray-600">Pass on this activity</p>
            </div>
          </div>

          {/* Swipe Right */}
          <div className="flex items-center gap-4 rounded-2xl bg-green-50 p-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
              <ArrowRight size={24} />
            </div>
            <div>
              <h3 className="text-gray-900">Swipe Right</h3>
              <p className="text-sm text-gray-600">Save this activity</p>
            </div>
          </div>

          {/* Swipe Up */}
          <div className="flex items-center gap-4 rounded-2xl bg-blue-50 p-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
              <ArrowUp size={24} />
            </div>
            <div>
              <h3 className="text-gray-900">Swipe Up</h3>
              <p className="text-sm text-gray-600">View full details</p>
            </div>
          </div>

          {/* Tap Sides */}
          <div className="flex items-center gap-4 rounded-2xl bg-purple-50 p-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-500 text-white">
              <Hand size={24} />
            </div>
            <div>
              <h3 className="text-gray-900">Tap Left/Right</h3>
              <p className="text-sm text-gray-600">Navigate between 3 content panels</p>
            </div>
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="mt-6 w-full rounded-2xl bg-blue-600 px-4 py-3 text-white transition-all hover:bg-blue-700 active:scale-98"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}
