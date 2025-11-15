import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import type { Activity } from '../App';
import type { Theme } from './ThemeRow';
import { Heart, X, MapPin, ChevronLeft, ChevronRight, ArrowUp, Home as HomeIcon, Sun, Users, ChevronUp, Plus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ActivityDetails from './ActivityDetails';
import ThemeRow from './ThemeRow';
import CreateActivity from './CreateActivity';

type Props = {
  activities: Activity[];
  onSaveActivity: (activity: Activity) => void;
  savedActivities: Activity[];
  onMarkAsWent: (activityId: string) => void;
  completedActivities: string[];
  themes: Theme[];
  onSelectTheme: (theme: Theme) => void;
  onMoreThemes: () => void;
};

export default function SwipeDeck({ activities, onSaveActivity, savedActivities, onMarkAsWent, completedActivities, themes, onSelectTheme, onMoreThemes }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [expandedActivity, setExpandedActivity] = useState<Activity | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [showCreateActivity, setShowCreateActivity] = useState(false);

  if (currentIndex >= activities.length) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="text-center">
          <div className="mb-4 text-6xl">✨</div>
          <div className="mb-2 text-gray-900">You've seen all activities!</div>
          <p className="text-gray-500">Check back later for more suggestions</p>
        </div>
      </div>
    );
  }

  const currentActivity = activities[currentIndex];
  const nextActivity = currentIndex + 1 < activities.length ? activities[currentIndex + 1] : null;
  const afterNextActivity = currentIndex + 2 < activities.length ? activities[currentIndex + 2] : null;
  const isSaved = savedActivities.some(a => a.id === currentActivity.id);
  const isCompleted = completedActivities.includes(currentActivity.id);

  if (expandedActivity) {
    return (
      <ActivityDetails
        activity={expandedActivity}
        onClose={() => setExpandedActivity(null)}
        onSave={() => {
          onSaveActivity(expandedActivity);
          setExpandedActivity(null);
        }}
        isSaved={savedActivities.some(a => a.id === expandedActivity.id)}
      />
    );
  }

  return (
    <div className="relative h-full w-full flex flex-col">
      {/* Create Activity Modal */}
      {showCreateActivity && (
        <CreateActivity
          onClose={() => setShowCreateActivity(false)}
          onCreate={(newActivity) => {
            // In a real app, this would save to backend
            console.log('Created activity:', newActivity);
            setShowCreateActivity(false);
          }}
        />
      )}

      {/* Theme Row */}
      <ThemeRow
        themes={themes}
        onSelectTheme={onSelectTheme}
        onMoreThemes={onMoreThemes}
      />
      
      {/* Swipe Deck Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-4">
      {/* Instruction hint */}
      <div className="absolute top-8 left-0 right-0 z-10 flex justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-full bg-white/95 px-4 py-2 shadow-lg backdrop-blur-sm"
        >
          <p className="text-sm text-gray-600">
            Swipe left to pass • Swipe right to save
          </p>
        </motion.div>
      </div>

      {/* Create Activity Button */}
      <div className="absolute top-8 right-6 z-10">
        <button
          onClick={() => setShowCreateActivity(true)}
          className="flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm text-white shadow-lg transition-all hover:bg-blue-700 active:scale-95"
        >
          <Plus size={18} />
          <span>Create</span>
        </button>
      </div>

      {/* Card Stack Container - 70% height */}
      <div className="relative w-full max-w-md" style={{ height: '70vh', maxHeight: '620px' }}>
        {/* Third card (background) */}
        {afterNextActivity && (
          <div className="absolute inset-0 translate-y-4 scale-[0.92] opacity-30 pointer-events-none">
            <div className="h-full w-full rounded-3xl bg-white shadow-lg" />
          </div>
        )}

        {/* Next card (will rise on swipe) */}
        {nextActivity && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ y: 8, scale: 0.96, opacity: 0.6 }}
          >
            <div className="h-full w-full rounded-3xl bg-white shadow-xl overflow-hidden">
              <ActivityPreview activity={nextActivity} />
            </div>
          </motion.div>
        )}

        {/* Current card */}
        <SwipeCard
          activity={currentActivity}
          onSwipe={(dir) => {
            setDirection(dir);
            if (dir === 'right') {
              onSaveActivity(currentActivity);
            }
            setTimeout(() => {
              setCurrentIndex(prev => prev + 1);
              setDirection(null);
            }, 300);
          }}
          onExpand={() => setExpandedActivity(currentActivity)}
          isSaved={isSaved}
          isCompleted={isCompleted}
          onMarkAsWent={onMarkAsWent}
        />
      </div>
      </div>
    </div>
  );
}

