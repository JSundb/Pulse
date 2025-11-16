import { motion } from 'motion/react';
import type { Activity } from '../App';

type Props = {
  activity: Activity;
  onClick: () => void;
  style?: React.CSSProperties;
};

export default function PulseMarker({ activity, onClick, style }: Props) {
  const categoryColors: Record<string, string> = {
    Social: 'from-blue-400 to-blue-600',
    Fitness: 'from-green-400 to-green-600',
    Study: 'from-yellow-400 to-yellow-600',
    Explore: 'from-purple-400 to-purple-600',
    Deals: 'from-orange-400 to-orange-600',
    Nightlife: 'from-pink-400 to-pink-600',
  };

  const color = categoryColors[activity.category] || 'from-gray-400 to-gray-600';

  return (
    <div style={style} className="cursor-pointer" onClick={onClick}>
      {/* Pulsing rings */}
      {activity.trending && (
        <>
          <motion.div
            className={`absolute inset-0 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br ${color} opacity-30`}
            animate={{
              scale: [1, 1.8],
              opacity: [0.3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
          <motion.div
            className={`absolute inset-0 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br ${color} opacity-30`}
            animate={{
              scale: [1, 1.8],
              opacity: [0.3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 1,
              ease: 'easeOut',
            }}
          />
        </>
      )}

      {/* Marker dot */}
      <motion.div
        className={`relative h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br ${color} shadow-lg`}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Live count badge */}
        {activity.liveCount > 0 && (
          <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white">
            <span className="text-[10px]">{activity.liveCount}</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
