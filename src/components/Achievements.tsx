import { ArrowLeft, Star, Trophy, Target, MapPin, Camera, Zap } from 'lucide-react';

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
  onBack: () => void;
  onSelectBadge: (badge: Badge) => void;
};

export default function Achievements({ onBack, onSelectBadge }: Props) {
  const userXP = 340;
  const userLevel = 5;
  const xpForNextLevel = 400;
  const xpProgress = (userXP / xpForNextLevel) * 100;

  const badges: Badge[] = [
    {
      id: '1',
      name: 'Explorer',
      icon: '🗺️',
      xpReward: 50,
      description: 'Visit 5 different spots',
      requirement: 'Visit 5 spots',
      earned: true,
      progress: 5,
      total: 5,
    },
    {
      id: '2',
      name: 'Sunset Chaser',
      icon: '🌅',
      xpReward: 30,
      description: 'Catch 3 sunsets at different locations',
      requirement: 'Visit 3 spots during sunset',
      earned: true,
      progress: 3,
      total: 3,
    },
    {
      id: '3',
      name: 'Social Butterfly',
      icon: '🦋',
      xpReward: 40,
      description: 'Join 10 activities',
      requirement: 'Join 10 activities',
      earned: true,
      progress: 10,
      total: 10,
    },
    {
      id: '4',
      name: 'Nature Lover',
      icon: '🌿',
      xpReward: 60,
      description: 'Visit 8 nature spots',
      requirement: 'Visit 8 nature spots',
      earned: false,
      progress: 6,
      total: 8,
    },
    {
      id: '5',
      name: 'Photographer',
      icon: '📸',
      xpReward: 40,
      description: 'Upload 20 photos',
      requirement: 'Upload 20 photos',
      earned: false,
      progress: 12,
      total: 20,
    },
    {
      id: '6',
      name: 'Community Leader',
      icon: '👑',
      xpReward: 100,
      description: 'Create 5 sub-activities',
      requirement: 'Create 5 sub-activities',
      earned: false,
      progress: 2,
      total: 5,
    },
    {
      id: '7',
      name: 'Adventurer',
      icon: '⛰️',
      xpReward: 80,
      description: 'Complete 3 challenging routes',
      requirement: 'Complete 3 hard-difficulty routes',
      earned: false,
      progress: 1,
      total: 3,
    },
    {
      id: '8',
      name: 'Foodie',
      icon: '🍕',
      xpReward: 50,
      description: 'Visit 10 restaurants',
      requirement: 'Visit 10 food & dining spots',
      earned: false,
      progress: 4,
      total: 10,
    },
  ];

  const earnedBadges = badges.filter((b) => b.earned);
  const lockedBadges = badges.filter((b) => !b.earned);
  const nextGoals = lockedBadges.slice(0, 3);

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
            <h1 className="text-xl text-gray-900">Your Achievements</h1>
            <p className="text-sm text-gray-600">Level {userLevel} Explorer</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5">
        {/* XP Section */}
        <div className="mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-5 text-white">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Current Level</p>
              <p className="text-3xl">Level {userLevel}</p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Trophy size={32} />
            </div>
          </div>
          <div className="mb-2">
            <div className="h-3 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white transition-all"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>
          <p className="text-sm opacity-90">
            {userXP} / {xpForNextLevel} XP
          </p>
        </div>

        {/* Next Goals */}
        <div className="mb-6">
          <h2 className="mb-3 text-lg text-gray-900">Next Goals</h2>
          <div className="space-y-2">
            {nextGoals.map((badge) => (
              <button
                key={badge.id}
                onClick={() => onSelectBadge(badge)}
                className="w-full rounded-2xl border border-gray-200 bg-white p-4 text-left transition-all hover:shadow-md active:scale-98"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl grayscale opacity-50">{badge.icon}</span>
                    <div>
                      <h3 className="text-gray-900">{badge.name}</h3>
                      <p className="text-sm text-gray-600">{badge.description}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">+{badge.xpReward} XP</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-blue-600 transition-all"
                      style={{ width: `${((badge.progress || 0) / (badge.total || 1)) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">
                    {badge.progress} / {badge.total}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Earned Badges */}
        <div className="mb-6">
          <h2 className="mb-3 text-lg text-gray-900">Earned Badges ({earnedBadges.length})</h2>
          <div className="grid grid-cols-3 gap-3">
            {earnedBadges.map((badge) => (
              <button
                key={badge.id}
                onClick={() => onSelectBadge(badge)}
                className="flex flex-col items-center gap-2 rounded-2xl border border-gray-200 bg-white p-4 text-center transition-all hover:shadow-md active:scale-98"
              >
                <span className="text-4xl">{badge.icon}</span>
                <p className="text-xs text-gray-900">{badge.name}</p>
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                  ✓ Earned
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Locked Badges */}
        <div>
          <h2 className="mb-3 text-lg text-gray-900">Locked Badges ({lockedBadges.length})</h2>
          <div className="grid grid-cols-3 gap-3">
            {lockedBadges.map((badge) => (
              <button
                key={badge.id}
                onClick={() => onSelectBadge(badge)}
                className="flex flex-col items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 p-4 text-center transition-all hover:shadow-md active:scale-98"
              >
                <span className="text-4xl grayscale opacity-50">{badge.icon}</span>
                <p className="text-xs text-gray-600">{badge.name}</p>
                <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
                  Locked
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
