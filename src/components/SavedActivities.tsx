import { useState } from 'react';
import { motion } from 'motion/react';
import type { Activity } from '../App';
import { MapPin, Users, Home as HomeIcon, Sun, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ActivityDetails from './ActivityDetails';

type Props = {
  activities: Activity[];
  onUnsave: (activityId: string) => void;
  onMarkAsWent: (activityId: string) => void;
  completedActivities: string[];
};

const FILTER_OPTIONS = [
  'All',
  'Solo',
  'Social',
  'Outdoors',
  'Indoors',
  'Budget',
];

export default function SavedActivities({ activities, onUnsave, onMarkAsWent, completedActivities }: Props) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [expandedActivity, setExpandedActivity] = useState<Activity | null>(null);

  const filteredActivities = activities.filter(activity => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Solo') return activity.activityType === 'solo';
    if (selectedFilter === 'Social') return activity.activityType === 'active-social' || activity.activityType === 'passive-social';
    if (selectedFilter === 'Outdoors') return !activity.indoor;
    if (selectedFilter === 'Indoors') return activity.indoor;
    if (selectedFilter === 'Budget') return activity.vibe.includes('Budget-friendly');
    return true;
  });

  if (expandedActivity) {
    return (
      <ActivityDetails
        activity={expandedActivity}
        onClose={() => setExpandedActivity(null)}
        onSave={() => {}}
        isSaved={true}
      />
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 px-6 pt-8 pb-4">
        <h1 className="mb-4 text-3xl text-gray-900">Saved Activities</h1>
        
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {FILTER_OPTIONS.map(filter => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm transition-all ${
                selectedFilter === filter
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        {filteredActivities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 text-6xl">💫</div>
            <h2 className="mb-2 text-xl text-gray-900">No saved activities yet</h2>
            <p className="text-gray-600">
              {selectedFilter === 'All'
                ? 'Start swiping to save activities you like!'
                : `No activities match the "${selectedFilter}" filter`}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setExpandedActivity(activity)}
                className="overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl active:scale-98 cursor-pointer"
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <div className="relative w-32 flex-shrink-0">
                    <ImageWithFallback
                      src={activity.photo}
                      alt={activity.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute top-2 left-2 rounded-full bg-white/95 px-2 py-1 text-xs text-gray-900 shadow-md backdrop-blur-sm">
                      {activity.distance}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col justify-between py-4 pr-4">
                    <div>
                      {/* Category + Vibe */}
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-xs text-blue-600">{activity.category}</span>
                        <span className="text-xs text-gray-300">•</span>
                        <div className="flex items-center gap-1">
                          {activity.indoor ? (
                            <HomeIcon size={12} className="text-gray-400" />
                          ) : (
                            <Sun size={12} className="text-amber-500" />
                          )}
                          <span className="text-xs text-gray-600">{activity.vibe[0]}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="mb-1 text-base text-gray-900 line-clamp-2 leading-tight">
                        {activity.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 line-clamp-2 leading-snug">
                        {activity.description}
                      </p>
                    </div>

                    {/* Meta */}
                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users size={12} />
                        <span>{activity.savedByCount}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        <span className="truncate">{activity.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}