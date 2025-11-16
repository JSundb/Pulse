import { useState } from 'react';
import { X, Star } from 'lucide-react';

type Props = {
  activityName: string;
  onClose: () => void;
  onSubmit: (rating: number, tags: string[], review: string) => void;
};

export default function RatingModal({ activityName, onClose, onSubmit }: Props) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [reviewText, setReviewText] = useState('');

  const quickTags = [
    'Quiet',
    'Crowded',
    'Great View',
    'Challenging',
    'Relaxing',
    'Family-Friendly',
    'Instagram-Worthy',
    'Hidden Gem',
    'Overrated',
    'Must Visit',
    'Good for Groups',
    'Peaceful',
  ];

  const handleSubmit = () => {
    onSubmit(rating, selectedTags, reviewText);
    onClose();
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0">
      <div className="w-full max-w-md animate-slide-up rounded-t-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-xl text-gray-900">Rate your visit</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto p-5">
          <p className="mb-6 text-sm text-gray-600">{activityName}</p>

          {/* Step 1: Rating */}
          {step === 1 && (
            <div className="text-center">
              <h3 className="mb-4 text-lg text-gray-900">How was it?</h3>
              <div className="mb-6 flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110 active:scale-95"
                  >
                    <Star
                      size={40}
                      className={
                        star <= (hoveredRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }
                    />
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={rating === 0}
                className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-white transition-all hover:bg-blue-700 active:scale-98 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Tags */}
          {step === 2 && (
            <div>
              <h3 className="mb-2 text-lg text-gray-900">Pick 2-3 tags</h3>
              <p className="mb-4 text-sm text-gray-600">
                {selectedTags.length}/3 selected
              </p>
              <div className="mb-6 flex flex-wrap gap-2">
                {quickTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`rounded-full px-4 py-2 text-sm transition-all ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 transition-all hover:bg-gray-50 active:scale-98"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={selectedTags.length < 2}
                  className="flex-1 rounded-2xl bg-blue-600 px-4 py-3 text-white transition-all hover:bg-blue-700 active:scale-98 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div>
              <h3 className="mb-2 text-lg text-gray-900">How was it?</h3>
              <p className="mb-4 text-sm text-gray-600">Optional</p>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience..."
                className="mb-6 h-32 w-full rounded-2xl border border-gray-200 bg-gray-50 p-4 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 transition-all hover:bg-gray-50 active:scale-98"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 rounded-2xl bg-blue-600 px-4 py-3 text-white transition-all hover:bg-blue-700 active:scale-98"
                >
                  Submit Review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
