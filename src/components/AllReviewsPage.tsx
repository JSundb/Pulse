import { useState } from 'react';
import { X, Star, ThumbsUp, ChevronDown, ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Review = {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  timeAgo: string;
  comment: string;
  photos?: string[];
  helpfulCount: number;
  isHelpful?: boolean;
};

type Props = {
  activityName: string;
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
  onClose: () => void;
};

const ratingDistribution = [
  { stars: 5, count: 89, percentage: 66 },
  { stars: 4, count: 32, percentage: 24 },
  { stars: 3, count: 10, percentage: 7 },
  { stars: 2, count: 3, percentage: 2 },
  { stars: 1, count: 0, percentage: 0 },
];

const topTags = [
  'Beautiful View',
  'Worth the trip',
  'Easy',
  'Instagram-worthy',
  'Peaceful',
  'Crowded',
  'Challenging',
  'Romantic',
];

const filterOptions = [
  'Most recent',
  'Highest rated',
  'Lowest rated',
  'With photos',
  'From friends',
];

export default function AllReviewsPage({
  activityName,
  averageRating,
  totalReviews,
  reviews: initialReviews,
  onClose,
}: Props) {
  const [activeFilter, setActiveFilter] = useState('Most recent');
  const [reviews, setReviews] = useState(initialReviews);
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const toggleExpanded = (reviewId: string) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId);
    } else {
      newExpanded.add(reviewId);
    }
    setExpandedReviews(newExpanded);
  };

  const toggleHelpful = (reviewId: string) => {
    setReviews(
      reviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              isHelpful: !review.isHelpful,
              helpfulCount: review.isHelpful
                ? review.helpfulCount - 1
                : review.helpfulCount + 1,
            }
          : review
      )
    );
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed inset-0 z-50 flex flex-col bg-background"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-4 py-4 backdrop-blur-sm">
        <h1 className="text-xl">Reviews</h1>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-secondary/80"
        >
          <X size={20} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-6">
          {/* Summary Section */}
          <div className="mb-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-6 dark:from-amber-950/20 dark:to-orange-950/20">
            {/* Average Rating */}
            <div className="mb-6 text-center">
              <div className="mb-2 text-5xl text-gray-900 dark:text-gray-100">
                {averageRating.toFixed(1)}
              </div>
              <div className="mb-2 flex items-center justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className={
                      star <= Math.round(averageRating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300'
                    }
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Based on {totalReviews} reviews
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="mb-6 space-y-2">
              {ratingDistribution.map((dist) => (
                <div key={dist.stars} className="flex items-center gap-2">
                  <span className="w-8 text-xs text-gray-600 dark:text-gray-400">
                    {dist.stars}★
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/50 dark:bg-gray-800/50">
                    <div
                      className="h-full rounded-full bg-amber-400"
                      style={{ width: `${dist.percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-xs text-gray-600 dark:text-gray-400">
                    {dist.count}
                  </span>
                </div>
              ))}
            </div>

            {/* Top Tags */}
            <div>
              <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
                Top tags:
              </p>
              <div className="flex flex-wrap gap-2">
                {topTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white px-3 py-1.5 text-xs text-gray-700 shadow-sm dark:bg-gray-800 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition-all ${
                  activeFilter === filter
                    ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((review) => {
              const isExpanded = expandedReviews.has(review.id);
              const shouldTruncate = review.comment.length > 150;
              const displayComment =
                !isExpanded && shouldTruncate
                  ? review.comment.slice(0, 150) + '...'
                  : review.comment;

              return (
                <div
                  key={review.id}
                  className="rounded-2xl bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  {/* Review Header */}
                  <div className="mb-3 flex items-start gap-3">
                    {/* Avatar */}
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      {review.userName.charAt(0)}
                    </div>

                    {/* User Info & Rating */}
                    <div className="flex-1">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm">{review.userName}</span>
                        <span className="text-xs text-muted-foreground">
                          {review.timeAgo}
                        </span>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            className={
                              star <= review.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-gray-300'
                            }
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="mb-3 text-sm leading-relaxed text-foreground">
                    {displayComment}
                  </p>

                  {/* Read More */}
                  {shouldTruncate && (
                    <button
                      onClick={() => toggleExpanded(review.id)}
                      className="mb-3 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                      {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                  )}

                  {/* Review Photos */}
                  {review.photos && review.photos.length > 0 && (
                    <div className="mb-3 flex gap-2 overflow-x-auto">
                      {review.photos.map((photo, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedPhoto(photo)}
                          className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl"
                        >
                          <ImageWithFallback
                            src={photo}
                            alt={`Review photo ${idx + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Helpful Button */}
                  <button
                    onClick={() => toggleHelpful(review.id)}
                    className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs transition-all ${
                      review.isHelpful
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                    }`}
                  >
                    <ThumbsUp size={12} className={review.isHelpful ? 'fill-current' : ''} />
                    Helpful {review.helpfulCount > 0 && `(${review.helpfulCount})`}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          <div className="mt-6 flex justify-center">
            <button className="flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm transition-all hover:bg-secondary/80 active:scale-95">
              Load more reviews
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Photo Viewer Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm"
          >
            <X size={20} className="text-white" />
          </button>
          <ImageWithFallback
            src={selectedPhoto}
            alt="Review photo"
            className="max-h-[80vh] max-w-full rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </motion.div>
  );
}
