import { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Props = {
  onClose: () => void;
};

const categories = ['Social', 'Fitness', 'Study', 'Explore', 'Deals', 'Nightlife'];

export default function QuickPost({ onClose }: Props) {
  const [text, setText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Social');
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = () => {
    // Mock image upload
    setImage('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=600&fit=crop');
  };

  const handlePost = () => {
    // Mock post creation
    console.log('Posting:', { text, selectedCategory, image });
    onClose();
  };

  return (
    <motion.div
      className="absolute inset-0 z-50 bg-white"
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <button onClick={onClose} className="text-gray-600">
            Cancel
          </button>
          <div className="text-gray-900">Quick Post</div>
          <button
            onClick={handlePost}
            disabled={!text.trim()}
            className={`rounded-full px-4 py-2 transition-all ${
              text.trim()
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            Post
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-md space-y-6">
            {/* Text Input */}
            <div>
              <label className="mb-2 block text-gray-700">What's happening here?</label>
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Share what you're up to..."
                className="w-full resize-none rounded-2xl border border-gray-200 p-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                rows={4}
              />
              <div className="mt-2 flex items-center justify-between text-gray-500">
                <span>{text.length}/280</span>
                <div className="flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>Expires in 1 hour</span>
                </div>
              </div>
            </div>

            {/* Category Selector */}
            <div>
              <label className="mb-2 block text-gray-700">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-full px-4 py-2 transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="mb-2 block text-gray-700">Add Photo (Optional)</label>
              {image ? (
                <div className="relative overflow-hidden rounded-2xl">
                  <ImageWithFallback src={image} alt="Upload" className="h-48 w-full object-cover" />
                  <button
                    onClick={() => setImage(null)}
                    className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleImageUpload}
                  className="flex h-32 w-full items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 transition-colors hover:border-blue-500 hover:bg-blue-50"
                >
                  <div className="text-center">
                    <svg className="mx-auto mb-2 h-8 w-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span className="text-gray-500">Tap to add photo</span>
                  </div>
                </button>
              )}
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 rounded-2xl bg-blue-50 p-4">
              <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div className="flex-1">
                <div className="text-gray-900">Current Location</div>
                <p className="text-gray-500">San Francisco, CA</p>
              </div>
              <svg className="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
