import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Activity } from '../App';
import { X, Star, Camera, Check } from 'lucide-react';

type Props = {
  activity: Activity;
  onClose: () => void;
  onComplete: () => void;
};

const VIBE_TAGS = [
  'Quiet',
  'Scenic',
  'Cozy',
  'Crowded',
  'Lively',
  'Peaceful',
  'Romantic',
  'Energetic',
  'Chill',
  'Spacious',
];

export default function RatingFlow({ activity, onClose, onComplete }: Props) {
  const [step, setStep] = useState<'rating' | 'vibes' | 'review' | 'photos' | 'complete'>('rating');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedVibes, setSelectedVibes] = useState<string[]>([]);
  const [review, setReview] = useState('');

  const toggleVibe = (vibe: string) => {
    if (selectedVibes.includes(vibe)) {
      setSelectedVibes(selectedVibes.filter(v => v !== vibe));
    } else {
      setSelectedVibes([...selectedVibes, vibe]);
    }
  };

  const handleNext = () => {
    if (step === 'rating' && rating > 0) setStep('vibes');
    else if (step === 'vibes') setStep('review');
    else if (step === 'review') setStep('photos');
    else if (step === 'photos') setStep('complete');
  };

  const handleSkip = () => {
    if (step === 'review') setStep('photos');
    else if (step === 'photos') setStep('complete');
  };

  const handleSubmit = () => {
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 35, stiffness: 350 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl"
      >
        <AnimatePresence mode="wait">
          {/* Rating Step */}
          {step === 'rating' && (
            <motion.div
              key="rating"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl text-gray-900">Rate your experience</h2>
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-6 rounded-2xl bg-gray-50 p-4">
                <h3 className="text-lg text-gray-900 line-clamp-1">{activity.title}</h3>
                <p className="text-sm text-gray-600">{activity.category}</p>
              </div>

              <div className="mb-8 text-center">
                <p className="mb-4 text-gray-600">How was it?</p>
                <div className="flex items-center justify-center gap-3">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star
                        size={48}
                        className={
                          star <= (hoveredRating || rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleNext}
                disabled={rating === 0}
                className={`w-full rounded-2xl px-6 py-4 text-white transition-all ${
                  rating > 0
                    ? 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </motion.div>
          )}

          {/* Vibe Tags Step */}
          {step === 'vibes' && (
            <motion.div
              key="vibes"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl text-gray-900">What was the vibe?</h2>
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="mb-6 text-gray-600">Select all that apply</p>

              <div className="mb-8 flex flex-wrap gap-3">
                {VIBE_TAGS.map(vibe => (
                  <button
                    key={vibe}
                    onClick={() => toggleVibe(vibe)}
                    className={`rounded-full px-5 py-3 text-sm transition-all ${
                      selectedVibes.includes(vibe)
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {vibe}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-full rounded-2xl bg-blue-600 px-6 py-4 text-white transition-all hover:bg-blue-700 active:scale-95"
              >
                Continue
              </button>
            </motion.div>
          )}

          {/* Review Step */}
          {step === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl text-gray-900">Share your thoughts</h2>
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="mb-4 text-gray-600">Optional</p>

              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="What did you like? Any tips for others?"
                className="mb-6 w-full rounded-2xl border border-gray-200 p-4 text-gray-900 focus:border-blue-500 focus:outline-none"
                rows={6}
              />

              <div className="flex gap-3">
                <button
                  onClick={handleSkip}
                  className="flex-1 rounded-2xl border-2 border-gray-200 bg-white px-6 py-4 text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
                >
                  Skip
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 rounded-2xl bg-blue-600 px-6 py-4 text-white transition-all hover:bg-blue-700 active:scale-95"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* Photos Step */}
          {step === 'photos' && (
            <motion.div
              key="photos"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl text-gray-900">Add photos</h2>
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <p className="mb-6 text-gray-600">Optional</p>

              <button className="mb-6 flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 py-16 text-gray-600 transition-all hover:border-gray-400 hover:bg-gray-100">
                <Camera size={32} />
                <div className="text-left">
                  <p className="text-base text-gray-900">Add photos</p>
                  <p className="text-sm text-gray-500">Share your experience</p>
                </div>
              </button>

              <div className="flex gap-3">
                <button
                  onClick={handleSkip}
                  className="flex-1 rounded-2xl border-2 border-gray-200 bg-white px-6 py-4 text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
                >
                  Skip
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 rounded-2xl bg-blue-600 px-6 py-4 text-white transition-all hover:bg-blue-700 active:scale-95"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* Complete Step */}
          {step === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="mb-6 flex h-24 w-24 mx-auto items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-blue-500 shadow-xl"
              >
                <Check size={48} className="text-white" strokeWidth={3} />
              </motion.div>

              <h2 className="mb-3 text-2xl text-gray-900">Thanks for sharing!</h2>
              <p className="mb-8 text-gray-600">
                Your rating helps others discover great activities
              </p>

              <button
                onClick={handleSubmit}
                className="w-full rounded-2xl bg-blue-600 px-6 py-4 text-white transition-all hover:bg-blue-700 active:scale-95"
              >
                Done
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress indicator */}
        {step !== 'complete' && (
          <div className="flex justify-center gap-2 pb-6">
            {['rating', 'vibes', 'review', 'photos'].map((s, i) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  ['rating', 'vibes', 'review', 'photos'].indexOf(step) >= i
                    ? 'w-8 bg-blue-600'
                    : 'w-1.5 bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
