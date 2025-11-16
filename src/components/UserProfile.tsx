import { useState } from 'react';
import { ArrowLeft, MessageCircle, Edit, ThumbsUp, MessageSquare, MapPin, Calendar, Award, Settings } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import Badge from './Badge';
import type { Activity } from '../App';

type UserProfileData = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  joinDate: string;
  city?: string;
  interests: string[];
  badges?: string[];
  isOwnProfile: boolean;
  stats: {
    photos: number;
    activities: number;
    threads: number;
  };
};

type MediaItem = {
  id: string;
  url: string;
  upvotes: number;
  activityName: string;
  type: 'photo' | 'video';
};

type UserActivity = {
  id: string;
  title: string;
  spotName: string;
  datetime?: string;
  upvotes?: number;
  type: 'route' | 'meetup' | 'challenge' | 'completed' | 'planned';
};

type UserThread = {
  id: string;
  title: string;
  threadType: 'story' | 'tip' | 'plan' | 'question' | 'media';
  preview: string;
  upvotes: number;
  comments: number;
  timestamp: string;
};

type Props = {
  user: UserProfileData;
  onBack: () => void;
  onMessage?: () => void;
  onEditProfile?: () => void;
  onViewActivity?: (activityId: string) => void;
  onViewThread?: (threadId: string) => void;
  onViewPhoto?: (photoUrl: string) => void;
  onViewAchievements?: () => void;
  onSettings?: () => void;
};