// Simple preview of next activity
function ActivityPreview({ activity }: { activity: Activity }) {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="relative h-1/2">
        <ImageWithFallback
          src={activity.photo}
          alt={activity.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 p-6">
        <h2 className="text-2xl text-gray-900 leading-tight line-clamp-2">
          {activity.title}
        </h2>
      </div>
    </div>
  );
}

type CardProps = {
  activity: Activity;
  onSwipe: (direction: 'left' | 'right') => void;
  onExpand: () => void;
  isSaved: boolean;
  isCompleted: boolean;
  onMarkAsWent: (activityId: string) => void;
};

function SwipeCard({ activity, onSwipe, onExpand, isSaved, isCompleted, onMarkAsWent }: CardProps) {
  const [currentPanel, setCurrentPanel] = useState(0);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotate = useTransform(x, [-200, 200], [-8, 8]);
  const scale = useTransform(x, [-200, 0, 200], [0.95, 1, 0.95]);
  const nextCardScale = useTransform(x, [-200, 0, 200], [1, 0.96, 1]);
  const nextCardY = useTransform(x, [-200, 0, 200], [0, 8, 0]);
  const nextCardOpacity = useTransform(x, [-200, 0, 200], [1, 0.6, 1]);

  // Get content type specific metadata
  const getActivityTypeLabel = () => {
    if (activity.contentType === 'route') return '🗺️ Route';
    if (activity.contentType === 'user-created') return '👥 Meetup';
    if (activity.contentType === 'seasonal') return `${getSeasonEmoji(activity.seasonal?.season)} Seasonal`;
    return activity.category;
  };

  const getSeasonEmoji = (season?: string) => {
    switch (season) {
      case 'Spring': return '🌸';
      case 'Summer': return '☀️';
      case 'Fall': return '🍂';
      case 'Winter': return '❄️';
      default: return '✨';
    }
  };

  // Create content panels
  const panels = [
    {
      type: 'main',
      image: activity.photo,
      title: activity.title,
      description: activity.description,
    },
    ...activity.photos.map((photo, idx) => ({
      type: 'image' as const,
      image: photo,
      title: activity.title,
      description: `Additional view ${idx + 1}`,
    })),
    {
      type: 'details' as const,
      image: activity.photo,
      title: activity.title,
      description: activity.fullDescription,
    },
  ];

  const handleDragEnd = (_: any, info: PanInfo) => {
    const offsetX = info.offset.x;
    const offsetY = info.offset.y;
    
    if (offsetY < -80 && Math.abs(offsetX) < 50) {
      onExpand();
      y.set(0);
      x.set(0);
      return;
    }
    
    if (Math.abs(offsetX) > 120) {
      onSwipe(offsetX > 0 ? 'right' : 'left');
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleTap = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const tapX = e.clientX - rect.left;
    const cardWidth = rect.width;
    
    if (tapX < cardWidth / 3 && currentPanel > 0) {
      setCurrentPanel(prev => prev - 1);
    } else if (tapX > (cardWidth * 2) / 3 && currentPanel < panels.length - 1) {
      setCurrentPanel(prev => prev + 1);
    }
  };

  const currentPanelData = panels[currentPanel];

  return (
    <>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          scale: nextCardScale,
          y: nextCardY,
          opacity: nextCardOpacity,
        }}
      />

      <motion.div
        className="absolute h-full w-full cursor-grab active:cursor-grabbing"
        style={{ x, y, rotate, scale }}
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        onDragEnd={handleDragEnd}
        onClick={handleTap}
      >
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Tap zone indicators */}
          {currentPanel > 0 && (
            <div className="pointer-events-none absolute left-3 top-1/2 z-20 -translate-y-1/2">
              <motion.div
                animate={{ x: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm"
              >
                <ChevronLeft size={18} className="text-gray-600" />
              </motion.div>
            </div>
          )}
          {currentPanel < panels.length - 1 && (
            <div className="pointer-events-none absolute right-3 top-1/2 z-20 -translate-y-1/2">
              <motion.div
                animate={{ x: [2, -2, 2] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm"
              >
                <ChevronRight size={18} className="text-gray-600" />
              </motion.div>
            </div>
          )}
          
          {/* Drag up indicator */}
          <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-sm"
            >
              <ChevronUp size={14} className="text-gray-600" />
              <span className="text-xs text-gray-600">Full details</span>
            </motion.div>
          </div>

          {/* Header bar - clean horizontal layout */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between gap-2 bg-gradient-to-b from-black/50 to-transparent p-4">
            <span className="rounded-full bg-white/95 px-3 py-1.5 text-sm text-gray-900 shadow-md backdrop-blur-sm">
              {getActivityTypeLabel()}
            </span>
            <div className="flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-sm">
              <MapPin size={14} className="text-blue-600" />
              <span className="text-sm text-gray-900">{activity.distance}</span>
            </div>
          </div>

          {/* Panel content */}
          <div key={currentPanel} className="h-full w-full">
            {/* Image - 50% height */}
            <div className="relative h-1/2 flex-shrink-0">
              <ImageWithFallback
                src={currentPanelData.image}
                alt={currentPanelData.title}
                className="h-full w-full object-cover"
              />

              {/* Vibe badges + time context - only on main panel */}
              {currentPanel === 0 && (
                <div className="absolute bottom-3 left-3 right-3">
                  {/* Metadata Row 1 */}
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    {/* Route-specific metadata */}
                    {activity.contentType === 'route' && activity.route && (
                      <>
                        <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-sm">
                          <span className="text-sm">📏</span>
                          <span className="text-xs text-gray-900">{activity.route.distance}</span>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-sm">
                          <span className="text-sm">⏱️</span>
                          <span className="text-xs text-gray-900">{activity.route.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-sm">
                          <span className="text-sm">⛰️</span>
                          <span className="text-xs text-gray-900">{activity.route.difficulty}</span>
                        </div>
                      </>
                    )}

                    {/* User-created meetup metadata */}
                    {activity.contentType === 'user-created' && (
                      <>
                        {activity.scheduledTime && (
                          <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-sm">
                            <span className="text-sm">🕐</span>
                            <span className="text-xs text-gray-900">{activity.scheduledTime}</span>
                          </div>
                        )}
                        {activity.participants && (
                          <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-sm">
                            <span className="text-sm">👥</span>
                            <span className="text-xs text-gray-900">
                              {activity.participants.length}/{activity.maxParticipants || '∞'} joined
                            </span>
                          </div>
                        )}
                        {activity.creator && (
                          <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-sm">
                            <span className="text-sm">✨</span>
                            <span className="text-xs text-gray-900">By {activity.creator.name}</span>
                          </div>
                        )}
                      </>
                    )}

                    {/* Seasonal metadata */}
                    {activity.contentType === 'seasonal' && activity.seasonal && (
                      <>
                        <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-sm">
                          <span className="text-sm">📅</span>
                          <span className="text-xs text-gray-900">{activity.seasonal.activeDates}</span>
                        </div>
                        {activity.seasonal.difficulty && (
                          <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-sm">
                            <span className="text-sm">⛰️</span>
                            <span className="text-xs text-gray-900">{activity.seasonal.difficulty}</span>
                          </div>
                        )}
                      </>
                    )}

                    {/* Standard spot metadata */}
                    {(!activity.contentType || activity.contentType === 'standard') && (
                      <>
                        <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-sm">
                          <span className="text-sm">👥</span>
                          <span className="text-xs text-gray-900">{activity.currentConditions.crowdLevel}</span>
                        </div>
                        
                        {activity.currentConditions.lightCondition && (
                          <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-sm">
                            <span className="text-sm">🌤️</span>
                            <span className="text-xs text-gray-900">{activity.currentConditions.lightCondition}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-sm">
                          <span className="text-sm">🍃</span>
                          <span className="text-xs text-gray-900">{activity.currentConditions.atmosphere}</span>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Special Moment - Row 2 */}
                  {activity.specialMoment && (
                    <div className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1.5 shadow-lg">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">✨</span>
                        <span className="text-xs text-white">{activity.specialMoment}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Panel indicators */}
              {panels.length > 1 && (
                <div className="absolute bottom-3 right-3 flex gap-1.5">
                  {panels.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentPanel
                          ? 'w-6 bg-white shadow-md'
                          : 'w-1.5 bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Content - 50% height */}
            <div className="flex flex-1 flex-col justify-between p-6 pb-14">
              <div>
                <h2 className="mb-3 text-2xl text-gray-900 leading-tight">
                  {currentPanelData.title}
                </h2>

                <p className={`text-[15px] leading-relaxed text-gray-600 ${
                  currentPanel === 0 ? 'line-clamp-2' : 'line-clamp-4'
                }`}>
                  {currentPanelData.description}
                </p>
              </div>

              {/* Metadata - only on main panel */}
              {currentPanel === 0 && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <Users size={16} className="text-gray-400" />
                    <span>{activity.savedByCount} saved this</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="truncate">{activity.location}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Swipe feedback overlays */}
          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-3xl"
            style={{
              opacity: useTransform(x, [0, 150], [0, 1]),
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(34, 197, 94, 0.15))',
            }}
          >
            <motion.div
              className="flex flex-col items-center gap-3"
              style={{ scale: useTransform(x, [0, 150], [0.8, 1]) }}
            >
              <div className="rounded-2xl border-4 border-green-500 bg-white p-4 shadow-2xl">
                <Check size={56} strokeWidth={3} className="text-green-500" />
              </div>
              <span className="text-xl text-green-600">SAVE</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-3xl"
            style={{
              opacity: useTransform(x, [-150, 0], [1, 0]),
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(249, 115, 22, 0.15))',
            }}
          >
            <motion.div
              className="flex flex-col items-center gap-3"
              style={{ scale: useTransform(x, [-150, 0], [1, 0.8]) }}
            >
              <div className="rounded-2xl border-4 border-red-500 bg-white p-4 shadow-2xl">
                <X size={56} strokeWidth={3} className="text-red-500" />
              </div>
              <span className="text-xl text-red-600">PASS</span>
            </motion.div>
          </motion.div>

          {/* Drag up feedback */}
          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-3xl"
            style={{
              opacity: useTransform(y, [-100, 0], [1, 0]),
              background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15))',
            }}
          >
            <motion.div style={{ scale: useTransform(y, [-100, 0], [1, 0.8]) }}>
              <div className="rounded-2xl border-4 border-blue-500 bg-white px-6 py-4 shadow-2xl">
                <div className="flex items-center gap-3 text-blue-600">
                  <ChevronUp size={32} strokeWidth={3} />
                  <span className="text-lg">VIEW DETAILS</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Already saved indicator */}
          {isSaved && (
            <div className="absolute top-4 right-4 z-10 rounded-full bg-green-500 p-2 shadow-lg">
              <Check size={16} className="text-white" strokeWidth={3} />
            </div>
          )}

          {/* Mark as went indicator */}
          {isCompleted && (
            <div className="absolute top-4 left-4 z-10 rounded-full bg-blue-500 p-2 shadow-lg">
              <Check size={16} className="text-white" strokeWidth={3} />
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}

function Check({ size, strokeWidth, className }: { size: number; strokeWidth?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth || 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}