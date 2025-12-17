const express = require('express');
const router = express.Router();

// Données de test pour les événements
const testEvents = [
  {
    _id: '1',
    title: 'Tournoi de basketball 3x3',
    description: 'Participez à notre tournoi de basketball 3x3 ouvert à tous les niveaux. Inscriptions par équipe de 3 joueurs. Trophées et prix pour les vainqueurs.',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // +7 jours
    startTime: '09:00',
    endTime: '18:00',
    location: 'Terrain extérieur principal',
    address: {
      street: '123 Avenue du Sport',
      city: 'Paris',
      zipCode: '75000'
    },
    category: 'tournament',
    sport: 'basketball',
    maxParticipants: 20,
    currentParticipants: 15,
    price: 0,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    organizer: {
      _id: '1',
      firstName: 'Coach',
      lastName: 'Martin'
    },
    status: 'upcoming',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Course d\'orientation en forêt',
    description: 'Découvrez la course d\'orientation dans le magnifique cadre de la forêt de Fontainebleau. Parcours adaptés à tous les niveaux. Équipement fourni.',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // +14 jours
    startTime: '08:00',
    endTime: '12:00',
    location: 'Forêt de Fontainebleau',
    address: {
      street: 'Route Forestière',
      city: 'Fontainebleau',
      zipCode: '77300'
    },
    category: 'competition',
    sport: 'athletics',
    maxParticipants: 30,
    currentParticipants: 22,
    price: 10,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    organizer: {
      _id: '2',
      firstName: 'Organisateur',
      lastName: 'Forest'
    },
    status: 'upcoming',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '3',
    title: 'Stage de tennis junior',
    description: 'Stage d\'une semaine pour les jeunes de 8 à 16 ans. Encadrement par des coachs diplômés. Matériel fourni. Inscriptions limitées.',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // +21 jours
    startTime: '10:00',
    endTime: '16:00',
    location: 'Courts de tennis',
    address: {
      street: '123 Avenue du Sport',
      city: 'Paris',
      zipCode: '75000'
    },
    category: 'workshop',
    sport: 'tennis',
    maxParticipants: 15,
    currentParticipants: 12,
    price: 150,
    image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    organizer: {
      _id: '3',
      firstName: 'Coach',
      lastName: 'Dubois'
    },
    status: 'upcoming',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Récupérer tous les événements - CORRECTION: Route GET /
router.get('/', (req, res) => {
  console.log('GET /api/events - Request received');
  
  try {
    const events = testEvents.map(event => ({
      ...event,
      // Assurer que l'organisateur existe
      organizer: event.organizer || { firstName: 'Admin', lastName: 'System' }
    }));
    
    res.json({
      success: true,
      events: events,
      total: events.length,
      message: `${events.length} événements trouvés`
    });
  } catch (error) {
    console.error('Error in /api/events:', error);
    res.status(500).json({
      success: false,
      error: 'Erreur serveur',
      message: error.message
    });
  }
});

// Récupérer un événement par ID
router.get('/:id', (req, res) => {
  const event = testEvents.find(e => e._id === req.params.id);
  
  if (!event) {
    return res.status(404).json({ 
      success: false,
      message: 'Événement non trouvé' 
    });
  }
  
  res.json({
    success: true,
    event: event
  });
});

// Inscription à un événement
router.post('/:id/register', (req, res) => {
  const eventIndex = testEvents.findIndex(e => e._id === req.params.id);
  
  if (eventIndex === -1) {
    return res.status(404).json({ 
      success: false,
      message: 'Événement non trouvé' 
    });
  }
  
  const event = testEvents[eventIndex];
  
  if (event.currentParticipants >= event.maxParticipants) {
    return res.status(400).json({ 
      success: false,
      message: 'Événement complet' 
    });
  }
  
  // Simuler l'inscription
  testEvents[eventIndex].currentParticipants += 1;
  
  res.json({ 
    success: true,
    message: 'Inscription réussie !',
    eventId: event._id,
    participants: testEvents[eventIndex].currentParticipants,
    remainingSpots: event.maxParticipants - testEvents[eventIndex].currentParticipants
  });
});

// Route de test
router.get('/test/ok', (req, res) => {
  res.json({ 
    success: true,
    message: 'Events API is working!',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;