import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import { Heart, X, ChevronUp, MapPin } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Activity } from '../App';

type Props = {
  activity: Activity;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onSwipeUp: () => void;
  isTop?: boolean;
  index?: number;
};

export default function TinderSwipeCard({
  activity,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  isTop = true,
  index = 0,
}: Props) {
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | 'up' | null>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Calculate rotation based on x position
  const rotate = useTransform(x, [-200, 0, 200], [-25, 0, 25]);
  
  // Calculate opacity for swipe indicators
  const likeOpacity = useTransform(x, [0, 150], [0, 1]);
  const passOpacity = useTransform(x, [-150, 0], [1, 0]);
  
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 100;
    const upThreshold = 150;
    
    if (Math.abs(info.offset.y) > upThreshold && info.offset.y < 0) {
      // Swipe up
      setExitDirection('up');
      onSwipeUp();
    } else if (info.offset.x > swipeThreshold) {
      // Swipe right (like/save)
      setExitDirection('right');
      setTimeout(() => onSwipeRight(), 200);
    } else if (info.offset.x < -swipeThreshold) {
      // Swipe left (pass)
      setExitDirection('left');
      setTimeout(() => onSwipeLeft(), 200);
    }
  };

  // Calculate scale and opacity for cards in the stack
  const scale = isTop ? 1 : 0.95 - index * 0.03;
  const cardOpacity = isTop ? 1 : 0.7 - index * 0.2;
  const yOffset = isTop ? 0 : index * 10;

  return (
    <motion.div
      drag={isTop}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      animate={
        exitDirection === 'left'
          ? { x: -500, opacity: 0 }
          : exitDirection === 'right'
          ? { x: 500, opacity: 0 }
          : exitDirection === 'up'
          ? { y: -800, opacity: 0 }
          : { scale, opacity: cardOpacity, y: yOffset }
      }
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{
        x: isTop ? x : 0,
        y: isTop ? y : yOffset,
        rotate: isTop ? rotate : 0,
        zIndex: isTop ? 50 : 10 - index,
      }}
      className={`absolute top-0 left-0 right-0 bottom-0 ${isTop ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
    >
      {/* Main Card Container */}
      <div className="relative w-full h-full rounded-3xl bg-card shadow-2xl overflow-hidden flex flex-col">
        {/* Hero Image Section */}
        <div className="relative flex-shrink-0 w-full" style={{ height: '50%' }}>
          <ImageWithFallback
            src={activity.photo}
            alt={activity.title}
            className="h-full w-full object-cover"
          />
          
          {/* Gradient Overlay at bottom of image */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Tags Row (bottom-left of image) */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            {activity.vibe?.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="rounded-full bg-white/90 px-3 py-1 text-xs text-gray-800 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
            <span className="rounded-full bg-white/90 px-3 py-1 text-xs text-gray-800 backdrop-blur-sm">
              {activity.category}
            </span>
          </div>

          {/* Distance Bubble (top-right) */}
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-sm">
              <MapPin size={14} className="text-white" />
              <span className="text-sm text-white">{activity.distance}</span>
            </div>
          </div>

          {/* Pass Indicator (Left Swipe) */}
          <motion.div
            style={{ opacity: passOpacity }}
            className="absolute top-1/3 left-8 pointer-events-none"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-red-500 bg-white">
              <X size={40} className="text-red-500" />
            </div>
          </motion.div>

          {/* Like Indicator (Right Swipe) */}
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute top-1/3 right-8 pointer-events-none"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-green-500 bg-white">
              <Heart size={40} className="fill-green-500 text-green-500" />
            </div>
          </motion.div>
        </div>

        {/* Content Section (Bottom Half) */}
        <div className="flex-1 p-4 flex flex-col overflow-hidden min-h-0">
          {/* Title & Subtitle */}
          <div className="mb-2 flex-shrink-0">
            <h2 className="mb-1 text-xl text-foreground line-clamp-1">{activity.title}</h2>
            <p className="text-sm text-muted-foreground line-clamp-1">{activity.description}</p>
          </div>

          {/* Info Tags */}
          <div className="mb-2 flex flex-wrap gap-2 flex-shrink-0">
            {activity.currentConditions.crowdLevel && (
              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs text-green-700 dark:bg-green-500/20 dark:text-green-400">
                {activity.currentConditions.crowdLevel}
              </span>
            )}
            {activity.currentConditions.lightCondition && (
              <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400">
                {activity.currentConditions.lightCondition}
              </span>
            )}
            {activity.costLevel && (
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs text-blue-700 dark:bg-blue-500/20 dark:text-blue-400">
                {activity.costLevel}
              </span>
            )}
          </div>

          {/* Recommendation Bar */}
          {activity.specialMoment && (
            <div className="mb-2 flex-shrink-0 rounded-2xl bg-gradient-to-r from-orange-100 to-pink-100 px-3 py-1.5 dark:from-orange-500/20 dark:to-pink-500/20">
              <p className="text-xs text-orange-700 dark:text-orange-400 line-clamp-2">
                ✨ {activity.specialMoment}
              </p>
            </div>
          )}

          {/* Action Row */}
          <div className="mt-auto pt-2 flex items-center justify-between flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSwipeLeft();
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-gray-600 transition-all hover:border-red-500 hover:bg-red-50 hover:text-red-500 active:scale-90"
            >
              <X size={22} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSwipeUp();
              }}
              className="flex items-center gap-2 rounded-full border-2 border-blue-600 bg-white px-5 py-2 text-sm text-blue-600 transition-all hover:bg-blue-50 active:scale-95"
            >
              <ChevronUp size={16} />
              <span>Details</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSwipeRight();
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-gray-300 bg-white text-gray-600 transition-all hover:border-green-500 hover:bg-green-50 hover:text-green-500 active:scale-90"
            >
              <Heart size={22} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}