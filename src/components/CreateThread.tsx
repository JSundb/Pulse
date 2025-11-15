import { useState } from 'react';
import { ArrowLeft, Image, X, BookOpen, Lightbulb, Users, HelpCircle, Image as ImageIcon } from 'lucide-react';
import type { Thread, ThreadMedia } from '../App';

type Props = {
  activityName: string;
  onBack: () => void;
  onCreate: (thread: Thread) => void;
};

type ThreadType = 'story' | 'tip' | 'plan' | 'question' | 'media';

const threadTypes: { type: ThreadType; label: string; icon: any; description: string; color: string }[] = [
  { type: 'story', label: 'Story', icon: BookOpen, description: 'Share an experience', color: 'from-purple-500 to-pink-500' },
  { type: 'tip', label: 'Tip', icon: Lightbulb, description: 'Give helpful advice', color: 'from-yellow-500 to-orange-500' },
  { type: 'plan', label: 'Plan', icon: Users, description: 'Organize a meetup', color: 'from-blue-500 to-cyan-500' },
  { type: 'question', label: 'Question', icon: HelpCircle, description: 'Ask for help', color: 'from-green-500 to-teal-500' },
  { type: 'media', label: 'Media', icon: ImageIcon, description: 'Share photos/videos', color: 'from-red-500 to-rose-500' },
];

export default function CreateThread({ activityName, onBack, onCreate }: Props) {
  const [selectedType, setSelectedType] = useState<ThreadType | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageSearchQuery, setImageSearchQuery] = useState('');

  const handleAddImage = async () => {
    if (imageSearchQuery.trim()) {
      const placeholderUrl = `https://images.unsplash.com/photo-${Date.now()}?w=400`;
      setMediaUrls([...mediaUrls, placeholderUrl]);
      setImageSearchQuery('');
      setShowImageInput(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setMediaUrls(mediaUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (selectedType && title.trim() && content.trim()) {
      const threadMedia: ThreadMedia[] = mediaUrls.map(url => ({
        url,
        type: 'image' as const,
        upvotes: 0,
        threadId: Date.now().toString(),
      }));

      const newThread: Thread = {
        id: Date.now().toString(),
        title: title.trim(),
        preview: content.trim().substring(0, 100) + (content.length > 100 ? '...' : ''),
        author: 'You',
        timestamp: 'Just now',
        replies: 0,
        upvotes: 0,
        threadType: selectedType,
        posts: [
          {
            id: Date.now().toString(),
            author: 'You',
            content: content.trim(),
            timestamp: 'Just now',
            upvotes: 0,
            replies: [],
            media: threadMedia.length > 0 ? threadMedia : undefined,
          },
        ],
        media: threadMedia.length > 0 ? threadMedia : undefined,
      };
      onCreate(newThread);
    }
  };

  // Step 1: Thread type selection
  if (!selectedType) {
    return (
      <div className="flex h-full flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="border-b border-gray-200 bg-white/95 backdrop-blur-lg">
          <div className="px-6 pt-6 pb-4">
            <button
              onClick={onBack}
              className="mb-3 flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <p className="mb-1 text-xs text-gray-500">{activityName}</p>
            <h1 className="text-3xl text-gray-900">Choose Thread Type</h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {threadTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.type}
                  onClick={() => setSelectedType(type.type)}
                  className="w-full rounded-2xl bg-white p-5 shadow-md transition-all hover:shadow-xl active:scale-98 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${type.color} shadow-lg`}>
                      <Icon size={28} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 text-lg text-gray-900">{type.label}</h3>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Thread creation form
  const selectedTypeConfig = threadTypes.find(t => t.type === selectedType)!;
  const Icon = selectedTypeConfig.icon;

  return (
    <div className="flex h-full flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/95 backdrop-blur-lg">
        <div className="px-6 pt-6 pb-4">
          <button
            onClick={() => setSelectedType(null)}
            className="mb-3 flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft size={16} />
            Change Type
          </button>
          <p className="mb-2 text-xs text-gray-500">{activityName}</p>
          
          {/* Selected type badge */}
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white border-2 border-gray-200 px-4 py-2 shadow-sm">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${selectedTypeConfig.color}`}>
              <Icon size={16} className="text-white" />
            </div>
            <span className="text-sm text-gray-700">{selectedTypeConfig.label}</span>
          </div>
          
          <h1 className="text-2xl text-gray-900">Create {selectedTypeConfig.label}</h1>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-5">
          {/* Thread Title */}
          <div>
            <label className="mb-2 block text-sm text-gray-700">
              {selectedType === 'question' ? 'Your Question' : 'Title'}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                selectedType === 'question' ? 'e.g., Best time to visit?' :
                selectedType === 'tip' ? 'e.g., Pro tip for first-timers' :
                selectedType === 'plan' ? 'e.g., Coffee meetup this Saturday' :
                'Give your post a title...'
              }
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none"
              maxLength={100}
            />
          </div>

          {/* Body Content */}
          <div>
            <label className="mb-2 block text-sm text-gray-700">
              {selectedType === 'plan' ? 'Plan Details' : 'Description'}
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={
                selectedType === 'story' ? 'Share your experience...' :
                selectedType === 'tip' ? 'Share your helpful advice...' :
                selectedType === 'plan' ? 'When and where? Who should join?' :
                selectedType === 'question' ? 'Add more details...' :
                'Describe your content...'
              }
              rows={8}
              className="w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Media Section */}
          <div>
            <label className="mb-2 block text-sm text-gray-700">
              Images / Videos {selectedType === 'media' ? '(Required)' : '(Optional)'}
            </label>
            
            {/* Media Grid */}
            {mediaUrls.length > 0 && (
              <div className="mb-3 grid grid-cols-2 gap-3">
                {mediaUrls.map((url, index) => (
                  <div key={index} className="relative aspect-video overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={url}
                      alt={`Upload ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add Image Button */}
            {!showImageInput && (
              <button
                onClick={() => setShowImageInput(true)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-4 text-gray-600 transition-all hover:border-gray-400 hover:bg-gray-100 active:scale-98"
              >
                <Image size={20} />
                Add Images or Videos
              </button>
            )}

            {/* Image Input */}
            {showImageInput && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={imageSearchQuery}
                  onChange={(e) => setImageSearchQuery(e.target.value)}
                  placeholder="Image URL..."
                  className="flex-1 rounded-2xl border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddImage();
                    }
                  }}
                />
                <button
                  onClick={handleAddImage}
                  className="rounded-2xl bg-blue-600 px-6 py-3 text-sm text-white transition-colors hover:bg-blue-700"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setShowImageInput(false);
                    setImageSearchQuery('');
                  }}
                  className="rounded-2xl bg-gray-200 px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!title.trim() || !content.trim() || (selectedType === 'media' && mediaUrls.length === 0)}
            className={`w-full rounded-2xl px-6 py-4 text-white transition-all ${
              title.trim() && content.trim() && (selectedType !== 'media' || mediaUrls.length > 0)
                ? `bg-gradient-to-r ${selectedTypeConfig.color} hover:shadow-xl active:scale-95 shadow-lg`
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Post {selectedTypeConfig.label}
          </button>
        </div>
      </div>
    </div>
  );
}
