import { Heart, MapPin, X, Clock, Calendar, ChevronDown, ChevronUp, Users, ShoppingBag, Coffee } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Activity } from '../App';
import { useState, useEffect } from 'react';
import BookingConfirmationModal from './BookingConfirmationModal';

type Props = {
  onOpenActivity: (activity: Activity) => void;
};

type TabType = 'saved' | 'planned';

type PlannedItem = {
  id: string;
  title: string;
  subtitle: string;
  type: 'sub-activity' | 'booked-service' | 'booked-product';
  scheduledDateTime: Date;
  location: string;
  relatedActivity?: Activity;
  isCompleted: boolean;
  description?: string;
  host?: string;
  participants?: number;
  provider?: string;
  addOns?: string[];
};

export default function SavedList({ onOpenActivity }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('saved');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showPastPlans, setShowPastPlans] = useState(false);
  const [selectedPlannedItem, setSelectedPlannedItem] = useState<PlannedItem | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Mock saved spots and activities (ONLY spots and activities, no sub-activities)
  const savedActivities: Activity[] = [
    {
      id: '1',
      title: 'Golden Gate Viewpoint',
      description: 'Perfect spot for sunrise photography',
      fullDescription: 'This iconic viewpoint offers stunning views of the Golden Gate Bridge.',
      photo: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
      photos: [
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
        'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
      ],
      category: 'Spot',
      activityType: 'solo',
      vibe: ['Scenic', 'Peaceful'],
      timeContext: 'Sunrise',
      indoor: false,
      distance: '2.3 km',
      savedByCount: 245,
      goodFor: ['Photography', 'Sightseeing'],
      location: 'San Francisco',
      costLevel: 'Free',
      averageRating: 4.8,
      totalRatings: 120,
      communityPhotos: [],
      threads: [],
      currentConditions: {
        crowdLevel: 'Quiet',
        atmosphere: 'Calm',
        lightCondition: 'Golden Hour',
      },
      specialMoment: 'Best at sunrise',
    },
    {
      id: '2',
      title: 'Urban Coffee Roasters',
      description: 'Artisanal coffee and great wifi',
      fullDescription: 'A cozy cafe perfect for working and meetings.',
      photo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
      photos: [
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
        'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800',
      ],
      category: 'Activity',
      activityType: 'passive-social',
      vibe: ['Cozy', 'Productive'],
      timeContext: 'Morning',
      indoor: true,
      distance: '0.8 km',
      savedByCount: 189,
      goodFor: ['Work', 'Coffee'],
      location: 'Downtown',
      costLevel: '$$',
      averageRating: 4.6,
      totalRatings: 95,
      communityPhotos: [],
      threads: [],
      currentConditions: {
        crowdLevel: 'Moderate',
        atmosphere: 'Productive',
      },
    },
    {
      id: '3',
      title: 'Twin Peaks Sunset Hike',
      description: '360° views of the city',
      fullDescription: 'Popular hiking spot with panoramic city views.',
      photo: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
      photos: [
        'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
      ],
      category: 'Activity',
      activityType: 'active-social',
      vibe: ['Active', 'Scenic'],
      timeContext: 'Sunset',
      indoor: false,
      distance: '4.1 km',
      savedByCount: 312,
      goodFor: ['Hiking', 'Photography'],
      location: 'Twin Peaks',
      costLevel: 'Free',
      averageRating: 4.9,
      totalRatings: 180,
      communityPhotos: [],
      threads: [],
      currentConditions: {
        crowdLevel: 'Busy',
        atmosphere: 'Energetic',
        lightCondition: 'Golden Hour',
      },
      bestTimeToVisit: 'Sunset (5-7 PM)',
      route: {
        distance: '2.5 km',
        duration: '45 min',
        difficulty: 'Moderate',
        elevation: '+150m',
        startPoint: 'Twin Peaks Parking',
        waypoints: [],
      },
    },
    {
      id: '4',
      title: 'Dolores Park',
      description: 'Popular gathering spot with city views',
      fullDescription: 'A vibrant park perfect for picnics and socializing.',
      photo: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800',
      photos: [
        'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
      ],
      category: 'Spot',
      activityType: 'active-social',
      vibe: ['Social', 'Relaxed'],
      timeContext: 'Afternoon',
      indoor: false,
      distance: '1.6 km',
      savedByCount: 425,
      goodFor: ['Picnic', 'Socializing'],
      location: 'Mission District',
      costLevel: 'Free',
      averageRating: 4.7,
      totalRatings: 210,
      communityPhotos: [],
      threads: [],
      currentConditions: {
        crowdLevel: 'Very Busy',
        atmosphere: 'Lively',
      },
      specialMoment: 'Weekends are buzzing',
    },
    {
      id: '5',
      title: 'Ocean Beach',
      description: 'Watch the waves and sunset',
      fullDescription: 'Beautiful beach perfect for sunset walks.',
      photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      photos: [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
      ],
      category: 'Spot',
      activityType: 'solo',
      vibe: ['Peaceful', 'Scenic'],
      timeContext: 'Sunset',
      indoor: false,
      distance: '6.2 km',
      savedByCount: 389,
      goodFor: ['Walking', 'Photography'],
      location: 'Outer Sunset',
      costLevel: 'Free',
      averageRating: 4.8,
      totalRatings: 165,
      communityPhotos: [],
      threads: [],
      currentConditions: {
        crowdLevel: 'Moderate',
        atmosphere: 'Peaceful',
        lightCondition: 'Golden Hour',
      },
      bestTimeToVisit: 'Sunset (6-8 PM)',
    },
  ];

  // Mock planned items (ONLY joined sub-activities and booked services)
  const plannedItems: PlannedItem[] = [
    {
      id: 'p1',
      title: 'Sunset Photography Meetup',
      subtitle: 'Sub-activity',
      type: 'sub-activity',
      scheduledDateTime: new Date(Date.now() + 2 * 60 * 60 * 1000 + 14 * 60 * 1000), // 2h 14m from now
      location: 'Griffith Park',
      isCompleted: false,
      description: 'Join a group of photography enthusiasts to capture the sunset at Griffith Park.',
      host: 'John Doe',
      participants: 15,
      relatedActivity: savedActivities[0], // Golden Gate Viewpoint
    },
    {
      id: 'p2',
      title: 'Coffee Tasting Workshop',
      subtitle: 'Sub-activity',
      type: 'sub-activity',
      scheduledDateTime: new Date(Date.now() + 26 * 60 * 60 * 1000), // Tomorrow
      location: 'Downtown Coffee Lab',
      isCompleted: false,
      description: 'Learn about different coffee blends and brewing techniques in a hands-on workshop.',
      host: 'Jane Smith',
      participants: 10,
      relatedActivity: savedActivities[1], // Urban Coffee Roasters
    },
    {
      id: 'p3',
      title: 'Yoga Mat Rental',
      subtitle: 'Booked service',
      type: 'booked-service',
      scheduledDateTime: new Date(Date.now() + 75 * 60 * 60 * 1000), // 3 days
      location: 'Zen Studio',
      isCompleted: false,
      description: 'Rent a yoga mat for your next practice session at Zen Studio.',
      provider: 'Zen Studio',
      addOns: ['Yoga Blocks', 'Yoga Strap'],
    },
    {
      id: 'p4',
      title: 'Picnic Basket Order',
      subtitle: 'Booked product',
      type: 'booked-product',
      scheduledDateTime: new Date(Date.now() + 96 * 60 * 60 * 1000), // 4 days
      location: 'Gourmet Market',
      isCompleted: false,
      description: 'Order a picnic basket with fresh fruits, cheeses, and a bottle of wine from Gourmet Market.',
      provider: 'Gourmet Market',
    },
  ];

  // Mock past planned items
  const pastPlannedItems: PlannedItem[] = [
    {
      id: 'past1',
      title: 'Morning Yoga Session',
      subtitle: 'Sub-activity',
      type: 'sub-activity',
      scheduledDateTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      location: 'Marina Green',
      isCompleted: true,
      description: 'Join a morning yoga session at Marina Green to start your day with relaxation.',
      host: 'Alice Johnson',
      participants: 20,
    },
    {
      id: 'past2',
      title: 'Bike Rental',
      subtitle: 'Booked service',
      type: 'booked-service',
      scheduledDateTime: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      location: 'Bay Bikes',
      isCompleted: true,
      description: 'Rent a bike from Bay Bikes for a scenic ride around the city.',
      provider: 'Bay Bikes',
    },
    {
      id: 'past3',
      title: 'Lunch Box Pickup',
      subtitle: 'Booked product',
      type: 'booked-product',
      scheduledDateTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      location: 'Healthy Eats',
      isCompleted: true,
      description: 'Pick up a healthy lunch box from Healthy Eats to enjoy a nutritious meal.',
      provider: 'Healthy Eats',
    },
  ];

  // Update time every minute for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getCountdown = (targetDate: Date) => {
    const now = currentTime.getTime();
    const target = targetDate.getTime();
    const diff = target - now;

    if (diff < 0) return 'Started';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const days = Math.floor(hours / 24);

    if (days > 1) {
      return `In ${days} days`;
    } else if (days === 1) {
      return `Tomorrow`;
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
      return { label: 'Started', color: 'bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400' };
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

  const getIconForType = (type: PlannedItem['type']) => {
    switch (type) {
      case 'sub-activity':
        return <Users size={16} />;
      case 'booked-service':
        return <Calendar size={16} />;
      case 'booked-product':
        return <ShoppingBag size={16} />;
    }
  };

  return (
    <div className="flex h-full flex-col bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-lg px-6 pt-8 pb-4">
        <h1 className="mb-4 text-3xl text-foreground">Saved</h1>
        
        {/* Tab Segmented Control */}
        <div className="flex gap-2 rounded-full bg-secondary p-1">
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
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {activeTab === 'saved' ? (
          // SAVED TAB - Only Spots and Activities
          <div>
            {savedActivities.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 text-6xl">💫</div>
                <h2 className="mb-2 text-xl text-foreground">Nothing saved yet</h2>
                <p className="text-muted-foreground">
                  Explore and save spots and activities you want to visit
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {savedActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex gap-4">
                      {/* Image */}
                      <div 
                        onClick={() => onOpenActivity(activity)}
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
                        onClick={() => onOpenActivity(activity)}
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
                          // Handle remove logic
                        }}
                        className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground backdrop-blur-sm transition-all hover:bg-red-100 hover:text-red-600 active:scale-95 dark:hover:bg-red-500/20 dark:hover:text-red-400"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // PLANNED TAB - Joined sub-activities and booked services
          <div>
            {/* Upcoming Plans */}
            <div className="mb-6">
              <h2 className="mb-3 text-lg text-foreground">Upcoming Plans</h2>
              {plannedItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 text-6xl">📅</div>
                  <h3 className="mb-2 text-foreground">No upcoming plans</h3>
                  <p className="text-sm text-muted-foreground">
                    Join sub-activities or book services to see them here
                  </p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {plannedItems.map((item) => {
                    const countdown = getCountdown(item.scheduledDateTime);
                    const status = getStatusBadge(item.scheduledDateTime);

                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          if (item.type === 'sub-activity' && item.relatedActivity) {
                            // Open parent activity page for sub-activities
                            onOpenActivity(item.relatedActivity);
                          } else if (item.type !== 'sub-activity') {
                            // Open booking modal for booked services/products
                            setSelectedPlannedItem(item);
                            setShowBookingModal(true);
                          }
                        }}
                        className="overflow-hidden rounded-2xl border-l-4 border-l-blue-600 border-r border-t border-b border-border bg-card p-4 shadow-sm transition-all hover:shadow-md cursor-pointer"
                      >
                        <div className="flex items-start justify-between gap-3">
                          {/* Icon */}
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                            {getIconForType(item.type)}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            {/* Title & Subtitle */}
                            <h3 className="mb-1 text-base text-foreground leading-tight">
                              {item.title}
                            </h3>
                            <p className="mb-2 text-sm text-muted-foreground">
                              {item.subtitle}
                            </p>

                            {/* Location */}
                            <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                              <MapPin size={12} />
                              <span>{item.location}</span>
                            </div>

                            {/* Date & Time */}
                            <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Calendar size={12} />
                              <span>
                                {item.scheduledDateTime.toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: 'numeric',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>

                            {/* Countdown */}
                            <div className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400">
                              <Clock size={14} />
                              <span className="font-medium">{countdown}</span>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <div>
                            <span className={`inline-block rounded-full px-2.5 py-1 text-xs ${status.color}`}>
                              {status.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Past Plans Section */}
            {pastPlannedItems.length > 0 && (
              <div className="mt-8 border-t border-border pt-6">
                <button
                  onClick={() => setShowPastPlans(!showPastPlans)}
                  className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary/80"
                >
                  <span>Show past plans</span>
                  {showPastPlans ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {showPastPlans && (
                  <div className="grid gap-3">
                    {pastPlannedItems.map((item) => (
                      <div
                        key={item.id}
                        className="overflow-hidden rounded-2xl border border-border bg-card p-4 opacity-60 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          {/* Icon */}
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-500/20 dark:text-gray-400">
                            {getIconForType(item.type)}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            {/* Title & Subtitle */}
                            <h3 className="mb-1 text-base text-foreground leading-tight">
                              {item.title}
                            </h3>
                            <p className="mb-2 text-sm text-muted-foreground">
                              {item.subtitle}
                            </p>

                            {/* Location */}
                            <div className="mb-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                              <MapPin size={12} />
                              <span>{item.location}</span>
                            </div>

                            {/* Date & Time */}
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Calendar size={12} />
                              <span>
                                {item.scheduledDateTime.toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: 'numeric',
                                  minute: '2-digit',
                                })}
                              </span>
                            </div>
                          </div>

                          {/* Completed Badge */}
                          <div>
                            <span className="inline-block rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600 dark:bg-gray-500/20 dark:text-gray-400">
                              Completed
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* BookingConfirmationModal */}
      {showBookingModal && (
        <BookingConfirmationModal
          item={selectedPlannedItem}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
}