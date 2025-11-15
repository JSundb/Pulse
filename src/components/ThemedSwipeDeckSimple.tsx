import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import UniversalSwipeDeck from './UniversalSwipeDeck';
import { api } from '../services/api';
import type { Activity, Theme } from '../types';

type Props = {
  themeId: string;
  onBack: () => void;
};

export default function ThemedSwipeDeckSimple({ themeId, onBack }: Props) {
  const [selectedSubTheme, setSelectedSubTheme] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getTheme(themeId),
      api.getActivitiesByTheme(themeId)
    ]).then(([themeData, activitiesData]) => {
      setTheme(themeData);
      setActivities(activitiesData);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [themeId]);

  useEffect(() => {
    if (selectedSubTheme) {
      api.getActivitiesByTheme(themeId, selectedSubTheme).then(setActivities);
    } else {
      api.getActivitiesByTheme(themeId).then(setActivities);
    }
  }, [selectedSubTheme, themeId]);

  if (loading || !theme) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  // Filter activities by selected sub-theme
  const filteredActivities = selectedSubTheme
    ? activities.filter((a) => a.subTheme === selectedSubTheme)
    : activities;

  return (
    <div className="flex h-full flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="border-b border-gray-100 bg-white/80 backdrop-blur-lg">
        <div className="px-5 py-4">
          <button
            onClick={onBack}
            className="mb-3 flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="mb-3 flex items-center gap-3">
            <span className="text-3xl">{theme.icon}</span>
            <div>
              <h1 className="text-2xl text-gray-900">{theme.name}</h1>
              <p className="text-sm text-gray-600">{theme.description}</p>
            </div>
          </div>

          {/* Sub-themes */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedSubTheme(null)}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm transition-all ${
                selectedSubTheme === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {theme.subThemes.map((subTheme) => (
              <button
                key={subTheme}
                onClick={() => setSelectedSubTheme(subTheme)}
                className={`flex-shrink-0 rounded-full px-4 py-2 text-sm transition-all ${
                  selectedSubTheme === subTheme
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {subTheme}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Universal Swipe Deck */}
      <UniversalSwipeDeck
        activities={filteredActivities}
        onSave={async (activity) => {
          try {
            await api.saveActivity(activity.id);
          } catch (error) {
            console.error('Failed to save activity:', error);
          }
        }}
        onPass={(activity) => {
          // Activity passed, no action needed
        }}
        emptyMessage={selectedSubTheme ? `No ${selectedSubTheme} activities` : 'No more activities'}
        emptyIcon="🎯"
      />
    </div>
  );
}
