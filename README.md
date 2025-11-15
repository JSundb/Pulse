# Pulse App - Hackathon Project

A modern social discovery app that helps users find activities and spots around them, plan future trips, and connect with like-minded people.

## Features

- 🎯 **Theme-based Discovery**: Explore activities by themes (Nature, Sport, Photography, Cafés, Social, Water, Routes, Seasonal, Hidden Gems)
- 💾 **Save Activities**: Save your favorite spots and activities for later
- 💬 **Activity Chats**: Join conversations about activities and connect with others
- 📍 **Location-based**: Discover activities near you
- 🔍 **Search**: Find activities by keywords
- 👤 **User Profiles**: Customize your profile and interests

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express
- **UI Components**: Radix UI + Tailwind CSS
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start both backend and frontend servers:
```bash
npm run dev:all
```

This will start:
- Backend API server on `http://localhost:3001`
- Frontend development server on `http://localhost:3000`

### Alternative: Run separately

Start backend only:
```bash
npm run server
```

Start frontend only:
```bash
npm run dev
```

## Project Structure

```
Pulse/
├── server/
│   ├── index.js          # Express backend server
│   └── mockData.js       # Mock data for demo
├── src/
│   ├── components/       # React components
│   ├── services/
│   │   └── api.ts        # API service layer
│   ├── types.ts          # TypeScript type definitions
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
└── package.json
```

## API Endpoints

The backend provides the following endpoints:

- `GET /api/themes` - Get all themes
- `GET /api/themes/:id` - Get theme by ID
- `GET /api/themes/:themeId/activities` - Get activities by theme
- `GET /api/activities` - Get all activities (with optional filters)
- `GET /api/activities/:id` - Get activity by ID
- `GET /api/saved` - Get saved activities
- `POST /api/saved` - Save an activity
- `DELETE /api/saved/:activityId` - Unsave an activity
- `GET /api/messages` - Get all chat previews
- `GET /api/activities/:activityId/messages` - Get messages for an activity
- `POST /api/activities/:activityId/messages` - Send a message
- `GET /api/user/me` - Get current user profile
- `PUT /api/user/me` - Update user profile
- `GET /api/search?q=query` - Search activities

## Demo Features

The app includes comprehensive mock data for demonstration:

- 10+ activities across different themes
- 9 themes with sub-themes
- Sample chat messages
- User profiles
- Saved activities

## Building for Production

```bash
npm run build
```

The built files will be in the `build/` directory.

## Hackathon Presentation Tips

1. **Start the app**: Run `npm run dev:all` before your presentation
2. **Show the flow**: 
   - Onboarding → Theme selection → Swipe through activities → Save activities → View messages
3. **Highlight features**:
   - Theme-based discovery
   - Swipe interface
   - Activity details
   - Chat functionality
   - Saved activities
4. **Demo scenarios**:
   - Browse Nature theme activities
   - Save a favorite spot
   - Join an activity chat
   - Search for "coffee" or "hiking"

## License

This project was created for Junction 2025 hackathon.
