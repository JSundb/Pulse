import { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import UniversalSwipeDeck from './UniversalSwipeDeck';
import type { Activity } from '../App';

type Props = {
  onBack: () => void;
  searchQuery?: string;
};

export default function SearchResults({ onBack, searchQuery = '' }: Props) {
  const [query, setQuery] = useState(searchQuery);

  // Mock search results
  const searchResults: Activity[] = [
    {
      id: 'sr1',
      title: 'Hidden Garden Café',
      description: 'Secret courtyard café with amazing pastries',
      fullDescription: 'Tucked away in a quiet alley, this charming café features a beautiful garden courtyard and serves excellent coffee and homemade pastries.',
      photo: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800',
      photos: [
        'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800',
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
      ],
      category: 'Spot',
      activityType: 'solo',
      vibe: ['Cozy', 'Hidden'],
      timeContext: 'Open 7 AM - 5 PM',
      indoor: false,
      distance: '1.8 km',
      savedByCount: 234,
      goodFor: ['Coffee', 'Brunch', 'Quiet time'],
      location: 'Old Town',
      costLevel: '$$',
      averageRating: 4.8,
      totalRatings: 167,
      communityPhotos: [],
      threads: [],
      currentConditions: {
        crowdLevel: 'Moderate',
        atmosphere: 'Intimate',
        lightCondition: 'Natural light',
      },
      contentType: 'standard',
    },
    {
      id: 'sr2',
      title: 'Urban Photography Walk',
      description: 'Guided walk through best street photography spots',
      fullDescription: 'Join a 2-hour walking tour covering the city\'s most photogenic streets, alleys, and hidden corners. Perfect for beginners and enthusiasts.',
      photo: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800',
      photos: [
        'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800',
        'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800',
      ],
      category: 'Activity',
      activityType: 'active-social',
      vibe: ['Creative', 'Social'],
      timeContext: 'Saturdays 9 AM & 3 PM',
      indoor: false,
      distance: '0.5 km from start',
      savedByCount: 189,
      goodFor: ['Photography', 'Learning', 'Exploring'],
      location: 'Downtown',
      costLevel: '$',
      averageRating: 4.9,
      totalRatings: 98,
      communityPhotos: [],
      threads: [],
      currentConditions: {
        crowdLevel: 'Small groups',
        atmosphere: 'Inspiring',
      },
      contentType: 'user-created',
      creator: {
        id: 'u1',
        name: 'Alex Chen',
        avatar: 'https://i.pravatar.cc/150?u=alex',
      },
    },
  ];

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header with Search */}
      <div className="border-b border-gray-200 bg-white px-5 py-4">
        <button
          onClick={onBack}
          className="mb-3 flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search spots and activities"
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            autoFocus
          />
        </div>
      </div>

      {/* Results as Swipe Deck */}
      {query.length > 0 ? (
        <UniversalSwipeDeck
          activities={searchResults}
          onSave={(activity) => console.log('Saved:', activity.title)}
          onPass={(activity) => console.log('Passed:', activity.title)}
          emptyMessage="No results found"
          emptyIcon="🔍"
        />
      ) : (
        <div className="flex flex-1 items-center justify-center p-8 text-center">
          <div>
            <div className="mb-4 text-6xl">🔍</div>
            <h2 className="mb-2 text-2xl text-gray-900">Search</h2>
            <p className="text-gray-600">Type to search for spots and activities</p>
          </div>
        </div>
      )}
    </div>
  );
}
