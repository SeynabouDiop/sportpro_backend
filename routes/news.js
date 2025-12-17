const express = require('express');
const router = express.Router();

// Données de test pour les actualités
const testNews = [
  {
    _id: '1',
    title: 'Tournoi de tennis annuel',
    content: 'Notre tournoi de tennis annuel revient cette année avec de nouvelles catégories et des prix attractifs. Inscriptions ouvertes jusqu\'au 30 juin. Venez nombreux participer à cet événement phare de notre club.',
    excerpt: 'Tournoi de tennis avec nouvelles catégories',
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'tennis',
    author: {
      _id: '1',
      firstName: 'Jean',
      lastName: 'Dupont'
    },
    publishedAt: new Date().toISOString(),
    tags: ['tennis', 'tournoi', 'compétition'],
    views: 150,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Nouveau coach de football',
    content: 'Nous sommes ravis d\'accueillir Marco Silva, ancien joueur professionnel, qui rejoindra notre équipe de coachs à partir de juillet. Marco apportera son expérience du haut niveau pour améliorer nos performances.',
    excerpt: 'Arrivée d\'un nouveau coach professionnel',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'football',
    author: {
      _id: '1',
      firstName: 'Jean',
      lastName: 'Dupont'
    },
    publishedAt: new Date(Date.now() - 86400000).toISOString(), // Hier
    tags: ['football', 'coach', 'nouveau'],
    views: 89,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '3',
    title: 'Rénovation de la piscine olympique',
    content: 'Notre piscine olympique sera fermée pour rénovation du 15 juillet au 15 août. Nous en profitons pour moderniser les installations et améliorer votre confort. Nous vous remercions de votre compréhension.',
    excerpt: 'Fermeture temporaire pour rénovation',
    image: 'https://images.unsplash.com/photo-1536922246289-88c42f957773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'swimming',
    author: {
      _id: '2',
      firstName: 'Marie',
      lastName: 'Martin'
    },
    publishedAt: new Date(Date.now() - 172800000).toISOString(), // Avant-hier
    tags: ['piscine', 'rénovation', 'natation'],
    views: 203,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '4',
    title: 'Compétition de basketball régionale',
    content: 'Notre équipe de basketball participera à la compétition régionale le mois prochain. Venez les soutenir lors de leurs matchs à domicile.',
    excerpt: 'Participation à la compétition régionale',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'basketball',
    author: {
      _id: '3',
      firstName: 'Pierre',
      lastName: 'Lefebvre'
    },
    publishedAt: new Date(Date.now() - 259200000).toISOString(), // 3 jours
    tags: ['basketball', 'compétition', 'équipe'],
    views: 76,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '5',
    title: 'Nouveaux équipements de fitness',
    content: 'Nous avons investi dans de nouveaux équipements de fitness dernière génération. Venez les essayer gratuitement pendant la semaine portes ouvertes.',
    excerpt: 'Arrivée de nouveaux équipements',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'general',
    author: {
      _id: '1',
      firstName: 'Jean',
      lastName: 'Dupont'
    },
    publishedAt: new Date(Date.now() - 345600000).toISOString(), // 4 jours
    tags: ['fitness', 'équipement', 'nouveau'],
    views: 112,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '6',
    title: 'Stage d\'athlétisme été 2024',
    content: 'Inscriptions ouvertes pour notre stage d\'athlétisme cet été. Encadrement par des professionnels pour tous les niveaux.',
    excerpt: 'Stage d\'été pour les athlètes',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd8facb5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'athletics',
    author: {
      _id: '4',
      firstName: 'Sophie',
      lastName: 'Bernard'
    },
    publishedAt: new Date(Date.now() - 432000000).toISOString(), // 5 jours
    tags: ['athlétisme', 'stage', 'été'],
    views: 94,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Récupérer toutes les actualités
router.get('/', (req, res) => {
  const { page = 1, limit = 6, category } = req.query;
  
  let filteredNews = testNews;
  
  // Filtrer par catégorie si spécifié
  if (category) {
    filteredNews = testNews.filter(item => item.category === category);
  }
  
  // Pagination
  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const endIndex = parseInt(page) * parseInt(limit);
  
  const paginatedNews = filteredNews.slice(startIndex, endIndex);
  
  res.json({
    news: paginatedNews,
    total: filteredNews.length,
    page: parseInt(page),
    pages: Math.ceil(filteredNews.length / parseInt(limit))
  });
});

// Récupérer une actualité par ID
router.get('/:id', (req, res) => {
  const news = testNews.find(n => n._id === req.params.id);
  
  if (!news) {
    return res.status(404).json({ message: 'Actualité non trouvée' });
  }
  
  // Simuler l'incrémentation des vues
  news.views += 1;
  
  res.json(news);
});

module.exports = router;