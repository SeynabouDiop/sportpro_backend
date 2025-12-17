const express = require('express');
const router = express.Router();

// Envoyer un message de contact
router.post('/', (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  
  // Validation basique
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      message: 'Veuillez remplir tous les champs obligatoires' 
    });
  }
  
  // Valider l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      message: 'Veuillez entrer une adresse email valide' 
    });
  }
  
  // Simuler l'envoi du message
  console.log('Nouveau message de contact:');
  console.log('- Nom:', name);
  console.log('- Email:', email);
  console.log('- Téléphone:', phone || 'Non fourni');
  console.log('- Sujet:', subject);
  console.log('- Message:', message);
  
  // Réponse de succès
  res.json({
    message: 'Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.',
    data: {
      name,
      email,
      subject,
      timestamp: new Date().toISOString()
    }
  });
});

module.exports = router;