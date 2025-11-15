import { ArrowLeft } from 'lucide-react';
import UniversalSwipeDeck from './UniversalSwipeDeck';
import type { Activity } from '../App';

type Props = {
  onBack?: () => void;
};

export default function SavedActivitiesSwipe({ onBack }: Props) {
  // Mock saved activities
  const savedActivities: Activity[] = [
    {
      id: 's1',
      title: 'Riverside Picnic Spot',
      description: 'Perfect quiet spot by the river for relaxing',
      fullDescription: 'Beautiful riverside location with grass areas and shade trees. Great for reading, picnics, or just unwinding.',
      photo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      photos: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800',
      ],
      category: 'Spot',
      activityType: 'solo',
      vibe: ['Peaceful', 'Natural'],
      timeContext: 'Great in afternoons',
      indoor: false,
      distance: '1.2 km',
      savedByCount: 78,
      goodFor: ['Relaxing', 'Reading', 'Picnic'],
      location: 'Riverside Park',
      costLevel: 'Free',
      averageRating: 4.8,
      totalRatings: 45,
      communityPhotos: [],
      threads: [],
      currentConditions: {
        crowdLevel: 'Low crowd now',
        atmosphere: 'Calm',
        lightCondition: 'Sunny',
      },
      contentType: 'standard',
    },
    {
      id: 's2',
      title: 'Morning Yoga in the Park',
      description: 'Free outdoor yoga sessions every weekend',
      fullDescription: 'Join the community for free yoga sessions. Bring your own mat. All levels welcome.',
      photo: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
      photos: [
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
      ],
      category: 'Activity',
      activityType: 'active-social',
      vibe: ['Energizing', 'Social'],
      timeContext: 'Saturdays 8-9 AM',
      indoor: false,
      distance: '2.5 km',
      savedByCount: 156,
      goodFor: ['Exercise', 'Wellness', 'Meeting people'],
      location: 'Central Park',
      costLevel: 'Free',
      averageRating: 4.9,
      totalRatings: 89,
      communityPhotos: [],
      threads: [],
      currentConditions: {
        crowdLevel: 'Moderate',
        atmosphere: 'Welcoming',
      },
      contentType: 'standard',
    },
  ];

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-5 py-4">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-3 flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <h1 className="mb-1 text-3xl text-gray-900">Saved</h1>
        <p className="text-gray-600">Your saved spots and activities</p>
      </div>

      {/* Swipe Deck */}
      <UniversalSwipeDeck
        activities={savedActivities}
        onSave={(activity) => console.log('Re-saved:', activity.title)}
        onPass={(activity) => console.log('Removed from saved:', activity.title)}
        emptyMessage="No saved activities yet"
        emptyIcon="💾"
      />
    </div>
  );
}
