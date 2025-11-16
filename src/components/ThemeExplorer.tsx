import { Search } from 'lucide-react';
import roamyLogo from 'figma:asset/cf9e2e7d21e5aef70cdebd7a6fea9d952edaf6ae.png';

type Theme = {
  id: string;
  name: string;
  shortDescription: string;
  image: string;
  gradient: string;
  activityCount?: number;
};

type Props = {
  themes?: Theme[];
  onSelectTheme: (themeId: string) => void;
  onOpenSearch?: () => void;
};

export default function ThemeExplorer({ themes: apiThemes, onSelectTheme, onOpenSearch }: Props) {
  // Fallback themes if API data not provided
  const fallbackThemes: Theme[] = [
    {
      id: 'nature',
      name: 'Nature',
      shortDescription: 'Outdoors & Parks',
      image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=600',
      gradient: 'from-green-400 to-emerald-600',
    },
    {
      id: 'sport',
      name: 'Sport',
      shortDescription: 'Fitness & Activity',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600',
      gradient: 'from-orange-400 to-red-600',
    },
    {
      id: 'photography',
      name: 'Photography',
      shortDescription: 'Viewpoints & Shots',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
      gradient: 'from-purple-400 to-pink-600',
    },
    {
      id: 'cafes',
      name: 'Cafés & Study',
      shortDescription: 'Coffee & Work',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600',
      gradient: 'from-amber-400 to-orange-600',
    },
    {
      id: 'social',
      name: 'Social',
      shortDescription: 'Meetups & Events',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600',
      gradient: 'from-blue-400 to-cyan-600',
    },
    {
      id: 'water',
      name: 'Water & Swim',
      shortDescription: 'Lakes & Beaches',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600',
      gradient: 'from-cyan-400 to-blue-600',
    },
    {
      id: 'routes',
      name: 'Routes & Hikes',
      shortDescription: 'Trails & Walks',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600',
      gradient: 'from-teal-400 to-green-600',
    },
    {
      id: 'seasonal',
      name: 'Seasonal',
      shortDescription: 'Limited Time',
      image: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=600',
      gradient: 'from-rose-400 to-pink-600',
    },
    {
      id: 'hidden',
      name: 'Hidden Gems',
      shortDescription: 'Off the Beaten Path',
      image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600',
      gradient: 'from-indigo-400 to-purple-600',
    },
  ];

  // Use API themes if available, otherwise use fallback
  const themes = apiThemes && apiThemes.length > 0 ? apiThemes : fallbackThemes;

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-5 py-4">
        <div className="mb-4 flex items-center gap-3">
          <img src={roamyLogo} alt="Roamy" className="h-8" />
          <h1 className="text-3xl text-foreground">Explore</h1>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Search spots and activities"
            className="w-full rounded-2xl border border-border bg-input-background py-3 pl-12 pr-4 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                <p className="text-sm text-white/90">
                  {theme.shortDescription}
                  {theme.activityCount && ` • ${theme.activityCount} activities`}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
