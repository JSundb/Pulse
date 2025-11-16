import { useState } from 'react';
import { ArrowLeft, Send, MapPin } from 'lucide-react';

type ChatMessage = {
  id: string;
  author: string;
  content: string;
  timestamp: string;
};

type Props = {
  activityName: string;
  isUserAtLocation: boolean;
  onBack: () => void;
};

export default function LocationChat({ activityName, isUserAtLocation, onBack }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', author: 'Sarah K.', content: 'Anyone here now? I\'m at the corner table!', timestamp: '2 min ago' },
    { id: '2', author: 'Mike R.', content: 'Just arrived, getting coffee ☕', timestamp: '5 min ago' },
    { id: '3', author: 'Emma L.', content: 'Great vibe today!', timestamp: '12 min ago' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        author: 'You',
        content: inputText.trim(),
        timestamp: 'Just now',
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  // If user is not at location, show locked state
  if (!isUserAtLocation) {
    return (
      <div className="flex h-full flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white/95 backdrop-blur-lg">
          <div className="px-6 pt-6 pb-4">
            <button
              onClick={onBack}
              className="mb-3 flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <h1 className="text-2xl text-gray-900">Live Chat</h1>
            <p className="text-sm text-gray-500">{activityName}</p>
          </div>
        </div>

        {/* Locked State */}
        <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200">
            <MapPin size={40} className="text-gray-400" />
          </div>
          <h2 className="mb-2 text-xl text-gray-900">Location Required</h2>
          <p className="mb-6 text-gray-600">
            Live chat becomes available when you're at this activity.
          </p>
          <button
            onClick={onBack}
            className="rounded-2xl bg-blue-600 px-6 py-3 text-white shadow-lg transition-all hover:bg-blue-700 active:scale-95"
          >
            Got it
          </button>
        </div>
      </div>
    );
  }

  // Active chat when user is at location
  return (
    <div className="flex h-full flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header with active banner */}
      <div className="border-b border-gray-200 bg-white/95 backdrop-blur-lg">
        <div className="bg-green-500 px-6 py-2">
          <div className="flex items-center justify-center gap-2 text-sm text-white">
            <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
            <span>Live Chat — People currently here</span>
          </div>
        </div>
        <div className="px-6 pt-4 pb-4">
          <button
            onClick={onBack}
            className="mb-2 flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <h1 className="text-xl text-gray-900">{activityName}</h1>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.author === 'You' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.author === 'You'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-900 shadow-sm'
                }`}
              >
                {message.author !== 'You' && (
                  <p className="mb-1 text-xs opacity-70">{message.author}</p>
                )}
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`mt-1 text-xs ${message.author === 'You' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input - Fixed at bottom */}
      <div className="border-t border-gray-200 bg-white/95 p-4 backdrop-blur-lg">
        <div className="flex items-end gap-3">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Say hi to people here..."
            rows={2}
            className="flex-1 resize-none rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-all ${
              inputText.trim()
                ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
