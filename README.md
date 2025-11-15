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

## Deployment

### GitHub Pages

The app is configured to deploy automatically to GitHub Pages using GitHub Actions.

#### Setup Instructions:

1. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

2. **Configure Repository Name** (if needed):
   - If your repository name is different from "Pulse", update the `base` path in `vite.config.ts`
   - Change `/Pulse/` to `/{your-repo-name}/`

3. **Set Environment Variables** (optional):
   - Go to **Settings** → **Secrets and variables** → **Actions**
   - Add `VITE_API_URL` secret if your backend is hosted elsewhere
   - Format: `https://your-backend-url.com/api`

4. **Deploy**:
   - Push to `main` or `master` branch
   - The GitHub Action will automatically build and deploy your app
   - Your app will be available at `https://{username}.github.io/Pulse/`

#### Manual Deployment:

```bash
# Build for GitHub Pages
GITHUB_PAGES=true npm run build

# The build output will be in the build/ directory
```

### Backend Deployment

The backend server (`server/index.js`) needs to be deployed separately. Recommended hosting options:

- **Railway**: Easy Node.js deployment
- **Render**: Free tier available
- **Vercel**: Serverless functions
- **Heroku**: Traditional hosting

After deploying the backend, update the `VITE_API_URL` secret in GitHub Actions with your backend URL.

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
