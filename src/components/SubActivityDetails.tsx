import { useState } from 'react';
import { ArrowLeft, ThumbsUp, Users, MessageCircle, Calendar, Target, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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

type Comment = {
  id: string;
  userName: string;
  userAvatar: string;
  text: string;
  timestamp: string;
};

type Props = {
  subActivity: SubActivity;
  onBack: () => void;
  onJoinActivity: () => void;
  onOpenChat: () => void;
};

export default function SubActivityDetails({ subActivity, onBack, onJoinActivity, onOpenChat }: Props) {
  const [hasJoined, setHasJoined] = useState(false);
  const [upvoted, setUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(subActivity.upvotes);

  // Mock gallery images
  const galleryImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=800',
    'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
  ];

  // Mock comments
  const comments: Comment[] = [
    {
      id: '1',
      userName: 'Sarah Chen',
      userAvatar: 'https://i.pravatar.cc/150?u=sarah',
      text: 'This looks amazing! Count me in 🎉',
      timestamp: '2h ago',
    },
    {
      id: '2',
      userName: 'Alex Martinez',
      userAvatar: 'https://i.pravatar.cc/150?u=alex',
      text: 'Did this last week, totally worth it!',
      timestamp: '5h ago',
    },
    {
      id: '3',
      userName: 'Jordan Lee',
      userAvatar: 'https://i.pravatar.cc/150?u=jordan',
      text: 'What time does everyone usually meet?',
      timestamp: '1d ago',
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'challenge': return 'bg-orange-100 text-orange-700';
      case 'meetup': return 'bg-green-100 text-green-700';
      case 'route': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const handleUpvote = () => {
    if (upvoted) {
      setUpvoted(false);
      setUpvoteCount(upvoteCount - 1);
    } else {
      setUpvoted(true);
      setUpvoteCount(upvoteCount + 1);
    }
  };

  const handleJoin = () => {
    setHasJoined(!hasJoined);
    onJoinActivity();
  };

  return (
    <div className="min-h-full bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/95 px-5 py-4 backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200 active:scale-95"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-xl text-gray-900">Sub-Activity Details</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pb-4">
        {/* Header Section */}
        <div className="border-b border-gray-100 p-5">
          <div className="mb-3 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{subActivity.icon}</span>
              <div>
                <h2 className="text-2xl text-gray-900">{subActivity.title}</h2>
              </div>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-sm ${getTypeColor(subActivity.type)}`}>
              {getTypeLabel(subActivity.type)}
            </span>
            {subActivity.spotName && (
              <span className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                <MapPin size={14} />
                {subActivity.spotName}
              </span>
            )}
          </div>

          <p className="text-gray-700">{subActivity.description}</p>
        </div>

        {/* Meta Info */}
        {(subActivity.date || subActivity.difficulty) && (
          <div className="border-b border-gray-100 p-5">
            <div className="space-y-2">
              {subActivity.date && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar size={18} className="text-blue-600" />
                  <span>{subActivity.date}</span>
                </div>
              )}
              {subActivity.difficulty && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Target size={18} className="text-blue-600" />
                  <span>Difficulty: {subActivity.difficulty}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="border-b border-gray-100 p-5">
          <div className="flex items-center gap-6">
            <button
              onClick={handleUpvote}
              className={`flex items-center gap-2 transition-all ${
                upvoted ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <ThumbsUp size={20} fill={upvoted ? 'currentColor' : 'none'} />
              <span>{upvoteCount}</span>
            </button>
            <div className="flex items-center gap-2 text-gray-600">
              <Users size={20} />
              <span>{subActivity.participants} participants</span>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="border-b border-gray-100 p-5">
          <h3 className="mb-3 text-lg text-gray-900">Photos</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="flex-shrink-0">
                <ImageWithFallback
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  className="h-32 w-48 rounded-2xl object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-b border-gray-100 p-5">
          <div className="space-y-2">
            <button
              onClick={handleJoin}
              className={`w-full rounded-2xl px-4 py-3 transition-all active:scale-98 ${
                hasJoined
                  ? 'border-2 border-blue-600 bg-white text-blue-600 hover:bg-blue-50'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {hasJoined ? 'Joined ✓' : 'Join Activity'}
            </button>
            <button
              onClick={onOpenChat}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-700 transition-all hover:bg-gray-50 active:scale-98"
            >
              <MessageCircle size={18} />
              <span>Open Activity Chat</span>
            </button>
          </div>
        </div>

        {/* Comments */}
        <div className="p-5">
          <h3 className="mb-3 text-lg text-gray-900">Comments</h3>
          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <img
                  src={comment.userAvatar}
                  alt={comment.userName}
                  className="h-10 w-10 rounded-full bg-gray-200"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-900">{comment.userName}</span>
                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-700">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}