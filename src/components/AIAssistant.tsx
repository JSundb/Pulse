import { useState } from 'react';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';

type Props = {
  onBack: () => void;
};

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export default function AIAssistant({ onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Roamy AI. I can help you discover activities, find hidden spots, plan your day, and answer questions about places. What would you like to do?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'd be happy to help! This is a demo response. In the full version, I'll provide personalized recommendations based on your preferences, current location, and what's happening around you.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);

    setInputText('');
  };

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-gradient-to-r from-teal-500 to-blue-500 px-4 py-4">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all hover:bg-white/30"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg text-white">Roamy AI</h1>
            <p className="text-xs text-white/80">Your personal assistant</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-br from-teal-500 to-blue-500 text-white'
                  : 'border border-border bg-card text-foreground'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions (only show initially) */}
      {messages.length === 1 && (
        <div className="border-t border-border bg-card px-4 py-3">
          <p className="mb-2 text-xs text-muted-foreground">Try asking:</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setInputText("What's good for coffee nearby?")}
              className="flex-shrink-0 rounded-full border border-border bg-background px-4 py-2 text-xs text-foreground transition-all hover:bg-secondary"
            >
              Coffee spots nearby
            </button>
            <button
              onClick={() => setInputText("What should I do this weekend?")}
              className="flex-shrink-0 rounded-full border border-border bg-background px-4 py-2 text-xs text-foreground transition-all hover:bg-secondary"
            >
              Weekend plans
            </button>
            <button
              onClick={() => setInputText("Hidden gems in my area")}
              className="flex-shrink-0 rounded-full border border-border bg-background px-4 py-2 text-xs text-foreground transition-all hover:bg-secondary"
            >
              Hidden gems
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 rounded-full border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-blue-500 text-white transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
