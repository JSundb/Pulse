import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { api } from '../services/api';
import type { ChatPreview } from '../types';

type Props = {
  onOpenChat: (activityId: string, activityName: string, spotName: string) => void;
};

export default function MessagesTab({ onOpenChat }: Props) {
  const [recentChats, setRecentChats] = useState<ChatPreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getMessages().then(data => {
      setRecentChats(data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading messages...</div>
      </div>
    );
  }


  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-5 py-4">
        <h1 className="text-3xl text-gray-900">Messages</h1>
        <p className="mt-1 text-sm text-gray-600">Activity chats</p>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {recentChats.length === 0 ? (
          <div className="flex h-full items-center justify-center p-8 text-center">
            <div>
              <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
              <h2 className="mb-2 text-xl text-gray-900">No messages yet</h2>
              <p className="text-gray-600">
                Join activities to start chatting with others
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentChats.map((chat) => (
              <button
                key={chat.activityId}
                onClick={() => onOpenChat(chat.activityId, chat.activityName, chat.spotName)}
                className="flex w-full items-center gap-4 p-4 text-left transition-all hover:bg-gray-50 active:bg-gray-100"
              >
                {/* Activity Photo */}
                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl">
                  <ImageWithFallback
                    src={chat.photo}
                    alt={chat.activityName}
                    className="h-full w-full object-cover"
                  />
                  {chat.unreadCount > 0 && (
                    <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                      {chat.unreadCount}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className={`mb-0.5 truncate ${chat.unreadCount > 0 ? 'text-gray-900' : 'text-gray-900'}`}>
                    {chat.activityName}
                  </h3>
                  <p className="mb-1 text-xs text-gray-500 truncate">{chat.spotName}</p>
                  <p className={`text-sm truncate ${chat.unreadCount > 0 ? 'text-gray-900' : 'text-gray-600'}`}>
                    {chat.lastMessage}
                  </p>
                </div>

                {/* Time */}
                <div className="flex-shrink-0 text-xs text-gray-500">
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
