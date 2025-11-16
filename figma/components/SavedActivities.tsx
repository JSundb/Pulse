import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Activity } from '../App';
import { MapPin, Users, Home as HomeIcon, Sun, Heart, X, Calendar, Clock, AlertCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ActivityDetails from './ActivityDetails';

type Props = {
  activities: Activity[];
  onUnsave: (activityId: string) => void;
  onMarkAsWent: (activityId: string) => void;
  completedActivities: string[];
};

type PlannedActivity = {
  id: string;
  activity: Activity;
  plannedDateTime: Date;
  type: 'Spot' | 'Activity' | 'Route' | 'Sub-activity';
};

const FILTER_OPTIONS = [
  'All',
  'Solo',
  'Social',
  'Outdoors',
  'Indoors',
  'Budget',
];

type TabType = 'saved' | 'planned';

export default function SavedActivities({ activities, onUnsave, onMarkAsWent, completedActivities }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('saved');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [expandedActivity, setExpandedActivity] = useState<Activity | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Mock planned activities
  const [plannedActivities, setPlannedActivities] = useState<PlannedActivity[]>([
    {
      id: 'p1',
      activity: activities[0] || {
        id: 'demo1',
        title: 'Sunset Photography at Griffith Park',
        description: 'Join our weekly sunset photography meetup',
        photo: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?w=400',
        category: 'Activity',
        location: 'Griffith Park',
        distance: '2.1 km',
        vibe: ['Outdoors', 'Creative'],
        activityType: 'active-social',
        indoor: false,
        savedByCount: 42,
        currentConditions: { crowdLevel: '', lightCondition: '', weatherStatus: '' },
        averageRating: 4.8,
        totalRatings: 120,
      },
      plannedDateTime: new Date(Date.now() + 2 * 60 * 60 * 1000 + 14 * 60 * 1000), // 2h 14m from now
      type: 'Sub-activity',
    },
    {
      id: 'p2',
      activity: activities[1] || {
        id: 'demo2',
        title: 'Coffee Tasting Workshop',
        description: 'Learn about specialty coffee and brewing techniques',
        photo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
        category: 'Activity',
        location: 'Downtown Coffee Lab',
        distance: '1.5 km',
        vibe: ['Educational', 'Indoors'],
        activityType: 'solo',
        indoor: true,
        savedByCount: 28,
        currentConditions: { crowdLevel: '', lightCondition: '', weatherStatus: '' },
        averageRating: 4.9,
        totalRatings: 87,
      },
      plannedDateTime: new Date(Date.now() + 26 * 60 * 60 * 1000), // Tomorrow
      type: 'Activity',
    },
    {
      id: 'p3',
      activity: activities[2] || {
        id: 'demo3',
        title: 'Hidden Beach Trail',
        description: 'Scenic coastal hike to a secluded beach spot',
        photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
        category: 'Spot',
        location: 'Malibu Coast',
        distance: '8.2 km',
        vibe: ['Outdoors', 'Nature'],
        activityType: 'solo',
        indoor: false,
        savedByCount: 156,
        currentConditions: { crowdLevel: '', lightCondition: '', weatherStatus: '' },
        averageRating: 4.7,
        totalRatings: 203,
      },
      plannedDateTime: new Date(Date.now() + 75 * 60 * 60 * 1000), // 3 days
      type: 'Spot',
    },
  ]);

  // Update time every minute for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const filteredActivities = activities.filter(activity => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Solo') return activity.activityType === 'solo';
    if (selectedFilter === 'Social') return activity.activityType === 'active-social' || activity.activityType === 'passive-social';
    if (selectedFilter === 'Outdoors') return !activity.indoor;
    if (selectedFilter === 'Indoors') return activity.indoor;
    if (selectedFilter === 'Budget') return activity.vibe.includes('Budget-friendly');
    return true;
  });

  const getCountdown = (targetDate: Date) => {
    const now = currentTime.getTime();
    const target = targetDate.getTime();
    const diff = target - now;

    if (diff < 0) return 'Completed';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const days = Math.floor(hours / 24);

    if (days > 1) {
      return `Starts in ${days} days`;
    } else if (days === 1) {
      return `Starts tomorrow at ${targetDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    } else if (hours > 0) {
      return `Starts in ${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `Starts in ${minutes}m`;
    } else {
      return 'Starting soon';
    }
  };

  const getStatusBadge = (targetDate: Date) => {
    const now = currentTime.getTime();
    const target = targetDate.getTime();
    const diff = target - now;

    if (diff < 0) {
      return { label: 'Completed', color: 'bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400' };
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
      return { label: 'Starting Soon', color: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400' };
    } else if (hours < 24) {
      return { label: 'Today', color: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400' };
    } else {
      return { label: 'Upcoming', color: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' };
    }
  };

  const handleRemovePlanned = (plannedId: string) => {
    setPlannedActivities(plannedActivities.filter(p => p.id !== plannedId));
  };

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
    <div className="h-full overflow-y-auto bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-lg px-6 pt-8 pb-4">
        <h1 className="mb-4 text-3xl text-foreground">Saved</h1>
        
        {/* Tab Segmented Control */}
        <div className="mb-4 flex gap-2 rounded-full bg-secondary p-1">
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 rounded-full px-4 py-2.5 text-sm transition-all ${
              activeTab === 'saved'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Saved
          </button>
          <button
            onClick={() => setActiveTab('planned')}
            className={`flex-1 rounded-full px-4 py-2.5 text-sm transition-all ${
              activeTab === 'planned'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Planned
          </button>
        </div>
        
        {/* Filters (only show on Saved tab) */}
        {activeTab === 'saved' && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {FILTER_OPTIONS.map(filter => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`flex-shrink-0 rounded-full px-4 py-2 text-sm transition-all ${
                  selectedFilter === filter
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-secondary text-muted-foreground shadow-sm hover:shadow-md'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-6 pb-6 pt-4">
        <AnimatePresence mode="wait">
          {activeTab === 'saved' ? (
            // SAVED TAB
            <motion.div
              key="saved"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filteredActivities.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 text-6xl">💫</div>
                  <h2 className="mb-2 text-xl text-foreground">Nothing saved yet</h2>
                  <p className="text-muted-foreground">
                    Explore and swipe to save spots.
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
                      className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="flex gap-4">
                        {/* Image */}
                        <div 
                          onClick={() => setExpandedActivity(activity)}
                          className="relative w-32 h-32 flex-shrink-0 cursor-pointer"
                        >
                          <ImageWithFallback
                            src={activity.photo}
                            alt={activity.title}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
                            {activity.distance}
                          </div>
                        </div>

                        {/* Content */}
                        <div 
                          onClick={() => setExpandedActivity(activity)}
                          className="flex flex-1 flex-col justify-between py-3 pr-12 cursor-pointer"
                        >
                          <div>
                            {/* Category Tag */}
                            <div className="mb-2">
                              <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">
                                {activity.category}
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className="mb-1.5 text-base text-foreground line-clamp-1 leading-tight">
                              {activity.title}
                            </h3>

                            {/* Description */}
                            <p className="mb-2 text-sm text-muted-foreground line-clamp-2 leading-snug">
                              {activity.description}
                            </p>

                            {/* Location */}
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <MapPin size={12} />
                              <span className="truncate">{activity.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onUnsave(activity.id);
                          }}
                          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground backdrop-blur-sm transition-all hover:bg-red-100 hover:text-red-600 active:scale-95 dark:hover:bg-red-500/20 dark:hover:text-red-400"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            // PLANNED TAB
            <motion.div
              key="planned"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {plannedActivities.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 text-6xl">📅</div>
                  <h2 className="mb-2 text-xl text-foreground">No planned activities</h2>
                  <p className="text-muted-foreground">
                    Join a sub-activity or schedule something to get started.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {plannedActivities.map((planned, index) => {
                    const countdown = getCountdown(planned.plannedDateTime);
                    const isCompleted = countdown === 'Completed';

                    return (
                      <motion.div
                        key={planned.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="relative overflow-hidden rounded-2xl border-l-4 border-l-blue-600 border-r border-t border-b border-border bg-card shadow-sm transition-all hover:shadow-md"
                      >
                        <div className="flex gap-4">
                          {/* Image */}
                          <div 
                            onClick={() => setExpandedActivity(planned.activity)}
                            className={`relative w-32 h-32 flex-shrink-0 cursor-pointer ${isCompleted ? 'opacity-50' : ''}`}
                          >
                            <ImageWithFallback
                              src={planned.activity.photo}
                              alt={planned.activity.title}
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
                              {planned.activity.distance}
                            </div>
                          </div>

                          {/* Content */}
                          <div 
                            onClick={() => setExpandedActivity(planned.activity)}
                            className="flex flex-1 flex-col justify-between py-3 pr-3 cursor-pointer"
                          >
                            <div>
                              {/* Category Tag */}
                              <div className="mb-2">
                                <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs text-purple-700 dark:bg-purple-500/20 dark:text-purple-400">
                                  {planned.type}
                                </span>
                              </div>

                              {/* Title */}
                              <h3 className={`mb-1.5 text-base line-clamp-1 leading-tight ${isCompleted ? 'text-muted-foreground' : 'text-foreground'}`}>
                                {planned.activity.title}
                              </h3>

                              {/* Description */}
                              <p className="mb-2 text-sm text-muted-foreground line-clamp-1 leading-snug">
                                {planned.activity.description}
                              </p>

                              {/* Location */}
                              <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                                <MapPin size={12} />
                                <span className="truncate">{planned.activity.location}</span>
                              </div>

                              {/* Countdown with icon */}
                              {!isCompleted && (
                                <div className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400">
                                  <Clock size={14} />
                                  <span className="font-medium">{countdown}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}