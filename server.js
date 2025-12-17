const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware CORS simple et efficace
app.use(cors({
  origin: 
    [
      'http://localhost:3000', 
      'https://sportpro-frontend.vercel.app'
    ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'SportPro API Server',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Routes API
const authRoutes = require('./routes/auth');
const newsRoutes = require('./routes/news');
const eventsRoutes = require('./routes/events');
const equipmentRoutes = require('./routes/equipment');
const contactRoutes = require('./routes/contact');

app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/contact', contactRoutes);

// Route racine
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue sur SportPro API',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      news: '/api/news',
      events: '/api/events',
      equipment: '/api/equipment',
      contact: '/api/contact'
    }
  });
});

// Route 404
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    suggestion: 'Try /api/health to check server status'
  });
});

// Gestion d'erreurs
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ 
    error: 'Server error',
    message: 'An unexpected error occurred'
  });
});

// Connexion MongoDB (facultatif pour les tests)
const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected successfully');
  })
  .catch(err => {
    console.log('⚠️  MongoDB connection failed, using mock data');
    console.log('💡 Tip: Run MongoDB or remove MONGODB_URI from .env file');
  });
} else {
  console.log('ℹ️  No MongoDB URI provided, using mock data');
}

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🎉 Server running on port ${PORT}`);
  console.log(`🔗 http://localhost:${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
  console.log(`🧪 Test: http://localhost:${PORT}/api/health\n`);
});
