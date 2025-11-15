import { motion } from 'motion/react';
import type { Theme } from './ThemeRow';

type Props = {
  theme: Theme;
  onStart: () => void;
  onClose: () => void;
};

export default function ThemeIntroModal({ theme, onStart, onClose }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl"
      >
        {/* Theme Image */}
        <div className="relative h-56">
          <img
            src={theme.thumbnail}
            alt={theme.name}
            className="h-full w-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-50`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-5 left-5 right-5">
            <h2 className="mb-1 text-2xl text-white drop-shadow-lg">{theme.name}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="mb-6 text-sm text-gray-700 leading-relaxed">
            {theme.description}
          </p>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-2xl border-2 border-gray-200 bg-white px-6 py-3 text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={onStart}
              className={`flex-1 rounded-2xl bg-gradient-to-r ${theme.gradient} px-6 py-3 text-white shadow-lg transition-all hover:shadow-xl active:scale-95`}
            >
              Start Swiping
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
