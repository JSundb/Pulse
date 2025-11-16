import { User, Bell, MapPin, Settings, ChevronRight } from 'lucide-react';

export default function Profile() {
  return (
    <div className="h-full overflow-y-auto bg-white">
      {/* Header */}
      <div className="border-b border-gray-200/80 bg-gradient-to-br from-blue-50 to-purple-50 px-6 py-8">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg">
            <div className="flex h-full w-full items-center justify-center text-3xl text-white">
              👤
            </div>
          </div>
          <div>
            <h1 className="mb-1 text-2xl text-gray-900">Your Profile</h1>
            <p className="text-sm text-gray-600">Discover nearby experiences</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 p-6">
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 text-center">
          <div className="mb-1 text-2xl text-blue-600">12</div>
          <div className="text-xs text-gray-600">Events Saved</div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 p-4 text-center">
          <div className="mb-1 text-2xl text-purple-600">8</div>
          <div className="text-xs text-gray-600">Attended</div>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-green-50 to-green-100/50 p-4 text-center">
          <div className="mb-1 text-2xl text-green-600">24</div>
          <div className="text-xs text-gray-600">Discovered</div>
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-2 px-4 pb-24">
        <div className="mb-2 px-2 text-xs tracking-wider text-gray-400">PREFERENCES</div>
        
        <button className="w-full rounded-xl bg-white p-4 text-left shadow-sm transition-all hover:shadow-md active:scale-[0.98]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                <User size={18} className="text-blue-600" />
              </div>
              <div>
                <div className="text-gray-900">Edit Profile</div>
                <div className="text-xs text-gray-500">Update your information</div>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-300" />
          </div>
        </button>

        <button className="w-full rounded-xl bg-white p-4 text-left shadow-sm transition-all hover:shadow-md active:scale-[0.98]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50">
                <Bell size={18} className="text-purple-600" />
              </div>
              <div>
                <div className="text-gray-900">Notifications</div>
                <div className="text-xs text-gray-500">Manage your alerts</div>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-300" />
          </div>
        </button>

        <button className="w-full rounded-xl bg-white p-4 text-left shadow-sm transition-all hover:shadow-md active:scale-[0.98]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                <MapPin size={18} className="text-green-600" />
              </div>
              <div>
                <div className="text-gray-900">Location Settings</div>
                <div className="text-xs text-gray-500">Adjust search radius</div>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-300" />
          </div>
        </button>

        <button className="w-full rounded-xl bg-white p-4 text-left shadow-sm transition-all hover:shadow-md active:scale-[0.98]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50">
                <Settings size={18} className="text-orange-600" />
              </div>
              <div>
                <div className="text-gray-900">App Settings</div>
                <div className="text-xs text-gray-500">Preferences & privacy</div>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-300" />
          </div>
        </button>
      </div>
    </div>
  );
}