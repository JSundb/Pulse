import { motion } from 'motion/react';
import type { Activity } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Props = {
  activity: Activity;
  onClose: () => void;
  onGo: () => void;
};

export default function ActivityCardOverlay({ activity, onClose, onGo }: Props) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 z-30 bg-black/30 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Card */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-40 mx-auto max-w-md"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      >
        <div className="mx-4 mb-32 overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Image */}
          <div className="relative h-48">
            <ImageWithFallback
              src={activity.photo}
              alt={activity.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            {/* Category badge */}
            <div className="absolute bottom-4 left-4">
              <span className="rounded-full bg-white/90 px-3 py-1 backdrop-blur-sm">
                {activity.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-4">
              <div className="mb-2">{activity.title}</div>
              <div className="flex items-center gap-4 text-gray-500">
                <div className="flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{activity.distance} away</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span>{activity.liveCount} there now</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onGo}
                className="flex-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 py-3 text-white shadow-lg shadow-blue-500/30 transition-transform hover:scale-105"
              >
                View Details
              </button>
              <button className="flex-1 rounded-full border-2 border-blue-500 py-3 text-blue-600 transition-all hover:bg-blue-50">
                Join
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
