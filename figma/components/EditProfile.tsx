import { useState } from 'react';
import { X, Camera, Upload } from 'lucide-react';

type Props = {
  currentProfile: {
    name: string;
    bio: string;
    avatar: string;
    interests: string[];
  };
  onSave: (updatedProfile: {
    name: string;
    bio: string;
    avatar: string;
    interests: string[];
  }) => void;
  onClose: () => void;
};

export default function EditProfile({ currentProfile, onSave, onClose }: Props) {
  const [name, setName] = useState(currentProfile.name);
  const [bio, setBio] = useState(currentProfile.bio);
  const [avatar, setAvatar] = useState(currentProfile.avatar);
  const [interests, setInterests] = useState<string[]>(currentProfile.interests);
  const [newInterest, setNewInterest] = useState('');

  const availableInterests = [
    'Photography', 'Hiking', 'Coffee', 'Reading', 'Yoga', 'Running',
    'Art', 'Music', 'Food', 'Travel', 'Fitness', 'Nature',
    'Technology', 'Writing', 'Cycling', 'Meditation'
  ];

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const handleToggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleSave = () => {
    onSave({ name, bio, avatar, interests });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md max-h-[95vh] overflow-y-auto rounded-t-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/95 px-5 py-4 backdrop-blur-lg rounded-t-3xl">
          <h1 className="text-xl text-gray-900">Edit Profile</h1>
          <button
            onClick={onClose}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200 active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5">
          {/* Avatar */}
          <div className="mb-6">
            <label className="mb-3 block text-sm text-gray-700">Profile Photo</label>
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={avatar}
                  alt="Profile"
                  className="h-24 w-24 rounded-full bg-gray-200"
                />
                <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all hover:bg-blue-700 active:scale-95">
                  <Camera size={16} />
                </button>
              </div>
              <button className="flex items-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-600 transition-all hover:border-gray-400 hover:bg-gray-100 active:scale-98">
                <Upload size={16} />
                <span>Change Photo</span>
              </button>
            </div>
          </div>

          {/* Display Name */}
          <div className="mb-4">
            <label className="mb-2 block text-sm text-gray-700">Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Bio */}
          <div className="mb-6">
            <label className="mb-2 block text-sm text-gray-700">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell others about yourself..."
              rows={3}
              maxLength={150}
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
            <p className="mt-1 text-xs text-gray-500">{bio.length}/150 characters</p>
          </div>

          {/* Interests */}
          <div className="mb-6">
            <label className="mb-3 block text-sm text-gray-700">Interests</label>
            
            {/* Selected Interests */}
            {interests.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => handleToggleInterest(interest)}
                    className="rounded-full bg-blue-600 px-4 py-2 text-sm text-white transition-all hover:bg-blue-700 active:scale-95"
                  >
                    {interest} ×
                  </button>
                ))}
              </div>
            )}

            {/* Available Interests */}
            <div className="mb-3 flex flex-wrap gap-2">
              {availableInterests
                .filter(interest => !interests.includes(interest))
                .map((interest) => (
                  <button
                    key={interest}
                    onClick={() => handleToggleInterest(interest)}
                    className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-all hover:bg-gray-200 active:scale-95"
                  >
                    {interest} +
                  </button>
                ))}
            </div>

            {/* Add Custom Interest */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddInterest()}
                placeholder="Add custom interest"
                className="flex-1 rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={handleAddInterest}
                className="rounded-2xl bg-gray-100 px-4 py-2 text-sm text-gray-700 transition-all hover:bg-gray-200 active:scale-95"
              >
                Add
              </button>
            </div>
          </div>

          {/* Profile Photos Section */}
          <div className="mb-6">
            <label className="mb-3 block text-sm text-gray-700">Profile Photos</label>
            <div className="grid grid-cols-3 gap-2">
              {/* Add Photo Button */}
              <button className="aspect-square flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400 transition-all hover:border-gray-400 hover:bg-gray-100 active:scale-95">
                <Upload size={24} />
                <span className="text-xs">Add Photo</span>
              </button>
            </div>
          </div>

          {/* Privacy Settings Placeholder */}
          <div className="mb-6 rounded-2xl bg-gray-50 p-4">
            <h3 className="mb-2 text-sm text-gray-700">Privacy Settings</h3>
            <p className="text-xs text-gray-500">Manage who can see your profile and activities</p>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full rounded-2xl bg-blue-600 px-6 py-4 text-white transition-all hover:bg-blue-700 active:scale-98"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
