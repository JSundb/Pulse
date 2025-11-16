import { MessageCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Props = {
  onOpenChat: (activityId: string, activityName: string, spotName: string) => void;
};

export default function MessagesTab({ onOpenChat }: Props) {
  const recentChats = [
    {
      activityId: '1',
      activityName: 'Sunrise Photography Meetup',
      spotName: 'Golden Gate Bridge',
      lastMessage: 'Anyone going tomorrow morning?',
      time: '5 min ago',
      unreadCount: 2,
      photo: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400',
    },
    {
      activityId: '2',
      activityName: 'Coffee & Coworking',
      spotName: 'Urban Coffee Roasters',
      lastMessage: 'Great spot! I\'ll be there today',
      time: '1 hour ago',
      unreadCount: 0,
      photo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    },
    {
      activityId: '3',
      activityName: 'Twin Peaks Sunset Hike',
      spotName: 'Twin Peaks',
      lastMessage: 'The views were amazing!',
      time: '3 hours ago',
      unreadCount: 5,
      photo: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400',
    },
    {
      activityId: '4',
      activityName: 'Weekend Picnic',
      spotName: 'Dolores Park',
      lastMessage: 'Should we meet at 2pm?',
      time: 'Yesterday',
      unreadCount: 0,
      photo: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400',
    },
    {
      activityId: '5',
      activityName: 'Ocean Beach Walk',
      spotName: 'Ocean Beach',
      lastMessage: 'Sunset was incredible today',
      time: '2 days ago',
      unreadCount: 0,
      photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
    },
  ];

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-5 py-4">
        <h1 className="text-3xl text-foreground">Messages</h1>
        <p className="mt-1 text-sm text-muted-foreground">Activity chats</p>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {recentChats.length === 0 ? (
          <div className="flex h-full items-center justify-center p-8 text-center">
            <div>
              <MessageCircle size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h2 className="mb-2 text-xl text-foreground">No messages yet</h2>
              <p className="text-muted-foreground">
                Join activities to start chatting with others
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {recentChats.map((chat) => (
              <button
                key={chat.activityId}
                onClick={() => onOpenChat(chat.activityId, chat.activityName, chat.spotName)}
                className="flex w-full items-center gap-4 p-4 text-left transition-all hover:bg-muted/50 active:bg-muted"
              >
                {/* Activity Photo */}
                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl">
                  <ImageWithFallback
                    src={chat.photo}
                    alt={chat.activityName}
                    className="h-full w-full object-cover"
                  />
                  {chat.unreadCount > 0 && (
                    <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                      {chat.unreadCount}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className={`mb-0.5 truncate ${chat.unreadCount > 0 ? 'text-foreground font-semibold' : 'text-foreground'}`}>
                    {chat.activityName}
                  </h3>
                  <p className="mb-1 text-xs text-muted-foreground truncate">{chat.spotName}</p>
                  <p className={`text-sm truncate ${chat.unreadCount > 0 ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {chat.lastMessage}
                  </p>
                </div>

                {/* Time */}
                <div className="flex-shrink-0 text-xs text-muted-foreground">
                  {chat.time}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}