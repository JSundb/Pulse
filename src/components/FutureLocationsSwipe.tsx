import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import { useState } from 'react';
import UniversalSwipeDeck from './UniversalSwipeDeck';
import type { Activity } from '../App';

type Props = {
  onBack?: () => void;
};

type FutureLocation = {
  id: string;
  name: string;
  address: string;
  dateRange: string;
};

export default function FutureLocationsSwipe({ onBack }: Props) {
  const [selectedLocation, setSelectedLocation] = useState<FutureLocation | null>(null);

  const futureLocations: FutureLocation[] = [
    { id: '1', name: 'Vienna', address: 'Hostel Ruthensteiner, Vienna', dateRange: 'May 12-15' },
    { id: '2', name: 'Barcelona', address: 'Gothic Quarter, Barcelona', dateRange: 'Jun 1-7' },
  ];

  // Mock activities for selected location
  const locationActivities: Activity[] = [
    {
      id: 'v1',
      title: 'Schönbrunn Palace',
      description: 'Historic imperial summer residence with gardens',
      fullDescription: 'UNESCO World Heritage site with stunning baroque architecture and expansive gardens. Plan 2-3 hours for visit.',
      photo: 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=800',
      photos: [
        'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=800',
        'https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=800',
      ],
      category: 'Spot',
      activityType: 'solo',
      vibe: ['Historic', 'Scenic'],
      timeContext: 'Open daily 8 AM - 6 PM',
      indoor: false,
      distance: '4.5 km from center',
      savedByCount: 1245,
      goodFor: ['History', 'Photography', 'Walking'],
      location: 'Schönbrunn, Vienna',
      costLevel: '€€',
      averageRating: 4.9,
      totalRatings: 3456,
      communityPhotos: [],
      threads: [],
      currentConditions: {
        crowdLevel: 'Popular - book ahead',
        atmosphere: 'Majestic',
        lightCondition: 'Best in morning',
      },
      contentType: 'standard',
    },
    {
      id: 'v2',
      title: 'Naschmarkt',
      description: 'Vienna\'s most popular market for food and goods',
      fullDescription: 'Vibrant market with fresh produce, international cuisine, and local delicacies. Great for breakfast or lunch.',
      photo: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
      photos: [
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
        'https://images.unsplash.com/photo-1488992783499-418eb1f62d08?w=800',
      ],
      category: 'Spot',
      activityType: 'passive-social',
      vibe: ['Lively', 'Foodie'],
      timeContext: 'Mon-Sat 6 AM - 7:30 PM',
      indoor: false,
      distance: '1.2 km from center',
      savedByCount: 876,
      goodFor: ['Food', 'Shopping', 'Local culture'],
      location: 'Naschmarkt, Vienna',
      costLevel: '€-€€',
      averageRating: 4.7,
      totalRatings: 2134,
      communityPhotos: [],
      threads: [],
      currentConditions: {
        crowdLevel: 'Busy on weekends',
        atmosphere: 'Bustling',
      },
      contentType: 'standard',
    },
  ];

  // Show activities for selected location
  if (selectedLocation) {
    return (
      <div className="flex h-full flex-col bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card px-5 py-4">
          <button
            onClick={() => setSelectedLocation(null)}
            className="mb-3 flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="mb-1 text-3xl text-foreground">{selectedLocation.name}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar size={16} />
            <span>{selectedLocation.dateRange}</span>
          </div>
        </div>

        {/* Swipe Deck */}
        <UniversalSwipeDeck
          activities={locationActivities}
          onSave={(activity) => console.log('Saved for trip:', activity.title)}
          onPass={(activity) => console.log('Passed:', activity.title)}
          emptyMessage={`No more spots in ${selectedLocation.name}`}
          emptyIcon="🗺️"
        />
      </div>
    );
  }

  // Show location cards
  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-5 py-4">
        {onBack && (
          <button
            onClick={onBack}
            className="mb-3 flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <h1 className="mb-1 text-3xl text-foreground">Future Locations</h1>
        <p className="text-muted-foreground">Plan your upcoming trips</p>
      </div>

      {/* Location Cards */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className="space-y-4">
          {futureLocations.map((location) => (
            <button
              key={location.id}
              onClick={() => setSelectedLocation(location)}
              className="w-full rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-left shadow-lg transition-all hover:shadow-xl active:scale-98 border border-border"
            >
              <div className="mb-2 flex items-center gap-2 text-primary">
                <MapPin size={20} />
                <span className="text-sm">Upcoming Trip</span>
              </div>
              <h3 className="mb-2 text-2xl text-foreground">{location.name}</h3>
              <p className="mb-2 text-muted-foreground">{location.address}</p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar size={16} />
                <span className="text-sm">{location.dateRange}</span>
              </div>
            </button>
          ))}

          <button className="flex w-full items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-border p-6 text-muted-foreground transition-all hover:border-primary hover:text-primary active:scale-98">
            <MapPin size={20} />
            <span>Add New Location</span>
          </button>
        </div>
      </div>
    </div>
  );
}