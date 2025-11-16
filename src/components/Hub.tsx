import { useState } from 'react';
import { 
  Sparkles, 
  Heart, 
  Calendar, 
  History, 
  TrendingUp, 
  Award, 
  ShoppingBag,
  Settings as SettingsIcon,
  ChevronRight,
  Moon,
  Sun,
  Bell,
  MapPin,
  LogOut,
  Zap,
  CloudRain,
  CloudSun,
  Cloud,
  Car,
  Users,
  TrendingDown,
  AlertCircle
} from 'lucide-react';

type Props = {
  onOpenSaved: () => void;
  onOpenPlanned: () => void;
  onOpenHistory: () => void;
  onOpenAIAssistant: () => void;
  onOpenAchievements: () => void;
  onOpenPurchases: () => void;
  darkMode: 'light' | 'dark' | 'auto';
  onDarkModeChange: (mode: 'light' | 'dark' | 'auto') => void;
  userXP: number;
  userLevel: number;
  userTier: string;
  nextLevelXP: number;
};

export default function Hub({
  onOpenSaved,
  onOpenPlanned,
  onOpenHistory,
  onOpenAIAssistant,
  onOpenAchievements,
  onOpenPurchases,
  darkMode,
  onDarkModeChange,
  userXP,
  userLevel,
  userTier,
  nextLevelXP,
}: Props) {
  const [showSettings, setShowSettings] = useState(false);

  const xpProgress = (userXP / nextLevelXP) * 100;

  // Mock data
  const topAchievements = [
    { id: 1, icon: '🌟', name: 'Explorer', color: 'from-yellow-400 to-orange-500' },
    { id: 2, icon: '🎯', name: 'Focused', color: 'from-blue-400 to-cyan-500' },
    { id: 3, icon: '🔥', name: 'Streak', color: 'from-red-400 to-pink-500' },
  ];

  const upcomingPurchases = [
    { id: 1, name: 'Wolt AI Pack - Premium', date: 'Dec 20, 2024', type: 'AI Pack' },
    { id: 2, name: 'Yoga Class Booking', date: 'Dec 18, 2024', type: 'Service' },
  ];

  const pastPurchases = [
    { id: 3, name: 'Wolt AI Pack - Starter', date: 'Nov 15, 2024', type: 'AI Pack' },
  ];

  if (showSettings) {
    return (
      <div className="flex h-full flex-col bg-background">
        {/* Settings Header */}
        <div className="border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl text-foreground">Settings</h1>
            <button
              onClick={() => setShowSettings(false)}
              className="text-sm text-primary"
            >
              Done
            </button>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Dark Mode */}
          <div className="rounded-2xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500">
                {darkMode === 'dark' ? (
                  <Moon size={20} className="text-white" />
                ) : (
                  <Sun size={20} className="text-white" />
                )}
              </div>
              <div>
                <h3 className="text-foreground">Appearance</h3>
                <p className="text-xs text-muted-foreground">Choose your theme</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onDarkModeChange('light')}
                className={`flex-1 rounded-xl px-4 py-2 text-sm transition-all ${
                  darkMode === 'light'
                    ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white'
                    : 'border border-border bg-background text-foreground'
                }`}
              >
                Light
              </button>
              <button
                onClick={() => onDarkModeChange('dark')}
                className={`flex-1 rounded-xl px-4 py-2 text-sm transition-all ${
                  darkMode === 'dark'
                    ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white'
                    : 'border border-border bg-background text-foreground'
                }`}
              >
                Dark
              </button>
              <button
                onClick={() => onDarkModeChange('auto')}
                className={`flex-1 rounded-xl px-4 py-2 text-sm transition-all ${
                  darkMode === 'auto'
                    ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white'
                    : 'border border-border bg-background text-foreground'
                }`}
              >
                Auto
              </button>
            </div>
          </div>

          {/* Notifications */}
          <button className="w-full rounded-2xl border border-border bg-card p-4 text-left transition-all hover:bg-secondary">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500">
                <Bell size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-foreground">Notifications</h3>
                <p className="text-xs text-muted-foreground">Manage alerts and updates</p>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </div>
          </button>

          {/* Location */}
          <button className="w-full rounded-2xl border border-border bg-card p-4 text-left transition-all hover:bg-secondary">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-500">
                <MapPin size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-foreground">Location</h3>
                <p className="text-xs text-muted-foreground">Location permissions</p>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </div>
          </button>

          {/* Logout */}
          <button className="w-full rounded-2xl border border-red-200 bg-red-50 p-4 text-left transition-all hover:bg-red-100 dark:border-red-900 dark:bg-red-950/30 dark:hover:bg-red-950/50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500">
                <LogOut size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-red-600 dark:text-red-400">Log Out</h3>
                <p className="text-xs text-red-500/70 dark:text-red-400/70">Sign out of your account</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <h1 className="text-xl text-foreground">Hub</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* AI Assistant - Large Entry Point */}
        <button
          onClick={onOpenAIAssistant}
          className="w-full rounded-3xl bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-500 p-6 text-left shadow-xl transition-all hover:shadow-2xl active:scale-98"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Sparkles size={32} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="mb-1 text-2xl text-white">Ask Roamy AI</h2>
              <p className="text-sm text-white/90">
                Get personalized recommendations & answers
              </p>
            </div>
            <ChevronRight size={28} className="text-white/80" />
          </div>
        </button>

        {/* Quick Access Cards */}
        <div className="space-y-3">
          {/* Saved */}
          <button
            onClick={onOpenSaved}
            className="w-full rounded-2xl border border-border bg-card text-left transition-all hover:bg-secondary active:scale-98 overflow-hidden"
          >
            <div className="flex items-center gap-3 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-500">
                <Heart size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-foreground">Saved Spots & Activities</h3>
                <p className="text-xs text-muted-foreground">23 saved items</p>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </div>
            {/* Contextual Metadata */}
            <div className="border-t border-border bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-950/30 dark:to-teal-950/30 px-4 py-2">
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                  <CloudSun size={14} />
                  <span>22°C, Sunny</span>
                </div>
                <div className="flex items-center gap-1 text-teal-600 dark:text-teal-400">
                  <Users size={14} />
                  <span>3 spots less crowded</span>
                </div>
              </div>
            </div>
          </button>

          {/* Planned */}
          <button
            onClick={onOpenPlanned}
            className="w-full rounded-2xl border border-border bg-card text-left transition-all hover:bg-secondary active:scale-98 overflow-hidden"
          >
            <div className="flex items-center gap-3 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500">
                <Calendar size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-foreground">Planned</h3>
                <p className="text-xs text-muted-foreground">5 upcoming activities</p>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </div>
            {/* Contextual Metadata */}
            <div className="border-t border-border bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30 px-4 py-2">
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                  <Car size={14} />
                  <span>Heavy traffic to next event</span>
                </div>
                <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                  <CloudRain size={14} />
                  <span>Rain expected</span>
                </div>
              </div>
            </div>
          </button>

          {/* History */}
          <button
            onClick={onOpenHistory}
            className="w-full rounded-2xl border border-border bg-card text-left transition-all hover:bg-secondary active:scale-98 overflow-hidden"
          >
            <div className="flex items-center gap-3 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-violet-500">
                <History size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-foreground">History</h3>
                <p className="text-xs text-muted-foreground">Past visits & reviews</p>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </div>
            {/* Contextual Metadata */}
            <div className="border-t border-border bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 px-4 py-2">
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                  <TrendingUp size={14} />
                  <span>15 activities this month</span>
                </div>
                <div className="flex items-center gap-1 text-pink-600 dark:text-pink-400">
                  <Award size={14} />
                  <span>2 new reviews</span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Your Progress */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp size={20} className="text-teal-500" />
              <h3 className="text-foreground">Your Progress</h3>
            </div>
            <button
              onClick={onOpenAchievements}
              className="text-xs text-teal-600 dark:text-teal-400"
            >
              View All
            </button>
          </div>

          {/* XP Bar */}
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Level {userLevel} • {userTier}
              </span>
              <span className="text-sm text-foreground">
                {userXP} / {nextLevelXP} XP
              </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>

          {/* Achievement Icons */}
          <div className="flex gap-2">
            {topAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex flex-1 flex-col items-center gap-1 rounded-xl border border-border bg-background p-3"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${achievement.color}`}>
                  <Award size={20} className="text-white" />
                </div>
                <span className="text-xs text-muted-foreground">{achievement.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Your Purchases */}
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-blue-500" />
              <h3 className="text-foreground">Your Purchases</h3>
            </div>
            <button
              onClick={onOpenPurchases}
              className="text-xs text-teal-600 dark:text-teal-400"
            >
              View All
            </button>
          </div>

          {/* Upcoming */}
          {upcomingPurchases.length > 0 && (
            <div className="mb-4">
              <h4 className="mb-2 text-xs text-muted-foreground">Upcoming</h4>
              <div className="space-y-2">
                {upcomingPurchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-blue-500">
                      <Zap size={18} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{purchase.name}</p>
                      <p className="text-xs text-muted-foreground">{purchase.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Past */}
          {pastPurchases.length > 0 && (
            <div>
              <h4 className="mb-2 text-xs text-muted-foreground">Past</h4>
              <div className="space-y-2">
                {pastPurchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="flex items-center gap-3 rounded-xl bg-secondary p-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Zap size={18} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{purchase.name}</p>
                      <p className="text-xs text-muted-foreground/70">{purchase.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Settings Module */}
        <button
          onClick={() => setShowSettings(true)}
          className="w-full rounded-2xl border border-border bg-card p-4 text-left transition-all hover:bg-secondary active:scale-98"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gray-500 to-gray-600">
              <SettingsIcon size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-foreground">Settings</h3>
              <p className="text-xs text-muted-foreground">Preferences & account</p>
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </div>
        </button>
      </div>
    </div>
  );
}