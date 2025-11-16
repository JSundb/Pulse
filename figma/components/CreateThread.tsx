import { useState } from 'react';
import { ArrowLeft, Check, Image as ImageIcon, X } from 'lucide-react';

type Props = {
  onBack: () => void;
  onSubmit: (thread: { title: string; content: string; type: string; photos?: string[] }) => void;
};

export default function CreateThread({ onBack, onSubmit }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [threadType, setThreadType] = useState<'question' | 'tip' | 'story' | 'plan'>('question');
  const [photos, setPhotos] = useState<string[]>([]);
  const [showImagePicker, setShowImagePicker] = useState(false);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;

    onSubmit({
      title: title.trim(),
      content: content.trim(),
      type: threadType,
      photos: photos.length > 0 ? photos : undefined,
    });

    // Reset form
    setTitle('');
    setContent('');
    setThreadType('question');
    setPhotos([]);
  };

  const handleAddPhoto = (photoUrl: string) => {
    if (photos.length < 4) {
      setPhotos([...photos, photoUrl]);
    }
    setShowImagePicker(false);
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="flex h-full flex-col bg-white pb-20">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-5 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl text-gray-900">Start a new thread</h1>
          <button
            onClick={handleSubmit}
            disabled={!title.trim() || !content.trim()}
            className="flex items-center gap-1 rounded-xl bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-700 active:scale-95 disabled:opacity-50"
          >
            <Check size={18} />
            Post
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-5">
        {/* Thread Type */}
        <div className="mb-6">
          <label className="mb-2 block text-sm text-gray-600">Thread Type</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setThreadType('question')}
              className={`rounded-2xl px-4 py-3 text-sm transition-all ${
                threadType === 'question'
                  ? 'bg-amber-100 text-amber-700 border-2 border-amber-300'
                  : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
              }`}
            >
              Question
            </button>
            <button
              onClick={() => setThreadType('tip')}
              className={`rounded-2xl px-4 py-3 text-sm transition-all ${
                threadType === 'tip'
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                  : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
              }`}
            >
              Tip
            </button>
            <button
              onClick={() => setThreadType('story')}
              className={`rounded-2xl px-4 py-3 text-sm transition-all ${
                threadType === 'story'
                  ? 'bg-purple-100 text-purple-700 border-2 border-purple-300'
                  : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
              }`}
            >
              Story
            </button>
            <button
              onClick={() => setThreadType('plan')}
              className={`rounded-2xl px-4 py-3 text-sm transition-all ${
                threadType === 'plan'
                  ? 'bg-green-100 text-green-700 border-2 border-green-300'
                  : 'bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200'
              }`}
            >
              Plan
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <label className="mb-2 block text-sm text-gray-600">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's your thread about?"
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
            maxLength={100}
          />
          <p className="mt-1 text-xs text-gray-500">{title.length}/100</p>
        </div>

        {/* Content */}
        <div className="mb-6">
          <label className="mb-2 block text-sm text-gray-600">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts, tips, or questions..."
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
            rows={8}
            maxLength={500}
          />
          <p className="mt-1 text-xs text-gray-500">{content.length}/500</p>
        </div>

        {/* Photos */}
        <div className="mb-6">
          <label className="mb-2 block text-sm text-gray-600">Photos</label>
          <div className="flex items-center">
            <button
              onClick={() => setShowImagePicker(true)}
              className="flex items-center gap-2 rounded-2xl bg-gray-100 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-200"
            >
              <ImageIcon size={16} />
              Add Photo
            </button>
            <p className="ml-2 text-xs text-gray-500">{photos.length}/4</p>
          </div>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {photos.map((photo, index) => (
              <div key={index} className="relative">
                <img
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="h-20 w-20 rounded-2xl object-cover"
                />
                <button
                  onClick={() => handleRemovePhoto(index)}
                  className="absolute right-1 top-1 flex items-center justify-center rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-600"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Guidelines */}
        <div className="rounded-2xl bg-gray-50 p-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-900">Community Guidelines</h3>
          <ul className="space-y-1 text-xs text-gray-600">
            <li>• Be respectful and helpful</li>
            <li>• Stay on topic</li>
            <li>• No spam or self-promotion</li>
            <li>• Share accurate information</li>
          </ul>
        </div>
      </div>

      {/* Image Picker Modal */}
      {showImagePicker && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center">
          <div className="relative w-full max-w-lg rounded-t-3xl bg-white sm:rounded-3xl max-h-[70vh] overflow-y-auto">
            <button
              onClick={() => setShowImagePicker(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
            >
              <X size={20} />
            </button>

            <div className="px-6 py-8">
              <h2 className="mb-2 text-2xl text-gray-900">Select Photo</h2>
              <p className="mb-6 text-sm text-gray-500">
                Choose a photo from the gallery
              </p>

              {/* Mock photo gallery */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
                  'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400',
                  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
                  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&sat=-100',
                  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400',
                  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400',
                  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
                  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400',
                  'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400',
                ].map((url, index) => (
                  <button
                    key={index}
                    onClick={() => handleAddPhoto(url)}
                    className="aspect-square overflow-hidden rounded-lg bg-gray-100 transition-transform hover:scale-105 active:scale-95"
                  >
                    <img
                      src={url}
                      alt={`Photo ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}