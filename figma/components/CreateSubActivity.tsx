import { useState } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';

type SubActivityFormData = {
  title: string;
  type: 'challenge' | 'meetup' | 'route';
  description: string;
  difficulty: string;
  date: string;
  icon: string;
};

type Props = {
  spotName: string;
  onBack: () => void;
  onCreate: (data: SubActivityFormData) => void;
};

export default function CreateSubActivity({ spotName, onBack, onCreate }: Props) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'challenge' | 'meetup' | 'route'>('challenge');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [date, setDate] = useState('');

  const typeIcons = {
    challenge: '🎯',
    meetup: '👥',
    route: '🗺️',
  };

  const handleCreate = () => {
    if (!title.trim() || !description.trim()) {
      alert('Please fill in title and description');
      return;
    }

    onCreate({
      title: title.trim(),
      type,
      description: description.trim(),
      difficulty: difficulty.trim(),
      date: date.trim(),
      icon: typeIcons[type],
    });
  };

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-5 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200 active:scale-95"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl text-gray-900">Create Sub-Activity</h1>
            <p className="text-sm text-gray-600">For {spotName}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className="space-y-5">
          {/* Title */}
          <div>
            <label className="mb-2 block text-sm text-gray-700">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Sunrise Photography Challenge"
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Type */}
          <div>
            <label className="mb-2 block text-sm text-gray-700">Type *</label>
            <div className="grid grid-cols-3 gap-2">
              {(['challenge', 'meetup', 'route'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`rounded-2xl border-2 px-4 py-3 text-sm transition-all ${
                    type === t
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="mb-1 text-xl">{typeIcons[t]}</div>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm text-gray-700">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the activity, what participants should expect, and any requirements..."
              rows={4}
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Optional: Date & Time */}
          {type === 'meetup' && (
            <div>
              <label className="mb-2 block text-sm text-gray-700">Date & Time (optional)</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g., Tomorrow, 6:00 PM"
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
          )}

          {/* Optional: Difficulty */}
          {(type === 'challenge' || type === 'route') && (
            <div>
              <label className="mb-2 block text-sm text-gray-700">Difficulty (optional)</label>
              <div className="grid grid-cols-3 gap-2">
                {['Easy', 'Medium', 'Hard'].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(difficulty === d ? '' : d)}
                    className={`rounded-2xl border-2 px-4 py-2 text-sm transition-all ${
                      difficulty === d
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Button */}
      <div className="border-t border-gray-200 bg-white p-4">
        <button
          onClick={handleCreate}
          disabled={!title.trim() || !description.trim()}
          className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-white transition-all hover:bg-blue-700 active:scale-98 disabled:bg-gray-300"
        >
          Create Sub-Activity
        </button>
      </div>
    </div>
  );
}