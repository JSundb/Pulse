import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export type Theme = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  gradient: string;
};

type Props = {
  themes: Theme[];
  onSelectTheme: (theme: Theme) => void;
  onMoreThemes: () => void;
};

export default function ThemeRow({ themes, onSelectTheme, onMoreThemes }: Props) {
  return (
    <div className="px-5 py-4">
      <h2 className="mb-3 text-lg text-gray-900">Explore Themes</h2>
      
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {themes.map((theme, index) => (
          <motion.button
            key={theme.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelectTheme(theme)}
            className="group relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-2xl shadow-md transition-all hover:shadow-xl active:scale-95"
          >
            <img
              src={theme.thumbnail}
              alt={theme.name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-60`} />
            <div className="absolute inset-0 flex items-end p-3">
              <span className="text-sm text-white drop-shadow-lg">{theme.name}</span>
            </div>
          </motion.button>
        ))}
        
        {/* More Themes Button */}
        <button
          onClick={onMoreThemes}
          className="flex h-24 w-32 flex-shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-600 transition-all hover:border-gray-400 hover:bg-gray-100 active:scale-95"
        >
          <ChevronRight size={24} />
          <span className="text-xs">More</span>
        </button>
      </div>
    </div>
  );
}
