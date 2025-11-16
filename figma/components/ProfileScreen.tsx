import { useState } from 'react';
import { motion } from 'motion/react';
import type { UserPreferences } from '../App';
import { User, Bell, MapPin, Users, Settings, ChevronRight } from 'lucide-react';

type Props = {
  preferences: UserPreferences;
  onUpdatePreferences: (preferences: UserPreferences) => void;
};

const ALL_INTERESTS = [
  'Fitness',
  'Cafés',
  'Studying',
  'Nature',
  'Photography',
  'Socializing',
  'Cheap Eats',
  'Quiet Spaces',
  'Sports',
  'Art & Culture',
  'Walking',
  'Coworking',
];

export default function ProfileScreen({ preferences, onUpdatePreferences }: Props) {
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [tempInterests, setTempInterests] = useState(preferences.interests);

  const toggleInterest = (interest: string) => {
    if (tempInterests.includes(interest)) {
      setTempInterests(tempInterests.filter(i => i !== interest));
    } else {
      setTempInterests([...tempInterests, interest]);
    }
  };

  const saveInterests = () => {
    onUpdatePreferences({ ...preferences, interests: tempInterests });
    setIsEditingInterests(false);
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-20">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg">
            <User size={36} strokeWidth={2} />
          </div>
          <div>
            <h1 className="mb-1 text-2xl text-gray-900">Your Profile</h1>
            <p className="text-sm text-gray-600">Customize your activity preferences</p>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="px-6 pb-6 space-y-4">
        {/* Interests */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-md">
          <div className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg text-gray-900">Your Interests</h2>
              <button
                onClick={() => {
                  if (isEditingInterests) {
                    saveInterests();
                  } else {
                    setTempInterests(preferences.interests);
                    setIsEditingInterests(true);
                  }
                }}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                {isEditingInterests ? 'Save' : 'Edit'}
              </button>
            </div>
            
            {!isEditingInterests ? (
              <div className="flex flex-wrap gap-2">
                {preferences.interests.map(interest => (
                  <span key={interest} className="rounded-full bg-blue-600 px-3 py-1.5 text-sm text-white">
                    {interest}
                  </span>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {ALL_INTERESTS.map(interest => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`rounded-full px-3 py-1.5 text-sm transition-all ${
                      tempInterests.includes(interest)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mood/Energy Level */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-md">
          <div className="p-5">
            <h2 className="mb-3 text-lg text-gray-900">Energy Level</h2>
            <div className="space-y-2">
              <button
                onClick={() => onUpdatePreferences({ ...preferences, mood: 'chill' })}
                className={`w-full rounded-xl p-3 text-left transition-all ${
                  preferences.mood === 'chill'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                }`}
              >
                <div className="text-base">Low energy / Chill</div>
                <p className={`text-sm ${preferences.mood === 'chill' ? 'text-blue-100' : 'text-gray-600'}`}>
                  Quiet cafés, peaceful walks, solo activities
                </p>
              </button>
              
              <button
                onClick={() => onUpdatePreferences({ ...preferences, mood: 'normal' })}
                className={`w-full rounded-xl p-3 text-left transition-all ${
                  preferences.mood === 'normal'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                }`}
              >
                <div className="text-base">Normal / Balanced</div>
                <p className={`text-sm ${preferences.mood === 'normal' ? 'text-blue-100' : 'text-gray-600'}`}>
                  Mix of everything
                </p>
              </button>
              
              <button
                onClick={() => onUpdatePreferences({ ...preferences, mood: 'active' })}
                className={`w-full rounded-xl p-3 text-left transition-all ${
                  preferences.mood === 'active'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                }`}
              >
                <div className="text-base">High energy / Active</div>
                <p className={`text-sm ${preferences.mood === 'active' ? 'text-blue-100' : 'text-gray-600'}`}>
                  Sports, social meetups, exploring
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Social Preferences */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-md">
          <div className="p-5">
            <h2 className="mb-3 text-lg text-gray-900">Social Preferences</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-base text-gray-900">Open to meeting people</div>
                  <p className="text-sm text-gray-600">Show shared activities and micro-groups</p>
                </div>
                <button
                  onClick={() => onUpdatePreferences({ ...preferences, openToMeeting: !preferences.openToMeeting })}
                  className={`relative h-8 w-14 rounded-full transition-colors ${
                    preferences.openToMeeting ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <motion.div
                    className="absolute top-1 h-6 w-6 rounded-full bg-white shadow-md"
                    animate={{ left: preferences.openToMeeting ? 30 : 4 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-base text-gray-900">Show solo activities only</div>
                  <p className="text-sm text-gray-600">Hide all social and group activities</p>
                </div>
                <button
                  onClick={() => onUpdatePreferences({ ...preferences, showSoloOnly: !preferences.showSoloOnly })}
                  className={`relative h-8 w-14 rounded-full transition-colors ${
                    preferences.showSoloOnly ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <motion.div
                    className="absolute top-1 h-6 w-6 rounded-full bg-white shadow-md"
                    animate={{ left: preferences.showSoloOnly ? 30 : 4 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Settings */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-md">
          <button className="flex w-full items-center justify-between p-5 text-left transition-all hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-gray-400" />
              <div className="text-base text-gray-900">Notifications</div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
          
          <div className="h-px bg-gray-100" />
          
          <button className="flex w-full items-center justify-between p-5 text-left transition-all hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <MapPin size={20} className="text-gray-400" />
              <div className="text-base text-gray-900">Location Permissions</div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
          
          <div className="h-px bg-gray-100" />
          
          <button className="flex w-full items-center justify-between p-5 text-left transition-all hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <Settings size={20} className="text-gray-400" />
              <div className="text-base text-gray-900">App Settings</div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        </div>

        {/* App Info */}
        <div className="py-6 text-center text-sm text-gray-500">
          <p>Roamy v1.0.0</p>
          <p className="mt-1">Discover • Connect • Explore</p>
        </div>
      </div>
    </div>
  );
}