import { useState } from 'react';
import { X, Heart, MessageCircle, ThumbsUp, Users, MapPin, Clock, TrendingUp, Plus, Star, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ActivityChat from './ActivityChat';
import UniversalSwipeDeck from './UniversalSwipeDeck';
import RelatedActivitiesModal from './RelatedActivitiesModal';
import AllSubActivities from './AllSubActivities';
import SubActivityDetails from './SubActivityDetails';
import CreateSubActivity from './CreateSubActivity';
import type { Activity } from '../types';

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
};

type ViewState = 'details' | 'chat' | 'allSubActivities' | 'subActivityDetails' | 'createSubActivity';

type Props = {
  activity: Activity;
  onBack: () => void;
  onSave: () => void;
  onJoin: () => void;
};

export default function ActivityDetailsSimple({ activity, onBack, onSave, onJoin }: Props) {
  const [viewState, setViewState] = useState<ViewState>('details');
  const [showRelated, setShowRelated] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [selectedSubActivity, setSelectedSubActivity] = useState<SubActivity | null>(null);
  const [subActivities, setSubActivities] = useState<SubActivity[]>([
    {
      id: '1',
      title: 'Sunrise Photography Challenge',
      description: 'Capture the perfect sunrise shot',
      type: 'challenge',
      icon: '📸',
      upvotes: 24,
      participants: 12,
      difficulty: 'Medium',
      spotName: activity.title,
    },
    {
      id: '2',
      title: 'Evening Hike Meetup',
      description: 'Group hike at sunset',
      type: 'meetup',
      icon: '👥',
      upvotes: 18,
      participants: 8,
      date: 'Tomorrow, 6:00 PM',
      spotName: activity.title,
    },
  ]);

  const photos = activity.photos && activity.photos.length > 0 ? activity.photos : [activity.photo];

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
          };
          setSubActivities([newSubActivity, ...subActivities]);
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
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white/95 px-5 py-4 backdrop-blur-lg">
        <button
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200 active:scale-95"
        >
          <X size={20} />
        </button>
        <h1 className="flex-1 px-4 text-center text-lg text-gray-900 truncate">{activity.title}</h1>
        <div className="w-10" />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Media Carousel */}
        <div className="relative">
          <div className="aspect-[4/3] bg-gray-100">
            <ImageWithFallback
              src={photos[currentPhotoIndex]}
              alt={activity.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Photo dots */}
          {photos.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {photos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPhotoIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentPhotoIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Media label */}
          <div className="absolute top-4 left-4">
            <span className="rounded-full bg-black/40 px-3 py-1 text-xs text-white backdrop-blur-sm">
              Photos & videos from the community
            </span>
          </div>
        </div>

        {/* Essential Info */}
        <div className="border-b border-gray-100 p-5">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <h2 className="mb-1 text-2xl text-gray-900">{activity.title}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={16} />
                <span>{activity.location}</span>
                <span>•</span>
                <span>{activity.distance}</span>
              </div>
            </div>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
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
                  className={i < Math.floor(activity.averageRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {activity.averageRating} ({activity.totalRatings} ratings)
            </span>
          </div>

          {/* Meta Chips (2 rows max) */}
          <div className="flex flex-wrap gap-2">
            {activity.currentConditions.crowdLevel && (
              <span className="rounded-full bg-green-100 px-3 py-1.5 text-sm text-green-700">
                {activity.currentConditions.crowdLevel}
              </span>
            )}
            {activity.specialMoment && (
              <span className="rounded-full bg-orange-100 px-3 py-1.5 text-sm text-orange-700">
                {activity.specialMoment}
              </span>
            )}
            {activity.currentConditions.lightCondition && (
              <span className="rounded-full bg-yellow-100 px-3 py-1.5 text-sm text-yellow-700">
                {activity.currentConditions.lightCondition}
              </span>
            )}
            {activity.route && (
              <span className="rounded-full bg-purple-100 px-3 py-1.5 text-sm text-purple-700">
                Difficulty: {activity.route.difficulty}
              </span>
            )}
            {activity.costLevel && (
              <span className="rounded-full bg-blue-100 px-3 py-1.5 text-sm text-blue-700">
                {activity.costLevel}
              </span>
            )}
          </div>
        </div>

        {/* What to Know */}
        <div className="border-b border-gray-100 p-5">
          <h3 className="mb-3 text-lg text-gray-900">What to know</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-gray-700">
              <span className="mt-1 text-blue-600">•</span>
              <span>Quiet in mornings, perfect for focused activities</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="mt-1 text-blue-600">•</span>
              <span>Strong WiFi available throughout</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="mt-1 text-blue-600">•</span>
              <span>Good for deep work and reading</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="mt-1 text-blue-600">•</span>
              <span>Gets crowded after 17:00</span>
            </li>
          </ul>
        </div>

        {/* Wolt AI Packs */}
        <div className="border-b border-gray-100 p-5">
          <h3 className="mb-1 text-lg text-gray-900">Wolt AI Packs</h3>
          <p className="mb-4 text-sm text-gray-600">Personalized recommendations for this activity based on weather, time, and your habits.</p>

          {/* Horizontal scroll row */}
          <div className="mb-4 flex gap-3 overflow-x-auto pb-2">
            {/* AI Pack Card 1 */}
            <div className="flex-shrink-0 w-56 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
              <div className="mb-2 aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400"
                  alt="Sunset Energy Pack"
                  className="h-full w-full object-cover"
                />
              </div>
              <h4 className="mb-1 text-sm text-gray-900">Sunset Energy Pack</h4>
              <div className="mb-1 text-xs text-gray-600">
                <span>€12.50 · 5 min away</span>
              </div>
              <p className="text-xs text-blue-600">AI: Weather cools down in 40 minutes — ideal for sunset paths.</p>
            </div>

            {/* AI Pack Card 2 */}
            <div className="flex-shrink-0 w-56 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
              <div className="mb-2 aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1514481538271-cf9f99627ab4?w=400"
                  alt="Warm Drink"
                  className="h-full w-full object-cover"
                />
              </div>
              <h4 className="mb-1 text-sm text-gray-900">Warm Drink – Cozy Corner Café</h4>
              <div className="mb-1 text-xs text-gray-600">
                <span>€4.50 · 3 min away</span>
              </div>
              <p className="text-xs text-blue-600">AI: Popular among users doing this activity today.</p>
            </div>

            {/* AI Pack Card 3 */}
            <div className="flex-shrink-0 w-56 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
              <div className="mb-2 aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400"
                  alt="Light Snack Box"
                  className="h-full w-full object-cover"
                />
              </div>
              <h4 className="mb-1 text-sm text-gray-900">Light Snack Box</h4>
              <div className="mb-1 text-xs text-gray-600">
                <span>€8.90 · 7 min away</span>
              </div>
              <p className="text-xs text-blue-600">AI: Based on your previous saved nature spots.</p>
            </div>

            {/* AI Pack Card 4 */}
            <div className="flex-shrink-0 w-56 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
              <div className="mb-2 aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1523677011781-c91d1bbe2f0d?w=400"
                  alt="Hydration Pack"
                  className="h-full w-full object-cover"
                />
              </div>
              <h4 className="mb-1 text-sm text-gray-900">Hydration Pack</h4>
              <div className="mb-1 text-xs text-gray-600">
                <span>€6.00 · 4 min away</span>
              </div>
              <p className="text-xs text-blue-600">AI: Suggested for this route's difficulty & warm weather.</p>
            </div>
          </div>

          {/* Order button */}
          <button className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-white transition-all hover:bg-blue-700 active:scale-98">
            Order for Pickup
          </button>
        </div>

        {/* Sub-Activities */}
        {subActivities.length > 0 && (
          <div className="border-b border-gray-100 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg text-gray-900">Sub-Activities & Challenges</h3>
            </div>

            <div className="mb-4 space-y-3">
              {subActivities.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    setSelectedSubActivity(sub);
                    setViewState('subActivityDetails');
                  }}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-4 text-left transition-all hover:shadow-md active:scale-98"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{sub.icon}</span>
                      <div>
                        <h4 className="text-gray-900">{sub.title}</h4>
                        <p className="text-sm text-gray-600">{sub.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={14} />
                      <span>{sub.upvotes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{sub.participants}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setViewState('allSubActivities')}
              className="mb-2 w-full rounded-2xl border-2 border-blue-600 bg-white px-4 py-3 text-blue-600 transition-all hover:bg-blue-50 active:scale-98"
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
        <div className="border-b border-gray-100 p-5">
          <h3 className="mb-3 text-lg text-gray-900">Activity Chat</h3>

          {/* Chat preview */}
          <div className="mb-3 space-y-2 rounded-2xl bg-gray-50 p-4">
            <div className="flex items-start gap-2">
              <img
                src="https://i.pravatar.cc/150?u=user1"
                alt="User"
                className="h-8 w-8 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm text-gray-900"><span className="font-medium">Alex:</span> Anyone going today?</p>
                <p className="text-xs text-gray-500">2 min ago</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <img
                src="https://i.pravatar.cc/150?u=user2"
                alt="User"
                className="h-8 w-8 rounded-full"
              />
              <div className="flex-1">
                <p className="text-sm text-gray-900"><span className="font-medium">Sarah:</span> I'll be there around 6!</p>
                <p className="text-xs text-gray-500">5 min ago</p>
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
        <div className="border-b border-gray-100 p-5">
          <h3 className="mb-3 text-lg text-gray-900">Community Threads</h3>

          <div className="mb-4 space-y-2">
            {threads.map((thread) => {
              const badge = typeBadge[thread.type as keyof typeof typeBadge];
              return (
                <div key={thread.id} className="rounded-2xl border border-gray-200 bg-white p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${badge.color}`}>
                      {badge.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <img src={thread.avatar} alt={thread.author} className="h-5 w-5 rounded-full" />
                      <span className="text-xs text-gray-600">{thread.author}</span>
                    </div>
                  </div>

                  <h4 className="mb-2 text-gray-900">{thread.title}</h4>

                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={14} />
                      <span>{thread.upvotes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={14} />
                      <span>{thread.comments}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="mb-2 w-full rounded-2xl border-2 border-blue-600 bg-white px-4 py-3 text-blue-600 transition-all hover:bg-blue-50 active:scale-98">
            View all threads
          </button>

          <button className="w-full text-blue-600 hover:underline">
            Start a new thread
          </button>
        </div>

        {/* Ratings */}
        <div className="p-5">
          <h3 className="mb-4 text-lg text-gray-900">Ratings & Reviews</h3>

          <button className="mb-4 w-full rounded-2xl bg-blue-600 px-4 py-3 text-white transition-all hover:bg-blue-700 active:scale-98">
            I went here
          </button>

          <div className="space-y-3">
            {reviews.map((review, idx) => (
              <div key={idx} className="rounded-2xl bg-gray-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-sm text-gray-900">{review.author}</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex gap-3">
          <button
            onClick={onSave}
            className="flex items-center justify-center gap-2 rounded-2xl border-2 border-gray-200 bg-white px-6 py-3 text-gray-900 transition-all hover:bg-gray-50 active:scale-98"
          >
            <Heart size={18} />
            <span>Save</span>
          </button>

          <button
            onClick={onJoin}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-white transition-all hover:bg-blue-700 active:scale-98"
          >
            {activity.category === 'Activity' ? 'Join Activity' : 'Save Spot'}
          </button>
        </div>
      </div>
    </div>
  );
}