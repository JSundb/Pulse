import { useState } from 'react';
import { ArrowLeft, Send, Image as ImageIcon } from 'lucide-react';
import type { Activity } from '../App';

type ChatMessage = {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  message: string;
  timestamp: string;
  image?: string;
};

type Props = {
  activity: Activity;
  onBack: () => void;
  onOpenActivity?: () => void;
};

export default function ActivityChat({ activity, onBack, onOpenActivity }: Props) {
  const [message, setMessage] = useState('');
  
  // Mock messages - in real app would come from backend
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Sarah Chen',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      message: 'Hey! Planning to go this weekend, anyone interested?',
      timestamp: '10:30 AM',
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Alex Martinez',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      message: 'I\'m down! What time were you thinking?',
      timestamp: '10:45 AM',
    },
    {
      id: '3',
      userId: 'user1',
      userName: 'Sarah Chen',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      message: 'Around 9 AM? The weather looks perfect ☀️',
      timestamp: '10:47 AM',
    },
    {
      id: '4',
      userId: 'user3',
      userName: 'Jordan Lee',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
      message: 'Can I join too? First time trying this!',
      timestamp: '11:02 AM',
    },
    {
      id: '5',
      userId: 'user2',
      userName: 'Alex Martinez',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      message: 'Of course! We can meet at the entrance',
      timestamp: '11:15 AM',
    },
  ]);

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

  return (
    <div className="flex h-full w-full flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="rounded-full p-2 text-muted-foreground hover:bg-muted active:scale-95"
          >
            <ArrowLeft size={20} />
          </button>
          
          <button
            onClick={onOpenActivity}
            className="flex-1 text-left transition-colors hover:opacity-80"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">{activity.category === 'Hiking' ? '🥾' : activity.category === 'Café' ? '☕' : '📍'}</span>
              <h2 className="text-foreground">{activity.title}</h2>
            </div>
            <p className="text-sm text-muted-foreground">Chat with people interested in this activity</p>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((msg) => {
            const isCurrentUser = msg.userId === 'current-user';
            
            return (
              <div key={msg.id} className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                <div className="flex-shrink-0">
                  <img
                    src={msg.userAvatar}
                    alt={msg.userName}
                    className="h-10 w-10 rounded-full bg-muted"
                  />
                </div>

                <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                  {!isCurrentUser && (
                    <span className="mb-1 px-3 text-xs text-muted-foreground">{msg.userName}</span>
                  )}
                  
                  <div
                    className={`max-w-[260px] rounded-2xl px-4 py-2 ${
                      isCurrentUser
                        ? 'bg-primary text-white'
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
          <button className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground active:scale-95">
            <ImageIcon size={20} />
          </button>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 rounded-full border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:border-primary focus:bg-card focus:outline-none"
          />

          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="rounded-full bg-primary p-2 text-white transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}