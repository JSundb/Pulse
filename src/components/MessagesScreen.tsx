import { useState } from 'react';
import { MessageCircle, Users } from 'lucide-react';
import ActivityChat from './ActivityChat';
import PrivateDM from './PrivateDM';
import UserPopup from './UserPopup';
import UserProfile from './UserProfile';
import type { Activity } from '../App';

type ActivityChatPreview = {
  id: string;
  activity: Activity;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
};

type PrivateChatPreview = {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
};

export default function MessagesScreen() {
  const [activeTab, setActiveTab] = useState<'activity' | 'private'>('activity');
  const [selectedActivityChat, setSelectedActivityChat] = useState<Activity | null>(null);
  const [selectedPrivateChat, setSelectedPrivateChat] = useState<{ userId: string; userName: string; userAvatar: string } | null>(null);
  const [showUserPopup, setShowUserPopup] = useState<{ userId: string; userName: string; userAvatar: string } | null>(null);
  const [viewingProfile, setViewingProfile] = useState<{ userId: string; userName: string; userAvatar: string } | null>(null);

  // Mock data
  const activityChats: ActivityChatPreview[] = [
    {
      id: '1',
      activity: {
        id: '1',
        title: 'Sunset Hike at Eagle Peak',
        category: 'Hiking',
        photo: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
      } as Activity,
      lastMessage: 'See you at the trailhead at 6pm!',
      timestamp: '2m ago',
      unreadCount: 3,
    },
    {
      id: '2',
      activity: {
        id: '2',
        title: 'Morning Coffee at Blue Bottle',
        category: 'Café',
        photo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
      } as Activity,
      lastMessage: 'This place is amazing, highly recommend!',
      timestamp: '1h ago',
      unreadCount: 0,
    },
  ];

  const privateChats: PrivateChatPreview[] = [
    {
      id: '1',
      userId: 'user1',
      userName: 'Sarah Chen',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      lastMessage: 'Want to explore that new trail together?',
      timestamp: '5m ago',
      unreadCount: 2,
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Alex Martinez',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      lastMessage: 'Thanks for the photography tips!',
      timestamp: '3h ago',
      unreadCount: 0,
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Jordan Lee',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
      lastMessage: 'See you tomorrow morning!',
      timestamp: '1d ago',
      unreadCount: 0,
    },
  ];

  if (selectedActivityChat) {
    return (
      <ActivityChat
        activity={selectedActivityChat}
        onClose={() => setSelectedActivityChat(null)}
        onOpenUserProfile={(userId, userName, userAvatar) => {
          setShowUserPopup({ userId, userName, userAvatar });
        }}
      />
    );
  }

  if (selectedPrivateChat) {
    return (
      <PrivateDM
        otherUserId={selectedPrivateChat.userId}
        otherUserName={selectedPrivateChat.userName}
        otherUserAvatar={selectedPrivateChat.userAvatar}
        onClose={() => setSelectedPrivateChat(null)}
      />
    );
  }

  if (showUserPopup) {
    return (
      <UserPopup
        userId={showUserPopup.userId}
        userName={showUserPopup.userName}
        userAvatar={showUserPopup.userAvatar}
        onClose={() => setShowUserPopup(null)}
        onMessage={() => {
          setShowUserPopup(null);
          setSelectedPrivateChat(showUserPopup);
        }}
        onViewProfile={() => {
          setShowUserPopup(null);
          setViewingProfile(showUserPopup);
        }}
      />
    );
  }

  if (viewingProfile) {
    return (
      <UserProfile
        user={{
          id: viewingProfile.userId,
          name: viewingProfile.userName,
          avatar: viewingProfile.userAvatar,
          bio: 'Exploring the city one adventure at a time',
          joinDate: 'Nov 2024',
          interests: ['Photography', 'Hiking', 'Coffee'],
          isOwnProfile: false,
          stats: {
            photos: 24,
            activities: 12,
            threads: 8,
          },
        }}
        onBack={() => setViewingProfile(null)}
        onMessage={() => {
          const user = viewingProfile;
          setViewingProfile(null);
          setSelectedPrivateChat(user);
        }}
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl text-gray-900">Messages</h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex px-6">
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex-1 border-b-2 pb-3 pt-4 text-sm transition-colors ${
              activeTab === 'activity'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <MessageCircle size={18} />
              <span>Activity Chats</span>
              {activityChats.some(chat => chat.unreadCount > 0) && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                  {activityChats.reduce((acc, chat) => acc + chat.unreadCount, 0)}
                </span>
              )}
            </div>
          </button>

          <button
            onClick={() => setActiveTab('private')}
            className={`flex-1 border-b-2 pb-3 pt-4 text-sm transition-colors ${
              activeTab === 'private'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Users size={18} />
              <span>Private Messages</span>
              {privateChats.some(chat => chat.unreadCount > 0) && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                  {privateChats.reduce((acc, chat) => acc + chat.unreadCount, 0)}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'activity' ? (
          <div>
            {activityChats.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <MessageCircle size={32} className="text-gray-400" />
                </div>
                <h3 className="mb-2 text-gray-900">No activity chats yet</h3>
                <p className="text-sm text-gray-500">Start chatting about activities you're interested in</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {activityChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedActivityChat(chat.activity)}
                    className="flex w-full items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-gray-50 active:bg-gray-100"
                  >
                    <img
                      src={chat.activity.photo}
                      alt={chat.activity.title}
                      className="h-14 w-14 flex-shrink-0 rounded-xl object-cover"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <h3 className="truncate text-gray-900">{chat.activity.title}</h3>
                        <span className="flex-shrink-0 text-xs text-gray-500">{chat.timestamp}</span>
                      </div>
                      
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm text-gray-600">{chat.lastMessage}</p>
                        {chat.unreadCount > 0 && (
                          <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                            {chat.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {privateChats.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <Users size={32} className="text-gray-400" />
                </div>
                <h3 className="mb-2 text-gray-900">No messages yet</h3>
                <p className="text-sm text-gray-500">Start a conversation with someone you meet</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {privateChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedPrivateChat({ userId: chat.userId, userName: chat.userName, userAvatar: chat.userAvatar })}
                    className="flex w-full items-center gap-4 px-6 py-4 text-left transition-colors hover:bg-gray-50 active:bg-gray-100"
                  >
                    <img
                      src={chat.userAvatar}
                      alt={chat.userName}
                      className="h-14 w-14 flex-shrink-0 rounded-full bg-gray-200"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <h3 className="truncate text-gray-900">{chat.userName}</h3>
                        <span className="flex-shrink-0 text-xs text-gray-500">{chat.timestamp}</span>
                      </div>
                      
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm text-gray-600">{chat.lastMessage}</p>
                        {chat.unreadCount > 0 && (
                          <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                            {chat.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}