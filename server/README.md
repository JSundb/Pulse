# Pulse Mock API Server

## 🚀 Quick Start

### Start the Server

```bash
cd server
npm start
```

Server runs at: **http://localhost:3001**

### Start the App (separate terminal)

```bash
npm run dev
```

## 📡 Key API Endpoints

| Endpoint                         | Description             |
| -------------------------------- | ----------------------- |
| `GET /api/activities`            | Get all activities      |
| `GET /api/activities/:id`        | Get activity details    |
| `GET /api/themes`                | Get all themes          |
| `GET /api/themes/:id/activities` | Get activities by theme |
| `GET /api/users`                 | Get user profiles       |
| `GET /api/saved`                 | Get saved activities    |
| `GET /api/search?q=query`        | Search activities       |

## 📊 Mock Data

- **25+ activities** across 9 themes (Nature, Cafes, Photography, Sport, Social, Water, Routes, Seasonal, Hidden Gems)
- **8 user profiles** with avatars and engagement stats
- GPS coordinates for all locations (San Francisco Bay Area)
- Realistic engagement metrics (likes, saves, comments, ratings)
- Chat messages and community photos
