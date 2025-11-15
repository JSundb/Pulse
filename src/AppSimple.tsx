import { useState } from 'react';
import { Home, Heart, MapPin, User, MessageCircle } from 'lucide-react';
import OnboardingSimple from './components/OnboardingSimple';
import ThemeExplorer from './components/ThemeExplorer';
import ThemedSwipeDeckSimple from './components/ThemedSwipeDeckSimple';
import SavedActivities from './components/SavedActivities';
import FutureLocations from './components/FutureLocations';
import UserProfile from './components/UserProfile';
import EditProfile from './components/EditProfile';
import MessagesScreen from './components/MessagesScreen';

export default function AppSimple() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'saved' | 'locations' | 'profile' | 'messages'>('home');
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [showEditProfile, setShowEditProfile] = useState(false);

  // Mock user profile
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

  if (!hasCompletedOnboarding) {
    return (
      <OnboardingSimple
        onComplete={(interests) => {
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
          // Save profile changes
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
        {activeTab === 'home' && !selectedThemeId && (
          <ThemeExplorer onSelectTheme={(themeId) => setSelectedThemeId(themeId)} />
        )}

        {activeTab === 'home' && selectedThemeId && (
          <ThemedSwipeDeckSimple
            themeId={selectedThemeId}
            onBack={() => setSelectedThemeId(null)}
          />
        )}

        {activeTab === 'saved' && (
          <div className="flex h-full items-center justify-center p-8 text-center">
            <div>
              <div className="mb-4 text-6xl">💾</div>
              <h2 className="mb-2 text-2xl text-gray-900">Saved Activities</h2>
              <p className="text-gray-600">Your saved spots and activities will appear here</p>
            </div>
          </div>
        )}

        {activeTab === 'locations' && (
          <div className="flex h-full items-center justify-center p-8 text-center">
            <div>
              <div className="mb-4 text-6xl">🗺️</div>
              <h2 className="mb-2 text-2xl text-gray-900">Future Locations</h2>
              <p className="text-gray-600">Plan trips and discover activities in new places</p>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <UserProfile
            user={currentUser}
            onBack={() => {}}
            onEditProfile={() => setShowEditProfile(true)}
          />
        )}

        {activeTab === 'messages' && <MessagesScreen />}
      </div>

      {/* Bottom Navigation */}
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
    </div>
  );
}
