import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import type { Theme } from './ThemeRow';

type Props = {
  themes: Theme[];
  onSelectTheme: (theme: Theme) => void;
  onBack: () => void;
};

export default function ThemeOverview({ themes, onSelectTheme, onBack }: Props) {
  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 px-5 py-4 backdrop-blur-lg">
        <button
          onClick={onBack}
          className="mb-3 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <h1 className="text-2xl text-gray-900">Browse Themes</h1>
        <p className="text-sm text-gray-600">Discover activities by category</p>
      </div>

      {/* Themes Grid */}
      <div className="grid gap-4 p-5">
        {themes.map((theme, index) => (
          <motion.button
            key={theme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelectTheme(theme)}
            className="group relative h-48 overflow-hidden rounded-3xl shadow-lg transition-all hover:shadow-2xl active:scale-98"
          >
            <img
              src={theme.thumbnail}
              alt={theme.name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-50`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="mb-1 text-xl text-white">{theme.name}</h2>
              <p className="text-sm text-white/90">{theme.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
