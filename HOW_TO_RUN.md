# 🚀 How to Run Pulse Project

## Quick Start (Every Time)

### Option 1: PowerShell Commands (Copy & Paste)

Open **PowerShell** in the project folder and run:

```powershell
# Terminal 1 - Start API Server
cd server
node index.js
```

Then open a **second PowerShell window** and run:

```powershell
# Terminal 2 - Start React App
npm run dev
```

Browser will open automatically to: **http://localhost:3000/Roamy/**

---

### Option 2: One Command (Stops Previous Runs First)

```powershell
# Stop any running servers and start fresh
taskkill /F /IM node.exe 2>$null
cd server ; Start-Process powershell -ArgumentList "-NoExit", "-Command", "node index.js"
Start-Sleep -Seconds 2
npm run dev
```

---

## What Runs Where

| Component      | Port | URL                          |
| -------------- | ---- | ---------------------------- |
| **React App**  | 3000 | http://localhost:3000/Roamy/ |
| **API Server** | 3002 | http://localhost:3002/api    |

---

## Step-by-Step (First Time Setup)

### 1. Install Dependencies

```powershell
# Install React app dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..
```

### 2. Start API Server

Open **Terminal 1** (PowerShell):

```powershell
cd server
node index.js
```

You should see:

```
🚀 Pulse API server running on http://localhost:3002
📡 API endpoints available at http://localhost:3002/api
```

### 3. Start React App

Open **Terminal 2** (PowerShell):

```powershell
npm run dev
```

You should see:

```
VITE v6.3.5  ready in 393 ms

➜  Local:   http://localhost:3000/Roamy/
```

### 4. Open Browser

Navigate to: **http://localhost:3000/Roamy/**

---

## Troubleshooting

### ❌ Port Already in Use

**Error:** `Port 3000 is in use` or `Port 3002 is in use`

**Solution:** Kill all Node processes and restart:

```powershell
taskkill /F /IM node.exe
```

Then start servers again.

---

### ❌ API Not Loading (No Data)

**Check 1:** Is API server running?

```powershell
# Visit in browser:
http://localhost:3002/api/activities
```

Should show JSON with 25 activities.

**Check 2:** Check browser console (F12)
Should see: `✅ API data loaded: {activities: 25, themes: 9}`

**Solution:** Make sure server is running:

```powershell
cd server
node index.js
```

---

### ❌ "Cannot find module 'express'"

**Solution:** Install server dependencies:

```powershell
cd server
npm install
```

---

### ❌ React App Won't Start

**Solution:** Install React dependencies:

```powershell
npm install
```

---

## How to Stop Servers

### Stop Individual Terminal

Press `Ctrl+C` in the terminal window

### Stop All Node Processes

```powershell
taskkill /F /IM node.exe
```

---

## Project Structure

```
Pulse/
├── server/              # API Server (Port 3002)
│   ├── index.js        # Express server
│   ├── mockData.js     # 25+ activities, 9 themes, 8 users
│   └── package.json
├── src/                 # React App (Port 3000)
│   ├── App.tsx         # Main component
│   ├── components/     # All UI components
│   └── services/
│       └── api.ts      # API client
├── package.json
└── vite.config.ts

```

---

## Quick Reference

### Check if servers are running:

```powershell
# Check processes
Get-Process node

# Check ports
Get-NetTCPConnection -LocalPort 3000,3002 | Select-Object LocalPort,State
```

### Test API endpoints:

```
http://localhost:3002/api/activities   # All activities
http://localhost:3002/api/themes       # All themes
http://localhost:3002/api/users        # All users
```

### Main app URL:

```
http://localhost:3000/Roamy/
```

---

## Daily Workflow

1. **Open PowerShell** in project folder
2. **Run Terminal 1:** `cd server ; node index.js`
3. **Open new PowerShell** in project folder
4. **Run Terminal 2:** `npm run dev`
5. **Browser opens** automatically
6. **Develop** your features
7. **Stop servers** when done: `Ctrl+C` in both terminals

---

## Tips

- ✅ Always start **API server first**, then React app
- ✅ Keep both terminals open while developing
- ✅ Check browser console (F12) for errors
- ✅ API server shows all 25 activities from `server/mockData.js`
- ✅ Changes to React code auto-reload in browser
- ✅ Changes to server code require restart (`Ctrl+C` then `node index.js`)

---

**Need help?** Check browser console (F12) and terminal output for error messages.
