import { useState } from 'react';
import { ArrowLeft, MessageCircle, Edit, ThumbsUp, MessageSquare, MapPin, Calendar, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
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
};

export default function UserProfile({
  user,
  onBack,
  onMessage,
  onEditProfile,
  onViewActivity,
  onViewThread,
  onViewPhoto,
}: Props) {
  const [activeTab, setActiveTab] = useState<'photos' | 'activities' | 'threads' | 'about'>('photos');

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
    <div className="flex h-full w-full flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-5 py-4">
        <button
          onClick={onBack}
          className="mb-4 rounded-full p-2 text-gray-600 hover:bg-gray-100 active:scale-95"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Profile Header */}
        <div className="flex items-start gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-20 w-20 rounded-full bg-gray-200"
          />

          <div className="flex-1">
            <h1 className="text-2xl text-gray-900">{user.name}</h1>
            <p className="mb-2 text-sm text-gray-600">{user.bio}</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
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
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-gray-200 bg-white px-6 py-3 text-gray-900 transition-all hover:bg-gray-50 active:scale-98"
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
        <div className="mt-4 flex justify-around rounded-2xl bg-gray-50 py-3">
          <div className="text-center">
            <p className="text-xl text-gray-900">{user.stats.photos}</p>
            <p className="text-xs text-gray-500">Photos</p>
          </div>
          <div className="text-center">
            <p className="text-xl text-gray-900">{user.stats.activities}</p>
            <p className="text-xs text-gray-500">Activities</p>
          </div>
          <div className="text-center">
            <p className="text-xl text-gray-900">{user.stats.threads}</p>
            <p className="text-xs text-gray-500">Threads</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex px-5">
          {(['photos', 'activities', 'threads', 'about'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 border-b-2 pb-3 pt-4 text-sm capitalize transition-colors ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
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
          <div className="divide-y divide-gray-100">
            {userActivities.map((activity) => (
              <button
                key={activity.id}
                onClick={() => onViewActivity?.(activity.id)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-50 active:bg-gray-100"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-2xl">
                  {getActivityIcon(activity.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="mb-1 truncate text-gray-900">{activity.title}</h3>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={14} />
                    <span className="truncate">{activity.spotName}</span>
                  </div>

                  {activity.datetime && (
                    <p className="mt-1 text-xs text-blue-600">{activity.datetime}</p>
                  )}
                </div>

                {activity.upvotes !== undefined && (
                  <div className="flex items-center gap-1 text-sm text-gray-600">
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
          <div className="divide-y divide-gray-100">
            {userThreads.map((thread) => {
              const badge = getThreadTypeBadge(thread.threadType);
              
              return (
                <button
                  key={thread.id}
                  onClick={() => onViewThread?.(thread.id)}
                  className="flex w-full flex-col gap-2 px-5 py-4 text-left transition-colors hover:bg-gray-50 active:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs ${badge.color}`}>
                      {badge.label}
                    </span>
                    <span className="text-xs text-gray-500">{thread.timestamp}</span>
                  </div>

                  <h3 className="text-gray-900">{thread.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-1">{thread.preview}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
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
