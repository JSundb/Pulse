import { ArrowLeft, Trophy, Target } from 'lucide-react';

type Badge = {
  id: string;
  name: string;
  icon: string;
  xpReward: number;
  description: string;
  requirement: string;
  earned: boolean;
  progress?: number;
  total?: number;
};

type Props = {
  badge: Badge;
  onBack: () => void;
};

export default function BadgeDetails({ badge, onBack }: Props) {
  const progressPercentage = badge.progress && badge.total 
    ? (badge.progress / badge.total) * 100 
    : 0;

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
          <h1 className="text-xl text-gray-900">Badge Details</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5">
        {/* Badge Icon & Status */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className={`mb-4 flex h-32 w-32 items-center justify-center rounded-full ${
            badge.earned ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gray-200'
          }`}>
            <span className={`text-7xl ${!badge.earned && 'grayscale opacity-50'}`}>
              {badge.icon}
            </span>
          </div>
          <h2 className="mb-2 text-2xl text-gray-900">{badge.name}</h2>
          {badge.earned ? (
            <span className="rounded-full bg-green-100 px-4 py-1.5 text-sm text-green-700">
              ✓ Earned
            </span>
          ) : (
            <span className="rounded-full bg-gray-200 px-4 py-1.5 text-sm text-gray-600">
              🔒 Locked
            </span>
          )}
        </div>

        {/* XP Reward */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                <Trophy size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">XP Reward</p>
                <p className="text-xl text-gray-900">+{badge.xpReward} XP</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="mb-2 text-lg text-gray-900">Description</h3>
          <p className="text-gray-700">{badge.description}</p>
        </div>

        {/* Requirements */}
        <div className="mb-6">
          <h3 className="mb-2 text-lg text-gray-900">Requirements</h3>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                <Target size={16} className="text-blue-600" />
              </div>
              <p className="text-gray-700">{badge.requirement}</p>
            </div>
          </div>
        </div>

        {/* Progress */}
        {!badge.earned && badge.progress !== undefined && badge.total !== undefined && (
          <div className="mb-6">
            <h3 className="mb-2 text-lg text-gray-900">Your Progress</h3>
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="text-gray-900">
                  {badge.progress} / {badge.total}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {badge.total - badge.progress} more to go!
              </p>
            </div>
          </div>
        )}

        {/* Tips */}
        {!badge.earned && (
          <div className="rounded-2xl bg-blue-50 p-4">
            <p className="mb-1 text-sm text-blue-900">💡 Tip</p>
            <p className="text-sm text-blue-700">
              {badge.name === 'Nature Lover' && 'Explore parks and outdoor spots to unlock this badge faster!'}
              {badge.name === 'Photographer' && 'Share photos from your visits to earn this badge!'}
              {badge.name === 'Community Leader' && 'Create challenges and meetups to help unlock this badge!'}
              {badge.name === 'Adventurer' && 'Try challenging routes to earn this badge!'}
              {badge.name === 'Foodie' && 'Discover new restaurants and cafes in your area!'}
              {!['Nature Lover', 'Photographer', 'Community Leader', 'Adventurer', 'Foodie'].includes(badge.name) && 
                'Keep exploring to unlock this badge!'}
            </p>
          </div>
        )}

        {/* Earned Message */}
        {badge.earned && (
          <div className="rounded-2xl bg-green-50 p-4 text-center">
            <p className="text-2xl">🎉</p>
            <p className="text-sm text-green-700">
              Congratulations! You've earned this badge!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
