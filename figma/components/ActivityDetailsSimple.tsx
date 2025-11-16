import { useState } from 'react';
import { X, Heart, MessageCircle, ThumbsUp, Users, MapPin, Clock, TrendingUp, Plus, Star, ChevronRight, Share2, Sparkles, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ActivityChat from './ActivityChat';
import UniversalSwipeDeck from './UniversalSwipeDeck';
import RelatedActivitiesModal from './RelatedActivitiesModal';
import AllSubActivities from './AllSubActivities';
import SubActivityDetails from './SubActivityDetails';
import CreateSubActivity from './CreateSubActivity';
import PackServiceSheet from './PackServiceSheet';
import RoamyAIChat from './RoamyAIChat';
import ShareActivitySheet from './ShareActivitySheet';
import ServiceDetails from './ServiceDetails';
import DeliveryConfirmation from './DeliveryConfirmation';
import RateExperienceSheet from './RateExperienceSheet';
import AllReviewsPage from './AllReviewsPage';
import DraggableCarousel from './DraggableCarousel';
import type { Activity } from '../App';

type EnhanceOption = {
  id: string;
  name: string;
  providerName: string;
  price: string;
  eta: string;
  content: string;
  aiNote: string;
  image: string;
  type: 'food' | 'drink' | 'guide' | 'equipment' | 'workshop' | 'experience';
  tag?: {
    text: string;
    emoji: string;
    bgColor: string;
    textColor: string;
  };
  isService?: boolean;
  availableTimes?: string[];
  meetingPoint?: string;
  rating?: number;
  totalReviews?: number;
  addOns?: { id: string; name: string; price: string; description: string }[];
};

type SubActivity = {
  id: string;
  title: string;
  description: string;
  type: 'challenge' | 'meetup' | 'route';
  icon: string;
  upvotes: number;
  participants: number;
  difficulty?: string;
  date?: string;
  spotName?: string;
  owner?: {
    id: string;
    name: string;
    avatar: string;
  };
};

type ViewState = 'details' | 'chat' | 'allSubActivities' | 'subActivityDetails' | 'createSubActivity' | 'serviceDetails';

type Props = {
  activity: Activity;
  onBack: () => void;
  onSave: () => void;
  onJoin: () => void;
  onOpenThread?: (threadId: string) => void;
  onViewAllThreads?: () => void;
  onCreateThread?: () => void;
  isSaved?: boolean;
};

export default function ActivityDetailsSimple({ activity, onBack, onSave, onJoin, onOpenThread, onViewAllThreads, onCreateThread, isSaved = false }: Props) {
  const [viewState, setViewState] = useState<ViewState>('details');
  const [showRelated, setShowRelated] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [selectedSubActivity, setSelectedSubActivity] = useState<SubActivity | null>(null);
  const [selectedPack, setSelectedPack] = useState<any | null>(null);
  const [showRoamyChat, setShowRoamyChat] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [showPackConfirmation, setShowPackConfirmation] = useState(false);
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [selectedServices, setSelectedServices] = useState<EnhanceOption[]>([]);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [hasVisited, setHasVisited] = useState(false);
  const [showRateExperience, setShowRateExperience] = useState(false);
  const [userReview, setUserReview] = useState<{ rating: number; tags: string[]; comment: string; timestamp: string } | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [subActivities, setSubActivities] = useState<SubActivity[]>([
    {
      id: '1',
      title: 'Sunset Photography Challenge',
      description: 'Capture the best sunset photo',
      type: 'challenge',
      icon: '📸',
      upvotes: 24,
      participants: 12,
      difficulty: 'Easy',
      date: 'Nov 18, 6:30 PM',
      owner: {
        id: 'user2',
        name: 'Emma Wilson',
        avatar: 'https://i.pravatar.cc/150?u=emma',
      },
    },
    {
      id: '2',
      title: 'Morning Joggers Meetup',
      description: 'Join us for a 5K morning run',
      type: 'meetup',
      icon: '🏃',
      upvotes: 18,
      participants: 8,
      date: 'Nov 17, 7:00 AM',
      owner: {
        id: 'user3',
        name: 'Mike Chen',
        avatar: 'https://i.pravatar.cc/150?u=mike',
      },
    },
  ]);

  const photos = activity.photos && activity.photos.length > 0 ? activity.photos : [activity.photo];

  // Local Services & Experiences data
  const localServices: EnhanceOption[] = [
    {
      id: 'ls1',
      name: 'Professional Photography Guide',
      providerName: 'Expert Photographer',
      price: '€20/hr',
      eta: '10 min',
      content: 'Expert photographer teaches composition, lighting, and camera settings while exploring scenic spots.',
      aiNote: 'Ideal for capturing the perfect sunrise.',
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400',
      type: 'guide',
      isService: true,
      availableTimes: ['Today, 14:00', 'Today, 16:00', 'Today, 18:00', 'Tomorrow, 10:00', 'Tomorrow, 14:00'],
      meetingPoint: 'Main entrance near parking lot',
      rating: 4.9,
      totalReviews: 87,
      tag: {
        text: 'Sunset in 42 min',
        emoji: '⏰',
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-700',
      },
    },
    {
      id: 'ls2',
      name: 'Equipment Rental (Camera & Tripod)',
      providerName: 'Professional Rentals',
      price: '€12/day',
      eta: '15 min',
      content: 'Professional DSLR camera with wide-angle lens, sturdy tripod, and storage bag. Perfect for landscape photography.',
      aiNote: 'Ideal for capturing the perfect sunrise.',
      image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400',
      type: 'equipment',
      isService: false,
      rating: 4.7,
      totalReviews: 124,
      addOns: [
        { id: 'a10', name: 'Extra Battery', price: '€3.00', description: 'Extended shooting time' },
        { id: 'a11', name: 'Memory Card (64GB)', price: '€5.00', description: 'Store more photos' },
      ],
      tag: {
        text: 'Sunset in 42 min',
        emoji: '⏰',
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-700',
      },
    },
    {
      id: 'ls3',
      name: 'Sunset Hike with Local Expert',
      providerName: 'Local Naturalist',
      price: '€25/person',
      eta: '20 min',
      content: 'Join a small group hike led by a local naturalist. Learn about flora, fauna, and the best sunset viewing spots.',
      aiNote: 'Ideal for capturing the perfect sunrise.',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400',
      type: 'experience',
      isService: true,
      availableTimes: ['Today, 17:30', 'Today, 19:00', 'Tomorrow, 17:30', 'Tomorrow, 19:00'],
      meetingPoint: 'Trailhead parking lot',
      rating: 5.0,
      totalReviews: 53,
      tag: {
        text: 'Sunset in 42 min',
        emoji: '⏰',
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-700',
      },
    },
    {
      id: 'ls4',
      name: 'Intro to Nature Photography',
      providerName: 'Photography Workshop',
      price: '€35',
      eta: '30 min',
      content: 'Hands-on workshop covering camera basics, composition rules, and editing tips. Suitable for beginners.',
      aiNote: 'Ideal for capturing the perfect sunrise.',
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400',
      type: 'workshop',
      isService: true,
      availableTimes: ['Saturday, 10:00', 'Saturday, 14:00', 'Sunday, 10:00', 'Sunday, 14:00'],
      meetingPoint: 'Community center nearby',
      rating: 4.8,
      totalReviews: 76,
      tag: {
        text: 'Sunset in 42 min',
        emoji: '⏰',
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-700',
      },
    },
  ];

  // Wolt AI Packs data
  const woltPacks: EnhanceOption[] = [
    {
      id: '1',
      name: 'Sunset Energy Pack',
      providerName: 'Sunrise Bakery',
      price: '€12.50',
      eta: '10 min',
      content: '2 coffees + 2 croissants + energy bar',
      aiNote: 'Weather cools down in 40 minutes — ideal for sunset paths.',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      type: 'food',
      rating: 4.8,
      totalReviews: 142,
      addOns: [
        { id: 'a1', name: 'Water Bottle', price: '€2.00', description: 'Stay hydrated' },
        { id: 'a2', name: 'Extra Croissant', price: '€3.50', description: 'Freshly baked' },
        { id: 'a3', name: 'Fresh Fruit', price: '€2.50', description: 'Seasonal selection' },
      ],
      tag: {
        text: 'Sunset in 42 min',
        emoji: '⏰',
        bgColor: 'bg-orange-100',
        textColor: 'text-orange-700',
      },
    },
    {
      id: '2',
      name: 'Warm Drink – Cozy Corner Café',
      providerName: 'Cozy Corner Café',
      price: '€4.50',
      eta: 'Available until 19:30',
      content: 'Hot chocolate or coffee of your choice',
      aiNote: 'Popular among users doing this activity today.',
      image: 'https://images.unsplash.com/photo-1514481538271-cf9f99627ab4?w=400',
      type: 'drink',
      rating: 4.6,
      totalReviews: 98,
      addOns: [
        { id: 'a4', name: '+ Whipped Cream', price: '€0.50' },
        { id: 'a5', name: '+ Cookie', price: '€2.00' },
      ],
      tag: {
        text: 'Cold evening ahead',
        emoji: '❄️',
        bgColor: 'bg-blue-100',
        textColor: 'text-blue-700',
      },
    },
    {
      id: '3',
      name: 'Light Snack Box',
      providerName: 'Fresh Bites',
      price: '€8.90',
      eta: '15 min',
      content: 'Snack box for 2 people – pastry + fruit + drinks',
      aiNote: 'Based on your previous saved nature spots.',
      image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400',
      type: 'food',
      rating: 4.9,
      totalReviews: 215,
      addOns: [
        { id: 'a6', name: '+ Extra Juice', price: '€3.00' },
        { id: 'a7', name: '+ Granola Bar', price: '€2.50' },
      ],
      tag: {
        text: 'For you',
        emoji: '✨',
        bgColor: 'bg-purple-100',
        textColor: 'text-purple-700',
      },
    },
    {
      id: '4',
      name: 'Hydration Pack',
      providerName: 'Health Hub',
      price: '€6.00',
      eta: '8 min',
      content: '2 sports drinks + protein bar',
      aiNote: 'Suggested for this route\'s difficulty & warm weather.',
      image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f0d?w=400',
      type: 'drink',
      rating: 4.7,
      totalReviews: 178,
      addOns: [
        { id: 'a8', name: '+ Energy Gel', price: '€2.50' },
        { id: 'a9', name: '+ Extra Protein Bar', price: '€3.00' },
      ],
      tag: {
        text: 'Trending today',
        emoji: '🔥',
        bgColor: 'bg-green-100',
        textColor: 'text-green-700',
      },
    },
  ];

  // Mock threads
  const threads = [
    {
      id: '1',
      title: 'Best time to visit?',
      type: 'question',
      author: 'Alex',
      avatar: 'https://i.pravatar.cc/150?u=alex',
      comments: 12,
      upvotes: 8,
    },
    {
      id: '2',
      title: 'Parking tips',
      type: 'tip',
      author: 'Sarah',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      comments: 6,
      upvotes: 15,
    },
  ];

  // Mock ratings
  const reviews = [
    { author: 'Mike', rating: 5, comment: 'Amazing views, totally worth the hike!' },
    { author: 'Emma', rating: 4, comment: 'Great spot but can get crowded' },
    { author: 'John', rating: 5, comment: 'Perfect for sunset photography' },
  ];

  if (showAllReviews) {
    // Mock review data for AllReviewsPage
    const mockReviews = [
      {
        id: '1',
        userName: 'Mike',
        rating: 5,
        timeAgo: '2 days ago',
        comment: 'Amazing views, totally worth the hike! The trail is well-marked and perfect for all skill levels.',
        photos: [
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
        ],
        helpfulCount: 23,
        isHelpful: false,
      },
      {
        id: '2',
        userName: 'Emma',
        rating: 4,
        timeAgo: '1 week ago',
        comment: 'Great spot but can get crowded during peak hours. I recommend going early morning for the best experience.',
        helpfulCount: 15,
        isHelpful: false,
      },
      {
        id: '3',
        userName: 'John',
        rating: 5,
        timeAgo: '2 weeks ago',
        comment: 'Perfect for sunset photography! The lighting is incredible and there are so many great angles.',
        photos: [
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        ],
        helpfulCount: 34,
        isHelpful: true,
      },
    ];

    return (
      <AllReviewsPage
        activityName={activity.title}
        averageRating={activity.averageRating}
        totalReviews={activity.totalRatings}
        reviews={mockReviews}
        onClose={() => setShowAllReviews(false)}
      />
    );
  }

  if (viewState === 'chat') {
    return (
      <ActivityChat
        activity={activity}
        onBack={() => setViewState('details')}
      />
    );
  }

  if (viewState === 'allSubActivities') {
    return (
      <AllSubActivities
        subActivities={subActivities}
        onBack={() => setViewState('details')}
        onSelectSubActivity={(sub) => {
          setSelectedSubActivity(sub);
          setViewState('subActivityDetails');
        }}
      />
    );
  }

  if (viewState === 'subActivityDetails' && selectedSubActivity) {
    return (
      <SubActivityDetails
        subActivity={selectedSubActivity}
        onBack={() => setViewState('allSubActivities')}
        onJoinActivity={() => console.log('Joined sub-activity')}
        onOpenChat={() => setViewState('chat')}
      />
    );
  }

  if (viewState === 'createSubActivity') {
    return (
      <CreateSubActivity
        spotName={activity.title}
        onBack={() => setViewState('details')}
        onCreate={(formData) => {
          const newSubActivity: SubActivity = {
            id: Date.now().toString(),
            title: formData.title,
            description: formData.description,
            type: formData.type,
            icon: formData.icon,
            upvotes: 0,
            participants: 1,
            difficulty: formData.difficulty || undefined,
            date: formData.date || undefined,
            spotName: activity.title,
            owner: {
              id: 'user1',
              name: 'Jordan Smith',
              avatar: 'https://i.pravatar.cc/150?u=jordan',
            },
          };
          setSubActivities([newSubActivity, ...subActivities]);
          setViewState('details');
        }}
      />
    );
  }

  if (viewState === 'serviceDetails' && selectedService) {
    return (
      <ServiceDetails
        service={selectedService}
        onBack={() => {
          setSelectedService(null);
          setViewState('details');
        }}
        onBook={() => {
          // Show booking confirmation
          alert(`Booked: ${selectedService.name}`);
          setSelectedService(null);
          setViewState('details');
        }}
      />
    );
  }

  const typeBadge = {
    story: { label: 'Story', color: 'bg-purple-100 text-purple-700' },
    tip: { label: 'Tip', color: 'bg-blue-100 text-blue-700' },
    question: { label: 'Question', color: 'bg-amber-100 text-amber-700' },
    plan: { label: 'Plan', color: 'bg-green-100 text-green-700' },
  };

  return (
    <div className="flex h-full flex-col bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-5 py-4 backdrop-blur-lg">
        <button
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-all hover:bg-secondary/80 active:scale-95"
        >
          <X size={20} />
        </button>
        <h1 className="flex-1 px-4 text-center text-lg text-foreground truncate">{activity.title}</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={onSave}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all active:scale-95 ${
              isSaved
                ? 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400'
                : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
            }`}
          >
            <Heart size={18} className={isSaved ? 'fill-current' : ''} />
          </button>
          <button
            onClick={() => setShowShareSheet(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-all hover:bg-secondary/80 active:scale-95"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Media Carousel */}
        <DraggableCarousel
          images={photos}
          alt={activity.title}
          aspectRatio="aspect-[4/3]"
          showDots={true}
          label="Photos & videos from the community"
        />

        {/* Essential Info */}
        <div className="border-b border-border p-5">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h2 className="mb-1 text-2xl text-foreground">{activity.title}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={16} />
                <span>{activity.location}</span>
                <span>•</span>
                <span>{activity.distance}</span>
              </div>
            </div>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">
              {activity.category}
            </span>
          </div>

          {/* Rating */}
          <div className="mb-4 flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.floor(activity.averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/40'}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {activity.averageRating} ({activity.totalRatings} ratings)
            </span>
          </div>

          {/* Meta Chips (2 rows max) */}
          <div className="flex flex-wrap gap-2">
            {activity.currentConditions.crowdLevel && (
              <span className="rounded-full bg-green-100 px-3 py-1.5 text-sm text-green-700 dark:bg-green-500/20 dark:text-green-400">
                {activity.currentConditions.crowdLevel}
              </span>
            )}
            {activity.specialMoment && (
              <span className="rounded-full bg-orange-100 px-3 py-1.5 text-sm text-orange-700 dark:bg-orange-500/20 dark:text-orange-400">
                {activity.specialMoment}
              </span>
            )}
            {activity.currentConditions.lightCondition && (
              <span className="rounded-full bg-yellow-100 px-3 py-1.5 text-sm text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400">
                {activity.currentConditions.lightCondition}
              </span>
            )}
            {activity.route && (
              <span className="rounded-full bg-purple-100 px-3 py-1.5 text-sm text-purple-700 dark:bg-purple-500/20 dark:text-purple-400">
                Difficulty: {activity.route.difficulty}
              </span>
            )}
            {activity.costLevel && (
              <span className="rounded-full bg-blue-100 px-3 py-1.5 text-sm text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">
                {activity.costLevel}
              </span>
            )}
          </div>
        </div>

        {/* What to Know */}
        <div className="border-b border-border p-5">
          <h3 className="mb-3 text-lg text-foreground">What to know</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-muted-foreground">
              <span className="mt-1 text-blue-600">•</span>
              <span>Quiet in mornings, perfect for focused activities</span>
            </li>
            <li className="flex items-start gap-2 text-muted-foreground">
              <span className="mt-1 text-blue-600">•</span>
              <span>Strong WiFi available throughout</span>
            </li>
            <li className="flex items-start gap-2 text-muted-foreground">
              <span className="mt-1 text-blue-600">•</span>
              <span>Good for deep work and reading</span>
            </li>
            <li className="flex items-start gap-2 text-muted-foreground">
              <span className="mt-1 text-blue-600">•</span>
              <span>Gets crowded after 17:00</span>
            </li>
          </ul>
        </div>

        {/* Enhance Your Experience (AI-Powered) - UNIFIED SECTION */}
        <div className="border-b border-border p-5">
          <h3 className="mb-1 text-lg text-foreground">Enhance Your Experience (AI-Powered)</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Recommended items and services based on weather, time, location, and your habits.
          </p>

          {/* Unified horizontal scroll carousel */}
          <div className="mb-2 flex gap-3 overflow-x-auto scrollbar-hide">
            {/* Merge woltPacks and localServices */}
            {[...woltPacks, ...localServices].map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedPack(option)}
                className="flex-shrink-0 w-56 rounded-2xl border border-border bg-card p-3 shadow-sm transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                {/* Tag (if exists) */}
                {option.tag && (
                  <div className="mb-2 flex items-center gap-1">
                    <span className={`rounded-full ${option.tag.bgColor} px-2 py-0.5 text-xs ${option.tag.textColor}`}>
                      {option.tag.emoji} {option.tag.text}
                    </span>
                  </div>
                )}
                <div className="mb-2 aspect-square w-full overflow-hidden rounded-xl bg-muted">
                  <ImageWithFallback
                    src={option.image}
                    alt={option.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h4 className="mb-1 text-sm text-foreground">{option.name}</h4>
                <div className="mb-1 text-xs text-muted-foreground">
                  <span>{option.price} · {option.eta}</span>
                </div>
                <p className="text-xs text-blue-600 line-clamp-2">AI: {option.aiNote}</p>
              </button>
            ))}
          </div>

          {/* Helper text */}
          <p className="text-center text-xs text-muted-foreground">
            Tap an option to see more and enhance your experience before going.
          </p>

          {/* Ask Roamy AI */}
          <button
            onClick={() => setShowRoamyChat(true)}
            className="mt-4 w-full flex items-center justify-between rounded-2xl border-2 border-purple-200 bg-gradient-to-r from-blue-50 to-purple-50 p-4 transition-all hover:shadow-md active:scale-98 dark:border-purple-500/30 dark:from-blue-500/10 dark:to-purple-500/10"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                <Sparkles size={24} className="text-white" />
              </div>
              <div className="text-left">
                <h4 className="text-foreground">Ask Roamy AI</h4>
                <p className="text-sm text-muted-foreground">
                  Ask anything about this activity or get personalized recommendations.
                </p>
              </div>
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>

          {/* Share Activity Button */}
          <button
            onClick={() => setShowShareSheet(true)}
            className="mt-3 w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-border bg-card px-4 py-3 text-foreground transition-all hover:bg-secondary/50 active:scale-98"
          >
            <Share2 size={18} />
            <span>Share this activity</span>
          </button>
        </div>

        {/* Sub-Activities */}
        {subActivities.length > 0 && (
          <div className="border-b border-border p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg text-foreground">Sub-Activities & Challenges</h3>
            </div>

            <div className="mb-4 space-y-3">
              {subActivities.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    setSelectedSubActivity(sub);
                    setViewState('subActivityDetails');
                  }}
                  className="w-full rounded-2xl border border-border bg-secondary p-4 text-left transition-all hover:shadow-md active:scale-98"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{sub.icon}</span>
                      <div>
                        <h4 className="text-foreground">{sub.title}</h4>
                        <p className="text-sm text-muted-foreground">{sub.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Owner Info */}
                  {sub.owner && (
                    <div className="mb-3 flex items-center gap-2">
                      <img
                        src={sub.owner.avatar}
                        alt={sub.owner.name}
                        className="h-4 w-4 rounded-full object-cover"
                      />
                      <span className="text-xs text-muted-foreground">Host: {sub.owner.name}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={14} />
                      <span>{sub.upvotes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{sub.participants}</span>
                    </div>
                    {sub.date && (
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{sub.date}</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setViewState('allSubActivities')}
              className="mb-2 w-full rounded-2xl border-2 border-blue-600 bg-background px-4 py-3 text-blue-600 transition-all hover:bg-blue-50 active:scale-98 dark:hover:bg-blue-500/10"
            >
              View all sub-activities
            </button>

            <button
              onClick={() => setViewState('createSubActivity')}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-white transition-all hover:bg-blue-700 active:scale-98"
            >
              <Plus size={18} />
              <span>Create a sub-activity or challenge</span>
            </button>
          </div>
        )}

        {/* Activity Chat */}
        <div className="border-b border-border p-5">
          <h3 className="mb-3 text-lg text-foreground">Activity Chat</h3>

          {/* Chat preview */}
          <div className="mb-3 space-y-2 rounded-2xl bg-secondary p-4">
            <div className="flex items-start gap-2">
              <img
                src="https://i.pravatar.cc/150?u=user1"
                alt="User"
                className="h-8 w-8 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm text-foreground"><span className="font-medium">Alex:</span> Anyone going today?</p>
                <p className="text-xs text-muted-foreground">2 min ago</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <img
                src="https://i.pravatar.cc/150?u=user2"
                alt="User"
                className="h-8 w-8 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm text-foreground"><span className="font-medium">Sarah:</span> I'll be there around 6!</p>
                <p className="text-xs text-muted-foreground">5 min ago</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setViewState('chat')}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-white transition-all hover:bg-blue-700 active:scale-98"
          >
            <MessageCircle size={18} />
            <span>Open Activity Chat</span>
          </button>
        </div>

        {/* Community Threads */}
        <div className="border-b border-border p-5">
          <h3 className="mb-3 text-lg text-foreground">Community Threads</h3>

          <div className="mb-4 space-y-2">
            {threads.map((thread) => {
              const badge = typeBadge[thread.type as keyof typeof typeBadge];
              return (
                <button
                  key={thread.id}
                  onClick={() => onOpenThread?.(thread.id)}
                  className="w-full rounded-2xl border border-border bg-card p-4 text-left transition-all hover:shadow-md active:scale-98"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${badge.color}`}>
                      {badge.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <img src={thread.avatar} alt={thread.author} className="h-5 w-5 rounded-full" />
                      <span className="text-xs text-muted-foreground">{thread.author}</span>
                    </div>
                  </div>

                  <h4 className="mb-2 text-foreground">{thread.title}</h4>

                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={14} />
                      <span>{thread.upvotes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={14} />
                      <span>{thread.comments}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('View all threads clicked', onViewAllThreads);
              if (onViewAllThreads) {
                onViewAllThreads();
              }
            }}
            className="mb-2 w-full rounded-2xl border-2 border-blue-600 bg-background px-4 py-3 text-blue-600 transition-all hover:bg-blue-50 active:scale-98 dark:hover:bg-blue-500/10"
          >
            View all threads
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Start a new thread clicked', onCreateThread);
              if (onCreateThread) {
                onCreateThread();
              }
            }}
            className="w-full text-blue-600 hover:underline"
          >
            Start a new thread
          </button>
        </div>

        {/* Ratings */}
        <div className="p-5">
          <h3 className="mb-4 text-lg text-foreground">Ratings & Reviews</h3>

          {!hasVisited ? (
            <button
              onClick={() => setShowRateExperience(true)}
              className="mb-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary px-4 py-3 text-foreground transition-all hover:bg-secondary/80 active:scale-98 border-2 border-transparent hover:border-blue-600"
            >
              <MapPin size={18} />
              <span>I went here</span>
            </button>
          ) : (
            <div className="mb-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-green-100 px-4 py-3 text-green-700 dark:bg-green-500/20 dark:text-green-400">
              <CheckCircle size={18} />
              <span>You've been here</span>
            </div>
          )}

          <div className="space-y-3">
            {/* User's review first if exists */}
            {userReview && (
              <div className="rounded-2xl border-2 border-blue-600 bg-secondary p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-sm text-foreground">You</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(userReview.rating)].map((_, i) => (
                      <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="ml-auto text-xs text-muted-foreground">{userReview.timestamp}</span>
                </div>
                {userReview.tags.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-1">
                    {userReview.tags.map((tag, idx) => (
                      <span key={idx} className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {userReview.comment && (
                  <p className="text-sm text-muted-foreground">{userReview.comment}</p>
                )}
              </div>
            )}
            
            {/* Existing reviews */}
            {reviews.map((review, idx) => (
              <div key={idx} className="rounded-2xl bg-secondary p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-sm text-foreground">{review.author}</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </div>

          {/* See All Reviews Button */}
          <button
            onClick={() => setShowAllReviews(true)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary px-4 py-3 text-sm text-foreground transition-all hover:bg-secondary/80 active:scale-98 border-2 border-transparent hover:border-blue-600"
          >
            See all reviews
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="border-t border-border bg-card p-4">
        {/* Only show Join button for Activities, nothing for Spots (Save is in header) */}
        {activity.category === 'Activity' ? (
          <button
            onClick={onJoin}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-white transition-all hover:bg-blue-700 active:scale-98"
          >
            Join Activity
          </button>
        ) : null}
      </div>

      {/* Pack Details Sheet */}
      {selectedPack && !showPackConfirmation && (
        <PackServiceSheet
          option={selectedPack}
          onClose={() => setSelectedPack(null)}
          onOrderBook={(selectedTime) => {
            if (selectedPack.isService) {
              alert(`Booked: ${selectedPack.name}${selectedTime ? ` at ${selectedTime}` : ''}`);
            } else {
              alert(`Ordered: ${selectedPack.name}`);
            }
            setSelectedPack(null);
          }}
          onShare={() => {
            alert(`Sharing: ${selectedPack.name}`);
          }}
        />
      )}

      {/* Pack Order Confirmation */}
      {selectedPack && showPackConfirmation && (
        <DeliveryConfirmation
          deliveryPoint={selectedPack.deliveryDropPoint || 'Pickup location'}
          deliveryTime={selectedPack.deliveryTime || selectedPack.pickupTiming}
          packName={selectedPack.name}
          onConfirm={() => {
            alert(`Order confirmed! ${selectedPack.name}`);
            setShowPackConfirmation(false);
            setSelectedPack(null);
            setOrderType('pickup');
            setSelectedServices([]);
          }}
          onBack={() => {
            setShowPackConfirmation(false);
          }}
        />
      )}

      {/* Share Activity Sheet */}
      {showShareSheet && (
        <ShareActivitySheet
          activityTitle={activity.title}
          onClose={() => setShowShareSheet(false)}
        />
      )}

      {/* Roamy AI Chat */}
      {showRoamyChat && (
        <RoamyAIChat
          activityTitle={activity.title}
          onClose={() => setShowRoamyChat(false)}
        />
      )}

      {/* Rate Experience Sheet */}
      {showRateExperience && (
        <RateExperienceSheet
          activityTitle={activity.title}
          onClose={() => setShowRateExperience(false)}
          onSubmit={(rating, tags, comment) => {
            setUserReview({
              rating,
              tags,
              comment,
              timestamp: new Date().toLocaleString(),
            });
            setHasVisited(true);
            setShowRateExperience(false);
          }}
        />
      )}
    </div>
  );
}