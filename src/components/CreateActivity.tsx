import { useState } from 'react';
import { X, Upload, MapPin, Calendar, Users, Route as RouteIcon, Snowflake } from 'lucide-react';
import type { Activity } from '../App';

type Props = {
  onClose: () => void;
  onCreate: (activity: Partial<Activity>) => void;
};

type ActivityCreationType = 'spot' | 'meetup' | 'route' | 'seasonal';

export default function CreateActivity({ onClose, onCreate }: Props) {
  const [step, setStep] = useState<'type' | 'details'>('type');
  const [activityType, setActivityType] = useState<ActivityCreationType>('spot');
  
  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  
  // Route fields
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Moderate' | 'Hard'>('Easy');
  const [startPoint, setStartPoint] = useState('');
  
  // Seasonal fields
  const [season, setSeason] = useState<'Spring' | 'Summer' | 'Fall' | 'Winter'>('Summer');
  const [activeDates, setActiveDates] = useState('');
  const [bestTimeToGo, setBestTimeToGo] = useState('');

  const handleCreate = () => {
    const baseActivity: Partial<Activity> = {
      id: `user-${Date.now()}`,
      title,
      description,
      fullDescription: description,
      category,
      location,
      photo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      photos: [],
      vibe: [],
      distance: '0 km',
      savedByCount: 0,
      goodFor: [],
      costLevel: 'Free',
      averageRating: 0,
      totalRatings: 0,
      communityPhotos: [],
      threads: [],
      currentConditions: {
        crowdLevel: 'New activity',
        atmosphere: 'Just created',
      },
      creator: {
        id: 'current-user',
        name: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user',
      },
    };

    if (activityType === 'meetup') {
      onCreate({
        ...baseActivity,
        contentType: 'user-created',
        activityType: 'active-social',
        scheduledTime,
        maxParticipants: maxParticipants ? parseInt(maxParticipants) : undefined,
        participants: [],
      });
    } else if (activityType === 'route') {
      onCreate({
        ...baseActivity,
        contentType: 'route',
        activityType: 'solo',
        route: {
          distance,
          duration,
          difficulty,
          startPoint,
          waypoints: [],
          mapPreviewUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800',
        },
      });
    } else if (activityType === 'seasonal') {
      onCreate({
        ...baseActivity,
        contentType: 'seasonal',
        activityType: 'solo',
        seasonal: {
          season,
          activeDates,
          bestTimeToGo,
          difficulty,
        },
      });
    } else {
      onCreate({
        ...baseActivity,
        contentType: 'user-created',
        activityType: 'solo',
      });
    }

    onClose();
  };

  if (step === 'type') {
    return (
      <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
        <div className="w-full max-w-lg rounded-t-3xl bg-white p-6 shadow-2xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl text-gray-900">Create Activity</h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:bg-gray-100 active:scale-95"
            >
              <X size={24} />
            </button>
          </div>

          <p className="mb-6 text-sm text-gray-600">What kind of activity do you want to create?</p>

          <div className="space-y-3">
            <button
              onClick={() => {
                setActivityType('spot');
                setStep('details');
              }}
              className="w-full rounded-2xl border-2 border-gray-200 bg-white p-4 text-left transition-all hover:border-blue-500 hover:bg-blue-50 active:scale-98"
            >
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <MapPin size={20} className="text-blue-600" />
                </div>
                <h3 className="text-gray-900">Spot Activity</h3>
              </div>
              <p className="text-sm text-gray-600">Share a cool place or activity spot</p>
            </button>

            <button
              onClick={() => {
                setActivityType('meetup');
                setStep('details');
              }}
              className="w-full rounded-2xl border-2 border-gray-200 bg-white p-4 text-left transition-all hover:border-green-500 hover:bg-green-50 active:scale-98"
            >
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <Users size={20} className="text-green-600" />
                </div>
                <h3 className="text-gray-900">User Meetup</h3>
              </div>
              <p className="text-sm text-gray-600">Organize a meetup with other users</p>
            </button>

            <button
              onClick={() => {
                setActivityType('route');
                setStep('details');
              }}
              className="w-full rounded-2xl border-2 border-gray-200 bg-white p-4 text-left transition-all hover:border-purple-500 hover:bg-purple-50 active:scale-98"
            >
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                  <RouteIcon size={20} className="text-purple-600" />
                </div>
                <h3 className="text-gray-900">Route Activity</h3>
              </div>
              <p className="text-sm text-gray-600">Create a walking, running, or biking route</p>
            </button>

            <button
              onClick={() => {
                setActivityType('seasonal');
                setStep('details');
              }}
              className="w-full rounded-2xl border-2 border-gray-200 bg-white p-4 text-left transition-all hover:border-amber-500 hover:bg-amber-50 active:scale-98"
            >
              <div className="mb-2 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                  <Snowflake size={20} className="text-amber-600" />
                </div>
                <h3 className="text-gray-900">Seasonal Activity</h3>
              </div>
              <p className="text-sm text-gray-600">Create a time-limited seasonal activity</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div className="h-[90vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setStep('type')}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            ← Back
          </button>
          <h2 className="text-2xl text-gray-900">
            {activityType === 'spot' && 'New Spot Activity'}
            {activityType === 'meetup' && 'New Meetup'}
            {activityType === 'route' && 'New Route'}
            {activityType === 'seasonal' && 'New Seasonal Activity'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 active:scale-95"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-5">
          {/* Common fields */}
          <div>
            <label className="mb-2 block text-sm text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your activity a name"
              className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your activity"
              rows={4}
              className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-700">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Hiking, Café, Fitness"
              className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where is this activity?"
              className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Meetup specific fields */}
          {activityType === 'meetup' && (
            <>
              <div>
                <label className="mb-2 block text-sm text-gray-700">
                  <Calendar size={16} className="mr-1 inline" />
                  Scheduled Time (Optional)
                </label>
                <input
                  type="text"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  placeholder="e.g., Saturday 3 PM"
                  className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-700">
                  <Users size={16} className="mr-1 inline" />
                  Max Participants (Optional)
                </label>
                <input
                  type="number"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(e.target.value)}
                  placeholder="e.g., 10"
                  className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </>
          )}

          {/* Route specific fields */}
          {activityType === 'route' && (
            <>
              <div>
                <label className="mb-2 block text-sm text-gray-700">Start Point</label>
                <input
                  type="text"
                  value={startPoint}
                  onChange={(e) => setStartPoint(e.target.value)}
                  placeholder="Where does the route start?"
                  className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-sm text-gray-700">Distance</label>
                  <input
                    type="text"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    placeholder="e.g., 5 km"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-700">Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g., 45 min"
                    className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-700">Difficulty</label>
                <div className="flex gap-2">
                  {(['Easy', 'Moderate', 'Hard'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`flex-1 rounded-xl border-2 py-2 text-sm transition-all ${
                        difficulty === level
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Seasonal specific fields */}
          {activityType === 'seasonal' && (
            <>
              <div>
                <label className="mb-2 block text-sm text-gray-700">Season</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Spring', 'Summer', 'Fall', 'Winter'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSeason(s)}
                      className={`rounded-xl border-2 py-2 text-sm transition-all ${
                        season === s
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-700">Active Dates</label>
                <input
                  type="text"
                  value={activeDates}
                  onChange={(e) => setActiveDates(e.target.value)}
                  placeholder="e.g., June 1 - August 31"
                  className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-700">Best Time to Go</label>
                <input
                  type="text"
                  value={bestTimeToGo}
                  onChange={(e) => setBestTimeToGo(e.target.value)}
                  placeholder="e.g., Early morning or sunset"
                  className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-700">Difficulty (Optional)</label>
                <div className="flex gap-2">
                  {(['Easy', 'Moderate', 'Hard'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`flex-1 rounded-xl border-2 py-2 text-sm transition-all ${
                        difficulty === level
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Photo upload placeholder */}
          <div>
            <label className="mb-2 block text-sm text-gray-700">Photos (Optional)</label>
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 py-8 text-gray-500 hover:border-gray-400 hover:bg-gray-100 active:scale-98">
              <Upload size={20} />
              <span className="text-sm">Upload photos</span>
            </button>
          </div>

          {/* Create button */}
          <button
            onClick={handleCreate}
            disabled={!title || !description || !location}
            className="w-full rounded-2xl bg-blue-600 py-4 text-white transition-all hover:bg-blue-700 active:scale-98 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Create Activity
          </button>
        </div>
      </div>
    </div>
  );
}
