import { useState, useEffect } from 'react';
import { Heart, MapPin, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { api } from '../services/api';
import type { Activity } from '../types';

type Props = {
  onOpenActivity: (activity: Activity) => void;
};

export default function SavedList({ onOpenActivity }: Props) {
  const [savedActivities, setSavedActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getSavedActivities().then(data => {
      setSavedActivities(data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  const handleRemove = async (activityId: string) => {
    await api.unsaveActivity(activityId);
    setSavedActivities(prev => prev.filter(a => a.id !== activityId));
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">Loading saved activities...</div>
      </div>
    );
  }


  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-5 py-4">
        <h1 className="text-3xl text-gray-900">Saved</h1>
        <p className="mt-1 text-sm text-gray-600">Your spots and activities</p>
      </div>

      {/* Saved List */}
      <div className="flex-1 overflow-y-auto">
        {savedActivities.length === 0 ? (
          <div className="flex h-full items-center justify-center p-8 text-center">
            <div>
              <Heart size={48} className="mx-auto mb-4 text-gray-300" />
              <h2 className="mb-2 text-xl text-gray-900">No saved items yet</h2>
              <p className="text-gray-600">
                Start exploring and save spots and activities you want to visit
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {savedActivities.map((activity) => (
              <div
                key={activity.id}
                className="group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl bg-white border border-gray-200 p-3 shadow-sm transition-all hover:shadow-md"
              >
                <div
                  onClick={() => onOpenActivity(activity)}
                  className="flex flex-1 min-w-0 items-center gap-4 cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                    <ImageWithFallback
                      src={activity.photo}
                      alt={activity.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                        {activity.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin size={10} />
                        {activity.distance}
                      </span>
                    </div>
                    <h3 className="mb-1 text-gray-900 truncate">{activity.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-1">{activity.description}</p>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(activity.id);
                  }}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-100 hover:text-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}