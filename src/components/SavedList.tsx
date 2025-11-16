import { Heart, MapPin, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Activity } from '../App';

type Props = {
  onOpenActivity: (activity: Activity) => void;
};

export default function SavedList({ onOpenActivity }: Props) {
  // Mock saved activities
  const savedActivities: Activity[] = [
    {
      id: '1',
      title: 'Golden Gate Viewpoint',
      description: 'Perfect spot for sunrise photography',
      fullDescription: 'This iconic viewpoint offers stunning views of the Golden Gate Bridge.',
      photo: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
      photos: [
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
        'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
      ],
      category: 'Spot',
      activityType: 'solo',
      vibe: ['Scenic', 'Peaceful'],
      timeContext: 'Sunrise',
      indoor: false,
      distance: '2.3 km',
      savedByCount: 245,
      goodFor: ['Photography', 'Sightseeing'],
      location: 'San Francisco',
      costLevel: 'Free',
      averageRating: 4.8,
      totalRatings: 120,
      communityPhotos: [],
      threads: [],
      currentConditions: {
        crowdLevel: 'Quiet',
        atmosphere: 'Calm',
        lightCondition: 'Golden Hour',
      },
      specialMoment: 'Best at sunrise',
    },
    {
      id: '2',
      title: 'Urban Coffee Roasters',
      description: 'Artisanal coffee and great wifi',
      fullDescription: 'A cozy cafe perfect for working and meetings.',
      photo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
      photos: [
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
        'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800',
      ],
      category: 'Activity',
      activityType: 'passive-social',
      vibe: ['Cozy', 'Productive'],
      timeContext: 'Morning',
      indoor: true,
      distance: '0.8 km',
      savedByCount: 189,
      goodFor: ['Work', 'Coffee'],
      location: 'Downtown',
      costLevel: '$$',
      averageRating: 4.6,
      totalRatings: 95,
      communityPhotos: [],
      threads: [],
      currentConditions: {
        crowdLevel: 'Moderate',
        atmosphere: 'Productive',
      },
    },
    {
      id: '3',
      title: 'Twin Peaks Sunset Hike',
      description: '360° views of the city',
      fullDescription: 'Popular hiking spot with panoramic city views.',
      photo: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
      photos: [
        'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
      ],
      category: 'Route',
      activityType: 'active-social',
      vibe: ['Active', 'Scenic'],
      timeContext: 'Sunset',
      indoor: false,
      distance: '4.1 km',
      savedByCount: 312,
      goodFor: ['Hiking', 'Photography'],
      location: 'Twin Peaks',
      costLevel: 'Free',
      averageRating: 4.9,
      totalRatings: 180,
      communityPhotos: [],
      threads: [],
      currentConditions: {
        crowdLevel: 'Busy',
        atmosphere: 'Energetic',
        lightCondition: 'Golden Hour',
      },
      bestTimeToVisit: 'Sunset (5-7 PM)',
      route: {
        distance: '2.5 km',
        duration: '45 min',
        difficulty: 'Moderate',
        elevation: '+150m',
        startPoint: 'Twin Peaks Parking',
        waypoints: [],
      },
    },
    {
      id: '4',
      title: 'Dolores Park Picnic',
      description: 'Popular gathering spot with city views',
      fullDescription: 'A vibrant park perfect for picnics and socializing.',
      photo: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800',
      photos: [
        'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
      ],
      category: 'Spot',
      activityType: 'active-social',
      vibe: ['Social', 'Relaxed'],
      timeContext: 'Afternoon',
      indoor: false,
      distance: '1.6 km',
      savedByCount: 425,
      goodFor: ['Picnic', 'Socializing'],
      location: 'Mission District',
      costLevel: 'Free',
      averageRating: 4.7,
      totalRatings: 210,
      communityPhotos: [],
      threads: [],
      currentConditions: {
        crowdLevel: 'Very Busy',
        atmosphere: 'Lively',
      },
      specialMoment: 'Weekends are buzzing',
    },
    {
      id: '5',
      title: 'Ocean Beach Sunset',
      description: 'Watch the waves and sunset',
      fullDescription: 'Beautiful beach perfect for sunset walks.',
      photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      photos: [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
      ],
      category: 'Spot',
      activityType: 'solo',
      vibe: ['Peaceful', 'Scenic'],
      timeContext: 'Sunset',
      indoor: false,
      distance: '6.2 km',
      savedByCount: 389,
      goodFor: ['Walking', 'Photography'],
      location: 'Outer Sunset',
      costLevel: 'Free',
      averageRating: 4.8,
      totalRatings: 165,
      communityPhotos: [],
      threads: [],
      currentConditions: {
        crowdLevel: 'Moderate',
        atmosphere: 'Peaceful',
        lightCondition: 'Golden Hour',
      },
      bestTimeToVisit: 'Sunset (6-8 PM)',
    },
  ];

  return (
    <div className="flex h-full flex-col bg-background pb-20">
      {/* Header */}
      <div className="border-b border-border bg-card px-5 py-4">
        <h1 className="text-3xl text-foreground">Saved</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your spots and activities</p>
      </div>

      {/* Saved List */}
      <div className="flex-1 overflow-y-auto">
        {savedActivities.length === 0 ? (
          <div className="flex h-full items-center justify-center p-8 text-center">
            <div>
              <Heart size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h2 className="mb-2 text-xl text-foreground">No saved items yet</h2>
              <p className="text-muted-foreground">
                Start exploring and save spots and activities you want to visit
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {savedActivities.map((activity) => (
              <div
                key={activity.id}
                className="group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl bg-card border border-border p-3 shadow-sm transition-all hover:shadow-md"
              >
                <div
                  onClick={() => onOpenActivity(activity)}
                  className="flex flex-1 min-w-0 items-center gap-4 cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                    <ImageWithFallback
                      src={activity.photo}
                      alt={activity.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                        {activity.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin size={10} />
                        {activity.distance}
                      </span>
                    </div>
                    <h3 className="mb-1 text-foreground truncate">{activity.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{activity.description}</p>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle remove logic here
                  }}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}