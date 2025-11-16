import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import UniversalSwipeDeck from './UniversalSwipeDeck';
import type { Activity } from '../App';

type Theme = {
  id: string;
  name: string;
  description: string;
  icon: string;
  subThemes: string[];
};

type Props = {
  themeId: string;
  onBack: () => void;
};

const themeData: Record<string, Theme> = {
  nature: {
    id: 'nature',
    name: 'Nature',
    description: 'Explore outdoor spots and scenic locations',
    icon: '🌲',
    subThemes: ['Hikes', 'Forest Walks', 'Scenic Views', 'Lakes & Swim', 'Sunset Spots'],
  },
  sport: {
    id: 'sport',
    name: 'Sport',
    description: 'Find fitness activities and workout spots',
    icon: '⚽',
    subThemes: ['Gyms', 'Yoga', 'Running Routes', 'Sports Fields', 'Climbing'],
  },
  photography: {
    id: 'photography',
    name: 'Photography',
    description: 'Discover the best spots for photos',
    icon: '📸',
    subThemes: ['Viewpoints', 'Architecture', 'Street', 'Nature', 'Golden Hour'],
  },
  cafes: {
    id: 'cafes',
    name: 'Cafés & Study',
    description: 'Cozy spots for coffee and work',
    icon: '☕',
    subThemes: ['Coffee Shops', 'Study Spots', 'Co-working', 'Quiet Cafés', 'WiFi'],
  },
  social: {
    id: 'social',
    name: 'Social',
    description: 'Meet people and join group activities',
    icon: '🎉',
    subThemes: ['Meetups', 'Events', 'Group Activities', 'Social Sports', 'Workshops'],
  },
  water: {
    id: 'water',
    name: 'Water & Swim',
    description: 'Swimming and water activities',
    icon: '🏊',
    subThemes: ['Lakes', 'Beaches', 'Pools', 'Rivers', 'Water Sports'],
  },
  routes: {
    id: 'routes',
    name: 'Routes & Hikes',
    description: 'Walking and hiking trails',
    icon: '🥾',
    subThemes: ['Easy Walks', 'Day Hikes', 'Mountain Trails', 'Urban Routes', 'Scenic Loops'],
  },
  seasonal: {
    id: 'seasonal',
    name: 'Seasonal',
    description: 'Limited-time activities and experiences',
    icon: '🍂',
    subThemes: ['Winter', 'Spring', 'Summer', 'Fall', 'Festivals'],
  },
  hidden: {
    id: 'hidden',
    name: 'Hidden Gems',
    description: 'Off-the-beaten-path discoveries',
    icon: '💎',
    subThemes: ['Local Secrets', 'Quiet Spots', 'Undiscovered', 'Unique', 'Insider Tips'],
  },
};

