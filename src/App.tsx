import { useState } from 'react';
import { Home, Heart, MapPin, User, MessageCircle } from 'lucide-react';
import OnboardingSimple from './components/OnboardingSimple';
import ThemeExplorer from './components/ThemeExplorer';
import ThemedSwipeDeckSimple from './components/ThemedSwipeDeckSimple';
import SavedList from './components/SavedList';
import FutureLocationsSwipe from './components/FutureLocationsSwipe';
import SearchResults from './components/SearchResults';
import UserProfile from './components/UserProfile';
import EditProfile from './components/EditProfile';
import MessagesTab from './components/MessagesTab';
import ActivityChat from './components/ActivityChat';
import ActivityDetailsSimple from './components/ActivityDetailsSimple';
import type { Activity } from './App';

export default function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'saved' | 'locations' | 'profile' | 'messages'>('home');
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const [viewingActivity, setViewingActivity] = useState<Activity | null>(null);
  const [showActivityChat, setShowActivityChat] = useState<{ activityId: string; activityName: string; spotName: string } | null>(null);

  // Mock current user profile
  const currentUser = {
    id: 'user1',
    name: 'Jordan Smith',
    avatar: 'https://i.pravatar.cc/150?u=jordan',
    bio: 'Exploring the city one adventure at a time ✨',
    joinDate: 'Nov 2024',
    city: 'San Francisco',
    interests: userInterests.length > 0 ? userInterests : ['Photography', 'Hiking', 'Coffee', 'Nature'],
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
      <OnboardingSimple
        onComplete={(interests) => {
          setUserInterests(interests);
          setHasCompletedOnboarding(true);
        }}
      />
    );
  }

  // Edit Profile Modal
  if (showEditProfile) {
    return (
      <EditProfile
        currentProfile={{
          name: currentUser.name,
          bio: currentUser.bio,
          avatar: currentUser.avatar,
          interests: currentUser.interests,
        }}
        onSave={(updatedProfile) => {
          setUserInterests(updatedProfile.interests);
          setShowEditProfile(false);
        }}
        onClose={() => setShowEditProfile(false)}
      />
    );
  }

  return (
    <div className="flex h-screen flex-col bg-white">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Activity Details View */}
        {viewingActivity && !showActivityChat && (
          <ActivityDetailsSimple
            activity={viewingActivity}
            onBack={() => setViewingActivity(null)}
            onSave={() => {
              // Handle save logic
              console.log('Saved activity');
            }}
            onJoin={() => {
              // Handle join logic
              console.log('Joined activity');
            }}
          />
        )}

        {/* Activity Chat View */}
        {showActivityChat && viewingActivity && (
          <ActivityChat
            activity={viewingActivity}
            onBack={() => setShowActivityChat(null)}
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

        {!viewingActivity && !showActivityChat && !showSearch && activeTab === 'profile' && (
          <UserProfile
            user={currentUser}
            onBack={() => {}}
            onEditProfile={() => setShowEditProfile(true)}
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
            setShowActivityChat({ activityId, activityName, spotName });
          }} />
        )}
      </div>

      {/* Bottom Navigation - Hide when viewing activity details or chat */}
      {!viewingActivity && !showActivityChat && (
        <nav className="flex items-center justify-around border-t border-gray-200 bg-white px-6 py-3">
          <button
            onClick={() => {
              setActiveTab('home');
              setSelectedThemeId(null);
            }}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'home' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <Home size={24} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
            <span className="text-xs">Home</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'saved' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <Heart size={24} strokeWidth={activeTab === 'saved' ? 2.5 : 2} />
            <span className="text-xs">Saved</span>
          </button>

          <button
            onClick={() => setActiveTab('locations')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'locations' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <MapPin size={24} strokeWidth={activeTab === 'locations' ? 2.5 : 2} />
            <span className="text-xs">Locations</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
            <span className="text-xs">Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`flex flex-col items-center gap-1 transition-all ${
              activeTab === 'messages' ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <MessageCircle size={24} strokeWidth={activeTab === 'messages' ? 2.5 : 2} />
            <span className="text-xs">Messages</span>
          </button>
        </nav>
      )}
    </div>
  );
}