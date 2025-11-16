import { X } from 'lucide-react';
import UniversalSwipeDeck from './UniversalSwipeDeck';
import type { Activity } from '../App';

type Props = {
  onClose: () => void;
  relatedActivities: Activity[];
};

export default function RelatedActivitiesModal({ onClose, relatedActivities }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
        <h2 className="text-xl text-gray-900">Related Activities</h2>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200 active:scale-95"
        >
          <X size={20} />
        </button>
      </div>

      {/* Swipe Deck */}
      <div className="flex-1">
        <UniversalSwipeDeck
          activities={relatedActivities}
          onSave={(activity) => console.log('Saved related:', activity.title)}
          onPass={(activity) => console.log('Passed related:', activity.title)}
          emptyMessage="No more related activities"
          emptyIcon="✨"
        />
      </div>
    </div>
  );
}
