const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

// Configurer SendGrid pour l'envoi d'emails
const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: 'apikey', // Identifiant constant pour SendGrid
    pass: process.env.SENDGRID_API_KEY, // Utilisation de la clé API depuis .env
  },
});

// Route d'inscription avec gestion des erreurs d'envoi d'email
router.post('/register', [
  check('email').isEmail(),
  check('username').not().isEmpty(),
  check('password').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, username, password } = req.body;

  try {
    let user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ msg: 'Cet email est déjà utilisé.' });
    }

    const confirmationToken = crypto.randomBytes(20).toString('hex');

    user = await User.create({
      username,
      email,
      password,
      confirmationToken,
    });

    const verificationLink = `http://localhost:3000/confirm/${confirmationToken}`;

    const mailOptions = {
      from: 'erwan.lemeur.dev@gmail.com', 
      to: email,
      subject: 'Confirmation de votre inscription',
      html: `<p>Veuillez cliquer sur le lien suivant pour confirmer votre inscription : <a href="${verificationLink}">${verificationLink}</a></p>`
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ msg: 'Inscription réussie. Un email de confirmation vous a été envoyé.' });
    } catch (mailErr) {
      console.error('Erreur lors de l\'envoi de l\'email : ', mailErr.message);
      res.status(500).json({ msg: 'Inscription réussie, mais l\'envoi de l\'email a échoué. Contactez le support.' });
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
});


module.exports = router;
