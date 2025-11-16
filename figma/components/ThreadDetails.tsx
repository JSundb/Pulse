import { useState } from 'react';
import { ArrowLeft, ThumbsUp, MessageCircle, Send } from 'lucide-react';

type Reply = {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  upvotes: number;
};

type Props = {
  threadId: string;
  onBack: () => void;
};

export default function ThreadDetails({ threadId, onBack }: Props) {
  const [replyText, setReplyText] = useState('');

  // Mock thread data
  const thread = {
    id: threadId,
    title: 'Best time to visit?',
    author: 'Sarah M.',
    authorAvatar: 'https://i.pravatar.cc/150?u=sarah',
    content: 'Planning to go next week, wondering when it\'s least crowded. Does anyone have recommendations for the best time of day? I\'d love to avoid the rush and get some good photos!',
    timestamp: '2h ago',
    upvotes: 12,
    threadType: 'question',
  };

  const [replies, setReplies] = useState<Reply[]>([
    {
      id: '1',
      author: 'Mike J.',
      authorAvatar: 'https://i.pravatar.cc/150?u=mike',
      content: 'Early morning around 7-8 AM is perfect! Much fewer people and the lighting is great for photos.',
      timestamp: '1h ago',
      upvotes: 8,
    },
    {
      id: '2',
      author: 'Emma L.',
      authorAvatar: 'https://i.pravatar.cc/150?u=emma',
      content: 'I went on a weekday afternoon and it was super quiet. Definitely recommend avoiding weekends!',
      timestamp: '45min ago',
      upvotes: 5,
    },
  ]);

  const handlePostReply = () => {
    if (!replyText.trim()) return;

    const newReply: Reply = {
      id: Date.now().toString(),
      author: 'You',
      authorAvatar: 'https://i.pravatar.cc/150?u=currentuser',
      content: replyText.trim(),
      timestamp: 'Just now',
      upvotes: 0,
    };

    setReplies([...replies, newReply]);
    setReplyText('');
  };

  const getThreadTypeBadge = (type: string) => {
    switch (type) {
      case 'question':
        return { label: 'Question', color: 'bg-amber-100 text-amber-700' };
      case 'tip':
        return { label: 'Tip', color: 'bg-blue-100 text-blue-700' };
      case 'story':
        return { label: 'Story', color: 'bg-purple-100 text-purple-700' };
      case 'plan':
        return { label: 'Plan', color: 'bg-green-100 text-green-700' };
      default:
        return { label: 'Thread', color: 'bg-gray-100 text-gray-700' };
    }
  };

  const badge = getThreadTypeBadge(thread.threadType);

  return (
    <div className="flex h-full flex-col bg-white pb-20">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-5 py-4">
        <button
          onClick={onBack}
          className="mb-3 flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl text-gray-900">Thread</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Original Post */}
        <div className="border-b border-gray-100 bg-white p-5">
          <div className="mb-3 flex items-start gap-3">
            <img
              src={thread.authorAvatar}
              alt={thread.author}
              className="h-12 w-12 rounded-full"
            />
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs ${badge.color}`}>
                  {badge.label}
                </span>
                <span className="text-xs text-gray-500">{thread.timestamp}</span>
              </div>
              <h2 className="mb-1 text-xl text-gray-900">{thread.title}</h2>
              <p className="text-sm text-gray-600">by {thread.author}</p>
            </div>
          </div>

          <p className="mb-4 text-gray-700">{thread.content}</p>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm text-gray-600 transition-colors hover:text-blue-600">
              <ThumbsUp size={16} />
              <span>{thread.upvotes}</span>
            </button>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MessageCircle size={16} />
              <span>{replies.length} replies</span>
            </div>
          </div>
        </div>

        {/* Replies */}
        <div className="bg-gray-50">
          <div className="p-5">
            <h3 className="mb-4 text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Replies ({replies.length})
            </h3>
            <div className="space-y-4">
              {replies.map((reply) => (
                <div key={reply.id} className="rounded-2xl bg-white p-4">
                  <div className="mb-3 flex items-start gap-3">
                    <img
                      src={reply.authorAvatar}
                      alt={reply.author}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-gray-900">{reply.author}</span>
                        <span className="text-xs text-gray-500">{reply.timestamp}</span>
                      </div>
                      <p className="text-gray-700">{reply.content}</p>
                    </div>
                  </div>

                  <button className="flex items-center gap-1 text-sm text-gray-600 transition-colors hover:text-blue-600">
                    <ThumbsUp size={14} />
                    <span>{reply.upvotes}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reply Input */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handlePostReply()}
            placeholder="Write a reply..."
            className="flex-1 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
          />
          <button
            onClick={handlePostReply}
            disabled={!replyText.trim()}
            className="flex items-center justify-center rounded-2xl bg-blue-600 px-6 text-white transition-all hover:bg-blue-700 active:scale-95 disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}