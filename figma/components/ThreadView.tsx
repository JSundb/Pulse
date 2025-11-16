import { useState } from 'react';
import { ArrowLeft, ArrowUp, ArrowDown, MessageSquare, Image as ImageIcon, BookOpen, Lightbulb, Users, HelpCircle, TrendingUp } from 'lucide-react';
import type { Thread, Post } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Props = {
  thread: Thread;
  activityName: string;
  onBack: () => void;
  onAddPost: (post: Post) => void;
  onUpvotePost: (postId: string) => void;
  onUpvoteThread: () => void;
};

export default function ThreadView({ thread, activityName, onBack, onAddPost, onUpvotePost, onUpvoteThread }: Props) {
  const [replyText, setReplyText] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [threadUpvoted, setThreadUpvoted] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [showImagePicker, setShowImagePicker] = useState(false);

  // Thread type config
  const threadTypeConfig = {
    story: { label: 'Story', icon: BookOpen, color: 'bg-purple-100', textColor: 'text-purple-700' },
    tip: { label: 'Tip', icon: Lightbulb, color: 'bg-yellow-100', textColor: 'text-yellow-700' },
    plan: { label: 'Plan', icon: Users, color: 'bg-blue-100', textColor: 'text-blue-700' },
    question: { label: 'Question', icon: HelpCircle, color: 'bg-green-100', textColor: 'text-green-700' },
    media: { label: 'Media', icon: ImageIcon, color: 'bg-red-100', textColor: 'text-red-700' },
  };

  const config = threadTypeConfig[thread.threadType];
  const TypeIcon = config.icon;

  const handleSubmit = () => {
    if (replyText.trim()) {
      const newPost: Post = {
        id: Date.now().toString(),
        author: 'You',
        content: replyText.trim(),
        timestamp: 'Just now',
        upvotes: 0,
        replies: [],
      };
      onAddPost(newPost);
      setReplyText('');
      setReplyingToId(null);
    }
  };

  const handleThreadUpvote = () => {
    if (!threadUpvoted) {
      onUpvoteThread();
      setThreadUpvoted(true);
    }
  };

  // Recursive component for rendering nested comments
  const CommentThread = ({ post, level = 0 }: { post: Post; level?: number }) => {
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [upvoted, setUpvoted] = useState(false);

    const handleReply = () => {
      if (replyContent.trim()) {
        const newReply: Post = {
          id: Date.now().toString() + Math.random(),
          author: 'You',
          content: replyContent.trim(),
          timestamp: 'Just now',
          upvotes: 0,
          replies: [],
        };
        
        // Add reply to this post
        if (!post.replies) {
          post.replies = [];
        }
        post.replies.push(newReply);
        setReplyContent('');
        setShowReplyInput(false);
      }
    };

    return (
      <div className={`${level > 0 ? 'ml-6 border-l-2 border-gray-200 pl-4' : ''}`}>
        <div className="rounded-xl bg-white p-4 shadow-sm mb-3">
          {/* Author and timestamp */}
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-xs text-white">
              {post.author.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">{post.author}</p>
              <p className="text-xs text-gray-500">{post.timestamp}</p>
            </div>
          </div>

          {/* Content */}
          <p className="mb-3 text-sm text-gray-700 leading-relaxed">
            {post.content}
          </p>

          {/* Media attachments */}
          {post.media && post.media.length > 0 && (
            <div className="mb-3 grid grid-cols-2 gap-2">
              {post.media.map((media, idx) => (
                <div key={idx} className="relative aspect-video overflow-hidden rounded-lg bg-gray-100">
                  <ImageWithFallback
                    src={media.url}
                    alt="Post media"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
                    <ArrowUp size={12} />
                    <span>{media.upvotes}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (!upvoted) {
                  onUpvotePost(post.id);
                  setUpvoted(true);
                }
              }}
              className={`flex items-center gap-1 rounded-lg px-2 py-1 text-sm transition-colors ${
                upvoted
                  ? 'bg-blue-100 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <ArrowUp size={16} />
              <span>{post.upvotes}</span>
            </button>
            
            <button
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm text-gray-600 transition-colors hover:bg-gray-100"
            >
              <MessageSquare size={16} />
              <span>Reply</span>
            </button>

            {post.replies && post.replies.length > 0 && (
              <span className="text-xs text-gray-500">
                {post.replies.length} {post.replies.length === 1 ? 'reply' : 'replies'}
              </span>
            )}
          </div>

          {/* Reply input */}
          {showReplyInput && (
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleReply();
                  }
                }}
              />
              <button
                onClick={handleReply}
                disabled={!replyContent.trim()}
                className={`rounded-lg px-4 py-2 text-sm ${
                  replyContent.trim()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Post
              </button>
            </div>
          )}
        </div>

        {/* Nested replies */}
        {post.replies && post.replies.length > 0 && (
          <div className="space-y-3">
            {post.replies.map((reply) => (
              <CommentThread key={reply.id} post={reply} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

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
            Back to Threads
          </button>
          <p className="mb-1 text-xs text-gray-500">{activityName}</p>
          
          {/* Thread type badge */}
          <span className={`mb-2 inline-flex items-center gap-1 rounded-full ${config.color} px-3 py-1 text-xs ${config.textColor}`}>
            <TypeIcon size={12} />
            {config.label}
          </span>
          
          <h1 className="text-xl text-gray-900 mb-3">{thread.title}</h1>
          
          {/* Engagement bar */}
          <div className="flex items-center gap-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 p-3">
            <div className="flex items-center gap-1 text-sm">
              <ArrowUp size={16} className="text-blue-600" />
              <span className="text-gray-900">{thread.upvotes}</span>
              <span className="text-gray-500">upvotes</span>
            </div>
            <div className="h-4 w-px bg-gray-300" />
            <div className="flex items-center gap-1 text-sm">
              <MessageSquare size={16} className="text-purple-600" />
              <span className="text-gray-900">{thread.replies}</span>
              <span className="text-gray-500">replies</span>
            </div>
            <div className="h-4 w-px bg-gray-300" />
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp size={16} className="text-green-600" />
              <span className="text-gray-500">Trending</span>
            </div>
          </div>
        </div>
      </div>

      {/* Thread Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Main Post */}
        <div className="border-b border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-start gap-4">
            {/* Upvote section */}
            <div className="flex flex-col items-center">
              <button
                onClick={handleThreadUpvote}
                className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
                  threadUpvoted
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-400 hover:bg-gray-100 hover:text-blue-600'
                }`}
              >
                <ArrowUp size={20} />
              </button>
              <span className="mt-1 text-sm text-gray-600">{thread.upvotes}</span>
              <button className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-600">
                <ArrowDown size={20} />
              </button>
            </div>

            {/* Post content */}
            <div className="flex-1">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-xs text-white">
                  {thread.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm text-gray-900">{thread.author}</p>
                  <p className="text-xs text-gray-500">{thread.timestamp}</p>
                </div>
              </div>

              <p className="mb-4 text-sm text-gray-700 leading-relaxed">
                {thread.preview}
              </p>

              {/* Thread media */}
              {thread.media && thread.media.length > 0 && (
                <div className="mb-4 grid grid-cols-2 gap-3">
                  {thread.media.map((media, idx) => (
                    <div key={idx} className="relative aspect-video overflow-hidden rounded-xl bg-gray-100">
                      <ImageWithFallback
                        src={media.url}
                        alt="Thread media"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
                        <ArrowUp size={12} />
                        <span>{media.upvotes}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="p-6">
          <h2 className="mb-4 text-sm text-gray-600">
            {thread.replies} {thread.replies === 1 ? 'Comment' : 'Comments'}
          </h2>

          <div className="space-y-4">
            {thread.posts.map((post) => (
              <CommentThread key={post.id} post={post} level={0} />
            ))}
          </div>

          {/* Empty state */}
          {thread.posts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 text-5xl">💬</div>
              <p className="text-gray-600">No comments yet</p>
              <p className="text-sm text-gray-500">Be the first to comment</p>
            </div>
          )}
        </div>
      </div>

      {/* Reply Input - Fixed at bottom */}
      <div className="border-t border-gray-200 bg-white/95 p-4 backdrop-blur-lg">
        <div className="flex items-end gap-3">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Add a comment..."
            rows={2}
            className="flex-1 resize-none rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={!replyText.trim()}
            className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-all ${
              replyText.trim()
                ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <MessageSquare size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}