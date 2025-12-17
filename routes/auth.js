const express = require('express');
const router = express.Router();

// Route de test pour l'authentification
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email && password) {
    res.json({
      message: 'Connexion réussie',
      token: 'fake-jwt-token-for-testing',
      user: {
        id: '1',
        firstName: 'Test',
        lastName: 'User',
        email: email,
        role: 'user'
      }
    });
  } else {
    res.status(401).json({ message: 'Email ou mot de passe incorrect' });
  }
});

router.post('/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  
  if (firstName && lastName && email && password) {
    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      token: 'fake-jwt-token-for-testing',
      user: {
        id: '1',
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: 'user'
      }
    });
  } else {
    res.status(400).json({ message: 'Tous les champs sont requis' });
  }
});

router.get('/profile', (req, res) => {
  res.json({
    _id: '1',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    role: 'user',
    createdAt: new Date().toISOString()
  });
});

module.exports = router;