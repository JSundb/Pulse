import { X, Send, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

type Props = {
  activityTitle: string;
  onClose: () => void;
  onRecommendPack?: (packId: string) => void;
};

export default function RoamyAIChat({ activityTitle, onClose, onRecommendPack }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi! I'm Roamy, your AI assistant. I can help you with information about ${activityTitle}, recommend items and services, or answer any questions about weather, crowds, safety, and gear. What would you like to know?`,
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('weather') || lowerQuery.includes('temperature')) {
      return "The weather looks great! It's currently 18°C with clear skies. Sunset is at 6:42 PM, which is perfect for evening activities. I'd recommend bringing a light jacket as it will cool down after sunset.";
    }
    
    if (lowerQuery.includes('crowd') || lowerQuery.includes('busy')) {
      return "Based on current data, this spot is moderately busy right now. Peak hours are typically 5-7 PM on weekdays. Mornings before 10 AM are the quietest if you prefer fewer people.";
    }
    
    if (lowerQuery.includes('gear') || lowerQuery.includes('bring') || lowerQuery.includes('need')) {
      return "For this activity, I recommend: comfortable walking shoes, water bottle, sunscreen, and a camera for the views. If you're planning to stay for sunset, bring a light jacket. Need equipment? Check out our rental options above!";
    }
    
    if (lowerQuery.includes('food') || lowerQuery.includes('drink') || lowerQuery.includes('snack')) {
      return "Great question! I recommend the Sunset Energy Pack (€12.50) - it includes 2 coffees, 2 croissants, and an energy bar. It's popular among visitors doing this activity. Would you like me to help you order it?";
    }
    
    if (lowerQuery.includes('photo') || lowerQuery.includes('picture')) {
      return "This is an excellent spot for photography! The best light is during golden hour (about 1 hour before sunset). Consider booking our Professional Photography Guide (€20/hr) if you want expert tips on composition and settings.";
    }
    
    if (lowerQuery.includes('time') || lowerQuery.includes('when')) {
      return "The best time to visit depends on your preference! Mornings (8-10 AM) are quiet and perfect for relaxation. Evenings (5-7 PM) offer beautiful sunset views but can be crowded. Right now is actually a great time with moderate crowd levels.";
    }
    
    return "That's a great question! Based on your interests and current conditions, I'd recommend checking out the enhancement options above. Is there anything specific about the activity, weather, safety, or available services you'd like to know more about?";
  };

  const quickQuestions = [
    "What's the weather like?",
    "How crowded is it now?",
    "What should I bring?",
    "Best time to visit?",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative flex h-[85vh] w-full flex-col rounded-t-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg text-gray-900">Roamy AI</h2>
              <p className="text-xs text-gray-600">Your activity assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Questions (only show initially) */}
          {messages.length === 1 && (
            <div className="mt-6">
              <p className="mb-3 text-sm text-gray-600">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputValue(q);
                    }}
                    className="rounded-full border-2 border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about weather, crowds, gear, or anything..."
              className="flex-1 rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-500 outline-none focus:border-blue-600"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className={`flex items-center justify-center rounded-2xl px-6 transition-all ${
                inputValue.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
