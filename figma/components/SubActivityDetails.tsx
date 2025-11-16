import { ArrowLeft, MapPin, Calendar, Clock, Users, Star, ChevronDown, ChevronUp, Plus, Share2, Flag, MessageCircle, Send } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

type PlannedItem = {
  id: string;
  title: string;
  subtitle: string;
  type: 'sub-activity' | 'booked-service' | 'booked-product';
  scheduledDateTime: Date;
  location: string;
  isCompleted: boolean;
  description?: string;
  host?: string;
  participants?: number;
};

type SubActivity = {
  id: string;
  title: string;
  date: string;
  time: string;
  host: string;
  participants: number;
  participantAvatars: string[];
  description: string;
  participantLimit?: number;
  location?: string;
  averageRating?: number;
  totalRatings?: number;
  owner?: {
    id: string;
    name: string;
    avatar: string;
  };
};

type ChatMessage = {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  message: string;
  timestamp: string;
};

type Props = {
  item?: PlannedItem;
  subActivity?: SubActivity;
  onClose?: () => void;
  onBack?: () => void;
  onOpenUserProfile?: (userId: string) => void;
};

export default function SubActivityDetails({ item, subActivity, onClose, onBack, onOpenUserProfile }: Props) {
  const [showAllParticipants, setShowAllParticipants] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [expandedParticipants, setExpandedParticipants] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      userId: '1',
      userName: 'Sarah Chen',
      userAvatar: 'https://i.pravatar.cc/150?u=sarah',
      message: 'Looking forward to this! Should we meet 10 mins early?',
      timestamp: '2:30 PM',
    },
    {
      id: '2',
      userId: '2',
      userName: 'Mike Johnson',
      userAvatar: 'https://i.pravatar.cc/150?u=mike',
      message: 'Great idea! See you all there 🎉',
      timestamp: '2:45 PM',
    },
    {
      id: '3',
      userId: '3',
      userName: 'Emma Wilson',
      userAvatar: 'https://i.pravatar.cc/150?u=emma',
      message: 'Anyone bringing snacks? I can bring some water bottles',
      timestamp: '3:12 PM',
    },
  ]);

  // Guard against undefined
  if (!item && !subActivity) {
    return null;
  }

  const handleClose = () => {
    if (onClose) onClose();
    if (onBack) onBack();
  };

  // Normalize data from either prop type
  const normalizedData = item ? {
    title: item.title,
    subtitle: item.subtitle || 'Sub-activity',
    description: item.description || 'No description available.',
    scheduledDateTime: item.scheduledDateTime,
    location: item.location,
    host: item.host,
    participants: item.participants,
  } : subActivity ? {
    title: subActivity.title,
    subtitle: 'Sub-activity',
    description: subActivity.description,
    scheduledDateTime: new Date(`${subActivity.date} ${subActivity.time}`),
    location: subActivity.location || 'Location TBD',
    host: subActivity.host,
    participants: subActivity.participants,
  } : null;

  if (!normalizedData) {
    return null;
  }

  // Mock participants data
  const participantsList = [
    { id: '1', name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?u=sarah' },
    { id: '2', name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?u=mike' },
    { id: '3', name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?u=emma' },
    { id: '4', name: 'Alex Brown', avatar: 'https://i.pravatar.cc/150?u=alex' },
    { id: '5', name: 'Jamie Lee', avatar: 'https://i.pravatar.cc/150?u=jamie' },
    { id: '6', name: 'Chris Taylor', avatar: 'https://i.pravatar.cc/150?u=chris' },
    { id: '7', name: 'Morgan Davis', avatar: 'https://i.pravatar.cc/150?u=morgan' },
    { id: '8', name: 'Pat Wilson', avatar: 'https://i.pravatar.cc/150?u=pat' },
    { id: '9', name: 'Sam Taylor', avatar: 'https://i.pravatar.cc/150?u=sam' },
    { id: '10', name: 'Jordan Lee', avatar: 'https://i.pravatar.cc/150?u=jordan2' },
    { id: '11', name: 'Casey Brown', avatar: 'https://i.pravatar.cc/150?u=casey' },
    { id: '12', name: 'Riley Smith', avatar: 'https://i.pravatar.cc/150?u=riley' },
  ];

  // Mock photos data
  const photos = [
    'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400',
  ];

  // Ensure date/time is always valid - use mock data if needed
  const displayDateTime = normalizedData.scheduledDateTime && !isNaN(normalizedData.scheduledDateTime.getTime())
    ? normalizedData.scheduledDateTime
    : new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // Default to 2 days from now

  // Check if date/time is valid
  const hasValidDateTime = normalizedData.scheduledDateTime && !isNaN(normalizedData.scheduledDateTime.getTime());
  const hasValidLocation = normalizedData.location && normalizedData.location !== 'Location TBD';
  const canJoin = hasValidDateTime && hasValidLocation;

  // Calculate if starting soon
  const isStartingSoon = hasValidDateTime && normalizedData.scheduledDateTime.getTime() - Date.now() < 24 * 60 * 60 * 1000;

  // Handle sending a message
  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'You',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser',
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  // If chat is open, show full-screen chat view
  if (showChat) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col bg-background">
        {/* Chat Header */}
        <div className="border-b border-border bg-card px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowChat(false)}
              className="rounded-full p-2 text-muted-foreground hover:bg-muted active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
            
            <div className="flex-1">
              <h2 className="text-foreground">{normalizedData.title}</h2>
              <p className="text-sm text-muted-foreground">Sub-activity chat</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((msg) => {
              const isCurrentUser = msg.userId === 'current-user';
              
              return (
                <div key={msg.id} className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                  <button
                    onClick={() => onOpenUserProfile?.(msg.userId)}
                    className="flex-shrink-0"
                  >
                    <ImageWithFallback
                      src={msg.userAvatar}
                      alt={msg.userName}
                      className="h-10 w-10 rounded-full bg-muted"
                    />
                  </button>

                  <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                    {!isCurrentUser && (
                      <span className="mb-1 px-3 text-xs text-muted-foreground">{msg.userName}</span>
                    )}
                    
                    <div
                      className={`max-w-[260px] rounded-2xl px-4 py-2 ${
                        isCurrentUser
                          ? 'bg-blue-600 text-white'
                          : 'bg-card text-foreground border border-border'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                    </div>
                    
                    <span className="mt-1 px-3 text-xs text-muted-foreground">{msg.timestamp}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 rounded-full border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:border-blue-600 focus:bg-card focus:outline-none"
            />

            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="rounded-full bg-blue-600 p-2 text-white transition-all hover:bg-blue-700 active:scale-95 disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Display participants
  const displayedParticipants = showAllParticipants ? participantsList : participantsList.slice(0, 3);
  const remainingCount = participantsList.length - displayedParticipants.length;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center gap-4 border-b border-border bg-background/95 backdrop-blur-lg px-6 py-4">
        <button
          onClick={handleClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-secondary/80"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="flex-1 text-xl text-foreground">Sub-Activity Details</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* 1. Top Section - Compact Summary */}
        <div className="p-4">
          {/* Sub-activity tag */}
          <span className="inline-block rounded-full bg-purple-100 px-2.5 py-1 text-xs text-purple-700 dark:bg-purple-500/20 dark:text-purple-400">
            {normalizedData.subtitle}
          </span>

          {/* Title */}
          <h2 className="mb-3 mt-2 text-3xl text-foreground">{normalizedData.title}</h2>

          {/* Owner row */}
          {subActivity?.owner && (
            <div className="mb-4 flex items-center justify-between">
              <button
                onClick={() => onOpenUserProfile?.(subActivity.owner!.id)}
                className="flex items-center gap-2 transition-opacity hover:opacity-80"
              >
                <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                  <ImageWithFallback
                    src={subActivity.owner.avatar}
                    alt={subActivity.owner.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Created by</p>
                  <p className="text-sm text-foreground">{subActivity.owner.name}</p>
                </div>
              </button>
              <button
                onClick={() => onOpenUserProfile?.(subActivity.owner!.id)}
                className="text-xs text-blue-600 hover:underline"
              >
                View Profile
              </button>
            </div>
          )}

          {/* Quick info chips */}
          <div className="mb-4 flex flex-wrap gap-2">
            {hasValidDateTime && (
              <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
                <Calendar size={14} className="text-muted-foreground" />
                <span className="text-xs text-foreground">
                  {normalizedData.scheduledDateTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            )}
            {hasValidLocation && (
              <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
                <MapPin size={14} className="text-muted-foreground" />
                <span className="text-xs text-foreground line-clamp-1">{normalizedData.location}</span>
              </div>
            )}
            {isStartingSoon && (
              <div className="flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1.5 dark:bg-orange-500/20">
                <Clock size={14} className="text-orange-600 dark:text-orange-400" />
                <span className="text-xs text-orange-700 dark:text-orange-400">Starting soon</span>
              </div>
            )}
          </div>

          {/* Primary action button */}
          {canJoin ? (
            <button
              onClick={() => setIsJoined(!isJoined)}
              className={`w-full rounded-2xl px-6 py-3 transition-all active:scale-98 ${
                isJoined
                  ? 'bg-secondary text-foreground hover:bg-secondary/80'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isJoined ? 'Leave' : 'Join Activity'}
            </button>
          ) : (
            <button
              disabled
              className="w-full cursor-not-allowed rounded-2xl bg-secondary px-6 py-3 text-sm text-muted-foreground"
            >
              Details coming soon
            </button>
          )}
        </div>

        {/* 2. Photo & Media Strip - Larger */}
        <div className="border-y border-border bg-secondary/30 px-4 py-4">
          <div className="flex gap-3 overflow-x-auto pb-1">
            {photos.map((photo, idx) => (
              <div key={idx} className="h-32 w-40 flex-shrink-0 overflow-hidden rounded-xl bg-secondary">
                <ImageWithFallback
                  src={photo}
                  alt={`Photo ${idx + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
            <button className="flex h-32 w-40 flex-shrink-0 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-background transition-colors hover:bg-secondary">
              <Plus size={24} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Add Photo</span>
            </button>
          </div>
        </div>

        <div className="p-4">
          {/* 3. Details Section - Concise About */}
          <div className="mb-4">
            <h3 className="mb-2 text-foreground">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {normalizedData.description}
            </p>
          </div>

          {/* Key Info Cards - 2 column grid, smaller & lighter */}
          <div className="mb-4 grid grid-cols-2 gap-2">
            {/* Date & Time */}
            <div className="rounded-xl border border-border bg-card p-3">
              <div className="mb-1 flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-500/20">
                <Calendar size={14} className="text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-xs text-muted-foreground">Date & Time</p>
              <p className="mt-0.5 text-sm text-foreground">
                {displayDateTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                <br />
                <span className="text-xs">
                  {displayDateTime.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </span>
              </p>
            </div>

            {/* Location */}
            <div className="rounded-xl border border-border bg-card p-3">
              <div className="mb-1 flex h-7 w-7 items-center justify-center rounded-lg bg-green-100 dark:bg-green-500/20">
                <MapPin size={14} className="text-green-600 dark:text-green-400" />
              </div>
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="mt-0.5 text-sm text-foreground line-clamp-2">{normalizedData.location}</p>
            </div>
          </div>

          {/* 4. Participants Section - Collapsed by default */}
          {normalizedData.participants && normalizedData.participants > 0 && (
            <div className="mb-4">
              <button
                onClick={() => setExpandedParticipants(!expandedParticipants)}
                className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-3 transition-colors hover:bg-secondary/50"
              >
                <div className="flex items-center gap-3">
                  {/* Overlapping avatars */}
                  <div className="flex -space-x-2">
                    {participantsList.slice(0, 4).map((participant, idx) => (
                      <div
                        key={participant.id}
                        className="h-8 w-8 overflow-hidden rounded-full border-2 border-background"
                        style={{ zIndex: 10 - idx }}
                      >
                        <ImageWithFallback
                          src={participant.avatar}
                          alt={participant.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm text-foreground">{normalizedData.participants} going</p>
                    <p className="text-xs text-muted-foreground">See who's joining</p>
                  </div>
                </div>
                {expandedParticipants ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>

              {/* Expanded participants grid */}
              {expandedParticipants && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {participantsList.map((participant) => (
                    <button
                      key={participant.id}
                      onClick={() => onOpenUserProfile?.(participant.id)}
                      className="flex items-center gap-2 rounded-lg bg-secondary p-2 transition-all hover:bg-secondary/80 active:scale-98"
                    >
                      <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                        <ImageWithFallback
                          src={participant.avatar}
                          alt={participant.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p className="flex-1 truncate text-left text-xs text-foreground">{participant.name}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 5. Chat Section - Preview with Open Chat button */}
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-foreground">Chat</h3>
              <button className="text-xs text-blue-600 hover:underline" onClick={() => setShowChat(true)}>
                Open Chat
              </button>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="space-y-3">
                {messages.slice(0, 2).map((msg) => (
                  <div key={msg.id} className="flex items-start gap-2">
                    <button
                      onClick={() => onOpenUserProfile?.(msg.userId)}
                      className="h-7 w-7 flex-shrink-0 overflow-hidden rounded-full"
                    >
                      <ImageWithFallback
                        src={msg.userAvatar}
                        alt={msg.userName}
                        className="h-full w-full object-cover"
                      />
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-foreground">{msg.userName}</p>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 6. Footer Section */}
          <div className="rounded-xl border border-border bg-secondary/30 p-4">
            <p className="mb-3 text-center text-xs text-muted-foreground">
              More details will be shared closer to the date
            </p>
            <div className="flex items-center justify-center gap-4">
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
                <Share2 size={14} />
                <span>Share</span>
              </button>
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
                <Flag size={14} />
                <span>Report</span>
              </button>
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
                <MessageCircle size={14} />
                <span>Message</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}