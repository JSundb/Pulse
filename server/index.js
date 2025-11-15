const express = require('express');
const cors = require('cors');
const { activities, themes, users, messages, savedActivities } = require('./mockData');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Helper to simulate delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Get all themes
app.get('/api/themes', async (req, res) => {
  await delay();
  res.json(themes);
});

// Get theme by ID
app.get('/api/themes/:id', async (req, res) => {
  await delay();
  const theme = themes.find(t => t.id === req.params.id);
  if (!theme) {
    return res.status(404).json({ error: 'Theme not found' });
  }
  res.json(theme);
});

// Get activities by theme
app.get('/api/themes/:themeId/activities', async (req, res) => {
  await delay();
  const { subTheme } = req.query;
  let filtered = activities.filter(a => a.themeId === req.params.themeId);
  
  if (subTheme && subTheme !== 'all') {
    filtered = filtered.filter(a => a.subTheme === subTheme);
  }
  
  res.json(filtered);
});

// Get all activities
app.get('/api/activities', async (req, res) => {
  await delay();
  const { themeId, subTheme, search } = req.query;
  
  let filtered = [...activities];
  
  if (themeId) {
    filtered = filtered.filter(a => a.themeId === themeId);
  }
  
  if (subTheme && subTheme !== 'all') {
    filtered = filtered.filter(a => a.subTheme === subTheme);
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(searchLower) ||
      a.description.toLowerCase().includes(searchLower) ||
      a.location.toLowerCase().includes(searchLower)
    );
  }
  
  res.json(filtered);
});

// Get activity by ID
app.get('/api/activities/:id', async (req, res) => {
  await delay();
  const activity = activities.find(a => a.id === req.params.id);
  if (!activity) {
    return res.status(404).json({ error: 'Activity not found' });
  }
  res.json(activity);
});

// Get saved activities for current user
app.get('/api/saved', async (req, res) => {
  await delay();
  res.json(savedActivities);
});

// Save an activity
app.post('/api/saved', async (req, res) => {
  await delay();
  const { activityId } = req.body;
  const activity = activities.find(a => a.id === activityId);
  
  if (!activity) {
    return res.status(404).json({ error: 'Activity not found' });
  }
  
  if (!savedActivities.find(a => a.id === activityId)) {
    savedActivities.push(activity);
  }
  
  res.json({ success: true, activity });
});

// Remove saved activity
app.delete('/api/saved/:activityId', async (req, res) => {
  await delay();
  const index = savedActivities.findIndex(a => a.id === req.params.activityId);
  if (index !== -1) {
    savedActivities.splice(index, 1);
  }
  res.json({ success: true });
});

// Get messages/chats
app.get('/api/messages', async (req, res) => {
  await delay();
  res.json(messages);
});

// Get messages for a specific activity
app.get('/api/activities/:activityId/messages', async (req, res) => {
  await delay();
  const activityMessages = messages.find(m => m.activityId === req.params.activityId);
  if (!activityMessages) {
    return res.json([]);
  }
  res.json(activityMessages.messages || []);
});

// Send a message
app.post('/api/activities/:activityId/messages', async (req, res) => {
  await delay();
  const { message, userId = 'current-user', userName = 'You', userAvatar } = req.body;
  
  let activityMessages = messages.find(m => m.activityId === req.params.activityId);
  
  if (!activityMessages) {
    activityMessages = {
      activityId: req.params.activityId,
      messages: []
    };
    messages.push(activityMessages);
  }
  
  const newMessage = {
    id: Date.now().toString(),
    userId,
    userName,
    userAvatar: userAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser',
    message: message.trim(),
    timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
  };
  
  activityMessages.messages.push(newMessage);
  
  res.json(newMessage);
});

// Get current user profile
app.get('/api/user/me', async (req, res) => {
  await delay();
  res.json(users.currentUser);
});

// Update user profile
app.put('/api/user/me', async (req, res) => {
  await delay();
  Object.assign(users.currentUser, req.body);
  res.json(users.currentUser);
});

// Search activities
app.get('/api/search', async (req, res) => {
  await delay();
  const { q } = req.query;
  
  if (!q) {
    return res.json([]);
  }
  
  const searchLower = q.toLowerCase();
  const results = activities.filter(a => 
    a.title.toLowerCase().includes(searchLower) ||
    a.description.toLowerCase().includes(searchLower) ||
    a.location.toLowerCase().includes(searchLower) ||
    a.vibe.some(v => v.toLowerCase().includes(searchLower))
  );
  
  res.json(results);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Pulse API server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
});

