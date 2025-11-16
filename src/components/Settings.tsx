import { ArrowLeft, ChevronRight, Moon, Sun, Smartphone, User, Bell, Shield, Info, LogOut } from 'lucide-react';
import { useState } from 'react';
import Badge from './Badge';

type Props = {
  onBack: () => void;
  darkMode?: 'light' | 'dark' | 'auto';
  onDarkModeChange?: (mode: 'light' | 'dark' | 'auto') => void;
  onViewAchievements?: () => void;
  user?: {
    name: string;
    avatar: string;
    level: number;
    tier: string;
    xp: number;
    nextLevelXP: number;
  };
};

export default function Settings({ onBack, darkMode = 'auto', onDarkModeChange, onViewAchievements, user }: Props) {
  const [appearanceMode, setAppearanceMode] = useState<'light' | 'dark' | 'auto'>(darkMode);
  const [activityUpdates, setActivityUpdates] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [woltRecommendations, setWoltRecommendations] = useState(true);
  const [servicesReminders, setServicesReminders] = useState(true);

  const handleAppearanceChange = (mode: 'light' | 'dark' | 'auto') => {
    setAppearanceMode(mode);
    onDarkModeChange?.(mode);
  };

  // Mock user data if not provided
  const userData = user || {
    name: 'Jordan Smith',
    avatar: 'https://i.pravatar.cc/150?u=jordan',
    level: 5,
    tier: 'Explorer',
    xp: 420,
    nextLevelXP: 500,
  };

  const xpProgress = (userData.xp / userData.nextLevelXP) * 100;

  // Top 3 badges - using icons instead of emojis
  const topBadges = [
    { icon: '🗺️', label: 'Explorer', color: 'teal' as const },
    { icon: '🌅', label: 'Sunrise', color: 'orange' as const },
    { icon: '🏆', label: 'Champion', color: 'purple' as const },
  ];

  return (
    <div className="flex h-full w-full flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-5 py-4 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="rounded-full p-2 text-muted-foreground hover:bg-muted active:scale-95 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl text-foreground">Settings</h1>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={userData.avatar}
            alt={userData.name}
            className="h-14 w-14 rounded-full bg-muted ring-2 ring-primary/20"
          />
          <div className="flex-1">
            <h2 className="text-base text-foreground mb-1">{userData.name}</h2>
            <p className="text-sm text-muted-foreground">Level {userData.level} — {userData.tier}</p>
          </div>
        </div>

        {/* XP Progress - Improved Clarity: "Level 5 — 420 XP of 500 (Next level)" */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground">Level {userData.level}</span>
            <span className="text-muted-foreground">{userData.xp} XP of {userData.nextLevelXP}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#14B8A6] via-[#06B6D4] to-[#3B82F6] transition-all"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-right">Next level</p>
        </div>

        {/* Top Badges - Clear label */}
        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Top Badges</span>
            {onViewAchievements && (
              <button
                onClick={onViewAchievements}
                className="text-xs text-primary hover:underline"
              >
                View All
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            {topBadges.map((badge, idx) => (
              <Badge
                key={idx}
                icon={badge.icon}
                label={badge.label}
                color={badge.color}
                size="sm"
                earned={true}
                onClick={onViewAchievements}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Appearance Section */}
        <div className="border-b border-border px-5 py-4">
          <div className="flex items-center gap-2 mb-3">
            <Moon size={16} className="text-muted-foreground" />
            <h2 className="text-sm text-foreground">Appearance</h2>
          </div>
          
          <div className="flex gap-2">
            {/* Light Mode */}
            <button
              onClick={() => handleAppearanceChange('light')}
              className={`flex-1 flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all ${
                appearanceMode === 'light'
                  ? 'border-primary bg-gradient-to-br from-[#14B8A6]/10 via-[#06B6D4]/10 to-[#3B82F6]/10'
                  : 'border-border bg-card'
              }`}
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                appearanceMode === 'light' ? 'bg-gradient-to-r from-[#14B8A6] via-[#06B6D4] to-[#3B82F6]' : 'bg-yellow-100'
              }`}>
                <Sun size={18} className={appearanceMode === 'light' ? 'text-white' : 'text-yellow-600'} />
              </div>
              <span className="text-xs text-foreground">Light</span>
            </button>

            {/* Dark Mode */}
            <button
              onClick={() => handleAppearanceChange('dark')}
              className={`flex-1 flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all ${
                appearanceMode === 'dark'
                  ? 'border-primary bg-gradient-to-br from-[#14B8A6]/10 via-[#06B6D4]/10 to-[#3B82F6]/10'
                  : 'border-border bg-card'
              }`}
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                appearanceMode === 'dark' ? 'bg-gradient-to-r from-[#14B8A6] via-[#06B6D4] to-[#3B82F6]' : 'bg-gray-700'
              }`}>
                <Moon size={18} className="text-white" />
              </div>
              <span className="text-xs text-foreground">Dark</span>
            </button>

            {/* Auto Mode */}
            <button
              onClick={() => handleAppearanceChange('auto')}
              className={`flex-1 flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all ${
                appearanceMode === 'auto'
                  ? 'border-primary bg-gradient-to-br from-[#14B8A6]/10 via-[#06B6D4]/10 to-[#3B82F6]/10'
                  : 'border-border bg-card'
              }`}
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                appearanceMode === 'auto' ? 'bg-gradient-to-r from-[#14B8A6] via-[#06B6D4] to-[#3B82F6]' : 'bg-gray-400'
              }`}>
                <Smartphone size={18} className="text-white" />
              </div>
              <span className="text-xs text-foreground">Auto</span>
            </button>
          </div>
        </div>

        {/* Account Section */}
        <div className="border-b border-border px-5 py-4">
          <div className="flex items-center gap-2 mb-3">
            <User size={16} className="text-muted-foreground" />
            <h2 className="text-sm text-foreground">Account</h2>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => alert('Email settings')}
              className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-3 text-left shadow-sm transition-all hover:shadow-md active:scale-98"
            >
              <span className="text-sm text-foreground">Email</span>
              <ChevronRight size={18} className="text-muted-foreground" />
            </button>

            <button
              onClick={() => alert('Profile settings')}
              className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-3 text-left shadow-sm transition-all hover:shadow-md active:scale-98"
            >
              <span className="text-sm text-foreground">Edit Profile</span>
              <ChevronRight size={18} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="border-b border-border px-5 py-4">
          <div className="flex items-center gap-2 mb-3">
            <Bell size={16} className="text-muted-foreground" />
            <h2 className="text-sm text-foreground">Notifications</h2>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-xl border border-border bg-card p-3 shadow-sm">
              <span className="text-sm text-foreground">Activity updates</span>
              <button
                onClick={() => setActivityUpdates(!activityUpdates)}
                className={`relative h-6 w-11 rounded-full transition-all ${
                  activityUpdates ? 'bg-gradient-to-r from-[#14B8A6] via-[#06B6D4] to-[#3B82F6]' : 'bg-switch-background'
                }`}
              >
                <div
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform ${
                    activityUpdates ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border bg-card p-3 shadow-sm">
              <span className="text-sm text-foreground">AI suggestions</span>
              <button
                onClick={() => setAiSuggestions(!aiSuggestions)}
                className={`relative h-6 w-11 rounded-full transition-all ${
                  aiSuggestions ? 'bg-gradient-to-r from-[#14B8A6] via-[#06B6D4] to-[#3B82F6]' : 'bg-switch-background'
                }`}
              >
                <div
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform ${
                    aiSuggestions ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border bg-card p-3 shadow-sm">
              <span className="text-sm text-foreground">Wolt recommendations</span>
              <button
                onClick={() => setWoltRecommendations(!woltRecommendations)}
                className={`relative h-6 w-11 rounded-full transition-all ${
                  woltRecommendations ? 'bg-gradient-to-r from-[#14B8A6] via-[#06B6D4] to-[#3B82F6]' : 'bg-switch-background'
                }`}
              >
                <div
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform ${
                    woltRecommendations ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border bg-card p-3 shadow-sm">
              <span className="text-sm text-foreground">Services reminders</span>
              <button
                onClick={() => setServicesReminders(!servicesReminders)}
                className={`relative h-6 w-11 rounded-full transition-all ${
                  servicesReminders ? 'bg-gradient-to-r from-[#14B8A6] via-[#06B6D4] to-[#3B82F6]' : 'bg-switch-background'
                }`}
              >
                <div
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-transform ${
                    servicesReminders ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="border-b border-border px-5 py-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={16} className="text-muted-foreground" />
            <h2 className="text-sm text-foreground">Privacy</h2>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => alert('Location permissions')}
              className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-3 text-left shadow-sm transition-all hover:shadow-md active:scale-98"
            >
              <span className="text-sm text-foreground">Location permissions</span>
              <ChevronRight size={18} className="text-muted-foreground" />
            </button>

            <button
              onClick={() => alert('Data usage')}
              className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-3 text-left shadow-sm transition-all hover:shadow-md active:scale-98"
            >
              <span className="text-sm text-foreground">Data usage</span>
              <ChevronRight size={18} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="border-b border-border px-5 py-4">
          <div className="flex items-center gap-2 mb-3">
            <Info size={16} className="text-muted-foreground" />
            <h2 className="text-sm text-foreground">About Roamy</h2>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => alert('Terms of Service')}
              className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-3 text-left shadow-sm transition-all hover:shadow-md active:scale-98"
            >
              <span className="text-sm text-foreground">Terms of Service</span>
              <ChevronRight size={18} className="text-muted-foreground" />
            </button>

            <button
              onClick={() => alert('Privacy Policy')}
              className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-3 text-left shadow-sm transition-all hover:shadow-md active:scale-98"
            >
              <span className="text-sm text-foreground">Privacy Policy</span>
              <ChevronRight size={18} className="text-muted-foreground" />
            </button>

            <div className="pt-3 text-center">
              <p className="text-xs text-muted-foreground">Version 1.0.0</p>
            </div>
          </div>
        </div>

        {/* Log out Button */}
        <div className="px-5 py-4">
          <button
            onClick={() => alert('Log out functionality')}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-destructive/20 bg-destructive/5 p-3 text-destructive transition-all hover:bg-destructive/10 active:scale-98"
          >
            <LogOut size={18} />
            <span className="text-sm">Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
