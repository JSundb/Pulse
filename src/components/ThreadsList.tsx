import { useState } from 'react';
import { ArrowLeft, MessageSquare, Plus, ArrowUp, Image, Users, Lightbulb, HelpCircle, BookOpen } from 'lucide-react';
import type { Thread, Activity } from '../App';
import ThreadView from './ThreadView';
import CreateThread from './CreateThread';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Props = {
  activity: Activity;
  onBack: () => void;
  onAddThread: (thread: Thread) => void;
};

type SortMode = 'top' | 'new' | 'media' | 'plans';

// Thread type badge config
const threadTypeConfig = {
  story: { label: 'Story', icon: BookOpen, color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-100', textColor: 'text-purple-700' },
  tip: { label: 'Tip', icon: Lightbulb, color: 'from-yellow-500 to-orange-500', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700' },
  plan: { label: 'Plan', icon: Users, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
  question: { label: 'Question', icon: HelpCircle, color: 'from-green-500 to-teal-500', bgColor: 'bg-green-100', textColor: 'text-green-700' },
  media: { label: 'Media', icon: Image, color: 'from-red-500 to-rose-500', bgColor: 'bg-red-100', textColor: 'text-red-700' },
};

export default function ThreadsList({ activity, onBack, onAddThread }: Props) {
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [showCreateThread, setShowCreateThread] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>('top');

  // Sort and filter threads based on selected mode
  const sortedThreads = [...activity.threads]
    .filter(thread => {
      if (sortMode === 'plans') return thread.threadType === 'plan';
      if (sortMode === 'media') return (thread.media?.length || 0) > 0 || thread.posts.some(p => (p.media?.length || 0) > 0);
      return true;
    })
    .sort((a, b) => {
      if (sortMode === 'top') {
        return b.upvotes - a.upvotes;
      } else if (sortMode === 'new') {
        return parseInt(b.id) - parseInt(a.id);
      }
      return 0;
    });

  // If viewing a specific thread
  if (selectedThread) {
    return (
      <ThreadView
        thread={selectedThread}
        activityName={activity.title}
        onBack={() => setSelectedThread(null)}
        onAddPost={(post) => {
          const updatedThread = {
            ...selectedThread,
            posts: [...selectedThread.posts, post],
            replies: selectedThread.replies + 1,
          };
          setSelectedThread(updatedThread);
        }}
        onUpvotePost={(postId) => {
          const updatedPosts = selectedThread.posts.map(p => 
            p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p
          );
          setSelectedThread({ ...selectedThread, posts: updatedPosts });
        }}
        onUpvoteThread={() => {
          setSelectedThread({ ...selectedThread, upvotes: selectedThread.upvotes + 1 });
        }}
      />
    );
  }

  // If creating a new thread
  if (showCreateThread) {
    return (
      <CreateThread
        activityName={activity.title}
        onBack={() => setShowCreateThread(false)}
        onCreate={(thread) => {
          onAddThread(thread);
          setShowCreateThread(false);
        }}
      />
    );
  }

  // Main threads list view
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
            Back to Activity
          </button>
          <p className="mb-1 text-sm text-gray-600">{activity.title}</p>
          <h1 className="text-3xl text-gray-900 mb-1">Activity Community</h1>
          <p className="text-sm text-gray-500">Stories, Tips, Plans and Questions</p>
        </div>

        {/* Sorting Tabs */}
        <div className="flex gap-1 px-6 pb-3">
          <button
            onClick={() => setSortMode('top')}
            className={`flex-1 rounded-xl px-4 py-2 text-sm transition-all ${
              sortMode === 'top'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Top
          </button>
          <button
            onClick={() => setSortMode('new')}
            className={`flex-1 rounded-xl px-4 py-2 text-sm transition-all ${
              sortMode === 'new'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            New
          </button>
          <button
            onClick={() => setSortMode('media')}
            className={`flex-1 rounded-xl px-4 py-2 text-sm transition-all ${
              sortMode === 'media'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Media
          </button>
          <button
            onClick={() => setSortMode('plans')}
            className={`flex-1 rounded-xl px-4 py-2 text-sm transition-all ${
              sortMode === 'plans'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Plans
          </button>
        </div>
      </div>

      {/* Create New Thread Button */}
      <div className="border-b border-gray-200 bg-white/95 p-4 backdrop-blur-lg">
        <button
          onClick={() => setShowCreateThread(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-white shadow-lg transition-all hover:bg-blue-700 active:scale-95"
        >
          <Plus size={20} />
          Start New Thread
        </button>
      </div>

      {/* Threads List */}
      <div className="flex-1 overflow-y-auto p-6">
        {sortedThreads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 text-6xl">💬</div>
            <h2 className="mb-2 text-xl text-gray-900">
              {sortMode === 'plans' ? 'No plans yet' : sortMode === 'media' ? 'No media posts yet' : 'No threads yet'}
            </h2>
            <p className="mb-6 text-gray-600">
              Be the first to start a conversation about this activity
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedThreads.map((thread) => {
              const config = threadTypeConfig[thread.threadType];
              const Icon = config.icon;
              const previewMedia = thread.media?.slice(0, 3) || [];
              
              return (
                <button
                  key={thread.id}
                  onClick={() => setSelectedThread(thread)}
                  className="w-full rounded-2xl bg-white p-5 shadow-md transition-all hover:shadow-xl active:scale-98 text-left"
                >
                  {/* Thread type badge */}
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <span className={`inline-flex items-center gap-1 rounded-full ${config.bgColor} px-3 py-1 text-xs ${config.textColor}`}>
                      <Icon size={12} />
                      {config.label}
                    </span>
                    
                    {/* Author avatar */}
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-xs text-white">
                        {thread.author.charAt(0)}
                      </div>
                      <span className="text-xs text-gray-500">{thread.timestamp}</span>
                    </div>
                  </div>

                  {/* Thread content */}
                  <div className="mb-3 flex items-start gap-3">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400">
                        <ArrowUp size={16} />
                      </div>
                      <span className="text-xs text-gray-600">{thread.upvotes}</span>
                    </div>
                    
                    <div className="flex-1">
                      {/* Title */}
                      <h3 className="mb-2 text-base text-gray-900">{thread.title}</h3>
                      
                      {/* Preview text */}
                      <p className="mb-3 text-sm text-gray-600 line-clamp-2">
                        {thread.preview}
                      </p>

                      {/* Preview images */}
                      {previewMedia.length > 0 && (
                        <div className="mb-3 flex gap-2">
                          {previewMedia.map((media, idx) => (
                            <div key={idx} className="relative h-20 w-20 overflow-hidden rounded-lg bg-gray-100">
                              <ImageWithFallback
                                src={media.url}
                                alt="Preview"
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ))}
                          {(thread.media?.length || 0) > 3 && (
                            <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-600">
                              +{(thread.media?.length || 0) - 3}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Metadata */}
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <MessageSquare size={14} />
                          <span>{thread.replies} replies</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}