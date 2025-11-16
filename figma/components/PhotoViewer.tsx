import { X, ArrowUp } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type PhotoData = {
  url: string;
  upvotes: number;
  author: string;
  authorAvatar?: string;
  caption: string;
  postId: string;
};

type Props = {
  photo: PhotoData;
  onClose: () => void;
  onUpvote: (photoUrl: string) => void;
};

export default function PhotoViewer({ photo, onClose, onUpvote }: Props) {
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const handleUpvote = () => {
    if (!hasUpvoted) {
      onUpvote(photo.url);
      setHasUpvoted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
      >
        <X size={24} />
      </button>

      {/* Content */}
      <div className="relative flex h-full w-full max-w-4xl flex-col items-center justify-center p-4">
        {/* Image */}
        <div className="relative mb-6 w-full overflow-hidden rounded-2xl">
          <ImageWithFallback
            src={photo.url}
            alt="Community photo"
            className="h-auto w-full max-h-[70vh] object-contain"
          />
        </div>

        {/* Info Card */}
        <div className="w-full rounded-2xl bg-white p-6 shadow-2xl">
          {/* User Info */}
          <div className="mb-4 flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-blue-400 to-purple-500">
              {photo.authorAvatar ? (
                <ImageWithFallback
                  src={photo.authorAvatar}
                  alt={photo.author}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-white">
                  {photo.author.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="text-gray-900">{photo.author}</p>
              <p className="text-sm text-gray-500">Posted in thread</p>
            </div>
          </div>

          {/* Caption */}
          <p className="mb-4 text-sm text-gray-700">{photo.caption}</p>

          {/* Upvote Button */}
          <button
            onClick={handleUpvote}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 transition-all ${
              hasUpvoted
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ArrowUp size={20} />
            <span className="font-medium">{photo.upvotes + (hasUpvoted ? 1 : 0)} upvotes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
