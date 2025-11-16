import { useState } from 'react';
import { X, Star, MapPin } from 'lucide-react';

type Props = {
  activityTitle: string;
  onClose: () => void;
  onSubmit: (rating: number, tags: string[], text: string) => void;
};

const quickTags = [
  'Peaceful',
  'Crowded',
  'Beautiful view',
  'Easy',
  'Challenging',
  'Good for photos',
  'Family-friendly',
  'Romantic',
  'Hidden gem',
  'Worth the trip',
  'Overrated',
  'Great vibes',
];

export default function RateExperienceSheet({ activityTitle, onClose, onSubmit }: Props) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [reviewText, setReviewText] = useState('');

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    onSubmit(rating, selectedTags, reviewText);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-t-3xl bg-background shadow-xl animate-slide-up">
        {/* Header */}
        <div className="border-b border-border px-5 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-foreground">Rate Your Experience</h2>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-all hover:bg-secondary/80 active:scale-95"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto p-5">
          {/* Star Rating */}
          <div className="mb-6">
            <h3 className="mb-3 text-foreground">How was it?</h3>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform active:scale-90"
                >
                  <Star
                    size={40}
                    className={`transition-colors ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground/40'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="mt-2 text-center text-sm text-muted-foreground">
                {rating === 5 && 'Amazing!'}
                {rating === 4 && 'Great!'}
                {rating === 3 && 'Good'}
                {rating === 2 && 'Could be better'}
                {rating === 1 && 'Not great'}
              </p>
            )}
          </div>

          {/* Quick Tags */}
          <div className="mb-6">
            <h3 className="mb-3 text-foreground">Add quick tags</h3>
            <div className="flex flex-wrap gap-2">
              {quickTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`rounded-full px-4 py-2 text-sm transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Optional Text */}
          <div className="mb-6">
            <h3 className="mb-3 text-foreground">Share more about your experience (optional)</h3>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="What did you like? Any tips for others?"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              rows={4}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="border-t border-border p-4">
          <button
            onClick={handleSubmit}
            className="w-full rounded-2xl bg-blue-600 px-6 py-3 text-white transition-all hover:bg-blue-700 active:scale-98 disabled:bg-muted disabled:text-muted-foreground"
            disabled={rating === 0}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}