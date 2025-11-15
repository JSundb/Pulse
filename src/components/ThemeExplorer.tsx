import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { api } from '../services/api';
import type { Theme } from '../types';

type Props = {
  onSelectTheme: (themeId: string) => void;
  onOpenSearch?: () => void;
};

export default function ThemeExplorer({ onSelectTheme, onOpenSearch }: Props) {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getThemes().then(data => {
      setThemes(data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading themes...</div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-5 py-4">
        <h1 className="mb-4 text-3xl text-gray-900">Explore</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search spots and activities"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            onClick={onOpenSearch}
          />
        </div>
      </div>

      {/* Theme Grid */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className="grid grid-cols-2 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => onSelectTheme(theme.id)}
              className="group relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lg transition-all hover:shadow-2xl active:scale-98"
            >
              {/* Background Image */}
              <img
                src={theme.image}
                alt={theme.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${theme.gradient} opacity-60`} />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <h3 className="mb-1 text-xl text-white">{theme.name}</h3>
                <p className="text-sm text-white/90">{theme.shortDescription}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}