import { useState } from 'react';
import DraggableSwipeCard from './DraggableSwipeCard';
import ActivityDetailsSimple from './ActivityDetailsSimple';
import ThreadsOverview from './ThreadsOverview';
import ThreadDetails from './ThreadDetails';
import CreateThread from './CreateThread';
import type { Activity } from '../App';

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
  const [showThreadsOverview, setShowThreadsOverview] = useState(false);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [showCreateThread, setShowCreateThread] = useState(false);
  const [savedActivityIds, setSavedActivityIds] = useState<string[]>([]);

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
    // Threads Overview
    if (showThreadsOverview) {
      return (
        <div className="h-full">
          <ThreadsOverview
            activity={viewingActivity}
            onBack={() => setShowThreadsOverview(false)}
            onOpenThread={(threadId) => {
              setSelectedThreadId(threadId);
              setShowThreadsOverview(false);
            }}
            onCreateThread={() => {
              setShowThreadsOverview(false);
              setShowCreateThread(true);
            }}
          />
        </div>
      );
    }

    // Thread Details
    if (selectedThreadId) {
      return (
        <div className="h-full">
          <ThreadDetails
            threadId={selectedThreadId}
            onBack={() => setSelectedThreadId(null)}
          />
        </div>
      );
    }

    // Create Thread
    if (showCreateThread) {
      return (
        <div className="h-full">
          <CreateThread
            onBack={() => setShowCreateThread(false)}
            onSubmit={(threadData) => {
              console.log('Thread created:', threadData);
              setShowCreateThread(false);
            }}
          />
        </div>
      );
    }

    // Activity Details
    return (
      <ActivityDetailsSimple
        activity={viewingActivity}
        onBack={() => setViewingActivity(null)}
        isSaved={savedActivityIds.includes(viewingActivity.id)}
        onSave={() => {
          const isSaved = savedActivityIds.includes(viewingActivity.id);
          if (isSaved) {
            setSavedActivityIds(savedActivityIds.filter(id => id !== viewingActivity.id));
          } else {
            setSavedActivityIds([...savedActivityIds, viewingActivity.id]);
          }
          if (onSave) onSave(viewingActivity);
        }}
        onJoin={() => {
          if (onSave) onSave(viewingActivity);
        }}
        onOpenThread={(threadId) => setSelectedThreadId(threadId)}
        onViewAllThreads={() => setShowThreadsOverview(true)}
        onCreateThread={() => setShowCreateThread(true)}
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