import { useState, useEffect } from 'react';
import { ArrowLeft, Send, Image as ImageIcon } from 'lucide-react';
import { api } from '../services/api';
import type { Activity, ChatMessage } from '../types';

type Props = {
  activity: Activity;
  onBack: () => void;
};

export default function ActivityChat({ activity, onBack }: Props) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getActivityMessages(activity.id).then(data => {
      setMessages(data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [activity.id]);

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      const newMessage = await api.sendMessage(activity.id, message.trim());
      setMessages([...messages, newMessage]);
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="rounded-full p-2 text-gray-600 hover:bg-gray-100 active:scale-95"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm">{activity.category === 'Hiking' ? '🥾' : activity.category === 'Café' ? '☕' : '📍'}</span>
              <h2 className="text-gray-900">{activity.title}</h2>
            </div>
            <p className="text-sm text-gray-500">Chat with people interested in this activity</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((msg) => {
            const isCurrentUser = msg.userId === 'current-user' || msg.userName === 'You';
            
            return (
              <div key={msg.id} className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                <div className="flex-shrink-0">
                  <img
                    src={msg.userAvatar}
                    alt={msg.userName}
                    className="h-10 w-10 rounded-full bg-gray-200"
                  />
                </div>

                <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                  {!isCurrentUser && (
                    <span className="mb-1 px-3 text-xs text-gray-600">{msg.userName}</span>
                  )}
                  
                  <div
                    className={`max-w-[260px] rounded-2xl px-4 py-2 ${
                      isCurrentUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                  
                  <span className="mt-1 px-3 text-xs text-gray-400">{msg.timestamp}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex items-center gap-3">
          <button className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 active:scale-95">
            <ImageIcon size={20} />
          </button>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none"
          />

          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="rounded-full bg-blue-600 p-2 text-white transition-all hover:bg-blue-700 active:scale-95 disabled:bg-gray-300"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}