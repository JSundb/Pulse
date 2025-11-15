import { useState } from 'react';
import { X, Upload, Clock, TrendingUp, MapPin, Image as ImageIcon } from 'lucide-react';

type Props = {
  spotName?: string;
  onClose: () => void;
  onCreate: (subActivity: any) => void;
};

export default function SubActivityCreation({ spotName, onClose, onCreate }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Moderate' | 'Hard'>('Easy');
  const [bestTime, setBestTime] = useState('');
  const [routeSteps, setRouteSteps] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) return;

    onCreate({
      title,
      description,
      difficulty,
      bestTime,
      routeSteps: routeSteps.split('\n').filter(s => s.trim()),
      spotName,
      createdAt: new Date().toISOString(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md max-h-[95vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/95 px-5 py-4 backdrop-blur-lg rounded-t-3xl">
          <h1 className="text-xl text-gray-900">Create Sub-Activity</h1>
          <button
            onClick={onClose}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200 active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5">
          {/* Spot Name (if provided) */}
          {spotName && (
            <div className="mb-4 rounded-2xl bg-blue-50 p-4">
              <div className="flex items-center gap-2 text-sm text-blue-900">
                <MapPin size={16} />
                <span>Creating for: {spotName}</span>
              </div>
            </div>
          )}

          {/* Title */}
          <div className="mb-4">
            <label className="mb-2 block text-sm text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Sunset Photography Challenge"
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="mb-2 block text-sm text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the activity or challenge..."
              rows={4}
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Difficulty */}
          <div className="mb-4">
            <label className="mb-2 block text-sm text-gray-700">Difficulty</label>
            <div className="flex gap-2">
              {(['Easy', 'Moderate', 'Hard'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`flex-1 rounded-2xl px-4 py-3 text-sm transition-all active:scale-95 ${
                    difficulty === level
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Best Time */}
          <div className="mb-4">
            <label className="mb-2 block text-sm text-gray-700">Best Time (Optional)</label>
            <input
              type="text"
              value={bestTime}
              onChange={(e) => setBestTime(e.target.value)}
              placeholder="e.g., Early morning, Golden hour"
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Route Steps (Optional) */}
          <div className="mb-4">
            <label className="mb-2 block text-sm text-gray-700">Route Steps (Optional, one per line)</label>
            <textarea
              value={routeSteps}
              onChange={(e) => setRouteSteps(e.target.value)}
              placeholder="Step 1: Start at the main entrance&#10;Step 2: Follow the trail markers&#10;Step 3: Reach the viewpoint"
              rows={4}
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Image Upload Placeholder */}
          <div className="mb-6">
            <label className="mb-2 block text-sm text-gray-700">Add Images (Optional)</label>
            <button className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-gray-500 transition-all hover:border-gray-400 hover:bg-gray-100 active:scale-98">
              <ImageIcon size={24} />
              <span>Upload images</span>
            </button>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!title.trim() || !description.trim()}
            className="w-full rounded-2xl bg-blue-600 px-6 py-4 text-white transition-all hover:bg-blue-700 active:scale-98 disabled:bg-gray-300"
          >
            Create Sub-Activity
          </button>
        </div>
      </div>
    </div>
  );
}
