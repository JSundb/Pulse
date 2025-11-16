import { ArrowLeft, MessageSquare, ThumbsUp, Plus, MessageCircle } from 'lucide-react';
import type { Activity } from '../App';

type Thread = {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  preview: string;
  timestamp: string;
  upvotes: number;
  replies: number;
  threadType: 'question' | 'tip' | 'story' | 'plan';
};

type Props = {
  activity: Activity;
  onBack: () => void;
  onOpenThread: (threadId: string) => void;
  onCreateThread: () => void;
};

export default function ThreadsOverview({ activity, onBack, onOpenThread, onCreateThread }: Props) {
  // Mock threads
  const threads: Thread[] = [
    {
      id: '1',
      title: 'Best time to visit?',
      author: 'Sarah M.',
      authorAvatar: 'https://i.pravatar.cc/150?u=sarah',
      preview: 'Planning to go next week, wondering when it\'s least crowded...',
      timestamp: '2h ago',
      upvotes: 12,
      replies: 5,
      threadType: 'question',
    },
    {
      id: '2',
      title: 'Pro tip: Bring your own water',
      author: 'Mike J.',
      authorAvatar: 'https://i.pravatar.cc/150?u=mike',
      preview: 'There aren\'t many water fountains, so I recommend bringing at least...',
      timestamp: '5h ago',
      upvotes: 24,
      replies: 8,
      threadType: 'tip',
    },
    {
      id: '3',
      title: 'Amazing sunset experience!',
      author: 'Emma L.',
      authorAvatar: 'https://i.pravatar.cc/150?u=emma',
      preview: 'Went yesterday and the sunset views were absolutely incredible...',
      timestamp: '1d ago',
      upvotes: 31,
      replies: 12,
      threadType: 'story',
    },
    {
      id: '4',
      title: 'Looking for hiking buddies',
      author: 'Alex T.',
      authorAvatar: 'https://i.pravatar.cc/150?u=alex',
      preview: 'Planning to go this Saturday morning around 8 AM. Anyone want to join?',
      timestamp: '3h ago',
      upvotes: 8,
      replies: 15,
      threadType: 'plan',
    },
  ];

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
        <h1 className="mb-1 text-2xl text-gray-900">Threads</h1>
        <p className="text-sm text-gray-600">{activity.title}</p>
      </div>

      {/* Filter Chips */}
      <div className="border-b border-gray-100 bg-white px-5 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          <button className="flex-shrink-0 rounded-full bg-blue-600 px-4 py-1.5 text-sm text-white">
            All
          </button>
          <button className="flex-shrink-0 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
            Questions
          </button>
          <button className="flex-shrink-0 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
            Tips
          </button>
          <button className="flex-shrink-0 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
            Stories
          </button>
          <button className="flex-shrink-0 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
            Plans
          </button>
        </div>
      </div>

      {/* Threads List */}
      <div className="flex-1 overflow-y-auto">
        {threads.length === 0 ? (
          <div className="flex h-full items-center justify-center p-8 text-center">
            <div>
              <MessageSquare size={48} className="mx-auto mb-4 text-gray-400" />
              <h2 className="mb-2 text-xl text-gray-900">No threads yet</h2>
              <p className="text-gray-600">Be the first to start a discussion!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2 p-5">
            {threads.map((thread) => {
              const badge = getThreadTypeBadge(thread.threadType);
              
              return (
                <button
                  key={thread.id}
                  onClick={() => onOpenThread(thread.id)}
                  className="flex w-full flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 text-left transition-all hover:shadow-md active:scale-98"
                >
                  {/* Header */}
                  <div className="flex items-start gap-3">
                    <img
                      src={thread.authorAvatar}
                      alt={thread.author}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="mb-1 flex items-center gap-2">
                        <span className={`rounded-full px-2 py-0.5 text-xs ${badge.color}`}>
                          {badge.label}
                        </span>
                        <span className="text-xs text-gray-500">{thread.timestamp}</span>
                      </div>
                      <h3 className="mb-1 text-gray-900">{thread.title}</h3>
                      <p className="text-xs text-gray-600">by {thread.author}</p>
                    </div>
                  </div>

                  {/* Preview */}
                  <p className="text-sm text-gray-600 line-clamp-2">{thread.preview}</p>

                  {/* Stats */}
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={14} />
                      <span>{thread.upvotes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={14} />
                      <span>{thread.replies}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Create Thread Button - Fixed at bottom */}
      <div className="border-t border-gray-200 bg-white p-4">
        <button
          onClick={onCreateThread}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-white transition-all hover:bg-blue-700 active:scale-98"
        >
          <Plus size={20} />
          Start a new thread
        </button>
      </div>
    </div>
  );
}