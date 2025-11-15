import { useState } from 'react';
import { ArrowLeft, ThumbsUp, Users, Target, MapPin, Calendar } from 'lucide-react';

type SubActivity = {
  id: string;
  title: string;
  description: string;
  type: 'challenge' | 'meetup' | 'route';
  icon: string;
  upvotes: number;
  participants: number;
  difficulty?: string;
  date?: string;
  spotName?: string;
};

type Props = {
  subActivities: SubActivity[];
  onBack: () => void;
  onSelectSubActivity: (subActivity: SubActivity) => void;
};

export default function AllSubActivities({ subActivities, onBack, onSelectSubActivity }: Props) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'challenges' | 'meetups' | 'routes'>('all');

  const filteredActivities = activeFilter === 'all' 
    ? subActivities 
    : subActivities.filter(sub => {
        if (activeFilter === 'challenges') return sub.type === 'challenge';
        if (activeFilter === 'meetups') return sub.type === 'meetup';
        if (activeFilter === 'routes') return sub.type === 'route';
        return true;
      });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'challenge': return 'bg-orange-100 text-orange-700';
      case 'meetup': return 'bg-green-100 text-green-700';
      case 'route': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const spotName = subActivities[0]?.spotName || 'this spot';

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-5 py-4">
        <div className="mb-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200 active:scale-95"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl text-gray-900">Sub-Activities & Challenges</h1>
            <p className="text-sm text-gray-600">For {spotName}</p>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 overflow-x-auto">
          {['all', 'challenges', 'meetups', 'routes'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter as typeof activeFilter)}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm transition-all ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredActivities.map((sub) => (
            <button
              key={sub.id}
              onClick={() => onSelectSubActivity(sub)}
              className="w-full rounded-2xl border border-gray-200 bg-white p-4 text-left transition-all hover:shadow-md active:scale-98"
            >
              <div className="mb-2 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{sub.icon}</span>
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="text-gray-900">{sub.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{sub.description}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs ${getTypeColor(sub.type)}`}>
                  {getTypeLabel(sub.type)}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <ThumbsUp size={14} />
                  <span>{sub.upvotes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{sub.participants}</span>
                </div>
                {sub.difficulty && (
                  <div className="flex items-center gap-1">
                    <Target size={14} />
                    <span>{sub.difficulty}</span>
                  </div>
                )}
                {sub.date && (
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{sub.date}</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}