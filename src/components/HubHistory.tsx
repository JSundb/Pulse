import { ArrowLeft, MapPin, Star, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Props = {
  onBack: () => void;
};

type HistoryItem = {
  id: string;
  title: string;
  location: string;
  photo: string;
  visitDate: string;
  rating?: number;
  hasReview: boolean;
  type: 'visit' | 'order' | 'review';
};

export default function HubHistory({ onBack }: Props) {
  const historyItems: HistoryItem[] = [
    {
      id: '1',
      title: 'Golden Gate Park Sunrise Hike',
      location: 'Golden Gate Park',
      photo: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      visitDate: 'Nov 28, 2024',
      rating: 5,
      hasReview: true,
      type: 'visit',
    },
    {
      id: '2',
      title: 'Blue Bottle Coffee - Hayes Valley',
      location: 'Hayes Valley',
      photo: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400',
      visitDate: 'Nov 25, 2024',
      rating: 4,
      hasReview: true,
      type: 'visit',
    },
    {
      id: '3',
      title: 'Yoga in the Park',
      location: 'Dolores Park',
      photo: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400',
      visitDate: 'Nov 20, 2024',
      rating: 5,
      hasReview: false,
      type: 'visit',
    },
    {
      id: '4',
      title: 'Mission District Food Tour',
      location: 'Mission District',
      photo: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
      visitDate: 'Nov 15, 2024',
      rating: 4,
      hasReview: true,
      type: 'order',
    },
  ];

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-4">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full transition-all hover:bg-secondary"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-xl text-foreground">History</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {historyItems.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-md"
            >
              <div className="flex gap-3 p-3">
                {/* Photo */}
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                  <ImageWithFallback
                    src={item.photo}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col justify-center">
                  <h3 className="mb-1 line-clamp-1 text-sm text-foreground">
                    {item.title}
                  </h3>
                  <div className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin size={12} />
                    <span className="line-clamp-1">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar size={12} />
                      <span>{item.visitDate}</span>
                    </div>
                    {item.rating && (
                      <div className="flex items-center gap-1">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-foreground">{item.rating}.0</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Review Status */}
              {item.hasReview && (
                <div className="border-t border-border bg-secondary px-3 py-2">
                  <p className="text-xs text-muted-foreground">✓ Review submitted</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Your activity history will appear here
          </p>
        </div>
      </div>
    </div>
  );
}