export default function UserProfile({
  user,
  onBack,
  onMessage,
  onEditProfile,
  onViewActivity,
  onViewThread,
  onViewPhoto,
  onViewAchievements,
  onSettings,
}: Props) {
  const [activeTab, setActiveTab] = useState<'photos' | 'activities' | 'threads' | 'about'>('photos');

  // User level and tier data (would come from backend)
  const userLevel = 17;
  const userTier = 'Explorer'; // 'Beginner' | 'Explorer' | 'Advanced' | 'Elite'
  const userXP = 420;
  const nextLevelXP = 500;
  const xpProgress = (userXP / nextLevelXP) * 100;
  
  // Top 3 badges
  const topBadges = ['🗺️', '🌅', '🦋'];
  
  // Tier color mapping
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Beginner':
        return 'from-green-500 to-green-600';
      case 'Explorer':
        return 'from-blue-500 to-blue-600';
      case 'Advanced':
        return 'from-purple-500 to-purple-600';
      case 'Elite':
        return 'from-yellow-500 to-yellow-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  // Mock data - in real app would come from backend
  const mediaItems: MediaItem[] = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      upvotes: 24,
      activityName: 'Sunset Viewpoint',
      type: 'photo',
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      upvotes: 12,
      activityName: 'Blue Bottle Coffee',
      type: 'photo',
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
      upvotes: 18,
      activityName: 'Riverside Loop',
      type: 'photo',
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400',
      upvotes: 31,
      activityName: 'Morning Walk',
      type: 'photo',
    },
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
      upvotes: 43,
      activityName: 'Sunset Viewpoint',
      type: 'photo',
    },
    {
      id: '6',
      url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400',
      upvotes: 8,
      activityName: 'Study Session',
      type: 'photo',
    },
  ];

  const userActivities: UserActivity[] = [
    {
      id: '1',
      title: 'Sunset Photography Meetup',
      spotName: 'Sunset Viewpoint',
      datetime: 'Today at 6:30 PM',
      upvotes: 12,
      type: 'meetup',
    },
    {
      id: '2',
      title: 'Coastal Trail Challenge',
      spotName: 'Eagle Peak Trail',
      upvotes: 34,
      type: 'challenge',
    },
    {
      id: '3',
      title: 'Morning Coffee Walk',
      spotName: 'Downtown District',
      datetime: 'Tomorrow at 9:00 AM',
      type: 'route',
    },
    {
      id: '4',
      title: 'Blue Bottle Coffee',
      spotName: 'Downtown',
      type: 'completed',
    },
    {
      id: '5',
      title: 'Community Yoga Session',
      spotName: 'Riverside Park',
      datetime: 'Dec 20 at 7:00 AM',
      type: 'planned',
    },
  ];

  const userThreads: UserThread[] = [
    {
      id: '1',
      title: 'Best photography spots for sunset?',
      threadType: 'question',
      preview: 'Looking for recommendations around the Hilltop area',
      upvotes: 15,
      comments: 23,
      timestamp: '2d ago',
    },
    {
      id: '2',
      title: 'My favorite hidden café gems',
      threadType: 'story',
      preview: 'After months of exploring, here are my top 5...',
      upvotes: 42,
      comments: 18,
      timestamp: '1w ago',
    },
    {
      id: '3',
      title: 'Parking tip for Sunset Viewpoint',
      threadType: 'tip',
      preview: 'Free street parking available on Summit Road',
      upvotes: 28,
      comments: 7,
      timestamp: '3d ago',
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'route': return '🗺️';
      case 'meetup': return '👥';
      case 'challenge': return '🏆';
      case 'completed': return '✓';
      case 'planned': return '📅';
      default: return '✨';
    }
  };

  const getThreadTypeBadge = (type: string) => {
    const badges = {
      story: { label: 'Story', color: 'bg-purple-100 text-purple-700' },
      tip: { label: 'Tip', color: 'bg-blue-100 text-blue-700' },
      plan: { label: 'Plan', color: 'bg-green-100 text-green-700' },
      question: { label: 'Question', color: 'bg-amber-100 text-amber-700' },
      media: { label: 'Media', color: 'bg-pink-100 text-pink-700' },
    };
    return badges[type as keyof typeof badges] || badges.story;
  };

  return (
    <div className="flex h-full w-full flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-5 py-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="rounded-full p-2 text-muted-foreground hover:bg-muted active:scale-95"
          >
            <ArrowLeft size={20} />
          </button>
          
          {/* Settings Icon - Only for own profile */}
          {user.isOwnProfile && onSettings && (
            <button
              onClick={onSettings}
              className="rounded-full p-2 text-muted-foreground hover:bg-muted active:scale-95"
            >
              <Settings size={20} />
            </button>
          )}
        </div>

        {/* Profile Header */}
        <div className="flex items-start gap-4">
          {/* Avatar with Level Ring */}
          <div className="relative flex-shrink-0">
            {/* Tier-colored ring */}
            {user.isOwnProfile && (
              <div className={`absolute -inset-1 rounded-full bg-gradient-to-r ${getTierColor(userTier)} p-[3px]`}>
                <div className="h-full w-full rounded-full bg-background" />
              </div>
            )}
            <img
              src={user.avatar}
              alt={user.name}
              className="relative h-20 w-20 rounded-full bg-muted"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl text-foreground">{user.name}</h1>
            </div>
            
            {/* Level and Tier - Improved clarity */}
            {user.isOwnProfile && (
              <div className="mb-2">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#14B8A6] via-[#06B6D4] to-[#3B82F6] px-2.5 py-0.5 mb-2">
                  <span className="text-xs text-white">Level {userLevel} — {userTier}</span>
                </div>
                
                {/* Top 3 Badges */}
                <div className="flex items-center gap-2 mb-2">
                  {topBadges.map((badge, idx) => (
                    <Badge
                      key={idx}
                      icon={badge}
                      label=""
                      color="teal"
                      size="sm"
                      earned={true}
                    />
                  ))}
                </div>
              </div>
            )}
            
            <p className="mb-2 text-sm text-muted-foreground">{user.bio}</p>
            
            {/* Minimal XP bar with improved clarity */}
            {user.isOwnProfile && (
              <div className="mb-2">
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#14B8A6] via-[#06B6D4] to-[#3B82F6] transition-all"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {userXP} XP earned · {nextLevelXP - userXP} XP to next level
                </p>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar size={14} />
              <span>Joined {user.joinDate}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-3">
          {user.isOwnProfile ? (
            <button
              onClick={onEditProfile}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-border bg-card px-6 py-3 text-foreground transition-all hover:bg-muted/50 active:scale-98"
            >
              <Edit size={18} />
              <span>Edit Profile</span>
            </button>
          ) : (
            <button
              onClick={onMessage}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-white transition-all hover:bg-blue-700 active:scale-98"
            >
              <MessageCircle size={18} />
              <span>Message User</span>
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="mt-4 flex justify-around rounded-2xl bg-muted py-3">
          <div className="text-center">
            <p className="text-xl text-foreground">{user.stats.photos}</p>
            <p className="text-xs text-muted-foreground">Photos</p>
          </div>
          <div className="text-center">
            <p className="text-xl text-foreground">{user.stats.activities}</p>
            <p className="text-xs text-muted-foreground">Activities</p>
          </div>
          <div className="text-center">
            <p className="text-xl text-foreground">{user.stats.threads}</p>
            <p className="text-xs text-muted-foreground">Threads</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex px-5">
          {(['photos', 'activities', 'threads', 'about'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 border-b-2 pb-3 pt-4 text-sm capitalize transition-colors ${
                activeTab === tab
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Photos Tab */}
        {activeTab === 'photos' && (
          <div className="grid grid-cols-3 gap-1 p-1">
            {mediaItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewPhoto?.(item.url)}
                className="relative aspect-square overflow-hidden bg-gray-100 transition-opacity hover:opacity-90 active:opacity-70"
              >
                <ImageWithFallback
                  src={item.url}
                  alt="User photo"
                  className="h-full w-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Upvotes */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1 text-xs text-white">
                  <ThumbsUp size={12} />
                  <span>{item.upvotes}</span>
                </div>

                {/* Activity tag */}
                <div className="absolute top-2 right-2">
                  <span className="rounded-full bg-white/90 px-2 py-0.5 text-xs text-gray-900 backdrop-blur-sm">
                    {item.activityName}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Activities Tab */}
        {activeTab === 'activities' && (
          <div className="divide-y divide-border">
            {userActivities.map((activity) => (
              <button
                key={activity.id}
                onClick={() => onViewActivity?.(activity.id)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/50 active:bg-muted"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-2xl">
                  {getActivityIcon(activity.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="mb-1 truncate text-foreground">{activity.title}</h3>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin size={14} />
                    <span className="truncate">{activity.spotName}</span>
                  </div>

                  {activity.datetime && (
                    <p className="mt-1 text-xs text-primary">{activity.datetime}</p>
                  )}
                </div>

                {activity.upvotes !== undefined && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <ThumbsUp size={14} />
                    <span>{activity.upvotes}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Threads Tab */}
        {activeTab === 'threads' && (
          <div className="divide-y divide-border">
            {userThreads.map((thread) => {
              const badge = getThreadTypeBadge(thread.threadType);
              
              return (
                <button
                  key={thread.id}
                  onClick={() => onViewThread?.(thread.id)}
                  className="flex w-full flex-col gap-2 px-5 py-4 text-left transition-colors hover:bg-muted/50 active:bg-muted"
                >
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${badge.color}`}>
                      {badge.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{thread.timestamp}</span>
                  </div>

                  <h3 className="text-foreground">{thread.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{thread.preview}</p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={14} />
                      <span>{thread.upvotes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare size={14} />
                      <span>{thread.comments}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="p-5">
            {/* XP & Level Section */}
            {user.isOwnProfile && (
              <div className="mb-6">
                <h2 className="mb-3 text-lg text-gray-900">Your Level</h2>
                <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-5 text-white">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Current Level</p>
                      <p className="text-3xl">Level 5</p>
                    </div>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                      <Award size={32} />
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="h-2.5 overflow-hidden rounded-full bg-white/20">
                      <div
                        className="h-full rounded-full bg-white transition-all"
                        style={{ width: '85%' }}
                      />
                    </div>
                  </div>
                  <p className="text-sm opacity-90">340 / 400 XP</p>
                </div>
              </div>
            )}

            {/* Achievements Preview */}
            {user.isOwnProfile && (
              <div className="mb-6">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-lg text-gray-900">Achievements</h2>
                  <button
                    onClick={onViewAchievements}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {/* Badge 1 - Earned */}
                  <div className="flex flex-col items-center gap-2 rounded-2xl border border-gray-200 bg-white p-3">
                    <span className="text-3xl">🗺️</span>
                    <p className="text-center text-xs text-gray-900">Explorer</p>
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                      ✓ Earned
                    </span>
                  </div>
                  
                  {/* Badge 2 - Earned */}
                  <div className="flex flex-col items-center gap-2 rounded-2xl border border-gray-200 bg-white p-3">
                    <span className="text-3xl">🌅</span>
                    <p className="text-center text-xs text-gray-900">Sunset Chaser</p>
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                      ✓ Earned
                    </span>
                  </div>
                  
                  {/* Badge 3 - Earned */}
                  <div className="flex flex-col items-center gap-2 rounded-2xl border border-gray-200 bg-white p-3">
                    <span className="text-3xl">🦋</span>
                    <p className="text-center text-xs text-gray-900">Social Butterfly</p>
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                      ✓ Earned
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Bio */}
            <div className="mb-6">
              <h2 className="mb-2 text-lg text-gray-900">Bio</h2>
              <p className="text-gray-700 leading-relaxed">{user.bio}</p>
            </div>

            {/* City */}
            {user.city && (
              <div className="mb-6">
                <h2 className="mb-2 text-lg text-gray-900">Location</h2>
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin size={18} />
                  <span>{user.city}</span>
                </div>
              </div>
            )}

            {/* Interests */}
            <div className="mb-6">
              <h2 className="mb-3 text-lg text-gray-900">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-700"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Badges */}
            {user.badges && user.badges.length > 0 && (
              <div className="mb-6">
                <h2 className="mb-3 text-lg text-gray-900">Badges</h2>
                <div className="grid grid-cols-2 gap-3">
                  {user.badges.map((badge, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-4"
                    >
                      <Award size={20} className="text-amber-600" />
                      <span className="text-sm text-gray-900">{badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}