export default function ThemedSwipeDeckSimple({ themeId, onBack }: Props) {
  const [selectedSubTheme, setSelectedSubTheme] = useState<string | null>(null);

  const theme = themeData[themeId];

  // Mock activities data
  const allActivities: Activity[] = [
    {
      id: '1',
      title: 'Sunset Viewpoint',
      description: 'Stunning panoramic views of the city',
      fullDescription: 'A hidden gem offering breathtaking sunset views. Best visited during golden hour for photography.',
      photo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      photos: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
      ],
      category: 'Spot',
      activityType: 'solo',
      vibe: ['Scenic', 'Quiet'],
      timeContext: 'Best at sunset',
      indoor: false,
      distance: '2.3 km',
      savedByCount: 142,
      goodFor: ['Photography', 'Relaxing', 'Solo time'],
      location: 'Hilltop Park',
      costLevel: 'Free',
      averageRating: 4.7,
      totalRatings: 89,
      communityPhotos: [],
      threads: [],
      currentConditions: {
        crowdLevel: 'Low crowd now',
        atmosphere: 'Peaceful',
        lightCondition: 'Soft light now',
      },
      specialMoment: 'Best at 18:15 for sunset',
      contentType: 'standard',
      subTheme: 'Sunset Spots',
    },
    {
      id: '2',
      title: 'Eagle Peak Trail',
      description: 'Moderate hiking trail with forest views',
      fullDescription: 'A beautiful 5km trail through dense forest with occasional clearings.',
      photo: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
      photos: [
        'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
        'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800',
      ],
      category: 'Activity',
      activityType: 'active-social',
      vibe: ['Active', 'Nature'],
      timeContext: 'Great for morning hikes',
      indoor: false,
      distance: '5.8 km',
      savedByCount: 231,
      goodFor: ['Hiking', 'Exercise', 'Nature'],
      location: 'Eagle Peak',
      costLevel: 'Free',
      averageRating: 4.5,
      totalRatings: 156,
      communityPhotos: [],
      threads: [],
      currentConditions: {
        crowdLevel: 'Moderate',
        atmosphere: 'Energetic',
        walkingCondition: 'Moderate incline',
      },
      contentType: 'route',
      route: {
        distance: '5.2 km',
        duration: '2.5 hours',
        difficulty: 'Moderate',
        elevation: '350m',
        startPoint: 'Eagle Peak Trailhead',
        waypoints: [],
      },
      subTheme: 'Day Hikes',
    },
    {
      id: '3',
      title: 'Blue Bottle Coffee',
      description: 'Cozy café perfect for focused work',
      fullDescription: 'Minimalist café with excellent coffee and fast WiFi. Gets busy after lunch.',
      photo: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
      photos: [
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
        'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
      ],
      category: 'Spot',
      activityType: 'solo',
      vibe: ['Cozy', 'Quiet'],
      timeContext: 'Quiet in mornings',
      indoor: true,
      distance: '0.8 km',
      savedByCount: 89,
      goodFor: ['Study', 'Work', 'Coffee'],
      location: 'Downtown',
      costLevel: '$$',
      averageRating: 4.6,
      totalRatings: 234,
      communityPhotos: [],
      threads: [],
      currentConditions: {
        crowdLevel: 'Low crowd now',
        atmosphere: 'Calm',
      },
      contentType: 'standard',
      subTheme: 'Study Spots',
    },
    {
      id: '4',
      title: 'Weekend Tennis Meetup',
      description: 'Friendly doubles matches at the park',
      fullDescription: 'Join our casual tennis meetup every Saturday. All skill levels welcome! We rotate partners and play for fun.',
      photo: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800',
      photos: [
        'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800',
        'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800',
      ],
      category: 'Activity',
      activityType: 'active-social',
      vibe: ['Social', 'Active'],
      timeContext: 'Saturdays 10 AM - 12 PM',
      indoor: false,
      distance: '3.2 km',
      savedByCount: 67,
      goodFor: ['Sports', 'Meeting People', 'Exercise'],
      location: 'City Park Courts',
      costLevel: 'Free',
      averageRating: 4.8,
      totalRatings: 45,
      communityPhotos: [],
      threads: [],
      currentConditions: {
        crowdLevel: '12 people joined',
        atmosphere: 'Friendly',
      },
      specialMoment: 'Next meetup this Saturday',
      contentType: 'event',
      subTheme: 'Social Sports',
    },
    {
      id: '5',
      title: 'Pottery Workshop',
      description: 'Learn to make ceramics with local artists',
      fullDescription: 'A hands-on pottery class where you\'ll create your own ceramic piece. All materials included, and you can take your creation home after it\'s fired.',
      photo: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800',
      photos: [
        'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800',
        'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800',
      ],
      category: 'Activity',
      activityType: 'active-social',
      vibe: ['Creative', 'Social'],
      timeContext: 'Weekday evenings',
      indoor: true,
      distance: '1.5 km',
      savedByCount: 124,
      goodFor: ['Art', 'Learning', 'Socializing'],
      location: 'Creative Studio',
      costLevel: '$$$',
      averageRating: 4.9,
      totalRatings: 78,
      communityPhotos: [],
      threads: [],
      currentConditions: {
        crowdLevel: '8 spots left',
        atmosphere: 'Creative',
      },
      specialMoment: 'Beginner-friendly session tonight',
      contentType: 'event',
      subTheme: 'Workshops',
    },
    {
      id: '6',
      title: 'Board Game Night',
      description: 'Weekly meetup for board game enthusiasts',
      fullDescription: 'Join fellow board game lovers for an evening of strategy games, party games, and good company. Huge game library available!',
      photo: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800',
      photos: [
        'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800',
        'https://images.unsplash.com/photo-1566694271453-390536dd1f0d?w=800',
      ],
      category: 'Activity',
      activityType: 'passive-social',
      vibe: ['Fun', 'Social'],
      timeContext: 'Every Thursday 7 PM',
      indoor: true,
      distance: '2.0 km',
      savedByCount: 156,
      goodFor: ['Games', 'Meeting People', 'Relaxing'],
      location: 'Game Café',
      costLevel: '$',
      averageRating: 4.7,
      totalRatings: 112,
      communityPhotos: [],
      threads: [],
      currentConditions: {
        crowdLevel: '15-20 people typical',
        atmosphere: 'Laid-back',
      },
      specialMoment: 'New games added this week',
      contentType: 'event',
      subTheme: 'Group Activities',
    },
    {
      id: '7',
      title: 'Rooftop Yoga Session',
      description: 'Sunrise yoga with city views',
      fullDescription: 'Start your day with a rejuvenating yoga session on a beautiful rooftop. Suitable for all levels. Bring your own mat!',
      photo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
      photos: [
        'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
      ],
      category: 'Activity',
      activityType: 'active-social',
      vibe: ['Peaceful', 'Active'],
      timeContext: 'Weekdays 6:30 AM',
      indoor: false,
      distance: '1.8 km',
      savedByCount: 203,
      goodFor: ['Fitness', 'Mindfulness', 'Meeting People'],
      location: 'Downtown Rooftop',
      costLevel: '$$',
      averageRating: 4.8,
      totalRatings: 167,
      communityPhotos: [],
      threads: [],
      currentConditions: {
        crowdLevel: '10-15 attendees',
        atmosphere: 'Zen',
        lightCondition: 'Golden hour',
      },
      specialMoment: 'Perfect weather this week',
      contentType: 'event',
      subTheme: 'Meetups',
    },
    {
      id: '8',
      title: 'Tech & Coffee Meetup',
      description: 'Casual networking for tech professionals',
      fullDescription: 'Monthly meetup for developers, designers, and tech enthusiasts. Share ideas, work on side projects, or just chat over great coffee.',
      photo: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
      photos: [
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
        'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800',
      ],
      category: 'Activity',
      activityType: 'passive-social',
      vibe: ['Professional', 'Casual'],
      timeContext: 'First Saturday of month',
      indoor: true,
      distance: '0.9 km',
      savedByCount: 178,
      goodFor: ['Networking', 'Learning', 'Coffee'],
      location: 'Tech Hub Café',
      costLevel: '$',
      averageRating: 4.6,
      totalRatings: 134,
      communityPhotos: [],
      threads: [],
      currentConditions: {
        crowdLevel: '20-30 people expected',
        atmosphere: 'Collaborative',
      },
      specialMoment: 'Special guest speaker this month',
      contentType: 'event',
      subTheme: 'Meetups',
    },
  ];

  // Filter activities by selected sub-theme
  const filteredActivities = selectedSubTheme
    ? allActivities.filter((a) => a.subTheme === selectedSubTheme)
    : allActivities;

  if (!theme) {
    return <div>Theme not found</div>;
  }

  return (
    <div className="flex h-full flex-col bg-background pb-20">
      {/* Header */}
      <div className="border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="px-5 py-4">
          <button
            onClick={onBack}
            className="mb-3 flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="mb-3 flex items-center gap-3">
            <span className="text-3xl">{theme.icon}</span>
            <div>
              <h1 className="text-2xl text-foreground">{theme.name}</h1>
              <p className="text-sm text-muted-foreground">{theme.description}</p>
            </div>
          </div>

          {/* Sub-themes */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedSubTheme(null)}
              className={`flex-shrink-0 rounded-full px-4 py-2 text-sm transition-all ${
                selectedSubTheme === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
              }`}
            >
              All
            </button>
            {theme.subThemes.map((subTheme) => (
              <button
                key={subTheme}
                onClick={() => setSelectedSubTheme(subTheme)}
                className={`flex-shrink-0 rounded-full px-4 py-2 text-sm transition-all ${
                  selectedSubTheme === subTheme
                    ? 'bg-blue-600 text-white'
                    : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                }`}
              >
                {subTheme}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Universal Swipe Deck */}
      <UniversalSwipeDeck
        activities={filteredActivities}
        onSave={(activity) => console.log('Saved:', activity.title)}
        onPass={(activity) => console.log('Passed:', activity.title)}
        emptyMessage={selectedSubTheme ? `No ${selectedSubTheme} activities` : 'No more activities'}
        emptyIcon="🎯"
      />
    </div>
  );
}