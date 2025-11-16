import type { Activity, Theme, ChatMessage, User, ChatPreview } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Themes
  async getThemes(): Promise<Theme[]> {
    return this.fetch<Theme[]>('/themes');
  }

  async getTheme(themeId: string): Promise<Theme> {
    return this.fetch<Theme>(`/themes/${themeId}`);
  }

  // Activities
  async getActivities(params?: { themeId?: string; subTheme?: string; search?: string }): Promise<Activity[]> {
    const queryParams = new URLSearchParams();
    if (params?.themeId) queryParams.append('themeId', params.themeId);
    if (params?.subTheme) queryParams.append('subTheme', params.subTheme);
    if (params?.search) queryParams.append('search', params.search);

    const query = queryParams.toString();
    return this.fetch<Activity[]>(`/activities${query ? `?${query}` : ''}`);
  }

  async getActivitiesByTheme(themeId: string, subTheme?: string): Promise<Activity[]> {
    const query = subTheme ? `?subTheme=${subTheme}` : '';
    return this.fetch<Activity[]>(`/themes/${themeId}/activities${query}`);
  }

  async getActivity(activityId: string): Promise<Activity> {
    return this.fetch<Activity>(`/activities/${activityId}`);
  }

  // Saved activities
  async getSavedActivities(): Promise<Activity[]> {
    return this.fetch<Activity[]>('/saved');
  }

  async saveActivity(activityId: string): Promise<Activity> {
    const result = await this.fetch<{ success: boolean; activity: Activity }>('/saved', {
      method: 'POST',
      body: JSON.stringify({ activityId }),
    });
    return result.activity;
  }

  async unsaveActivity(activityId: string): Promise<void> {
    await this.fetch(`/saved/${activityId}`, {
      method: 'DELETE',
    });
  }

  // Messages
  async getMessages(): Promise<ChatPreview[]> {
    const messages = await this.fetch<Array<{ activityId: string; messages: ChatMessage[] }>>('/messages');
    
    // Transform to chat previews
    const activities = await this.getActivities();
    return messages.map(({ activityId, messages: msgs }) => {
      const activity = activities.find(a => a.id === activityId);
      const lastMessage = msgs[msgs.length - 1];
      
      return {
        activityId,
        activityName: activity?.title || 'Unknown Activity',
        spotName: activity?.location || 'Unknown Location',
        lastMessage: lastMessage?.message || 'No messages yet',
        time: lastMessage?.timestamp || '',
        unreadCount: 0, // TODO: Implement unread count logic
        photo: activity?.photo || '',
      };
    });
  }

  async getActivityMessages(activityId: string): Promise<ChatMessage[]> {
    return this.fetch<ChatMessage[]>(`/activities/${activityId}/messages`);
  }

  async sendMessage(activityId: string, message: string, user?: { name: string; avatar: string }): Promise<ChatMessage> {
    return this.fetch<ChatMessage>(`/activities/${activityId}/messages`, {
      method: 'POST',
      body: JSON.stringify({
        message,
        userName: user?.name || 'You',
        userAvatar: user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser',
      }),
    });
  }

  // User
  async getCurrentUser(): Promise<User> {
    return this.fetch<User>('/user/me');
  }

  async updateUser(userData: Partial<User>): Promise<User> {
    return this.fetch<User>('/user/me', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Search
  async search(query: string): Promise<Activity[]> {
    return this.fetch<Activity[]>(`/search?q=${encodeURIComponent(query)}`);
  }
}

export const api = new ApiService();

