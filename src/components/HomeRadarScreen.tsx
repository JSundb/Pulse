import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Activity } from '../App';
import InterestRadar from './InterestRadar';
import ActivityCardOverlay from './ActivityCardOverlay';
import PulseMarker from './PulseMarker';

type Props = {
  activities: Activity[];
  onActivitySelect: (activity: Activity) => void;
  onModeChange: () => void;
  currentMode: string;
};

const categories = ['Social', 'Fitness', 'Study', 'Explore', 'Deals', 'Nightlife'];

export default function HomeRadarScreen({ activities, onActivitySelect, onModeChange, currentMode }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [overlayActivity, setOverlayActivity] = useState<Activity | null>(null);

  const filteredActivities = selectedCategory
    ? activities.filter(a => a.category === selectedCategory)
    : activities;

  const handleMarkerClick = (activity: Activity) => {
    setOverlayActivity(activity);
  };

  const handleGo = () => {
    if (overlayActivity) {
      onActivitySelect(overlayActivity);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-white/80 to-transparent px-6 pb-6 pt-12 backdrop-blur-sm">
        <div className="mx-auto max-w-md">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pulse
              </div>
              <p className="text-gray-500">Discover what's happening</p>
            </div>
            <button
              onClick={onModeChange}
              className="rounded-full bg-white px-4 py-2 shadow-md"
            >
              <span className="text-gray-700">{currentMode} mode</span>
            </button>
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-white/80 text-gray-700 backdrop-blur-sm hover:bg-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map View */}
      <div className="absolute inset-0">
        {/* Grid pattern for map aesthetic */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Interest Radar - Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <InterestRadar />
        </div>

        {/* Activity Markers */}
        {filteredActivities.map((activity, index) => {
          // Position markers in a circle around center
          const angle = (index / filteredActivities.length) * Math.PI * 2;
          const radius = 120;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <PulseMarker
              key={activity.id}
              activity={activity}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
              onClick={() => handleMarkerClick(activity)}
            />
          );
        })}
      </div>

      {/* Activity Card Overlay */}
      <AnimatePresence>
        {overlayActivity && (
          <ActivityCardOverlay
            activity={overlayActivity}
            onClose={() => setOverlayActivity(null)}
            onGo={handleGo}
          />
        )}
      </AnimatePresence>

      {/* Spacer for bottom nav */}
      <div className="h-28" />
    </div>
  );
}
