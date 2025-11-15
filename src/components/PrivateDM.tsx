import { useState } from 'react';
import { ArrowLeft, Send, Image as ImageIcon } from 'lucide-react';

type ChatMessage = {
  id: string;
  senderId: string;
  message: string;
  timestamp: string;
  image?: string;
};

type Props = {
  otherUserId: string;
  otherUserName: string;
  otherUserAvatar: string;
  onClose: () => void;
};

export default function PrivateDM({ otherUserId, otherUserName, otherUserAvatar, onClose }: Props) {
  const [message, setMessage] = useState('');
  
  // Mock messages - in real app would come from backend
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      senderId: otherUserId,
      message: 'Hey! I saw you were interested in the same activities',
      timestamp: '2:30 PM',
    },
    {
      id: '2',
      senderId: 'current-user',
      message: 'Yes! I love hiking and photography',
      timestamp: '2:35 PM',
    },
    {
      id: '3',
      senderId: otherUserId,
      message: 'Same here! Want to meet up this weekend?',
      timestamp: '2:37 PM',
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'current-user',
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  return (
    <div className="flex h-full w-full flex-col bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-600 hover:bg-gray-100 active:scale-95"
          >
            <ArrowLeft size={20} />
          </button>
          
          <img
            src={otherUserAvatar}
            alt={otherUserName}
            className="h-10 w-10 rounded-full bg-gray-200"
          />
          
          <div className="flex-1">
            <h2 className="text-gray-900">{otherUserName}</h2>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((msg) => {
            const isCurrentUser = msg.senderId === 'current-user';
            
            return (
              <div key={msg.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
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
