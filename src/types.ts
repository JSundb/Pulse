export type ActivityType = 'solo' | 'active-social' | 'passive-social';
export type ContentType = 'standard' | 'route' | 'event';
export type Category = 'Spot' | 'Activity' | 'Route' | 'Event';

export interface Route {
  distance: string;
  duration: string;
  difficulty: string;
  elevation: string;
  startPoint: string;
  waypoints: string[];
}

export interface CurrentConditions {
  crowdLevel?: string;
  atmosphere?: string;
  lightCondition?: string;
  walkingCondition?: string;
  weather?: string;
}

export interface Thread {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  content: string;
  upvotes: number;
  comments: number;
  timestamp: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  photo: string;
  photos: string[];
  category: Category;
  activityType: ActivityType;
  vibe: string[];
  timeContext: string;
  indoor: boolean;
  distance: string;
  savedByCount: number;
  goodFor: string[];
  location: string;
  costLevel: string;
  averageRating: number;
  totalRatings: number;
  communityPhotos?: string[];
  threads?: Thread[];
  currentConditions?: CurrentConditions;
  specialMoment?: string;
  bestTimeToVisit?: string;
  contentType?: ContentType;
  route?: Route;
  subTheme?: string;
  themeId?: string;
}

export interface Theme {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
  gradient: string;
  icon: string;
  subThemes: string[];
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  message: string;
  timestamp: string;
  image?: string;
}

export interface ChatPreview {
  activityId: string;
  activityName: string;
  spotName: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  photo: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  joinDate: string;
  city: string;
  interests: string[];
  isOwnProfile?: boolean;
  stats?: {
    photos: number;
    activities: number;
    threads: number;
  };
}

