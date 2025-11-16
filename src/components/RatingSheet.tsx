import { useState } from 'react';
import { X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Props = {
  activityName: string;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
};

export default function RatingSheet({ activityName, onClose, onSubmit }: Props) {
  const [step, setStep] = useState<'rating' | 'comment' | 'submitting'
>('rating');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    setStep('submitting');
    setTimeout(() => {
      onSubmit(rating, comment);
    }, 500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50"
        />

        {/* Sheet */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-md rounded-t-3xl bg-card shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="text-xl text-foreground">Rate Your Visit</h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {step === 'rating' && (
              <div className="space-y-6">
                <div>
                  <p className="mb-4 text-center text-muted-foreground">
                    How was your experience at
                  </p>
                  <p className="mb-6 text-center text-foreground">{activityName}</p>
                </div>

                {/* Star Rating */}
                <div className="flex justify-center gap-2">
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
                        className={`${
                          star <= (hoveredRating || rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                {rating > 0 && (
                  <div className="text-center text-sm text-muted-foreground">
                    {rating === 1 && 'Poor'}
                    {rating === 2 && 'Fair'}
                    {rating === 3 && 'Good'}
                    {rating === 4 && 'Very Good'}
                    {rating === 5 && 'Excellent'}
                  </div>
                )}

                <button
                  onClick={() => setStep('comment')}
                  disabled={rating === 0}
                  className="w-full rounded-2xl bg-primary px-6 py-3 text-white transition-all hover:bg-primary/90 active:scale-98 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}

            {step === 'comment' && (
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">
                    Add a comment (optional)
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts about this place..."
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={4}
                    maxLength={200}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    {comment.length}/200
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('rating')}
                    className="flex-1 rounded-2xl border-2 border-border bg-card px-6 py-3 text-foreground transition-all hover:bg-muted active:scale-98"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 rounded-2xl bg-primary px-6 py-3 text-white transition-all hover:bg-primary/90 active:scale-98"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}

            {step === 'submitting' && (
              <div className="py-8 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
                <p className="text-muted-foreground">Submitting your review...</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
