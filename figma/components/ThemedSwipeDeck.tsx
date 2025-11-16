import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import type { Activity } from '../App';
import type { Theme } from './ThemeRow';
import { MapPin, ChevronLeft, ChevronRight, ArrowUp, ArrowLeft, Plus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ActivityDetails from './ActivityDetails';
import CreateActivity from './CreateActivity';

type Props = {
  activities: Activity[];
  theme: Theme;
  onSaveActivity: (activity: Activity) => void;
  savedActivities: Activity[];
  onMarkAsWent: (activityId: string) => void;
  completedActivities: string[];
  onExitTheme: () => void;
};

// Theme-specific metadata mapping
const getThemeMetadata = (activity: Activity, themeName: string, subTheme?: string) => {
  // Sub-theme specific metadata
  if (subTheme) {
    const subThemeMetadata: Record<string, Record<string, string[]>> = {
      'Nature': {
        'Hikes': ['Moderate incline', 'Trail conditions good', 'Elevation gain 200m', 'Well-marked path'],
        'Scenic Views': ['Best view at sunset', 'Clear visibility', 'Photo-worthy', 'Panoramic vista'],
        'Forest Walks': ['Shaded path', 'Cool temperature', 'Bird sounds', 'Peaceful atmosphere'],
        'Lakes & Swims': ['Water temp comfortable', 'Good swimming area', 'Beach access', 'Clean water'],
        'Nature Photography': ['Soft light now', 'Golden hour soon', 'Great composition', 'Natural frames'],
        'Picnic Spots': ['Flat ground', 'Shade available', 'Quiet area', 'Easy access'],
        'Sunrise / Sunset': ['Perfect timing', 'Clear horizon', 'Golden light', 'Colorful sky expected'],
        'Easy Walks': ['Flat terrain', 'Short distance', 'Family-friendly', 'Paved path'],
        'Hard Treks': ['Steep sections', 'Experience needed', 'High elevation', 'Challenging route'],
      },
      'Fitness': {
        'Running Routes': ['Good surface', 'Flat terrain', 'Well-lit path', 'Water fountain nearby'],
        'Outdoor Gyms': ['Equipment available', 'Shaded area', 'Not crowded', 'All-level friendly'],
        'Football Fields': ['Field available', 'Good grass', 'Goal posts present', 'Open for public'],
        'Water Sports': ['Good conditions', 'Equipment rental', 'Safe area', 'Instructor available'],
        'Cycling Routes': ['Bike lane', 'Smooth road', 'Scenic route', 'Low traffic'],
        'Climbing': ['Routes for all levels', 'Safety equipment', 'Experienced staff', 'Indoor & outdoor'],
        'Workout Meetups': ['Group forming', 'All levels welcome', 'Regular schedule', 'Social atmosphere'],
      },
      'Photography': {
        'Portrait Spots': ['Good lighting', 'Clean background', 'Interesting textures', 'Less crowded'],
        'Landscape Shots': ['Wide vista', 'Natural elements', 'Depth available', 'Dynamic sky'],
        'Night Photography': ['Low light pollution', 'Safe area', 'Interesting lights', 'City backdrop'],
        'Reflections': ['Still water', 'Clear surface', 'Symmetry', 'Good angles'],
        'Street Photography': ['Busy area', 'Diverse scenes', 'Good light', 'Authentic moments'],
        'Colorful Scenes': ['Vibrant colors', 'Murals nearby', 'Seasonal blooms', 'Artistic elements'],
      },
      'Cozy': {
        'Coffee Meetups': ['Cozy atmosphere', 'Good WiFi', 'Quiet corners', 'Great coffee'],
        'Study Together': ['Quiet space', 'Power outlets', 'Good WiFi', 'Long tables'],
        'Board Games': ['Game library', 'Table space', 'Friendly crowd', 'Snacks available'],
        'Food Hangouts': ['Diverse menu', 'Share plates', 'Social seating', 'Good for groups'],
      },
      'Solo Exploration': {
        'Coffee Meetups': ['Cozy atmosphere', 'Good WiFi', 'Quiet corners', 'Great coffee'],
        'Study Together': ['Quiet space', 'Power outlets', 'Good WiFi', 'Long tables'],
        'Walking Partner': ['Safe route', 'Well-lit', 'Conversation-friendly', 'Regular meetups'],
        'Board Games': ['Game library', 'Table space', 'Friendly crowd', 'Snacks available'],
        'Fitness Partner': ['Matching level', 'Flexible schedule', 'Motivating vibe', 'Regular sessions'],
        'Food Hangouts': ['Diverse menu', 'Share plates', 'Social seating', 'Good for groups'],
        'Night Walks': ['Well-lit area', 'Safe neighborhood', 'Interesting sights', 'Peaceful vibe'],
      },
    };

    return subThemeMetadata[themeName]?.[subTheme] || [];
  }

  // Default theme metadata
  const themeConfig: Record<string, string[]> = {
    'Fitness': [
      'Outdoor workout-friendly',
      'Good airflow',
      'Energy level high',
      'Enough space to move'
    ],
    'Morning Routines': [
      'Perfect for sunrise',
      'Quiet morning hours',
      'Fresh coffee nearby',
      'Peaceful start'
    ],
    'Solo Exploration': [
      'Peaceful atmosphere',
      'Self-paced activity',
      'Reflective space',
      'Solo-friendly'
    ],
    'Creative Spaces': [
      'Inspiring environment',
      'Natural light',
      'Creative energy',
      'Quiet workspace'
    ],
  };

  return themeConfig[themeName] || [
    activity.currentConditions.crowdLevel,
    activity.currentConditions.atmosphere,
    activity.currentConditions.lightCondition || 'Good lighting',
  ];
};

// Theme icon mapping
const getThemeIcon = (themeName: string) => {
  const icons: Record<string, string> = {
    'Fitness': '🏋️',
    'Morning Routines': '🌅',
    'Solo Exploration': '🧭',
    'Creative Spaces': '🎨',
    'Nature Walks': '🌲',
    'Nature': '🌲',
    'Coffee Culture': '☕',
    'Night Life': '🌙',
    'Photography': '📸',
    'Cozy': '☕',
  };
  return icons[themeName] || '✨';
};

// Sub-themes configuration
const getSubThemes = (themeName: string): string[] => {
  const subThemes: Record<string, string[]> = {
    'Nature': [
      'Hikes',
      'Scenic Views',
      'Forest Walks',
      'Lakes & Swims',
      'Nature Photography',
      'Picnic Spots',
      'Sunrise / Sunset',
      'Easy Walks',
      'Hard Treks',
    ],
    'Fitness': [
      'Running Routes',
      'Outdoor Gyms',
      'Football Fields',
      'Water Sports',
      'Cycling Routes',
      'Climbing',
      'Workout Meetups',
    ],
    'Photography': [
      'Portrait Spots',
      'Landscape Shots',
      'Night Photography',
      'Reflections',
      'Street Photography',
      'Colorful Scenes',
    ],
    'Cozy': [
      'Coffee Meetups',
      'Study Together',
      'Board Games',
      'Food Hangouts',
    ],
    'Solo Exploration': [
      'Coffee Meetups',
      'Study Together',
      'Walking Partner',
      'Board Games',
      'Fitness Partner',
      'Food Hangouts',
      'Night Walks',
    ],
  };

  return subThemes[themeName] || [];
};

export default function ThemedSwipeDeck({
  activities,
  theme,
  onSaveActivity,
  savedActivities,
  onMarkAsWent,
  completedActivities,
  onExitTheme,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [currentPanel, setCurrentPanel] = useState(0);
  const [selectedSubTheme, setSelectedSubTheme] = useState<string | null>(null);

  const subThemes = getSubThemes(theme.name);
  
  // Filter activities based on selected sub-theme
  const filteredActivities = selectedSubTheme
    ? activities.filter(activity => activity.subTheme === selectedSubTheme)
    : activities;

  const currentActivity = filteredActivities[currentIndex];
  const nextActivity = filteredActivities[currentIndex + 1];

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 100;
    if (Math.abs(info.offset.x) > threshold) {
      const swipeDirection = info.offset.x > 0 ? 'right' : 'left';
      setDirection(swipeDirection);
      
      if (swipeDirection === 'right' && currentActivity) {
        onSaveActivity(currentActivity);
      }

      setTimeout(() => {
        if (currentIndex < filteredActivities.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setCurrentPanel(0);
        }
        setDirection(null);
      }, 200);
    }
  };

  const handleTapSide = (side: 'left' | 'right') => {
    if (side === 'right') {
      const maxPanels = 2 + (currentActivity?.photos?.length || 0);
      if (currentPanel < maxPanels) {
        setCurrentPanel(currentPanel + 1);
      }
    } else {
      if (currentPanel > 0) {
        setCurrentPanel(currentPanel - 1);
      }
    }
  };

  const isSaved = savedActivities.some(a => a.id === currentActivity?.id);
  const isCompleted = completedActivities.includes(currentActivity?.id || '');

  if (!currentActivity) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-6 text-center">
        <div className="mb-4 text-6xl">{getThemeIcon(theme.name)}</div>
        <h2 className="mb-2 text-2xl text-gray-900">You've explored all {theme.name} activities!</h2>
        <p className="mb-6 text-gray-600">Check back later for new activities</p>
        <button
          onClick={onExitTheme}
          className="rounded-2xl bg-blue-600 px-6 py-3 text-white transition-all hover:bg-blue-700 active:scale-95"
        >
          Exit Theme
        </button>
      </div>
    );
  }

  if (selectedActivity) {
    return (
      <ActivityDetails
        activity={selectedActivity}
        onClose={() => setSelectedActivity(null)}
        onSave={() => onSaveActivity(selectedActivity)}
        isSaved={savedActivities.some(a => a.id === selectedActivity.id)}
        onMarkAsWent={onMarkAsWent}
      />
    );
  }

  const themeMetadata = getThemeMetadata(currentActivity, theme.name, currentActivity.subTheme);
  const themeIcon = getThemeIcon(theme.name);

  const renderPanelContent = () => {
    if (currentPanel === 0) {
      return (
        <>
          <ImageWithFallback
            src={currentActivity.photo}
            alt={currentActivity.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          
          <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
            <div className="flex flex-wrap gap-2">
              {currentActivity.vibe.slice(0, 2).map(vibe => (
                <span key={vibe} className="rounded-full bg-white/95 px-3 py-1.5 text-xs text-gray-900 shadow-lg backdrop-blur-sm">
                  {vibe}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-sm">
              <MapPin size={14} className="text-blue-600" />
              <span className="text-xs text-gray-900">{currentActivity.distance}</span>
            </div>
          </div>

          <div className="absolute bottom-5 left-5 right-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-full bg-blue-600 px-3 py-1 text-xs text-white">
                {currentActivity.category}
              </span>
              <span className={`rounded-full bg-gradient-to-r ${theme.gradient} px-3 py-1 text-xs text-white shadow-md`}>
                Theme: {theme.name}
              </span>
            </div>
            <h2 className="mb-2 text-2xl text-white drop-shadow-lg">
              {currentActivity.title}
            </h2>
            <p className="mb-3 text-sm text-white/90 drop-shadow-md line-clamp-2">
              {currentActivity.description}
            </p>
            
            {/* Theme-specific metadata */}
            <div className="flex flex-wrap items-center gap-2">
              {themeMetadata.slice(0, 3).map((meta, index) => (
                <div key={index} className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-sm">
                  <span className="text-xs text-gray-900">{meta}</span>
                </div>
              ))}
            </div>
            
            {/* Special Moment */}
            {currentActivity.specialMoment && (
              <div className="mt-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1.5 shadow-lg">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">✨</span>
                  <span className="text-xs text-white">{currentActivity.specialMoment}</span>
                </div>
              </div>
            )}
          </div>
        </>
      );
    } else if (currentPanel === 1) {
      return (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 p-6">
            <h3 className="mb-4 text-xl text-gray-900">What to know</h3>
            <div className="space-y-3">
              {currentActivity.goodFor.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-blue-600" />
                  <p className="text-sm text-gray-700">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-sm text-gray-700 leading-relaxed">
                {currentActivity.fullDescription}
              </p>
            </div>
          </div>
        </>
      );
    } else {
      const photoIndex = currentPanel - 2;
      const photos = currentActivity.photos || [];
      if (photoIndex < photos.length) {
        return (
          <>
            <ImageWithFallback
              src={photos[photoIndex]}
              alt={`${currentActivity.title} ${photoIndex + 1}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-sm text-white/90">
                Photo {photoIndex + 1} of {photos.length}
              </p>
            </div>
          </>
        );
      }
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Theme Header Banner */}
      <div className={`bg-gradient-to-r ${theme.gradient} px-5 py-4 shadow-md`}>
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onExitTheme}
            className="flex items-center gap-2 text-sm text-white/90 hover:text-white active:scale-95 transition-all"
          >
            <ArrowLeft size={18} />
            <span>Exit Theme</span>
          </button>
          <div className="text-xs text-white/90">
            {currentIndex + 1} / {filteredActivities.length} in {theme.name} Pack
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="text-3xl">{themeIcon}</div>
          <div className="flex-1">
            <h1 className="text-xl text-white mb-0.5">{theme.name}</h1>
            <p className="text-sm text-white/80 line-clamp-1">{theme.description}</p>
          </div>
        </div>
      </div>

      {/* Themed Tag */}
      <div className="flex items-center justify-center py-3 bg-white border-b border-gray-200">
        <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${theme.gradient} px-4 py-1.5 shadow-md`}>
          <span className="text-sm">{themeIcon}</span>
          <span className="text-sm text-white">{theme.name} Pack</span>
        </div>
      </div>

      {/* Sub-Theme Strip */}
      {subThemes.length > 0 && (
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {subThemes.map((subTheme) => (
              <button
                key={subTheme}
                onClick={() => {
                  if (selectedSubTheme === subTheme) {
                    setSelectedSubTheme(null);
                    setCurrentIndex(0);
                  } else {
                    setSelectedSubTheme(subTheme);
                    setCurrentIndex(0);
                  }
                }}
                className={`flex-shrink-0 rounded-full px-4 py-2 text-sm transition-all active:scale-95 ${
                  selectedSubTheme === subTheme
                    ? `bg-gradient-to-r ${theme.gradient} text-white shadow-md`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {subTheme}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Swipe Deck Area */}
      <div className="relative flex-1 overflow-hidden p-5">
        {/* Status Badges */}
        {(isSaved || isCompleted) && (
          <div className="absolute top-8 left-8 z-20 flex gap-2">
            {isSaved && (
              <div className="rounded-full bg-green-600 px-3 py-1.5 text-xs text-white shadow-lg">
                ✓ Saved
              </div>
            )}
            {isCompleted && (
              <div className="rounded-full bg-blue-600 px-3 py-1.5 text-xs text-white shadow-lg">
                ✓ Completed
              </div>
            )}
          </div>
        )}

        {/* Next card (background) */}
        {nextActivity && (
          <div className="absolute left-5 right-5 top-0 h-[calc(100%-40px)] overflow-hidden rounded-3xl bg-white shadow-xl">
            <ImageWithFallback
              src={nextActivity.photo}
              alt={nextActivity.title}
              className="h-full w-full object-cover opacity-40"
            />
          </div>
        )}

        {/* Current card */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          style={{ x, rotate, opacity }}
          className="absolute left-5 right-5 top-0 h-[calc(100%-40px)] cursor-grab overflow-hidden rounded-3xl bg-white shadow-2xl active:cursor-grabbing"
        >
          {/* Tap zones for navigation */}
          <button
            onClick={() => handleTapSide('left')}
            className="absolute left-0 top-0 bottom-0 z-10 w-1/3"
            aria-label="Previous panel"
          />
          <button
            onClick={() => handleTapSide('right')}
            className="absolute right-0 top-0 bottom-0 z-10 w-1/3"
            aria-label="Next panel"
          />

          {/* Panel content */}
          <div className="relative h-full w-full">
            {renderPanelContent()}
          </div>

          {/* Swipe overlays */}
          {direction === 'right' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-green-600/20"
            >
              <div className="rounded-full border-4 border-green-600 bg-white px-6 py-3 text-xl text-green-600 shadow-xl">
                SAVED ✓
              </div>
            </motion.div>
          )}
          {direction === 'left' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-red-600/20"
            >
              <div className="rounded-full border-4 border-red-600 bg-white px-6 py-3 text-xl text-red-600 shadow-xl">
                PASS
              </div>
            </motion.div>
          )}

          {/* Panel indicators */}
          <div className="absolute top-5 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
            {[...Array(3 + (currentActivity.photos?.length || 0))].map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all ${
                  i === currentPanel ? 'w-6 bg-white' : 'w-1 bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Full details button */}
          <button
            onClick={() => setSelectedActivity(currentActivity)}
            className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center justify-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 shadow-lg backdrop-blur-sm text-xs text-gray-600 hover:bg-white active:scale-95 transition-all z-10"
          >
            <ArrowUp size={14} />
            Full details
          </button>
        </motion.div>

        {/* Centered arrow button */}
        <div className="absolute bottom-5 left-0 right-0 flex items-center justify-center">
          <button
            onClick={() => setSelectedActivity(currentActivity)}
            className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r ${theme.gradient} text-white shadow-xl transition-all hover:scale-110 active:scale-95`}
          >
            <ArrowUp size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}