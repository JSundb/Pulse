# 🔍 Data Flow Explanation

## Your Current Setup

### 1. **User Registration**

**Where does it go?** 📝

- ❌ **NOT saved to server/database**
- ✅ **Only in browser memory (localStorage or state)**
- When you register: `SignUpScreen` → `onComplete()` → `App` sets `hasCompletedOnboarding = true`
- Your user data (name, email, password, interests) is **lost on page refresh**

**How to find your registered user:**

```
Currently: It only exists while the browser tab is open
After refresh: You'll have to register again
```

### 2. **Mock Data Location** 📊

You have **TWO places** with data:

#### A. Server Mock Data (`server/mockData.js`)

```
✅ 25+ activities
✅ 8 user profiles
✅ 9 themes
✅ GPS coordinates
✅ Engagement metrics (likes, saves, comments)
```

**How to access:** Via API calls

```javascript
// In your components:
const activities = await api.getActivities();
const themes = await api.getThemes();
const user = await api.getCurrentUser();
```

#### B. Component Hardcoded Data

```
⚠️ ThemeExplorer had hardcoded themes (FIXED NOW)
⚠️ ThemedSwipeDeckSimple needs activities prop
⚠️ SavedList needs savedActivities prop
```

### 3. **Which App.tsx is Running?** 🏃

Your browser is using: **`src/App.tsx`** ✅

This file:

- ✅ Fetches data from API server (port 3001)
- ✅ Passes data to ThemeExplorer, ThemedSwipeDeckSimple, SavedList
- ✅ Shows loading state while fetching
- ✅ Shows toast notifications

The other file (`figma/App.tsx`) is **NOT used** - it's just a backup

### 4. **Data Flow Diagram** 🔄

```
┌─────────────────┐
│ User Registers  │ → Only in browser memory (not persisted)
└─────────────────┘

┌──────────────────────┐
│  API Server (3001)   │
│  server/mockData.js  │ ← Contains all demo data
│  server/index.js     │
└──────────────────────┘
           ↓
    HTTP Requests
           ↓
┌──────────────────────┐
│  src/services/api.ts │ ← Wrapper for API calls
└──────────────────────┘
           ↓
┌──────────────────────┐
│    src/App.tsx       │ ← Fetches on mount
│  useEffect(() => {   │
│    api.getActivities │
│    api.getThemes     │
│  })                  │
└──────────────────────┘
           ↓
      Props passed
           ↓
┌──────────────────────────────────┐
│  Components:                     │
│  • ThemeExplorer (themes)       │
│  • ThemedSwipeDeckSimple (acts) │
│  • SavedList (savedActivities)  │
└──────────────────────────────────┘
```

## What's Working Now ✅

1. **API Server** provides 25+ activities, 9 themes, 8 users
2. **React App** fetches this data on load
3. **ThemeExplorer** now uses API themes (shows activity count)
4. **Components** display real mock data from API

## What's NOT Working ⚠️

1. **User Registration** - Not saved anywhere

   - When you register, it just sets `hasCompletedOnboarding = true`
   - Your profile data (name, email, interests) is **not stored**
   - You're using a **hardcoded demo user** from mockData.js:
     ```javascript
     {
       id: 'user1',
       name: 'Jordan Smith',
       avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
       ...
     }
     ```

2. **Save/Unsave Activities** - Only in local state
   - Saved activities are in `savedActivityIds` array
   - **Not synced with API server**
   - Lost on page refresh

## How to See Mock Data in Action 🎬

1. **Open Browser DevTools** (F12)
2. **Go to Console tab**
3. **Refresh the page**
4. **Look for:**

   ```
   🔄 Fetching data from API...
   ✅ API data loaded: {
     activities: 25,
     themes: 9,
     user: "Jordan Smith"
   }
   ```

5. **Click on "Home" tab** → See 9 themes with activity counts
6. **Click a theme** → See activities from that theme
7. **Click an activity** → See full details (likes, saves, comments, GPS)

## Next Steps to Make Registration Work 💾

To actually save user registration:

1. **Option A: Add localStorage**

   ```javascript
   // In SignUpScreen, after form submit:
   localStorage.setItem(
     "user",
     JSON.stringify({
       fullName,
       email,
       selectedInterests,
     })
   );
   ```

2. **Option B: Add API endpoint**

   ```javascript
   // In server/index.js:
   app.post('/api/users/register', (req, res) => {
     const { fullName, email, password, interests } = req.body;
     userProfiles.push({ id: newId, name: fullName, ... });
     res.json({ success: true });
   });
   ```

3. **Option C: Use mock user**
   - Keep using "Jordan Smith" from mockData.js
   - Just skip registration screen for demo

## Summary 📝

✅ **Mock data IS being used** - from server/mockData.js via API  
✅ **Figma components ARE connected** - src/App.tsx fetches and passes data  
❌ **Registration data is NOT saved** - only sets onboarding flag  
❌ **You are NOT the registered user** - you're "Jordan Smith" from mockData

**Your registered user details are in memory only and will disappear on refresh!**
