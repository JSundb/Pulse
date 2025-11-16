import { useState, useEffect } from 'react';
import { Home, Heart, MapPin, User, MessageCircle, Bell, Compass } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './components/ui/sonner';
import OnboardingCarousel from './components/OnboardingCarousel';
import ThemeExplorer from './components/ThemeExplorer';
import ThemedSwipeDeckSimple from './components/ThemedSwipeDeckSimple';
import SavedList from './components/SavedList';
import FutureLocationsSwipe from './components/FutureLocationsSwipe';
import SearchResults from './components/SearchResults';
import Hub from './components/Hub';
import AIAssistant from './components/AIAssistant';
import HubHistory from './components/HubHistory';
import HubPlanned from './components/HubPlanned';
import MessagesTab from './components/MessagesTab';
import ActivityChat from './components/ActivityChat';
import ActivityDetailsSimple from './components/ActivityDetailsSimple';
import Achievements from './components/Achievements';
import BadgeDetails from './components/BadgeDetails';
import NotificationCenter from './components/NotificationCenter';
import ThreadsOverview from './components/ThreadsOverview';
import ThreadDetails from './components/ThreadDetails';
import CreateThread from './components/CreateThread';
import type { Activity } from './App';

export default function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'saved' | 'locations' | 'hub' | 'messages' | 'notifications'>('home');
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [viewingActivity, setViewingActivity] = useState<Activity | null>(null);
  const [showActivityChat, setShowActivityChat] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<any>(null);
  const [userXP, setUserXP] = useState(420);
  const [darkMode, setDarkMode] = useState<'light' | 'dark' | 'auto'>('light');
  const [showThreadsOverview, setShowThreadsOverview] = useState(false);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [showCreateThread, setShowCreateThread] = useState(false);
  const [savedActivityIds, setSavedActivityIds] = useState<string[]>([]);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showHubHistory, setShowHubHistory] = useState(false);
  const [showHubPlanned, setShowHubPlanned] = useState(false);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (darkMode === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // Auto mode - check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [darkMode]);

  // Mock current user profile
  const currentUser = {
    id: 'user1',
    name: 'Jordan Smith',
    avatar: 'https://i.pravatar.cc/150?u=jordan',
    bio: 'Exploring the city one adventure at a time ✨',
    joinDate: 'Nov 2024',
    city: 'San Francisco',
    interests: ['Photography', 'Hiking', 'Coffee', 'Nature'],
    isOwnProfile: true,
    stats: {
      photos: 24,
      activities: 12,
      threads: 8,
    },
  };

  // Onboarding
  if (!hasCompletedOnboarding) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <div className="w-full max-w-[480px] overflow-hidden bg-background shadow-2xl">
          <OnboardingCarousel
            onComplete={() => {
              setHasCompletedOnboarding(true);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="flex h-screen w-full max-w-[480px] flex-col overflow-hidden bg-background shadow-2xl">
        <Toaster />
        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {/* Activity Details View */}
          {viewingActivity && !showActivityChat && !showThreadsOverview && !selectedThreadId && !showCreateThread && (
            <ActivityDetailsSimple
              activity={viewingActivity}
              onBack={() => setViewingActivity(null)}
              isSaved={savedActivityIds.includes(viewingActivity.id)}
              onSave={() => {
                const isSaved = savedActivityIds.includes(viewingActivity.id);
                if (isSaved) {
                  // Remove from saved
                  setSavedActivityIds(savedActivityIds.filter(id => id !== viewingActivity.id));
                  toast.success('Removed from saved');
                } else {
                  // Add to saved
                  setSavedActivityIds([...savedActivityIds, viewingActivity.id]);
                  toast.success('Saved!', {
                    description: `${viewingActivity.title} has been saved`,
                  });
                }
              }}
              onJoin={() => {
                // Handle join logic
                console.log('Joined activity');
                toast.success('Joined!', {
                  description: `You're going to ${viewingActivity.title}`,
                });
              }}
              onOpenThread={(threadId) => setSelectedThreadId(threadId)}
              onViewAllThreads={() => setShowThreadsOverview(true)}
              onCreateThread={() => setShowCreateThread(true)}
            />
          )}

          {/* Activity Chat View */}
          {showActivityChat && viewingActivity && (
            <ActivityChat
              activity={viewingActivity}
              onBack={() => setShowActivityChat(false)}
              onOpenActivity={() => {
                setShowActivityChat(false);
                // Activity details is already visible
              }}
            />
          )}

          {/* Threads Overview */}
          {showThreadsOverview && viewingActivity && (
            <ThreadsOverview
              activity={viewingActivity}
              onBack={() => setShowThreadsOverview(false)}
              onOpenThread={(threadId) => {
                setSelectedThreadId(threadId);
                setShowThreadsOverview(false);
              }}
              onCreateThread={() => {
                setShowThreadsOverview(false);
                setShowCreateThread(true);
              }}
            />
          )}

          {/* Thread Details */}
          {selectedThreadId && (
            <ThreadDetails
              threadId={selectedThreadId}
              onBack={() => setSelectedThreadId(null)}
            />
          )}

          {/* Create Thread */}
          {showCreateThread && (
            <CreateThread
              onBack={() => setShowCreateThread(false)}
              onSubmit={(threadData) => {
                console.log('Thread created:', threadData);
                setShowCreateThread(false);
                // Optionally open the new thread
              }}
            />
          )}

          {!viewingActivity && !showActivityChat && showSearch && (
            <SearchResults onBack={() => setShowSearch(false)} />
          )}

          {!viewingActivity && !showActivityChat && !showSearch && activeTab === 'home' && !selectedThemeId && (
            <ThemeExplorer
              onSelectTheme={(themeId) => setSelectedThemeId(themeId)}
              onOpenSearch={() => setShowSearch(true)}
            />
          )}

          {!viewingActivity && !showActivityChat && !showSearch && activeTab === 'home' && selectedThemeId && (
            <ThemedSwipeDeckSimple
              themeId={selectedThemeId}
              onBack={() => setSelectedThemeId(null)}
            />
          )}

          {!viewingActivity && !showActivityChat && !showSearch && activeTab === 'saved' && (
            <SavedList onOpenActivity={(activity) => setViewingActivity(activity)} />
          )}

          {!viewingActivity && !showActivityChat && !showSearch && activeTab === 'locations' && (
            <FutureLocationsSwipe />
          )}

          {!viewingActivity && !showActivityChat && !showSearch && activeTab === 'hub' && !showAIAssistant && !showHubHistory && !showHubPlanned && !showAchievements && !selectedBadge && (
            <Hub
              onOpenSaved={() => setActiveTab('saved')}
              onOpenPlanned={() => setShowHubPlanned(true)}
              onOpenHistory={() => setShowHubHistory(true)}
              onOpenAIAssistant={() => setShowAIAssistant(true)}
              onOpenAchievements={() => setShowAchievements(true)}
              onOpenPurchases={() => {}} // TODO: Create purchases view
              darkMode={darkMode}
              onDarkModeChange={(mode) => setDarkMode(mode)}
              userXP={userXP}
              userLevel={4}
              userTier="Explorer"
              nextLevelXP={500}
            />
          )}

          {/* AI Assistant */}
          {showAIAssistant && (
            <AIAssistant
              onBack={() => setShowAIAssistant(false)}
            />
          )}

          {/* Hub History */}
          {showHubHistory && (
            <HubHistory
              onBack={() => setShowHubHistory(false)}
            />
          )}

          {/* Hub Planned */}
          {showHubPlanned && (
            <HubPlanned
              onBack={() => setShowHubPlanned(false)}
            />
          )}

          {!viewingActivity && !showActivityChat && !showSearch && activeTab === 'messages' && (
            <MessagesTab onOpenChat={(activityId, activityName, spotName) => {
              // For demo, we need to create a mock activity
              // In production, this would fetch the activity by ID
              const mockActivity: Activity = {
                id: activityId,
                title: activityName,
                description: `Activity at ${spotName}`,
                fullDescription: `This is a demo activity for ${activityName} at ${spotName}`,
                photo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
                photos: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'],
                category: 'Activity',
                activityType: 'active-social',
                vibe: ['Social', 'Fun'],
                timeContext: 'Anytime',
                indoor: false,
                distance: '1.2 km',
                savedByCount: 50,
                goodFor: ['Socializing'],
                location: spotName,
                costLevel: 'Free',
                averageRating: 4.5,
                totalRatings: 25,
                communityPhotos: [],
                threads: [],
                currentConditions: {
                  crowdLevel: 'Moderate',
                  atmosphere: 'Friendly',
                },
              };
              setViewingActivity(mockActivity);
              setShowActivityChat(true);
            }} />
          )}

          {!viewingActivity && !showActivityChat && !showSearch && activeTab === 'notifications' && !showAchievements && !selectedBadge && (
            <NotificationCenter
              onBack={() => setActiveTab('home')}
            />
          )}

          {showAchievements && !selectedBadge && (
            <Achievements
              onBack={() => setShowAchievements(false)}
              onSelectBadge={(badge) => setSelectedBadge(badge)}
            />
          )}

          {selectedBadge && (
            <BadgeDetails
              badge={selectedBadge}
              onBack={() => setSelectedBadge(null)}
            />
          )}
        </div>

        {/* Bottom Navigation - Hide when viewing activity details or chat */}
        {!viewingActivity && !showActivityChat && (
          <nav className="flex items-center justify-around border-t border-border bg-card px-6 py-3 shadow-sm">
            <button
              onClick={() => {
                setActiveTab('home');
                setSelectedThemeId(null);
              }}
              className={`flex flex-col items-center gap-1 transition-all ${
                activeTab === 'home' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
              <span className="text-xs">Home</span>
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`flex flex-col items-center gap-1 transition-all ${
                activeTab === 'saved' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Heart size={24} strokeWidth={activeTab === 'saved' ? 2.5 : 2} />
              <span className="text-xs">Saved</span>
            </button>

            <button
              onClick={() => setActiveTab('locations')}
              className={`flex flex-col items-center gap-1 transition-all ${
                activeTab === 'locations' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <MapPin size={24} strokeWidth={activeTab === 'locations' ? 2.5 : 2} />
              <span className="text-xs">Locations</span>
            </button>

            <button
              onClick={() => setActiveTab('hub')}
              className={`flex flex-col items-center gap-1 transition-all ${
                activeTab === 'hub' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Compass size={24} strokeWidth={activeTab === 'hub' ? 2.5 : 2} />
              <span className="text-xs">Hub</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`flex flex-col items-center gap-1 transition-all ${
                activeTab === 'messages' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <MessageCircle size={24} strokeWidth={activeTab === 'messages' ? 2.5 : 2} />
              <span className="text-xs">Messages</span>
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex flex-col items-center gap-1 transition-all ${
                activeTab === 'notifications' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Bell size={24} strokeWidth={activeTab === 'notifications' ? 2.5 : 2} />
              <span className="text-xs">Notifications</span>
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}