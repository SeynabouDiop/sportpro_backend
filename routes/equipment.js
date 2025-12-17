const express = require('express');
const router = express.Router();

// Données de test pour les équipements
const testEquipment = [
  {
    _id: '1',
    name: 'Chaussures de football Adidas',
    description: 'Chaussures de football professionnelles avec crampons moulés. Confort optimal et excellent maintien.',
    price: 89.99,
    category: 'football',
    brand: 'Adidas',
    stock: 15,
    images: ['https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
    specifications: {
      color: 'Noir/Rouge',
      size: '42-46',
      weight: 280,
      material: 'Cuir synthétique'
    },
    isAvailable: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '2',
    name: 'Ballon de basketball Nike',
    description: 'Ballon officiel taille 7, idéal pour compétitions et entraînements. Excellente prise en main.',
    price: 45.99,
    category: 'basketball',
    brand: 'Nike',
    stock: 8,
    images: ['https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
    specifications: {
      color: 'Orange',
      size: 'Taille 7',
      weight: 620,
      material: 'Cuir composite'
    },
    isAvailable: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '3',
    name: 'Raquette de tennis Wilson',
    description: 'Raquette légère avec cadre en graphite, idéale pour joueurs intermédiaires. Excellente maniabilité.',
    price: 129.99,
    category: 'tennis',
    brand: 'Wilson',
    stock: 5,
    images: ['https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
    specifications: {
      color: 'Blanc/Noir',
      size: 'L2',
      weight: 295,
      material: 'Graphite'
    },
    isAvailable: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '4',
    name: 'Tapis de yoga écologique',
    description: 'Tapis antidérapant en caoutchouc naturel, épaisseur 5mm. Respectueux de l\'environnement.',
    price: 34.99,
    category: 'fitness',
    brand: 'EcoFit',
    stock: 25,
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
    specifications: {
      color: 'Bleu marine',
      size: '183x61cm',
      weight: 1200,
      material: 'Caoutchouc naturel'
    },
    isAvailable: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '5',
    name: 'Maillot de bain compétition',
    description: 'Maillot de bain pour compétition de natation. Hydrodynamique et confortable.',
    price: 59.99,
    category: 'swimming',
    brand: 'Speedo',
    stock: 12,
    images: ['https://images.unsplash.com/photo-1536922246289-88c42f957773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
    specifications: {
      color: 'Bleu/Rouge',
      size: 'S-XL',
      weight: 150,
      material: 'Polyester/Élasthanne'
    },
    isAvailable: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '6',
    name: 'Chaussures de running Nike',
    description: 'Chaussures de running légères avec amorti réactif. Parfaites pour la course sur route.',
    price: 109.99,
    category: 'running',
    brand: 'Nike',
    stock: 0,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
    specifications: {
      color: 'Gris/Orange',
      size: '39-45',
      weight: 250,
      material: 'Mesh respirant'
    },
    isAvailable: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    _id: '7',
    name: 'Sac de sport multifonction',
    description: 'Sac spacieux avec compartiments séparés pour chaussures et vêtements. Imperméable.',
    price: 39.99,
    category: 'other',
    brand: 'Decathlon',
    stock: 30,
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'],
    specifications: {
      color: 'Noir',
      size: '45x30x20cm',
      weight: 800,
      material: 'Polyester'
    },
    isAvailable: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Récupérer tous les équipements
router.get('/', (req, res) => {
  const { category, minPrice, maxPrice, brand, sort = 'name' } = req.query;
  
  let filteredEquipment = [...testEquipment];
  
  // Filtrer par catégorie
  if (category) {
    filteredEquipment = filteredEquipment.filter(item => item.category === category);
  }
  
  // Filtrer par prix
  if (minPrice) {
    filteredEquipment = filteredEquipment.filter(item => item.price >= parseFloat(minPrice));
  }
  
  if (maxPrice) {
    filteredEquipment = filteredEquipment.filter(item => item.price <= parseFloat(maxPrice));
  }
  
  // Filtrer par marque
  if (brand) {
    filteredEquipment = filteredEquipment.filter(item => 
      item.brand.toLowerCase().includes(brand.toLowerCase())
    );
  }
  
  // Trier
  if (sort === 'price-asc') {
    filteredEquipment.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filteredEquipment.sort((a, b) => b.price - a.price);
  } else if (sort === 'newest') {
    filteredEquipment.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else {
    filteredEquipment.sort((a, b) => a.name.localeCompare(b.name));
  }
  
  // Récupérer les catégories uniques
  const categories = [...new Set(testEquipment.map(item => item.category))];
  
  res.json({
    equipment: filteredEquipment,
    categories,
    total: filteredEquipment.length
  });
});

// Récupérer les catégories
router.get('/categories', (req, res) => {
  const categories = [...new Set(testEquipment.map(item => item.category))];
  res.json(categories);
});

// Récupérer un équipement par ID
router.get('/:id', (req, res) => {
  const equipment = testEquipment.find(e => e._id === req.params.id);
  
  if (!equipment) {
    return res.status(404).json({ message: 'Équipement non trouvé' });
  }
  
  res.json(equipment);
});

module.exports = router;