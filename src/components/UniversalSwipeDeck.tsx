import { useState } from 'react';
import DraggableSwipeCard from './DraggableSwipeCard';
import ActivityDetailsSimple from './ActivityDetailsSimple';
import type { Activity } from '../types';

type Props = {
  activities: Activity[];
  onSave?: (activity: Activity) => void;
  onPass?: (activity: Activity) => void;
  emptyMessage?: string;
  emptyIcon?: string;
};

export default function UniversalSwipeDeck({
  activities,
  onSave,
  onPass,
  emptyMessage = 'No more activities',
  emptyIcon = '🎉',
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewingActivity, setViewingActivity] = useState<Activity | null>(null);

  const currentActivity = activities[currentIndex];
  const nextActivity = activities[currentIndex + 1];

  const handleSwipeLeft = () => {
    if (onPass && currentActivity) onPass(currentActivity);
    if (currentIndex < activities.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    if (onSave && currentActivity) onSave(currentActivity);
    if (currentIndex < activities.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // If viewing full details
  if (viewingActivity) {
    return (
      <ActivityDetailsSimple
        activity={viewingActivity}
        onBack={() => setViewingActivity(null)}
        onSave={() => {
          if (onSave) onSave(viewingActivity);
          setViewingActivity(null);
        }}
        onJoin={() => {
          if (onSave) onSave(viewingActivity);
          setViewingActivity(null);
        }}
      />
    );
  }

  // Empty state
  if (!currentActivity) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center">
        <div>
          <div className="mb-4 text-6xl">{emptyIcon}</div>
          <h2 className="mb-2 text-2xl text-gray-900">{emptyMessage}</h2>
          <p className="text-gray-600">Check back later for new spots and activities</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full items-center justify-center p-5" style={{ touchAction: 'none' }}>
      <div className="relative h-full w-full max-w-md">
        {/* Card Stack */}
        {/* Next Card (behind) */}
        {nextActivity && (
          <DraggableSwipeCard
            activity={nextActivity}
            onSwipeLeft={() => {}}
            onSwipeRight={() => {}}
            onOpenDetails={() => {}}
            isTop={false}
            zIndex={1}
          />
        )}

        {/* Current Card (on top) */}
        {currentActivity && (
          <DraggableSwipeCard
            activity={currentActivity}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            onOpenDetails={() => setViewingActivity(currentActivity)}
            isTop={true}
            zIndex={10}
          />
        )}
      </div>
    </div>
  );
}