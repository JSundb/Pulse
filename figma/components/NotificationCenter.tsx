import { ArrowLeft, Sunset, CloudSnow, Users, Trophy, ShoppingBag, MapPin, Bell } from 'lucide-react';

type Notification = {
  id: string;
  type: 'context' | 'achievement' | 'wolt' | 'activity';
  icon: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
};

type Props = {
  onBack: () => void;
};

export default function NotificationCenter({ onBack }: Props) {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'context',
      icon: '🌅',
      title: 'Perfect Sunset Moment',
      message: 'Sunset in 45 minutes — perfect golden hour nearby at Hilltop Vista',
      timestamp: '10 min ago',
      read: false,
    },
    {
      id: '2',
      type: 'achievement',
      icon: '🏆',
      title: 'Achievement Unlocked!',
      message: 'You earned the Sunset Explorer Badge! +30 XP',
      timestamp: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      type: 'wolt',
      icon: '☕',
      title: 'Warm Drink Recommended',
      message: 'New Wolt Pack available — cold weather ahead, warm drinks recommended',
      timestamp: '2 hours ago',
      read: false,
    },
    {
      id: '4',
      type: 'context',
      icon: '🌊',
      title: 'Low Crowd Alert',
      message: 'Low crowd at your saved spot "North Ridge" — perfect time to visit!',
      timestamp: '3 hours ago',
      read: true,
    },
    {
      id: '5',
      type: 'activity',
      icon: '👥',
      title: 'New Activity Nearby',
      message: 'Photography meetup starting in 2 hours at Central Park',
      timestamp: '5 hours ago',
      read: true,
    },
    {
      id: '6',
      type: 'context',
      icon: '🌤️',
      title: 'Perfect Weather',
      message: 'Ideal conditions for outdoor activities — sunny and 22°C',
      timestamp: '6 hours ago',
      read: true,
    },
    {
      id: '7',
      type: 'achievement',
      icon: '📸',
      title: 'Badge Progress',
      message: "You're halfway to earning the Photographer badge! Keep sharing photos.",
      timestamp: '1 day ago',
      read: true,
    },
    {
      id: '8',
      type: 'wolt',
      icon: '🍕',
      title: 'Wolt AI Pack',
      message: 'New personalized pack available based on your location and time',
      timestamp: '1 day ago',
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'achievement':
        return 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400';
      case 'wolt':
        return 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary';
      case 'context':
        return 'bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400';
      case 'activity':
        return 'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all hover:bg-muted/80 active:scale-95"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl text-foreground">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-muted-foreground">{unreadCount} unread</p>
              )}
            </div>
          </div>
          {unreadCount > 0 && (
            <button className="text-sm text-primary hover:underline">
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Bell size={32} className="text-muted-foreground" />
            </div>
            <p className="text-foreground">No notifications yet</p>
            <p className="text-sm text-muted-foreground">We'll notify you about activities, achievements, and more</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {notifications.map((notification) => (
              <button
                key={notification.id}
                className={`w-full p-4 text-left transition-all hover:bg-muted/50 active:bg-muted ${
                  !notification.read ? 'bg-primary/5' : ''
                }`}
              >
                <div className="flex gap-3">
                  {/* Icon */}
                  <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${getNotificationColor(notification.type)}`}>
                    <span className="text-2xl">{notification.icon}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="mb-1 flex items-start justify-between gap-2">
                      <h3 className={`text-sm ${!notification.read ? 'text-foreground font-semibold' : 'text-foreground'}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="mb-1 text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}