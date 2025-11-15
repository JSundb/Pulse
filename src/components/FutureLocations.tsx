import { useState } from 'react';
import { motion } from 'motion/react';
import type { FutureLocation, Activity } from '../App';
import { MapPin, Plus, Calendar, ChevronRight, X, ArrowLeft } from 'lucide-react';
import SwipeDeck from './SwipeDeck';

type Props = {
  locations: FutureLocation[];
  onAddLocation: (location: FutureLocation) => void;
  onRemoveLocation: (id: string) => void;
  allActivities: Activity[];
  onSaveActivity: (activity: Activity) => void;
  savedActivities: Activity[];
  onMarkAsWent: (activityId: string) => void;
  completedActivities: string[];
};

export default function FutureLocations({ locations, onAddLocation, onRemoveLocation, allActivities, onSaveActivity, savedActivities, onMarkAsWent, completedActivities }: Props) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<FutureLocation | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    dateRange: '',
  });

  const handleAdd = () => {
    if (formData.name && formData.address && formData.dateRange) {
      onAddLocation({
        id: Date.now().toString(),
        ...formData,
      });
      setFormData({ name: '', address: '', dateRange: '' });
      setShowAddForm(false);
    }
  };

  // If viewing a specific location's activities
  if (selectedLocation) {
    return (
      <div className="h-full flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Banner showing we're browsing a future location */}
        <div className="bg-blue-600 px-6 py-4 text-white">
          <button
            onClick={() => setSelectedLocation(null)}
            className="mb-2 flex items-center gap-2 text-sm text-blue-100 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to locations
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg">{selectedLocation.name}</h2>
              <p className="text-sm text-blue-100">{selectedLocation.dateRange}</p>
            </div>
            <div className="rounded-xl bg-white/20 px-3 py-1.5 backdrop-blur-sm">
              <p className="text-xs">Browsing future location</p>
            </div>
          </div>
        </div>

        {/* Activity swipe deck for this location */}
        <div className="flex-1">
          <SwipeDeck
            activities={allActivities}
            onSaveActivity={onSaveActivity}
            savedActivities={savedActivities}
            onMarkAsWent={onMarkAsWent}
            completedActivities={completedActivities}
            themes={[]}
            onSelectTheme={() => {}}
            onMoreThemes={() => {}}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <h1 className="mb-2 text-3xl text-gray-900">Future Locations</h1>
        <p className="text-gray-600">
          Plan activities for upcoming trips and future addresses
        </p>
      </div>

      {/* Add New Location Button */}
      <div className="px-6 mb-6">
        <button
          onClick={() => setShowAddForm(true)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-white shadow-lg transition-all hover:bg-blue-700 active:scale-95"
        >
          <Plus size={20} />
          Add Future Location
        </button>
      </div>

      {/* Locations List */}
      <div className="px-6 pb-6">
        {locations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 text-6xl">🗺️</div>
            <h2 className="mb-2 text-xl text-gray-900">No future locations yet</h2>
            <p className="text-gray-600">
              Add cities or addresses you plan to visit
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="overflow-hidden rounded-2xl bg-white shadow-md transition-all hover:shadow-xl"
              >
                <div className="p-5">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="mb-1 text-xl text-gray-900">{location.name}</h3>
                      <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={14} className="text-gray-400" />
                        <span>{location.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={14} className="text-gray-400" />
                        <span>{location.dateRange}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveLocation(location.id)}
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-gray-200 active:scale-95"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => setSelectedLocation(location)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm text-white transition-all hover:bg-blue-700 active:scale-95"
                  >
                    View Suggested Activities
                    <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add Location Modal */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowAddForm(false)}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', damping: 35, stiffness: 350 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl text-gray-900">Add Location</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-gray-700">City/Location Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Vienna"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-700">Address/Area</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g., Historic District, Vienna"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-700">Date Range</label>
                <input
                  type="text"
                  value={formData.dateRange}
                  onChange={(e) => setFormData({ ...formData, dateRange: e.target.value })}
                  placeholder="e.g., May 12-15"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <button
                onClick={handleAdd}
                disabled={!formData.name || !formData.address || !formData.dateRange}
                className={`w-full rounded-2xl px-6 py-4 text-white transition-all ${
                  formData.name && formData.address && formData.dateRange
                    ? 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Add Location
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}