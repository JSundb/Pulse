import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Activity, ThreadMedia } from '../App';
import { 
  X, MapPin, Heart, Users, Clock, DollarSign, 
  TrendingUp, Star, Camera, MessageSquare, Plus,
  ThumbsUp, Send, ChevronRight, Home as HomeIcon,
  Sun, User, MessageCircle
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import RatingFlow from './RatingFlow';
import ThreadsList from './ThreadsList';
import LocationChat from './LocationChat';
import AllReviewsPage from './AllReviewsPage';
import UserPopup from './UserPopup';
import PrivateDM from './PrivateDM';
import type { Thread } from '../App';

type Props = {
  activity: Activity;
  onClose: () => void;
  onSave: () => void;
  isSaved?: boolean;
  onMarkAsWent?: (activityId: string) => void;
};

export default function ActivityDetails({ activity, onClose, onSave, isSaved, onMarkAsWent }: Props) {
  const [showRatingFlow, setShowRatingFlow] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [showThreadsList, setShowThreadsList] = useState(false);
  const [showLocationChat, setShowLocationChat] = useState(false);
  const [activityThreads, setActivityThreads] = useState(activity.threads);
  const [isUserAtLocation, setIsUserAtLocation] = useState(false); // Mock: set to true to test
  const [showActivityChat, setShowActivityChat] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState<{ userId: string; userName: string; userAvatar: string } | null>(null);
  const [showPrivateDM, setShowPrivateDM] = useState<{ userId: string; userName: string; userAvatar: string } | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Mock data for the new sections
  const userTips = [
    "Best seat: window corner near the plants",
    "Gets crowded after 5pm on weekdays",
    "Try their cold brew, it's excellent",
  ];

  const recentVibeImpressions = [
    "Quiet before lunch",
    "Cozy inside",
    "Great for focus work",
  ];

  const keyBullets = [
    "Quiet in the morning",
    "Great for reading and laptop work",
    "Strong WiFi and plenty of outlets",
    "Outdoor seating available",
    "Good coffee at reasonable prices",
    "Friendly staff",
  ];

  if (showRatingFlow) {
    return (
      <RatingFlow
        activity={activity}
        onClose={() => setShowRatingFlow(false)}
        onComplete={() => {
          setShowRatingFlow(false);
          onClose();
        }}
      />
    );
  }

  if (showAllReviews) {
    // Mock review data
    const mockReviews = [
      {
        id: '1',
        userName: 'Sarah K.',
        rating: 5,
        timeAgo: '2 days ago',
        comment: 'Perfect spot for deep work. The atmosphere is exactly what I needed. The coffee is great and the WiFi is fast!',
        photos: [
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
        ],
        helpfulCount: 23,
        isHelpful: false,
      },
      {
        id: '2',
        userName: 'Mike R.',
        rating: 4,
        timeAgo: '1 week ago',
        comment: 'Great place! A bit crowded during peak hours but overall excellent experience.',
        helpfulCount: 15,
        isHelpful: false,
      },
      {
        id: '3',
        userName: 'Emma L.',
        rating: 5,
        timeAgo: '2 weeks ago',
        comment: 'Absolutely loved it! The views are stunning and it\'s so peaceful. Highly recommend going during sunset for the best experience.',
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

  // Show ThreadsList when user clicks to view threads
  if (showThreadsList) {
    return (
      <ThreadsList
        activity={{ ...activity, threads: activityThreads }}
        onBack={() => setShowThreadsList(false)}
        onAddThread={(thread) => {
          setActivityThreads([...activityThreads, thread]);
          setShowThreadsList(false);
        }}
      />
    );
  }

  // Show LocationChat when user clicks
  if (showLocationChat) {
    return (
      <LocationChat
        activityName={activity.title}
        isUserAtLocation={isUserAtLocation}
        onBack={() => setShowLocationChat(false)}
      />
    );
  }

  // Show ActivityChat when user clicks
  if (showActivityChat) {
    return (
      <ActivityChat
        activityName={activity.title}
        onBack={() => setShowActivityChat(false)}
      />
    );
  }

  // Show UserPopup when user clicks
  if (showUserPopup) {
    return (
      <UserPopup
        userId={showUserPopup.userId}
        userName={showUserPopup.userName}
        userAvatar={showUserPopup.userAvatar}
        onBack={() => setShowUserPopup(null)}
      />
    );
  }

  // Show PrivateDM when user clicks
  if (showPrivateDM) {
    return (
      <PrivateDM
        userId={showPrivateDM.userId}
        userName={showPrivateDM.userName}
        userAvatar={showPrivateDM.userAvatar}
        onBack={() => setShowPrivateDM(null)}
      />
    );
  }

  // Photo lightbox
  if (selectedPhoto) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        onClick={() => setSelectedPhoto(null)}
      >
        <button
          onClick={() => setSelectedPhoto(null)}
          className="absolute top-6 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
        >
          <X size={24} />
        </button>
        <ImageWithFallback
          src={selectedPhoto.url}
          alt="Activity photo"
          className="max-h-[90vh] max-w-full object-contain"
        />
        {selectedPhoto.userName && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <User size={20} />
              </div>
              <div>
                <p className="text-sm">{selectedPhoto.userName}</p>
                <p className="text-xs text-white/80">{selectedPhoto.timestamp}</p>
              </div>
            </div>
            {selectedPhoto.caption && <p className="mb-3">{selectedPhoto.caption}</p>}
            <div className="flex items-center gap-2 text-sm">
              <ThumbsUp size={16} />
              <span>{selectedPhoto.likes} likes</span>
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  // All photos for grid (mix official + community)
  const allPhotos = [
    { url: activity.photo, type: 'official' },
    ...activity.photos.map(url => ({ url, type: 'official' })),
    ...activity.communityPhotos.map(p => ({ url: p.url, type: 'community', userName: p.userName, likes: p.likes, caption: p.caption, timestamp: p.timestamp })),
  ].slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 35, stiffness: 350 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md max-h-[95vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/95 px-5 py-4 backdrop-blur-lg rounded-t-3xl">
          <div className="flex-1">
            <h1 className="mb-1 text-xl text-gray-900 line-clamp-1">{activity.title}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{activity.category}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>{activity.distance}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200 active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        {/* 1. Top Community Media from Threads */}
        <div className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg text-gray-900">Top Community Media</h2>
            <button 
              onClick={() => setShowThreadsList(true)}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              View Threads →
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-6">
            {/* Get top upvoted media from threads */}
            {activityThreads
              .flatMap(thread => [
                ...(thread.media || []),
                ...thread.posts.flatMap(post => post.media || [])
              ])
              .sort((a, b) => b.upvotes - a.upvotes)
              .slice(0, 5)
              .map((media, index) => (
                <button
                  key={index}
                  onClick={() => setShowThreadsList(true)}
                  className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 transition-transform hover:scale-105 active:scale-95"
                >
                  <ImageWithFallback
                    src={media.url}
                    alt={`Community photo ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  {/* Upvote badge */}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
                    <span>↑</span>
                    <span>{media.upvotes}</span>
                  </div>
                </button>
              ))}
            
            {/* Add Photo Button */}
            <button 
              onClick={() => setShowThreadsList(true)}
              className="aspect-square flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400 transition-all hover:border-gray-400 hover:bg-gray-100 active:scale-95"
            >
              <Plus size={24} />
              <span className="text-xs">Post Media</span>
            </button>
          </div>

          {/* Current Conditions Section */}
          <div className="mb-6">
            <h2 className="mb-3 text-lg text-gray-900">Current Conditions</h2>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {/* Crowd Level */}
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-4">
                <div className="mb-2 text-2xl">👥</div>
                <p className="text-xs text-gray-600 mb-1">Crowd</p>
                <p className="text-sm text-gray-900">{activity.currentConditions.crowdLevel}</p>
              </div>

              {/* Atmosphere */}
              <div className="rounded-2xl bg-gradient-to-br from-green-50 to-green-100 p-4">
                <div className="mb-2 text-2xl">🍃</div>
                <p className="text-xs text-gray-600 mb-1">Atmosphere</p>
                <p className="text-sm text-gray-900">{activity.currentConditions.atmosphere}</p>
              </div>

              {/* Light Condition */}
              {activity.currentConditions.lightCondition && (
                <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 p-4">
                  <div className="mb-2 text-2xl">🌤️</div>
                  <p className="text-xs text-gray-600 mb-1">Light</p>
                  <p className="text-sm text-gray-900">{activity.currentConditions.lightCondition}</p>
                </div>
              )}

              {/* Weather Comfort */}
              {activity.currentConditions.weatherComfort && (
                <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 p-4">
                  <div className="mb-2 text-2xl">🌡️</div>
                  <p className="text-xs text-gray-600 mb-1">Weather</p>
                  <p className="text-sm text-gray-900">{activity.currentConditions.weatherComfort}</p>
                </div>
              )}
            </div>

            {/* Special Moment */}
            {activity.specialMoment && (
              <div className="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 p-4 shadow-md">
                <div className="flex items-center gap-2 text-white">
                  <span className="text-xl">✨</span>
                  <p className="text-sm">{activity.specialMoment}</p>
                </div>
              </div>
            )}
          </div>

          {/* Best Time to Visit */}
          {activity.bestTimeToVisit && (
            <div className="mb-6">
              <h2 className="mb-3 text-lg text-gray-900">Best Time to Visit</h2>
              <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 p-4">
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-indigo-600" />
                  <p className="text-sm text-gray-900">{activity.bestTimeToVisit}</p>
                </div>
              </div>
            </div>
          )}

          {/* Photography Tip */}
          {activity.photographyTip && (
            <div className="mb-6">
              <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-violet-100 p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📸</span>
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 mb-1">Photography Tip</p>
                    <p className="text-sm text-gray-900">{activity.photographyTip}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. Short Bullet Summary */}
          <div className="mb-6">
            <h2 className="mb-3 text-lg text-gray-900">What to know</h2>
            <div className="space-y-2">
              {keyBullets.map((bullet, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
                  <p className="text-sm text-gray-700 leading-relaxed">{bullet}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Vibe Tags */}
          <div className="mb-6">
            <h2 className="mb-3 text-lg text-gray-900">Vibe</h2>
            <div className="flex flex-wrap gap-2">
              {activity.vibe.map(vibe => (
                <button
                  key={vibe}
                  className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-sm text-white shadow-md transition-all hover:shadow-lg active:scale-95"
                >
                  {vibe}
                </button>
              ))}
              {activity.goodFor.slice(0, 3).map(tag => (
                <button
                  key={tag}
                  className="rounded-full bg-gradient-to-r from-green-500 to-teal-500 px-4 py-2 text-sm text-white shadow-md transition-all hover:shadow-lg active:scale-95"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Quick Facts Row */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-4">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Clock size={20} className="text-blue-600" />
                </div>
                <p className="text-xs text-gray-600 mb-1">Best time</p>
                <p className="text-sm text-gray-900">{activity.timeContext}</p>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 p-4">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                  <TrendingUp size={20} className="text-purple-600" />
                </div>
                <p className="text-xs text-gray-600 mb-1">Crowd level</p>
                <p className="text-sm text-gray-900">Low</p>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 p-4">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                  {activity.indoor ? (
                    <HomeIcon size={20} className="text-amber-600" />
                  ) : (
                    <Sun size={20} className="text-amber-600" />
                  )}
                </div>
                <p className="text-xs text-gray-600 mb-1">Type</p>
                <p className="text-sm text-gray-900">{activity.indoor ? 'Indoor' : 'Outdoor'}</p>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-green-50 to-green-100 p-4">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                  <DollarSign size={20} className="text-green-600" />
                </div>
                <p className="text-xs text-gray-600 mb-1">Price</p>
                <p className="text-sm text-gray-900">{activity.costLevel}</p>
              </div>
            </div>
          </div>

          {/* 5. Ratings Snapshot */}
          <div className="mb-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-5">
            <div className="mb-4 flex items-center gap-4">
              <div className="text-center">
                <div className="mb-1 text-4xl text-gray-900">{activity.averageRating}</div>
                <div className="flex items-center justify-center gap-0.5 mb-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      size={14}
                      className={star <= Math.round(activity.averageRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-600">{activity.totalRatings} ratings</p>
              </div>

              <div className="flex-1">
                <p className="mb-2 text-sm text-gray-700">Recent impressions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {recentVibeImpressions.map((impression, index) => (
                    <span key={index} className="rounded-full bg-white px-3 py-1 text-xs text-gray-700 shadow-sm">
                      {impression}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Tiny recent review */}
            <div className="rounded-xl bg-white p-3 shadow-sm mb-3">
              <div className="mb-1 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
                  <User size={12} className="text-white" />
                </div>
                <span className="text-xs text-gray-600">Sarah K.</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} size={10} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-snug">
                "Perfect spot for deep work. The atmosphere is exactly what I needed."
              </p>
            </div>

            {/* See All Reviews Button */}
            <button
              onClick={() => setShowAllReviews(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm text-amber-700 shadow-sm transition-all hover:shadow-md active:scale-95"
            >
              See all reviews
              <ChevronRight size={16} />
            </button>
          </div>

          {/* 6. User Tips Section */}
          <div className="mb-6">
            <h2 className="mb-3 text-lg text-gray-900">User Tips</h2>
            <div className="space-y-2 mb-3">
              {userTips.slice(0, 2).map((tip, index) => (
                <div key={index} className="flex items-start gap-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-3">
                  <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                    💡
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 active:scale-95">
              View more tips →
            </button>
          </div>

          {/* 7. Community Threads - ENHANCED SECTION */}
          <div className="mb-6 rounded-3xl bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-6 border-2 border-purple-100/50">
            {/* Header */}
            <div className="mb-4">
              <h2 className="text-2xl text-gray-900 mb-1">Community Threads</h2>
              <p className="text-sm text-gray-600">Join the conversation about this activity</p>
            </div>

            {activityThreads.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-10 text-center mb-4">
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-blue-100">
                  <MessageSquare size={32} className="text-purple-600" />
                </div>
                <p className="text-sm text-gray-900 mb-1">No threads yet</p>
                <p className="text-xs text-gray-500">Be the first to start a conversation!</p>
              </div>
            ) : (
              <>
                {/* Thread Preview Cards - Show 2-3 */}
                <div className="space-y-3 mb-4">
                  {activityThreads.slice(0, 3).map(thread => (
                    <button
                      key={thread.id}
                      onClick={() => setShowThreadsList(true)}
                      className="w-full rounded-2xl bg-white p-4 text-left shadow-sm transition-all hover:shadow-lg active:scale-98"
                    >
                      {/* Thread Title */}
                      <h3 className="mb-2 text-base text-gray-900 line-clamp-2">{thread.title}</h3>
                      
                      {/* Thread Preview */}
                      <p className="mb-3 text-sm text-gray-600 line-clamp-1">{thread.preview}</p>

                      {/* Metadata Row */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Avatar group - show last 2-3 participants */}
                          <div className="flex -space-x-2">
                            {thread.posts.slice(0, 3).map((post, idx) => (
                              <div
                                key={idx}
                                className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-blue-500 text-xs text-white ring-2 ring-white"
                              >
                                {post.author.charAt(0)}
                              </div>
                            ))}
                          </div>

                          {/* Reply count */}
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <MessageSquare size={14} className="text-gray-400" />
                            <span>{thread.replies} replies</span>
                          </div>
                        </div>

                        {/* Arrow */}
                        <ChevronRight size={18} className="text-gray-400" />
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* CTA Buttons */}
            <div className="space-y-2">
              {/* Primary CTA - View All Threads */}
              {activityThreads.length > 0 && (
                <button
                  onClick={() => setShowThreadsList(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 text-white shadow-lg transition-all hover:shadow-xl active:scale-95"
                >
                  <MessageSquare size={20} />
                  View All Threads ({activityThreads.length})
                </button>
              )}

              {/* Secondary CTA - Start New Thread */}
              <button
                onClick={() => setShowThreadsList(true)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-purple-200 bg-white px-6 py-3 text-purple-700 transition-all hover:bg-purple-50 active:scale-95"
              >
                <Plus size={18} />
                Start a new thread
              </button>
            </div>
          </div>

          {/* Live Chat Button */}
          <div className="mb-6">
            <button
              onClick={() => setShowLocationChat(true)}
              className={`flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 shadow-md transition-all ${
                isUserAtLocation
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg active:scale-95'
                  : 'border-2 border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100 active:scale-95'
              }`}
            >
              <MessageSquare size={20} />
              {isUserAtLocation ? (
                <>
                  <span>Open Live Chat</span>
                  <span className="flex h-2 w-2 rounded-full bg-white animate-pulse" />
                </>
              ) : (
                <span>Live Chat (available when you're here)</span>
              )}
            </button>
          </div>

          {/* Location Details */}
          <div className="mb-24">
            <h2 className="mb-3 text-lg text-gray-900">Location</h2>
            <div className="rounded-2xl bg-gray-50 p-4 mb-3">
              <div className="flex items-start gap-2 mb-2">
                <MapPin size={18} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.address || activity.location}</p>
                  {activity.openingHours && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={14} className="text-gray-400" />
                      <span>{activity.openingHours}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Map placeholder */}
            <div className="h-40 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50">
              <div className="flex h-full items-center justify-center text-gray-400">
                <div className="text-center">
                  <MapPin size={28} className="mx-auto mb-2 text-blue-400" />
                  <p className="text-xs text-gray-500">Tap to open map</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 8. Sticky Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-gray-200 bg-white/95 p-4 backdrop-blur-lg">
          <div className="mx-auto w-full max-w-md">
            <div className="grid grid-cols-4 gap-2 mb-2">
              <button
                onClick={onSave}
                className={`flex flex-col items-center justify-center gap-1 rounded-xl py-3 transition-all active:scale-95 ${
                  isSaved
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart size={20} className={isSaved ? 'fill-current' : ''} />
                <span className="text-xs">{isSaved ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={() => {
                  setShowRatingFlow(true);
                  if (onMarkAsWent) onMarkAsWent(activity.id);
                }}
                className="flex flex-col items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 text-white transition-all hover:shadow-lg active:scale-95"
              >
                <Check size={20} />
                <span className="text-xs">I Went</span>
              </button>

              <button className="flex flex-col items-center justify-center gap-1 rounded-xl bg-gray-100 py-3 text-gray-700 transition-all hover:bg-gray-200 active:scale-95">
                <Users size={20} />
                <span className="text-xs">Join</span>
              </button>

              <button className="flex flex-col items-center justify-center gap-1 rounded-xl bg-gray-100 py-3 text-gray-700 transition-all hover:bg-gray-200 active:scale-95">
                <MessageSquare size={20} />
                <span className="text-xs">Thread</span>
              </button>
            </div>

            {/* Like-minded people hint */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
              <Users size={14} className="text-gray-400" />
              <span>{activity.savedByCount} people saved this</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
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