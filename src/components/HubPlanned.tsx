import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Calendar, Clock, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Props = {
  onBack: () => void;
};

type PlannedItem = {
  id: string;
  title: string;
  location: string;
  photo: string;
  date: Date;
  time: string;
  attendees?: number;
};

export default function HubPlanned({ onBack }: Props) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const plannedItems: PlannedItem[] = [
    {
      id: '1',
      title: 'Sunset Hike at Twin Peaks',
      location: 'Twin Peaks',
      photo: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400',
      date: new Date('2024-12-20T18:00:00'),
      time: '6:00 PM',
      attendees: 5,
    },
    {
      id: '2',
      title: 'Coffee Tasting Workshop',
      location: 'Sightglass Coffee',
      photo: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400',
      date: new Date('2024-12-22T10:30:00'),
      time: '10:30 AM',
      attendees: 8,
    },
    {
      id: '3',
      title: 'Photography Walk - Embarcadero',
      location: 'Embarcadero',
      photo: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400',
      date: new Date('2024-12-24T14:00:00'),
      time: '2:00 PM',
      attendees: 12,
    },
    {
      id: '4',
      title: 'Farmers Market Brunch',
      location: 'Ferry Building',
      photo: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400',
      date: new Date('2024-12-28T09:00:00'),
      time: '9:00 AM',
    },
    {
      id: '5',
      title: 'New Year Beach Bonfire',
      location: 'Ocean Beach',
      photo: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400',
      date: new Date('2024-12-31T19:00:00'),
      time: '7:00 PM',
      attendees: 15,
    },
  ];

  const getCountdown = (targetDate: Date) => {
    const diff = targetDate.getTime() - currentTime.getTime();
    
    if (diff <= 0) return 'Starting soon!';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

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
        <h1 className="text-xl text-foreground">Planned</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {plannedItems.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-md"
            >
              <div className="flex gap-3 p-3">
                {/* Photo */}
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl">
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
                  <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin size={12} />
                    <span className="line-clamp-1">{item.location}</span>
                  </div>
                  <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar size={12} />
                    <span>{formatDate(item.date)} • {item.time}</span>
                  </div>
                  {item.attendees && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users size={12} />
                      <span>{item.attendees} attending</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Countdown */}
              <div className="border-t border-border bg-gradient-to-r from-teal-500/10 to-blue-500/10 px-3 py-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400">
                    <Clock size={14} />
                    <span className="text-xs">Starts in</span>
                  </div>
                  <span className="text-sm text-foreground tabular-nums">
                    {getCountdown(item.date)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Footer */}
        {plannedItems.length === 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              No planned activities yet
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Save activities to plan your adventures
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
